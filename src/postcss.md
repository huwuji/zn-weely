### postcss

引用：
>https://www.w3cplus.com/blog/tags/516.html  

>https://www.w3cplus.com/PostCSS/postcss-deep-dive-what-you-need-to-know.html

#### 什么是postcss what

官网所述：
> PostCSS is a tool for transforming styles with JS plugins. These plugins can lint your CSS, support variables and mixins, transpile future CSS syntax, inline images, and more.

正如官网，postcss是一个转化css的js工具。所以它可以做预处理器，也可以做后处理器，但它不是预，后处理器。

比如Less，sass是预处理器，通过规定的语法实现不同的css操作，简化css编程人员对于css的编写。在编译css前，这些预处理器也需要被编译，把属于特定预处理器的语法编译为css合规语法。

比如autoprefixer,clean-css 这些，在完成的样式表中根据CSS规范处理CSS，让其更有效。比如添加浏览器私有属性，压缩css等。


那postcss是什么？
	类似babel之于js,babel提供parse,translate,generate. postcss也提解析，转化，生成新的css的功能，只不过在转化阶段，postcss把这个流程封装成‘工厂’，工厂提供标准化的‘基础产品’，把产品的再次加工交给不同的车间，车间的加工要基于基础产品，这车间就对应插件plugins。此外，在解析和生成阶段，也可以加入插件处理。插件可以根据需求自己制定。比如，想做一个预处理器，自己定义一套编写规则，以及解析规则的插件，例如.diycss，和postcss-diycss-plugins。

	简单来说，postcss提供了一整套对css操作的架构，提供了一个完整的生态，而插件系统，对应支持对这个生态的丰富，但也是要遵循这个生态。

	所以，postcss的流程是：
	css-> parser -->(ast)-->[plugin,...]--->generator--->new css


#### 谈谈postcss插件






















