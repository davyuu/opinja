import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './pages/Home'
import Restaurant from './pages/Restaurant'
import routes from './constants/routes'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={routes.home} component={Home}/>
          <Route exact path={routes.restaurant} component={Restaurant}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
