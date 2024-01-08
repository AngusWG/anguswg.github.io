---
title: socketio 第三次握手失败问题
date: 2021-04-19 11:04:53
permalink: /pages/f65b5d/
categories: 
  - 随笔
tags: 
  - null
article: true
---
# socketio 第三次握手失败问题  

https://segmentfault.com/a/1190000012634779

```bash
        location /socket.io {    
            proxy_pass http://rqpro_socketio;    
            proxy_http_version 1.1;    
            proxy_set_header upgrade $http_upgrade;    
            proxy_set_header connection $connection_upgrade;    
            proxy_set_header x-real-ip $remote_addr;    
            proxy_set_header x-forwarded-for $proxy_add_x_forwarded_for;    
            proxy_set_header host $http_host;    
            proxy_set_header x-nginx-proxy true;    
            proxy_set_header Origin "";    
            proxy_read_timeout 86400;    
        }    
```
