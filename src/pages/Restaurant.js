import React from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import ReactStars from 'react-stars'
import MaterialIcon, {colorPallet} from 'material-icons-react'
import RatingModal from '../components/RatingModal'
import {getLocalStorageRatings} from '../utils/functions'
import keys from '../constants/keys'
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

    const ratings = getLocalStorageRatings();

    return (
      <div className='restaurant'>
        <h1 className='restaurant-name'>{restaurant.name}</h1>
        <div className='restaurant-list'>
          {restaurant.items.map((item, i) => {
            let userRatingView;
            let userRatingId;
            let userRating;
            if(ratings[item.id]) {
              userRatingId = ratings[item.id][keys.RATING_ID_KEY]
              userRating = ratings[item.id][keys.RATING_VALUE_KEY]
              userRatingView = (
                <div className='restaurant-list-item-user-rating'>
                  <ReactStars
                    count={5}
                    value={userRating}
                    edit={false}
                    size={16}
                  />
                </div>
              )
            }
            let overallRatingView;
            if(item.overallRating) {
              overallRatingView = (
                <div className='restaurant-list-item-overall-rating-container'>
                  <p className='restaurant-list-item-overall-rating'>{item.overallRating}</p>
                  <MaterialIcon
                    className='restaurant-list-item-overall-rating-star'
                    icon='grade'
                    color={colorPallet.yellow._500}
                    size={16}
                  />
                  <p className='restaurant-list-item-overall-rating-avg'>avg</p>
                </div>
              )
            }
            return (
              <div
                key={i}
                className='restaurant-list-item'
                onClick={() => this.modal.openModal(item, userRatingId, userRating)}
              >
                {/* <div className='restaurant-list-item-fill'/> */}
                <p className='restaurant-list-item-name'>{item.name}</p>
                {userRatingView}
                {overallRatingView}
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
        overallRating
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
