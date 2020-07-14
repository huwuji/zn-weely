### 什么是闭包
>https://www.zhihu.com/question/24084277

>摘用一段：
要说 Closure 就得说 Closed Lambda Expression，一个 Closed Lambda Expression 就是没有自由变量的 Lambda Expression，如 λx. x，而 λx. yx 就不是 Closed。Closed Lambda Expression 最好的性质之一就是它的类型必然同构于某个逻辑重言式，如 λx. λy. xy 的类型就是「肯定前件」(α → β) → α → β。那么如何把某个 Open Lambda Expression 给 Enclose 住呢？答案就是把它引用的所有自由变量给保存到什么东西里面，这种保存了自由变量的 Lambda Expression 就是 Closure。在其同构的逻辑一面，则是在相继式左边加入前提。


闭包分两个部分：
   1.环境部分
   2.函数部分或者说表达式部分