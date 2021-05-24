import React, { Component } from 'react'
import ProductService from '../services/ProductsService';

class ListProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: []
        }
        this.addProduct = this.addProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    deleteProduct(id) {
        ProductService.deleteProduct(id).then(res => {
            this.setState({ products: this.state.products.filter(product => product.id !== id) });
        });
    }
    viewProduct(id) {
        this.props.history.push(`/view-product/${id}`);
    }
    editProduct(id) {
        this.props.history.push(`/add-product/${id}`);
    }

    componentDidMount() {
        ProductService.getProducts().then((res) => {
            res = res['data'];
            console.log('-----------------------------------------daaa', res)
            if (res['code'] == 200) {
                this.setState({ products: res.data });
            }
        });
    }

    addProduct() {
        this.props.history.push('/add-product/_add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Product List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addProduct}> Add Product</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th> Product Name</th>
                                {/* <th> Product Name</th>
                                <th> Product Id</th> */}
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.products.map(
                                    product =>
                                        <tr key={product.id}>
                                            <td> {product.product_name} </td>
                                            {/* <td> {product.lastName}</td>
                                            <td> {product.emailId}</td> */}
                                            <td>
                                                <button onClick={() => this.editProduct(product.id)} className="btn btn-info">Update </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteProduct(product.id)} className="btn btn-danger">Delete </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewProduct(product.id)} className="btn btn-info">View </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default ListProductComponent