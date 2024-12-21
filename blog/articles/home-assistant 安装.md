---
title: home-assistant 安装
date: 2024-12-21 20:18:59
permalink: /pages/9b3b1d45-db2b-45af-9f1a-a49c2bbe9352/
tags:
  - 
categories:
  - 随笔
article: true
---

# home-assistant 安装

- [参考](https://niu.sspai.com/post/94916)
  - [给开放智能家居生态一个好的开始：小米官方 Home Assistant 集成上手体验](https://sspai.com/post/94916)
  - [Docker+HomeAssistant+HACS+设备接入教程](https://www.cnblogs.com/isit/p/17043428.html)

> 感觉 docker 版本不支持 supervisor 和 add-ons 功能怪怪的。也没啥特别好玩的地方，同时也不自持触发，米家本身设置的事件。而且这样子安全问题感觉也增加了，没太大必要折腾，可以关注下跟新日志，等功能完善了再玩。

## home-assistant docker 安装

- [参考](https://www.home-assistant.io/installation/linux)

![版本区别](https://img-blog.csdnimg.cn/a4bc3cd04f134a33b647762faa38907c.png)

- home-assistant/docker-compose.yml

```yaml
version: '3'
services:
  homeassistant:
    container_name: home-assistant
    image: ghcr.io/home-assistant/home-assistant:latest
    volumes:
      - ./config:/config  # 持久化配置文件，请替换为实际路径
      - /etc/localtime:/etc/localtime:ro            # 同步主机时区
    environment:
      - TZ=Asia/Shanghai                            # 设置时区，根据需要修改
    ports:
      - "8123:8123"                                 # 映射端口
    restart: unless-stopped
    network_mode: host                              # 使用主机网络模式

```

## ha_xiaomi_home 插件安装

- github-[ha_xiaomi_home](https://github.com/XiaoMi/ha_xiaomi_home)
- [参考视频](https://www.bilibili.com/video/BV1V2kBY5Eek/)
- 2024-12-21：说是目前没上商店 上商店就用商店安装

> Download and copy custom_components/xiaomi_home folder to config/custom_components folder in your Home Assistant.

```bash
wget -e http_proxy=http://localhost:9999 -e https_proxy=http://localhost:9999 https://github.com/XiaoMi/ha_xiaomi_home/archive/refs/heads/main.zip

# 解压 ZIP 文件
unzip main.zip

# 将插件文件夹移动到 custom_components 目录
sudo cp -r ha_xiaomi_home-main/custom_components ./config/

# 清理下载的文件
sudo rm -rf ha_xiaomi_home-main main.zip

# 递归设置 custom_components 目录的权限
# sudo chown -R homeassistant:homeassistant custom_components/xiaomi_home

# 使用 systemd 管理的 Home Assistant
sudo docker compose restart
```

- http://localhost:8123/config/integrations/dashboard
- 设置 - 设备与服务 - 右下角 - 添加集成 - 搜索 'xiaomi home'
- 登录成功后 将 http://homeassistant.local:8123/ 改成 http://localhost:8123/

## ha 里安装 node-red 插件

- 需要高级模式
  - http://localhost:8123/profile/general
  - 高级模式 - 打开
- 需要安装 HACS
  - https://hacs.xyz/docs/use/download/download/
  - 安装后 - 设置 - 设备与服务 - 右下角 - 添加集成 - 搜索 'HACS'
- 搜了一下 好像需要 home-assistant-supervisor 这个版本 目前不支持 Ubuntu
  - [参考](https://community.home-assistant.io/t/how-to-run-home-assistant-supervisor-in-a-docker-container/303682/8)
  - 放弃
