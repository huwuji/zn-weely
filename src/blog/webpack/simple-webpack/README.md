### 实现一个简易的 webpack

1. 目标

   - 实现模块从 es6 转译到 es5
   - 构建依赖树
   - 生成能够在浏览器环境运行的 bundle 文件

2. 简易模拟功能模块
   - parse 模块
   - compiler 模块
     - run
     - buildModule --递归处理模块代码
     - emit --生成 bundle 文件，并输出到磁盘（/dist 目录）
