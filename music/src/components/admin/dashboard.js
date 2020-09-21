import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Card} from 'react-bootstrap';
// import Sidenav from './sidenav';
// import Header from './header';
// import Footer from './footer';

export default class Dashboard extends Component{
    constructor(props){
        super(props);

        this.state = {
            posts: 0,
            comments: 34,
            categories: 0,
            users: 5
        }
    }
    componentDidMount(){
        axios.get('/posts/')
        .then(response =>{
            this.setState({
                posts: response.data.length
            });
        })
        .catch((error)=> console.log(error));
        axios.get('/users/')
        .then(response =>{
            this.setState({
                users: response.data.length
            });
        })
        .catch((error)=> console.log(error));
        axios.get('/categories/')
        .then(response =>{
            this.setState({
                categories: response.data.length
            });
        })
        .catch((error)=> console.log(error));
    }

    render(){
        return(
            <div className="">
                <div className="row my-5">
                    <div className="col-lg-3 col-md-6 col-6">
                        <div className="card shadow mb-5 bg-white rounded">
                            <div className="card-heading">
                                <div className="row">
                                    <div className="col-md-7 pl-5 pt-3">
                                        {/* <i className="fa fa-file-text fa-5x"></i> */}
                                        <i className="far fa-newspaper display-3"></i>
                                    </div>
                                    <div className="col-md-5 text-right card-body">
                                        <div className="huge"><h1>{this.state.posts}</h1></div>
                                        <div><h5>Posts</h5></div>
                                    </div>
                                </div>
                            </div>
                            <Link to="/admin/view_posts">
                                <div className="card-footer">
                                    <Card.Text><span className="pull-left text-black-50 mr-auto"><b>View Details</b></span> &nbsp;
                                    <span className="pull-right ml-auto"><i className="fas fa-arrow-alt-circle-right text-muted"></i></span></Card.Text>
                                </div>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="col-lg-3 col-md-6 col-6">
                        <div className="card shadow mb-5 bg-white rounded">
                            <div className="card-heading">
                                <div className="row">
                                    <div className="col-md-7 pl-5 pt-3">
                                        <i className="fa fa-user fa-5x"></i>
                                    </div>
                                    <div className="col-md-5 text-right card-body">
                                        <div className="huge"><h1>{this.state.users}</h1></div>
                                        <div><h5>Users</h5></div>
                                    </div>
                                </div>
                            </div>
                            <Link to="/admin/users">
                                <div className="card-footer">
                                    <Card.Text><span className="pull-left text-black-50 mr-auto"><b>View Details</b></span> &nbsp;
                                    <span className="pull-right ml-auto"><i className="fas fa-arrow-alt-circle-right text-muted"></i></span></Card.Text>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-6 mt-3 mt-lg-0">
                        <div className="card shadow mb-5 bg-white rounded">
                            <div className="card-heading">
                                <div className="row">
                                    <div className="col-md-5 pl-5 pt-3">
                                        {/* <i className="fa fa-file-text fa-5x"></i> */}
                                        <i className="fas fa-layer-group fa-5x"></i>
                                    </div>
                                    <div className="col-md-7 text-right card-body">
                                        <div className="huge"><h1>{this.state.categories}</h1></div>
                                        <div><h5>Categories</h5></div>
                                    </div>
                                </div>
                            </div>
                            <Link to="/admin/categories">
                                <div className="card-footer">
                                    <Card.Text><span className="pull-left text-black-50 mr-auto"><b>View Details</b></span> &nbsp;
                                    <span className="pull-right ml-auto"><i className="fas fa-arrow-alt-circle-right text-muted"></i></span></Card.Text>
                                </div>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="col-lg-3 col-md-6 col-6 mt-3 mt-lg-0">
                        <div className="card shadow mb-5 bg-white rounded">
                            <div className="card-heading">
                                <div className="row">
                                    <div className="col-md-7 pl-5 pt-3">
                                        <i className="fas fa-th-list fa-5x"></i>
                                    </div>
                                    <div className="col-md-5 text-right card-body">
                                        <div className="huge"><h1>{this.state.comments}</h1></div>
                                        <div><h5>Posts</h5></div>
                                    </div>
                                </div>
                            </div>
                            <Link to="/admin/view_posts" className="text-no-underline">
                                <div className="card-footer">
                                    <Card.Text><span className="pull-left text-black-50 mr-auto"><b>View Details</b></span> &nbsp;
                                    <span className="pull-right ml-auto"><i className="fas fa-arrow-alt-circle-right text-muted"></i></span></Card.Text>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* <button type='submit' onClick={this.props.logout} className='btn btn-primary'>Log Out</button> */}
            </div>
        )
    }
}