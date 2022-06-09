怎么去简单入门学习和使用 workbox。按如下方式打开。
1.workbox 是什么？可以做什么？

> Workbox is a set of libraries that can power a production-ready service worker for your Progressive Web App.
> Workbox is a library that bakes in a set of best practices and removes the boilerplate every developer writes when working with service workers.
> Precaching
> Runtime caching
> Strategies
> Request routing
> Background sync
> Helpful debugging

workbox 是 GoogleChrome 团队推出的一个为 SW 和 PWA 服务的一个库。它提供了一系列完整接口和最佳实践。包括实现预缓存，运行时缓存以及缓存策略控制等。

2.workbox-build 是什么？基本使用？

> The workbox-build module integrates into a node-based build process and can generate an entire service worker, or just generate a list of assets to precache that could be used within an existing service worker.

是封装 Workbox 的一个可用用来生成预缓存资源列表的 npm 包(node module)。
```
const {generateSW} = require('workbox-build');

      generateSW({
        swDest: './build/sw.js',
        globDirectory: './app',
        globPatterns: '**/*.{js,css,html,png}',
      });
    ```
    或
    ```
    const createCacheList = async () => {

const { count, manifestEntries, size, warnings } = await getManifest({
globDirectory: "./temp",
globPatterns: ["**/*.{js,css,html}"],
});

const wb = fs.createWriteStream("./dist/manifest.json");
wb.on("error", (err) => {
console.log("createCacheList err", err);
});

wb.on("finish", () => {
console.log("createCacheList finish");
});

wb.write(` { name:'项目工程名称', version:'当前版本', preVersion:'上一个版本', manifest:${JSON.stringify(manifestEntries)}}, patch:'增量包'， fullFiles:'全量包' `);
};
```

3.workbox-webpack-plugin 的作用？

> Workbox provides two webpack plugins: one that generates a complete service worker for you and one that generates a list of assets to precache that is injected into a service worker file.
> The plugins are implemented as two classes in the workbox-webpack-plugin module, named GenerateSW and InjectManifest. The answers to the following questions can help you choose the right plugin and configuration to use.

workbox-webpack-plugin 是 Workbox 提供的 webpack 插件，支持 1）生成完整的 service worker，2）生成要预缓存的资产列表，该列表被注入到 service worker 文件中。

更都功能和详细文档，请参考以下 google 文档。

> 参考：
> https://developers.google.com/web/tools/workbox
> https://developer.chrome.com/docs/workbox/what-is-workbox/
> https://developer.chrome.com/docs/workbox/modules/workbox-build/
