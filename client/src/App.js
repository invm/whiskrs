import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import WhiskrsState from './context/whiskrs/WhiskrsState';

import { Navbar, Sidebar } from './components/layout';
import {
  Home,
  NotFound,
  Register,
  Login,
  Feed,
  Profile
} from './components/pages/';

function App() {
  return (
    <WhiskrsState>
      <Router>
        <Navbar />
        <div className='container'>
          <div className='grid-1-3'>
            <div>
              <Switch>
                <Route exact path='/feed' component={Feed} />
                <Route exact path='/profile' component={Profile} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/' component={Home} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <Sidebar />
          </div>
        </div>
      </Router>
    </WhiskrsState>
  );
}

export default App;
