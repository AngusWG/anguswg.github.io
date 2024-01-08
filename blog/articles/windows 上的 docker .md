---
title: windows 上的 docker
date: 2021-04-19 11:04:53
permalink: /pages/6d366b/
categories: 
  - 编程
tags: 
  - null
article: true
---
# windows 上的 docker  

# 安装

[下载地址](https://hub.docker.com/editions/community/docker-ce-desktop-windows/?tab=resources)

- 我的 windows 上装了 wsl2
- 默认点下一步就好了

![image.png](../images/7485616-e6be56edc31b47f6.png)

安装完成后顺手设置 P...

![image.png](../images/7485616-f8095686ba1d903e.png)

`ps. wsl telnet 127.0.0.1 9999 失败  我改成了本机 ip`

非常的智能。

---

# 试玩

在 docker 网站上下个 [python 镜像](https://hub.docker.com/_/python) 玩玩

> docker pull python:3.8

![image.png](../images/7485616-2d884b0a03fd2448.png)

``` bash
docker run --name docker-tutorial python:3.8 python -c "print('Hello, World!')"    
docker rm docker-tutorial    
docker run --name docker-tutorial python:3.8 python -c "import os;print(os.listdir('.'))"  -v $PWD:/usr/src/myapp  -w /usr/src/myapp    
docker rm docker-tutorial    
```

> -v $PWD/myapp:/usr/src/myapp: 将主机中当前目录下的 myapp 挂载到容器的 /usr/src/myapp。
> -w /usr/src/myapp: 指定容器的 /usr/src/myapp 目录为工作目录。

![ ](../images/7485616-c66888e2b8d1ba1c.jpg)

---

# 安装 python 环境并保存

``` bash
docker run --name  -it jupyter-dev python:3.8 bash     
pip config set global.index-url https://pypi.douban.com/simple    
pip install jupyter    
exit    
docker ps -a    
docker commit  jupyter-dev jupyter-dev:version1    
docker images    
docker run -d -p 8888:8888 --restart=always  --name jupyter jupyter-dev:version1 jupyter-notebook --ip='*' --port=8888 --allow-root --no-browser --NotebookApp.token=''    
```

![image.png](../images/7485616-494b1233e42d0103.png)

![image.png](../images/7485616-ef4624f5892a65a0.png)

> 关闭
>
> ``` bash
> docker stop jupyter    
> docker rm jupyter    
> ```

![](../images/7485616-b3cb40f41332fcf2.jpg)

---

# pycharm

- 找不到 [docker-machine](https://www.jianshu.com/p/f544acd89f78)
- EN-找不到 [docker-machine](https://github.com/docker/machine/releases)
- 建议装在 windows 上

配置 python 解释器

![image.png](../images/7485616-d390f0c4d8843ee9.png)

- 发现并不好用
- [网上教程](https://zhuanlan.zhihu.com/p/52827335) 比较好用

不过已经可以愉快的 debug 了

![image.png](../images/7485616-e3d7fd59808dc6d8.png)

---

# kubectl

> 先装个命令补全
>
> ``` bash
> echo "source <(kubectl completion zsh)" >> ~/.zshrc    
> source ~/.zshrc    
> ```
>
找到你想连接的 kubectl 集群的配置文件
比如我的在服务器上

```bash
rsync -avz root@192.168.20.65:/root/.kube/config /root/.kube/config    
rsync -avz root@192.168.20.65:/root/.minikube/ca.crt /root/.minikube/ca.crt    
rsync -avz root@192.168.20.65:/root/.minikube/profiles/minikube/client.crt /root/.minikube/profiles/minikube/client.crt    
rsync -avz root@192.168.20.65:/root/.minikube/profiles/minikube/client.key /root/.minikube/profiles/minikube/client.key    
```

- 然后`kubectl get pods` 你就会发现都在你本机上看得到了

- 然后就可以获取一个项目的配置文件，然后启动。
  - `kubectl get  pods contest-jiantou-64b9cd5597-kvbjp -o yaml`

![](../images/7485616-814b02711669a9f6.gif)
