### 节流（throttle）与防抖（debounce）
参考：
1. https://segmentfault.com/a/1190000018257074
2. https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf#.ly8uqz8v4
3. https://css-tricks.com/the-difference-between-throttling-and-debouncing/

有些浏览器事件可以在短时间内快速触发多次，比如调整窗口大小或向下滚动页面。例如，监听页面窗口滚动事件，并且用户持续快速地向下滚动页面，那么滚动事件可能在 3 秒内触发数千次，这可能会导致一些严重的性能问题。

如果在面试中讨论构建应用程序，出现滚动、窗口大小调整或按下键等事件请务必提及 防抖(Debouncing) 和 函数节流（Throttling）来提升页面速度和性能。这两兄弟的本质都是以闭包的形式存在。通过对事件对应的回调函数进行包裹、以自由变量的形式缓存时间信息，最后用 setTimeout 来控制事件的触发频率。

Throttle： 第一个人说了算
throttle 的主要思想在于：在某段时间内，不管你触发了多少次回调，都只认第一次，并在计时结束时给予响应。

这个故事里，‘裁判’ 就是我们的节流阀， 他控制参赛者吃东西的时机， “参赛者吃东西”就是我们频繁操作事件而不断涌入的回调任务，它受 “裁判” 的控制,而计时器，就是上文提到的以自由变量形式存在的时间信息，它是 “裁判” 决定是否停止比赛的依据，最后，等待比赛结果就对应到回调函数的执行。

总结下来，所谓的“节流”，是通过在一段时间内无视后来产生的回调请求来实现的。只要 裁判宣布比赛开始，裁判就会开启计时器，在这段时间内，参赛者就尽管不断的吃，谁也无法知道最终结果。

对应到实际的交互上是一样一样的：每当用户触发了一次 scroll 事件，我们就为这个触发操作开启计时器。一段时间内，后续所有的 scroll 事件都会被当作“参赛者吃东西——它们无法触发新的 scroll 回调。直到“一段时间”到了，第一次触发的 scroll 事件对应的回调才会执行，而“一段时间内”触发的后续的 scroll 回调都会被节流阀无视掉。

现在一起实现一个 throttle：

// fn是我们需要包装的事件回调, interval是时间间隔的阈值
function throttle(fn, interval) {
  // last为上一次触发回调的时间
  let last = 0
  
  // 将throttle处理结果当作函数返回
  return function () {
      // 保留调用时的this上下文
      let context = this
      // 保留调用时传入的参数
      let args = arguments
      // 记录本次触发回调的时间
      let now = +new Date()
      
      // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
      if (now - last >= interval) {
      // 如果时间间隔大于我们设定的时间间隔阈值，则执行回调
          last = now;
          fn.apply(context, args);
      }
    }
}

// 用throttle来包装scroll的回调
const better_scroll = throttle(() => console.log('触发了滚动事件'), 1000)

document.addEventListener('scroll', better_scroll)
Debounce： 最后一个参赛者说了算
防抖的主要思想在于：我会等你到底。在某段时间内，不管你触发了多少次回调，我都只认最后一次。

继续大胃王比赛故事，这次换了一种比赛方式，时间不限，参赛者吃到不能吃为止，当每个参赛都吃不下的时候，后面10分钟如果没有人在吃，比赛结束，如果有人在10分钟内还能吃，则比赛继续，直到下一次10分钟内无人在吃时为止。

对比 throttle 来理解 debounce： 在 throttle 的逻辑里， ‘裁判’ 说了算，当比赛时间到时，就执行回调函数。而 debounce 认为最后一个参赛者说了算，只要还能吃的，就重新设定新的定时器。

现在一起实现一个 debounce：

```// fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间
function debounce(fn, delay) {
  // 定时器
  let timer = null
  
  // 将debounce处理结果当作函数返回
  return function () {
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments

    // 每次事件被触发时，都去清除之前的旧定时器
    if(timer) {
        clearTimeout(timer)
    }
    // 设立新定时器
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

// 用debounce来包装scroll的回调
const better_scroll = debounce(() => console.log('触发了滚动事件'), 1000)
```

document.addEventListener('scroll', better_scroll)
用 Throttle 来优化 Debounce
debounce 的问题在于它“太有耐心了”。试想，如果用户的操作十分频繁——他每次都不等 debounce 设置的 delay 时间结束就进行下一次操作，于是每次 debounce 都为该用户重新生成定时器，回调函数被延迟了不计其数次。频繁的延迟会导致用户迟迟得不到响应，用户同样会产生“这个页面卡死了”的观感。

为了避免弄巧成拙，我们需要借力 throttle 的思想，打造一个“有底线”的 debounce——等你可以，但我有我的原则：delay 时间内，我可以为你重新生成定时器；但只要delay的时间到了，我必须要给用户一个响应。这个 throttle 与 debounce “合体”思路，已经被很多成熟的前端库应用到了它们的加强版 throttle 函数的实现中：

```// fn是我们需要包装的事件回调, delay是时间间隔的阈值
function throttle(fn, delay) {
  // last为上一次触发回调的时间, timer是定时器
  let last = 0, timer = null
  // 将throttle处理结果当作函数返回
  
  return function () { 
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments
    // 记录本次触发回调的时间
    let now = +new Date()
    
    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last < delay) {
    // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
       clearTimeout(timer)
       timer = setTimeout(function () {
          last = now
          fn.apply(context, args)
        }, delay)
    } else {
        // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
        last = now
        fn.apply(context, args)
    }
  }
}

// 用新的throttle包装scroll的回调
const better_scroll = throttle(() => console.log('触发了滚动事件'), 1000)

document.addEventListener('scroll', better_scroll)
```