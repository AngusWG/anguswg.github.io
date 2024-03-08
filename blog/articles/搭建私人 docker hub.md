---
title: 搭建私人 docker hub
date: 2024-01-02 23:31:58
permalink: /pages/03a973c6-ce60-48b6-ba4d-d2edbe813080/
tags:
  - 
categories:
  - 编程
article: true
---

# 搭建私人 docker hub

## 参考

- [Creating a Private Local Docker Registry using Play with Docker](https://dockerlabs.collabnix.com/beginners/build-private-docker-registry.html)
- [How To Set Up a Private Docker Registry on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-private-docker-registry-on-ubuntu-20-04)

## docker hub 运行

``` bash
mkdir ~/docker-registry
cd ~/docker-registry
mkdir data
vim docker-compose.yml
```

``` dockerfile
version: '3.8'

# docker-compose -f /root/vutlr_docker_compose_file.yml up -d
services:
  registry:
    container_name: registry
    image: registry
    restart: always
    ports:
      - "5000:5000"
    environment:
      REGISTRY_AUTH: htpasswd # For auth add
      REGISTRY_AUTH_HTPASSWD_REALM: Registry # For auth add
      REGISTRY_AUTH_HTPASSWD_PATH: /auth/registry.password # For auth add
      REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY: /data
    volumes:
      - /data/docker/data:/data
      - /data/docker/auth:/auth

  registry-frontend:
    image: konradkleine/docker-registry-frontend:v2
    ports:
      - 8080:80
    volumes:
      - ./certs/frontend.crt:/etc/apache2/server.crt:ro
      - ./certs/frontend.key:/etc/apache2/server.key:ro
    environment:
      - ENV_DOCKER_REGISTRY_HOST=192.168.31.2
      - ENV_DOCKER_REGISTRY_PORT=5000
```

## 鉴权

``` bash
sudo apt install apache2-utils -y
mkdir /data/docker/auth
cd /data/docker/auth
htpasswd -Bc registry.password username
```

> 如果不加鉴权 把 For auth add 的三行注释掉

启动服务 `docker-compose up`

## 上传

``` bash
# 无鉴权可以不登录
docker login localhost:5000/

docker tag xxx/test-image localhost:5000/test-image
docker push localhost:5000/test-image

docker login https://your_domain
docker push your_domain/test-image
```

## 下载

``` bash
# 无鉴权可以不登录
docker login localhost:5000/

docker pull localhost:5000/test-image

docker login https://your_domain
docker pull your_domain/test-image
```

## 前端可视化

- docker-compose.yml 已经包含
- 访问 http://ip:8080 打开页面
- 使用之前 docker-hub 的账号密码进行登录

## 报错

### [解决没有足够权限访问 Docker 守护进程的问题](https://www.jianshu.com/p/31b1febf88f1)

``` text
permission denied while trying to connect to the Docker daemon socket at unix
```

解决：`chmod 666 /var/run/docker.sock`
