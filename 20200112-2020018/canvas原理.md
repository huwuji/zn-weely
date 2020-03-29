### canvas原理
mdn链接：https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API

！！做过少量h5页面，了解canvas基本原理。

canvas和svg区别：  
参考链接：https://www.zhihu.com/question/19690014  
参考链接：https://docs.microsoft.com/zh-cn/previous-versions/msdn10/Hh377884(v=MSDN.10)  
 
个人简单理解：canvas基于位图，js操作，更像是一种绘图方式。  
sva基于矢量，保真，类似xml操作，更像是一种图片格式。

1. canvas的绘制方式：
 * 通过矩形来绘制
 api:fillRect,clearRect,strokeRect  

canvas提供了三种方法绘制矩形：

```
fillRect(x, y, width, height)
绘制一个填充的矩形
  
strokeRect(x, y, width, height)
绘制一个矩形的边框
   
clearRect(x, y, width, height)
清除指定矩形区域，让清除部分完全透明。
```
上面提供的方法之中每一个都包含了相同的参数。x与y指定了在canvas画布上所绘制的矩形的左上角（相对于原点）的坐标。width和height设置矩形的尺寸。
 * 通过路径来绘制  
图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤。    
    * 首先，你需要创建路径起始点。
    * 然后你使用画图命令去画出路径。
    * 之后你把路径封闭。
    * 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。

基本方法：  
```
beginPath()  
新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。

closePath()
闭合路径之后图形绘制命令又重新指向到上下文中。

stroke()
通过线条来绘制图形轮廓。

fill()
通过填充路径的内容区域生成实心的图形。

moveTo(x, y)
将笔触移动到指定的坐标x以及y上。

lineTo(x, y)
绘制一条从当前位置到指定x以及y位置的直线。

arc(x, y, radius, startAngle, endAngle, anticlockwise)   
画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。

arcTo(x1, y1, x2, y2, radius)  
根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点

rect(x, y, width, height)
绘制一个左上角坐标为（x,y），宽高为width以及height的矩形。

Path2D()
Path2D()会返回一个新初始化的Path2D对象（可能将某一个路径作为变量——创建一个它的副本，或者将一个包含SVG path数据的字符串作为变量）
新的Path2D API有另一个强大的特点，就是使用SVG path data来初始化canvas上的路径。这将使你获取路径时可以以SVG或canvas的方式来重用它们。

```