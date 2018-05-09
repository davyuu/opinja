import React from 'react'
import {Link} from 'react-router-dom'
import data from '../data/data'
import './Home.css'

class Home extends React.Component {
	render() {
		return (
			<div className='home'>
				<div>
					<h1 className="home-title">
						SELECT A RESTAURANT
					</h1>
					<div className='home-list'>
						{data.map((restaurant, i) => {
							return (
								<div
									key={i}
									className='home-list-item'
								>
									<Link
										className="home-list-item-link"
										to={`/restaurant/${restaurant.id}`}
									>
										{restaurant.name}
									</Link>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		)
	}
}

export default Home
