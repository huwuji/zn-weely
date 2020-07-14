1. webview

2. jsbridge：（webview UI）方案


原理：基于 iframe 修改 src 值，NA 可以捕获 url 变化，根据 url 变化，判断 H5 的意图，大体通信过程如下图所示；  

在启动 App 时，App 会在 webview 中执行一个 js 文件，这个文件在 NA 与 H5 中间建立了一个桥梁，NA 与 H5 基于这个桥梁通信，这个 js 文件的作用如下图所示；具体的 js 文件见JsBridge

具体步骤：
1）创建一个隐藏的iframe，iframe 的作用是在 H5 与 NA 通信时，会修改 iframe 的 src 值，src的变化会触发 shouldOverriderUrlLoading 方法，这个方法的第二个参数为 src 值，方法内解析 src 值判断 H5 的意图；
2）在 webview 中的 window 上挂载 JsBridge 对象，这个对象中包含了一些方法：
H5 调用 NA 的方法，参数：事件名称、参数、回调函数
callHandler 方法会修改 iframe 的 src 值，NA 捕获到 src 变化，解析 src，判断 H5 意图；
根据数据和事件，NA 做相应的处理，处理完成后，调用回调函数，同时把想回传给 H5 的数据作为回调函数的参数传递；
注册方法，在 NA 状态变化时执行，参数：方法名，回调函数
registerHandler 会将方法名对应的回调函数挂载在messageHandlers，即messageHandlers[methodname] = callback;
NA 状态发生变化，想通知 H5，则调用相应的挂载在 messageHandlers 上的方法；
registerHandler方法
callHandler方法