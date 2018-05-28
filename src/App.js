import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import HeaderBar from './components/HeaderBar'
import Welcome from './pages/Welcome'
import Home from './pages/Home'
import Restaurant from './pages/Restaurant'
// import NotFound from './pages/NotFound'
import routes from './constants/routes'
import {isLoggedIn} from './utils/functions'
import './App.css';

const BASE_URL = `http://localhost:4000`
// const BASE_URL = `https://ispoll-server.herokuapp.com`
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
            <Route exact path={routes.welcome} component={Welcome}/>
            <PrivateRoute path={routes.home} component={Home}/>
            <PrivateRoute path={`${routes.restaurant}/:id`} component={Restaurant}/>
            {/*<Route path={routes.notFound} component={NotFound}/>*/}
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
