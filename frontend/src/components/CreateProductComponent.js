import React, { Component } from 'react'
import ProductService from '../services/ProductsService';

class CreateProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            product_name: '',
            product_specs: [{'':''}],
            // files:[]
        }
        this.changeProductNameHandler = this.changeProductNameHandler.bind(this);
        this.saveOrUpdateProduct = this.saveOrUpdateProduct.bind(this);
    }

    // step 3
    componentDidMount() {

        // step 4
        if (this.state.id === '_add') {
            return
        } else {
            ProductService.getProductById(this.state.id).then(async(res) => {
                console.log('------product-------',res)
                let product =await res['data'];
                if(product.code == 200){
                    product = product['data'];
                    this.setState({
                        product_name: product.product_name,
                        product_specs: product.product_specs,
                    });
                }
            });
        }
    }
    saveOrUpdateProduct = (e) => {
        e.preventDefault();
        let product = { product_name: this.state.product_name,product_specs:JSON.stringify(this.state.product_specs)};
     

        // step 5
        if (this.state.id === '_add') {
            ProductService.createProduct(product).then(res => {
                this.props.history.push('/products');
            });
        } else {
            ProductService.updateProduct(product, this.state.id).then(res => {
                this.props.history.push('/products');
            });
        }
    }

    changeProductNameHandler = (event) => {
        this.setState({ product_name: event.target.value });
    }


    cancel() {
        this.props.history.push('/products');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Product</h3>
        } else {
            return <h3 className="text-center">Update Product</h3>
        }
    }

    changeKeyHandler = idx => evt => {
        evt.target.value = evt.target.value.toString()
        console.log('---key-------',);
        // this.state.product_specs[idx][evt.target.value] = '';

        this.state.product_specs[idx] = {[`${evt.target.value}`]: ''};
        console.log('---newSpecs-------',this.state.product_specs );

        this.setState({ product_specs: this.state.product_specs });
    };

    changeValueHandler = idx => evt => {
        console.log('---value-------',Object.keys(this.state.product_specs[idx]));
    
       this.state.product_specs[idx][Object.keys(this.state.product_specs[idx])[0].toString()] = evt.target.value;

        console.log('---newSpecs-------',this.state.product_specs );

        this.setState({ product_specs: this.state.product_specs });
    };

    handleAddSpec = () => {
        this.setState({
            product_specs: this.state.product_specs.concat([{ '': "" }])
        });
      };

      
      handleRemoveSpec = idx => () => {
    this.setState({
        product_specs: this.state.product_specs.filter((s, sidx) => idx !== sidx)
    });
  };

    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Product Name: </label>
                                        <input placeholder="Product Name" name="product_name" className="form-control"
                                            value={this.state.product_name} onChange={this.changeProductNameHandler} />
                                    </div>
                                    <div>
                                        Product Specification
                     
                                        <button type="button" className="btn btn-primary float-right ml-2"   onClick={this.handleAddSpec}>
                                            {/* <i className="fa fa-plus" aria-hidden="true" />{" "} */}
                                                Add
                                        </button>
                                    </div>

                                    {this.state.product_specs.map((obj, idx) => (

                                        <div className="row"  key={idx}>
                                            <div className="col-md-5">

                                                <div className="form-group">
                                                    <label> Key : </label>
                                                    <input placeholder="key" name="key" className="form-control"
                                                        value={Object.keys(obj)[0]} onChange={this.changeKeyHandler(idx)} />
                                                </div>
                                            </div>

                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    <label> Value : </label>
                                                    <input placeholder="value" name="value" className="form-control"
                                                        value={obj[Object.keys(obj)]} onChange={this.changeValueHandler(idx)} />
                                                </div>
                                            </div>
                                           
                                            <div className="col-md-2">
                                                <div className="form-group">
                                                            <label> {' '} </label>
                                                    <button className="btn btn-primary float-right"  onClick={this.handleRemoveSpec(idx)} >
                                                        {/* <i className="fa fa-plus" aria-hidden="true" />{" "} */}
                                                            Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}


                                    {/* <div>
                                        Product Files
                     
                                        <button type="button" className="btn btn-primary float-right ml-2"   onClick={this.handleAddSpec}>
                                  
                                                Add
                                        </button>
                                    </div> */}
                                    
                                    <div className="mt-2">
                                        <button className="btn btn-success" onClick={this.saveOrUpdateProduct}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateProductComponent

