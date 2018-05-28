import React from 'react'
import {Link} from 'react-router-dom'
import Dock from 'react-dock'
import MaterialIcon from 'material-icons-react'
import routes from '../constants/routes'
import {isLoggedIn, clearLocalStorage} from '../utils/functions'
import logo from '../images/logo.svg'
import './HeaderBar.css'

export default class HeaderBar extends React.Component {
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
    clearLocalStorage()
    // this.props.history.push(routes.welcome)
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
          <img className='header-logo' src={logo} alt='logo' />
          <div className='header-button'>
            <MaterialIcon
              icon='account_circle'
              size={32}
              invert
            />
          </div>
        </div>
        <Dock
          isVisible={isOpen}
          onVisibleChange={this.close}
          size={0.7}
        >
          <div className='nav-bar'>
            <Link
              className='nav-bar-link'
              to={routes.home}
              onClick={this.close}
            >
              Home
            </Link>
            <Link
              className='nav-bar-link'
              onClick={this.close}
              to={routes.home}
            >
              Top
            </Link>
          </div>
          </Dock>
      </div>
    )
  }
}
