## 移动端页面适配 vm和rem

>1.就是开发的时候用的750设计稿的尺寸；单位是px；

2.然后编译工具，如postcss 会自动将px单位转成对应rem和vw单位；

3.如果是vw很好转转行，比如写的40px；40/750 vw就完了；但是存在兼容性问题。

4.如果是rem就多一步罢了；要用js计算出根字体大小，并设置给html；

正常是 375 ，16px;所以比例常数就是 :    屏幕尺寸/750*32 ，也就是html 根字体 大小；

e.g : postcss将40px转化成rem单位； 1rem/(屏幕尺寸/750*32) = x/40

x 就等于 40/(屏幕尺寸/750*32)   rem;

动态改变(屏幕尺寸/750*32) 这个 根字体 就可以动态适应屏幕了！
 然后就是动态计算html根字体的大小。
 方法1是在head中插入一段js代码，可以使用js动态计算，如下：
 ```
 (function() {

    function autoRootFontSize() {

        document.documentElement.style.fontSize =        Math.min(screen.width,document.documentElement.getBoundingClientRect().width)  /  750 * 32 + 'px';

          // 取screen.width和document.documentElement.getBoundingClientRect().width的最小值；除以750，乘以32；懂的起撒，就是原本是750大小的32px;如果屏幕大小变成了375px,那么字体就是16px;也就是根字体fontSize大小和屏幕大小成正比变化！是不是很简单

    }

    window.addEventListener('resize', autoRootFontSize);

    autoRootFontSize();

})();
 ```

 或者直接用vw的方式计算：
 比如32/750=**vw,这样就不用js去计算了

