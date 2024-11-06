---
title: acme.sh 免费申请 HTTPS 证书
date: 2021-06-12 18:11:22
permalink: /pages/790c63d4-4559-4b5a-b5ca-577d10fc4ba3/
categories: 
  - 编程
tags: 
  - null
article: false
---

# acme.sh 免费申请 HTTPS 证书

- [证书](https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E)
- [[搭建 xray-shadowsock]]
- 推荐一个新的证书申请 [certbot](https://certbot.eff.org/)
- [[certbot 证书]]

## ssl

通过 acme.sh 生成证书并自动更新

```bash
curl  https://get.acme.sh | sh
apt install socat
/root/.acme.sh/acme.sh --register-account -m my@example.com
/root/.acme.sh/acme.sh --issue -d www.mydomain.com  --standalone
/root/.acme.sh/acme.sh --upgrade  --auto-upgrade
```

## 编写一键更新脚本

需要先关闭 nginx `systemctl start nginx`

- 写了个脚本：vim `/root/script/acme_job.sh`
  - 更新 acme
  - 更新证书
- 官方说两个月会自动更新。因为 Nginx 占用会失败。

```bash
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

- 05:02 执行脚本 （大概率不在这个时间段玩电脑）
- `vim /var/spool/cron/crontabs/root`

```bash
2 5 * * * /usr/bin/bash /root/script/acme_job.sh > /var/log/acme_job.log
```

```bash
查看自动更新脚本日志
tail /var/log/acme_job.log
tail /var/log/cron.log
```

---

## 认证超时问题

### 查看日志

查看日志`docker logs ss-libev -f --tail 20`

```text
2021/09/10 10:08:03 http: TLS handshake error from 192.168.1.1:999: remote error: tls: bad certificate
2021/09/10 10:08:04 http: TLS handshake error from 192.168.1.1:999: remote error: tls: bad certificate
2021/09/10 10:08:05 http: TLS handshake error from 192.168.1.1:999: remote error: tls: bad certificate
2021/09/10 10:08:06 http: TLS handshake error from 192.168.1.1:999: remote error: tls: bad certificate
```

- 证书过时了
- 输入命令更新证书：`/root/.acme.sh/acme.sh --upgrade --auto-upgrade`
- 然后报错了：

```text
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

---

- ubuntu 需要 [打开 crontab 日志](https://blog.csdn.net/k_young1997/article/details/81606667)
  - `vim /etc/rsyslog.d/50-default.conf`
  - 打开文件，在文件中找到 cron.*，把前面的 '#'去掉，保存退出，输入
  - `sudo service rsyslog restart`
- 重启系统日志，然后稍微等下应该就能在 `/var/log` 目录下看到 cron.log，vim cron.log 就可以查看 cron 运行日志了。

### acme.sh 报错 can not get domain token

```text
Error, can not get domain token "type":"http-01","url":"https://acme.zerossl.com/v2/DV90/chall/ZlNEi3nO05c_rSrqfaId_A","status":"invalid","error":{
Please add '--debug' or '--log' to check more details.
```

- [参考](https://github.com/acmesh-official/acme.sh/issues/4927)
  - [server](https://github.com/acmesh-official/acme.sh/wiki/Server)
- `/root/.acme.sh/acme.sh --issue -d www.mydomain.com  --standalone --server https://acme-v02.api.letsencrypt.org/directory`
