# crp-startkit

> 一个更新不及时的项目启动脚手架

## 特点
1. 使用airbnb的eslint代码规范检查, 如有提示语法错误,请参考 [http://eslint.org/](http://eslint.org/)
2. package.json中可以定义参数,让webpack载入不同的全局参数,以区分开发和部署的环境,加载的配置文件是[arguments.config.js](arguments.config.js)
3. 使用axios作为ajax请求插件,使用方法没有什么特别的。。。
5. vue-router和vuex已经集成在内
6. 使用了vux作为ui框架,内置大量常用功能,请好好利用! [https://vux.li/](https://vux.li/)
7. 已经在main.js中全局预先定义了api请求根目录
7. 在api-mixins.js中使用了async await , 并且做了错误处理
8. 在index中的九宫格,有几个基础事件的例子
9. router的组件定义,全部使用异步加载组件
10. 在filters-mixins.js中,已经预先定义了一些常用的方法
11. 已经继承sass-loader和less-loader
12. 主要css使用postcss-scss

## 开始开发
1. 根目录下执行 yarn install
2. 根据package.json执行开发环境启动,如 run-script "dev dev"

## 发布
1. 根据package.json执行构建命令,如 run-script "build dev"
2. 将splash.jpg/index.html和dist文件夹传到Apache或者iis里
