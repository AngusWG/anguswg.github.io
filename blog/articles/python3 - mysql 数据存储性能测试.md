---
title: python3 - mysql 数据存储性能测试
date: 2021-04-19 11:04:53
permalink: /pages/27f588/
categories: 
  - Python
tags: 
  - null
article: true
---
# python3 - mysql 数据存储性能测试

## 要求

- 一亿数据 10*8
- 测试用 5w 数据
- 预测时间为 结果时间* 2000

---

## 设计思路

- 程序执行 20 遍求平均值
- 结束时间 - 开始时间
- 不同 python 引擎
- 不同数据量 然后 commit 提交 响应速度

---

## 数据库连接工具

- [x] MySQL-Python
- [x] pymysql
- [X ] MySQL-Connector

---

## 代码

```python
    #!/usr/bin/python3    
# encoding: utf-8     
# @Time    : 2018/7/14 0014 16:12    
# @author  : zza    
# @Email   : 740713651@qq.com    
import time    
    
from flask import Flask    
from flask_sqlalchemy import SQLAlchemy    
    
db = SQLAlchemy()    
    
class Student(db.Model):    
    __tablename__ = "stu"    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=True)    
    name_ = db.Column(db.String(127))    
    age = db.Column(db.Integer)    
    class_num = db.Column(db.Integer)    
    
def init(param):    
    class sqlalchemy(SQLAlchemy):    
    
        def __del__(self):    
            print("数据库关闭")    
            db.session.close_all()    
    
    app = Flask(__name__)    
    app.config['SQLALCHEMY_DATABASE_URI'] = param + "?charset=utf8&autocommit=False"    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True    
    app.config['SQLALCHEMY_POOL_SIZE'] = 128    
    app.config['SQLALCHEMY_POOL_TIMEOUT'] = 60    
    app.config['SQLALCHEMY_POOL_RECYCLE'] = 30    
    app.config['SQLALCHEMY_MAX_OVERFLOW'] = 128    
    # app.config['SQLALCHEMY_ECHO'] = True    
    global db    
    db = sqlalchemy(app)    
    
def finish():    
    db.session.query(Student).delete()    
    db.session.commit()    
    
def time_me(fn):    
    def _wrapper(*args, **kwargs):    
        average = 0    
        i1 = 30    
        seconds = 0    
        for i in range(i1):    
            start = time.time()    
            fn(*args, **kwargs)    
            seconds = time.time() - start    
            average += seconds    
        finish()    
        print(u"{func}函数写入耗时{sec}秒".format(func=fn.__name__, sec=seconds))    
        # print(u"{func}函数每{count}条数数据写入耗时{sec}秒".format(func=fn.__name__, count=args[0], sec=seconds))    
        # finish()    
        return seconds, args    
    
    return _wrapper    
    
@time_me    
def insert_many():    
    # 插入诗句    
    all = 5 * 10 ** 4    
    inner = 1000    
    out = int(all / inner)    
    for i in range(out):    
        for c in range(inner):    
            db.session.add(Student(name_='test mysql insert', age=30, class_num=30))    
        db.session.commit()    
    
######    
@time_me    
def insert_many_by_sql():    
    all = 5 * 10 ** 4    
    inner = 1000    
    out = int(all / inner)    
    with db.session.connection() as con:    
        for i in range(out):    
            for c in range(inner):    
                con.execute(    
                    "INSERT INTO stu ( id ,name_, age, class_num) VALUES (null ,{}, {},{})".format(    
                        "'test2mysql3insert'",    
                        30, 30))    
        db.session.commit()    
    
def main2():    
    """测试 sql 语句与 orm 框架 谁快  包括数据组装"""    
    init("mysql+pymysql://root:root@192.168.14.147:3306/efficiency_test")    
    print("orm 框架插入数据")    
    # iinsert_many 函数每 500 条数数据写入耗时 19.671629905700684 秒    
    insert_many()    
    print("sql 语句插入数据")    
    # insert_many_by_sql 函数每 500 条数数据写入耗时 17.977628707885742 秒    
    insert_many_by_sql()    
    pass    
    
def main():    
    print('测试开始')    
    # insert_many 函数写入耗时 168.07286262512207 秒    
    init("mysql+mysqlconnector://root:root@192.168.14.147:3306/efficiency_test")    
    insert_many()    
    
    # insert_many 函数写入耗时 64.85304117202759 秒    
    init("mysql://root:root@192.168.14.147:3306/efficiency_test")  # 默认使用 MySQLdb    
    insert_many()    
    
    # insert_many 函数写入耗时 64.692676067352295 秒    
    init("mysql+pymysql://root:root@192.168.14.147:3306/efficiency_test")    
    insert_many()    
    
    # insert_many 函数写入耗时 66.991496086120605 秒    
    init("mysql+mysqldb://root:root@192.168.14.147:3306/efficiency_test")    
    insert_many()    
    
if __name__ == '__main__':    
    main()    
    main2()    
    
```
