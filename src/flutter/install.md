
1. 参照官网：
注意的是设置环境变量
`
export PATH="$PATH:'pwd'/flutter/bin"
` 
>pwd查询flutter SDK的安装路径


2. 遇到的问题：
在 flutter packages(pub) get 的时候卡住；
处理方式：
需要在当前目录下再一次
`
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn`
原因有可能是之前的环境变量知识临时的

然后在
执行一下 flutter doctor -v 命令。

然后再执行 flutter packages get 即可。

