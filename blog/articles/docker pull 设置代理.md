---
title: docker pull 设置代理
date: 2024-06-09 01:54:45
permalink: /pages/028f2f47-b0e6-406e-9f21-16c14584b20f/
tags:
  - 
categories:
  - 编程
article: true
---

# docker pull 设置代理

- 国内所有 Docker 的镜像服务器必须全部下架
- [国内 hub 列表](https://gist.github.com/y0ngb1n/7e8f16af3242c7815e7ca2f0833d3ea6)
- [Docker 使用代理拉取镜像](https://cloud.tencent.com/developer/article/2296763)

## 删除旧镜像服务器文件

```bash
sudo mv /etc/docker/daemon.json /etc/docker/daemon.json.bak.20240609
```

## Docker d 开启代理

```bash
sudo mkdir -p /etc/systemd/system/docker.service.d
sudo touch /etc/systemd/system/docker.service.d/proxy.conf
sudo vim /etc/systemd/system/docker.service.d/proxy.conf

# Add content below
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:7890/"
Environment="HTTPS_PROXY=http://127.0.0.1:7890/"
Environment="NO_PROXY=localhost,127.0.0.1,.example.com"

# 重启Docker
sudo systemctl daemon-reload && sudo systemctl restart docker

# 检查Docker有没有使用VPN
systemctl show --property=Environment docker
# Environment=HTTP_PROXY=http://127.0.0.1:7890 HTTPS_PROXY=http://127.0.0.1:7890
```
