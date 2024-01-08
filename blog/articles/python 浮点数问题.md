---
title: python 浮点数问题
date: 2022-04-19 14:28:44
tags: 
  - 屁大点事
categories: 
  - Python
foam_template: 
  filepath: note/docs/python 浮点数问题。md
article: true
permalink: /pages/bf260f/
---
# python 浮点数问题

- [参考（搬运）](https://darkof.me/2014/11/23/python-float/)

``` python
In [1]: 0.1 + 0.2 == 0.3
Out[1]: False

In [4]: round(2.675, 2)
Out[4]: 2.67
```

## 浮点数的二进制表示

2.25 的二进制表示是？
整数部分的二进制表示为 10, 小数部分我们逐步来算
0.25 *2 = 0.5 整数部分取 0
0.5* 2 = 1.0 整数部分取 1
所以 2.25 的二进制表示为 10.01

0.1 的二进制表示是 0.00011001100110011001100110011……0011
0011 作为二进制小数的循环节不断的进行循环。

## 浮点数的二进制存储

Python 和 C 一样，采用 IEEE 754 规范来存储浮点数。IEEE 754 对双精度浮点数的存储规范将 64 bit 分为 3 部分。

## decimal 模块

我一开始的使用方式是

``` python
# 错误用法
In [14]: Decimal(2.675) * Decimal(1.2)
Out[14]: Decimal('3.209999999999999668043315637')
# 正确的用法是
In [15]: Decimal('2.675') * Decimal('1.2')
Out[15]: Decimal('3.2100')
```
