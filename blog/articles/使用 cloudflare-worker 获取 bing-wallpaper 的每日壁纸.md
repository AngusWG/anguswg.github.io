---
title: 使用 cloudflare-worker 获取 bing-wallpaper 的每日壁纸
date: 2024-03-06 21:52:59
permalink: /pages/4fd49ef1-4e3a-4e80-b7e1-901e5e6a2194/
tags:
  - 
categories:
  - 编程
article: true
---

# 使用 cloudflare-worker 获取 bing-wallpaper 的每日壁纸

- [参考 is-there-a-way-to-get-bings-photo-of-the-day](https://stackoverflow.com/questions/10639914/is-there-a-way-to-get-bings-photo-of-the-day)

> Cloudflare Worker 是由 Cloudflare 提供的一种边缘计算平台，用于在全球分布的边缘节点上运行和扩展代码。它允许开发人员将自定义代码部署到 Cloudflare 的网络中，将计算任务尽可能地靠近用户，实现低延迟和高性能的应用程序。
>
> 使用 Cloudflare Worker，开发人员可以编写和部署 JavaScript 代码，这些代码在 Cloudflare 的边缘节点上执行。这意味着代码可以在靠近用户的位置运行，而不是在传统的中心化服务器上。这种分布式计算的方式可以提供更快的响应时间和更好的用户体验。

- bing 有个 wallpaper 软件
- 每天一张高清图片 做桌面背景
- 订阅链接
  - https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US
- 然后用 cloudflare  worker 转换了一下

代码如下：

```javascript
export default {
  // async fetch(request, env, ctx) {
  //   return new Response('Hello World!');
  // },

  
  async fetch(request, env, ctx) {
    const response = await fetch('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US')
    const data = await response.json()
  
    const image_url = data.images[0].url
    const target_url = `https://www.bing.com${image_url}`

    const image_response = await fetch(target_url)
  
    return new Response(image_response.body, image_response)
  }
};
```

- 保存后项目会提示有对应的订阅链接
  - 这个链接就不放了，有每日 10w 的使用次数
- 其实是为了 cloudflare-worker 这盘醋包了 bing-wallpaper 这个饺子。
