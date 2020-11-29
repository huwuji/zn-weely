1. [浏览器是如何工作的：Chrome V8 让你更懂JavaScript](https://king-hcj.github.io/2020/10/05/google-v8/)
>简单概要讲述V8的一些原理，js背后执行的方式，以及关联编写js代码时一些注意点。

2. [图片加载失败后CSS样式处理最佳实践](https://www.zhangxinxu.com/wordpress/2020/10/css-style-image-load-fail/)
```
一般的图片加载方式：
<img src="//www.xxxx.com/xx.icon" alt="描述">
1.可以通过监听onerror设置新的属性
<img src="//www.xxxx.com/xx.icon" alt="描述" onerror="this.src='break.svg';">
2. 再配合css提示alt中的信息
<img src="//www.xxxx.com/xx.icon" alt="描述" onerror="this.src='break.svg';this.classList.add('error');">

//css
img.error::after {
  content: attr(alt);//获取alt属性
  position: absolute;
  left: 0; bottom: 0;
  width: 100%;
  line-height: 2;
  background-color: rgba(0,0,0,.5);
  color: white;
  font-size: 12px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

3. [JavaScript Event Loop And Call Stack Explained](https://felixgerschau.com/javascript-event-loop-call-stack)
>有关js在浏览器中执行的原理方式，包括调用栈，数据堆，回调队列，任务队列，事件循环，等。

4. [JavaScript Memory Manage](https://felixgerschau.com/javascript-memory-management/)
> 涉及js在浏览器运行中的堆与栈的存储，以及垃圾回收机制。注一些我们在写js时要注意的东方，比如使用struct mode，赋值null去释放全局变量等；  
But也没有深入讲解。比如垃圾回收之标记清除法的目前实现的方式；
> 看这个更合适  https://v8.dev/blog/trash-talk

5. [不可思议，纯 css 都能图片滚动](https://juejin.cn/post/6895584191073927175)
> 利用到的css 属性：
>1) [scroll-snap-type](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-snap-type)   
>2)[scroll-snap-align](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align)  
>3)[scroll-behavior](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-behavior)

6. [chrome 86 新特性](https://developers.google.com/web/updates/2020/10/nic86)
>重点特性  
>1)提供访问文件系统的api   
>2)提供对原始webHID(human interface devices 人体学接口设备)的调用  
>3)提供对屏时多窗口的调用API   
>4)提供新的css 选择器：:focus-visible && ::marker

7. [chrome 87](https://developers.google.com/web/updates/2020/11/nic87)