import React from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import './TopRestaurants.css'

class TopRestaurants extends React.Component {
  render() {
    const {data} = this.props
    if(data.loading) return <p>Loading...</p>

    const {restaurants} = data;

    if(!restaurants) {
      return (
        <p>No Restaurants Found</p>
      )
    }

    console.log(restaurants)

    return (
      <div className='top-restaurants'>
        {restaurants.sort((a, b) => a.numRatings < b.numRatings)
          .map((restaurant, i) => {
            return (
              <div
                key={i}
                className='top-restaurant'
              >
                <div className="top-restaurant-rank">{i+1}</div>
                <div className="top-restaurant-name">{restaurant.name}</div>
                <div className="top-restaurant-location">{restaurant.location}</div>
                <div className="top-restaurant-num">{restaurant.numRatings}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const QUERY_RESTAURANTS = gql`{
  restaurants {
    id
    name
    location
    numRatings
  }
}`

export default graphql(QUERY_RESTAURANTS)(TopRestaurants)
