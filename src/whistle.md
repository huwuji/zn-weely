### whistle
中文文档：https://wproxy.org/whistle/

什么是whistle?
引用文档的描述：基于Node实现的跨平台web调试代理工具；

笔者为什么使用whistle?
1.笔者之前使用charles,穷，没装正版，每使用一段时间就会掉线。
2.whistle使用更简单。作为程序猿，基于命令行的启动和配置比使用客户端来说更有逼格。

1. whistle的安装：
可参考官网：https://wproxy.org/whistle/install.html
简单步骤如下：
    1）安装node,推荐最新node.(可访问https://nodejs.org/，找到合适的node版本，默认安装)
    2）安装whistle；
        $ npm install -g whistle
        or $ yarn global add whistle
    
    3）测试是否安装成功 w2 help 或 whistle help

    4） 启动whistle
        w2 start
        其他命令自行参照官网
    

2. 配置代理。
基本配置代理参照官网；http://wproxy.org/whistle/webui/https.html

3. 安装根证书；这里需要注意，笔者在这里掉入过坑。
    1）不选中 Capture TUNNEL CONNECTs，先在电脑端安装证书，并设置证书信任。
    2）移动端安装证书，不选中 Capture TUNNEL CONNECTs，输入rootca.pro进行安装。
    在安卓端安装好证书后，默认是信任的，而在ios上，需要在找到证书，打开信任开关，
    ios----“设置”>“通用”>“关于本机”>“证书信任设置”；

    3）在pc端选中 Capture TUNNEL CONNECTs，即可抓取https的请求。

    4）若要代理请求，需要在rules中配置代理规则，比如/test.com/i  https://127.0.0.1