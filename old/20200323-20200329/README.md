1. pwa：Progressive Web App, 简称 PWA，是提升 Web App 的体验的一种新方法，能给用户原生应用的体验。
2. service worker:  
a. 可以创建新的线程，
b. 持久存储数据，提供持久离线缓存能力
如下引用：
```
一个独立的 worker 线程，独立于当前网页进程，有自己独立的 worker context。

一旦被 install，就永远存在，除非被手动 unregister

用到的时候可以直接唤醒，不用的时候自动睡眠

可编程拦截代理请求和返回，缓存文件，缓存的文件可以被网页进程取到（包括网络离线状态）

离线内容开发者可控

能向客户端推送消息

不能直接操作 DOM

必须在 HTTPS 环境下才能工作

异步实现，内部大都是通过 Promise 实现
```

3.  Web Worker:  Web Worker API 的唯一目的就是解放主线程，Web Worker 是脱离在主线程之外的，将一些复杂的耗时的活交给它干，完成后通过 postMessage 方法告诉主线程，而主线程通过 onMessage 方法得到 Web Worker 的结果反馈。

4.  处理用yarn和npm安装依赖时出现ETIMEDOUT问题；  
文件位置： ./fixETIMEDOUT.md  
