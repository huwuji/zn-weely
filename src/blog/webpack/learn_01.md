#### webpack 启动

1. webpack 命令入口文件开始--到安装 webpack-cli

局部安装时：
入口文件：node_modules/.bin/webpack
同时会根据 webpack 的 package.json 的 bin 属性配置的 webpack 路径，执行指定脚本；
实际入口文件：node_modules/webpack/bin/webpack.js

全局安装：
使用 which webpack 查看安装路径

> 补充：
> 当我们遇到脚本开头使用
> **[#!/usr/bin/env node]**
> 时是给当前脚本指定解释程序；
> 但是，会发现这个目录并不是 node 的安装目录；
> 这是因为不同的用户 node 路径不同的问题，为了让系统动态的去查找 node 来执行你的脚本文件，顾这么编写。

> /usr/bin/env 就是告诉系统可以在 PATH 目录中查找,所以 node 安装时，路径要添加到系统的 PATH 中。不然会找不到文件，则需要我们手动的去修改 node 环境变量配置；

> 如果想直接指定 node 路径，可以先通过 **[which node]** 先找到路径；再通过 **[#!/usr/bin/[path]]** 直接指定

进入 webpack/bin/webpack.js 源码(版本 4.31.0)

- 是否安装 webpack-cli

  - 是
  - 否

    - 判断当前的依赖缓存文件和包管理器类型
      通过 yarn.lock ｜ pnpm-lock.yaml ｜来判断，对应 yarn ,pnpm,npm
    - 通过 readline 开启交互接口，确认安装指令
    - 执行安装： 单独开启子进程执行安装 webpacl-cli

  - 最后：require webpack-cli 模块；-- 及执行 webpack-cli

2. webpack-cli 对命令行参数及指令参数 进行分析和执行
   如 webpacl-cli init
   ...
   参数类型
   参数分组 (config/config-args.js)，将命令划分为 9 类：
   - Config options: 配置相关参数(文件名称、运行环境等)
   - Basic options: 基础参数(entry 设置、debug 模式设置、watch 监听设置、devtool 设置)
   - Module options: 模块参数，给 loader 设置扩展
   - Output options: 输出参数(输出路径、输出文件名称)
   - Advanced options: 高级用法(记录设置、缓存设置、监听频率、bail 等)
   - Resolving options: 解析参数(alias 和 解析的文件后缀设置)
   - Optimizing options: 优化参数
   - Stats options: 统计参数
   - options: 通用参数(帮助命令、版本信息等)

> 基于 webpack": "4.31.0", "webpack-cli": "3.3.2"

3. 对 webpack 配置参数进行处理，生成配置选项参数 options 对象，最终根据配置选项参数创建 compiler 对象，然后进行构建流程；

```
const compiler = webpack(options);
```
