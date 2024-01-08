---
title: 自建 RSS 订阅
date: 2024-01-05 15:00:18
permalink: /pages/23a443fc-f25f-49f0-a492-6a938347a02e/
tags:
  - 
categories:
  - 编程
article: true
---

# 自建 RSS 订阅

- 参考
  - [找不到满意的 RSS 服务？你可以自己搭建一个](https://sspai.com/post/57498)
  - [TTRSS + RSSHUB 个人 RSS 服务](https://zhuanlan.zhihu.com/p/162205077)
  - [使用 RSS 构建你自己的聚合信息](https://jasonkayzk.github.io/2019/09/23/%E4%BD%BF%E7%94%A8RSS%E6%9E%84%E5%BB%BA%E4%BD%A0%E8%87%AA%E5%B7%B1%E7%9A%84%E8%81%9A%E5%90%88%E4%BF%A1%E6%81%AF/)

## tt-rss

- [项目源](https://github.com/HenryQW/Awesome-TTRSS)
- [说明书](https://ttrss.henry.wang/zh/)

> - Tiny Tiny RSS（TT-RSS）是一款基于 PHP 的免费开源 RSS 聚合阅读器，需要自行托管和部署，为基于网页的 RSS 阅读器。
> `暂时没找到邮件推送的方法。`
> - 目前有被墙的 [feedly](https://feedly.com/) 做替代品，不知道好用不。
> - 订阅配置可以一键导出，切换用问题不大。

```bash

wget https://raw.githubusercontent.com/HenryQW/Awesome-TTRSS/master/docker-compose.yml
docker-compose down
docker-compose up -d
```

> http://localhost:181/
> 默认账户： admin 密码： password

### 设置代理

在 docker-compose.yml 中 environment 增加全局变量 `HTTP_PROXY` 和 `HTTPS_PROXY`

```yaml
  service.rss:
    image: wangqiru/ttrss:latest
    container_name: ttrss
    ports:
      - 181:80
    environment:
      - HTTP_PROXY=http://localhost:9999
      - HTTPS_PROXY=http://localhost:9999
```

### ~~设置邮件~~

- `失败 暂时不弄`

```yaml
  service.rss:
    image: wangqiru/ttrss:latest
    container_name: ttrss
    ports:
      - 181:80
    environment:
      - SMTP_FROM_NAME=Tiny Tiny RSS
      - SMTP_FROM_ADDRESS=USERNAME@gmail.com
      - SMTP_SERVER=smtp.gmail.com:465
      - SMTP_LOGIN=USERNAME@gmail.com
      - SMTP_PASSWORD=PASSWORD
      - SMTP_SECURE=tls
```

> - [发送邮件时出现未知错误。尝试的挂钩 0](https://github.com/HenryQW/tt-rss-mirror/blob/ba6a912abdcc3e324d809cc873923aec2a5982fe/classes/mailer.php#L18)
> - Unknown error while sending mail. Hooks tried 0
> - 尝试安装插件 [`ttrss-mailer-smtp`](https://docs.bitnami.com/aws/apps/tiny-tiny-rss/configuration/configure-smtp/)
> - 挂梯子访问 it.tt-rss.org 失败

## 浏览器插件

- [RSSHub Radar](https://chromewebstore.google.com/detail/rsshub-radar/kefjpfngnndepjbopdmoebkipbgkggaa)
  - RSSHub Radar 是 RSSHub 的衍生项目，是一个能帮助用户发现和订阅 RSS 源的浏览器扩展插件。
  - 强烈建议安装。
  - 可以发现如 知乎、b 站、github 等 `不常用 非官方` 的 RSS 订阅源。
    - github 有官方的 release 订阅源，RSSHub Radar 不会显示，在 [rsshub 教程](https://docs.rsshub.app/zh/api) 查到的。
  - 需要 TTRSS 能翻墙访问 RSSHub

## rsshub

- [rsshub 教程](https://docs.rsshub.app/zh/api)

> - RSSHub 是一个开源、简单易用、易于扩展的 RSS 生成器，可以给任何奇奇怪怪的内容生成 RSS 订阅源。它借助于开源社区的力量快速发展，目前已适配数百家网站的上千项内容。
> - RSSHub 和 TT-RSS 的主要区别在于，RSSHub 是一个 RSS 生成器，可以将非 RSS 格式的内容转换为 RSS 格式以便订阅；而 TT-RSS 是一个 RSS 阅读器，用于订阅和阅读 RSS 格式的内容。
> - `一般情况下不用部署`

```bash
mkdir ~/server/rss -p
cd ~/server/rss
wget https://raw.githubusercontent.com/DIYgod/RSSHub/master/docker-compose.yml
docker volume create redis-data
docker-compose up -d
```

> - docker image 下载慢 换 [腾讯源](https://cloud.tencent.com/document/product/1207/45596)

访问 localhost:1200
