---
title: 代替 supervisor - gosuv
date: 2021-04-19 11:04:53
permalink: /pages/7d083d/
categories: 
  - 编程
tags: 
  - null
article: true
---
# 代替 supervisor - gosuv  

## 项目的部署

### 一。安装 gosuv [Git 地址](https://github.com/codeskyblue/gosuv)

- 从 [这里](https://github.com/codeskyblue/gosuv/releases) 下载对应系统的二进制文件

- 测试启动：`gosuv start-server -f`

- 将 gosuv 的二进制启动文件软链接到系统 bin 目录  `ln -s gosuv /usr/local/bin`

### 二。将 gosuv 安装为 linux 的系统服务

#### 1. 编写`systemd`的单元配置文件 （启动命令 ExecStart 和启动路径 WorkingDirectory 酌情修改）

- vim /lib/systemd/system/gosuv.service

```systemd
[Unit]    
Description=gosuv    
After=syslog.target    
After=network.target    
    
[Service]    
# Modify these two values and uncomment them if you have    
# repos with lots of files and get an HTTP error 500 because    
# of that    
###    
#LimitMEMLOCK=infinity    
#LimitNOFILE=65535    
Type=simple  # 如果要启动的命令是一个 daemon 进程，这里的值设置为 forking    
User=root    
Group=root    
# 可以将 gosuv 链接到 bin 目录或者直接移动到 bin 目录    
WorkingDirectory=/usr/local/bin    
# -f 参数指定 gosuv 前台启动，默认后台启动（如果没有-f 参数，则 Type 需要改为 forking)    
ExecStart=/usr/local/bin/gosuv start-server -f    
Restart=always    
    
# Some distributions may not support these hardening directives. If you cannot start the service due    
# to an unknown option, comment out the ones not supported by your version of systemd.    
ProtectSystem=full    
PrivateDevices=yes    
PrivateTmp=yes    
NoNewPrivileges=true    
    
[Install]    
WantedBy=multi-user.target    
    
```

#### 2. 将此文件放到 `/lib/systemd/system`文件夹下，此时就能够让服务开机启动和自动重启了

- 开机启动：`systemctl enable gosuv`
- 启动服务：`systemctl start gosuv`
- 浏览器中访问：`localhost:11313`
