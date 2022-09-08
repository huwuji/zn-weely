### 关于 http 响应状态码

1. 状态码分类：

   - 1xx -- 信息，服务器收到请求，需要请求者继续执行操作
   - 2xx -- 成功，操作被成功接收并处理
   - 3xx -- 重定向，需要进一步的操作以完成请求
   - 4xx -- 客户端错误，请求包含语法错误或无法完成请求
   - 5xx -- 服务器错误，服务器在处理请求的过程中发生了错误

2. 常见的状态码：

   - 200 -- 请求成功

   - 301 -- Moved Permanently 当前路径资源被永久变更；请求的资源已经被移动到了由 Location 头部指定的 url 上，是固定的不会再改变。通常不应该修改请求的 Method 和 body；可以用 308 来替代
   - 302 -- Found 资源被临时变更该; HTTP 响应的响应头 Location 指定的 URL 上。通常不应该修改请求的 Method 和 body；可以用 307 来替代
   - 303 -- See Other 资源被变更，重新指向新资源 url；通常作为 PUT 或 POST 操作的返回结果；于 301，302 不同的是，新指向的 url 会更改请求 Method 为 GET;
   - 304 Not Modified 用于说明缓存情况； 说明当前资源缓存未改变，可以继续使用当前缓存；通常出现在协商缓存的时候及附带了头部信息： If-None-Match 或 If-Modified-Since。
   - 307 Temporary Redirect 临时重定向；临时重定向响应状态码，表示请求的资源暂时地被移动到了响应的 Location 首部所指向的 URL 上。
   - 308 Permanent Redirect；永久重定向；说明请求的资源已经被永久的移动到了由 Location 首部指定的 URL 上。

   - 400 Bad Request； 客户端请求语法错误；由于语法无效，服务器无法理解该请求。
   - 401 Unauthorized 客户端请求由于缺乏目标资源要求的身份验证凭证，发送的请求未得到满足。
   - 403 Forbidden 通常是当前身份没有权限访问该目标资源；指的是服务器端有能力处理该请求，但是拒绝授权访问。
   - 404 Not Found 客户端请求资源未被服务器找到，资源不存在；通常可能是死链；服务器无法找到所请求的资源。返回该响应的链接通常称为坏链（broken link）或死链（dead link）；
   - 408 Request Timeout 表示服务器想要将没有在使用的连接关闭。一些服务器会在空闲连接上发送此信息，即便是在客户端没有发送任何请求的情况下。

   - 500 Internal Server Error 服务器未响应；很可能是服务未启动；
   - 501 Not Implemented 表示请求的方法不被服务器支持，因此无法被处理
   - 502 Bad Gateway 网关报错；表示作为网关或代理的服务器，从上游服务器中接收到的响应是无效的。
   - 503 Service Unavailable 表示服务器尚未处于可以接受请求的状态。
   - 504 Gateway Timeout 服务器请求处理超时；表示扮演网关或者代理的服务器无法在规定的时间内获得想要的响应；

3. 状态码信息图表
   ![](../../../Images/page-lifecycle-state.png)

> 参考：
> MDN HTTP:https://developer.mozilla.org/en-US/docs/Web/HTTP
> MDN HTTP: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200

> HTTP Status Code infographic: phttps://www.loggly.com/blog/http-status-code-diagram/
