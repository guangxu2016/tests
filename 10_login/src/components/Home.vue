<template>
    <div>
        <router-link :to="{name:'login'}">登录</router-link>
        <mt-button type="danger" size="small" @click="exit">退出</mt-button>
        <router-link :to="{name:'music'}">音乐</router-link>
        <router-link :to="{name:'music.list'}">音乐列表</router-link>

        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        methods:{
            exit(){
                this.$axios.put('users/tjx',{
                    isLogin:false
                }).
                then( res=>{
                    this.$router.push({
                        name:'login'
                    });
                });
            }
        },
        data(){
            return {

            }
        }
    }
</script>
<style>
    
</style>