---
title: ss
date: 2021-04-19 11:04:53
permalink: /pages/4605a8/
categories: 
  - 编程
tags: 
  - null
article: true
---
# ss  

## 安装

> pip install shadowsocks
> cd /etc/
> vim /etc/shadowsocks.json

贴贴下面的配置：

``` json
    
    
{    
    "server":"0.0.0.0",    
    "server_port":8381,    
    "local_address": "127.0.0.1",    
    "local_port":1080,    
    "password":"a123456",    
    "timeout":300,    
    "method":"aes-256-cfb",    
    "fast_open": true,    
    "workers": 1    
}    
```

### 开启

> sudo ssserver -c /etc/shadowsocks.json -d start

### 开机自启

考虑到如果VPS被重启（实际上只会你自己重启……），所以我们将shadowsocks加入开机启动项，配置如下：
> vim /etc/rc.local

- 然后在exit 0之前加入

> sudo ssserver -c /etc/shadowsocks.json -d start

- 然后重启VPS：

> sudo reboot now

- 重启后查看进程：

> ps aux | grep shadowsocks

如果shadowsocks正常运行，表明设置成功。

---

- 停止服务用
- sudo ssserver -c /etc/shadowsocks.json -d stop

- 日志 ```tailf /var/log/shadowsocks.log```

https://www.cnblogs.com/Eason1024/p/8177665.html
