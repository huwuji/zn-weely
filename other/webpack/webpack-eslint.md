### lint-staged
>>> 参考：1.Npm库 https://www.npmjs.com/package/lint-staged
>>> 2.https://segmentfault.com/a/1190000009546913

```
{
  "scripts": {
    "precommit": "lint-staged"
  },
  "lint-staged": {
    "src/**/*.js": ["eslint", "git add"]
    //  "src/**/*.js": ["eslint --fix", "git add"] 自动修复错误
    // "src/**/*.js": ["prettier --write", "git add"]自动格式化代码（谨慎使用）
  }

```
