// import required
const mongoose = require('mongoose');
const config = require('../config/database');

// Smart Schema
const SmartSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    speciafic: {
        type: String,
        required: true
    },
    measurable: {
        type: String,
        required : true
    },
    achievable: {
        type: String,
    },
    relevant: {
        type: String,
    },
    timeBased: {
        type: Date,
    },
    ratio: {
        type: Number,
    }
});

const Smart = module.exports = mongoose.model('Smart', SmartSchema);

// SmartForm read data
module.exports.getSmartById = function(id, callback) {
    Smart.findById(id, callback);
};

// SmartForm create data
module.exports.addSmart = function(newSmart, callback){
    newSmart.save(callback);
    
    //get the new _id
    console.log(newSmart.get('_id'))
};

// SmartForm update data
module.exports.updateSmart = function(id, newSmart, callback){
    Smart.findByIdAndUpdate(id, newSmart,{upsert: true}, callback);
};

// SmartForm delete data
module.exports.removeSmart = function(id, callback){
    Smart.findByIdAndRemove(id, callback);
};



