### Decorator 装饰器

>衍生知识点：高阶函数，装饰器模式

1. 基本形式：
```
@ + 函数名。可以放在类或者类方法的前面，用来修饰类或者类方法，（注意不能用来修饰函数，如果要修饰函数的话，直接用高阶函数的调用方式）。
个人理解，这可以理解为是高阶函数调用的某种情况下的语法糖。
```

2. 类的装饰
1）装饰类的静态方法：
如下：  
```
function decoratorTest(target){
    target.getTestResult=function(){
        console.log('test success');
    }
}

@decoratorTest
class MathTest{

};

MathTest.getTestResult();//'test success'
```

如上代码用直接表达为：
```
function decoratorTest(target){
    target.getTestResult=function(){
        console.log('test success');
    }
};

class MathTest{

};

decoratorTest(MathTest)

MathTest.getTestResult();//'test success'

```

如上代码如果想再支持更多参数，可以再包一层函数，如下：
```
function decoratorTestWrap(...args){
    return function decoratorTest(target){
         target.getTestResult=function(otherArgs){
        console.log(`test success`,args,otherArgs);
    }
    }
};

class MathTest{
//
};

decoratorTestWrap('isTest')(MathTest)

MathTest.getTestResult('otherArgs');//["isTest"] otherArgs

```

2)装饰类的实例方法
可以通过目标类的prototype对象操作，当目标类实例后就可以调用；
这种方式可以简单理解成
```
function decoratorTest(target){
    target.prototype.getTestResult=function(){
        console.log('test success');
    }
}

@decoratorTest
class MathTest{

};

new MathTest().getTestResult();//'test success'
```

以上方式等价于
```
function decoratorTestWrap(...args){
    return function decoratorTest(target){
         target.prototype.getTestResult=function(otherArgs){
        console.log(`test success`,args,otherArgs);
    }
    }
};

class MathTest{
//
};

decoratorTestWrap('isTest')(MathTest)

new MathTest().getTestResult('otherArgs');//["isTest"] otherArgs

```

3. 方法的装饰(类的属性)
装饰器不仅可以装饰类，还可以装饰类的属性。

```
class MathTest{

    readOnly(target,name,descriptor){
        // descriptor对象原来的值如下
        // {
        //   value: specifiedFunction,//(指定功能)
        //   enumerable: false,
        //   configurable: true,
        //   writable: true
        // };
        const olderFunc=descriptor.value;
        descriptor.value=function(...args){
            console.log('new specifiedFunction readOnly');
            descriptor.writable = false;
            olderFunc.apply(target,args)
            return descriptor
        }
    }

    @readOnly
    grade(){

    }

};

MathTest.grade();
```

如上等同于
```

function readOnly(target,name,descriptor){
    // descriptor对象原来的值如下
    // {
    //   value: specifiedFunction,//(指定功能)
    //   enumerable: false,
    //   configurable: true,
    //   writable: true
    // };
    const olderFunc=descriptor.value;
    descriptor.value=function(...args){
        console.log('new specifiedFunction readOnly');
        descriptor.writable = false;
        olderFunc.apply(this,args)
        return descriptor
    }
}

class MathTest{
    getGrade(){

    }

    setGrade(){

    }
};
    
readOnly(MathTest.prototype,'getGrade',Object.getOwnPropertyDescriptor(MathTest.prototype, 'getGrade'))

```

栗二：
```
class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function() {
    console.log(`Calling ${name} with`, arguments);
    return oldValue.apply(this, arguments);
  };

  return descriptor;
}

const math = new Math();

// passed parameters should get logged now
math.add(2, 4);

```

等同于
```
class Math {
    add(a, b) {
        console.log(`add result==`,a + b);
        return a + b;
    }
}

const setDescriptor=function(target,name){
   return Object.getOwnPropertyDescriptor(target,name)
} 

function log(target,name,getDescriptor){
    const descriptor=getDescriptor(target,name);
    const olderValue=descriptor.value;
    descriptor.value=function name(...args){
        console.log("loglogloglog===");
        olderValue.apply(this,args)
    }
}

log(Math.prototype,'add',setDescriptor)

const math = new Math();

math.add(2, 4);
```

等同于
```
class Math {
    add(a, b) {
        console.log(`add result==`,a + b);
        return a + b;
    }
}

const descriptor= Object.getOwnPropertyDescriptor(Math.prototype,'add')

Object.defineProperty(Math.prototype,'add',
    {
        value:function add(a, b,...args){
            console.log(`add function args`, a, b,...args);
            return descriptor.value.call(this,a,b);
            },
        enumerable: false,
        configurable: true,
        writable: true
    }
)

const math = new Math();

math.add(2, 4);
```


4. 为什么@+function装饰器不能用于函数
装饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。类是不会提升的，所以就没有这方面的问题。

5. 函数利用装饰者模式包装功能
如下：
```
function add(a,b){console.log('add',a,b);return a+b}

function log(fn){
    return function(a,b){
            console.log('log',a,b,fn);
        return  fn(a,b);
    }
}

add(1,2);//
log(window.add)(1,2);//
```