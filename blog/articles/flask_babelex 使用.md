---
title: flask_babelex 使用
date: 2021-04-19 11:04:53
permalink: /pages/b6ffd0/
categories: 
  - Python
tags: 
  - null
article: true
---
# flask_babelex 使用  

``` bash
# https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-xiii-i18n-and-l10n
# 请在rqlicense-server 目录下操作    
# 生成翻译文件模版    
pybabel extract -F babel.cfg -k _l -o messages.pot .    
# 生成翻译文件 一般只需要 init 一次    
pybabel init -i messages.pot -d rqlicense/translations -l en    
# 更新翻译文件    
pybabel update -i messages.pot -d rqlicense/translations -l en    
# 编译    
pybabel compile -d rqlicense/translations    
```

- 附赠 messages.po 谷歌翻译脚本

``` python
#!/usr/bin/python3    
# encoding: utf-8     
# @Time    : 2019/12/13 15:25    
# @author  : zza    
# @Email   : 740713651@qq.com    
# @File    : 翻译messages.po文件.py    
import re    
from tqdm import tqdm    
from googletrans import Translator    
    
proxies = {"http": 'http://localhost:9999',    
           "https": 'https://localhost:9999'}    
translate = Translator(proxies=proxies)    
    
    
def service(messages_po_path):    
    with open(messages_po_path, "r", encoding="utf8") as f:    
        messages_body = f.read()    
    messages_lines = messages_body.split("\n")    
    result_lines = []    
    msgid = ""    
    msgstr = ""    
    for line in tqdm(messages_lines):    
        if line.startswith("msgid"):    
            msgid = line    
        elif line.startswith("msgstr"):    
            msgstr = line    
            if msgid == 'msgid ""':    
                pass    
            elif msgstr == 'msgstr ""':    
                translate_str = re.findall(r"msgid \"(.*)\"", msgid)[0]    
                en_str = translate.translate(translate_str).text    
                msgstr = msgstr.replace('""', '"{}"'.format(en_str))    
            result_lines.append(msgid)    
            result_lines.append(msgstr)    
        else:    
            result_lines.append(line)    
    result_body = "\n".join(result_lines)    
    messages_po_to_path = messages_po_path.replace(".po", "bak.po")    
    with open(messages_po_to_path, "w", encoding="utf8") as f:    
        f.write(result_body)    
    
    
if __name__ == '__main__':    
    messages_po_path = r"D:\PycharmProjects\rqlicense\rqlicense-server\rqlicense\translations\en\LC_MESSAGES\messages.po"    
    service(messages_po_path)    
    
```
