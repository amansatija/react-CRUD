



var mongoose = require('mongoose');
const constants = require('../../../constants');
const middleware = require('../../middleware/fileMiddleWare');

const productmodel = require('./productModel');
const productMaster = mongoose.model(constants.DB_MODEL_NAME.PRODUCT, productmodel.productSchema);

const dao = require('../../dao/baseDao');

async function addProduct(req) {
    console.log(req.body);
    let productDao = new dao(productMaster);

    let length = await productDao.find({});
    req.body.id = length + 1;
    return productDao.save(addData);

}


function getProductDetails(req) {

    let productDao = new dao(productMaster);

    let findQuery = {
        id: req.params.id,
        product_isdelete: false
    };

    return productDao.findOne(findQuery).then(async (data) => {
        if (data && data != null) {

            return await data

        } else {
            return 1;
        }
    })
}



async function listProduct(req) {
    let productDao = new dao(productMaster);

    let page = 1;
    let skip = 0;

    if (req.body.page) {
        page = parseInt(req.body.page);
    }

    if (page == 1) {
        skip = 0;
    } else {
        skip = (page - 1) * 10;
    }

    let option = {
        skip: skip,
        limit: 10
    };

    let aggQuery = [{
        $match: {
            product_isdelete: false
        }
    }, {
        $skip: option['skip']
    }, {
        $limit: option['limit']
    }
    ];

    return await productDao.aggregate(aggQuery)

}




function editProduct(req) {

    let productDao = new dao(productMaster);

    let findQuery = {
        id: req.params.id,
        product_isdelete: false
    };

    return productDao.findOne(findQuery).then(async (data) => {
        if (data && data != null) {

            return productDao.findOneAndUpdate(findQuery, { $set: req.body }).then((updateData) => {
                if (updateData) {
                    return updateData
                }
            })

        } else {
            return 1;
        }
    })
}


function removeProduct(req) {

    let productDao = new dao(productMaster);

    let findQuery = {
        id: req.params.id,
        product_isdelete: false
    };

    return productDao.findOne(findQuery).then(async (data) => {
        if (data && data != null) {

            return productDao.findOneAndUpdate(findQuery, {
                $set: {
                    product_isdelete: true
                }
            }).then((updateData) => {
                if (updateData) {
                    return updateData
                }
            })

        } else {
            return 1;
        }
    })
}


module.exports = {
    addProduct,
    getProductDetails,
    listProduct,
    editProduct,
    removeProduct
};
