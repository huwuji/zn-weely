
1. 参照官网：
注意的是设置环境变量
`
export PATH="$PATH:'pwd'/flutter/bin"
` 
>pwd查询flutter SDK的安装路径


2.  flutter packages(pub) get 的时候卡住；
处理方式：
需要在当前目录下再一次
`
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
`
原因有可能是之前的环境变量知识临时的

或者取消国内镜像，直接翻墙

然后在
执行一下 flutter doctor -v 命令。

然后再执行 flutter packages get 即可。


3.  Running Gradle task 'assembleDebug'...卡住
修改本地flutter  SDK安装目录中的flutter.gradle文件（参考我的文件路径：
```
修改如下：buildscript {
    repositories {
        // 这里做了修改，使用国内阿里的代理
        // google()
        // jcenter()
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.5.0'
    }
}
```
