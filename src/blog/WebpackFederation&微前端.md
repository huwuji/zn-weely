### Webpack Federation

> 多个独立的构建可以组成一个应用程序，这些独立的构建之间不应该存在依赖关系，因此可以单独开发和部署它们。
> 这通常被称作微前端，但并不仅限于此。

我们理解：Webpack Federation 致力于构建独立的应用及模块，方便应用之间，模块之间的组合；参照于微前端理念。

前端一般实现模块共享的方式：

- npm ：利用 npm 包实现模块的共享
  但是也需要在本地编译；

- 通过直接引用 UMD 包
  通常这样的包文件会包含很多重复依赖，引用的基础库也容易产生冲突；

接下来我们窥探下 webpack5 federation 的实现组件共享的方式

webpack5 federation 的打包方式：
利用 ModuleFederationPlugin 插件允许构建在运行时提供或使用具有其他独立构建的模块。

插件的几个重要参数：

- name 当前应用名称，需要全局唯一。
- remotes 可以将其他项目的 name 映射到当前项目中。
- exposes 表示导出的模块，只有在此申明的模块才可以作为远程依赖被使用。
- shared 是非常重要的参数，制定了这个参数，可以让远程加载的模块对应依赖 优先用 Host 的依赖，如果 Host 没有，再用自己的；改为使用本地项目的 React 或 ReactDOM 或 Vue。

```
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  // other webpack configs...
  plugins: [
    new ModuleFederationPlugin({
      name: "app3",
      library: { type: 'var', name: 'app3' },
      // 依赖的组件
      remotes: {
        app1: "app1@http://localhost:3001/remoteEntry.js",
        app2: "app2@http://localhost:3002/remoteEntry.js",
      },
      // 暴露出去的模块
      exposes: {
        AppContainer: "./src/App",
        'Button':'./src/Button'
      },
      // 避免项目出现多个公共依赖，一定要提供方和使用方项目同时配置shared
      shared: [
            "react-dom":'^16.14.0',
            "react-router-dom",
            "react": {
                requiredVersion: '^16.14.0',
                singleton: true,
            },
        ]
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      chunks: ["main"]
    })
  ]
};
```

#### 利用 webpack federation 搭建一个简易的应用 Demo

搭建思路 todo:

- 利用 lerna 搭建两个应用仓库----模拟多应用
- 使用 Webpack Federation 构建应用

#### 微前端理念

- 什么是微前端？
  借鉴于微服务的理念，一个前端应用由多个微前端应用组合而成的技术架构；

- 微前端的解决的问题？

  - 巨石应用维护问题
  - 业务页面/组件复用问题
  - 业务快速迭代，兼容新老子业务问题
  - 提升构建和交互效率：子应用单独开发，测试，构建部署交付；
  - 架构渐进升级
  - ...

- 微前端特点

  - 独立与自治：简化开发
  - 技术栈无关：技术栈与架构可平滑升级
  - 运行时集成：动态化，依赖控制
  - 解偶与组合：增量更新，集合交付
  - 以及去中心化

- 微前端的价值

  - 工程角度上：

    - 独立开发，构建，提升构建效率，独立部署交付；
    - 架构支持平滑升级

  - 业务角度上：
    - 业务的颗粒化
    - 产品动态化
    - 团队自治

- 微前端技术上需要处理点？

  - 集成方式

    - iframe
    - nginx 路由分发，只适合页面为单元
    - Javascript 集成，使用 script 标签加载并执行脚本，赋值一个全局函数，并依据需要（何时，何地）渲染执行；
    - Web Components 集成

  - 共享组件库：对于公共库的管理

    - 共享组件库的引入方式：
      1）npm 包：还需要打包编译，不能运行时直接加载
      2）CDN 资源包：可以运行时加载。注意资源版本；
    - 共享组件库的提供方式：
      1）单独管理：使用 monorepo 管理一系列包；但细分到组件，需提前规划共享组件，每次业务开发公共组件都要到 monorepo 工程中开发；
      2）使用 Webpack Federation，把业务开发应用(或者说各个微应用)exposes 的组件单打打包，推动到 CDN；同时也能把组件或者应用共同依赖的公共资源(shared 资源)单独拎出来；

  - 运行环境安全
    主要 js 安全隔离，防止上下文的一些全局属性被污染

  - 跨应用通信

    - 基于 URL 通信
    - 发布订阅模型
    - ...

  - 样式隔离

    - 工程化手段：css module，css in js，无法杜绝项目中使用全局样式，可能需要我们约定只能在主应用中修改全局组件样式
    - shadow DOM，天然的样式隔离
    - 在运行时或打包编译时增加命名空间，利用属性选择器区分（如 BEM）

  - 测试，部署独立

- 微前端架构模式下，子应用打包的方式，基本分为两种：

  - 构建时组合：Module Federation, EMP ...
  - 运行时组合：qiankun ...

- 微前端现有的落地方案可以分为三类：
  自组织模式、基座容器模式以及模块加载模式。

#### 国内目前微前端框架

- qiankun: <https://github.com/umijs/qiankun>
- EMP: <https://github.com/efoxTeam/emp>
- fronts: <https://github.com/unadlib/fronts>

> 引用
> <https://webpack.docschina.org/concepts/module-federation/#concept-goals> >

> <https://webpack.js.org/plugins/module-federation-plugin>

> <https://github.com/module-federation/module-federation-examples>

> <https://www.bilibili.com/video/BV1z5411K7us>

> <https://www.lumin.tech/articles/webpack-module-federation/>
