### crossorigin

1. corsorigin 的属性

   - anonymous --请求使用 CORS 标头，并且凭据标志设置为“同源”。除非目的地是同一来源，否则不会通过 cookie、客户端 SSL 证书或 HTTP 身份验证交换用户凭据；
   - use-credentials --请求使用 CORS 标头，凭据标志设置为“包含”，并且始终包含用户凭据；
   - "" --等同于设置 anonymous；

2. crossorigin 的使用场景？
   在了解什么是 crossorigin 之前，我们先来了解下他的使用场景。
   使用场景：对于某个 Html 元素资源，希望设置 CORS；

   如对于图片请求某个第三方的资源，在没有添加 crossorigin 属性的情况下，默认是可以直接加载该第三方资源。但是设置 crossorigin 后，则需要开发 CORS 验证；

   添加 crossorigin 的步骤：

   - 客户端设置该 Html 元素时添加 crossorigin='anonymous'属性，及开始 CORS 验证但是不进行身份验证，及不携带 cookies 等；
   - 资源服务器需要开启 CORS；

   !!!注意:

   - 如果客户端元素第三方资源添加了 crossorigin，服务端没有添加，无法进行正常资源加载；
   - 针对于前端异常捕获：如上的条件，如果客户端元素第三方资源没有添加 crossorigin，当资源被正常加载后，执行报错时，该域下无法准确捕获错误(只能捕获到:Script error.)

> 了解更多请求参见：
> https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
