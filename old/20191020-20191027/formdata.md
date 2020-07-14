#### 上传表单的方式
上传表单需要发送数据到服务器，请求主体的类型由content-type首部指定。
所有要让服务器知道我们上传的是文件，我们需要指定到约定好的content-type值。
一。 一般是通过 HTML 表单发送请求, 并返回服务器的修改结果. 在这种情况下, content type 是通过在 <form> 元素中设置正确的 enctype 属性, 或是在 input
button 元素中设置 formenctype 属性来选择的。
 1. application/x-www-form-urlencoded: 数据被编码成以 '&' 分隔的键-值对, 同时以 '=' 分隔键和值. 非字母或数字的字符会被 percent-encoding: 这也就是为什么这种类型不支持二进制数据(应使用 multipart/form-data 代替).
2. multipart/form-data
3. text/plain
 
 然后是用ajax等发送请求，需要自己定义请求头。

!!! 以上需要知道的概念是content-type，以及application/x-www-form-urlencoded与multipart/form-data的区别。主要是两者的编码方式不一样，第一个不支持二进制编码。然后是multipart/form-data的数据形式更感觉是多文件分隔。

二。 formdata是什么

**FormData 接口**提供了一种表示表单数据的键值对的构造方式，经过它的数据可以使用 XMLHttpRequest.send() 方法送出，本接口和此方法都相当简单直接。如果送出时的编码类型被设为 "multipart/form-data"，它会使用和表单一样的格式。

如果你想构建一个简单的GET请求，并且通过<form>的形式带有查询参数，可以将它直接传递给URLSearchParams。

实现了 FormData 接口的对象可以直接在for...of结构中使用，而不需要调用entries() : for (var p of myFormData) 的作用和 for (var p of myFormData.entries()) 是相同的。

**FormData对象**用以将数据编译成键值对，以便用XMLHttpRequest来发送数据。其主要用于发送表单数据，但亦可用于发送带键数据(keyed data)，而独立于表单使用。如果表单enctype属性设为multipart/form-data ，则会使用表单的submit()方法来发送数据，从而，发送数据具有同样形式。

FormData 对象的字段类型可以是 Blob, File, 或者 string: 如果它的字段类型不是Blob也不是File，则会被转换成字符串类)。

一个 Blob对象表示一个不可变的, 原始数据的类似文件对象。Blob表示的数据不一定是一个JavaScript原生格式。 File 接口基于Blob，继承 blob功能并将其扩展为支持用户系统上的文件。你可以通过 Blob() 构造函数创建一个Blob对象。