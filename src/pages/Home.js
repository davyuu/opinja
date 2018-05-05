import React from 'react'
import {Link} from 'react-router-dom'
import data from '../data/data'
import './Home.css'

const Home = () => (
	<div className='home'>
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
							to={`/restaurant/${restaurant.id}`}
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
