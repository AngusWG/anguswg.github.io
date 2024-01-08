---
title: sentry 服务搭建
date: 2021-05-17 16:51:28
permalink: /pages/43ce60/
categories: 
  - 编程
tags: 
  - null
article: true
---

# sentry 服务搭建

- 请提前准备好一个用于发邮件提醒的 email
- 参考 https://juejin.cn/post/6847902219015356423

下载官方的部署项目

```bash
git clone https://github.com/getsentry/onpremise.git
cd onpremise
git chechout 9.1.2
```

docker 换源

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://hkoa9dfz.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

安装

```bash
export SENTRY_IMAGE='sentry:9.1.2'
./install.sh
```

运行 Sentry
docker-compose up -d

## Bug

> 解决 sentry 安装时的 could not translate host name “postgres” to address: Name or service not known

```bash
docker rmi postgres
docker pull postgres:9.6
```

更新后发现表不兼容  
偷懒直接删掉了
