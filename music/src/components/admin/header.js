import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Nav, Navbar} from 'react-bootstrap';


import Sidenav from './sidenav';
import Dashboard from './dashboard';
import AddPost from './add_post';
import ViewPost from './view_post';
import ViewUser from './view_users';
import AddUser from './Add_user';
import EditPost from './Edit_posts';
import AddCategory from './add_category';
import Profile from './Profile';
import {Redirect} from 'react-router-dom';

export default class Header extends Component{
    constructor(props){
        super(props);
        // console.log(props.link);
        // console.log(props.user);
        this.state={
            link: props.link,
            path: props.path,
            name: props.user,
            mail: props.mail,
            category: props.category,
            redirect: false
        };
        console.log(this.state.mail);
    }

    renderRedirect = () => {
        if(this.state.redirect){
         return (
           <Redirect
             to="/admin/dashboard"
           />
          );
        }
      };

    componentDidMount(){
        this.setState({
            redirect: true
        });
    }

    render(){
        const {name, mail, category} = this.state;
        // console.log(name);
        return(
            <div className="bg-info">
                <Navbar collapseOnSelect bg="dark" variant="dark" expand="md">
                    <Link to='/' className="nav-link text-shadow font-weight-bolder" style={{ fontFamily: 'leelawadee Ui', textShadow: `2px 2px 4px #000000` }}><Navbar.Brand>BLOG</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto" defaultActiveKey={this.state.path}>
                            <Button variant="outline-danger" onClick={this.props.logout}>Log Out</Button>{' '}
        <Link to='/' className='nav-link'><Navbar.Text>{name}</Navbar.Text></Link>
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
                            <h2>WELCOME TO ADMIN</h2><br />
                            <h5 className="text-capitalize">{this.props.user}</h5>
                        </div>
                        <div className="row">
                            <div className="col-lg-2 col-md-3 col-12">
                            <Sidenav logout={this.props.logout}/>
                            </div>
                            <div className="col-lg-10 col-md-9 col-12">
                            <div className="justify-content-center"></div>
                            {/* <Router> */}
                            {/* { this.renderRedirect() } */}
                            <Switch>
                            <Route exact path='/admin' component={Dashboard} />
                                <Route path='/admin/dashboard' component={Dashboard} />
                                <Route path='/admin/add_post' render={(props)=>(<AddPost name={name} mail={mail}/>)} />
                                <Route path='/admin/profile' render={(props)=>(<Profile name={name} mail={mail}/>)} />
                                <Route path='/admin/view_posts' render={(props)=>(<ViewPost name={name} mail={mail} category={category}/>)} />
                                <Route path='/admin/users' render = {(props)=>(<ViewUser category={category} />)}/>
                                <Route path='/admin/add_user' render = {(props)=>(<AddUser category={category} />)}/>
                                <Route path='/admin/Edit_post/:id' component={EditPost} />
                                <Route path='/admin/categories' component={AddCategory} />
                            </Switch>
                            {/* </Router> */}




                            </div>
                        </div>
                    </div>
                    {/* <div className="bg-dark sticky-bottom">
                        <hr />
                        <div className="row justify-content-center">
                        <div className='footer text-center my-5 text-white'>
                        123 Fifth Avenue, NY 10160, New York, USA  |  Phone: 800-123-456  |  Email: contact@example.com
                        <br />
                        <br />
                        Copyright © {new Date().getFullYear()} Throne of Gamers
                        </div>
                    </div>
            
                </div> */}
            </div>
        )
    }
}