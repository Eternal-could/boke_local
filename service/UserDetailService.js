let express = require('express')
let BlogTables = require('../db/BlogDataDB/blogTable');
let UserTables = require('../db/userCountDB/userTable');
let UserDetailTables = require('../db/userDetailDB/userDetailTable');

let userDetailApp = express();
// 喜欢，取消喜欢 关注 取消关注 拉黑 取消拉黑

userDetailApp.post('/likes',function (req,res) {
    UserTables.find({
        token: req.headers.authorization
    }).then(async rs=>{
        await BlogTables.updateOne({
            blogId: req.body.blogId
        },{
            $inc:{
                likes: 1
            }
        }).then(()=>{
            console.log('有人给博客点赞了')
        })
        UserDetailTables.updateOne({
            key: rs[0].key
        },{
            $push: {
                likes: req.body.blogId
            }
        }).then(()=>{
            res.send({
                status: 200,
                message: '点赞成功'
            })
        }).catch(err=>{
            res.send({
                status: 500,
                message: '点赞失败'
            })
        })
    })
})
userDetailApp.delete('/likes/:id',function (req,res) {
    UserTables.find({
        token: req.headers.authorization
    }).then(async rs=>{
        await BlogTables.updateOne({
            blogId: Number(req.params.id)
        },{
            $inc:{
                likes: -1
            }
        }).then(()=>{
            console.log('有人给博客取消点赞了')
        })
        UserDetailTables.updateOne({
            key: rs[0].key
        },{
            $pull: {
                likes: Number(req.params.id)
            }
        }).then(()=>{
            res.send({
                status: 200,
                message: '取消点赞成功'
            })
        }).catch(err=>{
            res.send({
                status: 500,
                message: '取消点赞失败'
            })
        })
    })
})
userDetailApp.post('/attention',function (req,res) {
    UserTables.find({
        token: req.headers.authorization
    }).then(async rs=>{
        UserDetailTables.updateOne({
            key: rs[0].key
        },{
            $push: {
                attentions: req.body.userName
            }
        }).then(()=>{
            res.send({
                status: 200,
                message: '关注成功'
            })
        }).catch(err=>{
            res.send({
                status: 500,
                message: '关注失败'
            })
        })
    })
})
userDetailApp.delete('/attention/:userName',function (req,res) {
    UserTables.find({
        token: req.headers.authorization
    }).then(async rs=>{
        UserDetailTables.updateOne({
            key: rs[0].key
        },{
            $pull: {
                attentions: req.params.userName
            }
        }).then(()=>{
            res.send({
                status: 200,
                message: '取消关注成功'
            })
        }).catch(err=>{
            res.send({
                status: 500,
                message: '取消关注失败'
            })
        })
    })
})
userDetailApp.post('/blacklist',function (req,res) {
    UserTables.find({
        token: req.headers.authorization
    }).then(async rs=>{
        UserDetailTables.updateOne({
            key: rs[0].key
        },{
            $push: {
                blacklist: req.body.userName
            }
        }).then(()=>{
            res.send({
                status: 200,
                message: '关注成功'
            })
        }).catch(err=>{
            res.send({
                status: 500,
                message: '关注失败'
            })
        })
    })
})
userDetailApp.delete('/blacklist/:userName',function (req,res) {
    UserTables.find({
        token: req.headers.authorization
    }).then(async rs=>{
        UserDetailTables.updateOne({
            key: rs[0].key
        },{
            $pull: {
                blacklist: req.params.userName
            }
        }).then(()=>{
            res.send({
                status: 200,
                message: '取消关注成功'
            })
        }).catch(err=>{
            res.send({
                status: 500,
                message: '取消关注失败'
            })
        })
    })
})

module.exports = {
    userDetailApp
}