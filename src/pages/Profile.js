import React from 'react'
import {withRouter} from 'react-router-dom'
import MaterialIcon from 'material-icons-react'
import {getLocalStorageUser, logout} from '../utils/functions'
import './Profile.css'

class Profile extends React.Component {

  render() {
    const user = getLocalStorageUser();

    return (
      <div className='profile'>
        <div className='profile-header'>
          <div className='profile-pic'>
            <MaterialIcon
              icon='account_circle'
              size={150}
            />
          </div>
          <div className='profile-font profile-name'>{user.name}</div>
        </div>
        <div className='profile-type profile-font'>
          <span className='profile-type-value'>Silver</span> User
        </div>
        <div className='profile-divider'/>
        <div className='profile-points'>
          <div className='profile-points-label profile-font'>Points</div>
          <div className='profile-font'>17302</div>
        </div>
        <div className='profile-divider'/>
        <div className='profile-social'>
          <div className='profile-label profile-font'>Twitter:</div>
          <div className='profile-social-value profile-font'>@davyuu</div>
        </div>
        <div className='profile-divider'/>
        <div className='profile-social'>
          <div className='profile-label profile-font'>Instragram:</div>
          <div className='profile-social-value profile-font'>@davyuu</div>
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

export default withRouter(Profile)
