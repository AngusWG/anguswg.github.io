---
title: Python 爬虫与请求发起者链
date: 2024-05-03 16:28:02
permalink: /pages/97dfc3b6-9628-4ae9-8912-a7e8241ad27a/
tags:
  - 屁大点事
categories:
  - Python
article: true
---

# Python 爬虫与请求发起者链

最近在编写爬虫时，我遇到了一个非常奇怪的请求，通过浏览器的 F12 开发者工具抓取到了它。

- 响应与预览
  - 无法加载响应数据：因为该请求被重定向，所以没有可用内容
- 但在请求发起者链下面有多条记录

- 在网络选项卡下也能找到对应的请求
- 经过几次跳转后，触发了浏览器的文件下载工具开始下载文件

- 我首先尝试使用 requests 直接访问这个下载链接，等待了一段时间后，请求超时了
- 我以为是 cookies 的问题，`右键请求-复制为 cURL - [转成 Python 代码](https://curlconverter.com/)`
  - 仍然不行
- 我还以为每次请求会有某个头部或其他东西，于是使用了 requests.session。
  - 也不行
- 偶尔有一次请求成功了，状态码是 200，但是我注意到 F12 里面显示的请求状态码是 302，还是不对劲，
- 我查找了关于 Python requests 302 相关的帖子
  - `Python requests 默认设置了 allow_redirects=True`。
  - 这导致了有 302 的情况下直接跳转到下一个链接，
  - 无法获取到文件下载的链接，
  - 然后直接开始下载，
  - 由于网络不稳定或其他原因，导致了超时。
  - 将 allow_redirects 设置为 False 后问题得到解决

```python
# 三层下载
# 第一层
resp = requests.get(
    download_url,
    allow_redirects=True,
    cookies=cookies,
    proxies=proxies,
)

# 第二层
download_url_2 = resp.headers["Location"]
resp = requests.get(
    download_url_2,
    allow_redirects=False,
    cookies=cookies,
    proxies=proxies,
)
# 第三层
download_url_3 = resp.headers["Location"]
data = call_aria2(download_url_3)
```

- 真是屁大点事发个帖子。哈哈哈。
