---
title: Pycharm刷新远程external_libraries
date: 2021-11-04 23:23:07
permalink: /pages/fa0561/
categories: 
  - 编程
tags: 
  - null
article: true
---
# Pycharm刷新远程external_libraries

pycharm使用远程环境后

会将远程的python环境download下来

然后放到pycharm的缓存目录下

在远程端口更新某个包后

本地的缓存还是这个包的老版本缓存

在debug打断点的时候会贼难受

目前还没有找到解决方案

记录一下。

参考：

* [orce refresh of external libraries not working](https://stackoverflow.com/questions/51870036/force-refresh-of-external-libraries-not-working)
* [How to refresh external libraries on a remote host?](https://intellij-support.jetbrains.com/hc/en-us/community/posts/360007681700-How-to-refresh-external-libraries-on-a-remote-host-)
* [Any way to force a refresh of external libraries on a remote interpreter?](https://intellij-support.jetbrains.com/hc/en-us/community/posts/205813579-Any-way-to-force-a-refresh-of-external-libraries-on-a-remote-interpreter-)

解决方法：

1. Try Settings | Project ... | Project Interpreter | Gear button | Show all | Show paths for the selected interpreter | Reload list of paths
![solution 1](https://i.stack.imgur.com/YyrlL.png)

2. Go to External Libraries in the project tree and expand it.
Right click on "Remote Libraries", you will see an option to "Synchornize 'number'"(并没有找到这个按钮)
![solution 2](https://intellij-support.jetbrains.com/hc/user_images/H6KFv33Nn3cjo7YlAz2OJQ.png)

3."Invalidate Cache/ Restart" under file menu but still the update of remote library.

![](../images/2021-12-05-17-53-36.png)
