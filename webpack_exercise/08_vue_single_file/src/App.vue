<template>
    <div>
        {{text}}
        <router-view></router-view>
    </div>
</template>

<script>  
    export default {
        data(){
            return {
                text:'我是app.vue'
            }
        }
    }
</script>
<style scoped>
/*不加scoped和全局引入一样*/
/*加入以后，只对template中的元素生效*/
div{
    background-color: hotpink;
}
</style>
