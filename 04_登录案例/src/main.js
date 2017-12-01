import Vue from '../../vue.js';
import VueRouter from '../../vue-router.js';

import Home from './components/Home.js';
import Login from './components/Login.js';
import Music from './components/Music.js';
import List from './components/List.js';
import $ from '../../jquery.min.js';
Vue.prototype.$ = $; //让所有的组件中的this都能使用
var App = {
    template: `
        <router-view></router-view>
    `,
}

//安装插件
Vue.use(VueRouter);

var router = new VueRouter();

router.addRoutes([{
        path: '/',
        redirect: {
            name: 'home'
        }
    }, //重定向到首页
    {
        name: 'home',
        path: '/home',
        component: Home,
        children: [
            { name: 'login', path: 'login', component: Login },
            {
                name: 'music',
                path: 'music',
                component: Music,
                meta: { check: true },
                children: [ // /home/music/list
                    { name: 'music.list', path: 'list', component: List }
                ]
            },
        ]
    }
]);

router.beforeEach((to, from, next) => {
    console.log(to);
    //所有路由都进来，区别对待
    //1:获取to对象的matched
    var matched = to.matched; //数组
    // console.log(matched);
    var checkLogin = false;
    for (var i = 0; i < matched.length; i++) {
        if (matched[i].meta.check) {
            // console.log(matched[i].meta.check);
            //要验证是否登录
            checkLogin = true;
        }
    }
    //是否需要验证
    if (!checkLogin) {
        return next(); //放行
    }
    var username = window.localStorage.getItem('username');

    //假设从localStorage中获取
    $.ajax({
        type: 'get',
        url: 'http://localhost:3000/users/' + username,
        dataType: 'json',
        success: function(data) {
            if (data.isLogin == 'true') {
                //登录过
                next();
            } else {
                alert('去登录吧');
                next({
                    name: 'login'
                })
            }
        }
    })
})


new Vue({
    el: '#app',
    render: c => c(App),
    router
})