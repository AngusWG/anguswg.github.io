---
title: flask_admin csv 导出  中文乱码问题
date: 2021-04-19 11:04:53
permalink: /pages/a06745/
categories: 
  - Python
tags: 
  - null
article: true
---
# flask_admin csv 导出 中文乱码问题

相关参考 [python 中文写入 CSV 乱码解决](https://blog.csdn.net/Yeoman92/article/details/71123845)

- 原因：csv 文件开头缺少 BOM_UTF8 字符
- 解决：在 Response 开头加上 BOM_UTF8 字符
- 核心代码

``` python
titles[0] = codecs.BOM_UTF8.decode("utf8")+codecs.BOM_UTF8.decode()+titles[0]    
```

- 相关引入

``` python
import codecs    
import csv    
    
from flask_admin._compat import csv_encode    
from flask import request, redirect, flash, current_app, Response, stream_with_context    
```

- 逻辑代码（复制 放到对应的 ModelView 类里就好了）

``` python
    def _export_csv(self, return_url):    
        """    
            Export a CSV of records as a stream.    
        """    
        count, data = self._export_data()    
    
        # https://docs.djangoproject.com/en/1.8/howto/outputting-csv/    
        class Echo(object):    
            """    
            An object that implements just the write method of the file-like    
            interface.    
            """    
            def write(self, value):    
                """    
                Write the value by returning it, instead of storing    
                in a buffer.    
                """    
                return value    
    
        #    
        writer = csv.writer(Echo())    
    
        def generate():    
            # Append the column titles at the beginning    
            titles = [csv_encode(c[1]) for c in self._export_columns]    
            titles[0] = codecs.BOM_UTF8.decode("utf8")+codecs.BOM_UTF8.decode()+titles[0]    
            yield writer.writerow(titles)    
    
            for row in data:    
                vals = [csv_encode(self.get_export_value(row, c[0]))    
                        for c in self._export_columns]    
                yield writer.writerow(vals)    
    
        filename = self.get_export_name(export_type='csv')    
    
        disposition = 'attachment;filename=%s' % (secure_filename(filename),)    
    
        return Response(    
            stream_with_context(generate()),    
            headers={'Content-Disposition': disposition},    
            mimetype='text/csv'    
        )    
```
