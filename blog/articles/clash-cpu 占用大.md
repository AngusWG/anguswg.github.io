---
title: clash-cpu 占用大
date: 2022-10-28 14:14:22
permalink: /pages/46301d3d-a725-4a10-b219-86ae2ab57300/
tags:
  - 随笔
categories:
  - 屁大点事
article: true
---

# clash-cpu 占用大

clash for windows 在目标代理拒绝的时候，[会占用大量的 cpu 计算资源](https://github.com/Fndroid/clash_for_windows_pkg/issues/3501)，不知道在干啥。

参考：[win10 要怎么样限制某个程序占用的 CPU 和内存？](https://www.zhihu.com/question/274111596)

- 任务管理器
- `详细信息`窗口
- 找到 `clash-win64.exe`
- 右键-`设置相关性`
- 设置 1-2 个 cpu

- 目前问题：
  - 重启 clash 进程（重启 windows）则需要重新设置 cpu 占用。
