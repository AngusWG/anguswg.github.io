---
title: 解决 Flask-SQLAlchemy 2006 MySQL server has gone away 问题
date: 2021-04-19 11:04:53
permalink: /pages/f23090/
categories: 
  - Python
tags: 
  - null
article: true
---
# 解决 Flask-SQLAlchemy 2006 MySQL server has gone away 问题  

## 配置信息

- python3 3.6
- Flask-SQLAlchemy 2.3.2
- win10

## 报错

```text
-----> [2018-07-16 17:22:42,041] [ERROR] [base.py<131>-base.run_job]: Job "auto_rollback.<locals>.wrapper (trigger: interval[0:30:00], next run at: 2018-07-16 17:52:42 CST)" raised an exception    
Traceback (most recent call last):    
  File "/usr/local/lib/python3.6/site-packages/sqlalchemy/engine/base.py", line 1193, in _execute_context    
    context)    
  File "/usr/local/lib/python3.6/site-packages/sqlalchemy/engine/default.py", line 507, in do_execute    
    cursor.execute(statement, parameters)    
  File "/usr/local/lib/python3.6/site-packages/MySQLdb/cursors.py", line 250, in execute    
    self.errorhandler(self, exc, value)    
  File "/usr/local/lib/python3.6/site-packages/MySQLdb/connections.py", line 50, in defaulterrorhandler    
    raise errorvalue    
  File "/usr/local/lib/python3.6/site-packages/MySQLdb/cursors.py", line 247, in execute    
    res = self._query(query)    
  File "/usr/local/lib/python3.6/site-packages/MySQLdb/cursors.py", line 411, in _query    
    rowcount = self._do_query(q)    
  File "/usr/local/lib/python3.6/site-packages/MySQLdb/cursors.py", line 374, in _do_query    
    db.query(q)    
  File "/usr/local/lib/python3.6/site-packages/MySQLdb/connections.py", line 277, in query    
    _mysql.connection.query(self, query)    
_mysql_exceptions.OperationalError: (2006, 'MySQL server has gone away')    
    
The above exception was the direct cause of the following exception:    
    
Traceback (most recent call last):    
  File "/usr/local/lib/python3.6/site-packages/apscheduler/executors/base.py", line 125, in run_job    
    retval = job.func(*job.args, **job.kwargs)    
  File "/home/zza/eth_crawler/crawler_script/utils.py", line 28, in wrapper    
    raise err    
  File "/home/zza/eth_crawler/crawler_script/utils.py", line 24, in wrapper    
    return func(*args, **kwargs)    
  File "/home/zza/eth_crawler/crawler_script/token_tracker.py", line 240, in update    
    db_address = db.session.query(Token.contract_address).filter(None == Token.total_supply).all()    
  File "/usr/local/lib/python3.6/site-packages/sqlalchemy/orm/query.py", line 2773, in all    
    return list(self)    
  File "/usr/local/lib/python3.6/site-packages/sqlalchemy/orm/query.py", line 2925, in __iter__    
    return self._execute_and_instances(context)    
  File "/usr/local/lib/python3.6/site-packages/sqlalchemy/orm/query.py", line 2948, in _execute_and_instances    
    result = conn.execute(querycontext.statement, self._params)    
  File "/usr/local/lib/python3.6/site-packages/sqlalchemy/engine/base.py", line 948, in execute    
    return meth(self, multiparams, params)    
  File "/usr/local/lib/python3.6/site-packages/sqlalchemy/sql/elements.py", line 269, in _execute_on_connection    
    return connection._execute_clauseelement(self, multiparams, params)    
  File "/usr/local/lib/python3.6/site-packages/sqlalchemy/engine/base.py", line 1060, in _execute_clauseelement    
    compiled_sql, distilled_params    
  File "/usr/local/lib/python3.6/site-packages/sqlalchemy/engine/base.py", line 1200, in _execute_context    
    context)    
  File "/usr/local/lib/python3.6/site-packages/sqlalchemy/engine/base.py", line 1413, in _handle_dbapi_exception    
    exc_info    
  File "/usr/local/lib/python3.6/site-packages/sqlalchemy/util/compat.py", line 203, in raise_from_cause    
    reraise(type(exception), exception, tb=exc_tb, cause=cause)    
  File "/usr/local/lib/python3.6/site-packages/sqlalchemy/util/compat.py", line 186, in reraise    
    raise value.with_traceback(tb)    
  File "/usr/local/lib/python3.6/site-packages/sqlalchemy/engine/base.py", line 1193, in _execute_context    
    context)    
  File "/usr/local/lib/python3.6/site-packages/sqlalchemy/engine/default.py", line 507, in do_execute    
    cursor.execute(statement, parameters)    
  File "/usr/local/lib/python3.6/site-packages/MySQLdb/cursors.py", line 250, in execute    
    self.errorhandler(self, exc, value)    
  File "/usr/local/lib/python3.6/site-packages/MySQLdb/connections.py", line 50, in defaulterrorhandler    
    raise errorvalue    
  File "/usr/local/lib/python3.6/site-packages/MySQLdb/cursors.py", line 247, in execute    
    res = self._query(query)    
  File "/usr/local/lib/python3.6/site-packages/MySQLdb/cursors.py", line 411, in _query    
    rowcount = self._do_query(q)    
  File "/usr/local/lib/python3.6/site-packages/MySQLdb/cursors.py", line 374, in _do_query    
    db.query(q)    
  File "/usr/local/lib/python3.6/site-packages/MySQLdb/connections.py", line 277, in query    
    _mysql.connection.query(self, query)    
sqlalchemy.exc.OperationalError: (_mysql_exceptions.OperationalError) (2006, 'MySQL server has gone away') [SQL: 'SELECT token.contract_address AS token_contract_address \nFROM token \nWHERE token.total_supply IS NULL'] (Background on this error at: http://sqlalche.me/e/e3q8)    
```

---

## 已使用解决方案

### 出错后需要 rollback，为了后续程序能运行，给每个涉及 sql 语句的函数用了**装饰器**

```python
def auto_rollback(func):    
    def wrapper(*args, **kwargs):    
        try:    
            return func(*args, **kwargs)    
        except Exception as err:    
            db.session.rollback()    
            log.error(err)    
            raise err    
    
    return wrapper    
```

- **治标不治本系列**

#### 把 SQLALCHEMY_POOL_RECYCLE 设成一个较小的数

```python
app.config['SQLALCHEMY_POOL_SIZE'] = 128  # 线程池大小    
app.config['SQLALCHEMY_POOL_TIMEOUT'] = 90  # 超时时间    
app.config['SQLALCHEMY_POOL_RECYCLE'] = 3  # 空闲连接自动回收时间    
app.config['SQLALCHEMY_MAX_OVERFLOW'] = 128  # 控制在连接池达到最大值后可以创建的连接数。    
```

#### 根据错误日志 在需要用数据库的地方先断开连接

```python
db.session.remove()    
```

- **失败**

#### 将单独的 sql 语句改成 nopool 连接方式

```python
class nullpool_SQLAlchemy(SQLAlchemy):    
    def apply_driver_hacks(self, app, info, options):    
        super(nullpool_SQLAlchemy, self).apply_driver_hacks(app, info, options)    
        from sqlalchemy.pool import NullPool    
        options['poolclass'] = NullPool    
        del options['pool_size']    
```

解决后又会出现

```python
sqlalchemy.exc.InvalidRequestError: Can't reconnect until invalid transaction is rolled back    
```

- **失败**

#### 每次访问数据库重新生成 sqlalchemy 连接 ✔

```python
    from xxx import SQLAlchemy    
    from xxx import app    
    db = SQLAlchemy(app)    
```

最粗暴但是最有效的解决方式，这个问题困扰了将近 3 周，emmm
![image.png](../images/7485616-cf06c2eabe1f8ca0.png)

---

### 解决参考

- [flask-alchemy mysql gone away 问题 连接重连 程序方向](https://www.douban.com/group/topic/24103570/)
- [MySQL server has gone away 问题的解决方法 mysql 反向](https://www.jb51.net/article/23781.htm)
- [nullpool_SQLAlchemy 代码](https://github.com/jasonlvhit/Science-VS-Romance/blob/dc54f1438d5d8cc59a1d42766831947ac9ca4c30/sae/svsr/.svn/pristine/0f/0f3a8d86965bb1bff275929f29315f4baf3bd7da.svn-base)
- [数据库方向解决问题](http://www.mamicode.com/info-detail-2234822.html)
