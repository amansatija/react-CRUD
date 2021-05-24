const productRouter = require("express").Router();
const productFacade = require("./productFacade.js");
const validators = require("./productValidators");

/**
* Purpose : product Add
*/
productRouter.route('/add')
    .post([validators.addProductValidate], (req, res) => {
        productFacade.addProduct(req, res).then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        })
    })


/**
* Purpose : product get
*/ 
productRouter.route('/get/:id')
    .get([validators.validateId], (req, res) => {
        productFacade.getProductDetails(req, res).then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        })
    })


/**
* Purpose : product List by category
*/
productRouter.route('/list')
    .post([], (req, res) => {
        productFacade.listProduct(req, res).then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        })
    })


    /**
* Purpose : product Edit
*/
productRouter.route('/edit/:id')
.put([validators.validateId], (req, res) => {
    productFacade.editProduct(req, res).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(err)
    })
})

    /**
* Purpose : product Remove
*/
productRouter.route('/remove/:id')
.delete([validators.validateId], (req, res) => {
    productFacade.removeProduct(req, res).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(err)
    })
})

/**
* Purpose : product Add
*/
productRouter.route('/uploadData')
    .post([], (req, res) => {
        productFacade.uploadData(req, res).then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        })
    })


module.exports = productRouter;