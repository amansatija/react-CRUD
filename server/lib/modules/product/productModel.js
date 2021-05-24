const mongoose = require('mongoose');
const constants = require('../../../constants');

var Schema = mongoose.Schema;

var productSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    files: { type: Array },
    product_specs: { type: Array },
    product_isdelete: {
        type: Boolean,
        default: false
    },
    id: {
        type: Number,
        default: 0
    }

}, { timestamps: true});


let x  = mongoose.model(constants.DB_MODEL_NAME.PRODUCT, productSchema);

module.exports = x;