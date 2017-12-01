export default {
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
                    alert('登录成功');
                }

            })
        }
    }
}