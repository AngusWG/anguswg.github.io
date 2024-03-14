---
title: 搭建 Portainer
date: 2024-11-02 17:30:22
permalink: /pages/dabbdda6-91e2-4274-89c7-9b265442a9bb/
tags:
  - 
categories:
  - 编程
article: true
---

# 搭建 Portainer

## 启动管理页面

- vim ./portainer/docker-compose.yml

```yaml
version: "3"

services:
  portainerce:
    image: portainer/portainer-ce:latest
    container_name: portainerce
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./portainer-data:/data
    ports:
      - 9000:9000
```

- `docker compose up -d` 启动
- 访问 127.0.0.1:9000 注册账号密码 应该会自动挂载当前环境的 docker 实例等。

## Portainer tls 远程连接 服务器 docker

- [CoreOS 配置 Docker API TLS 认证](https://cloud.tencent.com/developer/article/1335560)
- [参考（照搬） 如何开启 Docker Remote API 的 TLS 认证，并在 Portainer 上进行配置](https://www.xukecheng.tech/how-to-enable-tls-authentication-for-docker-remote-api)

### 生成证书

- `sudo vim /srv/certs.d/auto-tls-certs.sh`
- `sudo bash /srv/certs.d/auto-tls-certs.sh`
- `记得修改上面的配置信息`

```bash
#!/bin/bash
# 
# -------------------------------------------------------------
# 自动创建 Docker TLS 证书
# -------------------------------------------------------------

# 以下是配置信息
# --[BEGIN]------------------------------

PASSWORD="your code"
COUNTRY="CN"
STATE="your state"
CITY="your city"
ORGANIZATION="your org"
ORGANIZATIONAL_UNIT="your org unit"
EMAIL="your email"

# --[END]--

CODE="docker_api"
IP=`curl ip.sb -4`
COMMON_NAME="$IP"

# Generate CA key
openssl genrsa -aes256 -passout "pass:$PASSWORD" -out "ca-key-$CODE.pem" 4096
# Generate CA
openssl req -new -x509 -days 365 -key "ca-key-$CODE.pem" -sha256 -out "ca-$CODE.pem" -passin "pass:$PASSWORD" -subj "/C=$COUNTRY/ST=$STATE/L=$CITY/O=$ORGANIZATION/OU=$ORGANIZATIONAL_UNIT/CN=$COMMON_NAME/emailAddress=$EMAIL"
# Generate Server key
openssl genrsa -out "server-key-$CODE.pem" 4096

# Generate Server Certs.
openssl req -subj "/CN=$COMMON_NAME" -sha256 -new -key "server-key-$CODE.pem" -out server.csr

echo "subjectAltName = IP:$IP,IP:127.0.0.1" >> extfile.cnf
echo "extendedKeyUsage = serverAuth" >> extfile.cnf

openssl x509 -req -days 365 -sha256 -in server.csr -passin "pass:$PASSWORD" -CA "ca-$CODE.pem" -CAkey "ca-key-$CODE.pem" -CAcreateserial -out "server-cert-$CODE.pem" -extfile extfile.cnf

# Generate Client Certs.
rm -f extfile.cnf

openssl genrsa -out "key-$CODE.pem" 4096
openssl req -subj '/CN=client' -new -key "key-$CODE.pem" -out client.csr
echo extendedKeyUsage = clientAuth >> extfile.cnf
openssl x509 -req -days 365 -sha256 -in client.csr -passin "pass:$PASSWORD" -CA "ca-$CODE.pem" -CAkey "ca-key-$CODE.pem" -CAcreateserial -out "cert-$CODE.pem" -extfile extfile.cnf

rm -vf client.csr server.csr

chmod -v 0400 "ca-key-$CODE.pem" "key-$CODE.pem" "server-key-$CODE.pem"
chmod -v 0444 "ca-$CODE.pem" "server-cert-$CODE.pem" "cert-$CODE.pem"

# 打包客户端证书
mkdir -p "tls-client-certs-$CODE"
cp -f "ca-$CODE.pem" "cert-$CODE.pem" "key-$CODE.pem" "tls-client-certs-$CODE/"
cd "tls-client-certs-$CODE"
tar zcf "tls-client-certs-$CODE.tar.gz" *
mv "tls-client-certs-$CODE.tar.gz" ../
cd ..
rm -rf "tls-client-certs-$CODE"

# 拷贝服务端证书
mkdir -p /srv/certs.d
cp "ca-$CODE.pem" "server-cert-$CODE.pem" "server-key-$CODE.pem" "tls-client-certs-$CODE.tar.gz" /srv/certs.d/
```

## 开启 Docker API

- `sudo vim /lib/systemd/system/docker.service`

![alt text](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fefca8e37-c9f0-4c91-927c-eba88efd07a8%2FUntitled.png?table=block&id=a348ded6-ee3f-4d5c-b821-4bae2f30df34&cache=v2)

- 在 ExecStart 行的后面添加以下选项：

```text
-H=tcp://0.0.0.0:2376 --tlsverify --tlscacert=/srv/certs.d/ca-docker_api.pem --tlscert=/srv/certs.d/server-cert-docker_api.pem --tlskey=/srv/certs.d/server-key-docker_api.pem
```

- 最后，执行以下命令重新加载服务并重启 Docker：

```bash
systemctl daemon-reload && service docker restart
```

## 验证

此时，我们需要验证 Docker API 是否能够访问，且是否只能通过加密访问。

首先执行 `docker -H=127.0.0.1:2376 info`，一般来说会返回：

```text
Client: Context:    default Debug Mode: false Plugins: app: Docker App (Docker Inc., v0.9.1-beta3) buildx: Docker Buildx (Docker Inc., v0.9.1-docker) Server: ERROR: Error response from daemon: Client sent an HTTP request to an HTTPS server. errors pretty printing info
```

这是因为没有通过 tls 去访问，此时改用 `docker -H=127.0.0.1:2376 --tlsverify info`，会出现下面的错误：

```text
unable to resolve docker endpoint: open /root/.docker/ca.pem: no such file or directory
```

这是由于目前没有在对应的用户文件夹下配置证书，我们可以执行以下命令：

```bash
mkdir ~/.docker && \ tar -zxvf /srv/certs.d/tls-client-certs-docker_api.tar.gz -C ~/.docker && \ mv ~/.docker/ca-docker_api.pem ~/.docker/ca.pem && \ mv ~/.docker/cert-docker_api.pem ~/.docker/cert.pem && \ mv ~/.docker/key-docker_api.pem ~/.docker/key.pem
```

完成后再执行一遍 `docker -H=127.0.0.1:2376 --tlsverify info` 即可获取信息了，至此验证完成。

### 配置 Portainer

- 获取tls要用的文件
  - `sz /srv/certs.d/tls-client-certs-docker_api.tar.gz`

> Environment - Add environment - docker standalone - API - TLS 打开
