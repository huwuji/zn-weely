#### 组合
1. 栗子
```
var compose = function(f,g) {
  return function(x) {
    return f(g(x));
  };
};
```