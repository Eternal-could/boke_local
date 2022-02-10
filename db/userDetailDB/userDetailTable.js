let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserDetail = new Schema({
    key: {
        type: String,
        required: true
    },
    articles: {
        type: Array,
        required: true
    },
    comments: {
        type: Array
    },
    likes: {
        type: Array
    },
    attentions: {
        type: Array
    },
    blacklist: {
        type: Array
    }
});

const UserDetailTables = mongoose.model('UserDetailTables',UserDetail);
module.exports = UserDetailTables