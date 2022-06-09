怎么去了解他们的作用，可以在 MDN 上查找，在查看了解中文翻译后，要更进一步把握一些细微差异，应该从英文定义中逐字细看。

1.先看两者描述
1)prefetch

> [prefetch](https://html.spec.whatwg.org/multipage/links.html#link-type-prefetch):
> The prefetch keyword may be used with link elements. This keyword creates an external resource link. This keyword is body-ok.
> The prefetch keyword indicates that preemptively fetching and caching the specified resource is likely to be beneficial, as it is highly likely that the user will require this resource for future navigations. User agents must implement the processing model of the prefetch keyword described in Resource Hints. [RESOURCEHINTS]
> There is no default type for resources given by the prefetch keyword.

2)proload

> [preload](https://html.spec.whatwg.org/multipage/links.html#link-type-preload):
> The preload keyword may be used with link elements. This keyword creates an external resource link. This keyword is body-ok.

The preload keyword indicates that the user agent will preemptively fetch and cache the specified resource according to the potential destination given by the as attribute (and the priority associated with the corresponding destination), as it is highly likely that the user will require this resource for the current navigation. [PRELOAD]
There is no default type for resources given by the preload keyword.

从以上描述中可知：
共同点：
a.用于 link 标签元素，会创建一个额外的资源链接； [body-ok](https://html.spec.whatwg.org/multipage/links.html#body-ok) 的;
b.都是提前拉取

不同点：
a.资源希望被要求(或加载执行)的时机不一样
prefetch：require this resource for future navigations
而 preload require this resource for the current navigation
b.缓存逻辑不同
prefetch:caching the specified resource is likely to be beneficial;
而 preload:cache the specified resource according to the potential destination given by the as attribute (and the priority associated with the corresponding destination)

c.提前拉取的时机不一样：
prefetch： preemptively fetching
而 preload: preemptively fetch

这里的差异是重点；
那什么是 fetching?什么是 fetch?

2. fetching?fetch?

> 拓展：

link 标签元素：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link
