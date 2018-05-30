import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import Dock from 'react-dock'
import MaterialIcon from 'material-icons-react'
import routes from '../constants/routes'
import {isLoggedIn, logout} from '../utils/functions'
import logo from '../images/logo.svg'
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

  render() {
    if (!isLoggedIn()) {
      return null
    }
    const {isOpen} = this.state;

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
            <img className='header-logo' src={logo} alt='logo' />
          </Link>
          <Link
            className='header-button'
            to={routes.profile}
          >
            <MaterialIcon
              icon='account_circle'
              size={32}
              invert
            />
          </Link>
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
              onClick={() => logout(this.props.history.push)}
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
