---
title: samba 的 docker compose
date: 2024-03-03 21:24:38
permalink: /pages/2f9b7a87-b47f-40af-9c85-5ee1a146ed6d/
tags:
  - 
categories:
  - 编程
article: true
---

# samba 的 docker compose

- 两个项目
  - [dperson/samba](https://github.com/dperson/samba)
    - 四年前更新
  - [ServerContainers/samba](https://github.com/ServerContainers/samba)
    - 两个月前更新
    - 样例 [docker-compose.yml](https://github.com/ServerContainers/samba/blob/master/docker-compose.yml)

## 停掉之前的 samba

### Ubuntu 或 Debian

- 打开终端。
- 运行以下命令以停止 Samba 服务：

```shell
sudo systemctl stop smbd
sudo systemctl stop nmbd
```

- 运行以下命令以禁用 Samba 服务，使其在系统启动时不自动启动：

```shell
sudo systemctl disable smbd
sudo systemctl disable nmbd
```

### CentOS 或 RHEL

- 打开终端。
- 运行以下命令以停止 Samba 服务：

```shell
sudo systemctl stop smb
sudo systemctl stop nmb
```

- 运行以下命令以禁用 Samba 服务，使其在系统启动时不自动启动：

```shell
sudo systemctl disable smb
sudo systemctl disable nmb
```

## 生成用户信息

> sudo docker run -ti --rm --entrypoint create-hash.sh ghcr.io/servercontainers/samba
> >> Enter username: bob
> >> New password:
> >> Retype password:
> bob:1000:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:[U          ]:LCT-65E47AF9:

## 配置 docker-compose.yml 文件

- 跟着 [样例](https://github.com/ServerContainers/samba/blob/master/docker-compose.yml) 配置一下
  - 以前有 smb.conf 的可以直接大段复制进去

```yml
version: "3"
services:
  samba:
    image: ghcr.io/servercontainers/samba
    container_name: samba
    restart: unless-stopped
    cap_add:
      - CAP_NET_ADMIN
    volumes:
      - /home/bob/tmp:/home/bob/tmp
      - /tmp/smb_tmp:/tmp/smb_tmp
    ports:
      - 137:137/udp
      - 138:138/udp
      - 139:139
      - 445:445
    environment:

      GROUP_family: 1500

      ACCOUNT_alice: alipass
      UID_alice: 1000
      GROUPS_alice: family

      ACCOUNT_bob: "bob:1000:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:[U          ]:LCT-65E47AF9:"
      UID_bob: 1001
      GROUPS_bob: family

      SAMBA_VOLUME_CONFIG_tmp: |
        [tmp]
        path = /home/bob/tmp
        guest ok = yes
        public = yes
        browseable = yes
        writable = yes
        create mask = 0777
        directory mask = 0777
        available = yes

      SAMBA_VOLUME_CONFIG_share: |
        comment = /home/bob/
        guest ok = yes
        public = yes
        browseable = yes
        path = /home/bob/
        writable = no
        create mask = 0777
        directory mask = 0777
        available = yes
```

- windows 需要

```yml
    cap_add:
      - CAP_NET_ADMIN
```
