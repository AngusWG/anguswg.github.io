---
title: python prometheus gunicorn 多进程解决方案
date: 2021-04-19 11:04:53
permalink: /pages/de86ce/
categories: 
  - Python
tags: 
  - null
article: true
---
# python prometheus gunicorn 多进程解决方案  

prometheus 监控 ，用gunicorn启动时。多进程内存不互通导致数据有问题。

## 参考

- [prometheus_client](https://github.com/prometheus/client_python) 官方包，提供prometheus各种接口，其实文档里也写了怎麽处理gunicorn启动问题，我就做个记录。
- [prometheus-multiprocessing-example](https://github.com/jonashaag/prometheus-multiprocessing-example)，gayhub上找的非常好的实例。

## gunicorn启动方案

- 安装prometheus_client `pip install prometheus_client`

- 复制这个文件到你的项目中
`vim monitoring.py`

```python
#!/usr/bin/python3    
# encoding: utf-8    
# @Time    : 2019/8/2 16:29    
# @author  : zza    
# @Email   : 740713651@qq.com    
# @File    : monitoring.py    
"""    
    FROM https://github.com/ITISFoundation/osparc-simcore/blob/3e80ce451352c906f2876113dbb6ae33e8574be1/packages/service-library/src/servicelib/monitoring.py    
    &&  https://github.com/ITISFoundation/osparc-simcore/blob/3e80ce451352c906f2876113dbb6ae33e8574be1/packages/service-library/src/servicelib/monitoring.py    
"""    
import time    
    
from flask import request, current_app, Response    
from prometheus_client import Counter, Histogram    
from prometheus_client import multiprocess    
from prometheus_client import generate_latest, CollectorRegistry, CONTENT_TYPE_LATEST, Gauge    
    
# Example gauge.    
IN_PROGRESS = Gauge("inprogress_requests", "help", multiprocess_mode='livesum')    
    
    
# Expose metrics.    
@IN_PROGRESS.track_inprogress()    
def app(environ, start_response):    
    registry = CollectorRegistry()    
    multiprocess.MultiProcessCollector(registry)    
    data = generate_latest(registry)    
    status = '200 OK'    
    response_headers = [    
        ('Content-type', CONTENT_TYPE_LATEST),    
        ('Content-Length', str(len(data)))    
    ]    
    start_response(status, response_headers)    
    return iter([data])    
    
    
def setup_monitoring(app, app_name=None):    
    if app_name is None:    
        app_name = app.name    
    
    def start_timer():    
        request.start_time = time.time()    
        current_app.extensions["prometheus"]['REQUEST_IN_PROGRESS'].labels(    
            app_name, request.endpoint, request.method).inc()    
    
    def record_request_data(response):    
        resp_time = time.time() - request.start_time    
        endpoint = request.endpoint    
        ext_prometheus = current_app.extensions["prometheus"]    
        ext_prometheus['REQUEST_LATENCY'].labels(app_name, endpoint).observe(resp_time)    
        ext_prometheus['REQUEST_IN_PROGRESS'].labels(app_name, endpoint, request.method).dec()    
        ext_prometheus['REQUEST_COUNT'].labels(app_name, request.method, endpoint, response.status).inc()    
        return response    
    
    app.before_request(start_timer)    
    app.after_request(record_request_data)    
    
    extensions_prometheus = dict()    
    extensions_prometheus['app_name'] = app_name    
    extensions_prometheus['REQUEST_COUNT'] = Counter(    
        'http_requests_total', 'Total Request Count',    
        ['app_name', 'method', 'endpoint', 'http_status']    
    )    
    
    # Latency of a request in seconds    
    extensions_prometheus['REQUEST_LATENCY'] = Histogram(    
        'http_request_latency_seconds', 'Request latency',    
        ['app_name', 'endpoint']    
    )    
    
    extensions_prometheus['REQUEST_IN_PROGRESS'] = Gauge(    
        'http_requests_in_progress_total', 'Requests in progress',    
        ['app_name', 'endpoint', 'method']    
    )    
    
    app.extensions["prometheus"] = extensions_prometheus    
    
    @app.route("/metrics")    
    def metrics():    
        registry = CollectorRegistry()    
        multiprocess.MultiProcessCollector(registry)    
        data = generate_latest(registry)    
        return Response(data, mimetype=CONTENT_TYPE_LATEST)    
    
```

- 在你代码中 导入文件并初始化

``` python3
# from flask import Flask    
# app = Flask(__name__)    
from persistd.monitoring import setup_monitoring    
setup_monitoring(app, "app_name")    
```

- 设置Gunicom配置文件
`vim gunicorn.conf.py`

``` python3
from prometheus_client import multiprocess    
def child_exit(server, worker):    
    multiprocess.mark_process_dead(worker.pid)    
```

- 启动Gunicom时 增加参数指向配置文件
`-c gunicorn.conf.py`

- 设置环境变量：需要一个临时文件夹,且环境变量`prometheus_multiproc_dir`指向该文件夹(`注意启动用户读写权限`),
该文件夹用于存放prometheus数据。

``` bash
rm -rf multiproc-tmp    
mkdir multiproc-tmp    
export prometheus_multiproc_dir=multiproc-tmp    
gunicorn -c gunicorn_conf.py -w 4 yourapp:app    
```

---
附一个 asyncio 的 monitoring.py

``` python
#!/usr/bin/python3    
# encoding: utf-8    
# @Time    : 2019/9/5 16:36    
# @author  : zza    
# @File    : monitoring.py    
"""    
FROM:    
    https://github.com/cloud-cds/cds-stack/blob/4243cd9b2e878f16a251d05afb2d202d71e41dce/api/monitoring.py    
    https://github.com/DD-DeCaF/gene-to-reactions/blob/3af42110433edf8495810e6a95a516368464e179/src/gene_to_reactions/app.py    
    
    setup_monitoring(app, "app_name")    
"""    
import time    
import asyncio    
from aiohttp import web    
from prometheus_client import multiprocess, generate_latest    
from prometheus_client import CONTENT_TYPE_LATEST, CollectorRegistry, Histogram, Counter, Gauge    
    
    
def prom_middleware(app_name):    
    @asyncio.coroutine    
    def factory(app, handler):    
        @asyncio.coroutine    
        def middleware_handler(request):    
            try:    
                request['start_time'] = time.time()    
                request.app['REQUEST_IN_PROGRESS'].labels(    
                    app_name, request.path, request.method).inc()    
                response = yield from handler(request)    
                resp_time = time.time() - request['start_time']    
                request.app['REQUEST_LATENCY'].labels(app_name, request.path).observe(resp_time)    
                request.app['REQUEST_IN_PROGRESS'].labels(app_name, request.path, request.method).dec()    
                request.app['REQUEST_COUNT'].labels(    
                    app_name, request.method, request.path, response.status).inc()    
                return response    
            except Exception as ex:    
                raise    
    
        return middleware_handler    
    
    return factory    
    
    
async def metrics(request):    
    resp = web.Response(body=generate_latest(multiprocess.MultiProcessCollector(CollectorRegistry())))    
    resp.content_type = CONTENT_TYPE_LATEST    
    return resp    
    
    
def setup_monitoring(app, app_name):    
    app['REQUEST_COUNT'] = Counter(    
        'requests_total', 'Total Request Count',    
        ['app_name', 'method', 'endpoint', 'http_status']    
    )    
    app['REQUEST_LATENCY'] = Histogram(    
        'request_latency_seconds', 'Request latency',    
        ['app_name', 'endpoint']    
    )    
    
    app['REQUEST_IN_PROGRESS'] = Gauge(    
        'requests_in_progress_total', 'Requests in progress',    
        ['app_name', 'endpoint', 'method']    
    )    
    
    app.middlewares.insert(0, prom_middleware(app_name))    
    app.router.add_get("/metrics", metrics)    
```
