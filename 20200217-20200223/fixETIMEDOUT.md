问题：用yarn和npm安装依赖时出现ETIMEDOUT问题；
问题原因：资源地址请求超时。可能因为设置到一个错的代理才导致。
解决方式：
1. 采用cnpm镜像解决。
    输入下面这个命令，安装完成之后，再接着安装就好了
    npm install -g cnpm --registry=https://registry.npm.taobao.org
    cnpm install
2. 把资源地址设置成npm淘宝源
npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist
    
    再移除代理
    npm config rm proxy //or  npm config delete proxy
npm config rm https-proxy