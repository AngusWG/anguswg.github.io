---
title: win11 的打开方式
date: 2022-05-06 06:18:57
permalink: /pages/036b87/
categories: 
  - 随笔
tags: 
  - null
article: true
---
# win11 的打开方式

## 常规升级

1. 升级 windows11 [Windows11InstallationAssistant.exe](https://www.microsoft.com/en-us/software-download/windows11) 这个网站下载升级助手。双击升级。
2. [升级 wsl](https://zhuanlan.zhihu.com/p/419870972)，update 时建议全局。`wsl --update & wsl --shutdown` 目前还没研究出怎么玩 GUI。
3. 装 wsa  
    3.1 add-appxpackage MicrosoftCorporationII.WindowsSubsystemForAndroid_1.7.32815.0_neutral___8wekyb3d8bbwe.Msixbundle([tg 群]( https://t.me/joinchat/NV4xIhmoUTl6UIeB9--IlA) 有下载）  
    3.2 [Windows 11 运行安卓子系统安装教程](https://zhuanlan.zhihu.com/p/424959704) 安装酷安

## 升级后的一些定制化操作

1. 个性化 > 任务栏 > 任务栏行为 - 任务栏对齐方式 左
2. 个性化 > 颜色 > `选择模式 - 自定义` & `选择你的默认 Windows 模式 深色`
3. 重装 PowerToys，新版本建议在 microsoft store 下载。
4. 删掉 TranslucentTB，从 microsoft store 下载。
5. 任务栏设置 > 任务栏项 - 关闭`聊天`， 关闭`搜索`。
6. 在语言里先增加拼音输入法，然后再删掉拼音输入法，就只有 qq 输入法了。可能会造成闪屏。
7. 左下角小组件设置一下。

## win11 更新后资源管理器不断重启卡死的解决办法

关键词：wsl taskbar all icon flash windows 11 任务栏闪烁

~~`震惊！竟然是 wsl 的锅，解决方法：`wsl --shutdown`~~

根据 [帖子](https://www.v2ex.com/t/810392)，bug 已经在 [wslg-issue](https://github.com/microsoft/wslg/issues/348) 里提出，并已经修复。目前有个临时解决方案。

修改 `%USERPROFILE%\.wslconfig`

``` config
[wsl2]
guiApplications=false
```

然后重启 wsl: `wsl --shutdown`

解决问题

### MicroSoft store 慢

在国内不要开代理，速度就上去了。

## win11 右键默认显示更多选项

- [来源](https://www.zhihu.com/question/480356710/answer/2204452858)
- [Windows 11 Classic Context Menu v1.1](https://www.sordum.org/14479/windows-11-classic-context-menu-v1-1/)

---

- 下载 Windows 11 Classic Context Menu 后，打开则可以看到三个选项，分别对应“经典右键菜单”、“默认右键菜单”和“重启 explorer.exe”。
- 可以自由切换经典的菜单样式。
