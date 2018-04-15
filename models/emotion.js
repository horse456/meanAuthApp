// import required
const mongoose = require('mongoose');
const config = require('../config/database');

// Emotion Schema
const EmotionSchema = mongoose.Schema({
    hp: {
        type: Number,
        required: true
    },
    mp: {
        type: Number,
        required: true
    },
    hpDeal: {
        // deal id
        type: String
    },
    mpDeal: {
        type: String
    },
    result: {
        type: Boolean
    }
});


const Emotion = module.exports = mongoose.model('Emotion', EmotionSchema);

// Emotion Form read data
module.exports.getEmotionById = function(id, callback) {
    Emotion.findById(id, callback);
};

// Emotion Form create data
module.exports.addEmotion = function(doc, callback){
    doc.save(callback);
    
    //get the new _id
    console.log('add EmotionId: ',doc.get('_id'))
};

// Emotion Form update data
module.exports.updateEmotion = function(id, doc, callback){
    Emotion.findByIdAndUpdate(id, doc, callback);
};

//Emotion Form delete data
module.exports.removeEmotion = function(id, callback){
    Emotion.findByIdAndRemove(id, callback);
};