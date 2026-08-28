---
title: Docker 日志清理
date: 2026-08-26 14:54:56
permalink: /pages/5a6a0c48-bb38-4a34-a94a-a0240b3f5efb/
tags: 
  -
categories: 
  - 编程
article: true
---
# Docker 日志清理

## 查看日志

``` bash
sudo bash -c '
for id in $(docker ps -aq); do
    logpath=$(docker inspect --format="{{.LogPath}}" $id 2>/dev/null)
    if [ -n "$logpath" ] && [ -e "$logpath" ]; then
        size=$(du -sh "$logpath" 2>/dev/null | cut -f1)
        name=$(docker inspect --format="{{.Name}}" $id | sed "s/\///")
        echo "$size    $name ($id)"
    fi
done | sort -hr
'
```

---

``` text
4.3G    aabb(8581d2793e71)
3.8G    ccdd (0b58c18477ac)
641M    gitea (c6bcf0bc48de)
268M    mongodb (3004a663d491)
148M    ttrss (81a95712d06b)
95M    influxdb (a2dd3dd4ee28)
77M    frpc (5900ccb4d888)
52M    ffee (003e7e1744a5)
34M    telegraf (178bd1c5feaa)
8.4M    wg-bot-main (83ef3f342646)
4.3M    grafana (c9dcfb9730e2)
3.5M    ping_exporter (8a9933a3ff14)
2.7M    redis (a6e91ea2b47f)
2.3M    webdav (fdc36f48e200)
```

---

## 配置日志最大值

`sudo vim /etc/docker/daemon.json`

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

`sudo systemctl restart docker`

## 批量重启 docker

``` bash
find . -name 'docker-compose.yml' -print0 | while IFS= read -r -d '' file; do echo "=== 检查: $file ==="; if sudo docker-compose -f "$file" ps -q 2>/dev/null | grep -q .; then echo "✅ 有运行容器，执行 down/up"; sudo docker-compose -f "$file" down || true; sudo docker-compose -f "$file" up -d || true; else echo "⏭️ 无运行容器，跳过"; fi; done
```
