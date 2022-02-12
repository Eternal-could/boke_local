let express = require('express');
let mongoose = require('mongoose');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let apiAddr = require('./config/PublicPath');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/blogDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('数据库连接成功');
}).catch(()=>{
    console.log('数据库连接失败');
})

// 生成服务实例
let app = express();
// 启用通用中间件
app.use(cookieParser());
app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());

// 处理跨域请求
app.all('*', function (req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With, content-type, Authorization');
    res.setHeader('Access-Control-Expose-Headers','Authorization');
    next();
})

// 挂载其他应用
let { uploadImgFileApp } = require('./service/img.file.upload.service')
let { getImgFileApp } = require('./service/img.file.get.service')
let { authenticationApp } = require('./service/identifyAuthenticationService')
let { blogApp } = require('./service/blogDataService')
let { userDetailApp } = require('./service/UserDetailService')

// 启用各种服务
app.use(apiAddr.uploadImgApiAddr, uploadImgFileApp);
app.use(apiAddr.getImgApiAddr, getImgFileApp);
app.use(apiAddr.authenticationApiAddr,authenticationApp);
app.use(apiAddr.blogApiAddr,blogApp);
app.use(apiAddr.userDetailApiAddr,userDetailApp);

//启动服务
app.listen(8888);

console.log('回忆乡后端系统启动了');