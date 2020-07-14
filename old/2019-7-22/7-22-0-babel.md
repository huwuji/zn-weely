### babel相关
### 引用来源：【前端词典】关于Babel你必须知道的  https://juejin.im/post/5d2b1df66fb9a07ef161b208

知识点：
1.什么是babel？
[babel的官方文档](https://babeljs.io/)
> Babel is a JavaScript compiler.

2.讲了babel编译的阶段
> babel总共分为三个阶段：解析，转化，生成。

3.讲了babel转义需要用到plugin。
>Babel 自 6.0 起，就不再对代码进行转换。现在只负责图中的 parse 和 generate 流程，转换代码的 transform 过程全都交给插件去做。

关于插件这块，先从babel的配置文件，.babelrc文件说起。
```
// .babelrc 文件
{ 
    "plugins": [
        "transform-es2015-template-literals",  // 转译模版字符串的 plugins
    ],
    "presets": [
        ["env", {
            // 是否自动引入 polyfill，开启此选项必须保证已经安装了 babel-polyfill
            // “usage” | “entry” | false, defaults to false.
            "useBuiltIns": "usage"
        }], "stage-2"]
}

```
3.1 plugin说到了plugins与presets。
>preset: babel 插件集合的预设，包含某些插件 plugin。显然像上面那样一个一个配置插件会非常的麻烦，为了方便，babel 为我们提供了一个配置项叫做 persets（预设）。

然后将了plugin与presets的调用顺序
>plugins 与 presets 同时存在的执行顺序
>先执行 plugins 的配置项,再执行 Preset 的配置项；
>plugins 配置项，按照声明顺序执行；
>Preset 配置项，按照声明逆序执行。

>>？？？疑问：后执行的配置，在编译的时候是不是会之前编译过的代码块重新编译，也就是覆盖之前的作用？如果是这样，是不是造成了浪费，多编译了一次，是否有更好的方式。

3.2然后讲了下useBuiltIns 配置
>但是通过设置 "useBuiltIns": "usage" 能够把 babel-polyfill 中你需要用到的部分提取>出来，不需要的去除。
>useBuiltIns 参数说明：
>false: 不对 polyfills 做任何操作
>entry: 根据 target 中浏览器版本的支持，将 polyfills 拆分引入，仅引入有浏览器不支持的 polyfill
>usage(新)：检测代码中 ES6/7/8 等的使用情况，仅仅加载代码中用到的 polyfills

4.对babel相关模块的简要说明

模块：babel-core
>babel 的核心 api 都在这个模块中。也就是这个模块会把我们写的 js 代码抽象成 AST 树；然后再将 plugins 转译好的内容解析为 js 代码。
>> ？？疑问：具体工作的原理没有说明，得自己考证。

辅助模块：babel-preset-env,babel-polyfill,babel-runtime & babel-plugin-transform-runtime

>babel-polyfill:
>babel 对一些新的 API 是无法转换，比如 Generator、Set、Proxy、Promise 等全局对象，以及新增的一些方法：includes、Array.form 等。所以这个时候就需要一些工具来为浏览器做这个兼容。
>>官网的定义：babel-polyfill 是为了模拟一个完整的 ES6+ 环境，旨在用于应用程序而不是库/工具。
>babel-polyfill 主要有两个缺点：
>使用 babel-polyfill 会导致打出来的包非常大，很多其实没有用到，对资源来说是一种浪费。
>babel-polyfill 可能会污染全局变量，给很多类的原型链上都作了修改，这就有不可控的因素存在。
>因为上面两个问题，所以在 Babel7 中增加了 babel-preset-env，我们设置 "useBuiltIns": "usage" 这个参数值就可以实现按需加载 babel-polyfill 啦。

>babel-runtime & babel-plugin-transform-runtime
>>在使用 Babel6 的时候， .babelrc 文件中会使用 babel-plugin-transform-runtime，而 package.json 中的 dependencies 同时包含了 babel-runtime，因为在使用 babel-plugin-transform-runtime 的时候必须把 babel-runtime 当做依赖。

>我们在启用插件 babel-plugin-transform-runtime 后，Babel 就会使用 babel-runtime 下的工具函数，将一些浏览器不能支持的特性重写，然后在项目中使用。

>>babel-runtime 内部也集成了 core-js、 regenerator、helpers 等

>由于采用了沙盒机制，这种做法不会污染全局变量，也不会去修改内建类的原型，所以会有重复引用的问题。

>现在最好的实践应该是在 babel-preset-env 设置 "useBuiltIns": "usage"，按需引入 polyfill。

三种方案比较：
```
| 方案                                             |         优点          |                                       缺点 |
| ------------------------------------------------ | :-------------------: | -----------------------------------------: |
| @babel/runtime & @babel/plugin-transform-runtime | 按需引入, 打包体积小  |                           不能兼容实例方法 |
| @babel/polyfill                                  | 完整模拟 ES2015+ 环境 | 打包体积过大, 污染全局对象和内置的对象原型 |

@babel/preset-env|按需引入, 可配置性高	|??未说明
```
>>??疑问，还是没太懂这几个本质的区别

5.babel7的一些变化
>>淘汰 es201x，删除 stage-x，推荐 env

>重命名
>babel-cli —> @babel/cli。
> babel-preset-env —> @babel/preset-env


看完总结：
讲了一定的知识，对自己来说提了一些不错的概念点，不过看完感觉没有一个整体的流程感，自己需要好好再了解下整个babal的过程，以及一些核心的点的深入了解。
！！！文中疑问的地方提醒自己去好好理解下。
todo