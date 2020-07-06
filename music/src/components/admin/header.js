import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Nav, Navbar} from 'react-bootstrap';


import Sidenav from './sidenav';
import Dashboard from './dashboard';
import AddPost from './add_post';
import ViewPost from './view_post';
import ViewUser from './view_users';
import EditPost from './Edit_posts';
import AddCategory from './add_category';

export default class Header extends Component{
    constructor(props){
        super(props);
        // console.log(props.link);
        // console.log(props.path);
        this.state={
            link: props.link,
            path: props.path
        }
    }

    componentDidMount(){
        this.setState({

        });
    }

    render(){
        
        return(
            <div>
                <Navbar collapseOnSelect bg="dark" variant="dark" expand="md">
                    <Link to='/' className='nav-link'><Navbar.Brand>BLOG</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto" defaultActiveKey={this.state.path}>
                            <Button variant="outline-danger" onClick={this.props.logout}>Log Out</Button>{' '}
                            <Link to='/' className='nav-link'><Navbar.Text>Timi</Navbar.Text></Link>
                            {/* <Link to='/' className='nav-link'><Navbar.Text>Timi</Navbar.Text></Link> */}
                            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                    
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <h2>WELCOME TO ADMIN</h2><br/>
                            <h5>Timi</h5>
                        </div>
                        <div className="row">
                            <div className="col-lg-2 col-md-3 col-12">
                            <Sidenav/>
                            </div>
                            <div className="col-lg-10 col-md-9 col-12">
                            <div className="justify-content-center"></div>
                            {/* <Router> */}
                                <Route path='/admin/Dashboard' component={Dashboard} />
                                <Route path='/admin/add_post' component={AddPost} />
                                <Route path='/admin/view_posts' component={ViewPost} />
                                <Route path='/admin/users' component={ViewUser} />
                                <Route path='/admin/Edit_post/:id' component={EditPost} />
                                <Route path='/admin/categories' component={AddCategory} />
                            {/* </Router> */}




                            </div>
                        </div>
                    </div>
                    <div className="bg-dark sticky-bottom">
                        <hr />
                        <div className="row justify-content-center">
                        <div className='footer text-center my-5 text-white'>
                        123 Fifth Avenue, NY 10160, New York, USA  |  Phone: 800-123-456  |  Email: contact@example.com
                        <br />
                        <br />
                        Copyright © {new Date().getFullYear()} Throne of Gamers
                        </div>
                    </div>
            
                </div>
            </div>
        )
    }
}