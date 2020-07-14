一. 前端怎么做CI
引用：https://www.zhihu.com/question/60194439?sort=created

1. 基于gitlab和jenkins做CI
        gitlab 用于代码版本管理，并通过其提供的 webhook 功能，触发 jenkins job 的运行。
        jenkins 用来执行项目中 单元测试，编译打包相关 npm 命令，并发送反馈邮件，执行远程部署脚本。
        nodejs 用于提供单元测试，编译打包功能的 npm 命令

    1.1 没有CI的情况下，前端从开发从开发到提测的流程：  
        1.本地编写代码，
        2.本地跑测试脚本（npm run unit,查看单元测试）
        3.提交代码到远程（ push origin）
        4.登陆测试服务器，拉取远端代码，再构建项目（npm run build）
        5.如果测试服务器是基于 pm2 的 proxy server，还需要重启 server

    1.2 引入CI/CD后的流程：
        1.本地编写代码，
        2.push 到git仓库，(push之前，添加commit钩子，preCommit进行eslint检查)
        3.git hooks触发jenkins的构建job（自动）
        4.jenkins拉取项目代码，运行npm run unit和npm run build，（自动跑单元测试和构建项目），如果失败，发邮件通知相关人，
        5.jenkins的job在build成功后自动执行部署脚本

二。 前端工程化：
    1.前端测试框架:mocha和karma