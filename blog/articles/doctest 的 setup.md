---
title: doctest 的 setup
date: 2021-11-22 18:41:13
permalink: /pages/55846c/
categories: 
  - Python
tags: 
  - null
article: true
---
# doctest 的 setup

在项目中写了 doctest，但是需要先初始化环境才方便使用。

在运行 pytest 的目录下创建`conftest.py`

```python
#!/usr/bin/python3
# encoding: utf-8 
# @author  : zza
# @File    : conftest.py
""" FOR DOCTEST """
import pytest

@pytest.fixture(autouse=True)
def init_env(doctest_namespace):
    print("doctest_namespace", doctest_namespace)
    import os
    sql_url = "sqlite:///data.db"
    os.environ['sql_uri'] = sql_url
    init(sql_url)
```

- pytest 启动就用 pytest 命令就好了：`pytest`
- coverage 启动时使用该命令启动：`coverage run --source my_pachage -m pytest`

更多使用案例建议 github 直接 [搜索`conftest.py`文件。](https://github.com/search?l=Python&q=filename%3Aconftest.py&type=Code)
