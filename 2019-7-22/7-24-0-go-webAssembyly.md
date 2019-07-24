### go 语言做前端的库 vugu

### 引用来源: https://www.vugu.org/doc

翻译：

vugu 是一个简单写用 go 语言写 web 用户界面的库。

基础概念点：

- UI 组件要写在以.vugu 后缀结尾的文件中。这些 UI 组件与用 js 框架写的语言类似，只是用 go 语言替代组件内一些 js 功能函数，比如 if，for 等等。

- 每个.vugu 文件会被编译转化成相应的.go 语言文件。

- vugu 项目会被编译成 webAssembly 组件，然后在浏览器上运行。

- vugu 库提供丰富功能地，高效的同步 HTML DOM ,让开发人员更友好的用 vugu 库去开发 web 页面。
