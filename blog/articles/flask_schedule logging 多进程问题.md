---
title: flask_schedule logging 多进程问题
date: 2021-04-19 11:04:53
permalink: /pages/174103/
categories: 
  - Python
tags: 
  - null
article: true
---
# flask_schedule logging 多进程问题

[logging 模块多进程解决方案](https://blog.gdyshi.top/2018/06/27/logging_multiprocess/)
[concurrent-log-handler 0.9.12](https://pypi.org/project/concurrent-log-handler/)

## 错误日志

``` text
PermissionError: [WinError 32] 另一个程序正在使用此文件，进程无法访问。: 'E:\\logs\\contest\\contest.log' -> 'E:\\logs\\contest\\contest.log.1'    
```

## 解决

- bash

``` bash
pip install concurrent-log-handler    
pip install pypiwin32    
```

- python

``` python
from logging import getLogger, DEBUG    
from concurrent_log_handler import ConcurrentRotatingFileHandler    
import os    
    
logger = getLogger()    
# Use an absolute path to prevent file rotation trouble.    
logfile = os.path.abspath("mylogfile.log")    
# Rotate log after reaching 512K, keep 5 old copies.    
rotateHandler = ConcurrentRotatingFileHandler(logfile, "a", 512*1024, 5)    
logger.addHandler(rotateHandler)    
logger.setLevel(DEBUG)    
    
logger.info("Here is a very exciting log message, just for you")    
    
```

- 如果有很多日志 建议多弄几个 logger

## 其他参考

- [flask+schedule+开发环境&生产环境自动切换](https://www.jianshu.com/p/73031d49a774)
- [Run subprocess and print output to logging](https://stackoverflow.com/questions/21953835/run-subprocess-and-print-output-to-logging)
