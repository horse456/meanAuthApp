// import required
const mongoose = require('mongoose');
const config = require('../config/database');

// Ask Schema
const AskSchema = mongoose.Schema({
    ration: {
        type: Number,
        required: true
    },
    process: {
        // emotion or logo id
        type: Array,
        required: true
    },
    result: {
        // true or false; 
        type: Boolean
    }
});


const Ask = module.exports = mongoose.model('Ask', AskSchema);

// Ask Form read data
module.exports.getAskById = function(id, callback) {
    Ask.findById(id, callback);
};

// Ask Form create data
module.exports.addAsk = function(doc, callback){
    doc.save(callback);
    
    //get the new _id
    console.log('add AskId: ',doc.get('_id'))
};

// Ask Form update data
module.exports.updateAsk = function(id, doc, callback){
    Ask.findByIdAndUpdate(id, doc, callback);
};

//Ask Form delete data
module.exports.removeAsk = function(id, callback){
    Ask.findByIdAndRemove(id, callback);
};