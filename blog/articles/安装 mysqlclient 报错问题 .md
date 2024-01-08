---
title: 安装 mysqlclient 报错问题
date: 2021-04-19 11:04:53
permalink: /pages/8c15f9/
categories: 
  - Python
tags: 
  - null
article: true
---
# 安装 mysqlclient 报错问题  

[下载地址](https://github.com/AngusWG/TestProject/tree/master/%E5%B7%A5%E5%85%B7/%E8%A7%A3%E5%86%B3%E5%90%84%E7%A7%8D%E7%96%91%E9%9A%BE%E6%9D%82%E7%97%87%E7%9A%84%E7%8E%AF%E5%A2%83%E5%8C%85/mysqlclient%20wheel)

- 关键字段 mysqlclient python  Microsoft Visual Studio 14.0\VC\BIN\cl.exe

- 解决 musql.c 不存在问题

- 本身应该在 https://www.lfd.uci.edu/~gohlke/pythonlibs/#mysqlclient 这个网页中下载的

- 不知道怎么了这个网页中的资源下载不了

```text
error: command 'C:\\Program Files (x86)\\Microsoft Visual Studio 14.0\\VC\\BIN\\cl.exe' failed with exit status 2
```

- 注意安装目录不能有中文
- 版本对应 python 版本
- 命令为：`pip install *.whl`
