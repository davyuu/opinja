import React from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {Link} from 'react-router-dom'
import './Home.css'

class Home extends React.Component {
	render() {
		const {data} = this.props
		if(data.loading) return <p>Loading...</p>

		const {restaurants} = data;
		return (
			<div className='home'>
				<h1 className="home-title">
					SELECT A RESTAURANT
				</h1>
				<div className='home-list'>
					{restaurants.map((restaurant, i) => {
						return (
							<Link
								key={i}
								className="home-list-item-link"
								to={`/restaurant/${restaurant.id}`}
							>
								{restaurant.name}
							</Link>
						)
					})}
				</div>
			</div>
		)
	}
}

const query = gql`{
  restaurants {
    id
    name
  }
}`

export default graphql(query)(Home)
