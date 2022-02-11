let express = require('express');
let BlogTables = require('../db/BlogDataDB/blogTable');
let UserTables = require('../db/userCountDB/userTable');
let UserDetailTables = require('../db/userDetailDB/userDetailTable');
let {v4} = require('uuid');// uuid 生成唯一令牌

let blogApp = express();

blogApp.post('/create', async function (req,res){
    let newBlogData = {
        title: req.body.title,
        tags: req.body.tags,
        description: req.body.description,
        cover: req.body.cover,
        content: req.body.content,
        comment: [],
        author: {},
        lastModified: new Date(),
        views: 0,
        likes: 0,
        blogId: 0, // 博客id 一个递增字段，用于表示一个独一无二的博客文章数据
        approved: true
    };
    // 在这里写同步
    // 生成新的博客id 新的博客id是最大的值， 比之前存在的大1 mongodb没有自增字段
    await BlogTables.find({

    },{
        blogId: true
    },{
        sort:{
            blogId:-1
        }
    }).then((rs)=>{
        if (rs.length) {
            newBlogData.blogId = rs[0].blogId + 1;
        } else {
            newBlogData.blogId = 1;
        }
    })
    // 设置博客作者信息
    UserTables.find({
        token: req.headers.authorization
    }).then(rs=>{
        newBlogData.author = {
            name: rs[0].userName,
            avatar: rs[0].avatar
        }
        // 向用户详情数据里面的文章列表中间 增加该博客id
        UserDetailTables.updateOne({
            key: rs[0].key
        },{
            $push: {
                articles:  newBlogData.blogId
            }
        })
        // 向博客数据表里 创建一个新的文章
        BlogTables.create(newBlogData).then(rs1=>{
            console.log('博客创建成功');
            res.send({
                status: 200,
                message: '文章发布成功'
            })
        }).catch((err)=>{
            res.send({
                status: 500,
                message: '文章发布失败'
            })
        })
    })
})

module.exports = {
    blogApp
}