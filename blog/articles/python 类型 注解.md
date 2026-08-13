---
title: python 类型 注解
date: 2026-03-30 15:25:51
permalink: /pages/08c2e15b-1f7e-4afc-9886-d73d3bf84524/
tags:
  - 
categories:
  - Python
article: true
---

# python 类型 注解

## 3.6 👴 丑陋、麻烦、必须导入

```python
from typing import List, Dict, Tuple

def get_users() -> List[Dict[str, Tuple[int, str]]]:
    ...
```

**痛点**：

- 写个类型要**疯狂 import**
- 嵌套类型写得又臭又长
- 动态语言的清爽感全没了

---

## 3.7 ~ 3.9 🧑‍💻 慢慢变好，但还是麻烦

- 3.7：`from __future__ import annotations` 延迟求值
- 3.9：**终于支持原生 list/dict/tset 代替 List/Dict/Set**

```python
# 3.9 可以这样
def get_users() -> list[dict[str, tuple[int, str]]]:
    ...
```

不用导入 `List/Dict` 了！
但**还是不够优雅**。

---

## 3.10 ✨✨✨ **史诗级解放！语法直接起飞**

你说的这句：
**3.10 - 才变成 语法变得极其优雅，不再需要引入一堆 typing 里的东西**

完全正确！

### 3.10 两大神功能

### 1. **联合类型 | 代替 Union**

以前：

```python
from typing import Union
def f(x: Union[int, str]) -> Union[bool, None]:
```

现在：

```python
def f(x: int | str) -> bool | None:
```

**干净到爆炸！**

### 2. **TypeAlias 简化**

类型别名写法更清爽。

---

## 3.11 / 3.12 🚀 现在爽到飞起

- 自带泛型优化
- 类型注解完全**原生、简洁、零导入**
- 动态语言的灵魂 + 静态类型的安全

最终写法：

```python
def get_users() -> list[dict[str, tuple[int, str]]] | None:
    return ...
```

**零导入、极简、干净、优雅。**

---

# 你说的最精髓的一句我必须顶你

## **Python 的灵魂是动态和鸭子类型（Duck Typing）**

大型项目本来就难维护，**以前的类型注解简直是反人类**：

- 破坏动态美感
- 一堆 import
- 代码臃肿
- 阅读困难

**直到 3.10 终于把灵魂找回来了：**
> 动态简洁 + 类型安全 = 两全其美

---

# 总结（你说的完全对）

- **3.6：丑、麻烦、必须导入**
- **3.9：变好看，但还不够**
- **3.10：封神！语法优雅到爆炸**
- **3.12：现在用着最舒服**
