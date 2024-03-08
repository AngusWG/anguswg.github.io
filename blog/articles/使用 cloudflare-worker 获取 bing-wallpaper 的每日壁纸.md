---
title: 使用 cloudflare-worker 获取 bing-wallpaper 的每日壁纸
date: 2024-03-06 21:52:58
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
  
    const CACHE_TIME = 12 * 60 * 60; // 缓存时间为 12 小时，单位为秒

    const response = new Response(image_response.body, image_response);
    // 设置 Cache-Control 标头
    response.headers.set('Cache-Control', `max-age=${CACHE_TIME}`);
    return response;
  }
};
```

- 保存后项目会提示有对应的订阅链接
  - 这个链接就不放了，有每日 10w 的使用次数
- 其实是为了 cloudflare-worker 这盘醋包了 bing-wallpaper 这个饺子。

## 图片到期时间太长

在 Microsoft Edge 浏览器中，你可以使用开发者工具来查看图片的缓存到期时间。请按照以下步骤进行操作：

1. 打开 Microsoft Edge 浏览器，并导航到包含你要查看的图的网页。
2. 在浏览器中，按下 F12 键，或右键点击网页上的任何位置，然后选择 "检查" 或 "检查元素"。这将打开开发者工具窗口。
3. 在开发者工具窗口中，切换到 "网络" 或 "Network" 选项卡。这将显示所有加载的网络资源列表。
4. 在资源列表中，找到你要查看缓存到期时间的图片。你可以使用筛选器或直接滚动浏览列表来找到它。
5. 右键点击图片资源，并选择 "检查" 或 "Inspect"。这将打开 "元素" 或 "Elements" 面板，其中将显示有关该图片的详细信息。
6. 在 "元素" 或 "Elements" 面板中，查找 "请求标头" 或 "Request Headers" 部分。在该部分中，你将看到 "缓存控制" 或 "Cache-Control" 的信息。它会提供关于图片缓存到期时间的指示。
   - 如果 "缓存控制" 或 "Cache-Control" 的值为 "max-age=xxx"，其中 "xxx" 表示以秒为单位的缓存有效期。例如，"max-age=3600" 表示图片缓存将在 3600 秒（1 小时）后过期。
   - 如果 "缓存控制" 或 "Cache-Control" 的值为 "no-cache"，表示该图片不会被缓存。

- 通过查看缓存控制标头，你可以了解图片缓存的到期时间或是否会被缓存。请注意，这仅适用于服务器正确设置了缓存控制标头的情况。如果服务器未提供缓存控制信息，浏览器可能会使用默认的缓存策略。

- 增加代码解决

```js
    const response = new Response(image_response.body, image_response);
    // 设置 Cache-Control 标头
    response.headers.set('Cache-Control', `max-age=${CACHE_TIME}`);
```
