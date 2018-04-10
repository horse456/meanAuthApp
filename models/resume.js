// import required
const mongoose = require('mongoose');
const config = require('../config/database');

// Rehearsal Schema
const ResumeSchema = mongoose.Schema({
    userId:{
        type: String, required: true
    },
    subject: {
        type: String
    },
    redefine: {
        type: Object,
    },
    ego: {
        type: Object,
    },
    learn: {
        type: Object,
    },
    habit: {
        type: Object,
    },
    emotion: {
        type: Object,
    },
    other: {
        type: Array
    }
});


const Resume = module.exports = mongoose.model('Resume', ResumeSchema);

// Resume Form read data
module.exports.getResumeById = function(id, callback) {
    Resume.findById(id, callback);
};

// Resume Form create data
module.exports.addResume = function(doc, callback){
    doc.save(callback);
    
    //get the new _id
    console.log('add ResumeId: ',doc.get('_id'))
};

// Resume Form update data
module.exports.updateResume = function(id, doc, callback){
    Resume.findByIdAndUpdate(id, doc, callback);
};

// Resume Form delete data
module.exports.removeResume = function(id, callback){
    Resume.findByIdAndRemove(id, callback);
};