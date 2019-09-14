import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AppNavbar, Sidebar } from './components/layout';
import { Home, NotFound, Profile } from './components/pages/';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <AppNavbar />
          <Container>
            <div className='grid-1-3'>
              <div>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route
                    exact
                    path='/profile/:id'
                    render={props => <Profile props={props} />}
                  />
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
}

export default App;
