---
title: linux trash
date: 2023-09-28 23:14:10
permalink: /pages/62c8ecd4-b306-4da6-b6cb-b48dbe5a8ad7/
tags:
  - 
categories:
  - 编程
article: true
---

# linux trash

- [参考](https://linux.cn/article-10029-1.html)

## trash-cli

### 安装

- 安装 `sudo apt install trash-cli`

### 使用

- trash-put: 把文件或目录移动到回收站
- trash-empty: 清空回收站
- trash-list: 列出回收站文件
- trash-restore: 恢复回收站文件
- trash-rm: 删除回收站文件

### 配置

- 七天删除 `(crontab -l ; echo "@daily $(which trash-empty) 7") | crontab -`
  - 查看 `cat /var/spool/cron/crontabs/root`

- 设置别名 `alias rm='trash'` （官方不推荐）
  - 在 `~/.zshrc` 中添加
  - `sourc ~/.zshrc`
  - 已加入 [AngusWG/river-zsh-config](https://github.com/AngusWG/river-zsh-config/blob/master/zza_zshrc.sh)
