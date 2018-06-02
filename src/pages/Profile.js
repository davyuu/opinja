import React from 'react'
import {withRouter} from 'react-router-dom'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import MaterialIcon from 'material-icons-react'
import {logout} from '../utils/functions'
import './Profile.css'

class Profile extends React.Component {

  render() {
    // const {loading, user, refetch} = this.props.data
    const {loading, user} = this.props.data
    if(loading) return <div>Loading...</div>

    if(!user) {
      return (
        <div>No User Found</div>
      )
    }

    let profilePic;
    if(user.photoURL) {
      profilePic = (
        <img
          className='profile-pic'
          src={user.photoURL}
          alt='profile'
        />
      )
    } else {
      profilePic = (
        <div className="profile-pic">
          <MaterialIcon
            icon='account_circle'
            size={160}
          />
        </div>
      )
    }

    let twitterHandle;
    if(user.twitterHandle) {
      twitterHandle = (
        <div className='profile-social-value profile-font'>
          @{user.instagramHandle}
        </div>
      )
    } else {
      twitterHandle = (
        <div className='profile-set-value'>
          set twitter handle
        </div>
      )
    }

    let instagramHandle;
    if(user.instagramHandle) {
      instagramHandle = (
        <div className='profile-social-value profile-font'>
          @{user.twitterHandle}
        </div>
      )
    } else {
      instagramHandle = (
        <div className='profile-set-value'>
          set instagram handle
        </div>
      )
    }

    return (
      <div className='profile'>
        <div className='profile-header'>
          {profilePic}
          <div className='profile-font profile-name'>{user.name}</div>
        </div>
        <div className='profile-type profile-font'>
          <span className='profile-type-value'>Silver</span> User
        </div>
        <div className='profile-divider'/>
        <div className='profile-points'>
          <div className='profile-points-label profile-font'>Points</div>
          <div className='profile-font'>{user.points}</div>
        </div>
        <div className='profile-divider'/>
        <div className='profile-social'>
          <div className='profile-label profile-font'>Twitter:</div>
          {twitterHandle}
        </div>
        <div className='profile-divider'/>
        <div className='profile-social'>
          <div className='profile-label profile-font'>Instagram:</div>
          {instagramHandle}
        </div>
        <div className='profile-divider'/>
        <div
          className='profile-logout'
          onClick={() => logout(this.props.history.push)}
        >
          Logout
        </div>
      </div>
    )
  }
}

const QUERY_USER = gql`
  query getUser($id: String!) {
    user(id: $id) {
      email
      name
      photoURL
      instagramHandle
      twitterHandle
      points
    }
  }
`

const OPTIONS_USER = {
  options: props => ({
    variables: {
      id: props.location.state.id
    }
  })
}

export default graphql(QUERY_USER, OPTIONS_USER)(withRouter(Profile))
