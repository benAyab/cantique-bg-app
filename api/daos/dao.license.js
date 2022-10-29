const mongoose = require('mongoose');
const licenseSchema = require('../models/model.license');

licenseSchema.statics = {
    create: function(data, cb){
        let license = new this(data);
        license.save(cb);
    },
    findAll: function(query, fields, cb){
        this.find(query, fields, cb);
    },
    findBySerial: function(query, fields, cb){
        this.findOne(query, fields, cb);
    },
    update: function(query, updateData, cb){
        this.findOneAndUpdate(query, {$set: updateData}, cb);
    },
    deleteItem: function(query, cb){
        this.deleteOne(query, cb);
    }
};
module.exports = mongoose.model('License', licenseSchema);