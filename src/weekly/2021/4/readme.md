1. [为什么顺序调用对 React Hooks 很重要？](https://overreacted.io/zh-hans/why-do-hooks-rely-on-call-order/)
> 1）钻石问题(多层继承问题)   
> 1.1)依赖于固定的顺序调用很自然的解决了「钻石」问题   
> 1.2)函数调用不会有「钻石」问题，因为它们会形成树状结构

简单来说，hooks处理复用和组件(逻辑)更好的实现解耦。
1) hooks是基于函数，拥有函数的特性和优势。
2）hooks依赖数组实现的顺序调用。保证调用的预期一致性。

2. [我所理解的hooks](https://www.mdeditor.tw/pl/gVeM)
> 用数学函数的方式去理解

3. [解剖postCSS —— 向前端架构师迈出一小步](https://mp.weixin.qq.com/s/P4Uj9g71u5lDzYi9JaMCow)