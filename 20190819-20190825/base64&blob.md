### base64和blob区别

先说应用：


## base64
>>>参考 Base64笔记-阮一峰 :http://www.ruanyifeng.com/blog/2008/06/base64.html
>>>参考 JS 中关于 base64 的一些事： https://juejin.im/post/5ccf01d5e51d453a363848d6

基本了解和使用:
 !!!what: base64其实是一种编码转换方式, 将ASCII字符转换成普通文本, 是网络上最常见的用于传输8Bit字节代码的编码方式之一。
1. 有原生atob和btoa方法 
>>> 参考：https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
atob：将base64转成8bit字节码
btoa：将8bit字节码转成base64
例：window.atob("sjkjkj")

1. 文件的Base64编码
    借助FileReader对象和readAsDataURL方法，我们可以把任意的文件转换为Base64 Data-URI。假设我们的文件对象是file，则转换的JavaScript代码如下
    ```
           //  获取base64
           //File 接口基于Blob，继承 blob功能并将其扩展为支持用户系统上的文件。。
            function tobase64(file=blob) {
                const fileReader = new FileReader()
                let base64 = ''
                fileReader.onload = () => {
                    base64 = fileReader.result // 读取base64
                }
                fileReader.readAsDataURL(file) // 转成dataurl
            }

            // base64 to blob
            function dataURItoBlob(dataURI) {
            var mimeString = dataURI
                .split(',')[0]
                .split(':')[1]
                .split(';')[0] // mime类型
            var byteString = atob(dataURI.split(',')[1]) //base64 解码
            var arrayBuffer = new ArrayBuffer(byteString.length) //创建ArrayBuffer
            var intArray = new Uint8Array(arrayBuffer) //创建视图
            for (var i = 0; i < byteString.length; i++) {
                intArray[i] = byteString.charCodeAt(i)
            }
            return new Blob([intArray], { type: mimeString }) // 转成 blob
            }

    ```
#### blob
>>>!!!一个 Blob对象表示一个不可变的, 原始数据的类似文件对象。Blob表示的数据不一定是一个JavaScript原生格式。 File 接口基于Blob，继承 blob功能并将其扩展为支持用户系统上的文件。

>>>BLOB只是字节序列。浏览器将其识别为字节流。它用于从源获取字节流。

>>>!!!数据类型 Blob 对象是在HTML5中，新增了File API。

具体使用参照： JavaScript 中 Blob 对象:https://juejin.im/entry/5937c98eac502e0068cf31ae