(function (modules, maps) {
  function require(filename) {
    const id = maps[filename];
    const fn = modules[id];
    const module = { exports: {} };
    fn(require, module, module.exports);
    return module.exports;
  }
  require("/Users/zhangneng/Job/zn-weekly/src/blog/webpack/simple-webpack/src/index.js");
})(
  {
    "/Users/zhangneng/Job/zn-weekly/src/blog/webpack/simple-webpack/src/index.js":
      function (require, module, exports) {
        "use strict";

        var _print = _interopRequireDefault(require("./print.js"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        document.write((0, _print["default"])());
      },
    "/Users/zhangneng/Job/zn-weekly/src/blog/webpack/simple-webpack/src/print.js":
      function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports["default"] = void 0;

        var print = function print() {
          console.log("hello world");
          return "hello world";
        };

        var _default = print;
        exports["default"] = _default;
      },
  },
  {
    "/Users/zhangneng/Job/zn-weekly/src/blog/webpack/simple-webpack/src/index.js":
      "/Users/zhangneng/Job/zn-weekly/src/blog/webpack/simple-webpack/src/index.js",
    "./print.js":
      "/Users/zhangneng/Job/zn-weekly/src/blog/webpack/simple-webpack/src/print.js",
  }
);
