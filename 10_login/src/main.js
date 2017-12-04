import Vue from 'vue';
import VueRouter from 'vue-router';
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
import Axios from 'axios';


import App from './components/App.vue';
import Home from './components/Home.vue';
import Music from './components/Music.vue';
import List from './components/List.vue';
import Login from './components/Login.vue';


//一堆安装
Vue.use(VueRouter);
Vue.use(MintUi);
Vue.prototype.$axios = Axios;

//拦截器loadding
Axios.interceptors.request.use(function(config) {
    MintUi.Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
    });
    return config;
});
Axios.interceptors.response.use(function(config) {
    MintUi.Indicator.close();
    return config;
});
//baseURL
Axios.defaults.baseURL = 'http://localhost:3000/';


//路由
let router = new VueRouter();

router.addRoutes([{
    name: 'home',
    path: '/home',
    component: Home,
    children: [{
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'music',
            path: '/music',
            component: Music,
            meta: { check: true },
            children: [
                { name: 'music.list', path: 'list', component: List }
            ]
        }
    ]
}]);

//全局钩子

router.beforeEach((to,from,next)=>{
    // console.log(to);
    // next();//放行
    let checkLogin = false;
    console.log(to);
    // console.log(matched);
    console.log(to.matched);
    to.matched.forEach( ele =>{
        if(ele.meta.check){
            checkLogin = true;
        }
    });

    //发请求
    if(checkLogin){
        Axios.get('users/tjx')
        .then( res=>{
            if(res.data.isLogin){
                return next();
            }

            //没有登录
            MintUi.Toast({
              message: '请登录',
              position: 'middle',
              duration: 5000
            });

            next({
                name:'login'
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }else{
        next();
    }

});

new Vue({
    el: '#app',
    render: c => c(App),
    router
})