---
title: ttrss 邮件
date: 2024-11-11 09:55:02
permalink: /pages/319a8557-6849-41b3-8ee7-70e519d5aff5/
tags:
  - 
categories:
  - 编程
article: true
---

# ttrss 邮件

- 参考
  - [Awesome-TTRSS](https://github.com/HenryQW/Awesome-TTRSS)
    - https://ttrss.henry.wang
  - [项目](https://gitlab.tt-rss.org/tt-rss/plugins/ttrss-mailer-smtp)

## docker-compose.yml 默认不装载插件

- 使用自定义 Dockerfile
- `vim Dockerfile.ttrss`

```Dockerfile
# 使用原始镜像
FROM wangqiru/ttrss:latest

# 安装 git
# RUN apt-get update && apt-get install -y git && \
#     rm -rf /var/lib/apt/lists/*

# 配置 Git 允许不安全目录
RUN git config --global --add safe.directory '*'

# 克隆插件到指定目录
RUN git clone https://gitlab.tt-rss.org/tt-rss/plugins/ttrss-mailer-smtp.git /var/www/plugins.local/mailer_smtp

# 更改克隆目录的权限，确保容器内的用户拥有该目录
RUN chown -R nobody:nginx  /var/www/plugins.local/mailer_smtp
```

- 修改镜像

```yml
  service.rss: # 原来的
    image: wangqiru/ttrss:latest

```

```yml
  service.rss:
    build: # 修改后
      context: .
      dockerfile: Dockerfile.ttrss # 使用自定义 Dockerfile
```

- 这样就默认装插件了

---

## 启动插件

- docker 启动的 ttrss 想开启 https://gitlab.tt-rss.org/tt-rss/plugins/ttrss-mailer-smtp，TTRSS_PLUGINS 这个环境变量
  - 用的不是官方 docker 的，用的是 [dockerhub](https://hub.docker.com/r/wangqiru/ttrss)
  - 启动插件变量是 `ENABLE_PLUGINS=auth_internal,mailer_smtp`

- 全邮件环境变量

```yml
      - ENABLE_PLUGINS=auth_internal,mailer_smtp # plugin
      - SMTP_FROM_NAME=TinyTinyRSS # email
      - SMTP_FROM_ADDRESS=xxxxxxx_bot@163.com # email
      - SMTP_SERVER=smtp.163.com:465 # email
      - SMTP_LOGIN=xxxxxxx_bot@163.com # email
      - SMTP_PASSWORD=XXXXXXXXXXXXXX # email
      - SMTP_SECURE=ssl # email
```

---

## 报错 SMTP connect() failed. https://github.com/PHPMailer/PHPMailer/wiki/Troubleshooting

- 修改邮箱配置
  - 将端口从 25 改为 465 测试邮件发送成功

---

## 全 docker-compose.yml

- `vim docker-compose.yml`

```yml
version: "3"

# https://ttrss.4yewu.cc/ guest guest  弄个普通账号给大家玩

services:
  service.rss:
    build:
      context: .
      dockerfile: Dockerfile.ttrss # 使用自定义 Dockerfile
    container_name: ttrss
    ports:
      - 181:80
    environment:
      - HTTP_PROXY=http://localhost:9999 # 设置代理
      - HTTPS_PROXY=http://localhost:9999 # 设置代理
      - SELF_URL_PATH=http://localhost:181/ # please change to your own domain
      - DB_PASS=ttrss # use the same password defined in `database.postgres`
      - PUID=1000
      - PGID=1000
      - ENABLE_PLUGINS=auth_internal,mailer_smtp # plugin
      - SMTP_FROM_NAME=TinyTinyRSS # email
      - SMTP_FROM_ADDRESS=xxxxxxx_bot@163.com # email
      - SMTP_SERVER=smtp.163.com:465 # email
      - SMTP_LOGIN=xxxxxxx_bot@163.com # email
      - SMTP_PASSWORD=XXXXXXXXXXXXXX # email
      - SMTP_SECURE=ssl # email
    volumes:
      - feed-icons:/var/www/feed-icons/
    networks:
      - public_access
      - service_only
      - database_only
    stdin_open: true
    tty: true
    restart: always

  service.mercury:
    # set Mercury Parser API endpoint to `service.mercury:3000` on TTRSS plugin setting page
    image: wangqiru/mercury-parser-api:latest
    container_name: mercury
    networks:
      - public_access
      - service_only
    restart: always

  service.opencc:
    # set OpenCC API endpoint to `service.opencc:3000` on TTRSS plugin setting page
    image: wangqiru/opencc-api-server:latest
    container_name: opencc
    environment:
      - NODE_ENV=production
    networks:
      - service_only
    restart: always

  database.postgres:
    image: postgres:13-alpine
    container_name: postgres
    environment:
      - POSTGRES_PASSWORD=ttrss # feel free to change the password
    volumes:
      - ~/postgres/data/:/var/lib/postgresql/data # persist postgres data to ~/postgres/data/ on the host
    networks:
      - database_only
    restart: always
  # utility.watchtower:
  #   container_name: watchtower
  #   image: containrrr/watchtower:latest
  #   volumes:
  #     - /var/run/docker.sock:/var/run/docker.sock
  #   environment:
  #     - WATCHTOWER_CLEANUP=true
  #     - WATCHTOWER_POLL_INTERVAL=86400
  #   restart: always

volumes:
  feed-icons:

networks:
  public_access: # Provide the access for ttrss UI
  service_only:
    # Provide the communication network between services only
    internal: true
  database_only:
    # Provide the communication between ttrss and database only
    internal: true
```

- Dockerfile.ttrss 往上看

---

ps.这部分资料是真的少 😵‍💫
