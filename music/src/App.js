import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import {Redirect} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/admin/login';
import Home from './components/home';
// import AddPost from './components/add_post';

function App() {
  return (
    <Router>
    <div className='container-fluid'>
    {/* <Redirect to="/home" /> */}
      <Route path='/admin' component={Login} />
      <Route path='/home' component={Home} />
    {/* <Login /> */}
      {/* <Route path={`/admin/add_post`} component={AddPost} /> */}
    </div>
    </Router>
  );
}

export default App;
