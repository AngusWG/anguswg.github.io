---
title: python async function debug
date: 2023-04-08 10:05:06
permalink: /pages/c235c0c7-a025-4648-9499-4526641d8159/
tags:
  - 
categories: 
  - Python
article: true
---

# python async function debug

如何在 python 异步函数中 debug

- 参考：[await-an-async-function-in-python-debugger](https://stackoverflow.com/questions/57532678/await-an-async-function-in-python-debugger)

```python

import asyncio
from aredis import StrictRedis
import nest_asyncio

# pip3 install aredis[hiredis]
# pip3 install nest_asyncio

async def example():
    client = StrictRedis(host='127.0.0.1', port=6379, db=0)
    await client.flushdb()
    # error await client.flushdb()
    # error asyncio.get_event_loop().run_until_complete(client.flushdb())
    # error asyncio.new_event_loop().run_until_complete(client.flushdb())
    # error asyncio.run(client.flushdb())

    await client.set('foo', 1)
    assert await client.exists('foo') is True
    await client.incr('foo', 100)

    assert int(await client.get('foo')) == 101
    await client.expire('foo', 1)
    await asyncio.sleep(0.1)
    await client.ttl('foo')
    await asyncio.sleep(1)
    assert not await client.exists('foo')

loop = asyncio.get_event_loop()
# success nest_asyncio.apply()
loop.run_until_complete(example())

```
