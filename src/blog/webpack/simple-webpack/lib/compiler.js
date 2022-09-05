const path = require("path");
const fs = require("fs");

const { getAST, getDependencies, transform } = require("./parse.js");

module.exports = class Compiler {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
    this.id = "";
  }

  /**
   * 执行器， 循环执行模块构建，构建bundle文件并输出到磁盘
   */
  run() {
    const entryModule = this.buildModule(this.entry, true);
    this.modules.push(entryModule);

    this.modules.map(({ depedencies = [] }) => {
      depedencies.map((depModulePath) => {
        const depModule = this.buildModule(depModulePath);
        this.modules.push(depModule);
      });
    });
    // 输出bundle
    this.emit();
  }

  /**
   * 解析-处理模块，并收集依赖，生成模块对象；
   * @param {*} filename
   * @param {boolean} isEntry 是否是入口模块
   */
  buildModule(filename, isEntry = false) {
    const absolutePath = isEntry
      ? filename
      : path.join(process.cwd(), "./src", filename); // todo这里‘./src是因为目前项目结构比较简单，都是在src目录下’
    const ast = getAST(absolutePath, true);
    const depedencies = getDependencies(ast);

    const code = transform(ast);

    const module = {};
    module.depedencies = depedencies;
    module.code = code;
    module.id = absolutePath;
    // todo
    module.maps = depedencies.reduce((total, current) => {
      total[current] = this.id;
      return total;
    }, {});
    module.map = {
      [filename]: absolutePath,
    };
    return module;
  }

  /**
   * 构建bundle文件并输出到磁盘
   * todo 后续补充对于配置split chunks后，chunk生成的逻辑,以及输出bundle名称，是否使用hash ...
   * 目前只是简单的输出一个bundle文件
   */
  emit() {
    const outputDir = this.output.path || path.join(process.cwd, "./dist");
    const outputFile = path.join(outputDir, this.output.filename);

    // 处理所有module文件，封装成key-value的结构，后续作为对象属性调用
    let maps = {};
    let modules = "";
    this.modules.map(({ id, code, map }) => {
      modules += `'${id}': function (require, module, exports) { ${code} },`;
      maps = Object.assign(maps, map);
    });
    maps = JSON.stringify(maps);
    // 提供require函数，并调用执行module，本身是个IIFE函数
    let bundle = `
      (function(modules,maps){
          
        function require(filename){
            const id=maps[filename];
            const fn= modules[id];
            const module = { exports : {} };
            fn(require,module,module.exports);
            return module.exports;
        };
        require('${this.entry}');
      })({${modules}},${maps})
      `;

    console.log("outputFile=", outputFile);
    if (fs.existsSync(outputFile)) {
      fs.rmSync(outputFile);
    }
    fs.writeFileSync(outputFile, bundle, "utf-8");
  }
};
