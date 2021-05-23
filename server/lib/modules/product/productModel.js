const mongoose = require('mongoose');
const constants = require('../../../constants');

var Schema = mongoose.Schema;

var productSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    files: [{
        type: String,
        required: true
    }],
    product_specs: [{
        type: String,
        required: true
    }],
    product_isdelete: {
        type: Boolean,
        default: false
    },
    id: {
        type: Number,
        default: 0
    }

}, { timestamps: true }, { versionKey: true });


module.exports = mongoose.model(constants.DB_MODEL_NAME.PRODUCT, productSchema);
