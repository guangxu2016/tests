<template>
    <div>
        <!-- 轮播图 -->
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(pic,index) in imgs" :key="index">
                <a :href="pic.url">
                    <img v-bind:src="pic.img">
                </a>
          </mt-swipe-item>

        </mt-swipe>
        <!-- 九宫格 -->
        <my-ul>
            <my-li v-for="(router,index) in homeRouters" :key="index">
                <a href="">
                    <div :class="'back-img  ' + router.className">
                        {{router.title}}
                    </div>
                </a>
            </my-li>
        </my-ul>
    </div>
</template>
<script>
    export default {
        created(){
            this.$axios.get("getlunbo")
            .then(res=>{
                this.imgs = res.data.message;
            })
        },
        data() {
            return {
                imgs:[],
                homeRouters:[{
                    className:"news",
                    title:"新闻列表"
                },{
                    className:"pic",
                    title:"图文分享"
                },{
                    className:"goods",
                    title:"商品列表"
                },{
                    className:"feedback",
                    title:"留言反馈"
                },{
                    className:"search",
                    title:"搜索咨询"
                },{
                    className:"callme",
                    title:"联系我们"
                }]
            }
        }
    }
</script>
<style scoped>
.mint-swipe {
    height: 30%;
}
.mint-swipe img {
    width: 100%;
}
/* 九宫格 */
.back-img{
        background-size: 50px;
        background-repeat: no-repeat;
        background-position: 40px 35px;
        font-size: 20px;
        font-family: 'Microsoft YaHei';
}
li a {
    color:black;
}


.news {
    background-image: url(../../static/img/news.png);
}
.pic {
    background-image: url(../../static/img/picShare.png);
}
.goods{
    background-image: url(../../static/img/goodShow.png)
}
.feedback{
    background-image: url(../../static/img/feedback.png)
}
.search{
    background-image: url(../../static/img/search.png)
}
.callme{
    background-image: url(../../static/img/callme.png)
}
</style>