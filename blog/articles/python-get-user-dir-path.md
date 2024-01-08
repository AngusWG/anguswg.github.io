---
title: python-get-user-dir-path
date: 2022-05-06 19:29:58
tags: 
  - null
categories: 
  - Python
article: true
permalink: /pages/22f974/
---
# python-get-user-dir-path

## 老方案

```python
save_dir = os.path.join(os.path.expanduser("~"), "Pictures", "wallpaper")
os.makedirs(save_dir, exist_ok=True)

```

## [新方案](https://stackoverflow.com/questions/3927259/how-do-you-get-the-exact-path-to-my-documents)

``` python
In [16]: import ctypes
    ...: from ctypes.wintypes import MAX_PATH
    ...:
    ...: dll = ctypes.windll.shell32
    ...: buf = ctypes.create_unicode_buffer(MAX_PATH + 1)
    ...: for i in range(100):
    ...:     if dll.SHGetSpecialFolderPathW(None, buf, 0x0000 +i, False):
    ...:         print( 0x0000 +i,buf.value)
    ...:     else:
    ...:         pass
    ...:         # print("Failure!")
    ...:
0 C:\Users\tmp_user\Desktop
2 C:\Users\tmp_user\AppData\Roaming\Microsoft\Windows\Start Menu\Programs
5 E:\Users\tmp_user\Documents
6 E:\Users\tmp_user\Favorites
7 C:\Users\tmp_user\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
8 C:\Users\tmp_user\AppData\Roaming\Microsoft\Windows\Recent
9 C:\Users\tmp_user\AppData\Roaming\Microsoft\Windows\SendTo
11 C:\Users\tmp_user\AppData\Roaming\Microsoft\Windows\Start Menu
13 E:\Users\tmp_user\Music
14 E:\Users\tmp_user\Videos
16 C:\Users\tmp_user\Desktop
19 C:\Users\tmp_user\AppData\Roaming\Microsoft\Windows\Network Shortcuts
20 C:\WINDOWS\Fonts
21 C:\Users\tmp_user\AppData\Roaming\Microsoft\Windows\Templates
22 C:\ProgramData\Microsoft\Windows\Start Menu
23 C:\ProgramData\Microsoft\Windows\Start Menu\Programs
24 C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup
25 C:\Users\Public\Desktop
26 C:\Users\tmp_user\AppData\Roaming
27 C:\Users\tmp_user\AppData\Roaming\Microsoft\Windows\Printer Shortcuts
28 C:\Users\tmp_user\AppData\Local
29 C:\Users\tmp_user\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup        
30 C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup
31 E:\Users\tmp_user\Favorites
32 C:\Users\tmp_user\AppData\Local\Microsoft\Windows\INetCache
33 C:\Users\tmp_user\AppData\Local\Microsoft\Windows\INetCookies
34 C:\Users\tmp_user\AppData\Local\Microsoft\Windows\History
35 C:\ProgramData
36 C:\WINDOWS
37 C:\WINDOWS\system32
38 C:\Program Files
39 E:\Users\tmp_user\Pictures
40 C:\Users\tmp_user
41 C:\WINDOWS\SysWOW64
42 C:\Program Files (x86)
43 C:\Program Files\Common Files
44 C:\Program Files (x86)\Common Files
45 C:\ProgramData\Microsoft\Windows\Templates
46 C:\Users\Public\Documents
47 C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Administrative Tools
48 C:\Users\tmp_user\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Administrative Tools
53 C:\Users\Public\Music
54 C:\Users\Public\Pictures
55 C:\Users\Public\Videos
56 C:\WINDOWS\resources
59 C:\Users\tmp_user\AppData\Local\Microsoft\Windows\Burn\Burn
```

---

## 整合以后

``` python
def get_default_save_dir(dir_name:str= "Pictures"):
    # windows platform
    res_path = os.path.join(os.path.expanduser("~"), dir_name)
    if os.name == "nt":
        import ctypes
        from ctypes.wintypes import MAX_PATH
            ...:
        dll = ctypes.windll.shell32
        buf = ctypes.create_unicode_buffer(MAX_PATH + 1)
        for i in range(100):
            if dll.SHGetSpecialFolderPathW(None, buf, 0x0000 +i, False) and dir_name in buf.value:
                return buf.value
    return res_path
```
