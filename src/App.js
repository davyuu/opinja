import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import {HashRouter as Router, Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Restaurant from './pages/Restaurant'
import './App.css';

const client = new ApolloClient({
  uri: `http://localhost:4000/graphql`
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <NavBar/>
            <Route exact path="/" component={Home}/>
            <Route path="/restaurant/:id" component={Restaurant}/>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}