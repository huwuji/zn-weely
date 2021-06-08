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


