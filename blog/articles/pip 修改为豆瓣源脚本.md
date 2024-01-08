---
title: pip 修改为豆瓣源脚本
date: 2021-04-19 11:04:53
permalink: /pages/78fb9f/
categories: 
  - Python
tags: 
  - null
article: true
---
# pip 修改为豆瓣源脚本

# pip 命令

运行以下命令就好了

``` bash
pip config set global.index-url http://pypi.douban.com/simple    
pip config set global.trusted-host pypi.douban.com    
pip config set global.disable-pip-version-check true      
```

* 第三条用于关闭版本检查

![](../images/7485616-d661322f3e6c403f.gif)

`部分操作系统可能有写入的位置不对的情况 于是乎有了下列脚本`
`前面配置已生效的同学可以不用管了`

![ ](../images/7485616-d7f1d7a3e6f0b530.jpg)

网上教程基本上都说 pip 的配置文件在用户目录下 `%HOMEPATH%/.pip/pip`
但是实际上在在 `pip config list`读的不知道是那个文件夹的文件
使用`pip config set`写入到`%HOMEPATH%\AppData\Roaming\pip\pip.ini`
用 --global --user 等指令 写入的地方也不同
有待研究

# 操作代码

```python
#!/usr/bin/python3    
# encoding: utf-8     
# @Time    : 2020/4/13 14:12    
# @author  : zza    
# @Email   : 740713651@qq.com    
# @File    : pip_douban_source.py    
# https://python3-cookbook.readthedocs.io/zh_CN/latest/c13/p10_read_configuration_files.html    
# https://www.jianshu.com/p/0cdd647bcc3e    
"""    
python -c "import requests;res = requests.get('http://cdn.ricequant.com/rqpro/pip_douban_source_v2.py');exec(res.text)"    
"""    
    
import os    
import sys    
    
from configparser import ConfigParser    
    
conf_dir = os.path.join(os.path.expanduser("~"), ".pip")    
os.makedirs(conf_dir, exist_ok=True)    
WINDOWS = (sys.platform.startswith("win") or (sys.platform == 'cli' and os.name == 'nt'))    
CONFIG_BASENAME = 'pip.ini' if WINDOWS else 'pip.conf'    
conf_path = os.path.join(conf_dir, CONFIG_BASENAME)    
    
cfg = ConfigParser()    
cfg.read(conf_path, encoding="utf8")    
    
if not cfg.has_section('global'):    
    cfg.add_section('global')    
    
cfg.set('global', 'index-url', 'http://pypi.douban.com/simple')    
cfg.set('global', 'trusted-host', 'pypi.douban.com')    
cfg.set('global', 'timeout', "60")    
cfg.set('global', 'disable-pip-version-check', "true") #关闭版本检查    
    
if not WINDOWS:    
    if not cfg.has_section('install'):    
        cfg.add_section('install')    
    cfg.set("install", "use-mirrors", "true")    
    cfg.set("install", "mirrors", "https://pypi.douban.com/simple/")    
    cfg.set("install", "trusted-host", "pypi.douban.com")    
    
with open(conf_path, "w", encoding="utf8:") as f:    
    cfg.write(f)    
    
print("save to {}".format(conf_path))    
```

# 一行命令跑起来

* 这个文件我放公司 cdn 上了
* 需要用到 python exec 方法
如下：

``` bash
python -c "import requests;res = requests.get('http://cdn.ricequant.com/rqpro/pip_douban_source_v2.py');exec(res.text)"    
```

![](../images/7485616-cb2bcda1cf4a45b4.gif)
