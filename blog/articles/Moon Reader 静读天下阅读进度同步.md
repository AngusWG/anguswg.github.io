---
title: Moon Reader 静读天下阅读进度同步
date: 2024-10-31 16:11:06
permalink: /pages/0f6032f2-bce6-4619-a2fa-c897414dfa74/
tags:
  - 
categories:
  - 编程
article: true
---

# Moon Reader 静读天下阅读进度同步

- 软件 目前版本
  - Moon__Reader_Pro-v9.7_build_907002-Mod.apk

## calibre

- 太大了 镜像都有好几个 g 不想弄

## WebDav

- 打开异常
  - 放弃

## ftp

- 读取地址异常
- 估计是 docker 服务不行
- 换了一个打开就好了

```yaml
version: '3'
services:
  ftp-server:
    image: fauria/vsftpd # 使用 fauria/vsftpd 镜像
    container_name: ftp-server
    ports:
      - "9921:21" # FTP 控制连接端口
      - "21100-21110:21100-21110" # FTP 被动模式的端口范围
    environment:
      FTP_USER: "user" # FTP 用户名
      FTP_PASS: "123" # FTP 密码
      PASV_ADDRESS: "192.168.31.2" # 替换为你的服务器公网 IP 地址
      PASV_MIN_PORT: "21100" # 被动模式端口范围开始
      PASV_MAX_PORT: "21110" # 被动模式端口范围结束
      FILE_OPEN_MODE: "0777" # 文件权限
      LOCAL_UMASK: "022" # 掩码设置
    volumes:
      - ./ftp-data:/home/vsftpd # 挂载本地目录到容器
    restart: always
```

- 静读天下 设置- FTP 同步 - 设置
- 查看下路径写的什么  默认应该是 `[FTP]/Apps/Books`
- 需要根据 `docker-compose.yml` 使用命令
  - `mkdir -p ./ftp-data/user/Apps/Books`

- 现在应该能正常使用了
- 可以吧自动同步关掉 改成手动同步
  - [ ] 离开家后 弹出同步失败
    - 其实提示也不多 不要频繁切换小说就还好

- tips:
  - 在设置里可以点击同步 将所以书目同步到云上
