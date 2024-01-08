---
title: outlook 垃圾邮件设置
date: 2022-04-25 14:49:46
tags: 
  - 屁大点事
categories: 
  - 随笔
article: true
permalink: /pages/90fc3b/
---
# outlook 垃圾邮件设置

---

根据 https://www.v2ex.com/t/858946?p=1#r_11758561

https://us.flow.microsoft.com
登陆这个，然后新建一个流把收到的邮件放到收件箱就行了。看下面的文章有详细说明步骤。
反正 Outlook 的邮箱过滤功能就是一坨屎。

https://zhuanlan.zhihu.com/p/403170937

虽然最开始会进入垃圾邮箱，过一段时间就会移动到收件箱了。

---

## 搬运知乎原贴

利用Power Automate创建流来把归类到垃圾邮件里面的邮件重新移到收件箱，虽然同样的会错过规则，但至少普通邮件不受影响。

首先打开[Power Automate](https://us.flow.microsoft.com)然后登陆，直接百度就行，国内委托给世纪互联运营所以应该没问题。

![1](https://pic4.zhimg.com/v2-63a84cc7908c302ec2a6a3ac35104a9f_r.jpg)

我的流》新流》自动化云端流

![2](https://pic4.zhimg.com/80/v2-d85351e967c75b472e5c558db1827a9b_1440w.jpg)

流名称选自己喜欢的就好，注意触发器一定要http://outlook.com的新邮件触发器。如果是office 365 outlook的触发器后面会提示说你账号不存在，只有工作账号和学生账号（Exchange）可用。

![3](https://pic3.zhimg.com/80/v2-e176e1d3f7ff55a5ef221a0d94a12af6_1440w.jpg)

文件夹》垃圾邮件》新步骤

![4](https://pic1.zhimg.com/80/v2-be232da34067eefbae6148541d96d030_1440w.jpg)

选择操作》http://outlook.com(和前面一样注意不要选到Office 365 Outlook了)

![5](https://pic4.zhimg.com/80/v2-e9b5e3bdf91273fa4e0e7ff111c7d2cf_1440w.jpg)

搜索“移动”》选择“移动电子邮件”

![6](https://pic4.zhimg.com/80/v2-7a6999a64e88ad890e28ef20acfc1633_1440w.jpg)

点选消息ID文本输入框》选择消息ID

![6](https://pic3.zhimg.com/80/v2-4ce34aff631d8bd264d6014956dc0256_1440w.jpg)

点选文件夹》选择收件箱（或者其它文件夹都可）

![7](https://pic1.zhimg.com/80/v2-a0de80f9ded3bf0534256c421f89658c_1440w.jpg)

点击保存即可

![8](https://pic4.zhimg.com/80/v2-3136906ac6eef95d55406c0c2a6eb367_1440w.jpg)

之后可以拿别的邮箱塞一封垃圾邮件试试。比如下面这种标榜自己就是垃圾邮件的邮件

标题：spam

正文：spamspamspamspamspam

我的情况是先被塞到垃圾邮箱里，过一会就被移出来了。

不想翻垃圾箱的同志们可以试试，上面原文链接里面还有添加筛选的功能，我垃圾邮件不多，广告邮件都建立了规则自动归类所以还OK。

而且这是在新邮件进来的时候才执行，且邮件ID唯一，所以自己移动到垃圾邮件不受影响。

---

~~先说结论：使用 [outLook 网页版](https://outlook.live.com/) 就 ok 了。~~

~~最近因为调试 github action ， 疯狂发报错邮件，导致 outlook 判定 github 为垃圾邮件，全部发到 outlook 垃圾箱里了。~~

~~我用的是 outlook 客户端 (outlook client)。网上已经明确说，客户端设置的是个 [bug](https://answers.microsoft.com/en-us/outlook_com/forum/all/even-though-no-automatic-filtering-is-selected/41ab2a0c-949d-4f45-8624-429c31d17737)，垃圾邮件过滤规则不生效。对客户端已经摆烂了。~~

~~有效方案：完全不使用 outlook 客户端， 用 [网页版 outlook 邮箱](https://outlook.live.com/)。~~

~~在已关闭 outlook 垃圾邮箱 [筛选器](https://outlook.live.com/mail/0/options/mail/junkEmail/filtersOption) 的情况下，就不会默认放进垃圾邮件。~~
~~- 关闭客户端后，担心没有提示的，建议在设置打开 [邮件桌面提醒](https://outlook.live.com/mail/0/options/general/notifications)。~~

~~- 客户端与网页端的主要区别是邮件过滤规则中，`不能开启标记邮件并提示到 Microsoft To Do List`~~

~~结合之前还出了一个 [office 365 网页版本](https://www.office.com/) 的推行。~~

~~看来巨硬已经完全放弃客户端了。~~
