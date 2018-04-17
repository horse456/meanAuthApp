// import required
const mongoose = require('mongoose');
const config = require('../config/database');

// Rehearsal Schema
const DealSchema = mongoose.Schema({
    compass: {
        type: String,
        required: true
    },
    importion: {
        type: Array,
        required: true
    },
    dodont: {
        type: Array
    },
    dynamic: {
        type: Array
    },
    imformation: {
        type: String
    },
    result: {
        type: Boolean
    },
    output: {
        type: Object
    }

});


const Deal = module.exports = mongoose.model('Deal', DealSchema);

// Deal Form read data
module.exports.getDealById = function(id, callback) {
    Deal.findById(id, callback);
};

// Deal Form create data
module.exports.addDeal = function(doc, callback){
    doc.save(callback);
    
    //get the new _id
    console.log('add DealId: ',doc.get('_id'))
};

// Deal Form update data
module.exports.updateDeal = function(id, doc, callback){
    Deal.findByIdAndUpdate(id, doc, callback);
};

//Deal Form delete data
module.exports.removeDeal = function(id, callback){
    Deal.findByIdAndRemove(id, callback);
};