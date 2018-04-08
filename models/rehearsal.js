// import required
const mongoose = require('mongoose');
const config = require('../config/database');

// Rehearsal Schema
const RehearsalSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    deadline: {
        type: String,
        required: true
    },
    money: {
        type: Number,
        required : true
    },
    hp: {
        type: Number,
    },
    mp: {
        type: Number,
    },
    policy: {
        type: String,
    },
    problem: {
        type: String,
    },
    ratio: {
        type: Number,
    }
});

// console.log("Rehearsal.strict: ", Rehearsal.strict);

const Rehearsal = module.exports = mongoose.model('Rehearsal', RehearsalSchema);

// Rehearsal Form read data
module.exports.getRehearsalById = function(id, callback) {
    Rehearsal.findById(id, callback);
};

// Rehearsal Form create data
module.exports.addRehearsal = function(doc, callback){
    doc.save(callback);
    
    //get the new _id
    console.log(doc.get('_id'))
};

// Rehearsal Form update data
module.exports.updateRehearsal = function(id, doc, callback){
    Rehearsal.findByIdAndUpdate(id, doc, callback);
};

//Rhearsal Form delete data
module.exports.removeRehearsal = function(id, callback){
    Rehearsal.findByIdAndRemove(id, callback);
};