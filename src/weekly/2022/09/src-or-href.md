### src 属性和 href 属性的区别？

1. 要了解 src 和 href 属性的区别，我们先来看一下他们的使用：

```
// 样式资源的引用
<link rel="styleSheet" href="xxx.css" type="text/css" />
<link rel="preload" href="style.css" as="style" />
// 加载js
<link rel="preload" href="main.js" as="script" />

// a 链接
<a href="xxx.com"  />
//

// script
<script src="xxx.js" type="text/javascript" defer crossorigin/>

// 图片
<img src='xxx.png' alt='png' loading='lazy' srcset="xxx-200px.png 1x,xxx-400px.png 2x"/>
```

2. 定义与区别：

- href (Hypertext Reference) 超文本引用 href 这个属性指定被链接资源的 URL。从而定义当前元素（如锚点 a）或当前文档（如链接）与目标锚点或目标资源之间的联系。

- src (Source)这个属性定义引用外部脚本的 URI，这可以用来代替直接在文档中嵌入脚本。

所以由上，简单概括：src 用于替代这个元素，而 href 用于建立这个标签与外部资源之间的关系。

3. 涉及浏览器解析

- 当浏览器遇到 link 标签时，对于其 href 的 URL，浏览器会并行加载该资源，Html 的解析和渲染不会被阻塞；（ps:不同于在 style 标签里面的内置样式，用@import 添加的样式,@import 的加载会等 Html 解析后再执行加载，可能会导致页面因重新渲染而闪烁）；
- 当浏览器遇到 Script 标签时，对于其 src 的资源，浏览器会直接暂停当下的解析工作，优先处理该资源的下载和执行；(对于未设置 defer 和 async 属性；)因此这也是建议 Script 标签放在底部的原因之一；

> Link 标签: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
> Script 标签: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
