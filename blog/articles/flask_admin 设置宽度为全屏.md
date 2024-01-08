---
title: flask_admin 设置宽度为全屏
date: 2021-04-19 11:04:53
permalink: /pages/0c284a/
categories: 
  - Python
tags: 
  - null
article: true
---
# flask_admin 设置宽度为全屏

``` html
{% extends 'admin/base.html' %}    
    
{% block head_tail %}    
    {{ super() }}    
    <link href="{{ url_for('static', filename='layout.css') }}" rel="stylesheet">    
    <style>    
        .container {    
            width: 100%;    
        }    
    </style>    
{% endblock %}    
```
