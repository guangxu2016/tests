/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
throw new Error("Cannot find module \"../../vue.js\"");
throw new Error("Cannot find module \"../../vue-router.js\"");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Home_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Login_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Music_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_List_js__ = __webpack_require__(4);
throw new Error("Cannot find module \"../../jquery.min.js\"");








__WEBPACK_IMPORTED_MODULE_0__vue_js___default.a.prototype.$ = __WEBPACK_IMPORTED_MODULE_6__jquery_min_js___default.a; //让所有的组件中的this都能使用
var App = {
    template: `
        <router-view></router-view>
    `,
}

//安装插件
__WEBPACK_IMPORTED_MODULE_0__vue_js___default.a.use(__WEBPACK_IMPORTED_MODULE_1__vue_router_js___default.a);

var router = new __WEBPACK_IMPORTED_MODULE_1__vue_router_js___default.a();

router.addRoutes([{
        path: '/',
        redirect: {
            name: 'home'
        }
    }, //重定向到首页
    {
        name: 'home',
        path: '/home',
        component: __WEBPACK_IMPORTED_MODULE_2__components_Home_js__["a" /* default */],
        children: [
            { name: 'login', path: 'login', component: __WEBPACK_IMPORTED_MODULE_3__components_Login_js__["a" /* default */] },
            {
                name: 'music',
                path: 'music',
                component: __WEBPACK_IMPORTED_MODULE_4__components_Music_js__["a" /* default */],
                meta: { check: true },
                children: [ // /home/music/list
                    { name: 'music.list', path: 'list', component: __WEBPACK_IMPORTED_MODULE_5__components_List_js__["a" /* default */] }
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
    __WEBPACK_IMPORTED_MODULE_6__jquery_min_js___default.a.ajax({
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


new __WEBPACK_IMPORTED_MODULE_0__vue_js___default.a({
    el: '#app',
    render: c => c(App),
    router
})

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    template:`
        <div>
              这里是首页
              <router-link :to="{name:'login'}">登录页</router-link  >
              <button @click="exit">退出</button>
              <router-link :to="{name:'music'}">音乐首页</router-link >
              <router-link :to="{name:'music.list'}">音乐列表</router-link >

              <router-view></router-view>

        </div>

    `,
    methods:{
        exit(){
            var username = window.localStorage.getItem('username');
            this.$.ajax({
                url:'http://localhost:3000/users/' + username,
                type:'put',
                data:'isLogin=false',
                dataType:'json',
                success:()=>{
                    this.$router.push({
                        name:'login'
                    })
                }
            })
        }
    }
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    template:`
        <div>
            用户名:<input type="text" v-model="username"/>
            密码:<input type="text" v-model="password"/>
            <button @click="doLogin">登录</button>
        </div>
    `,
    data(){
        return {
            username:'',
            password:''
        }
    },
    methods:{
        doLogin(){
            this.$.ajax({
                url:'http://localhost:3000/users/' + this.username,
                type:'put',
                dataType:'json',
                data:'isLogin=true',
                success:()=>{
                    // console.log(this);
                    window.localStorage.setItem('username',this.username);
                    console.log('登录成功');
                }

            })
        }
    }
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    template:`
        <div style="background-color:yellowgreen;">
            欢迎进入音乐世界。。。。。
            <hr/>
            <router-view></router-view>   
        </div>

    `
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    template:`
        <div>
            <ul>
                <li>真好听</li>
                <li>很好听</li>
                <li>喜欢你</li>
            </ul>
        </div>

    `
});

/***/ })
/******/ ]);