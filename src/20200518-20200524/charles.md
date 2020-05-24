### charles使用笔记
1. 安装，官网下载:https://www.charlesproxy.com/download/

2. 破解：https://www.zzzmode.com/mytools/charles/
参照作者教程

3. 具体配置：
3.1 配置charles代理，Proxy-->Proxy setting;
默认配置Http  Proxy  端口是8888.
> 这一步的作用是：在本地机器上开启一个8888端口的进程，用来进行服务监听。之后如果要使用app来抓包的话，需要在app上代理服务来连接这个端口。

3.2 安装https的根证书
Help-->ssl proxying-->install charles root certificate
安装完根证书后，需要选择证书，然后选择始终信任。
> 安装根证书的原因是:https协议需要通过证书来确定安全性

3.3 配置ssl代理
为手机配置ssl代理，把手机代理配置成要访问的机器的ip地址和端口（默认8888）,目的是为了与电脑的8888端口通信。(代理连接成功后，charles会弹出提示有服务连接，允许即可)
手机ssl证书下载。连接后在浏览器上输入chls.pro/ssl




