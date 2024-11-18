---
title: 博客展示 google analytics 数据
date: 2024-11-18T10:22:28.000Z
permalink: /pages/cf055bb1-4e11-42f1-a783-81f3bb4f8ec8/
tags:
  - 
categories:
  - 编程
article: true
---

# 博客展示 google analytics 数据

<iframe width="800" height="600" src="https://lookerstudio.google.com/embed/reporting/6054b482-a054-42f9-870d-3fe15faeb78f/page/IpdTE" />

---

## 相关

- 想法起源 [别人的博客](https://us.umami.is/share/GET5ziHWklwtGWK0/zsh.xlog.app), 看起来很酷，还能显示当前人数。
- 在 docusaurus 或者 markdown 中博客展示 google analysis 数据
- 目前好像没有相关项目 可以做个类似 display card 的东西
- 使用默认的 [google analytics](https://analytics.google.com/) 查看数据
- [lookerstudio](https://lookerstudio.google.com/) 可以调用 google analytics 并展示，但是自带的模板库没有使用最新的 API。
  - [报告地址](https://lookerstudio.google.com/reporting/6054b482-a054-42f9-870d-3fe15faeb78f/page/IpdTE/edit)
  - [embed](https://lookerstudio.google.com/embed/reporting/6054b482-a054-42f9-870d-3fe15faeb78f/page/IpdTE)
  - 右上角分享 - 复制代码后 需要删除部分代码
  - 暂时不能实现的功能
    - [ ] 不能显示当前再看的人数

```html
<!-- 代码参考 -->
 <iframe width="800" height="600" src="https://lookerstudio.google.com/embed/reporting/6054b482-a054-42f9-870d-3fe15faeb78f/page/IpdTE">
```

---
