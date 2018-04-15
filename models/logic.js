// import required
const mongoose = require('mongoose');
const config = require('../config/database');

// Logic Schema
const LogicSchema = mongoose.Schema({
    existState: {
        type: String
    },
    existCollect: {
        type: Array
    },
    existPolicy: {
        // deal id
        type: Array
    },
    existResult: {
        type: Boolean
    },
    result: {
        type: Boolean
    },
    unknowDeal: {
        type: Array
    },
    programRehearsal: {
        type: String
    },
    programDeal: {
        type: Array
    }
});


const Logic = module.exports = mongoose.model('Logic', LogicSchema);

// Logic Form read data
module.exports.getLogicById = function(id, callback) {
    Logic.findById(id, callback);
};

// Logic Form create data
module.exports.addLogic = function(doc, callback){
    doc.save(callback);
    
    //get the new _id
    console.log('add LogicId: ',doc.get('_id'))
};

// Logic Form update data
module.exports.updateLogic = function(id, doc, callback){
    Logic.findByIdAndUpdate(id, doc, callback);
};

//Logic Form delete data
module.exports.removeLogic = function(id, callback){
    Logic.findByIdAndRemove(id, callback);
};