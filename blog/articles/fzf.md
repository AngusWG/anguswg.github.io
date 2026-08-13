---
title: fzf
date: 2026-06-23 13:45:48
permalink: /pages/0985f969-464b-4b04-baa9-d1fd98502418/
tags:
  - 
categories:
  - 编程
article: true
---

# fzf

## windows powershell

``` sh
winget install junegunn.fzf
Install-Module -Name PSFzf -Scope CurrentUser -Force

notepad $PROFILE
# 贴贴内容 也可以先测试一下
Import-Module PSFzf
Set-PsFzfOption -PSReadlineChordProvider 'Ctrl+t' -PSReadlineChordReverseHistory 'Ctrl+r'

```
