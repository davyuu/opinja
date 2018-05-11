import React from 'react'
import { Query } from "react-apollo";
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'
import './Home.css'

const Home = () => (
	<Query
		query={gql`
			{
			  restaurants {
			    id
			    name
			    items {
			      id
			      name
			      recommend
			    }
			  }
			}
		`}
	>
		{({loading, error, data}) => {
			if(loading) return <p>Loading...</p>
			if(error) return <p>Error :(</p>

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
		}}
	</Query>
)

export default Home
