// 引入vue
import Vue from "vue";

import MyUl from "./components/Commons/MyUl.vue";
import MyLi from "./components/Commons/MyLi.vue";
Vue.component(MyUl.name,MyUl);
Vue.component(MyLi.name,MyLi);

// 引入组件
import App from "./components/App.vue";
import Home from "./components/Home/Home.vue";
import Member from "./components/Member/Member.vue";
import Search from "./components/Search/Search.vue";
import Shopcart from "./components/Shopcart/Shopcart.vue";

// 引入Vuerouter开始
import VueRouter from "vue-router";
Vue.use(VueRouter);
// 配置
let router = new VueRouter();
router.addRoutes([
    {path:"/",redirect:{
        name:"home"
    }},
    {name:"home",path:"/home",component:Home},
    {name:"member",path:"/member",component:Member},
    {name:"search",path:"/search",component:Search},
    {name:"shopcart",path:"/shopcart",component:Shopcart}
]);
// 引入Vuerouter结束

// 引入mintui开始
import MintUi from "mint-ui";
import "mint-ui/lib/style.css";
Vue.use(MintUi);
// 引入mintui结束

import "./static/css/global.css";

// Axios 开始
import Axios from "axios";
Vue.prototype.$axios = Axios;
//设置默认URL请求基础路径
Axios.defaults.baseURL = 'http://vue.studyit.io/api/';
// Axios 结束

new Vue({
    el:"#app",
    render:c=>c(App),
    router
})
