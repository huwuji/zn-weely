### optimize website speed

 一。step: 检查站点步骤
1. Audit the site 检查站点，了解站点整体情况
包括： 先了解站点所在chrome的版本，

2. Establish a baseline 建立一个基本的性能认识
利用lighthouse检测网站，建立基本的性能认识

3. lighthouse的使用，这个直接看官网
a. Metrics 主要指标
>FCP （First Contentful Paint） 呈现第一段DOM内容所需时间
Time To Interaction 最早达到可交互的状态的时间点
FMP （First Meaningful Paint）主要内容对用户可见的时间

b. Opportunities 提示：提升页面性能可以尝试优化的主要方向

c. Diagnostics 诊断：有关影响页面加载时间的更多信息提示

二。 Experiment 具体优化实施方案
1. Enable text compression 压缩脚本资源
> 可以通过查看Response Headers的ontent-encoding是否是gzib来判断

> 思考：
脚本（js）压缩的思路或者重点有哪些？
1.抽离，去重：抽离公共方法，去除重复代码
2.替换：a.方法或者字段名称替换，用更简短且唯一的字段去替换长的字段名称.
b.用最终结果来替换大量的中间过程公式。或者说简化公式
...

2. Resize images 压缩图片资源
a.直接压缩图片体积
b.新建不同大小的图片，然后根据srcset属性，让浏览器根据不同的设备去选择不同的图片。如下
```
<img src="photo.png" srcset="photo@2x.png 2x" ...>
//or
 <img src="lighthouse-200.jpg" sizes="50vw"
     srcset="lighthouse-100.jpg 100w, lighthouse-200.jpg 200w,
             lighthouse-400.jpg 400w, lighthouse-800.jpg 800w,
             lighthouse-1000.jpg 1000w, lighthouse-1400.jpg 1400w,
             lighthouse-1800.jpg 1800w" alt="a lighthouse">
```
再根据picture属性来匹配不同的分辨率
```
<picture>
  <source media="(min-width: 800px)" srcset="head.jpg, head-2x.jpg 2x">
  <source media="(min-width: 450px)" srcset="head-small.jpg, head-small-2x.jpg 2x">
  <img src="head-fb.jpg" srcset="head-fb-2x.jpg 2x" alt="a head carved out of wood">
</picture>
```
> !!!上述的关于图片优化更多信息可查看此链接<https://developers.google.com/web/fundamentals/design-and-ux/responsive/images#relative_sized_images>

3. Eliminate render-blocking resources 优化阻塞渲染的资源
a. 找出不需要在页面加载时执行的js或者css代码。
方式1是在coverage中查看。3.通过Command Menu（Command+Shift+P (Mac) or Control+Shift+P (Windows, Linux, Chrome OS)）查看blocking

b. Optimizing the Critical Rendering Path in the real-world优化关键渲染路径
>you can speed up page load by only shipping critical code during the page load, and then lazy-loading everything else.

4. Do less main thread work (减少主西线程的工作)
看fps，cpu,net，谈后看userTimming，如果是react组件，可以从中看到关于具体组件调用栈的调用情况？？？？？