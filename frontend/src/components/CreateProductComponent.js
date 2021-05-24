import React, { Component } from 'react'
import ProductService from '../services/ProductsService';
import { toast } from "react-toastify";
import {
    Carousel,
    Modal,
  } from "react-bootstrap";

class CreateProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            product_name: '',
            product_specs: [{'':''}],
            files:[],
            showModel:false,
            showImages:[]
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
                        showImages: product.files,
                    });
                }
            });
        }
    }
    saveOrUpdateProduct = (e) => {
        e.preventDefault();
        
        // step 5
        if (this.state.id === '_add') {
            let product = { 
                product_name: this.state.product_name,
                product_specs:JSON.stringify(this.state.product_specs),
                files:JSON.stringify(this.state.files),
            };
         
            ProductService.createProduct(product).then(res => {
                this.props.history.push('/products');
            });
        } else {

            let product = { 
                product_name: this.state.product_name,
                product_specs:JSON.stringify(this.state.product_specs),
            };
     

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

    changeFileHandler= idx =>async evt => {
        if (evt.target.files && evt.target.files[0]) {
            if (evt.target.files[0].name.match(/\.(jpeg|jpg|png|)$/)) {

              const formData = evt.target.files[0];

              let uploadType = "image";
              const response = await ProductService.uploadData(
                uploadType,
                formData,
              );
              console.log('--------response-------response-',response.data)
              if (response) {
                this.state.files[idx] = {'path': response.data.data};
                console.log('--------this.state.files -------response-',this.state.files )

                this.setState({ files: this.state.files });

              } else {
                console.log("error in uploading");
              }
        } else {
          toast.error(
            "The file you are trying to upload is not in supported format, please try again"
          );
        }
      }
    }

             
       

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


      handleAddFiles = () => {
       this.setState({
        files: this.state.files.concat([{'path': "" }])
       });
    };


     
    handleRemoveFiles = idx => () => {
        this.setState({
            files: this.state.files.filter((s, sidx) => idx !== sidx)
        });
    };
 

    handleCloseModel  = () => {
        this.setState({
            showModel: this.state.showModel  ? false : true
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
                                    <div className="d-flex justify-content-between py-2">
                                        Product Specification
                     
                                        <button type="button" className="btn btn-primary float-right ml-2"   onClick={this.handleAddSpec}>
                                            <i className="fa fa-plus" aria-hidden="true" />{" "}
                                              
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


                                    <div className="d-flex justify-content-between py-2">
                                        Product Files
                     
                                        <button type="button" className="btn btn-primary float-right ml-2"   onClick={this.handleAddFiles}>
                                  
                                        <i className="fa fa-plus" aria-hidden="true" />{" "}
                                        </button>
                                    </div>
                                    
                                    {this.state.files.map((obj, idx) => (

                                    <div className="row" key={idx}>

                                           <div className="col-md-10">
                                                <div className="form-group">
                                                    <label> File : </label>
                                                    <input placeholder="path" type="file" name="path" className="form-control"
                                                        onChange={this.changeFileHandler(idx)} />
                                                </div>
                                            </div>
                                           
                                            <div className="col-md-2">
                                                <div className="form-group">
                                                            <label>{ ' '}</label>
                                                    <button className="btn btn-primary float-right"  onClick={this.handleRemoveFiles(idx)} >
                                                        {/* <i className="fa fa-plus" aria-hidden="true" />{" "} */}
                                                            Remove
                                                    </button>
                                                </div>
                                            </div>
                                    </div>
                                   ))}

                                 {(this.state.id !== '_add' ?
                                          <div className="d-flex justify-content-between py-2">
                                        
                     
                                        <button type="button" className="btn btn-primary float-right ml-2"   onClick={this.handleCloseModel}>
                                  
                                       {"View Images"}
                                        </button>
                                    </div>  : '')}

                                    


                                    <div className="mt-2">
                                        <button className="btn btn-success" onClick={this.saveOrUpdateProduct}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
                {/* Unstake Modal */}
                <Modal show={this.state.showModel} onHide={this.handleCloseModel} centered>
                 <Modal.Header className="border-0 p-0" closeButton></Modal.Header>
                 <Modal.Body>
                 <Carousel >
                 {/* showImages */}
                 {this.state.showImages.length >0 ? this.state.showImages.map((obj, idx) => (
                   <Carousel.Item key={idx}>
                            <img
                            className="d-block w-100"
                            src={obj.path}
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3>First slide label {idx}</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                      )):''}
                        </Carousel>
                 </Modal.Body>
                </Modal>

            </div>                



        )
    }
}

export default CreateProductComponent

