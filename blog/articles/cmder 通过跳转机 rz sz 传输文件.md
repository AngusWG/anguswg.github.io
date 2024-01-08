---
title: cmder 通过跳转机 rz sz 传输文件
date: 2021-04-19 11:04:53
permalink: /pages/fbaab4/
categories: 
  - 随笔
tags: 
  - null
article: true
---
# cmder 通过跳转机 rz sz 传输文件

## 参考

- [linux 机器之间 zssh, rz, sz互相传输](https://www.cnblogs.com/strikebone/p/3454679.html)
- [cmder - issues - 1452](https://github.com/cmderdev/cmder/issues/1452)

---

- 公司要求连接服务器必须使用跳转机
- finalshell的自带文件(类似winScp)传输用不了了

- 因为用的cmd一直是cmder 界面挺好看的 不想换
- 再加上电脑装了Ubuntu子系统
- 有了以下解决方案

- 1. 首先找个教程下个cmder，给windows 10的机器装上Ubuntu子系统。
- 2. 在Ubuntu子系统上安装 zssh
- 3. 和使用ssh完全一样，只是打命令时，变成了zssh

``` bash
#zssh [root@192.168.1.1](mailto:root@192.168.1.1)    
```

- 4. 上传文件

``` bash
好了，在进入后，你需要上传文件的话。先 ctrl+@    
zssh >                     //这里切换到了本地机器    
zssh>pwd               //看一下本地机器的目录在那    
zssh>ls                   //看一下有那些文件    
zssh>sz 123.txt      //上传本地机器的当前目录的123.txt到远程机器的当前目录    
```

- 5. 下载文件

``` bash
root@192.168.1.1 > sz filename  //在远程机器上,启动sz, 准备发送    
// 看到一堆乱码 然后再 #ctrl+@    
zssh > pwd  //看看在那个目录,cd 切换到合适的目录    
zssh > rz //接住对应的文件    
```

![11](../images/7485616-eefd1a0ed5fef397.png)
