import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Nav, Navbar, Button} from 'react-bootstrap';


export default class Sidenav extends Component{
    constructor(props){
        super(props);
        // console.log(props.link);
        // console.log(props.path);
        this.state={
            link: props.link,
            path: props.path
        }
    }

    render(){
       
        return(
    //     <nav className="navbar navbar-expand-md navbar-dark">
    //         <button className="navbar-toggler bg-dark" type="button" data-toggle="collapse" data-target="#collapse">
    //             <span className="navbar-toggler-icon"></span>
    //         </button>
    //         <div className="collapse navbar-collapse" id="collapse">
    //             <ul className="list-group">
    //                 <li className="list-group-item bg-dark list-group-item-action list-group-item-dark">
    //                     <Link to='/admin/dashboard' className='nav-link'>DASHBOARD</Link>
    //                 </li>
            
    //                 <li className="list-group-item bg-dark list-group-item-action list-group-item-dark">
    //                     <Link to='/admin/add_post' className='nav-link'>Add Post</Link>
    //                 </li>
    //                 <li className="list-group-item bg-dark list-group-item-action list-group-item-dark">
    //                     <Link to='/admin/view_post' className='nav-link'>View Posts</Link>
    //                 </li>
                      
    //                 <li className="list-group-item bg-dark list-group-item-action list-group-item-dark">
    //                     <Link to='/' className='nav-link'>Add User</Link>
    //                 </li>
    //                 <li className="list-group-item bg-dark list-group-item-action list-group-item-dark">
    //                 <Link to='/' className='nav-link'>View All Users</Link>
    //                 </li>
                                
                    
    //                 <a href="comments.php">
    //                     <li className="list-group-item bg-dark list-group-item-action list-group-item-dark">COMMENTS</li>
    //                 </a>
    //                 <a href="first.html">
    //                     <li className="list-group-item bg-dark list-group-item-action list-group-item-dark">LOG OUT</li>
    //                 </a>
    //             </ul>
    //         </div>  
    // </nav>
                <Navbar collapseOnSelect bg="dark" variant="dark" expand="md">
                    {/* <Link to='/' className='nav-link'><Navbar.Brand>BLOG</Navbar.Brand></Link> */}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ml-auto" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="flex-column" defaultActiveKey={this.state.link}>
                            <Nav.Item>
                                <Link to='/admin/dashboard' className='nav-link mt-3'>DASHBOARD</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link to='/admin/add_post' className='nav-link mt-3'>Add Post</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link to='/admin/view_posts' className='nav-link mt-3'>View Posts</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link to='/admin/categories' className='nav-link mt-3'>Categories</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link to='/admin/categories' className='nav-link mt-3'>Add User</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link to='/admin/users' className='nav-link mt-3'>View Users</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Button variant="outline-danger" className='mt-3' onClick={this.props.logout}>Log Out</Button>{' '}
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
        )
    }
}