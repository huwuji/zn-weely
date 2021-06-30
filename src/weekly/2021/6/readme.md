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