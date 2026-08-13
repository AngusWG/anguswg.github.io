---
title: selenium bug
date: 2025-05-11 15:54:49
permalink: /pages/73e9c7b7-9d54-4afa-8fbb-df842bc5481c/
tags:
  - 
categories:
  - 编程
article: true
---

# selenium bug

- 使用了默认用户数据文件夹 `user_cookies = os.path.join(os.path.expanduser("~"), r"AppData\Local\Google\Chrome\User Data\Default")`
  - `option.add_argument("--user-data-dir={}".format(user_cookies))`
  - 注销这条就能用
  - 开启就会启动 chrome 但是程序无法控制
  - 过一段时间后报错

- 版本不一样
  - chrome version 136.0.7103.93
  - chromedriver version 136.0.7103.92

- 报错 session not created: probably user data directory is already in use, please specify a unique value for --user-data-dir argument, or don't use --user-data-dir
  - https://github.com/SeleniumHQ/selenium/issues/15724
  - 无解
  - 删除 chrome 和数据文件夹后重装
    - 不能解决

- 报错 session not created: DevToolsActivePort file doesn't exist
  - chromedriver 版本问题
  - https://googlechromelabs.github.io/chrome-for-testing/
  - 无最新版本 chrome
  - 改了一些有的没的 options 参数 不能解决问题

- 猜想可能是 某个程序占用了 `C:\Users\z7407\AppData\Local\Google\Chrome\User Data`
  - handle64.exe -a "C:\YourFolder"
  - 下载 handle [地址](https://learn.microsoft.com/en-us/sysinternals/downloads/handle)
  - 无进程占用

- from webdriver_manager.chrome import ChromeDriverManager
  - 这个是 driver 的版本管理器，不是 chrome 的

- 改成 `C:\Users\z7407\AppData\Local\Google\Chrome\User Data\Default`
  - 等于用了两套配置  User Data 一套
  - Default 一套
  - 也可以将 chrome 默认数据改成 Default
    - --user-data-dir="C:\Users\z7407\AppData\Local\Google\Chrome\User Data\Default"

- 下载一个测试版本的 chrome option.binary_location = r"D:\Downloads\chrome-win64\chrome.exe"
  - [下载地址](https://googlechromelabs.github.io/chrome-for-testing/)
  - 下载后当新版本使用，会删除旧版本的 user datap

- 通过腾讯电脑管家降级试试
  - 能下载包，安装会失败
  - 参考 - [谷歌浏览器安装包无法打开，双击闪退！完美解决](https://blog.csdn.net/qq_44812865/article/details/133788564)
  - 135.0.7049.96

- 查看当前个人资料路径 chrome://version/

## 谷歌浏览器安装包无法打开

### 方案一

- 卸载 chrome 浏览器，删除残留的文件（默认路径是：C:\Program Files (x86)\Google，把它全部删除），然后打开 ChromeSetup.exe 安装。

- 组合键 win+R ，输入 regedit，打开注册表，进到 HKEY_CURRENT_USER\Software\Google\Chrome，并将其删掉，若您的电脑中沒有别的谷歌软件，请点此将全部 Google 删掉，然后就可以安装了。

### 方案二

- 将 txt 文件改为 reg 文件后双击运行

```bash
Windows Registry Editor Version 5.00

; WARNING, this file will remove Google Chrome registry entries  
; from your Windows Registry. Consider backing up your registry before
; using this file: http://support.microsoft.com/kb/322756

; To run this file, save it as 'remove.reg' on your desktop and double-click it.

[-HKEY_LOCAL_MACHINE\SOFTWARE\Classes\ChromeHTML] 
[-HKEY_LOCAL_MACHINE\SOFTWARE\Clients\StartMenuInternet\chrome.exe] 
[HKEY_LOCAL_MACHINE\SOFTWARE\RegisteredApplications]
"Chrome"=-

[-HKEY_CURRENT_USER\SOFTWARE\Classes\ChromeHTML] 
[-HKEY_CURRENT_USER\SOFTWARE\Clients\StartMenuInternet\chrome.exe] 
[HKEY_CURRENT_USER\SOFTWARE\RegisteredApplications]
"Chrome"=-

[-HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Uninstall\Chrome]
[-HKEY_CURRENT_USER\Software\Google\]

[-HKEY_CURRENT_USER\Software\Google\]

[-HKEY_LOCAL_MACHINE\SOFTWARE\Google\]

[-HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Google\]

```

## 启动后没有报错

- chrome driver {'status': [13, 'unknown error'], 'value': ''}

- 将程序的 .env 里的代理关掉
- 或者设置不走代理的部分 dns

```yaml
HTTP_PROXY=http://192.168.31.2:9999
HTTPS_PROXY=http://192.168.31.2:9999
NO_PROXY=localhost,127.0.0.1,192.168.31.0/24
```
