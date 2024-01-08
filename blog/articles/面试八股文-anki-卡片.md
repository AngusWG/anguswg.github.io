---
title: 面试八股文-anki-卡片
date: 2022-08-01 15:14:22
permalink: /pages/65fd5f2f-a016-46d8-b9e7-dc660c0a9d2b/
tags:
  - 
categories:
  - 题库
article: true
---

# 面试八股文-anki-卡片

面经转 anki 卡组记录分享，需要 anki 卡组的直接点击下列链接下载：
[anki apkg 文件](https://drive.google.com/drive/folders/1eKq-YYJQDdXmzNLMvDRgRUif1I1SqJ7T?usp=sharing)

- 面试八股文 集合
- 转换成 anki 卡片

## 仓库整理

- [面试八股文](https://github.com/apachecn/baguwen-wiki)
  - baguwen-wiki.vercel.app
  - https://baguwen-wiki.vercel.app/#/
  - 优先 内容全 知识比较多
- [fullstack-tutorial](https://github.com/frank-lam/fullstack-tutorial)
  - 后台技术栈/架构师之路/全栈开发社区，春招/秋招/校招/面试
  - https://frank-lam.github.io/fullstack-tutorial/#/introduction
  - 主要讲概念 面试八股文 中包含题目
- [小林 x 图解计算机基础](https://github.com/xiaolincoder/CS-Base)
  - 图解计算机网络、操作系统、计算机组成、数据库
  - https://xiaolincoding.com/
  - 抽查了一下  面试八股文 中包含题目
- [剑指前端 Offer](https://github.com/HZFE/awesome-interview)
  - 已有 anki 可以一键导入
- [《剑指 Offer》面试题 Python 实现](https://github.com/JushuangQiao/Python-Offer)
  - 算法题 暂时不用
- [java-eight-part](https://github.com/CoderLeixiaoshuai/java-eight-part)
  - Java 面试套路，Java 进阶学习，打破内卷拿大厂 Offer
  - 无网页版本
  - 内容不适合转 anki 不是非常系统
- [Interview——IT 行业应试学知识库](https://github.com/apachecn/Interview)
  - interview.apachecn.org
  - star 最多
  - https://interview.apachecn.org/#/
  - 八股文转向了 baguwen-wiki
- [JCSprout](https://github.com/crossoverJie/JCSprout)
  - Java Core Sprout : basic, concurrent, algorithm\
  - https://crossoverjie.top/JCSprout/#/?id=introduction
  - java 相关 无数据库等信息

## 面试八股文

- 二级标题混乱 无法直接使用 mdankideck 工具
  - 需要脚本改造 `format_markdown.py`
  - mdankideck 工具参考 [[anki 导入 markdown 文件调研]]
- 学习笔记不弄
  - 文章结构不适合转换成 anki card
- 存在多个一级标题时
  - 第二个往后的所有标题 级别+1
  - E:\tmp\baguwen-wiki\docs\DOM-API-面试题（山月）.md
    - 测试 ok
  - [ ] 所有二级标题加上一级标题
- 图片效果
  - 存在部分无图片的情况
  - 1cbecf47a83cbb8e02f34bcd5a92f0a5
- 无二级标题时
  - 暂无这种情况
- 去除 参考资料 标题及其内容
  - 二级标题后结构合理 不用管
- 顺序问题
  - 暂时不解决

``` bash
python format_markdown.py
pip install markdown-anki-decks
mdankideck .\docs .\anki --prefix "面试八股文：:" --sync -delete 
```

### format markdown 脚本

``` python
#!/usr/bin/env python
# encoding: utf-8
# @Time   : 2022/08/07 13:35:52
# @author : zza
# @Email  : z740713651@outlook.com
# @File   : format_markdown.py

import os
import sys
import shutil
import re

def main():
    # remove note files
    if not os.path.isdir("study_notes"):
        os.mkdir("study_notes")
    file_names = os.listdir(".\docs")
    for file_name in file_names:
        if "学习笔记" in file_name:
            print("move to study_notes", file_name)
            # mv to study_notes
            shutil.move(".\docs\\" + file_name, ".\study_notes")
        elif "面试题" not in file_name:
            print("无面试题字段", file_name)

    # find unformat file
    file_names = os.listdir(".\docs")
    for file_name in file_names:
        if not file_name.endswith(".md"):
            continue
        context = open(".\docs\\" + file_name, "r", encoding="utf-8").read()
        level_one_tiltes = re.findall(r"\n\n# ([^\n]+)\n", context)
        # replace \n(#+ [^\n]+)\n to \n#$1\n
        if len(level_one_tiltes) != 1:
            print("unformat file", file_name)
            # format file
            original_first_title = level_one_tiltes[0]

            # new_context = re.sub(r"\n(#+ [^\n]+)\n", r"\n#\1\n", context)
            # 二级变三级
            new_context = re.sub(r"\n(#{2,}) ([^\n]+)\n", rf"\n#\1 \2\n", context)
            # 一级变二级 并加上主标题
            new_context = re.sub(
                r"\n# ([^\n]+)\n",
                rf"\n## " + original_first_title + r" - \1\n",
                new_context,
            )
            # 一级保持不变
            new_context = new_context.replace(
                f"## {original_first_title} - {original_first_title}",
                f"# {original_first_title}",
            )
            open(".\docs\\" + file_name, "w", encoding="utf-8").write(new_context)
        else:
            print("format file", file_name)
            # mv to format_files

    pass

if __name__ == "__main__":
    main()

```
