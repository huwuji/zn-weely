一.对于webpack的基本功能的了解:
    a.打包：入口文件，出口文件，modules,loader对js，css，等文件的处理，在load过程中用各种plugin去优化处理。
        打包过程几个比较重要的loader：对于js|jsx是babel-loader,然后其他有less-loader,css-loader,style-loader,url-loader,file-loader。
    几个重要的plugin:
        1.对js|jsx语法的混淆和压缩的uglify-plugin;
        2.在webpack3需要的CommonsChunkPlugin,到webpack4内置的splitchunksplugin,在optimization中去配置相关属性设置。
        3.htmlWebpackPlugin 生成html文件
        4.HotModuleReplacementPlugin 热更新组件，dev环境需要
        5.MiniCssExtractPlugin 将多个css文件打成一个link类型的文件，然后利用OptimizeCssAssetsPlugin插件优化压缩
        6.！！OptimizeCssAssetsPlugin对css文件做优化，以前是在css-loader下的一个属性可以做相关功能，后面css-loader在1.1.0以上后，需要使用这样的plugin来实现。
        7.动态inport:babel-plugin-syntax-dynamic-import包，然后在babel-loader的配置上上加上这个这个plugin配置。
        例如：
        
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        'react',
                        [
                            'env',
                            {
                                targets: {
                                    browsers: ['last 2 versions', 'safari >= 7'],
                                    uglify: true,
                                },
                            },
                        ],
                    ],
                    plugins: [
                        'transform-object-rest-spread',
                        'transform-class-properties',
                        'transform-runtime',
                        'transform-object-assign',
                        'react-hot-loader/babel',
                        'babel-plugin-syntax-dynamic-import',//动态加载import
                        [
                            'import',
                            [{
                                libraryName: 'antd',
                                style: true,
                            }],
                        ],
                    ].concat(babelExtraPlugins || []),
                }
              }
            }
          ]
        }

    b.webpack开启服务器：devServer相关需要配置，
    c.devtool 
        source map关键字：
            eval: 使⽤eval包裹模块代码
            source map: 产⽣.map⽂件
            cheap: 不包含列信息
            inline: 将.map作为DataURI嵌⼊，不单独⽣成.map⽂件
            module:包含loader的sourcemap


    d.自动清理构建目录 clean-webpack-plugin

    e.postcssloader是一个后置处理器。它可以添加autoprefixer插件来做自动补齐css3前缀
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: (loader) => [
          require('postcss-import')({ root: loader.resourcePath }),
          require('postcss-cssnext')(),
          require('autoprefixer')(),
          require('cssnano')()
        ]
      }
    }
    f.移动端css的适配问题，一个是可以用css媒体查询实现响应布局。@media screen add (max-width:1080px)
    另一个是通过rem（W3C对rem定义：font-size of the root element）,rem 是一个相对单位。webpack使用px2rem-loader,把px值转化为rem。(设计稿还是以750或者375px来做设计)
    webpack配置如下：
    module.exports = {
        module: {
        rules: [
            {
                'style-loader',
                test: /\.less$/,
                use: [
                    'css-loader',
                    'less-loader',
                     {
                         loader: "px2rem-loader",
                         options: {
                             remUnit: 75,//rem与px的比例
                             remPrecision: 8//px转化成rem的小数位数
                         }
                     }
                ]
                }
            ]
        }
    };
    然后再动态计算根foot元素的font-size值,可以使⽤⼿淘的lib-flexible库，https://github.com/amfe/lib-flexible

    g.通过webpack把资源内联：
        css内联：style-loader或者html-inline-css-webpack-plugin（或者MiniCssExtractPlugin）;
        例如：style-loader方式
            module.exports = {
                module: {
                    rules: [
                        {
                            test: /\.scss$/,
                            use: [
                                {
                                    loader: 'style-loader',
                                    options: {
                                        insertAt: 'top', // 样式插入到 <head>
                                        singleton: true, //将所有的style标签合并成一个
                                    }
                                },
                                "css-loader",
                                "sass-loader"
                            ],
                        },
                    ]
                },
            };

        例如MiniCssExtractPlugin方式：
               module.exports = {
                module: {
                    rules: [
                        {
                            test: /\.scss$/,
                            use:[
                                {
                                    loader: MiniCssExtractPlugin.loader,
                                    options: {
                                        publicPath: './',
                                    },
                                },
                                "css-loader",
                                "sass-loader"
                            ],
                        },
                    ]
                },
            };
            补充：如需要对css做优化的话，需要使用OptimizeCssAssetsPlugin插件，使用方式如下：
             module.exports = {
                  plugins: [
                        new OptimizeCssAssetsPlugin({
                                    assetNameRegExp: /\.css$/g,
                                    cssProcessor: require('cssnano'),
                                    cssProcessorPluginOptions: {
                                    preset: ['default', { discardComments: { removeAll: true } }],
                                    },
                                    canPrint: true
                        })
                  ]
            };
 


        小图片或者字体的内联：url-loader；

        html和js的内联：raw-loader:（尽量使用0.5的稳定版本）
        例如：    raw-loader 内联 html
            <script>${require(' raw-loader!babel-loader!. /meta.html')}</script>
            raw-loader 内联 JS
            <script>${require('raw-loader!babel-loader!../node_modules/lib-flexible')}</script>

        h.基础库和公共代码库的分离：
            1.对于基础库，如react，react-dom或者lodash这些基础包可以通过cdn引入，不打入bundle中。方法是使用html-webpack-externals-plugin:
            (externals:防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。)
            module.exports = {
                  plugins: [
                        new HtmlWebpackExternalsPlungin({
                                 externals:[
                                    {
                                        module:'react',
                                        entry:'//react资源的cdn地址',
                                        global:'React',
                                    },
                                     {
                                        module:'react-dom',
                                        entry:'//react资源的cdn地址',
                                        global:'React',
                                    },
                                 ]
                        })
                  ]
            };
            2.利用splitChunksPlugin进行公共脚本分离（webpakc4,替代webpack3的commonsChunksPlugin）
            optimization: {
                splitChunks: {
                    chunks: 'async',//async 异步引⼊的库进⾏分离(默认), initial 同步引⼊的库进⾏分离, all 所有引⼊的库进⾏分离(推荐)
                    minSize: 30000,
                    maxSize: 0,
                    minChunks: 1,
                    maxAsyncRequests: 5,
                    maxInitialRequests: 3,
                    automaticNameDelimiter: '~',
                    name: true,
                    cacheGroups: {
                        vendors: {
                                test: /[\\/]node_modules[\\/]/,//匹配脚本
                                priority: -10
                            }
                        }
                    }
                }
            };
            3.利用splitChunksPlugin分离基础包，（基础包在chunk中而不是在cdn中）
            module.exports = {
                optimization: {
                    splitChunks: {
                        cacheGroups: {
                            commons: {
                                test: /(react|react-dom)/,//test: 匹配出需要分离的包
                                name: 'vendors',
                                chunks: 'all'
                            }
                        }
                    }
                }
            };
            4.利用splitChunksPlugin分离页面公共文件
            module.exports = {
                optimization: {
                    splitChunks: {
                        minSize: 0,//minuSize: 分离的包体积的⼤⼩
                        cacheGroups: {
                            commons: {
                                name: 'commons',
                                chunks: 'all',
                                minChunks: 2//minChunks: 设置最⼩引⽤次数为2次
                            }
                        }
                    }
                }
            }
            
