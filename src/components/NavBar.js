import React from 'react'
import {Link} from 'react-router-dom'
import routes from '../constants/routes'
import logo from '../images/logo.svg'
import './NavBar.css'

class NavBar extends React.Component {
	render() {
		return (
			<div className='nav-bar'>
				<header className="nav-header">
					<div>
						<Link to={routes.home}>Home</Link>
						{' | '}
						<Link to={routes.restaurant}>Restaurant</Link>
					</div>
					<img src={logo} className="nav-logo" alt="logo" />
					<h1 className="nav-title">Welcome to IsPoll</h1>
				</header>
			</div>
		)
	}
}

export default NavBar
