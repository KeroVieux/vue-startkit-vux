# crp-startkit

> 一个更新不及时的项目启动脚手架

## 特点
1. 使用airbnb的eslint代码规范检查, 如有提示语法错误,请参考 [http://eslint.org/](http://eslint.org/)
2. package.json中可以定义参数,让webpack载入不同的全局参数,以区分开发和部署的环境,加载的配置文件是[arguments.config.js](arguments.config.js)
3. 使用axios作为ajax请求插件,使用方法没有什么特别的。。。
5. vue-router和vuex已经集成在内
6. 使用了vux作为ui框架,内置大量常用功能,请好好利用! [https://vux.li/](https://vux.li/)

## 开始开发
1. 根目录下执行 yarn install
2. 根据package.json执行开发环境启动,如 run-script "dev dev"
