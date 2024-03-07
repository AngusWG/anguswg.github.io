---
title: 设置 homepage
date: 2024-03-02 20:07:49
permalink: /pages/4e8e807b-f374-4f66-b73a-0054270bee9b/
tags:
  - 
categories:
  - 编程
article: true
---

# 设置 homepage

![images](https://static.himiku.com/2023/05/09/645a314bded6c.webp#vwid=2560&vhei=1440)

- [参考]
  - [1](https://www.himiku.com/archives/homepage.html)
  - [2](https://hao.minxc.cn/)
- 项目地址 [gethomepage/homepage](https://github.com/gethomepage/homepage)
  - [说明书](https://gethomepage.dev/)
  - 差不多的项目 [heimdall](https://github.com/linuxserver/Heimdall)
- 先拉个镜像
  - 镜像拉起后会有配置自动出现在 `./config` 这个目录里
  - 然后可以通过 [VSCode SFTP](https://github.com/liximomo/vscode-sftp) 插件同步到编辑器，编辑完后再上传到部署服务器上。

```yml
version: "3.3"
services:
  homepage:
    image: ghcr.io/gethomepage/homepage:latest
    container_name: homepage
    environment:
    ports:
      - 3000:3000
    volumes:
      - ./config:/app/config # Make sure your local config directory exists
      - /var/run/docker.sock:/var/run/docker.sock:ro # optional, for docker integrations
    restart: unless-stopped
```

- [图标查找](https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/ICONS.md)
  - 源项目是 [dashboard-icons](https://github.com/walkxcode/dashboard-icons)

## 快速给每个 收藏点加上 ping 的功能

- vscode 中 ctrl+R 打开当前文件的内容替换
  - 查找：`href: (.*)\n(?!        ping)`
  - 替换为：`href: $1\n        ping: $1\n`
  - 点击 "替换所有"

- 相关文章
  - [[使用 cloudflare-worker 获取 bing-wallpaper 的每日壁纸]]
