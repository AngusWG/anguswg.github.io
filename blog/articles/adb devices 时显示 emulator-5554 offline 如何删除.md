---
title: adb devices 时显示 emulator-5554 offline 如何删除
date: 2021-11-04 23:22:32
permalink: /pages/90194a/
categories: 
  - 编程
tags: 
  - null
article: true
---
# adb devices 时显示 emulator-5554 offline 如何删除

- 在终端输入`netstat -ano | findstr 5555`获取占用 5555 端口的进程 pid
- `tasklist | findstr pid`查看是那个进程占用了
- 发现是 docker 占用了 关掉退出就好了
- 可以选择暴力一点的方法 `taskkill /pid 1234 /f`   （/f 指的是强行结束）
- 利用进程的 PID 结束进程：`ntsd -c q -p 1332` （结束 explorer.exe 进程）

![](../images/2021-12-05-17-57-03.png)

## 参考

- [Windows 中根据端口号或 PID 查看进程、结束进程方法](https://blog.csdn.net/Ayuan77/article/details/8791974)
- [adb devices 时显示 emulator-5554 offline 如何删除](https://blog.csdn.net/hazy12/article/details/99890112)
