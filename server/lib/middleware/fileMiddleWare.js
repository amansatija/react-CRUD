const fs = require('fs');

async function fileUpload(req) {
    // once req.files is not working then check expressConfig file and uncomment the code "app.use(fileUpload());"
    return await new Promise((resolve, reject) => {
        // check the upload folder is exist or not      
        fs.exists('Images', (data) => {

            // create path and name of the file
            let filePath = 'Images/' + JSON.stringify(new Date().getTime()) + '-' + req.files.product_image.name;

            // if folder is exist then continue
            if (data) {
                // write file in Images folder
                fs.writeFile(filePath, req.files.product_image.data, (err) => {
                    if (!err) {
                        resolve(filePath)
                    } else {
                        reject(1);
                    }
                });
            } else {
                // create Images folder first
                fs.mkdirSync('Images');
                // write file in Images folder
                fs.writeFile(filePath, req.files.product_image.data, (err) => {
                    if (!err) {
                        resolve(filePath)
                    } else {
                        reject(1)
                    }
                });
            }
        });
    });
}



module.exports = {
    fileUpload, // not used right now
};