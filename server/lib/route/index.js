const productRouter = require('../modules/product/productRoute'); // Load user routes

module.exports = function (app) {

    app.use('/api/product', productRouter); 

    app.use(function (req, res) {
        res.status(404).send("404 page not found")
    });
};