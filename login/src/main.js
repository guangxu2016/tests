import Vue from "../../vue.js";
import VueRouter from "../../vue-router.js";

import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Music from "./components/Music.js";
import List from "./components/List.js";

import $ from "../../jquery.min.js";
Vue.prototype.$ = $;

var App = {
    template: `
        <router-view></router-view>
    `,
}

Vue.use(VueRouter);

var router = new VueRouter();

router.addRoutes([{
        path: "/",
        redirect: {
            name: "home"
        }
    },
    {
        name: "home",
        path: "/home",
        component: Home,
        children: [
            { name: "login", path: "login", component: Login },
            {
                name: "music",
                path: "music",
                component: Music,
                meta: { check : true },
                children: [
                    { name: "music.list", path: "list", component: List }
                ]
            },
        ]
    },
])

// 路由守卫
router.beforeEach((to, from, next) => {
    var matched = to.matched;//数组
    var checkLogin = false;
    for (var i = 0; i < matched.length; i++) {
        if (matched[i].meta.check) {
            checkLogin = true;
        }
    }

    if (!checkLogin) {
       return next();
    }
    var username = window.localStorage.getItem("username");

    // 假设从localStorage中获取
    $.ajax({
        type:"get",
        url:'http://localhost:3000/users/' + username,
        dataType:"json",
        success:function() {
            if(data.isLogin == "true") {
                next();
            } else {
                alert("去登录");
                next({
                    name:"login"
                })
            }
        }
    })
})

new Vue({
    el: "#app",
    render: c => c(App),
    router
})