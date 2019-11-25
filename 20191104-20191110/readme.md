##  React Concurrent Mode
[官方文档](https://zh-hans.reactjs.org/docs/concurrent-mode-intro.html)

1. what is concurrent mode
>Concurrent Mode is a set of new features that help React apps stay responsive and gracefully adjust to the user’s device capabilities and network speed.

并发模式是一组新功能，可帮助React应用程序保持响应状态并适当调整用户的设备功能和网络速度。

2. features
>* For CPU-bound updates (such as creating DOM nodes and running component code), concurrency means that a more urgent update can “interrupt” rendering that has already started.
>* For IO-bound updates (such as fetching code or data from the network), concurrency means that React can start rendering in memory even before all the data arrives, and skip showing jarring empty loading states.

个人简单理解：
* dom的渲染进程可以被打断
* i/o绑定更新的时候，可以在内存中先完成渲染。