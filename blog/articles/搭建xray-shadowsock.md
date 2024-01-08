---
title: 搭建 xray-shadowsock
date: 2021-06-11 18:11:22
permalink: /pages/738615/
categories: 
  - 编程
tags: 
  - null
article: true
---

# 搭建 xray-shadowsock

## 参考

- [安装](https://github.com/xinlc/scripts/blob/0f08db90c5cf39c033d5ff7b43a07d9adfa1646c/net/shadowsocks_install/docker/shadowsocks-libev/README.md)
- [证书](https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E)

## ssl

通过 acme.sh 生成证书并自动更新

``` bash
curl  https://get.acme.sh | sh
apt install socat
/root/.acme.sh/acme.sh --register-account -m my@example.com
/root/.acme.sh/acme.sh --issue -d www.mydomain.com  --standalone
/root/.acme.sh/acme.sh --upgrade  --auto-upgrade
```

## 配置配置文件

`mkdir /etc/shadowsocks-libev`

``` vim
# vim /etc/shadowsocks-libev/config.json
{
    "server":"0.0.0.0",
    "server_port":9000,
    "password":"password",
    "timeout":300,
    "method":"aes-256-gcm",
    "fast_open":true,
    "nameserver":"8.8.8.8",
    "mode":"tcp_and_udp",
    "plugin":"xray-plugin:tls;host=www.mydomain.com",
    "plugin_opts":"server"
}
```

## docker 启动 shadowsocks

``` bash
docker pull teddysun/shadowsocks-libev
docker run -d -p 9000:9000 -p 9000:9000/udp --name ss-libev --restart=always -v /etc/shadowsocks-libev:/etc/shadowsocks-libev -v /root/.acme.sh:/root/.acme.sh teddysun/shadowsocks-libev
```

## 客户端配置

- 去 [xray-plugin](https://github.com/teddysun/xray-plugin/releases/tag/v1.4.2) 下载对应软件
- 放到 shadowsocks 客户端文件夹里
- 写入配置

``` json
    {
      "server": "www.mydomain.com",
      "server_port": 9000,
      "password": "password",
      "method":"aes-256-gcm",
      "plugin": "xray-plugin",
      "plugin_opts": "tls;host=www.mydomain.com",
      "plugin_args": "",
      "remarks": "mydomain.com",
      "timeout": 5
    },
```

- 安卓用户点 [这里](https://github.com/teddysun/xray-plugin-android/releases) 下载

## 认证超时问题

### 查看日志

查看日志`docker logs ss-libev -f --tail 20`

```text
2021/09/10 10:08:03 http: TLS handshake error from 192.168.1.1:999: remote error: tls: bad certificate
2021/09/10 10:08:04 http: TLS handshake error from 192.168.1.1:999: remote error: tls: bad certificate
2021/09/10 10:08:05 http: TLS handshake error from 192.168.1.1:999: remote error: tls: bad certificate
2021/09/10 10:08:06 http: TLS handshake error from 192.168.1.1:999: remote error: tls: bad certificate
```

证书过时了

输入命令更新证书：`/root/.acme.sh/acme.sh --upgrade --auto-upgrade`

然后报错了：

``` text
[Fri 10 Sep 2021 10:11:37 AM CST] Renew: 'www.mydomain.com'
[Fri 10 Sep 2021 10:11:37 AM CST] Using CA: https://acme-v02.api.letsencrypt.org/directory
[Fri 10 Sep 2021 10:11:37 AM CST] Standalone mode.
[Fri 10 Sep 2021 10:11:37 AM CST] LISTEN    0         511                0.0.0.0:80               0.0.0.0:*        users:(("nginx",pid=1481169,fd=8),("nginx",pid=898219,fd=8))                   
LISTEN    0         511                   [::]:80                  [::]:*        users:(("nginx",pid=1481169,fd=9),("nginx",pid=898219,fd=9))                   
[Fri 10 Sep 2021 10:11:37 AM CST] tcp port 80 is already used by (("nginx",pid=1481169,fd=8),("nginx",pid=898219,fd=8))                   
80                  [
[Fri 10 Sep 2021 10:11:37 AM CST] Please stop it first
[Fri 10 Sep 2021 10:11:37 AM CST] _on_before_issue.
```

### 编写一键更新脚本

需要先关闭 nginx `systemctl start nginx`

- 写了个脚本：vim `/root/script/acme_job.sh`
  - 更新 acme
  - 更新证书
- 官方说两个月会自动更新。因为Nginx占用会失败。

``` bash
echo "start acme.sh $(date +"%Y-%m-%d %H:%M:%S")"
systemctl stop nginx   
/root/.acme.sh/acme.sh  --upgrade  --auto-upgrade
/root/.acme.sh/acme.sh --renew -d www.mydomain.com --force
/root/.acme.sh/acme.sh --renew -d www.mydomain2.com --force
systemctl start nginx
echo "finish acme.sh $(date +"%Y-%m-%d %H:%M:%S")"
echo "==========================="
```

### 设置自动执行时间

设置执行时间：  

- 05:02 执行脚本 (大概率不在这个时间段玩电脑)
- `vim /var/spool/cron/crontabs/root`

``` bash
2 5 * * * /usr/bin/bash /root/script/acme_job.sh > /var/log/acme_job.log
```

---

ubuntu 需要[打开 crontab 日志](https://blog.csdn.net/k_young1997/article/details/81606667)

- `vim /etc/rsyslog.d/50-default.conf`
- 打开文件，在文件中找到cron.*，把前面的#去掉，保存退出，输入
- `sudo service rsyslog restart`

重启系统日志，然后稍微等下应该就能在/var/log目录下看到cron.log，vi cron.log就可以查看cron运行日志了。

---

查看自动更新脚本日志

tail /var/log/acme_job.log
tail /var/log/cron.log
