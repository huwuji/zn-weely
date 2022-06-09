1. yarn 包管理器简介
   就目前来说，yarn 和 npm 类似，是一个可选择的包管理器，并不是替代 npm 包管理器；
   优点：
   - 支持并行安装和零安装，两者都显着提高了性能。
   - 较新版本的 Yarn 提供了更安全的版本锁定形式
   - 新特性，比如：Yarn workspaces
2. yarn 流程

- 检测(checking)：检测项目与包管理相关的（如 npm 文件）可能冲突；同时也检测 OS,CPU 等信息；
- 解析包(resolving packages)：
  1）解析 package.json 文件，遍历依赖（dependencies/devDependencies/peerDependencies）的依赖包（首层依赖遍历的方式），获取依赖版本信息；
  2）检查首层依赖包是否解析，已解析，..；未解析则往下；
  3）未解析的包，检查是否在 yarn.lock 有记录，找出资源地址，同时标记已解析；没有的化，则向 registry 发出请求该资源包的最新的符合要求的版本，并记录该版本，和标记该包已经解析；
  最终确定和获得所有依赖包的版本信息以及依赖包的详细信息（
  资源地址，内容 hash，依赖）
- 获取包(fetching packages)：查看是否在该系统存在缓存，依据这个 cacheFolder+slug+node_modules+pkg.name 文件是否存在判断；存在缓存则直接从缓存读取；
  不存在缓存，则加入 fetch 队列，根据路径从本地或网络拉取资源，并缓存到本地；
- 链接包(linking packages)：将项目中的依赖复制到项目 node_modules 下，遵循扁平化原则； 需要先解析 peerDependencies
- 构架包：构建包中存在二进制包的进行编译

3. 关于依赖管理
   嵌套地狱；
   yarn 会在每次 install 的时候默认执行 yarn debute。

   > npm 可以是 npm dedupe 来重新组合依赖，减少重复；
   > 更多介绍：https://docs.npmjs.com/cli/v8/commands/npm-dedupe

4. 相比于 npm，yarn 在网络性能上更优，采用了请求排队的理念,类似于并发池连接,能够更好的利用网络资源;同时也引入了一种安装失败的重试机制；

5. yarn PnP ：https://classic.yarnpkg.com/en/docs/pnp/

> PnP 的具体工作原理是，作为把依赖从缓存拷贝到 node_modules 的替代方案，Yarn 会维护一张静态映射表，从而达到：
> 1）安装依赖的速度得到了空前的提升
> 2）CI 环境中多个 CI 实例可以共享同一份缓存
> 3）同一个系统中的多个项目不再需要占用多份磁盘空间

6. pnpm:https://classic.yarnpkg.com/en/docs/pnp/

> pnpm 通过巧妙*硬链接* + *软链接*结合的方式完全实现了扁平结构依赖树结构的 node_modules，解决了幻影依赖和 npm 分身的问题。 并且通过全局只保存一份在 ~/.pnpm-store 的方式，在不同的项目中进行 install 的速度也会变得更快，也解决了磁盘空间占用的问题。

拓展与参考

>

1. yarn vs npm vs pnpm :https://rushjs.io/zh-cn/pages/maintainer/package_managers/
2. 幻影依赖:https://rushjs.io/zh-cn/pages/advanced/phantom_deps/
3. npm 分身： https://rushjs.io/zh-cn/pages/advanced/npm_doppelgangers/
4. yarn workspace:
5. peerDependencies:[参考](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependencies)
   主要适用于插件开发配置，用于指定你当前的插件兼容的宿主必须要安装的包的版本。
   哪些依赖适用于此配置项：

   - 插件正确运行的前提是，核心依赖库必须先下载安装，不能脱离核心依赖库而被单独依赖并引用；
   - 插件入口 api 的设计必须要符合核心依赖库的规范；
   - 插件的核心逻辑运行在依赖库的调用中；
   - 在项目实践中，同一插件体系下，核心依赖库版本最好是相同的；

6. npm 存在的问题以及 pnpm 是怎么处理的： https://www.yuexun.me/blog/problems-with-npm-and-how-pnpm-handles-them/

7. yarn PnP 特性：https://loveky.github.io/2019/02/11/yarn-pnp/

8. Replacing Lerna + Yarn with PNPM Workspaces ：https://www.raulmelo.dev/blog/replacing-lerna-and-yarn-with-pnpm-workspaces
