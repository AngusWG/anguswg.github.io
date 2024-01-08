---
title: flask_admin 主页支持 markdown 写入
date: 2021-04-19 11:04:53
permalink: /pages/2d6543/
categories: 
  - Python
tags: 
  - null
article: true
---
# flask_admin 主页支持 markdown 写入

- 人比较懒 ，看不懂评论告诉我哈

![](../images/7485616-9f846c44ade53e4e.gif)

`vim view_markdown_index.py`

``` python
#!/usr/bin/python3    
# encoding: utf-8     
# @Time    : 2020/3/26 15:37    
# @author  : zza    
# @Email   : 740713651@qq.com    
# @File    : readme_helper.py    
import datetime    
import os    
from shutil import copyfile    
    
import markdown    
import markdown.extensions.fenced_code    
from flask import flash, redirect, request, send_from_directory    
from flask_admin import AdminIndexView, expose    
from pygments.formatters.html import HtmlFormatter    
from werkzeug.utils import secure_filename    
    
formatter = HtmlFormatter(style="emacs", full=True, cssclass="codehilite")    
css_string = formatter.get_style_defs()    
    
class MarkdownIndexView(AdminIndexView):    
    
    @expose()    
    def index(self):    
        """获取 readme 文件作为 index 页面帮助文档    
        copy from https://github.com/solitudenote/gitkeeper/blob/d42f5990b05cf28cee12f20780e7794cd3579ead/app.py    
        """    
        # get file    
        readme_file = open("README.md", "r", encoding="utf8")    
        md_template_string = markdown.markdown(readme_file.read(), extensions=["fenced_code", "codehilite"])    
        md_css_string = "<style>" + css_string + "</style>"    
        md_template = md_css_string + md_template_string    
        return self.render(self._template, readme_md=md_template, upload_readme_url="/admin/upload_form")    
    
    @expose('/upload_form', methods=['POST'])    
    def upload_file(self):    
        # check if the post request has the file part    
        if 'file' not in request.files:    
            flash('No file part')    
            return redirect('/admin/')    
        file = request.files['file']    
        if file.filename == '':    
            flash('No file selected for uploading')    
            return redirect('/admin/')    
        if file and file.filename == "README.md":    
            bak_file = "README.md" + ".{}.bak".format(datetime.datetime.now().isoformat()).replace(":", "-")    
            copyfile("README.md", bak_file)    
            filename = secure_filename(file.filename)    
            file.save(filename)    
            flash('README.md 上传成功')    
            return redirect('/admin/')    
        else:    
            flash('文件名必须为 README.md')    
            return redirect('/admin/')    
    
    @expose('/export')    
    def export(self):    
        return send_from_directory(os.path.abspath("."), "README.md", as_attachment=True)  # as_a    
    
admin_index_view = MarkdownIndexView(name="主页", template="index.html")    
```

`vim index.html`

``` html
{% extends 'admin/index.html' %}    
    
{% block page_body %}    
    {{ super() }}    
    
    <table class="markdown-table  table-hover searchable">    
        <tr>    
            <td>    
                <a href="{{ get_url('.export') }}"    
                   title="{{ _gettext('Export') }}">{{ _gettext('Export') + ' ' + export_type|upper }}</a>    
            </td>    
    
            <form id="form" method="post" action={{ upload_readme_url }} enctype="multipart/form-data">    
                <td>    
                    <label class="input-file">    
                        <a title="{{ _gettext('Import') }}"> {{ _gettext('Import') }} </a>    
                        <input type="file" name="file" id="upload-file" autocomplete="off" hidden required>    
                    </label>    
                </td>    
            </form>    
    
        </tr>    
    </table>    
    <br>    
    <hr/>    
    <script>    
    
        let __main = function () {    
            document.getElementById("upload-file").onchange = function () {    
                document.getElementById("form").submit();    
            };    
        }    
    
        __main()    
    </script>    
    
    {{ readme_md|safe }}    
    
    <style>    
        .markdown-table {    
            width: 200px;    
            float: right;    
    
        }    
    
        .markdown-table label {    
            font-weight: normal;    
        }    
    
        [hidden] {    
            display: none !important;    
        }    
    
    </style>    
{% endblock %}    
    
```

vim app,py

``` python
from view_markdown_index import admin_index_view    
from flask import Flask    
    
app = Flask(__name__)    
admin_view = Admin(    
    app,    
    template_mode='bootstrap3',    
    index_view=admin_index_view,    
    base_template=r'layout.html',    
    category_icon_classes={'Profiles': 'glyphicon glyphicon-wrench'},    
)    
    
if __name__ == '__main__':    
    app.run()    
```

![](../images/7485616-14aa756dc9ad4e15.jpg)
