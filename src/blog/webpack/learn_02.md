#### webpack 的执行---compiler

Webpack 可以将其理解是一种基于事件流的编程范例，一系列的插件运行。

1. Tapable ---Compiler 继承 Tapable
   Tapable 是一个类似于 Node.js 的 EventEmitter 的库, 主要是控制钩子函数的发布与订阅,控制着 webpack 的插件系统。
   Tapable 库暴露了很多 Hook（钩子）类，为插件提供挂载的钩子

   ```
   const {
   SyncHook, //同步钩子
   SyncBailHook, //同步熔断钩子
   SyncWaterfallHook, //同步流水钩子
   SyncLoopHook, //同步循环钩子
   AsyncParallelHook, //异步并发钩子
   AsyncParallelBailHook, //异步并发熔断钩子
   AsyncSeriesHook, //异步串行钩子
   AsyncSeriesBailHook, //异步串行熔断钩子
   AsyncSeriesWaterfallHook //异步串行流水钩子
   } = require("tapable");
   ```

   Hook types
   参考https://github.com/webpack/tapable#hook-types

2. Compiler：


模拟 Compiler.js

```
module.exports = class Compiler {
    constructor() {
        this.hooks = {
            accelerate: new SyncHook(['newspeed']),
            brake: new SyncHook(),
            calculateRoutes: new AsyncSeriesHook(["source", "target", "routesList"])
        }
    }
    run(){
        this.accelerate(10)
        this.break()
        this.calculateRoutes('Async', 'hook', 'demo')
    }
    accelerate(speed) {
        this.hooks.accelerate.call(speed);
    }
    break() {
        this.hooks.brake.call();
    }
    calculateRoutes() {
        this.hooks.calculateRoutes.promise(...arguments).then(() => {
        }, err => {
            console.error(err);
        });
    }
}
```

自定义插件 my-plugin.js

```
class MyPlugin{
   constructor() {

   }
   apply(compiler){
       compiler.hooks.brake.tap("WarningLampPlugin", () => console.log('WarningLampPlugin'));
       compiler.hooks.accelerate.tap("LoggerPlugin", newSpeed => console.log(`Accelerating to
${newSpeed}`));
       compiler.hooks.calculateRoutes.tapPromise("calculateRoutes tapAsync", (source, target, routesList)
=> {
           return new Promise((resolve,reject)=>{
               setTimeout(()=>{
                   console.log(`tapPromise to ${source} ${target} ${routesList}`)
                   resolve();
               },1000)
           });
       });
   }
}
```

> https://github.com/webpack/tapable#tapable
