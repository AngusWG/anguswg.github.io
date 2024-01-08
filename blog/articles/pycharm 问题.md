---
title: pycharm 问题
date: 2021-04-19 11:04:53
permalink: /pages/fe7ce4/
categories: 
  - Python
tags: 
  - null
article: true
---
# pycharm 问题

- 按 ctrl+V 不能贴贴，ctrl+C 能复制
- 选中文字后按 Backspace 不是删除，而是选定行往后继续+1
- 原因：Pycharm 启动了 Vim 编辑模式
- 解决方式：Tools -Vim Emulator  关闭就行了
- 字典中，用变量名。get(key1) 和 变量名 [key1] 的区别
- 变量名。get(key1) 如果没有给 0 值
- 变量名 [key1] 没有则抛出 KeyError 异常
