---
title: filebrowser 增加垃圾回收机制
date: 2023-12-13 09:22:24
permalink: /pages/a17d98c9-1c39-45db-a711-09f9e108e1c5/
tags:
  - 
categories:
  - 编程
article: true
---

# filebrowser 增加垃圾回收机制

- https://github.com/filebrowser/filebrowser/issues/1854
  - Add the command below under "Before Delete"
  - `/bin/sh -c 'if [[ "$FILE" != "/srv/Trash/"* ]]; then mv $FILE /srv/Trash; fi'`
  - Works great in my docker container on linux

## 装一个 trash-cli 工具

- 创建dockerfile

```dockerfile
FROM filebrowser/filebrowser:latest
RUN apk add trash-cli
```

- 修改docker-compose.yml
  - [build 相关](https://juejin.cn/s/docker-compose.yml%20build%20context)

```dockerfile
# vi docker-compose.yml
version: '3'
services:
  filebrowser:
    # image: filebrowser/filebrowser:latest
    container_name: filebrowser
    restart: always
    build:
      context: .
    ports:
      - "8089:80/tcp"
    networks:
      - net
    volumes:
      - ./filebrowser.db:/database.db
      - ./.filebrowser.json:/.filebrowser.json
      - /etc/localtime:/etc/localtime:ro
      # data
      - ./srv:/srv
      - /mnt/data:/srv/data

networks:
  net:
    driver: bridge

```

- 设置 - 全局设置 - 修改 Before Delete 删除命令

```dockerfile
trash-put $FILE
```

- 查找删除的文件在哪里
  - `trash-list --trash-dirs`

---

## ~~用sh 脚本~~

### ~~修改~~

- 并在 `/srv/Trash/delete.log` 中 增加删除记录

```bash
/bin/sh -c 'if [[ "$FILE" != "/srv/Trash/"* ]]; then mv $FILE /srv/Trash; fi'
/bin/sh -c 'if [[ "$FILE" != "/srv/Trash/"* ]]; then mv $FILE /srv/Trash/ && echo "[$USERNAME] Deleted: $FILE" >> /srv/Trash/delete.log; fi'
/bin/sh -c 'if [[ "$FILE" != "/srv/Trash/"* ]]; then mv $FILE /srv/Trash/ && echo "[$USERNAME $(date +"%Y-%m-%d_%H-%M-%S")] Deleted: $FILE" >> /srv/Trash/delete.log; fi'
```

- 如果 /srv/Trash 有同名的 $FILE 文件 ，则拒绝移动并报错。

```bash
/bin/sh -c 'if [[ "$FILE" != "/srv/Trash/"* ]]; then mv $FILE /srv/Trash/ --suffix $(date +/"%Y-%m-%d_%H-%M-%S/") && echo "[$USERNAME $(date +/"%Y-%m-%d_%H-%M-%S/")] Deleted: $FILE" >> /srv/Trash/delete.log; fi'
```

### ~~报错~~

```text
filebrowser  | 2024/03/13 11:20:56 [INFO] Blocking Command: "/bin/sh /root/before_delete.sh"
filebrowser  | sh: /srv/Trash/delete.log: unknown operand
```

- 改为 sh 脚本后 一行一行注释去找哪一行报错
- `"$FILE" != "/srv/Trash/"*` 这一句有问题 会导致 `/srv/Trash/delete.log: unknown operand`
- 改成字符串比较

### ~~改用 sh 脚本~~

```sh
#!/bin/sh

if [[ "${1:0:11}" != "/srv/Trash/"  ]]; then
    NOW=$(date +"%Y-%m-%d_%H-%M-%S")
    T_FILE=$1
    if [ -e "/srv/Trash/$(basename "$1")" ]; then
        mv "$1" "${1}_${NOW}"
        T_FILE="${1}_${NOW}"
    fi

    mv "${T_FILE}" /srv/Trash/
    echo "$2 ${NOW} Deleted: $1 - /srv/Trash/$(basename ${T_FILE})"
    echo "$2 ${NOW} Deleted: $1 -> /srv/Trash/$(basename ${T_FILE})" >> /srv/Trash/DELETE.log;
fi
```

- 配置处改为 `/bin/sh /root/before_delete.sh $FILE $USERNAME`
