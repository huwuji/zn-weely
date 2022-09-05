const fs = require("fs");
const path = require("path");
// const { parse } = require("acorn");
const traverse = require("@babel/traverse").default;
const { transformFromAstSync, parse } = require("@babel/core");

/**
 * 编译js成ast
 * @param {*} filePath
 * @param {boolean} isAbsolute
 * @returns
 */
const getAST = (filePath, isAbsolute = false) => {
  const newPath = isAbsolute ? filePath : path.join(__dirname, filePath);
  const source = fs.readFileSync(newPath, "utf-8");
  return parse(source, {
    sourceType: "module", //module 和 script，主要是严格模式和 import/export 的区别。ES6 中的模块是严格模式，也就是你无须添加 use strict。我们通常浏览器中使用的 script 是没有 import/export 语法的。所以，选择了 script 则出现 import/export 会报错，可以使用严格模式声明，选择了 module，则不用严格模式声明，可以使用 import/export 语法。
  });
};

/**
 * 分析获取依赖
 */
const getDependencies = (ast) => {
  const dependencies = [];
  traverse(ast, {
    ImportDeclaration: function (path) {
      const { node } = path;
      const value = node?.source?.value;
      value && dependencies.push(value);
    },
  });
  return dependencies;
};

/**
 * 对ast进行规则的tranlate，然后直接生成代码
 * ast-->translate-->generate
 * transformFormAst option配置参考https://babel.docschina.org/docs/en/options/
 */
const transform = (ast) => {
  try {
    const { code } = transformFromAstSync(ast, "", {
      presets: ["@babel/preset-env"],
    });
    return code;
  } catch (e) {
    console.log("ast==", typeof ast);
    throw Error("transform=" + e);
  }
};

module.exports = {
  getAST,
  getDependencies,
  transform,
};
