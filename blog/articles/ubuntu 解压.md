---
title: ubuntu 解压
date: 2025-05-14 14:11:38
permalink: /pages/c32060b3-c76b-462b-9e1f-6f82640e42c0/
tags:
  - 
categories:
  - 编程
article: true
---

# ubuntu 解压

## 需求

- Linux 连续解压 多个文件 unzip 命令 进度条 显示解压进度

## pv

- 安装
  - sudo apt-get install parallel pv
- 使用
  - ls L15-*.zip | parallel -j0 'pv {} | unzip
  - 报错
    - UnZip 6.00 of 20 April 2009, by Debian. Original by Info-ZIP.
    - Usage: unzip [-Z] [-opts[modifiers]] file[.zip] [list] [-x xlist] [-d exdir]
  - ls L13-*.zip | parallel -j1 'echo "正在解压：{}"; unzip -o {} ; echo "✓ 完成"'
  - 也没有进度条

## 7zip

- sudo apt install p7zip-full p7zip-rar
- 7z x L15-2.zip
- for arc in M479*; do  7z x "$arc" ; done

## alias

- [脚本存储于 dotfiles](https://github.com/AngusWG/dotfiles/blob/main/files/aliases)

```bash
_do_up_zip_all() {
    setopt local_options nullglob
    local files=(*.zip *.rar *.7z)

    if [ ${#files[@]} -eq 0 ]; then
        echo "未发现压缩文件，跳过。"
        return
    fi

    for arc in "${files[@]}"; do
        if [ -f "$arc" ]; then
            echo "正在处理：$arc"
            if 7z x "$arc" -y; then
                echo "解压成功，删除源文件。.."
                rm "$arc"
            else
                echo "警告：$arc 解压失败，保留原文件！"
            fi
        fi
    done
}

alias unzip_all='_do_up_zip_all'
```
