## 1.import的另一种使用  *动态import*

参考：1.基本使用mdn: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import

2.实践使用：[Evaluating JavaScript code via import()](https://2ality.com/2019/10/eval-via-import.html)

1.基本使用
import()
一个类似函数的动态 import()，它不需要依赖 type="module" 的script标签。

语法：
```
var promise = import("module-name");//这是一个处于第三阶段的提案。
```

关键字import可以像调用函数一样来动态的导入模块。以这种方式调用，将返回一个 promise。

```import('/modules/my-module.js')
  .then((module) => {
    // Do something with the module.
  });```

  这种使用方式也支持 await 关键字。

  ```
  let module = await import('/modules/my-module.js');
  ```

  2.实践使用
  ```
    const js = `console.log('Hello everyone!');`;
    const encodedJs = encodeURIComponent(js);
    const dataUri = 'data:text/javascript;charset=utf-8,'
        + encodedJs;
    import(dataUri);
    ```
-----
    ```
    const js = `export default 'Returned value'`;
    const dataUri = 'data:text/javascript;charset=utf-8,'
     + encodeURIComponent(js);
    import(dataUri)
    .then((namespaceObject) => {
      assert.equal(namespaceObject.default, 'Returned value');
    });
    ```
----
转化base64

    ```
    function esm(templateStrings, ...substitutions) {
        let js = templateStrings.raw[0];
        for (let i=0; i<substitutions.length; i++) {
        js += substitutions[i] + templateStrings.raw[i+1];
        }
        return 'data:text/javascript;base64,' + btoa(js);
    }

    const m1 = esm`export function f() { return 'Hello!' }`;
    const m2 = esm`import {f} from '${m1}'; export default f()+f();`;
    import(m2)
        .then(ns => assert.equal(ns.default, 'Hello!Hello!'));
    ```


## 2.