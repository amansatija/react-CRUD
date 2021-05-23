

const joi = require('@hapi/joi')
const constants = require('../../../constants');
const productMsg = require('./productConstants');


function validationErrorHandler(res, error) {
    res.send({
        code: productMsg.CODE.badRequest,
        status: false,
        message: error.details ? error.details[0].message : 'There is some issue in validation.'
    })
}


// valid(constants.ARTICLE_LIKE_TYPE.LIKE,constants.ARTICLE_LIKE_TYPE.DISLIKE)
async function addProductValidate(req, res, next) {
    try {
        // create schema for id parameter
        const schema = joi.object({
            product_name: joi.string().max(25).required()
                .messages({
                    'string.length': constants.MESSAGES.invalidProductName,
                    'string.empty': constants.MESSAGES.productnameRequired,
                    'any.required': constants.MESSAGES.productnameRequired
                }),
         
        });
        await schema.validateAsync(req.body, { allowUnknown: true })
        next();
    } catch (error) {
        console.log(error)
        validationErrorHandler(res, error);
    }
}


async function validateId(req, res, next) {
    try {
        // create schema for id parameter
        const bodySchema = joi.object({
            // page: joi.number().optional().min(1),
            id: joi.number().optional().min(1).max(5000)
        });
        await bodySchema.validateAsync(req.body, { allowUnknown: false })

        next();
    } catch (error) {
        console.log(error)
        validationErrorHandler(res, error);
    }
}


module.exports = {
    addProductValidate,
    validateId
}



