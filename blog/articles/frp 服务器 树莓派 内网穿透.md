---
title: frp 服务器 树莓派 内网穿透
date: 2021-04-19 11:04:53
permalink: /pages/6a9645/
categories: 
  - 编程
tags: 
  - null
article: true
---
# frp 服务器 树莓派 内网穿透

参考自 [利用 frp 透穿访问内网的树莓派](https://www.jianshu.com/p/c842004bf4bc)

## 安装

### 服务器设置

- 下载 [最新版 frp 程序](https://github.com/fatedier/frp/releases)
- 解压
- [设置 frps.ini](https://github.com/fatedier/frp/blob/master/README_zh.md)，大概设置成这样：

``` ini
[common]    
bind_addr = 服务器 ip    
bind_port = 7000    
```

- `nohup ./frps -c ./frps.ini` 跑起程序

### 设置客户端

1. 下载 [最新版 frp 程序](https://github.com/fatedier/frp/releases)
2. [解压 frp 并设置 frpc.ini](https://github.com/fatedier/frp/blob/master/README_zh.md)，大概设置成这样：

``` ini
[common]    
server_addr = 服务器 ip    
server_port = 7000    
    
[ssh]    
type = tcp    
local_ip = 127.0.0.1    
local_port = 22    
remote_port = 6000    
```

3. `nohup ./frpc -c ./frpc.ini` 跑起程序

---

## 验证

`ssh -oPort=7000 pi@服务端 ip`，正常的话将以 ssh 的方式进入树莓派

---

## 开机自启

### 服务端

`vim /etc/rc.local`

``` bash
nohup /home/zza/frp_0.23.1_linux_amd64/frps -c /home/zza/frp_0.23.1_linux_amd64/frps.ini &    
```

### 客户端

`vim /etc/rc.local`

``` bash
nohup /home/zza/frp_0.23.1_linux_arm/frpc -c  /home/zza/frp_0.23.1_linux_arm/frpc.ini &    
```

---

## 使用 Systemd 实现自动启动 frp

Systemd, 可以保证在树莓派意外重启时，能自动启动 frp 相关服务。这样，我们就不用整天提心吊胆，担心各种意外了。

### 服务端管理 frps

- 需要先 cd 到 frp 解压目录。

`cp frps /usr/local/bin/frps`
`mkdir /etc/frp`
`cp frps.ini /etc/frp/frps.ini`

- 编写 frp service 文件，以 centos7 为例，适用于 debian

`vim /usr/lib/systemd/system/frps.service`

``` ini
[Unit]    
Description=frps    
After=network.target    
    
[Service]    
TimeoutStartSec=30    
ExecStart=/usr/local/bin/frps -c /etc/frp/frps.ini    
ExecStop=/bin/kill $MAINPID    
    
[Install]    
WantedBy=multi-user.target    
```

- 启动 frp 并设置开机启动

`systemctl enable frps`
`systemctl start frps`
`systemctl status frps`

- 部分服务器上，可能需要加 .service 后缀来操作，即：

`systemctl enable frps.service`
`systemctl start frps.service`
`systemctl status frps.service`

### 树莓派管理 frpc

- 需要先 cd frp 解压目录。复制文件

`cp frpc /usr/local/bin/frpc`
`mkdir /etc/frp`
`cp frpc.ini /etc/frp/frpc.ini`

- 编写 frp service 文件，以 centos7 为例，适用于 debian

`vim /usr/lib/systemd/system/frpc.service`

``` ini
[Unit]    
Description=frpc    
After=network.target    
    
[Service]    
TimeoutStartSec=30    
ExecStart=/usr/local/bin/frpc -c /etc/frp/frpc.ini    
ExecStop=/bin/kill $MAINPID    
    
[Install]    
WantedBy=multi-user.target    
```

- 启动 frp 并设置开机启动

`systemctl enable frpc`
`systemctl start frpc`
`systemctl status frpc`

- 部分服务器上，可以需要加 .service 后缀来操作，即：

`systemctl enable frpc.service`
`systemctl start frpc.service`
`systemctl status frpc.service`

- 注意：
  - frps 或 frpc 启动无效时，可以尝试先停止服务，如：

`systemctl stop frpc`
