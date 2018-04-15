// import required
const mongoose = require('mongoose');
const config = require('../config/database');

// Logo Schema
const LogoSchema = mongoose.Schema({
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


const Logo = module.exports = mongoose.model('Logo', LogoSchema);

// Logo Form read data
module.exports.getLogoById = function(id, callback) {
    Logo.findById(id, callback);
};

// Logo Form create data
module.exports.addLogo = function(doc, callback){
    doc.save(callback);
    
    //get the new _id
    console.log('add LogoId: ',doc.get('_id'))
};

// Logo Form update data
module.exports.updateLogo = function(id, doc, callback){
    Logo.findByIdAndUpdate(id, doc, callback);
};

//Logo Form delete data
module.exports.removeLogo = function(id, callback){
    Logo.findByIdAndRemove(id, callback);
};