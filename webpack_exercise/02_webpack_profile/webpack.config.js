// 就是node在跑代码
console.log('代码执行');
console.log(process.env.NODE_ENV);

//把配置向外导出给webpack
module.exports = {
    //入口程序
    entry:{
        //入口的文件
       'main':'./main.js' 
    },
    //产出
    output:{
        //产出的js文件
        filename:'./build.js'
    }
}