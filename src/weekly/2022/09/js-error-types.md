### JS 的 Error 类型

当运行时错误产生时，Error 对象会被抛出;

- Error 基础类型
  Error 是基类型,其他内置错误类型都是继承该类型;

- SyntaxError 语法错误；常见

  ```
  var num == 1;

  // Uncaught SyntaxError: Unexpected token '=='
  ```

- TypeError 类型错误：变量或参数不属于有效类型； 常见

  ```
  var num = 1;
  num();

  // Uncaught TypeError: num is not a function
  ```

- ReferenceError 引用错误：无效引用；如使用未声明的变量 ; 常见

  ```
  console.log(num);

  // ReferenceError: num is not defined
  ```

- RangeError 范围错误：数值变量或参数超出其有效范围；数值越界或者栈溢出； 不太常见

  ```
  function add(num){
        if(num>0){
            return add(num);
        }
    }
    add(1);
    // Uncaught RangeError: Maximum call stack size exceeded

    // or
    new Array(-1)
    // Uncaught RangeError: Invalid array length
  ```

- URIError 给 encodeURI() 或 decodeURI() 传递的参数无效； 不常见

  ```
  encodeURIComponent(' ');
  //  '%20'

  decodeURIComponent('%20');
  // ' '

  decodeURIComponent('%');
  // Uncaught URIError: URI malformed
  ```

- EvalError 在使用 eval()函数发生异常时抛出； 稀少

- ...更多，请查看下面参考

> JSError 类型 MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

> 关于错误类型的更多详细的种类描述 MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors
