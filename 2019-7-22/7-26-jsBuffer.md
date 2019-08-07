### JS Buffers matter! Sometimes.

### 引用来源: https://medium.com/front-end-weekly/js-buffers-matter-sometimes-56150a35417f

简介：讲了 js buffer 在 web 中和 node 中的使用，以及使用场景和注意问题
buffer在js中的应用：
什么时候该用buffer，什么时候不该用 ------ 纯粹的javascript支持unicode码而对二进制不是很支持，当解决TCP流或者文件流的时候，处理流是有必要的，我们保存非utf-8字符串，2进制等等其他格式的时候，我们就必须得使用 ”Buffer“ 。
