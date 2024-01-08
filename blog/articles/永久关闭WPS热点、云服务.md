---
title: 永久关闭 WPS 热点、云服务
date: 2021-04-19 11:04:53
permalink: /pages/ff0dc2/
categories: 
  - 随笔
tags: 
  - null
article: true
---
# 永久关闭 WPS 热点、云服务  

## 群里大佬的方法

``` text
【江湖人称鸟哥】职业菜鸟 2019/2/25 14:19:53    
干掉服务    
【江湖人称鸟哥】职业菜鸟 2019/2/25 14:19:57    
干掉计划任务    
【江湖人称鸟哥】职业菜鸟 2019/2/25 14:20:13    
他自带配置 关掉 自动更新 热点推荐啥的    
【江湖人称鸟哥】职业菜鸟    
图片 1.png    
【江湖人称鸟哥】职业菜鸟 2019/2/25 14:20:38    
这四个 dll 跟我一样 加个 _    
【江湖人称鸟哥】职业菜鸟 2019/2/25 14:20:48    
修改之前 先结束 wps 进程    
【江湖人称鸟哥】职业菜鸟 2019/2/25 14:20:54    
重启 桌面    
【江湖人称鸟哥】职业菜鸟 2019/2/25 14:21:02    
因为 dll 是注入到 桌面里    
```

![图片 1.png](../images/7485616-dd008f4d683886ac.png)

* [重启 桌面](http://www.tudoupe.com/xt/win7jiqiao/2017/0918/7098.html)
win10 没有 Explorer.exe 进程 直接结束 Windows 资源管理器
然后点文件 - 运行新任务 - explorer.exe

![image.png](../images/7485616-9030464a69ed44d5.png)

---

## 网上大佬的方法

每次即使关闭在 [任务管理器](https://www.baidu.com/s?wd=%E4%BB%BB%E5%8A%A1%E7%AE%A1%E7%90%86%E5%99%A8&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd) 中杀死了 wps 热点 wps 云服务等应用不久又会自启，故以下提供永久关闭热点和云服务的方法：

新建一个新的文件（如 txt）并修改成下列文件的名称（后缀一定要修改成。exe），然后覆盖原文件（也可以删除后以同名空文件替换）：

```text
1.
    WPS Office\…\…\…\ office6\ wpscenter.exe
    WPS Office\…\…\…\ office6\ wpscloudlaunch.exe
    WPS Office\…\…\…\ office6\ wpscloudsvr.exe

2.
    WPS Office\…\…\…\ wtoolex\ wpsnotify.exe
    WPS Office\…\…\…\ wtoolex\ wpsupdate.exe
```

>【注】由于 WPS 版本不同，故由主目录索引的深度和目录名称不同，故以“\…\…\…\”代替，我的目录如下图：
这里写图片描述

![image](http://upload-images.jianshu.io/upload_images/7485616-bd0a2ef0b7d906ab.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

永久关闭 WPS 初始登陆界面

每次第一次使用 wps 时，都会进入登陆界面，十分卡，以下提供永久关闭初始登陆界面，直接进入文档的方法：

新建一个新的文件（如 txt）并修改成下列文件的名称（后缀一定要修改成。exe），然后覆盖原文件（也可以删除后以同名空文件替换）：

```text
    WPS Office\…\…\ ksolaunch.exe
    WPS Office\…\…\ wpscloudsvr.exe
```

>【注】由于 WPS 版本不同，故由主目录索引的深度和目录名称不同，故以“\…\…\”代替，该目录为上述目录的上一层，我的目录如下图

![image](http://upload-images.jianshu.io/upload_images/7485616-92a6e9fe667c4cd4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

原文：https://blog.csdn.net/CN_DXTZ/article/details/79415565
