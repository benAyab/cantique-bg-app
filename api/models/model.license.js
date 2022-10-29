const mongoose = require('mongoose');

const licenseSchema = new mongoose.Schema(
    {
       serial: {
           type: String,
           required: true,
           unique: true
       },
       expiredate: {
            type: Date, 
            default: new Date()
        },
       isActive: {
            type: Boolean, 
            required: true,
            default: false
        }
    },
    {timestamps: true}
);

//licenseSchema.plugin(uniqueValidator);

module.exports = licenseSchema;