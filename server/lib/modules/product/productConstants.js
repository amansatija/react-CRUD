
let CODE = {
    ok: 200,
    badRequest: 400,
    required: 500
}

let MESSAGE = {
    issueWithAdd: 'There is some issue with add product',
    AddSuccess: 'Product created successfully',
    alreadyExist: 'Product already exits.',
    dataNotFound: 'Data not found.',
    getProductSuccess: 'Product details get successfully.',
    issueWithGet: 'There is some issue with get product details',
    listProductSuccess: 'Product listing successflly.',
    issueWithList: 'There is some issue with list Product.',
    updateProductSuccess: 'Product updated successfully',
    issueWithUpdate:'There is some issue with update product details',
    removeProductSuccess:'Product deleted successfully',
    issueWithRemove:'There is some issue with delete product details',
    uploadSuccess:'Image uploaded successfully.',
    issueWithUpload:'There is some issue with upload image',

}
module.exports = {
    MESSAGE,
    CODE,

}