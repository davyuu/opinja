import React from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import ReactStars from 'react-stars'
import MaterialIcon, {colorPallet} from 'material-icons-react'
import RatingModal from '../components/RatingModal'
import keys from '../constants/keys'
import images from '../images'
import {getLocalStorageRatings} from '../utils/functions'
import './Restaurant.css'

class Restaurant extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: ''
    };
  }

  onSearchChange = (event) => {
    this.setState({search: event.target.value.toLowerCase()})
  }

  getCategoriesMap(items) {
    const categories = {}
    items.forEach(item => {
      const category = item.category.name;
      if(!categories[category]) {
        categories[category] = {
          order: item.category.order,
          items: []
        }
      }
      categories[category].items.push({
        id: item.id,
        name: item.name,
        overallRating: item.overallRating
      })
    })
    return categories
  }

  render() {
    const {loading, restaurant, refetch} = this.props.data
    if(loading) return <div>Loading...</div>

    if(!restaurant) {
      return (
        <div>No Restaurant Found</div>
      )
    }

    const {search} = this.state
    const {items} = restaurant
    const filteredItems = items.filter((item) => {
      return item.name.toLowerCase().includes(search)
    })
    const categories = this.getCategoriesMap(filteredItems)

    const ratings = getLocalStorageRatings();

    return (
      <div className='restaurant'>
        <div className='restaurant-header'>
          <img
            src={images.placeholder}
            alt='placeholder'
          />
          <div className='restaurant-header-title'>
            <div className='restaurant-name'>{restaurant.name}</div>
            <div className='restaurant-location'>{restaurant.location}</div>
          </div>
        </div>
        <div className="restaurant-search">
          <div className="restaurant-search-icon"/>
          <input
            className='restaurant-search-input'
            placeholder='Search for items'
            onChange={this.onSearchChange}
          />
          <MaterialIcon
            className='restaurant-search-icon'
            icon='search'
          />
        </div>
        <div className='restaurant-list'>
          {Object.keys(categories).sort((a, b) => {
            return categories[a].order - categories[b].order
          }).map((category, i) => {
            const items = categories[category].items;
            return(
              <div
                key={i}
                className='restaurant-category'
              >
                <div className='restaurant-category-name'>{category}</div>
                {items.map((item, i) => {
                  let userRatingView;
                  let userRatingId;
                  let userRating;
                  if(ratings[item.id]) {
                    userRatingId = ratings[item.id][keys.RATING_ID_KEY]
                    userRating = ratings[item.id][keys.RATING_VALUE_KEY]
                    userRatingView = (
                      <div className='restaurant-item-user-rating'>
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
                      <div className='restaurant-item-overall-rating-container'>
                        <div className='restaurant-item-overall-rating'>{item.overallRating}</div>
                        <MaterialIcon
                          className='restaurant-item-overall-rating-star'
                          icon='grade'
                          color={colorPallet.yellow._500}
                          size={16}
                        />
                        <div className='restaurant-item-overall-rating-avg'>avg</div>
                      </div>
                    )
                  }
                  return (
                    <div
                      key={i}
                      className='restaurant-item'
                      onClick={() => this.modal.openModal(userRatingId, restaurant.id, item, userRating)}
                    >
                      <div className='restaurant-item-name'>{item.name}</div>
                      {userRatingView}
                      {overallRatingView}
                    </div>
                  )
                })}
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
  query getRestaurant($id: String!) {
    restaurant(id: $id) {
      id
      name
      location
      items {
        id
        name
        category {
          id
          name
          order
        }
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
