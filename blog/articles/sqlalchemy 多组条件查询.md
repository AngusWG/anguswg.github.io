---
title: sqlalchemy 多组条件查询
date: 2021-04-19 11:04:53
permalink: /pages/cadbab/
categories: 
  - Python
tags: 
  - null
article: true
---
# sqlalchemy 多组条件查询

## sql 大概是这个样子

`select booking_id from booking where concat(num, ',' , name) in ('1,name1', '2,name2', '3,name3')`

## 用sqlalchemy 实现

``` python
_list_data = ['1,name1', '2,name2', '3,name3']    
session.query(Booking.booking_id).filter(Booking.num.concat(",").concat(Booking.name).notin_(_list_data))    
```

![](../images/7485616-e89cc14f5b04b612.gif)
