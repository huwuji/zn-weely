## javascript 变量的存储
  1. 脚本层面javascript的定义：
    * 全局变量:var 定义和let，const定义的全局变量的区别
    * 局部变量
    * 被捕捉变量（例如：闭包函数中被使用的变量）

  2. 浏览器环境下的结构显示：
    > 使用console.dir来打印。console.dir()可以显示一个对象所有的属性和方法。
    * 全局变量：绑定在[[Scopes]]属性下。其中let和const 会并列于global对象存储(这里我们叫script对象)。var是在global下的window对象下新增一个属性。
    * 函数中的局部变量在方法执行完后会被清楚。
    * 被捕捉对象：例如闭包中被捕捉的对象会在[[Scopes]]下的clourse下存储。

  3. 从计算机内存的角度看：
    * 全局变量：存储在堆heap中
    * 局部变量：存储在栈stack中。stack结构在执行完后会被清空。（todo 这里要深入了解下内存中heap和stack的功能）
    * 被捕捉变量（例如：闭包函数中被使用的变量）：存储在堆heap中

todo：这里要深入了解下内存中heap和stack的功能
 文档地址：https://www.gribblelab.org/CBootCamp/7_Memory_Stack_vs_Heap.html