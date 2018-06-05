import React from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import ReactStars from 'react-stars'
import MaterialIcon, {colorPallet} from 'material-icons-react'
import RatingModal from '../components/RatingModal'
import keys from '../constants/keys'
import cuisineImages from '../images/cuisine'
import categoryImages from '../images/categories'
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

    let itemsList;
    if(filteredItems.length > 0) {
      itemsList = (
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
                <div className='restaurant-category-header'>
                  <img
                    className='restaurant-category-img'
                    src={categoryImages[category.toLowerCase()]}
                    alt={category}
                  />
                  <div className='restaurant-category-title'>
                    <div className='restaurant-category-name'>{category}</div>
                  </div>
                </div>
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
                  const overallRating = item.overallRating
                  if(overallRating) {
                    let ratingColor;
                    if(overallRating >= 4) {
                      ratingColor = '#81C784'
                    } else if(overallRating < 3) {
                      ratingColor = '#FFEB3B'
                    } else {
                      ratingColor = '#f44336'
                    }
                    overallRatingView = (
                      <div className='restaurant-item-overall-rating-container'>
                        <div
                          className='restaurant-item-overall-rating'
                          style={{background: ratingColor}}
                        >
                          {overallRating.toFixed(1)}
                        </div>
                        <MaterialIcon
                          className='restaurant-item-overall-rating-star'
                          icon='keyboard_arrow_down'
                          size={24}
                        />
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
                      {overallRatingView}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      )
    } else {
      itemsList = (
        <div className='restaurant-no-items'>
          No Items Found
        </div>
      )
    }

    return (
      <div className='restaurant'>
        <div className='restaurant-header'>
          <img
            className='restaurant-img'
            src={cuisineImages[restaurant.type]}
            alt={restaurant.type}
          />
          <div className='restaurant-title'>
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
        {itemsList}
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
      type
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
