puppeteer 可以做什么？
官网

Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run full (non-headless) Chrome or Chromium.

一个 node 库,提供 high-level API,用 DevTools Protocol 的方式控制 chrome/chromium,默认运行在 headless 环境，
这里有几个问题 DevTools Protocol？headless？

evTools Protocol
headless
提供 high-level API 意味着什么？
很简单，我们可以直接通过代码调用 API 完成对 chrome 的操作。所以进一步，意味着我们可以自动化的控制 chrome。
然后呢？自动化控制，那对于基于页面做的测试是不是可以尝试自动化测试？UI 自动化？

其他功能：
生成图片，PDF;
模拟浏览器发送请求；
捕获网站的 timeline trace 等，用来帮助分析性能问题。
其他；

注意点：

获取 webSocketDebuggerUrl
第一步，# for mac
sudo /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
对于调试安卓
adb forward tcp:9222 localabstract:chrome_devtools_remote
第二部，在浏览器中请求地址：<http://localhost:9222/json/version> ,获得到 webSocketDebuggerUrl 参数。
第三步. const browser = await puppeteer.connect({
browserWSEndpoint: webSocketDebuggerUrl
});

参考：
<https://juejin.cn/post/6984685772632752164>

拓展

chrome devtool protocol. <https://chromedevtools.github.io/devtools-protocol/>

browser endpoint. <https://chromedevtools.github.io/devtools-protocol/#how-do-i-access-the-browser-target>
