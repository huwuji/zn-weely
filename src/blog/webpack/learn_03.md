#### webpack 的执行流程--及 compiler 的钩子函数和 compilation 的 hooks

- compiler Compiler 模块是 webpack 的主要引擎，个人理解为 webpack 事件流的运行环境，插件的载体，以及插件运行的环境；它像一个工厂的整个流水线框架；

- compilation 主要负责模块的编译和优化；它像是工厂中被流水线串联的一个车间；

- hooks 它像是工厂中流水线上串联的一个个车间，每个车间处理流水线的某一个特定环节，支持引入‘功能’对该环节‘流水线产品’做处理；
  及引用 apply 函数，监听 compiler 上的某个或某些 hooks；

  主要 hooks 事件流：
  entryOption--->(befor,after)run--->compile-->make(进入 compilation 中，进行模块解析构建)-->buildModule(构建模块)-->seal(对象停止接收新的模块时触发。开始优化模块，构建 chunks 并优化)-->emit(输出到磁盘)

1. webpack 的阶段

   - 准备阶段
   - 模块构建阶段（包括分析依赖，构建依赖树）
   - 资源生成和优化，代码生成和输出到磁盘阶段

2. 准备阶段：
   对根据 options 对 webpack 进行一些初始化的设置，包括一些默认插件的添加；
   webpack/lib/webpack.js

3. 模块构建阶段

   - 模块 loader 执行
   - parse（acron） 解析模块成 AST，遍历 AST 来处理模块，
   - 同时处理相关的 hooks
   - 并找出依赖，逐步构建依赖树

4. 资源生成和优化

   - 生成 chunks
   - 优化模块和 chunks

> Chunk 生成算法
>
> 1. webpack 先将 entry 中对应的 module 都生成一个新的 chunk
> 2. 遍历 module 的依赖列表，将依赖的 module 也加入到 chunk 中
> 3. 如果一个依赖 module 是动态引入的模块，那么就会根据这个 module 创建一个
>    新的 chunk，继续遍历依赖
> 4. 重复上面的过程，直至得到所有的 chunks

> 基于 webpack": "4.31.0", "webpack-cli": "3.3.2"
