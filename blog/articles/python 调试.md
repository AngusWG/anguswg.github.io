---
title: python 调试
permalink: /pages/4c83ff5b-4a4b-4784-b125-4e0d70e4dd27/
date: 2022-04-19 14:46:09
tags:
  - 
categories:
  - Python
article: true
---
# python 调试

- [参考](https://py.eastlakeside.cn/book/ProgrammerTools/debugging.html) (doc just the docs 主题蛮好看的）
- 基本不用，现场不方便改代码 debug。

``` bash
python -m pdb my_script.py
```

cat my_script.py

``` python
import pdb

def make_bread():
    pdb.set_trace()
    return "I don't have time"

print(make_bread())
```

命令列表：

- c(continue): 继续执行
- w(where): 显示当前正在执行的代码行的上下文信息
- a(args): 打印当前函数的参数列表
- s(step): 执行当前代码行，并停在第一个能停的地方（相当于单步进入）
- n(next): 继续执行到当前函数的下一行，或者当前行直接返回（单步跳过）

单步跳过（next）和单步进入（step）的区别在于，单步进入会进入当前行调用的函数内部并停在里面，而单步跳过会（几乎）全速执行完当前行调用的函数，并停在当前函数的下一行。
