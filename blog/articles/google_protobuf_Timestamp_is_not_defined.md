---
title: google_protobuf_Timestamp_is_not_defined
date: 2021-04-19 11:04:53
permalink: /pages/384956/
categories: 
  - 编程
tags: 
  - null
article: true
---
# google.protobuf.Timestamp is not defined

> 错误 "google.protobuf.Timestamp" is not defined.

![image.png](../images/7485616-19dc60bff00343c7.png)

本质上就是没找到本机protoc目录下`protoc\include\google\protobuf\timestamp.proto`文件

简单粗暴的将`protoc\include\google`google文件夹拷贝过来就好了

- protoc下载地址https://github.com/protocolbuffers/protobuf/releases/

![image.png](../images/7485616-4e624c88f971136e.png)

当然也可以将google文件夹加到环境变量里 太麻烦不如复制来的爽快

![image.png](../images/7485616-bceb5b6c2b67108b.png)
