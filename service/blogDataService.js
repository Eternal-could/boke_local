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
        blogId: 1, // 博客id 一个递增字段，用于表示一个独一无二的博客文章数据
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
            userName: rs[0].userName,
            avatar: rs[0].avatar
        }
        // 向用户详情数据里面的文章列表中间 增加该博客id
        UserDetailTables.updateOne({
            key: rs[0].key
        },{
            $push: {
                articles:  newBlogData.blogId
            }
        }).then((rs)=>{
            console.log('更新用户详情数据里面的博客信息');
        })
        // 向博客数据表里 创建一个新的文章
        BlogTables.create(newBlogData).then(rs1=>{
            // console.log('博客创建成功');
            // console.log(1);
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

// 所有人经过审核过的
blogApp.get('/getPublicBlog',async function (req, res) {
    let params = {};
    let {
        offset,
        limit,
        searchKey
    } = req.query;
    // 当用户传过来搜索字段时
    if (searchKey) {
        params.title = searchKey;
    }
    // 获取用户黑名单
    let blackList = [];
    if (req.headers.authorization) {
        // 只有登录的用户才有黑名单
        await UserTables.find({
            token: req.headers.authorization
        }).then(async (userInfos)=>{
            // 找到用户的key，而这个key又得去UserDetail里找 所以异步函数
            await UserDetailTables.find({
                key: userInfos[0].key
            }).then(userDetails=>{
                blackList = userDetails[0].blacklist;
            })
        })
    }

    if (blackList.length) {
        // 当用户有拉黑的黑名单的时候
        params['author.name'] = {
            $nin: blackList
        }
    }
    let totalNum = 0; // 查询的博客总数

    await BlogTables.find({
        ...params
    }).then(rs => {
        totalNum = rs.length; // 获取博客总数
    })
    BlogTables.find({
        ...params
    },{
        content: false,
        _id: false,
        __v: false
    },{
        skip: Number(offset),
        limit: Number(limit),
        sort: {
            lastModified:-1
        }
    }).then(blogList=>{
        res.send({
            status: 200,
            message: "查询成功",
            data: {
                blogList,
                totalNum
            },
        })
    })
})

// 获取blogId的接口
blogApp.get('/getBlogDetailById',async function (req,res){
    let params = {
        blogId: req.query.blogId
    };
    // 当有用户请求了某个id的数据，那么这个id对应的文章的views阅览数就自增一个1
    // 人次， 请求一次就算一次， 1个人访问了10次 我就算10个点击量
    // 人数 一个人无论点击多少次，就只算一次
    await BlogTables.updateOne(params,{
        $inc: {
            views: 1
        }
    }).then(()=>{
        console.log('博客阅览数自增1')
    });
    BlogTables.find(params,{
        __v: false,
        _id: false
    }).then(rs=>{
        res.send({
            status:200,
            message: '查询成功',
            data: {
                blogData: rs[0]
            }
        })
    })
})
module.exports = {
    blogApp
}