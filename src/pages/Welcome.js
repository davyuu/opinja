import React, {Component} from 'react';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {Redirect} from 'react-router-dom'
import {getLocalStorageUser, setLocalStorageUser} from '../utils/functions'
import keys from '../constants/keys'
import routes from '../constants/routes'
import './Welcome.css';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginError: false,
      redirect: false
    };
    this.signin = this.signin.bind(this);
  }

  signin(res, type) {
    let user;
    if (type === keys.SIGN_IN_FACEBOOK && res.email) {
      user = {
        name: res.name,
        provider: type,
        email: res.email,
        provider_id: res.id,
        token: res.accessToken,
        provider_pic: res.picture.data.url
      };
    }
    if (type === keys.SIGN_IN_GOOGLE && res.w3.U3) {
      user = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa
      };
    }

    if (user) {
      console.log('logging in')
      this.props.mutate({
        variables: user
      }).then(({data}) => {
        console.log('data', data)
        setLocalStorageUser(data.loginUser);
        this.setState({redirect: true});
      }).catch(error => {
        alert(error)
      })
    } else {
      user = {
        name: 'guest',
        provider: 'guest',
        email: 'guest',
        provider_id: null,
        token: null,
        provider_pic: null
      }
      console.log('guest', user)
      setLocalStorageUser(user);
      this.setState({redirect: true});
    }
  }

  render() {
    if (this.state.redirect || getLocalStorageUser()) {
      return (<Redirect to={routes.home}/>)
    }

    const responseFacebook = (response) => {
      console.log('facebook console', response);
      this.signin(response, keys.SIGN_IN_FACEBOOK);
    }

    const responseGoogle = (response) => {
      console.log('google console', response);
      this.signin(response, keys.SIGN_IN_GOOGLE);
    }

    const responseGuest = (response) => {
      console.log('guest console', response);
      this.signin(response, keys.SIGN_IN_GUEST);
    }

    return (
      <div className='welcome'>
        <div className='welcome-signin'>
          <FacebookLogin
            appId={keys.APP_ID_FACEBOOK}
            autoLoad={false}
            fields='name,email,picture'
            callback={responseFacebook}/>
        </div>
        <div className='welcome-signin'>
          <GoogleLogin
            clientId={keys.CLIENT_ID_GOOGLE}
            buttonText='Login with Google'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}/>
        </div>
        <div
          className='welcome-signin-guest'
          onClick={responseGuest}
        >
          Continue as Guest
        </div>
      </div>
    );
  }
}

const MUTATION_USER = gql`
  mutation loginUser($email: String, $name: String, $provider: String, $providerId: String, $providerPic: String, $token: String) {
    loginUser(email: $email, name: $name, provider: $provider, providerId: $providerId, providerPic: $providerPic, token: $token) {
      email
      name
      provider
      providerId
      providerPic
      token
    }
  }
`

export default graphql(MUTATION_USER)(Welcome)
