###   chrome 84 新特性
>资源：https://developers.google.com/web/updates/2020/07/nic84
https://v8.dev/blog/v8-release-84

简单罗列：

1. App icon shortcuts  应用程序图标快捷方式
主要应用在PWA和移动端chrome.

2. Web animations API  网络动画API
> The Web Animations API is a tool that enables developers to write imperative animations with JavaScript.   

>详细说明：https://web.dev/web-animations/

1)增加animation.ready和animation.finished 方法。
2)浏览器可以清除旧动画，从而优化内存，提高性能。
3)可以使用合成模式来组合动画，支持添加和计算属性。

使用如下：
```
const transformAnimation = modal.animate(openModal, openModalSettings);
transformAnimation.finished.then(() => { text.animate(fadeIn, fadeInSettings)});
```

回顾使用：
```
js:
const openAnimation = [
  { transform: 'scale(0)' }, 
  { transform: 'scale(1)' }, 
];
document.querySelector('.modal').animate(
    openAnimation, {
      duration: 1000, // 1s
      iterations: 1, // single iteration
      easing: 'ease-in' // easing function
    }
);

css:
.modal {
  animation: openAnimation 1s 1 ease-in;
}

```
类似css 的关键帧
```
@keyframes openAnimation {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
```

4）
getAnimations（）是一种返回元素上所有动画的方法，无论它是通过element.animate（）还是通过CSS规则（CSS动画或过渡）创建的。


3. Content indexing API  内容索引API
>文献： https://web.dev/content-indexing-api/

>摘要：Using a progressive web app means having access to information people care about—images, videos, articles, and more—regardless of the current state of your network connection. Technologies like service workers, the Cache Storage API, and IndexedDB provide you with the building blocks for storing and serving data when folks interact directly with a PWA. But building a high-quality, offline-first PWA is only part of the story. If folks don't realize that a web app's content is available while they're offline, they won't take full advantage of the work you put into implementing that functionality.

使用户感知到在离线情况下，PWA提供的页面依旧使能够使用的。

把页面内容添加近索引的方式：
```
const registration = await navigator.serviceWorker.ready;

// Remember to feature-detect before using the API:
if ('index' in registration) {
  // Your Content Indexing API code goes here!
}else{
    await registration.index.add({
  // Required; set to something unique within your web app.
  id: 'article-123',

  // Required; url needs to be an offline-capable HTML page.
  // For compatibility during the Origin Trial, include launchUrl as well.
  url: '/articles/123',
  launchUrl: '/articles/123',

  // Required; used in user-visible lists of content.
  title: 'Article title',

  // Required; used in user-visible lists of content.
  description: 'Amazing article about things!',

  // Required; used in user-visible lists of content.
  icons: [{
    src: '/img/article-123.png',
    sizes: '64x64',
    type: 'image/png',
  }],

  // Optional; valid categories are currently:
  // 'homepage', 'article', 'video', 'audio', or '' (default).
  category: 'article',
});

}
```

查询索引：getAll()
```
const entries = await registration.index.getAll();
for (const entry of entries) {
  // entry.id, entry.launchUrl, etc. are all exposed.
}
```

删除：
```
await registration.index.delete('article-123');
```

4. Wake lock API 唤醒锁API
可以阻止屏幕变暗
```
// Request the wake lock
const wl = await navigator.wakeLock.request('screen');

// Release the wake lock
wl.release();
```

5. Origin trials
>Origin trials give you access to a new or experimental feature, to build functionality your users can try out for a limited time before the feature is made available to everyone.
原始试用版可让您访问新功能或实验性功能，以构建用户可以在有限时间内试用的功能，然后所有人才能使用该功能

1)Idle detection
判断用户是否是进入空闲状态。

```
// Create the idle detector
const idleDetector = new IdleDetector();

// Set up an event listener that fires when idle state changes.
idleDetector.addEventListener('change', () => {
  const uState = idleDetector.userState;
  const sState = idleDetector.screenState;
  console.log(`Idle change: ${uState}, ${sState}.`);
});

// Start the idle detector.
await idleDetector.start({
  threshold: 60000,
  signal,
});
```

2)Web Assembly SIMD
SIMD(single instruction multiple data)即但指令流多数据流，一种采用一个控制器来控制多个处理器。

Web Assembly SIMD目的是将向量运算引入webAssembly规范中，提高处理视频音频的处理速度
。
6. Resuming SameSite Cookie

7.  Issues tab in Chrome DevTool
增加新的错误控制tab
>其他有关chrome84 devtool的消息请查看：
https://developers.google.com/web/updates/2020/05/devtools

8. Weak references and finalizers

9. Private methods and accessors

>Keeping state and behavior private to a class lets library authors present a clear, stable interface, while changing their code over time behind the scenes. The class fields proposal provides private fields for classes and instances, and this proposal builds on that by adding private methods and accessors (getter/setters) to JavaScript. With this proposal, any class element can be private.

>https://v8.dev/features/class-fields  

> https://github.com/tc39/proposal-private-methods/blob/master/README.md