import Vue from 'vue/dist/vue.js';//加载路径来自node_modules


import VueRouter from 'vue-router';

import App from './App.js';
import Home from './Home.js';


Vue.use(VueRouter);

let router = new VueRouter();

router.addRoutes([
   { name:'home',path:'/home',component:Home}
]);

new Vue({
    el:'#app',
    router,
    render:c=>c(App)
})