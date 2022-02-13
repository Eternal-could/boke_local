let express = require('express')
let TipOffTables = require('../db/TipOffData/TipOffTables');

let tipOffApp = express();

tipOffApp.post('/article',function (req, res){
    TipOffTables.create({
        blogId: req.body.blogId,
        description: req.body.description,
        cover: req.body.cover,
        title: req.body.title,
        reason: req.body.reason
    }).then((rs)=>{
        res.send({
            status: 200,
            message: '举报文章成功'
        })
    })
});

module.exports = {
    tipOffApp
}