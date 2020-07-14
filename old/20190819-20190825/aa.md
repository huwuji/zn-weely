### 如何用 JavaScript 下载文件
>>>链接来源：https://scarletsky.github.io/2016/07/03/download-file-using-javascript/

!!!基于 HTML 5的a标签的特性实现

demo:
1. 利用a标签的实现
```
    <a href="http://somehost/somefile.zip" download="filename.zip">Download file</a>
    // 这里download属性是可选属性，表明的是下载下来的文件名

    //以下是把上面的方式同过js的方式写一遍
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        var filename = 'what-you-want.txt';
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
```

1. 通过服务器返回的文件信息来创建blob，然后把blob文件转成特殊url,回填到a标签的src属性上
```
    //通过fetch api的方式
    fetch('http://somehost/somefile.zip').then(res => res.blob().then(blob => {
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        var filename = 'myfile.zip';
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }))

    //通过原生XMLHTTPRequest
    function request () {
        const req = new XMLHttpRequest();
        req.open('POST', '<接口地址>', true);
        req.responseType = 'blob';
        req.setRequestHeader('Content-Type', 'application/json');
        req.onload = function() {
        const data = req.response;
        const blob = new Blob([data]);
        const blobUrl = window.URL.createObjectURL(blob);
        download(blobUrl) ;
        };
        req.send('<请求参数：json字符串>');
    };

    function download(blobUrl) {
    const a = document.createElement('a');
    a.download = '<文件名>';
    a.href = blobUrl;
    a.click();
    }

    request();


```

补充：
1. window.URL
window.URL 里面有两个方法：

createObjectURL 用 blob 对象来创建一个 object URL(它是一个 DOMString)，我们可以用这个 object URL 来表示某个 blob 对象，这个 object URL 可以用在 href 和 src 之类的属性上。
revokeObjectURL 释放由 createObjectURL 创建的 object URL，当该 object URL 不需要的时候，我们要主动调用这个方法来获取最佳性能和内存使用。

2. Blob 对象
Blob 全称是 Binary large object，它表示一个类文件对象，可以用它来表示一个文件。根据 MDN 上面的说法，File API 也是基于 blob 来实现的。

