import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/product/";


class Productservice {

    getProducts(){
        return axios.post(API_BASE_URL+'list');
    }

    createProduct(product){
        return axios.post(API_BASE_URL+'add', product);
    }

    getProductById(productId){
        return axios.get(API_BASE_URL + 'get/' + productId);
    }

    updateProduct(product, productId){
        return axios.put(API_BASE_URL + 'edit/' + productId, product);
    }

    deleteProduct(productId){
        return axios.delete(API_BASE_URL + 'remove/' + productId);
    }

    uploadData(uploadType,file){

        const fd = new FormData();

        fd.append("updDocs", file);
        fd.append("updType", uploadType);
        const headers = {
          "Content-Type": "multipart/form-data",
        };

        return axios.post(API_BASE_URL+'uploadData', fd, { headers });
    }

}

export default new Productservice()