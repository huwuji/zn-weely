### EventEmitter 
参考mdn:
1. 如何创建和分派DOM事件。这些事件通常称为合成事件，而不是浏览器本身触发的事件。
1)创建自定义事件：
    1.1）利用Events创建自定义事件：
    ```
    const elem=document.getElementsByTagName('body')[0];//或者其他的事件对象
    const event=new Event('test');
    elem.addEventListener('test',function(){console.log('目前处理test 事件')},false);

    const divelem=document.getElementsByTagName('div')[0];
    divelem.addEventListener('test',function(){console.log('divelem目前处理test 事件')},false);

    //在合适的时机test触发，
    elem.dispatchEvent(event);
    divelem.dispatchEvent(event);

    ```
    1.2)利用CustomEvent创建一个;CustomEvent<https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent>
    ```
    const elem=document.getElementsByTagName('body')[0];//或者其他的事件对象
    const event = new CustomEvent('test', { 'detail': 'customInfo',bubbles: true, });//默认target属性，
    elem.addEventListener('test',function(e){console.log(`${e.target.tagName}目前处理test 事件`)},false);

    const divelem=document.getElementsByTagName('div')[0];
    divelem.addEventListener('test',function(e){console.log(`${e.detail}目前处理test 事件`)},false);

    //在合适的时机test触发，
    elem.dispatchEvent(event);
    divelem.dispatchEvent(event);
    ```

    1.3)creatEvent创建一个事件
    ```
    const elem=document.getElementsByTagName('body')[0];//或者其他的事件对象
    const event=document.createEvent('test');
    event.initEvent('test',true,true);

    elem.addEventListener('test',function(e){},false);
    elem.dispatchEvent(event);

    ```

    2）触发内置事件<https://media.prod.mdn.mozit.cloud/samples/domref/dispatchEvent.html>
    ```
    function simulateClick() {
    var event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
    });
    var cb = document.getElementById('checkbox');
    var cancelled = !cb.dispatchEvent(event);
    if (cancelled) {
        // A handler called preventDefault.
        alert("cancelled");
    } else {
        // None of the handlers called preventDefault.
        alert("not cancelled");
    }
    }

    
    ```

2. EventTarget
EventTarget 是一个 DOM 接口，由可以接收事件、并且可以创建侦听器的对象实现。

Element，document 和 window 是最常见的 event targets ，但是其他对象也可以作为 event targets，比如 XMLHttpRequest，AudioNode，AudioContext  等等。

许多 event targets （包括 elements， documents 和 windows）支持通过 onevent 特性和属性设置事件处理程序 (event handlers)。

如何实现一个简单的EventTarget
```
```



参考链接：
https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Creating_and_triggering_events
https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent
https://developer.mozilla.org/zh-CN/docs/Web/API/Event
https://media.prod.mdn.mozit.cloud/samples/domref/dispatchEvent.html