---
title: 更优雅的生成 requirements.txt 
date: 2021-04-19 11:04:53
permalink: /pages/e21e8ce3-b1fe-489f-a392-8550b501e1d2/
categories: 
  - 编程
tags: 
  - null
article: true
---

# 更优雅的生成 requirements.txt

- [文章参考](https://medium.com/python-pandemonium/better-python-dependency-and-package-management-b5d8ea29dff1)

## [pipreqs](https://github.com/bndr/pipreqs)

- 安装

``` bash
pip install pipreqs     
```

- 使用

``` bash
pipreqs -h    
pipreqs [options] <path>    
```

- 示例

``` bash
pipreqs . --encoding utf8  --pypi-server https://pypi.douban.com/simple/    
```

- 提示
- 不加 --encoding utf8 会报 UnicodeDecodeError
- 不翻墙会报 requests.exceptions.ConnectionError:
- 作者使用过程中多加了一个 django_recaptcha
- 搜索豆瓣源 --pypi-server https://pypi.douban.com/simple/

---

## pipdeptree

- 安装

``` bash
pip install pipdeptree    
```

- 使用

``` bash
pipdeptree     
```

- 提示
- 并不能显示某个项目下的依赖

---

## pip-compile

- 安装

``` bash
pip install pip-tools    
```

- 卸载所有包

``` bash
pip-sync requirements.txt requirements.txt    
```

- emmm 把我包都卸載了 玩个鬼
- 想玩的自己看 [文档](https://pypi.org/project/pip-tools/)

---

## 推荐 pipreqs

![image.png](../images/7485616-cb65a7cd6a798050.png)
