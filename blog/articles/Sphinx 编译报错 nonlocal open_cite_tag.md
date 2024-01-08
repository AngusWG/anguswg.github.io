---
title: Sphinx 编译报错 nonlocal open_cite_tag
date: 2021-04-19 11:04:53
permalink: /pages/686afb/
categories: 
  - 编程
tags: 
  - null
article: true
---
# Sphinx 编译报错 nonlocal open_cite_tag

- 线上自动编译时出现错误 SyntaxError: invalid syntax
- 谷歌上搜 `nonlocal open_cite_tag` 没有任何相关信息

``` text
Running Sphinx v1.7.9    
loading translations [zh_CN]... done    
    
Traceback (most recent call last):    
  File "/home/docs/checkouts/readthedocs.org/user_builds/rqalpha/envs/develop/local/lib/python2.7/site-packages/sphinx/cmdline.py", line 303, in main    
    args.warningiserror, args.tags, args.verbosity, args.jobs)    
  File "/home/docs/checkouts/readthedocs.org/user_builds/rqalpha/envs/develop/local/lib/python2.7/site-packages/sphinx/application.py", line 191, in __init__    
    self.setup_extension(extension)    
  File "/home/docs/checkouts/readthedocs.org/user_builds/rqalpha/envs/develop/local/lib/python2.7/site-packages/sphinx/application.py", line 411, in setup_extension    
    self.registry.load_extension(self, extname)    
  File "/home/docs/checkouts/readthedocs.org/user_builds/rqalpha/envs/develop/local/lib/python2.7/site-packages/sphinx/registry.py", line 315, in load_extension    
    mod = __import__(extname, None, None, ['setup'])    
  File "/home/docs/checkouts/readthedocs.org/user_builds/rqalpha/envs/develop/local/lib/python2.7/site-packages/nbsphinx.py", line 1088    
    nonlocal open_cite_tag    
                         ^    
SyntaxError: invalid syntax    
    
Exception occurred:    
  File "/home/docs/checkouts/readthedocs.org/user_builds/rqalpha/envs/develop/local/lib/python2.7/site-packages/sphinx/registry.py", line 315, in load_extension    
    mod = __import__(extname, None, None, ['setup'])    
  File "/home/docs/checkouts/readthedocs.org/user_builds/rqalpha/envs/develop/local/lib/python2.7/site-packages/nbsphinx.py", line 1088    
    nonlocal open_cite_tag    
                         ^    
SyntaxError: invalid syntax    
The full traceback has been saved in /tmp/sphinx-err-cnpEVe.log, if you want to report the issue to the developers.    
Please also report this if it was a user error, so that a better error message can be provided next time.    
A bug report can be filed in the tracker at https://github.com/sphinx-doc/sphinx/issues. Thanks!    
    
```

对照后发现  nbsphinx ==0.3.5 时会成功
requirements.txt 文件加上版本限制就 ok

- cat requirements.txt

``` text
Sphinx    
watchdog    
sphinx_rtd_theme    
nbsphinx ==0.3.5    
jupyter_client    
```

![image.png](../images/7485616-ea1b0156be440733.png)
