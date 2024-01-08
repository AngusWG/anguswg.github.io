---
title: LINK fatal error LNK1158 cannot run rc.exe
date: 2021-04-19 11:04:53
permalink: /pages/028a1b/
categories: 
  - 随笔
tags: 
  - null
article: true
---
# LINK fatal error LNK1158 cannot run rc.exe

[参考 LINK : fatal error LNK1158: cannot run 'rc.exe'](https://blog.csdn.net/yapingxin/article/details/80541537)

python 编译 cython 文件的时候

## 报错如下

``` bash
    ERROR: Command errored out with exit status 1:    
     command: 'd:\programdata\miniconda3\envs\py35\python.exe' -c 'import sys, setuptools, tokenize; sys.argv[0] = '"'"'D:\\PycharmProjects\\rqalpha-mod-optimizer2\\setup.py'"'"'; __file__='"'"'D:\\PycharmProjects\\rqalpha-mo    
d-optimizer2\\setup.py'"'"';f=getattr(tokenize, '"'"'open'"'"', open)(__file__);code=f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' develop --no-deps    
         cwd: D:\PycharmProjects\rqalpha-mod-optimizer2\    
    Complete output (38 lines):    
    running develop    
    running egg_info    
    writing requirements to rqalpha_mod_optimizer2.egg-info\requires.txt    
    writing dependency_links to rqalpha_mod_optimizer2.egg-info\dependency_links.txt    
    writing rqalpha_mod_optimizer2.egg-info\PKG-INFO    
    writing top-level names to rqalpha_mod_optimizer2.egg-info\top_level.txt    
    reading manifest file 'rqalpha_mod_optimizer2.egg-info\SOURCES.txt'    
    reading manifest template 'MANIFEST.in'    
    warning: no previously-included files matching '*' found under directory 'tests'    
    warning: no previously-included files matching '__pycache__' found under directory '*'    
    warning: no previously-included files matching '*.py[co]' found under directory '*'    
    writing manifest file 'rqalpha_mod_optimizer2.egg-info\SOURCES.txt'    
    running build_ext    
    cythoning rqalpha_mod_optimizer2\api.py to rqalpha_mod_optimizer2\api.c    
    cythoning rqalpha_mod_optimizer2\mod.py to rqalpha_mod_optimizer2\mod.c    
    cythoning rqalpha_mod_optimizer2\_version.py to rqalpha_mod_optimizer2\_version.c    
    building 'rqalpha_mod_optimizer2.api' extension    
    creating build    
    creating build\temp.win-amd64-3.5    
    creating build\temp.win-amd64-3.5\Release    
    creating build\temp.win-amd64-3.5\Release\rqalpha_mod_optimizer2    
    C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\BIN\x86_amd64\cl.exe /c /nologo /Ox /W3 /GL /DNDEBUG /MD -Id:\programdata\miniconda3\envs\py35\include -Id:\programdata\miniconda3\envs\py35\include "-IC:\Program Fil    
es (x86)\Microsoft Visual Studio 14.0\VC\INCLUDE" "-IC:\Program Files (x86)\Windows Kits\10\include\10.0.17763.0\ucrt" "-IC:\Program Files (x86)\Windows Kits\10\include\10.0.17763.0\shared" "-IC:\Program Files (x86)\Windows K    
its\10\include\10.0.17763.0\um" "-IC:\Program Files (x86)\Windows Kits\10\include\10.0.17763.0\winrt" /Tcrqalpha_mod_optimizer2\api.c /Fobuild\temp.win-amd64-3.5\Release\rqalpha_mod_optimizer2\api.obj    
    api.c    
    creating D:\PycharmProjects\rqalpha-mod-optimizer2\build\lib.win-amd64-3.5    
    creating D:\PycharmProjects\rqalpha-mod-optimizer2\build\lib.win-amd64-3.5\rqalpha_mod_optimizer2    
    C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\BIN\x86_amd64\link.exe /nologo /INCREMENTAL:NO /LTCG /DLL /MANIFEST:EMBED,ID=2 /MANIFESTUAC:NO /LIBPATH:d:\programdata\miniconda3\envs\py35\libs /LIBPATH:d:\programda    
ta\miniconda3\envs\py35\PCbuild\amd64 "/LIBPATH:C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\LIB\amd64" "/LIBPATH:C:\Program Files (x86)\Windows Kits\10\lib\10.0.17763.0\ucrt\x64" "/LIBPATH:C:\Program Files (x86)\Wi    
ndows Kits\10\lib\10.0.17763.0\um\x64" /EXPORT:PyInit_api build\temp.win-amd64-3.5\Release\rqalpha_mod_optimizer2\api.obj /OUT:build\lib.win-amd64-3.5\rqalpha_mod_optimizer2\api.cp35-win_amd64.pyd /IMPLIB:build\temp.win-amd64    
-3.5\Release\rqalpha_mod_optimizer2\api.cp35-win_amd64.lib    
    api.obj : warning LNK4197: export 'PyInit_api' specified multiple times; using first specification    
       Creating library build\temp.win-amd64-3.5\Release\rqalpha_mod_optimizer2\api.cp35-win_amd64.lib and object build\temp.win-amd64-3.5\Release\rqalpha_mod_optimizer2\api.cp35-win_amd64.exp    
    Generating code    
    Finished generating code    
    LINK : fatal error LNK1158: cannot run 'rc.exe'    
    d:\programdata\miniconda3\envs\py35\lib\site-packages\Cython\Compiler\Main.py:369: FutureWarning: Cython directive 'language_level' not set, using 2 for now (Py2). This will change in a later release! File: D:\PycharmProj    
ects\rqalpha-mod-optimizer2\rqalpha_mod_optimizer2\api.py    
      tree = Parsing.p_module(s, pxd, full_module_name)    
    d:\programdata\miniconda3\envs\py35\lib\site-packages\Cython\Compiler\Main.py:369: FutureWarning: Cython directive 'language_level' not set, using 2 for now (Py2). This will change in a later release! File: D:\PycharmProj    
ects\rqalpha-mod-optimizer2\rqalpha_mod_optimizer2\mod.py    
      tree = Parsing.p_module(s, pxd, full_module_name)    
    d:\programdata\miniconda3\envs\py35\lib\site-packages\Cython\Compiler\Main.py:369: FutureWarning: Cython directive 'language_level' not set, using 2 for now (Py2). This will change in a later release! File: D:\PycharmProj    
ects\rqalpha-mod-optimizer2\rqalpha_mod_optimizer2\_version.py    
      tree = Parsing.p_module(s, pxd, full_module_name)    
    error: command 'C:\\Program Files (x86)\\Microsoft Visual Studio 14.0\\VC\\BIN\\x86_amd64\\link.exe' failed with exit status 1158    
    ----------------------------------------    
  Rolling back uninstall of rqalpha-mod-optimizer2    
  Moving to d:\programdata\miniconda3\envs\py35\lib\site-packages\rqalpha_mod_optimizer2-0.2.5.dist-info\    
   from d:\programdata\miniconda3\envs\py35\lib\site-packages\~qalpha_mod_optimizer2-0.2.5.dist-info    
  Moving to d:\programdata\miniconda3\envs\py35\lib\site-packages\rqalpha_mod_optimizer2\    
   from d:\programdata\miniconda3\envs\py35\lib\site-packages\~qalpha_mod_optimizer2    
ERROR: Command errored out with exit status 1: 'd:\programdata\miniconda3\envs\py35\python.exe' -c 'import sys, setuptools, tokenize; sys.argv[0] = '"'"'D:\\PycharmProjects\\rqalpha-mod-optimizer2\\setup.py'"'"'; __file__='"'    
"'D:\\PycharmProjects\\rqalpha-mod-optimizer2\\setup.py'"'"';f=getattr(tokenize, '"'"'open'"'"', open)(__file__);code=f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' dev    
elop --no-deps Check the logs for full command output.    
    
```

# 解决

> C:\Program Files (x86)\Windows Kits\8.1\bin\x86

这个目录下的 rc.exe 和 rcdll.dll 拷贝到我的 Visual C++ 的 VC/Bin 目录下：

> D:\Apps\x86\Microsoft\Visual_Studio\v14.0\VC\bin

`通过错误信息，我电脑的文件位置是 C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\BIN\x86_amd64\`

注意我的 Visual C++ 的安装目录可能和你的不同，你需要用你自己的的 VC/Bin 目录。

![哑巴日记](../images/7485616-c6a05b68cbc6798b.jpg)
