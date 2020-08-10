###  Page Lifecycle API
>引用：https://developers.google.com/web/updates/2018/07/page-lifecycle-api


![](./page-lifecycle-api-state-event-flow.png)

整理：status
1. 状态：
1)active:

2)passive:

3)hidden:


4)frozen:

5)discarded:

6)terminated:

2. 事件：events
1)focus:
2)blur:
3)visibilitychange
4)freeze:
5)resume:
6)pageshow:
7)pagehide
8)beforeunload	
9)unload

监听方式：
```
document.addEventListener('resume', (event) => {
  // The page has been unfrozen.
});
```
3.属性   
1)document.visibilityState :
>（只读属性）, 返回document的可见性, 即当前可见元素的上下文环境.值如下:  
    1.'visible' : 此时页面内容至少是部分可见. 即此页面在前景标签页中，并且窗口没有最小化.    
    2. 'hidden' : 此时页面对用户不可见. 即文档处于背景标签页或者窗口处于最小化状态，或者操作系统正处于 '锁屏状态' .    
    3.'prerender' : 页面此时正在渲染中, 因此是不可见的 (considered hidden for purposes of document.hidden). 文档只能从此状态开始，永远不能从其他值变为此状态.注意: 浏览器支持是可选的.    
    4.'unloaded' : 页面从内存中卸载清除. 注意: 浏览器支持是可选的.

2)document.hasFocus()  //true or false

3)document.wasDiscarded  //true or false   


判断当前页面状态啊
```
const getState = () => {
  if (document.visibilityState === 'hidden') {
    return 'hidden';
  }
  if (document.hasFocus()) {
    return 'active';
  }
  return 'passive';
};

```
