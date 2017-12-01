export default {
    template:`
        <div>
            这里是首页
            <router-link :to="{name:'login'}">登录</router-link>
            <router-link :to="{name:'music.list'}">音乐列表</router-link>
            <router-link :to="{name:'music'}">音乐首页</router-link>
            <button @click="exit">退出</button>

            <router-view></router-view>
        </div>
    `,
   methods:{
        exit() {
            var username = window.localStorage.getItem("username");
            this.$.ajax({
                url:'http://localhost:3000/users/' + username,
                type:"put",
                dataType:"json",
                data:"isLogin=false",
                success:()=> {
                    this.$router.push({
                        name:"login"
                    })
                }
            })
        }
   }

}