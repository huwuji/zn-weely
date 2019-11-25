##  React Fiber
来源： [这可能是最通俗的 React Fiber(时间分片) 打开方式](https://juejin.im/post/5dadc6045188255a270a0f85#comment)

涉及拓展：
* [VUE：今年Vue Conf 尤雨溪的演讲](https://www.yuque.com/vueconf/2019/gwn1z0)
* [《「前端进阶」高性能渲染十万条数据(时间分片)》](https://juejin.im/post/5d76f469f265da039a28aff7#heading-1)
* [司徒正美《React Fiber架构》](https://zhuanlan.zhihu.com/p/37095662)
* [你应该知道的requestIdleCallback](https://juejin.im/post/5ad71f39f265da239f07e862)
* [《从Preact中了解React组件和hooks基本原理》](https://juejin.im/post/5cfa29e151882539c33e4f5e)
* [《自己写个React渲染器: 以 Remax 为例(用React写小程序)》](https://juejin.im/post/5d8395646fb9a06ad16faa57)
* [React Fiber](https://juejin.im/post/5ab7b3a2f265da2378403e57)

本文简要：
1. 先从操作系统层面，讲了操作系统的几种单处理器进程调度策略。
    简单提两个： 最高响应比优先(HRRN)和反馈法
    
>原文提到：最高响应比优先(HRRN)：为了解决长进程饥饿问题，同时提高进程的响应速率。还有一种最高响应比优先的策略，首先了解什么是响应比:
响应比 = （等待执行时间 + 进程执行时间） / 进程执行时间
复制代码这种策略会选择响应比最高的进程优先执行：
对于短进程来说，因为执行时间很短，分母很小，所以响应比比较高，会被优先执行
对于长进程来说，执行时间长，一开始响应比小，但是随着等待时间增长，它的优先级会越来越高，最终可以被执行

有兴趣的可以去研究一下 Linux 相关的进程调度算法，这方面的资料也非常多, 例如[《Linux进程调度策略的发展和演变》](https://blog.csdn.net/gatieme/article/details/51456569)


2. 类比浏览器JavaScript执行环境；

>Javascript 引擎是单线程运行的。 严格来说，Javascript 引擎和页面渲染引擎在同一个渲染线程，GUI 渲染和 Javascript执行 两者是互斥的. 另外异步 I/O 操作底层实际上可能是多线程的在驱动。

>js-->style-->layout-->paint-->composite

>todo:这里需要补充下浏览器的一些相关进程
浏览器在一帧内可能会做执行下列任务，而且它们的执行顺序基本是固定的:
* 处理用户输入事件
* Javascript执行
* requestAnimation 调用
* 布局 Layout
* 绘制 Paint
* 其他情况： 上面说理想的一帧时间是 16ms (1000ms / 60)，如果浏览器处理完上述的任务(布局和绘制之后)，还有盈余时间，浏览器就会调用 [requestIdleCallback](https://juejin.im/post/5ad71f39f265da239f07e862) 的回调


那在浏览器环境下的js执行也是事情也是需要一件件来做的。如果有某件任务长期占用来Cpu,那后面的任务也就一直不会执行；某个js任务一直在执行，GUI没法渲染，用户的输入事件没法被响应，浏览器会呈现卡死的状态，这样的用户体验就会非常差。

那怎么去做个事情呢？

如原文所说：

对于’前端框架‘来说，解决这种问题有三个方向:
* 优化每个任务，让它有多快就多快。挤压CPU运算量
* 快速响应用户，让用户觉得够快，不能阻塞用户的交互
* 尝试 Worker 多线程

>!!!Vue 选择的是第1️⃣, 因为对于Vue来说，使用模板让它有了很多优化的空间，配合响应式机制可以让Vue可以精确地进行节点更新, 读者可以去看一下[今年Vue Conf 尤雨溪的演讲](https://www.yuque.com/vueconf/2019/gwn1z0)，非常棒!；而 React 选择了2️⃣ 。对于Worker 多线程渲染方案也有人尝试，要保证状态和视图的一致性相当麻烦。


 #### *3. react 选择的是第二个方式：这就引出了fiber框架呢？*

简单说明原因：

在没有filer前，当某个事件触发dom改变后， React 会递归比对VirtualDOM树，找出需要变动的节点，然后同步更新它们, 一气呵成，也就是不可中断。这个过程 React 称为 Reconcilation(中文可以译为协调).
在 Reconcilation 期间，React 会霸占着浏览器资源，一则会导致用户触发的事件得不到响应, 二则会导致掉帧，用户可以感知到这些卡顿。

一句话就是新dom树的构建过程不能被中断。这个过程会一直霸占浏览器资源（处理进程），如果时间常，新的事件得不到响应，而且导致掉帧（绘制‘不连续’），造成卡顿。

Fiber框架做了什么事情呢？
>React 通过Fiber 架构，让自己的Reconcilation 过程变成可被中断。 '适时'地让出CPU执行权，除了可以让浏览器及时地响应用户的交互，还有其他好处:
* 与其一次性操作大量 DOM 节点相比, 分批延时对DOM进行操作，可以得到更好的用户体验。这个在[《「前端进阶」高性能渲染十万条数据(时间分片)》](https://juejin.im/post/5d76f469f265da039a28aff7#heading-1)以及司徒正美的《React Fiber架构》 都做了相关实验
* 司徒正美在[《React Fiber架构》](https://zhuanlan.zhihu.com/p/37095662) 也提到：🔴给浏览器一点喘息的机会，他会对代码进行编译优化（JIT）及进行热代码优化，或者对reflow进行修正.

简单理解下重点： *过程可中断* *调度*

那具体怎么去调度，怎么去实现可中断和中断恢复情况呢？

*再简单理解下Fiber是什么?*
* 协程、或者纤程 ---程序逻辑，控制逻辑（类操作系统的进程调度逻辑）
* 纤维  ---数据结构，执行单元


#### 4.React 的Fiber改造：
*再来看下react对fiber做了哪些主要的改造：*

* 1.数据结构的调整 ---- 调用栈->链表
>todo:对比栈和链表数据结构理解：只不过这种依赖于调用栈的方式不能随意中断、也很难被恢复, 不利于异步处理。 这种调用栈，不是程序所能控制的， 如果你要恢复递归现场，可能需要从头开始, 恢复到之前的调用栈。

* 2.两个阶段的拆分
每次渲染有两个阶段：Reconciliation(协调阶段) 和 Commit(提交阶段).

简单来说：协调阶段主要是负责对比旧树生成新树，不处理副作用，不操作真实dom，可以中断。
提交阶段处理各种副作用，更改真实dom，副作用很难把控，而且可能有的已经呈现在页面上，所有不允许中断。


>[《自己写个React渲染器: 以 Remax 为例(用React写小程序)》](https://juejin.im/post/5d8395646fb9a06ad16faa57)

> 如果你现在使用最新的 React 版本(v16), 使用 Chrome 的 Performance 工具，可以很清晰地看到每次渲染有两个阶段：Reconciliation(协调阶段) 和 Commit(提交阶段).

>除了Fiber 工作单元的拆分，两阶段的拆分也是一个非常重要的改造，在此之前都是一边Diff一边提交的。先来看看这两者的区别:


1. 协调阶段: 可以认为是 Diff 阶段, 这个阶段可以被中断, 这个阶段会找出所有节点变更，例如节点新增、删除、属性变更等等, 这些变更React 称之为'副作用(Effect)' . 以下生命周期钩子会在协调阶段被调用：

* constructor
* componentWillMount 废弃
* componentWillReceiveProps 废弃
* static getDerivedStateFromProps
* shouldComponentUpdate
* componentWillUpdate 废弃
* render

2. 提交阶段: 将上一个阶段计算出来的需要处理的**副作用(Effects)**一次性执行了。这个阶段必须同步执行，不能被打断. 这些生命周期钩子在提交阶段被执行:

* getSnapshotBeforeUpdate() 严格来说，这个是在进入 commit 阶段前调用
* componentDidMount
* componentDidUpdate
* componentWillUnmount

>也就是说，在协调阶段如果时间片用完，React就会选择让出控制权。因为协调阶段执行的工作不会导致任何用户可见的变更，所以在这个阶段让出控制权不会有什么问题。
需要注意的是：因为协调阶段可能被中断、恢复，甚至重做，⚠️React 协调阶段的生命周期钩子可能会被调用多次!, 例如 componentWillMount 可能会被调用两次。
因此建议 协调阶段的生命周期钩子不要包含副作用. 索性 React 就废弃了这部分可能包含副作用的生命周期方法，例如componentWillMount、componentWillUpdate. v17后我们就不能再用它们了, 所以现有的应用应该尽快迁移.

>现在你应该知道为什么'提交阶段'必须同步执行，不能中断的吧？ 因为我们要正确地处理各种副作用，包括DOM变更、还有你在componentDidMount中发起的异步请求、useEffect 中定义的副作用... 因为有副作用，所以必须保证按照次序只调用一次，况且会有用户可以察觉到的变更, 不容差池。

* 3.Reconcilation改造结构：（diff）思路和 Fiber 重构之前差别不大, 只不过这里不会再递归去比对、而且不会马上提交变更。改造了这个对象的结构和属性.

*一下是Fiber的结构:*
```
interface Fiber {
  /**
   * ⚛️ 节点的类型信息
   */
  // 标记 Fiber 类型, 例如函数组件、类组件、宿主组件
  tag: WorkTag,
  // 节点元素类型, 是具体的类组件、函数组件、宿主组件(字符串)
  type: any,

  /**
   * ⚛️ 结构信息
   */ 
  return: Fiber | null,
  child: Fiber | null,
  sibling: Fiber | null,
  // 子节点的唯一键, 即我们渲染列表传入的key属性
  key: null | string,

  /**
   * ⚛️ 节点的状态
   */
  // 节点实例(状态)：
  //        对于宿主组件，这里保存宿主组件的实例, 例如DOM节点。
  //        对于类组件来说，这里保存类组件的实例
  //        对于函数组件说，这里为空，因为函数组件没有实例
  stateNode: any,
  // 新的、待处理的props
  pendingProps: any,
  // 上一次渲染的props
  memoizedProps: any, // The props used to create the output.
  // 上一次渲染的组件状态
  memoizedState: any,


  /**
   * ⚛️ 副作用
   */
  // 当前节点的副作用类型，例如节点更新、删除、移动
  effectTag: SideEffectTag,
  // 和节点关系一样，React 同样使用链表来将所有有副作用的Fiber连接起来
  nextEffect: Fiber | null,

  /**
   * ⚛️ 替身
   * 指向旧树中的节点
   */
  alternate: Fiber | null,
}

```

* 4.双缓冲:
简单理解：react会先构建一个WIP树，对于react就是一个缓冲，然后先在内存渲染，在到浏览器绘制。犹如git的分支管理，先在分支上，在合并到主干。

>WIP 树构建这种技术类似于图形化领域的'双缓存(Double Buffering)'技术, 图形绘制引擎一般会使用双缓冲技术，先将图片绘制到一个缓冲区，再一次性传递给屏幕进行显示，这样可以防止屏幕抖动，优化渲染性能。
放到React 中，*WIP树就是一个缓冲*，它在Reconciliation 完毕后一次性提交给浏览器进行渲染。它可以减少内存分配和垃圾回收，WIP 的节点不完全是新的，比如某颗子树不需要变动，React会克隆复用旧树中的子树。
双缓存技术还有另外一个重要的场景就是异常的处理，比如当一个节点抛出异常，仍然可以继续沿用旧树的节点，避免整棵树挂掉。
Dan 在 Beyond React 16 演讲中用了一个非常恰当的比喻，那就是Git 功能分支，你可以将 WIP 树想象成从旧树中 Fork 出来的功能分支，你在这新分支中添加或移除特性，即使是操作失误也不会影响旧的分支。当你这个分支经过了测试和完善，就可以合并到旧分支，将其替换掉. 这或许就是’提交(commit)阶段‘的提交一词的来源吧？:

* 5. 副作用的收集和提交

#### 未展开部分，
怎么去中断和恢复
todo：个人觉得还是应该先从数据结构中分析