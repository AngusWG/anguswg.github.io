---
title: pythoner 使用规范
date: 2021-04-19 11:04:53
permalink: /pages/0278f4/
categories: 
  - 编程
tags: 
  - null
article: true
---
# pythoner 使用规范

## 项目创建使用 cookiecutter

使用以下命令创建项目

``` bash
pip install cookiecutter 
cookiecutter https://github.com/AngusWG/cookiecutter-py-package.git
```

版本统一由 git + tag (versioneer) 管理
在项目用 setup.py 打包时  versioneer 会根据最近的 tag 标签 放入对应版本号

---

## 养成 format 代码习惯

2.1 format code 快捷键 Ctrl + Alt + L  
2.2 format import 快捷键 Ctrl + Alt + O  

---

## 每个项目需要都有单元测  

单元测试的入口统一是 Makefile 中的 make check  方便运维建立统一的 CICD

---

## 项目需要打包到 pypi 上

4.1 测试 pypi pypi_dev 用于发测试版本包  
  
4.2 正式 pypi pypi_st 用于发正式版本号 此 pypi 上的包  只能是纯数字版本号 不能有 + or dev 字样   正则为 /d+\./d+\./d+  

---

## commit 时自动检查

- git hook 是指在对应 git 动作中触发的脚本
- pre-commit 指在提交`commit 前`触发的动作

以下命令将设置一个默认 pre-commit
在当前项目下有`Makeflie`的情况下 执行`make check`命令

``` bash
python -c "from urllib.request import urlopen ;exec(urlopen('https://github.com/AngusWG/cookiecutter-py-package/raw/master/git_pre_commit_hook.py').read())"
```

- make 命令在 windows 上使用 需要安装 [cygwin](https://www.cygwin.com/)

---

### Cygwin 安装

安装时选择 Make。
并将 cygwin 的 bin 目录加到 windows 环境变量中，为了避免冲突，请尽量让 Cygwin 保持在环境变量第一条。
![image.png](https://upload-images.jianshu.io/upload_images/7485616-a7fd71a88a7f1ce0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/7485616-1fb3bba591efaf3c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---
