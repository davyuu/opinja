import React from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import MaterialIcon, {colorPallet} from 'material-icons-react'
import RatingModal from '../components/RatingModal'
import './Restaurant.css'

class Restaurant extends React.Component {

  render() {
    const {loading, restaurant, refetch} = this.props.data
    if(loading) return <p>Loading...</p>

    if(!restaurant) {
      return (
        <p>No Restaurant Found</p>
      )
    }

    return (
      <div className='restaurant'>
        <h1 className='restaurant-name'>{restaurant.name}</h1>
        <div className='restaurant-list'>
          {restaurant.items.map((item, i) => {
            let rating;
            if(item.rating) {
              rating = (
                <div className='restaurant-list-item-rating-container'>
                  <p className='restaurant-list-item-rating'>{item.rating}</p>
                  <MaterialIcon
                    className='restaurant-list-item-star'
                    icon='grade'
                    color={colorPallet.yellow._500}
                    size={16}
                  />
                </div>
              )
            }
            return (
              <div
                key={i}
                className='restaurant-list-item'
                onClick={() => this.modal.openModal(item)}
              >
                {/* <div className='restaurant-list-item-fill'/> */}
                <p className='restaurant-list-item-name'>{item.name}</p>
                {rating}
              </div>
            )
          })}
        </div>
        <RatingModal
          onRef={ref => this.modal = ref}
          refresh={() => refetch()}
        />
      </div>
    )
  }
}

const QUERY_RESTAURANTS = gql`
  query getRestaurant($id: Int!) {
    restaurant(id: $id) {
      id
      name
      items {
        id
        name
        rating
      }
    }
  }
`

const OPTIONS_RESTAURANTS = {
  options: props => ({
    variables: {
      id: props.match.params.id
    }
  })
}

export default graphql(QUERY_RESTAURANTS, OPTIONS_RESTAURANTS)(Restaurant)
