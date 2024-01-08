---
title: vdoing 主题博客打开评论
date: 2021-11-16 12:05:06
permalink: /pages/93b553/
categories: 
  - 编程
tags: 
  - null
article: true
---
# vdoing 主题博客打开评论

- 参考 [使用 Gitalk 实现静态博客无后台评论系统](https://xugaoyi.github.io/vdoing-demo-repository/pages/1da0bf9a988eafe5/)

配置完后，感觉 gitalk 的 clientID 和 clientSecret 不能直接放项目中，毕竟是开源的。

参考 action 的配置，在项目设置中找到 secert 配置，增加两个环境变量。

`.github\workflows\ci.yml`下面的 action 配置，增加如下配置：

```text
GITALK_CLIENTID: ${{ secrets.GITALK_CLIENTID }}
GITALK_CLIENTSECRET: ${{ secrets.GITALK_CLIENTSECRET }}
```

config.js 中使用配置的环境变量名称就好了。

```text
clientID: process.env.GITALK_CLIENTID,
clientSecret: process.env.GITALK_CLIENTSECRET,
```

本地测试因为填写了 feedback 为博客地址，会导致登陆后默认指向线上博客地址，所以本地测试没有成功。

好了博客评论系统开启了，其实相关评论都到 issus 里去了，还有点不习惯。

具体配置有啥不懂的，可以看看本项目的源码。
