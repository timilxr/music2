import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import {Redirect} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/admin/login';
import Home from './pages/home';
import Post from './components/post';
import Category from './pages/category';
import Author from './pages/author';
import About from './components/about';
// import SideNav from './components/sidenav';
// import AddPost from './components/add_post';

function App() {
  return (
    <Router className="container-fluid">
    {/* <div className='container-fluid'> */}
    {/* <Redirect to="/home" /> */}
    <Switch>
      <Route path='/admin' component={Login} />
      <Route exact path='/' component={Home} />
      <Route exact path='/about_us' component={About} />
      <Route exact path='/post/:topicId' component={Post} />
      {/* <Route exact path='/side' component={SideNav} /> */}
      <Route exact path='/category/:catId' component={Category} />
      <Route exact path='/author/:author' component={Author} />
    </Switch>
    {/* <Login /> */}
      {/* <Route path={`/admin/add_post`} component={AddPost} /> */}
      <div className="bg-dark sticky-bottom container-fluid">
                        <hr />
                        <div className="row justify-content-center">
                        <div className='footer text-center my-5 text-white'>
                        123 Fifth Avenue, NY 10160, New York, USA  |  Phone: 800-123-456  |  Email: contact@example.com
                        <br />
                        <br />
                        Copyright © {new Date().getFullYear()} Throne of Gamers
                        <br />
                        <Link to="/admin" className='text-danger text-decoration-none'>Admin</Link>
                        <p>
                        <Link to="/about_us" className='text-danger text-decoration-none'>About Us</Link>
                        </p>
                        </div>
                    </div>
            
                </div>
    {/* </div> */}
    </Router>
  );
}

export default App;
