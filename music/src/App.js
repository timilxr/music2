import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/admin/login';
import Home from './components/home';
// import AddPost from './components/add_post';

function App() {
  return (
    <Router>
    <div className='container-fluid'>
      <Route path='/admin' component={Login} />
      <Route path='/' component={Home} />
    {/* <Login /> */}
      {/* <Route path={`/admin/add_post`} component={AddPost} /> */}
    </div>
    </Router>
  );
}

export default App;
