# mini-mpvue

> A Mpvue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


介绍，该项目使用 美团框架去搭建，使用了vuex状态管理
src 文件夹
api  专门存放api地址的文件
components 存放组件
pages 存放页面路由
services 封装https请求
store vuex状态管理
utils 基本工具类，以及封装的http请求


config.js  配置不同环境的api地址

此项目没有做跨域处理，跨域处理可以后端处理，也可以前端代理处理（后期再加）
