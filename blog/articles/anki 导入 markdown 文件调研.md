---
title: anki 导入 markdown 文件调研
date: 2022-07-06 05:04:18
permalink: /pages/6ea5bb85-0317-44bd-a1ad-d9201dccec1a/
tags:
  - 
categories:
  - 随笔
article: true
---

# anki 导入 markdown 文件调研

- [[笔记系统]] - markdown to anki
  - [mdanki](https://github.com/ashlinchak/mdanki)
    - js 写的
    - 导入方便
    - markdown header 识别有问题
  - [ankdown](https://github.com/benwr/ankdown)
    - python3
    - 使用报错
  - [markdown-anki-decks](https://github.com/lukesmurray/markdown-anki-decks)
    - python3
    - 单个文件单个数据库 可以通过命令放入同一组
    - **推荐**

## markdown-anki-decks 使用指南

- anki 批量导入插件
  - 下载插件 MultiDeckImporter
    - 插件编号 1263172192
  - find an "Import From Folder" option in the tools menu
  - https://ankiweb.net/shared/info/1263172192
- anki 同步插件
  - 下载插件 AnkiConnect
    - 插件编号 2055492159
  - https://ankiweb.net/shared/info/2055492159
- 在打开 anki 软件的情况下，输入以下命令，导入 markdown 文件作为抽认卡
  - `mdankideck .\note\docs\anki E:\anki --sync  --prefix "md::" --delete`
  - **E:\anki** 文件夹作为 anki 文件数据的存放地，删除不影响 anki 使用。
  - --sync 表示自动同步到 anki 软件上 需要 anki 软件打开。
  - --delete 智能删除笔记上已丢失的条目。
  - --prefix "md::"表示在 anki 上用一个名为 md 的库存储，旗下包含多个字库。

`cat .\note\docs\anki\tmp.md`

``` markdown
# 文章标题

## 二级标题 1 （抽认卡 A 的提示语句）

文章内容 A（抽认卡显示内容 A)

此处若改动文章内容 A，则 anki 中会删除抽认卡 A 并重新导入新的抽认卡 A。

## 二级标题 2 （抽认卡 B 的提示语句）

文章内容 A（抽认卡显示内容 B)

```
