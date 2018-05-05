import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Restaurant from './pages/Restaurant'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Route exact path="/" component={Home}/>
          <Route path="/restaurant/:id" component={Restaurant}/>
        </div>
      </Router>
    );
  }
}

export default App;
