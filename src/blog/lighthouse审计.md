#### Lighthouse 审计

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
   
   往下我们继续思考：

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
   指定浏览器页面打开 url-利用 chrome 远程调试协议连接对应 chrome 页面端口-收集数据-审查数据-生成报告；

   以上是 Lighthouse 的相关工作原理；
   那我们是不是也可以自定义收集器和审计器来检查出漏洞库呢？

3. 自定义收集器和审计器
   首先我们先以一个自定义检验 Script 资源加载的总时长的收集器和审计器入手；
   代码如下：

   ```
   <!-- 收集器 -->
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

那对于第三库漏洞的审计是不是也可以按这样的方式？
利用 performance.getEntries(),我们可以从中筛选出

- entryType=== "resource"
- initiatorType=== "script"
  的资源。
  与 snyk 提供的漏洞库文件对比，识别出漏洞文件；
  snyk/snapshot.js 格式如下：

```
{
  "npm": {
      "jquery": [
      {
        "id": "SNYK-JS-JQUERY-569619",
        "severity": "medium",
        "semver": { "vulnerable": ["<1.9.0"] }
      },
      {
        "id": "SNYK-JS-JQUERY-567880",
        "severity": "medium",
        "semver": { "vulnerable": [">=1.2.0<3.5.0"] }
      },
      {
        "id": "SNYK-JS-JQUERY-565129",
        "severity": "medium",
        "semver": { "vulnerable": [">=1.5.1<3.5.0"] }
      },
      {
        "id": "SNYK-JS-JQUERY-174006",
        "severity": "medium",
        "semver": { "vulnerable": ["<3.4.0"] }
      },
      {
        "id": "npm:jquery:20160529",
        "severity": "low",
        "semver": { "vulnerable": [">=3.0.0-rc1<3.0.0"] }
      },
      {
        "id": "npm:jquery:20150627",
        "severity": "medium",
        "semver": {
          "vulnerable": ["<1.12.2", ">=1.12.3<2.2.0", ">=2.2.3<3.0.0"]
        }
      },
      {
        "id": "npm:jquery:20140902",
        "severity": "medium",
        "semver": { "vulnerable": [">=1.4.2<1.6.2"] }
      },
      {
        "id": "npm:jquery:20120206",
        "severity": "medium",
        "semver": { "vulnerable": ["<1.9.1"] }
      },
      {
        "id": "npm:jquery:20110606",
        "severity": "medium",
        "semver": { "vulnerable": ["<1.6.3"] }
      }
    ],
    "jquery-mobile": [
      {
        "id": "SNYK-JS-JQUERYMOBILE-174599",
        "severity": "medium",
        "semver": { "vulnerable": ["<=1.5.0-alpha.1"] }
      },
      {
        "id": "npm:jquery-mobile:20120802",
        "severity": "medium",
        "semver": { "vulnerable": ["<1.2.0"] }
      }
    ],
  }
```

但是：
这里也有更多特殊情况：
比如第三方库和众多包一起打包在 vendors 中？

    思路：找到vendors资源，解析资源找出各个第三方包，再与snyk的文件比较；
    ---todo--
    是否存在更好的方式呢？
    需要继续后续调研；

    该审计器的实践demo todo :

> <https://web.dev/lighthouse-best-practices/>

> <https://web.dev/no-vulnerable-libraries/>
