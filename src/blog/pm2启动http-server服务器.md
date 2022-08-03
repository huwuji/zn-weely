### pm2 启动 http-server 服务器

1. http-server 是什么？

   - [npm 地址](https://www.npmjs.com/package/http-server)
   - 它是一个简单的，零配置的命令行静态 HTTP 服务器；
   - 使用如下：

     ```
        http-server [path] [options]
     ```

2. pm2 是什么？

   - [pm2 npm 地址](https://www.npmjs.com/package/pm2)
   - PM2 是带有内置负载均衡器的 Node.js 应用程序的进程管理器；
   - 基础指令

   ```
    // 启动
    pm2 start app.js

    pm2 list
    pm2 stop     <app_name|namespace|id|'all'|json_conf>
    pm2 restart  <app_name|namespace|id|'all'|json_conf>
    pm2 reload   <app_name|namespace|id|'all'|json_conf>
    pm2 delete   <app_name|namespace|id|'all'|json_conf>

    // 监控直接从命令行启动的所有进程
    pm2 monit

    // 查看日志
    pm2 logs
   ```

3. pm2 启动 http-server 服务器
   步骤：

   - 找到 http-server 的安装位置
     $ which http-server
     // 比如这是个人在阿里云 ecs 中的安装位置 /usr/local/bin/http-server
   - 启动 ：静态化 ./app/ 目录下文件，对外暴露 8080 端口
     pm2 start /usr/local/bin/http-server ./app/ -- --port 8080

4. 查看: ip:8080
   这里如果没有访问到，先检查端是否配置；
