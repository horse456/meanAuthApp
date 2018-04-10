// import required
const mongoose = require('mongoose');
const config = require('../config/database');

// Rehearsal Schema
const OperationSchema = mongoose.Schema({
    step: {
        type: Array,
        required: true
    },
    done: {
        type: Array,
        required: true
    },
    result: {
        type: Boolean
    }
});


const Operation = module.exports = mongoose.model('Operation', OperationSchema);

// Operation Form read data
module.exports.getOperationById = function(id, callback) {
    Operation.findById(id, callback);
};

// Operation Form create data
module.exports.addOperation = function(doc, callback){
    doc.save(callback);
    
    //get the new _id
    console.log('add operationId: ',doc.get('_id'))
};

// Operation Form update data
module.exports.updateOperation = function(id, doc, callback){
    Operation.findByIdAndUpdate(id, doc, callback);
};

//Operation Form delete data
module.exports.removeOperation = function(id, callback){
    Operation.findByIdAndRemove(id, callback);
};