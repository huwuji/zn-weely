### ssh
参考：
* https://zh.wikipedia.org/wiki/Secure_Shell
* https://yq.aliyun.com/articles/269047

### 查看进程占用
查看进程占用

lsof -i tcp:8080 

该命令会显示占用8080端口的进程，有其 pid ,可以通过pid关掉该进程

杀死进程 

kill pid


### linux怎么查看浏览器某个进程的内存信息
>Linux: ps command

使用 ps 命令可以确定有哪些进程正在运行和运行的状态、进程是否结束、进程有没有僵死、哪些进程占用了过多的资源等等，总之大部分信息都是可以通过执行该命令得到的。
```
命令1：ps
作用：查看当前终端运行的程序

其他用法：ps ax
作用：列出这台电脑上正在运行的所有程序

```


### node 开启debug模式
参考：https://nodejs.org/api/debugger.html

```
//test.js
function test() {
    let result = 1
    debugger
    console.log('start test', result)
    result = 1 + 1;
    debugger
    console.log('start test', result)
}
test()

$ node inspect test.js
```
开启：node inspect **.js
>
Stepping#
* cont, c: Continue execution
* next, n: Step next
* step, s: Step in
* out, o: Step out
* pause: Pause running code (like pause button in Developer Tools)
Breakpoints#
* setBreakpoint(), sb(): Set breakpoint on current line
* setBreakpoint(line), sb(line): Set breakpoint on specific line
* setBreakpoint('fn()'), sb(...): Set breakpoint on a first statement in functions body
* setBreakpoint('script.js', 1), sb(...): Set breakpoint on first line of script.js
* clearBreakpoint('script.js', 1), cb(...): Clear breakpoint in script.js on line 1

### 解密 VS Code 断点调试的原理
来源：解密 VS Code 断点调试的原理
个人理解：
todo