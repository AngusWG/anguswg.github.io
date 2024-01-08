---
title: win10 自带 Ubuntu 使用 win10 的 python 方式
date: 2021-04-19 11:04:53
permalink: /pages/360ac3/
categories: 
  - Python
tags: 
  - null
article: true
---
# win10 自带 Ubuntu 使用 win10 的 python 方式  

- windows cmd 下  找到 python 与 pip 文件存放地址

``` bash
λ  where.exe python    
D:\Python36\python.exe    
    
λ  where.exe pip    
D:\Python36\Scripts\pip.exe    
```

- windows 自带 ubuntu 下 （Windows 系统盘符存在`/mnt/`中）

```shell
:~$ sudo ln -s /mnt/d/Python36/Scripts/pip.exe /usr/bin/wpip    
:~$ sudo ln -s /mnt/d/Python36/python.exe /usr/bin/wpython    
```
