---
title: Grafana 节点流量监控
date: 2026-03-20 15:04:38
permalink: /pages/3f6381c4-8314-48ef-b342-62032ad6d61c/
tags:
  - 
categories:
  - 编程
article: true
---

# Grafana 节点流量监控

## 1. 设备识别：分清“真网卡”与“虚网卡”

在监控列表中，你会看到多种设备，统计外网流量时必须过滤：

| 设备前缀 | 类型 | 说明 | 统计建议 |
| :--- | :--- | :--- | :--- |
| **`enp...`** / **`eth...`** | **物理网卡** | 服务器接路由器的网线接口。包含 **上网流量** + **局域网互传**。 | **主统计对象** |
| **`br-...`** | **Docker 网桥** | 每个 Docker 网络（Project）的汇总口。 | 选看（查具体业务） |
| **`veth...`** | **容器虚线** | 单个容器的流量。数量极多。 | **建议过滤排除** |

> **💡 技巧**：查找 `br-xxxx` 对应哪个 Docker 项目：
> `docker network ls --no-trunc | grep <ID 前 12 位>`

---

## 2. 核心 PromQL 表达式

计算**总流量（GB）**的通用公式：

```promql
(
  sum(increase(node_network_receive_bytes_total{instance="192.168.31.2:9100", device=~"enp2s0|wlp1s0"}[$__range])) 
  + 
  sum(increase(node_network_transmit_bytes_total{instance="192.168.31.2:9100", device=~"enp2s0|wlp1s0"}[$__range]))
) / 1024 / 1024 / 1024
```

- **`increase(...[$__range])`**：计算选定时间段内的增量。它会自动处理服务器重启导致的计数器归零（Counter Reset）。
- **`device=~"enp2s0|wlp1s0"`**：使用正则只选物理网卡，排除 `br-` 和 `veth`，避免重复计算。
- **`/ 1024 / 1024 / 1024`**：将单位从 Bytes 转换为 GB。

---

## 3. 如何实现“自然月”统计表格？

Prometheus 擅长看“过去 30 天”，如果要看“1 月、2 月”这种账单报表，需在 Grafana 做以下配置：

1. **面板选择**：使用 **Table** 视图。
2. **Query Options**：将 **Min interval** 设置为 `1M`（强制按月聚合）。
3. **Transform （转换）**：
    - 添加 **"Group by"**：
        - `Time` 列：选 `Group by`，间隔选 `1M`。
        - `Value` 列：选 `Calculate` -> `Total`。
4. **时间范围**：右上角选择 `Last 6 months`，即可看到逐月对比。

---

## 4. 常见问题 (FAQ)

- **Q: 为什么查不到月初的数据？**
  - A: 检查 Prometheus 启动参数 `--storage.tsdb.retention.time`。默认仅 15 天，建议改为 `90d` 或更久。
- **Q: `first_over_time` 报错怎么办？**
  - A: 原生 Prometheus 不支持此函数。可用 `min_over_time(...[30d])` 替代，因为流量计数器是递增的，区间最小值就是该区间的起点值。
- **Q: 流量准吗？**
  - A: `enp2s0` 包含局域网内（如手机访问服务器）的流量。若要绝对准确的“光猫账单”，建议在路由器的 WAN 口部署监控。

---

## 5. 进阶：网络链路质量参考

如果流量正常但访问慢，需配合以下工具排查运营商（移动/联通）线路：

- **`mtr -rw <IP>`**：看每一跳的丢包率（Loss%）。
- **`nexttrace <IP>`**：看流量经过了哪些城市的运营商网关。

---
