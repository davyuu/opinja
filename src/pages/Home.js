import React from 'react'
import {Link} from 'react-router-dom'
import routes from '../constants/routes'
import data from '../data/data'
import logo from '../images/logo.svg'
import './Home.css'

const Home = () => (
	<div className='home'>
		<header className="home-header">
			<img src={logo} className="home-logo" alt="logo" />
			<h1 className="home-title">Welcome to IsPoll</h1>
		</header>
		<p className="home-intro">
			SELECT A RESTAURANT
		</p>
		<div className='home-restaurant-list'>
			{data.map((restaurant, i) => {
				return (
					<div
						key={i}
						className='home-restaurant-list-item'
					>
						<Link
							className="home-restaurant-list-item-link"
							to={{
								pathname: routes.restaurant,
								state: {
									restaurant: restaurant
								}
							}}
						>
							{restaurant.name}
						</Link>
					</div>
				)
			})}
		</div>
	</div>
);

export default Home
