//Import Config
var env = require('dotenv').config();

// load external modules
const express = require("express");
const cors = require('cors')
const mongoose = require('mongoose');
var bodyparser = require('body-parser');
const app = express();
const fileUpload = require('express-fileupload');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
// app.use(fileUpload());
// app.use('/images', express.static('./Images/'));


app.use(function (req, res, next) {
    //res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization,accessToken," +
        "lat lng,app_version,platform,ios_version,countryISO,Authorization");
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,OPTIONS');
    next();
});

// database connection
mongoose.connect(process.env.dbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//route
require("./lib/route")(app);


app.listen(process.env.port, () => {
    console.log("----->localhost running on port 8080--");
});

