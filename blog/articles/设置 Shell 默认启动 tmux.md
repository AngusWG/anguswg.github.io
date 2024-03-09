---
title: 设置 Shell 默认启动 tmux
date: 2024-03-09 02:27:44
permalink: /pages/855f8e97-c99b-44c2-8c80-256d10e518f1/
tags:
  - 
categories:
  - 编程
article: true
---

# 设置 Shell 默认启动 tmux

- [Tmux 快捷键 & 速查表 & 简明教程](https://gist.github.com/AngusWG/44043bee8a0e4c39331443ef71efc9b7)
- [[centos 安装 tmux]]

因为是 zsh 所以修改 `vim source ~/.zshrc`

```bash
if command -v tmux &> /dev/null && [ -z "$TMUX" ]; then
    tmux at -t 0 || tmux new -s 0
fi
```

## 一个命令版本

```bash
echo -e "\n# Automatically start tmux session\nif command -v tmux &> /dev/null && [ -z \"\$TMUX\" ]; then\n    tmux attach-session -t 0 || tmux new-session -s 0\nfi\n# Automatically start tmux session end\n" >> ~/.zshrc
```

```bash
source ~/.zshrc
```

---

再也也不用担心长命令不敢关 terminal 啦~
