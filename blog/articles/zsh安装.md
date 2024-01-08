---
title: zsh 安装
date: 2021-04-19 11:04:53
permalink: /pages/150377/
categories: 
  - 编程
tags: 
  - null
article: true
---
# zsh 安装  

- 有多好用。.. 自行百度

![image.png](../images/7485616-952a2a1c99f1161c.png)

## SH 安装脚本

`命令不是打错了  相同命令确实需要运行两遍`

``` bash
export http_proxy="http://192.168.100.228:9999"
export https_proxy="http://192.168.100.228:9999"

sh -c "$(curl -fsSL  https://github.com/AngusWG/river-zsh-config/raw/master/install.sh)"
source ~/.zshrc
```

## 自动安装

- zsh
- oh my zsh
- 彩色命令
- 历史提示

[sh 脚本所属 github 项目](https://github.com/revir/river-zsh-config)

![image.png](../images/7485616-b9635679b1e6216c.png)

---

- bug 修复
- 执行第三步的时候会报错
- 需要去修改下文件

![image.png](../images/7485616-dffeac073f4f378d.png)

![image.png](../images/7485616-46b011bc4eface7a.png)

- 注释红色的这一行
