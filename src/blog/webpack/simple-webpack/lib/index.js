const Compiler = require("./compiler");

const options = require("../webpack.config");

const compiler = new Compiler(options);
compiler.run();
