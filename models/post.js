// import required
const mongoose = require('mongoose');
const config = require('../config/database');

// Post Schema
const PostSchema = mongoose.Schema({
    subject: {
        type: String
    },
    userId: {
        type: String
    },
    smartId: {
        type: String
    },
    rehearsalId: {
        type: String
    },
    operationId: {
        type: String
    },
    result: {
        type: String
    },
   resumeId: {
        type: String
    },
    askId: {
        type: String
    },
    other: {
        type: Object
    }
});

const Post = module.exports = mongoose.model('Post', PostSchema);

// Post Form read data
module.exports.getPostById = function(id, callback) {
    Post.findById(id, callback);
};

// Post Form create data
module.exports.addPost = function(doc, callback){
    doc.save(callback);
    
    //get the new _id
    console.log(doc.get('_id'))
};

// Post Form update data
module.exports.updatePost = function(id, doc, callback){
    Post.findByIdAndUpdate(id, doc, callback);
};

// Post Form delete data
module.exports.removePost = function(id, callback){
    Post.findByIdAndRemove(id, callback);
};