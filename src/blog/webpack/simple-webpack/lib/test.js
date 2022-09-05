const { getAST, getDependencies, transform } = require("./parse.js");

const path = "../src/index.js";

const testAST = getAST(path);
// console.log("testAST==", testAST);

const dependencies = getDependencies(testAST);
// console.log("dependencies==", dependencies);

const code = transform(testAST);
// console.log("code==", code);
