---
title: frp docker compose
date: 2024-03-12 18:50:07
permalink: /pages/9be5234c-d499-4bf8-aecb-eff84d0058f7/
tags:
  - 
categories:
  - 编程
article: true
---

# frp docker compose

- [docker-compose 部署 frp](https://blog.csdn.net/qq_38983728/article/details/130617190)
- [基于 Docker 的 Frp 内网穿透部署](https://blog.csdn.net/weixin_42888638/article/details/125233713)
- [nginx 服务器异常 502 bad gateway 原因排查](https://www.jb51.net/article/219281.htm)

## 选择镜像

[在 docker hub 上搜索 frp](https://hub.docker.com/search?q=frp) ，没有官方镜像，目前下载量最高的是 `snowdreamtech/frpc` 这个，所以选用这个，查了一下没有现成的 `docker-compose.yml` 参考。

## 写配置文件

- [snowdreamtech/frp](https://github.com/snowdreamtech/frp)
  - 没有默认参数参考
  - 从 .ini 文件改成了 .toml 文件。
    - [内网穿透 frp 配置 - 吴晓阳](https://www.cnblogs.com/shiningrise/p/17878386.html)
    - [绿联 安装 Frpc 内网穿透并使用 Nginx 反向代理隐藏端口号](https://www.sw0.top/archives/qTicstEs)
  - [frps.toml 参数举例项目](https://github.com/fatedier/frp/tree/dev/conf)

- 文件结构
  - 公网服务器
    - frps
      - frps.toml
      - docker-compose.yml
    - nginx
      - docker-compose.yml
      - conf.d
        - service_1.my_domain.conf
        - tmp.my_domain.conf
  - 内网服务
    - frpc
      - frpc.toml
      - docker-compose.yml

```bash
# 公网服务器
mkdir frps
touch frps/frps.toml
touch frps/docker-compose.yml

mkdir nginx
mkdir nginx/conf.d
touch nginx/conf.d/service_1.my_domain.conf
touch nginx/conf.d/tmp.my_domain.conf # 测试用 Nginx 配置

# 内网服务器
mkdir frpc
touch frpc/frpc.toml
touch frpc/docker-compose.yml
```

### frps.toml

- Server 端配置文件
  - 有公网 ip 或者域名指向
  - 用户访问 ip 所在的服务器

```toml
# vim frps/frps.toml
bindPort = 7000 #{必选} 客户端与该端口建立连接      
log.to = "console" #{可选}  日志配置， 通过打印的方式输出日志  
vhostHTTPPort = 7100 #{可选} http 代理需要，当访问该端口时跳到对应本地 frpc 代理
vhostHTTPSPort = 7200  #{可选} https 代理需要，当访问该端口时跳到对应本地 frpc 代理 
transport.tcpMux = true #tcp 流多路复用（优化传输，需一致）

#身份验证
auth.method = "token"  #{可选}身份验证方式 
auth.token = "password" #token 设置密码，用于通过身份验证创建连接

#frp 服务仪表板配置

webServer.port = 7500  #{也可自行修改端口}      
webServer.addr = "0.0.0.0" #公网 ip 或者域名  
webServer.user = "admin" #登录用户名{可自行修改}    
webServer.password = "admin" #登录密码{可自行修改}
```

### frpc.toml

```toml
# vim frpc/frpc.toml
serverAddr  = "服务器 IP 或域名"
serverPort  = 7000
log.to = "console"               
auth.token = "密钥"

#frpc 服务仪表板配置 可以不要
webServer.addr = "0.0.0.0"
webServer.port = 7400
webServer.user = "admin"
webServer.password = "admin"

[[proxies]]
name = "rdp"
type = "tcp"
localIP  = "10.128.39.41"
localPort  = 3389
remotePort  = 3389
```

## 报错

### 访问 Nginx 域名间接性无响应

- 写了个简单的配置测试，测试后依然没有返回结果，无日志。

```conf
# vim tmp.my_domain.conf
server {
    listen 80;
    listen 443 ssl;

    server_name tmp.my_domain.com; #请求域名

    include /etc/nginx/conf.d/base.conf;

    location  / {
      default_type application/json;
      return 200 '{"status":"success","result":"nginx json"}';
  }
}

```

- 本地机器上 `curl tmp.my_domain.com` 依然无结果。
- 感觉是官方 nginx 被反复硬重启，导致的无响应。
- `sudo docker compose stop && sudo docker compose rm -f && sudo docker compose up -d`
- 重启后 `curl tmp.my_domain.com` 反应正常。

### my_domain.com 端口可以访问 二级域名映射后走 Nginx 不能访问

```text
 *1 connect() failed (111: Connection refused) while connecting to upstream, client: 223.73.6.219, server: ttrss.my_domain.com, request: "GET / HTTP/1.1", upstream: "http://127.0.0.1:10181/", host: "ttrss.my_domain.com"
```

- docker 多个 compose 网络访问
  - [多个 docker-compose 共享网络并相互调用服务](https://juejin.cn/post/7070401263019491365)

#### 被访问端 Server A

- 声明所用的网络

```yml
# vim frps/docker-compose.yml
version: '3'
services:
  frps:
    restart: unless-stopped
    image: snowdreamtech/frps
    container_name: frps
    volumes:
      - ./frps.toml:/etc/frp/frps.toml
    ports:
      - 7000:7000
    networks:
      - default # 默认为 service_name + network_name = frps_default

networks:
  default:
    driver: bridge
```

#### 访问端 Nginx

- 注明需要访问的网络

```yml
# vim nginx/docker-compose.yml
version: '3'
services:
  nginx:
    restart: unless-stopped
    container_name: nginx
    image: nginx
    # network_mode: "host"
    ports:
      - 80:80
      - 443:443
    environment:
      - NGINX_PORT=80
      - TZ=Asia/Shanghai
    privileged: true
    volumes:
      # # 有可能会出现不能挂载，这个时候用手动拷贝配置文件就行
      # - /usr/local/nginx/nginx.conf/:/etc/nginx/nginx.conf
      # - /usr/local/nginx/html:/usr/share/nginx/html
      # - /usr/local/nginx/www:/var/www
      # - /usr/local/nginx/etc/cert:/etc/nginx/cert
      - /var/log/nginx:/var/log/nginx
      - ./conf.d:/etc/nginx/conf.d
      - /etc/letsencrypt:/etc/letsencrypt
      - /etc/letsencrypt/live/my_domain.com:/usr/local/nginx/ssl/any
    networks:
      - frps_default # 默认为 service_name + network_name = frps_default

networks:
  frps_default:
    external: true
```

- 这时候，Nginx 配置文件里的 ip 地址就可以直接用 frps 配置里的服务名 frps

```yml
# vim ./conf.d/service_a.my_domain.conf
upstream docker-frps {
    server frps:3389;
}

server {
    listen 80;
    listen 443 ssl;

    server_name service_a.my_domain.com; #请求域名

    include /etc/nginx/conf.d/base.conf;

    location / {
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Ssl on;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_pass http://docker-frps;

    }

    # set site favicon
    location /favicon.ico {
        return 204 ;
    }
}

```

### Nginx and favicon.ico - "GET /favicon.ico HTTP/1.1" FAILED

- [参考](https://stackoverflow.com/questions/9657065/nginx-and-favicon-ico-get-favicon-ico-http-1-1-failed)

```text
location = /favicon.ico {
  return 204;
  access_log     off;
  log_not_found  off;
}
```

## 最后 frpc 的 docker-compose.yml

```yml
# vim frpc/docker-compose.yml
version: '3'
services:
  frpc:
    restart: unless-stopped
    image: snowdreamtech/frpc
    container_name: frpc
    volumes:
      - ./frpc.toml:/etc/frp/frpc.toml
    # ports:
    #   - 7400:7400
```

因为是由 frpc 访问内网服务，所以它不用写端口，不过有个管理页面，需要的打开。

---
