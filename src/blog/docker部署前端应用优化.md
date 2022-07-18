### docker 部署前端应用优化

#### 一般情况下，一个 CSR 应用的部署步骤如下

- 安装依赖
- 编译，打包，生成静态文件
- 服务化静态资源

对应 Dockerfile 文件编写如下

```
    # 选择基础镜像，基于node环境打包，而使用alpine版本减小体积
    FROM node:alpine

    # 创建工作目录
    WORKDIR /code

    # 复制前端文件到工作目录
    COPY . /code

    # 安装依赖，打包构建
    RUN yarn install && yarn run build

    # 创建服务器
    RUN yarn global add http-server

    # 暴露端口
    EXPOSE 8080

    #服务化静态资源 ./dist-- 打包后的静态文件的相对位置
    CMD  http-server ./dist
```

上面是一个简易的前端部署的流程，但是存在这些问题：

- 镜像的大小会比较大，对于这样的一个前端项目，我们部署的时候只需要最后打包完的静态资源
- 每次构建镜像的时候，时间比较长

#### 利用构建缓存

> 关于利用缓存参考如下：
> <https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#leverage-build-cache>
> 简单来说，就是在 ADD 和 COPY 的每一步，都会先进行校验，判定是否可以利用之前的缓存；这个构建过程为一层层写文件；

对上面的 Dockefile,我们来分析下，

- 如： # 创建服务器
  RUN yarn global add http-server
  这个操作只依赖一个 node 的上下文环境，可以提前写入；

- 如： # 安装依赖，打包构建
  RUN yarn install && yarn run build
  环节
  yarn install 的安装依赖的是 package.json 以及 yarn.lock 文件，这些文件比较少的会变动，我们可以拆分开来；

对应更改 Dockerfile 如下

```
    # 选择基础镜像，基于node环境打包，而使用alpine版本减小体积
    FROM node:alpine

    # 创建服务器
    RUN yarn global add http-server

    # 创建工作目录
    WORKDIR /code

    # 利用构建缓存，先写入
    COPY package.json yarn.lock /code
    RUN yarn install

    # 复制前端文件到工作目录
    COPY . /code

    # 安装依赖，打包构建
    RUN  yarn run build

    # 移除node_modules
    RUN rm -rf /node_modules

    # 暴露端口
    EXPOSE 8080

    #服务化静态资源 ./dist-- 打包后的静态文件的相对位置
    CMD  http-server ./dist
```

这样的构建方式，即使移除了 node_modules 文件，镜像还是比较大，怎么再一步优化呢？

#### 多阶段构建

> 参考：
> <https://docs.docker.com/develop/develop-images/multistage-build/>

首先我们应该知道，即使是 node:alpine，它的大小还是比 nginx:alpine 大；
再构建阶段，我们需要在 node 上下文下。而在服务化静态文件的时候，我们可以使用更小的 nginx；

更改的 Dockerfile 如下：

```
    # 选择基础镜像，基于node环境打包，而使用alpine版本减小体积
    FROM node:alpine as builder

    # 创建工作目录
    WORKDIR /code

    # 利用构建缓存，先写入
    COPY package.json yarn.lock /code
    RUN yarn install

    # 复制前端文件到工作目录
    COPY . /code

    # 安装依赖，打包构建
    RUN  yarn run build

    # 进入下一个阶段

    # 选择nginx:alpine镜像
    FROM nginx:alpine

    # 复制我们自己的配置 default.conf 在下面
    COPY --from=builder /code/default.conf   /etc/nginx/conf.d/

    # 复制资源到nginx 目录
    COPY --from=builder /code/dist /usr/share/nginx/html

```

可以对比下镜像大小，目前静态资源不大，整个镜像就 20+MB；

再思考下，我们如果静态资源比较大的话，我们还能做什么优化呢？

### 使用 CND

分析一下我们前端的静态资源
一般可以分为这么几部分：

- /dist/index.html
- /dist/static/ 项目中一般通过相对路径引用的静态资源；
- /dist/public/ 被打包的业务代码或者第三方代码，通常会带有[contentHash]值。

上面这些文件我们可以把/dist/public/都推送到 CDN 上，设置永久缓存（存在文件 hash 值）；
/dist/static/ 实际上也可以被推入 CDN ，设置缓存时不能太长，不然文件修改了，用户端不强刷新可能不会及时更替过来；

更改的 Dockerfile 只需要在构建环境新增一个执行推送文件到 CDN 的脚本指令；
当然需要先编写这个推送指令；
