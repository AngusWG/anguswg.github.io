---
title: 蠢蠢的 pycharm
date: 2021-05-17 16:57:27
permalink: /pages/a62d94/
categories: 
  - 随笔
tags: 
  - null
article: true
---

# 蠢蠢的 Pycharm

记录一下一些 Pycharm 的不爽点。
多了的话就换 vscode 为主力了。

## coverage

- 在多项目下，report 是显示第一个项目的 report 导致覆盖率为 0。
- .coveragerc 能识别不跑的代码，但是不能识别不现实，不跑会导致覆盖率下降。 目前用注释干掉了 (`# pragma: no cover`)。

## pycharm 打不开问题

[问题连接](https://youtrack.jetbrains.com/issue/IDEA-238995?_ga=2.36239336.973627320.1618408649-1361445786.1616426299)

首先确定 wsl 是否能打开

然后 WORKAROUND: run the following commands in the Administrator console (cmd.exe):

netsh int ipv4 set dynamicport tcp start=49152 num=16383
netsh int ipv4 set dynamicport udp start=49152 num=16383
If the above doesn't help, please try these commands instead:

net stop winnat
net start winnat
