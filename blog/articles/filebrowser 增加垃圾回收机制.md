---
title: filebrowser 增加垃圾回收机制
date: 2026-08-25 14:46:48
permalink: /pages/a17d98c9-1c39-45db-a711-09f9e108e1c5/
tags:
  - 
categories:
  - 编程
article: true
---

# filebrowser 增加垃圾回收机制

- https://github.com/filebrowser/filebrowser/issues/1854
  - Add the command below under "Before Delete"
  - `/bin/sh -c 'if [[ "$FILE" != "/srv/Trash/"* ]]; then mv $FILE /srv/Trash; fi'`
  - Works great in my docker container on linux
- 2026-08-25 更新 image 到 s6

## docker-compose + 装 trash-cli

### docker file

- 创建 dockerfile

```dockerfile
FROM filebrowser/filebrowser:s6
# no lightweight busybox-based container 
# FROM filebrowser/filebrowser:latest
RUN apk add trash-cli
```

- 修改 docker-compose.yml
  - [build 相关](https://juejin.cn/s/docker-compose.yml%20build%20context)
  - 改成 ./database ./config 两个文件夹了，新镜像改了逻辑 配置识别很奇怪。

```dockerfile
# vi docker-compose.yml
version: '3'
services:
  filebrowser:
    # image: filebrowser/filebrowser:latest
    container_name: filebrowser
    restart: always
    build:
      context: .
    ports:
      - "8089:80/tcp"
    networks:
      - net
    volumes:
      - ./database:/database
      - ./config:/config
      - /etc/localtime:/etc/localtime:ro
      # data
      - ./srv:/srv
      - /mnt/data:/srv/data

networks:
  net:
    driver: bridge

```

### 设置配置

- 初始化配置文件和数据可
  - `docker run --rm -v $(pwd)/database:/database -v $(pwd)/config:/config filebrowser/filebrowser config init`
- 设置密码长度为 1
  - `docker run --rm -v $(pwd)/database:/database -v $(pwd)/config:/config filebrowser/filebrowser config set --minimumPasswordLength=1`
  - 注意 admin 密码不能设置为 admin 建议自己再创建一个账号用于管路员
- 开启 Command Runner
  - `docker run --rm -v $(pwd)/database:/database -v $(pwd)/config:/config filebrowser/filebrowser config set --disableExec false`
  - 没有这个不能设置 Before Delete

- 设置 - 全局设置 - 修改 Before Delete 删除命令

### 启动命令

- sudo docker compose up -d --build
- admin 密码第一次会打印到日志里

## 设置 trash

```dockerfile
trash-put $FILE
```

- 查找删除的文件在哪里
  - `trash-list --trash-dirs`
  - `trash-put --trash-dir=/srv/data/.Trash-1000 $FILE`

---

## Aside

- 这个 [项目](https://github.com/filebrowser/filebrowser) 作者说在今年 9 月份就不跟新了，已经把项目关闭了 issue 和 PR
