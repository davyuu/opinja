import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import {HashRouter as Router, Route, Redirect} from 'react-router-dom'
import HeaderBar from './components/HeaderBar'
import Pages from './pages'
import routes from './constants/routes'
import {isLoggedIn} from './utils/storage'
import './App.css';

const env = process.env.NODE_ENV
let BASE_URL
if(env === 'prod') {
  BASE_URL = `https://opinja-server.herokuapp.com`
} else if(env === 'dev') {
  BASE_URL = `http://localhost:4000`
}

const client = new ApolloClient({
  uri: `${BASE_URL}/graphql`
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <HeaderBar/>
            <Route exact path={routes.welcome} component={Pages.Welcome}/>
            <PrivateRoute path={routes.home} component={Pages.Home}/>
            <PrivateRoute path={`${routes.restaurant}/:id`} component={Pages.Restaurant}/>
            <PrivateRoute path={`${routes.profile}/:id`} component={Pages.Profile}/>
            <PrivateRoute path={routes.top} component={Pages.Top}/>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: {from: props.location}
          }}
        />
      )
    }
  />
)
