---
title: mongodb 排序 根据 _id 插入 测试
date: 2021-04-19 11:04:53
permalink: /pages/86017e/
categories: 
  - 编程
tags: 
  - null
article: true
---
# mongodb 排序 根据 _id 插入 测试

## 需求

- 插入数据
- 在默认排序中   数据显示在中间而不是最后

实验思路：

- 按正常顺序插入 x 条数据
- 拿第一条数据 加字段 id 不变 删除后加入

代码：

```python
#!/usr/bin/python3    
# encoding: utf-8     
# @Time    : 2019/1/3 11:37    
# @Author  : zza    
# @Email   : 740713651@qq.com    
import datetime    
import time    
from pprint import pprint    
    
import pymongo    
from mongomock import ObjectId    
from tqdm import tqdm    
    
mongo_url = "mongodb://127.0.0.1:27017", 'sort_db'    
mongo_db = pymongo.MongoClient(mongo_url[0])[mongo_url[1]]    
    
def made_data():    
    mongo_db['demo'].drop()    
    print("开始造数据")    
    for i in tqdm(range(10)):    
        time.sleep(1)    
        mongo_db['demo'].insert({"timestamp": datetime.datetime.now()})    
    
def set_data():    
    # 之前想造个数据放进去  保存一下 如何生成 _id    
    # http://api.mongodb.com/python/current/api/bson/objectid.html    
    pprint(list(mongo_db['demo'].find()))    
    gen_time = datetime.datetime(2019, 1, 1, 14, 12, 26)    
    dummy_id = ObjectId.from_datetime(gen_time)    
    dummy_id = str(dummy_id)[:8] + "5c2da85ffc904a3c84335788"[8:]    
    dummy_id = ObjectId(dummy_id)    
    print(dummy_id)    
    result = mongo_db['demo'].insert({"_id": dummy_id, "info": "id made by python", "timestamp": gen_time})    
    print(result)    
    pprint(list(mongo_db['demo'].find()))    
    pprint(list(mongo_db['demo'].find({}).sort([("_id", -1)])))    
    
def re_insert_first():    
    a = mongo_db['demo'].find()[0]    
    mongo_db['demo'].delete_one({"_id": a["_id"]})    
    a.update({"info": "change by py"})    
    mongo_db['demo'].insert(a)    
    pprint(list(mongo_db['demo'].find()))    
    
made_data()    
# set_data()    
re_insert_first()    
```

发现还是不行

### 后期的解决方案

- 在**数据量不大的情况下**
- 删除后面的数据
- 然后顺序插入
