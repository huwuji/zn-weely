#### Lighthouse 第三方库审计--从现象到源码追踪

> 本文不着重讲 Lighthouse 的使用，只是根据一个例子，衍生出对于 Lighthouse 审计的思考和调研实践；

1. 背景：
   在做站点优化的时候，利用 Lighthouse 跟进性能和最佳实践，发现有两个库存在安全漏洞；
   如图：
   ![](https://github.com/huwuji/zn-weekly/blob/master/src/Images/lighthouse-1.png)
   对于以上问题，我们处理这个漏洞的方式也简单；
   我们可以直接点击漏洞文件，会进入 snyk 的网站,  
   如：<https://security.snyk.io/package/npm/jquery>
   <https://security.snyk.io/package/npm/lodash>
   从中找到没有漏洞的版本，再升级版本。
   或者移除当前的库。

   如果我们查看 Lighthouse 生成的报告的 Json 文件，我们可以看到在审计 audits 下会有这样的额报告；

```
   "no-vulnerable-libraries": {
   "id": "no-vulnerable-libraries",
   "title": "Includes front-end JavaScript libraries with known security vulnerabilities",
   "description": "Some third-party scripts may contain known security vulnerabilities that are easily identified and exploited by attackers. [Learn more](https://web.dev/no-vulnerable-libraries/).",
   "score": 0,
   "scoreDisplayMode": "binary",
   "displayValue": "4 vulnerabilities detected",
   "details": {
     "type": "table",
     "headings": [
       {
         "key": "detectedLib",
         "itemType": "link",
         "text": "Library Version"
       },
       {
         "key": "vulnCount",
         "itemType": "text",
         "text": "Vulnerability Count"
       },
       {
         "key": "highestSeverity",
         "itemType": "text",
         "text": "Highest Severity"
       }
     ],
     "items": [
       {
         "highestSeverity": "High",
         "vulnCount": 4,
         "detectedLib": {
           "text": "Lo-Dash@4.17.20",
           "url": "https://snyk.io/vuln/npm:lodash?lh=4.17.20&utm_source=lighthouse&utm_medium=ref&utm_campaign=audit",
           "type": "link"
         }
       }
     ],
     "summary": {}
   }

 },
  ...
 "js-libraries": {
   "id": "js-libraries",
   "title": "Detected JavaScript libraries",
   "description": "All front-end JavaScript libraries detected on the page. [Learn more](https://web.dev/js-libraries/).",
   "score": null,
   "scoreDisplayMode": "informative",
   "details": {
     "type": "table",
     "headings": [
       {
         "key": "name",
         "itemType": "text",
         "text": "Name"
       },
       {
         "key": "version",
         "itemType": "text",
         "text": "Version"
       }
     ],
     "items": [
       {
         "name": "Lo-Dash",
         "version": "4.17.20",
         "npm": "lodash"
       }]
       }
     }

```

往下我们继续思考

2. Lighthouse  
   Lighthouse 是怎么分析出这些有漏洞的库呢？
   查看[官网](https://web.dev/no-vulnerable-libraries)我们知道：

   > 为了检测易受攻击的库，Lighthouse 会执行以下操作：
   >
   > - 运行适用于 Chrome 的库检测器。
   > - 根据 snyk 的漏洞数据库检查检测到的库列表。

   请继续思考：
   这里我们假定我们对 Lighthouse 的工作原理有一定的了解：

   lighthouse 的组成：

   - Driver（驱动）—— 通过 Chrome Debugging Protocol (Chrome 远程调试协议) 和 Chrome 进行交互。
   - Gatherer（采集器）—— 决定在页面加载过程中采集哪些信息，将采集的信息输出为 Artifact。可自定义。
   - Audit（审查器）—— 将 Gatherer 采集的 Artifact 作为输入，审查器会对其测试，然后得出相应的测评结果。可自定义
   - Reporte（报告）—— 将审查的结果通过指定的方式报告出来。

   lighthouse 的工作流程
   指定浏览器页面打开 url-利用 chrome 远程调试协议连接对应 chrome 页面端口-搜集数据-审查数据-生成报告；

   以上是 Lighthouse 的相关工作原理；
   那我们是不是也可以自定义搜集器和审计器来检查出漏洞库呢？

3. 自定义搜集器和审计器
   首先我们先以一个自定义检验 Script 资源加载的总时长的搜集器和审计器入手；
   代码如下：

   ```
   <!-- 搜集器 -->
    const Gatherer = require("lighthouse").Gatherer; // 引入 lighthouse 的标准采集器
    class ResourceGatherer extends Gatherer {
    afterPass(options) {
        const driver = options.driver;

        return driver
        .evaluateAsync("JSON.stringify(window.performance.getEntries())")
        .then((loadMetrics) => {
            if (!loadMetrics) {
            throw new Error("无法获取资源");
            }
            return loadMetrics;
        });
    }
    }
    <!-- 审计器 -->
    const Audit = require("lighthouse").Audit; // 引入 lighthouse 的标准审查器
    class ResourceAudit extends Audit {
    static get meta() {
    return {
    id: "resource-audit", // 与 audits 数组对应
    title: "资源信息",
    failureTitle: "资源加载失败",
    description: "显示所有资源",
    requiredArtifacts: ["ResourceGatherer"], // 所对应的采集器
    };
    }
    static audit(artifacts) {
    const sources = JSON.parse(artifacts.ResourceGatherer); // 获取采集内容
        if (!sources.length) {
            return {
                numericValue: 0,
                score: 1,
                displayValue: "No list found",
            };
        }
        const durations = sources.map((d) => d.duration);
        const duration = durations.reduce((prev, next) => prev + next, 0);
        // 10s,5s
        const score = duration > 5 ? 100 - 10*(duration - 5) : 100;length; // 计算总分
        return {
        numericValue: duration, // 检测值
        score, // 得分
        details: {
            items: loadMetrics, // 详情
        },
        displayValue: `Query render avarage timing is ${parseInt(
            duration,
            10
        )}ms`,
        };
    }
    }

   ```

大体思考是：利用 Performance API 的能力，通过 window.performance.getEntries()获取当前页面的各种类型资源，再通过自定义的审计器来对数据分析给出结果；

4. 第三库漏洞的搜集和审计的流程分析？
   这里直接给出思路：

- 先搜集页面加载了的第三方库，获取这些库的名称和版本号；
- 再去 snyk 中查看该库的版本是否有漏洞，以及漏洞程度；

以上两步骤，第二步比较脚本，这里我们来追踪一下 Lighthouse 是怎么获取第三方库的；

下面我们关注下 Lighthouse 源码是怎么实现的

5. 关于 Lighthouse 搜集和审计第三方库的--[Detected JavaScript libraries](https://web.dev/js-libraries/)

首先我们找到 js-libaries 的审计器;(检测出页面所加载的第三方库)
我们从 Lighthouse 的 report 中可以看到如上述代码展示：
**[report 中的 audius 的 js-libraries 属性]**

搜[审计器源码](https://github.com/GoogleChrome/lighthouse/blob/ecd10efc8230f6f772e672cd4b05e8fbc8a3112d/lighthouse-core/audits/dobetterweb/js-libraries.js)如下，比较简单，及把 Stacks 搜集器的数据处理输出；

```
class JsLibrariesAudit extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "js-libraries",
      title: "Detected JavaScript libraries",
      description: "All front-end JavaScript libraries detected on the page.",
      requiredArtifacts: ["Stacks"],
    };
  }

  /**
   * @param {LH.Artifacts} artifacts
   * @return {LH.Audit.Product}
   */
  static audit(artifacts) {
    const libDetails = artifacts.Stacks.filter(
      (stack) => stack.detector === "js"
    ).map((stack) => ({
      name: stack.name,
      version: stack.version,
      npm: stack.npm,
    }));

    /** @type {LH.Audit.Details.Table['headings']} */
    const headings = [
      { key: "name", itemType: "text", text: "Name" },
      { key: "version", itemType: "text", text: "Version" },
    ];
    const details = Audit.makeTableDetails(headings, libDetails, {});

    return {
      score: 1, // Always pass for now.
      details,
    };
  }
}
```

这里我们主要关注 'Stacks'--这个是我们对应要查找的搜集器；
[Stacks 搜集器源码](https://github.com/GoogleChrome/lighthouse/blob/ecd10efc8230f6f772e672cd4b05e8fbc8a3112d/lighthouse-core/lib/stack-collector.js)
我们看重要的部分，部分源码如下：

```
const libDetectorSource = fs.readFileSync(
  require.resolve('js-library-detector/library/libraries.js'), 'utf8');

async function detectLibraries() {
  /** @type {JSLibrary[]} */
  const libraries = [];

  // d41d8cd98f00b204e9800998ecf8427e_ is a consistent prefix used by the detect libraries
  // see https://github.com/HTTPArchive/httparchive/issues/77#issuecomment-291320900
  /** @type {Record<string, JSLibraryDetectorTest>} */
  // @ts-ignore - injected libDetectorSource var
  const libraryDetectorTests = d41d8cd98f00b204e9800998ecf8427e_LibraryDetectorTests; // eslint-disable-line

  for (const [name, lib] of Object.entries(libraryDetectorTests)) {
    try {
      const result = await lib.test(window);
      if (result) {
        libraries.push({
          name: name,
          icon: lib.icon,
          version: result.version,
          npm: lib.npm,
        });
      }
    } catch (e) {}
  }

  return libraries;
}
```

从上面逻辑我们可以看出：
核心是 libraryDetectorTests 对象，
之后核心代码 const result = await lib.test(window);
那 libraryDetectorTests 对象怎么找到呢？
上文有

```
const libDetectorSource = fs.readFileSync(
  require.resolve('js-library-detector/library/libraries.js'), 'utf8');
```

我们从[js-library-detector 库](https://github.com/johnmichel/Library-Detector-for-Chrome)的源码中查找到该文件[js-library-detector/library/libraries.js](https://github.com/johnmichel/Library-Detector-for-Chrome/blob/master/library/libraries.js);
这么我们展示部分源码来分析：
源码如下：

```
var d41d8cd98f00b204e9800998ecf8427e_LibraryDetectorTests = {
  "Lo-Dash": {
    id: "lodash",
    icon: "lodash",
    url: "https://lodash.com/",
    npm: "lodash",
    test: function (win) {
      var _ = typeof (_ = win._) == "function" && _,
        chain = typeof (chain = _ && _.chain) == "function" && chain,
        wrapper = (
          chain ||
          _ ||
          function () {
            return {};
          }
        )(1);

      if (_ && wrapper.__wrapped__) {
        return { version: _.VERSION || UNKNOWN_VERSION };
      }
      return false;
    },
  },
   jQuery: {
    id: "jquery",
    icon: "jquery",
    url: "http://jquery.com",
    npm: "jquery",
    test: function (win) {
      var jq = win.jQuery || win.$;
      if (jq && jq.fn && jq.fn.jquery) {
        return {
          version: jq.fn.jquery.replace(/[^\d+\.+]/g, "") || UNKNOWN_VERSION,
        };
      }
      return false;
    },
  },
}
```

再结合搜集器的代码逻辑

```
const result = await lib.test(window);
```

So,怎么实现获取 url 的第三方库明了了；再浏览器上试试这个 test；
如图：
![test](https://github.com/huwuji/zn-weekly/blob/master/src/Images/lighthouse-2.png)
果然如此：

这部分总结：
及通过 libraries 定义的检查数组一个个再页面上执行检测方法；

继续思考：
如果打包压缩方式改变了，这么的检测函数也是需要对应修改的；

> [Lighthouse JSlibraries Audits 源码](https://github.com/GoogleChrome/lighthouse/blob/ecd10efc8230f6f772e672cd4b05e8fbc8a3112d/lighthouse-core/audits/dobetterweb/js-libraries.js)

> [Lighthouse JSstack Gatherer stack-collector.js 源码](https://github.com/GoogleChrome/lighthouse/blob/ecd10efc8230f6f772e672cd4b05e8fbc8a3112d/lighthouse-core/lib/stack-collector.js)

> [Lighthouse DetectorLibraries 列表](https://github.com/johnmichel/Library-Detector-for-Chrome/blob/master/library/libraries.js)
> 来自 js-library-detector npm 包

> <https://web.dev/lighthouse-best-practices/>

> <https://web.dev/no-vulnerable-libraries/>
