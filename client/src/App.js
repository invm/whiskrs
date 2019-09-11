import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AppNavbar, Sidebar } from './components/layout';
import {
  Home,
  NotFound,
  Register,
  Login,
  Feed
  // Profile
} from './components/pages/';
import PostModal from './components/posts/PostModal';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppNavbar />
        <Container>
          <div className='grid-1-3'>
            <PostModal />
            <div>
              <Switch>
                <Route exact path='/feed' component={Feed} />
                {/* <Route exact path='/profile' component={Profile} /> */}
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/' component={Home} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <Sidebar />
          </div>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
