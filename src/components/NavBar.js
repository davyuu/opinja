import React from 'react'
import {Link} from 'react-router-dom'
import routes from '../constants/routes'
import logo from '../images/logo.svg'
import './NavBar.css'

export default class NavBar extends React.Component {
	render() {
		return (
			<div className='nav-bar'>
				<header className='nav-header'>
					<div className='nav-links'>
						<Link
							className='nav-link'
							to={routes.home}
						>
							Home
						</Link>
					</div>
					<img src={logo} className='nav-logo' alt='logo' />
				</header>
			</div>
		)
	}
}