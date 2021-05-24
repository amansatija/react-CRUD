


// 'use strict';
const productService = require('./productService');
const productMsg = require('./productConstants');


function addProduct(req, res) {
    return productService.addProduct(req, res)
        .then((data) => {
            if (data && data != null) {
                return { code: productMsg.CODE.ok, message: productMsg.MESSAGE.AddSuccess, status: true, data: data };
            } else {
                return { code: productMsg.CODE.badRequest, message: productMsg.MESSAGE.issueWithAdd, status: false, data: {} };
            }
        }).catch((er) => {
            console.log('-------------er----',er)
            return { code: productMsg.CODE.badRequest, message: productMsg.MESSAGE.issueWithAdd, status: false, data: {} };
        })
}


function getProductDetails(req, res) {
    return productService.getProductDetails(req, res)
        .then((data) => {
            if (data && data != null) {
                if (data && data == 1) {
                    return { code: productMsg.CODE.badRequest, message: productMsg.MESSAGE.dataNotFound, status: true, data: {} };
                } else {
                    return { code: productMsg.CODE.ok, message: productMsg.MESSAGE.getProductSuccess, status: true, data: data };
                }
            } else {
                return { code: productMsg.CODE.badRequest, message: productMsg.MESSAGE.issueWithGet, status: false, data: {} };
            }
        }).catch((er) => {
            console.log(er);

            return { code: productMsg.CODE.badRequest, message: productMsg.MESSAGE.issueWithGet, status: false, data: {} };
        })
}


function listProduct(req, res) {
    return productService.listProduct(req, res)
        .then((data) => {
            if (data && data != null) {
                return { code: productMsg.CODE.ok, message: productMsg.MESSAGE.listProductSuccess, status: true, data: data };
            } else {
                return { code: productMsg.CODE.badRequest, message: productMsg.MESSAGE.issueWithList, status: false, data: {} };
            }
        }).catch((er) => {
            return { code: productMsg.CODE.badRequest, message: productMsg.MESSAGE.issueWithList, status: false, data: {} };
        })
}



function editProduct(req, res) {
    return productService.editProduct(req, res)
        .then((data) => {
            if (data && data != null) {
                if (data && data == 1) {
                    return { code: productMsg.CODE.badRequest, message: productMsg.MESSAGE.dataNotFound, status: true, data: {} };
                } else {
                    return { code: productMsg.CODE.ok, message: productMsg.MESSAGE.updateProductSuccess, status: true, data: data };
                }
            } else {
                return { code: productMsg.CODE.badRequest, message: productMsg.MESSAGE.issueWithUpdate, status: false, data: {} };
            }
        }).catch((er) => {
            console.log(er);

            return { code: productMsg.CODE.badRequest, message: productMsg.MESSAGE.issueWithUpdate, status: false, data: {} };
        })
}

function removeProduct(req, res) {
    return productService.removeProduct(req, res)
        .then((data) => {
            if (data && data != null) {
                if (data && data == 1) {
                    return { code: productMsg.CODE.badRequest, message: productMsg.MESSAGE.dataNotFound, status: true, data: {} };
                } else {
                    return { code: productMsg.CODE.ok, message: productMsg.MESSAGE.removeProductSuccess, status: true, data: data };
                }
            } else {
                return { code: productMsg.CODE.badRequest, message: productMsg.MESSAGE.issueWithRemove, status: false, data: {} };
            }
        }).catch((er) => {
            console.log(er);

            return { code: productMsg.CODE.badRequest, message: productMsg.MESSAGE.issueWithRemove, status: false, data: {} };
        })
}


// 
module.exports = {
    addProduct,
    getProductDetails,
    listProduct,
    editProduct,
    removeProduct
};
