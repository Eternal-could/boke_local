let express = require('express');
let crypto = require('crypto');
let {v4} = require('uuid');// uuid 生成唯一令牌
let UserTables = require('../db/userCountDB/userTable');
let UserDetailTables = require('../db/userDetailDB/userDetailTable');

/**
 *  创建一个工具函数 加密
 */
function enCryptData(data, key, algorithm) {
    if (!crypto.getHashes().includes(algorithm)) {
        throw new Error('不支持此哈希函数')
    }
    const hmac = crypto.createHmac(algorithm, key);
    hmac.update(data);
    return hmac.digest('hex');
}

let authenticationApp = express();

authenticationApp.post('/registerUser',function (req,res){
    // 生成一个独一无二的密钥
    let key = v4();
    // 用户传过来的密码，仅用一次进行加密
    let password = enCryptData(req.body.password, key, 'sha256');
    // 用户名
    let userName = req.body.userName;
    // 头像
    let avatar = req.body.avatar;
    // token 生成一个随机访问令牌
    let token = enCryptData(v4(), v4(), 'sha256');

    UserTables.find({
        userName: userName
    }).then((rs)=>{
        if (rs.length) {
            res.send({
                status: 500,
                message: '该用户名已存在系统中...请及时更换'
            })
        } else {
            UserTables.create({
                userName,
                password,
                key,
                token,
                avatar,
                isAdmin: false,
                introduction: '',
                approved: true,
                createTime: new Date()
            }).then(()=>{
                res.setHeader('Authorization',token);
                res.send({
                    status: 200,
                    message: '注册成功,请等待审核'
                })
            })

            UserDetailTables.create({
                key,
                comments: [],
                articles:[],
                likes: [],
                attentions: [],
                blacklist:[]
            })
        }
    })
})

authenticationApp.get('/checkPermission',function (req,res){
    UserTables.find({
        token: req.headers.authorization
    }).then((rs)=>{
        if (rs.length) {
            res.send({
                status: 200,
                message: '用户鉴权成功'
            })
        } else {
            res.send({
                status: 500,
                message: '用户鉴权失败'
            })
        }
    })
})
module.exports = {
    authenticationApp
}