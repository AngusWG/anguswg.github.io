---
title: python-fire-help 标准输出
date: 2021-06-15 16:02:32
permalink: /pages/a16cd4/
categories: 
  - Python
tags: 
  - null
article: true
---
# python-fire-help 标准输出

[fire](https://github.com/google/python-fire) 是一个比 click 更有使用体验的命令行工具包。

但是在 help 命令中，会进入 man 的交互模式里，不能直接打印到标准输出里。

看了下 [Issue](https://github.com/google/python-fire/issues/188)，有几种解决方案，记录一下。

> 修改 fire.core.Display

``` python
if __name__ == "__main__":
    # Make Python Fire not use a pager when it prints a help text
    fire.core.Display = lambda lines, out: print(*lines, file=out)
    fire.Fire(...)
```

> 更改 PAGER 环境变量（推荐）

``` text
* windows 上设置 setx PAGER type
* linux 上设置 export PAGER=cat
```

> 在程序中修改环境变量

```python
os.environ["PAGER"] = 'cat'
```

---

* 一个写完后发现没必要的代码
  
``` python3
def _fire_print_prepare() -> None:
    """help to print mode `setx PAGER cat`"""
    import os
    import platform
    from shutil import which

    if os.environ.get("PAGER"):
        return
    if which("cat"):
        os.environ["PAGER"] = "cat"
    elif platform.platform().startswith("Windows"):
        os.environ["PAGER"] = "type"
```
