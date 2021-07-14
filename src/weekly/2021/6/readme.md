1. [写给前端的编译原理科普](https://mp.weixin.qq.com/s/Ck5M7vyMe8_8GNqZtA3e0w)
> 编译，转译，解释   


2. DOM事件：
        DOM事件有两部分：  
        1）事件Event(https://developer.mozilla.org/zh-CN/docs/Web/API/Event)
                dom事件的创建:通过构造器  
                Event();  
                ```
                // 创建一个支持冒泡且不能被取消的look事件
                var ev = new Event("look", {"bubbles":true, "cancelable":false});  

                //document元素对象触发   

                document.dispatchEvent(ev);

                // 事件可以在任何元素触发，不仅仅是document   

                myDiv.dispatchEvent(ev);

                ```

        2) 事件目标 eventTarget（https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget）    
        包括方法：    
        addEventListener ：在EventTarget上注册特定事件类型的事件处理程序。   

        removeEventListener ：EventTarget中删除事件侦听器。

        dispatchEvent ：将事件分派到此EventTarget。（如上myDiv.dispatchEvent使用）


3. [chrome trace](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool) 
> 帮你分析 chrome 内部函数调用的时间分布等信息。
        简单使用方式：   
                1）输入chrome://tracing
                2）点击：左上角Record，选择要监听的对象，再点击Record.
                3）加载或刷新要分析的页面。
                4）点击stop.


4. [从 SWR 开始 — 一窥现代请求 hooks 设计模型](https://mp.weixin.qq.com/s/ZyMyYBd3tItDatZHj0zuoQ)
> 模型设计方向在于提升网络通信的效率。请求不单只是发送事件，还包含相关的数据缓存控制逻辑。

5. [React Hooks 踩坑之-- Capture Value 特性](https://mp.weixin.qq.com/s/eyFKOi3PTux6aTF0s557Rg)
> Each Render Has Its Own Props and State.
> 首先，hooks是函数，再者是维护了一定状态的函数。首先函数执行，每次执行函数a，都有自己的变量。这些变量如果被维护在外层环境中，对应每次函数a的执行。

6. [句柄（handle）是什么](zhihu.com/question/27656256)
> 句柄的英文是 handle。在英文中，有操作、处理、控制之类的意义。作为一个名词时，是指某个中间媒介，通过这个中间媒介可控制、操作某样东西。  

>广义来说，指针也是某种 handle，可以操作对象。但实际语境中，指针跟句柄是有区别的。初次接触到 handle (或者 id)，很多人会有迷惑，为什么要用 handle，而不直接用指针呢？   
1.指针作用太强，可做的事情太多。可做的事情越多，就会越危险。接口设计中，功能刚刚好就够了，并非越多权限越好的。   
2.handle 通常只是个整数，实现被隐藏起来，假如直接暴露了指针，也就暴露了指针类型（有时也可以暴露 void* 指针作为某种 handle）。用户看到越多细节，其代码就越有可能依赖这些细节。将来情况有变，但又要兼容用户代码，库内部改起来就更麻烦。   
3.资源在内部管理，通过 handle 作为中间层，可以有效判断 handle 是否合法，也可以通过权限检查防止某种危险操作。  
4.handle 通常只是个整数，所有的语言都有整数这种类型，但并非所有语言都有指针。接口只出现整数，方便同一实现绑定到各种语言。

7. [做了这个活动，感觉自己成了垂直排版大师](https://mp.weixin.qq.com/s/d2YZ2K02LYYRVld_VTCV-Q)
> 快文，记住
        writing-mode:vertical-rl;(从右到左竖排)
        text-orientation:upright;(直立向上)
        text-combine-upright:all;
对于css属性是慢慢积累的过程。


8. [getComputedStyle](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)
>let style = window.getComputedStyle(element, [pseudoElt]);
Window.getComputedStyle()方法返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有CSS属性的值;
注意是计算后的值，不同于dom.style（元素上的样式属性值）
