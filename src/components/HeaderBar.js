import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import Dock from 'react-dock'
import MaterialIcon from 'material-icons-react'
import images from '../images'
import routes from '../constants/routes'
import {getLocalStorageUser, isLoggedIn, logout} from '../utils/functions'
import './HeaderBar.css'

class HeaderBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  open = () => {
    this.setState({isOpen: true});
  }

  close = () => {
    this.setState({isOpen: false});
  }

  logout = () => {
    logout(this.props.history.push)
    this.close()
  }

  render() {
    if (!isLoggedIn()) {
      return null
    }

    const {isOpen} = this.state;
    const user = getLocalStorageUser()

    let profileIcon;
    if(user.id){
      profileIcon = (
        <Link
          className='header-button'
          to={`${routes.profile}/${user.id}`}
        >
          <MaterialIcon
            icon='account_circle'
            size={32}
            invert
          />
        </Link>
      )
    } else {
      profileIcon = (
        <div className='header-profile'/>
      )
    }

    return (
      <div className='header-bar'>
        <div className='header-buttons'>
          <div
            className='header-button'
            onClick={this.open}
          >
            <MaterialIcon
              icon='menu'
              size={32}
              invert
            />
          </div>
          <Link
            className='header-button'
            to={routes.home}
          >
            <div className='header-logo' dangerouslySetInnerHTML={{__html: images.logo}} />
          </Link>
          {profileIcon}
        </div>
        <Dock
          isVisible={isOpen}
          onVisibleChange={this.close}
          size={0.7}
        >
          <div className='nav-bar'>
            <div className='nav-bar-top'>
              <Link
                className='nav-bar-link'
                to={routes.home}
                onClick={this.close}
              >
                Home
              </Link>
              <Link
                className='nav-bar-link'
                to={routes.top}
                onClick={this.close}
              >
                Top
              </Link>
            </div>
            <div
              className='nav-bar-logout'
              onClick={this.logout}
            >
              Logout
            </div>
          </div>
          </Dock>
      </div>
    )
  }
}

export default withRouter(HeaderBar)
