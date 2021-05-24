import React, { Component } from 'react'
import ProductService from '../services/ProductsService';

class ViewProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            product_name: '',
            product_specs: []
        }
    }

    componentDidMount() {
        ProductService.getProductById(this.state.id).then(async (res) => {
            console.log('------product-------', res)
            let product = await res['data'];
            if (product.code == 200) {
                product = product['data'];
                this.setState({
                    product_name: product.product_name,
                    product_specs: product.product_specs,
                });
            }
        });

    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center"> View Product Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6"> Product name: </div>
                            <div className="col-md-6"> {this.state.product_name}</div>
                        </div>
                        <div className="row">

                            <div className="col-md-6"> Product Specifications: </div>
                            <div className="col-md-6">

                                {this.state.product_specs.length ? this.state.product_specs.map((obj, idx) => (
                                    <div className="row"  key={idx}>

                                        <div className="col-md-6">{Object.keys(obj)[0]}</div>
                                        <div className="col-md-6">{obj[Object.keys(obj)]}</div>

                                    </div>
                                )) :''}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewProductComponent