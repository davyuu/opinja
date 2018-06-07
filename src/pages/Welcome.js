import React, {Component} from 'react';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
// import FacebookLogin from 'react-facebook-login';
// import GoogleLogin from 'react-google-login';
import {Redirect} from 'react-router-dom'
import {loginWithFacebook, loginWithGoogle} from '../utils/firebase'
import {getLocalStorageUser, setLocalStorageUser} from '../utils/functions'
import images from '../images'
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

  handleFacebookSignin = () => {
    loginWithFacebook().then(res => {
      console.log('res', res)
      const user = {
        email: res.user.email,
        name: res.user.displayName,
        photoURL: res.additionalUserInfo.profile.picture.data.url,
        providerId: res.credential.providerId,
        token: res.credential.accessToken
      }
      this.signin(user, false)
    }).catch(err => {
      console.log('err', err)
    })
  }

  handleGoogleSignin = () => {
    loginWithGoogle().then(res => {
      console.log('res', res)
      const user = {
        email: res.user.email,
        name: res.user.displayName,
        photoURL: res.user.photoURL,
        providerId: res.credential.providerId,
        token: res.credential.accessToken
      }
      this.signin(user, false)
    }).catch(err => {
      alert(err)
    })
  }

  handleGuestSignin = () => {
    const user = {
      id: null,
      name: 'Guest',
      email: 'guest',
      photoURL: null,
      provider_id: null,
      token: null
    }
    this.signin(user, true)
  }

  signin(user, isGuest) {
    console.log('signing in')
    console.log('user', user)
    if(!isGuest) {
      this.props.mutate({
        variables: user
      }).then(({data}) => {
        console.log('data', data)
        setLocalStorageUser(data.loginUser);
        this.setState({redirect: true});
      }).catch(err => {
        alert(err)
      })
    } else {
      setLocalStorageUser(user);
      this.setState({redirect: true});
    }
  }

  render() {
    if (this.state.redirect || getLocalStorageUser()) {
      return (<Redirect to={routes.home}/>)
    }

    return (
      <div className='welcome'>
        <img
          className='welcome-logo'
          src={images.logo}
        />
        <div className="welcome-signin">
          <div
            className='welcome-signin-button welcome-facebook'
            onClick={this.handleFacebookSignin}
          >
            Connect with Facebook
          </div>
          <div
            className='welcome-signin-button welcome-google'
            onClick={this.handleGoogleSignin}
          >
            Connect with Google
          </div>
          <div
            className='welcome-signin-guest'
            onClick={this.handleGuestSignin}
          >
            I'll log in later
          </div>
        </div>
      </div>
    );
  }
}

const MUTATION_USER = gql`
  mutation loginUser($email: String, $name: String, $photoURL: String, $providerId: String, $token: String) {
    loginUser(email: $email, name: $name, photoURL: $photoURL, providerId: $providerId, token: $token) {
      id
      email
      name
      photoURL
      providerId
      token
    }
  }
`

export default graphql(MUTATION_USER)(Welcome)
