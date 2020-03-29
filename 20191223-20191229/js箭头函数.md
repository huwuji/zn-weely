## 箭头函数
>引用mdn：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions


箭头函数表达式的语法比函数表达式更简洁，并且没有自己的this，arguments，super或new.target。箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。
1.  没有单独的this  
 在箭头函数出现之前，每一个新函数根据它是被如何调用的来定义这个函数的this值：
* 如果是该函数是一个构造函数，this指针指向一个新的对象
* 在严格模式下的函数调用下，this指向undefined
* 如果是该函数是一个对象的方法，则它的this指针指向这个对象
*  箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this
等等
2. 不绑定arguments
3. 箭头函数不能用作构造器，和 new一起用会抛出错误。
4. 箭头函数没有prototype属性。
5.  yield 关键字通常不能在箭头函数中使用（除非是嵌套在允许使用的函数内）。因此，箭头函数不能用作函数生成器。