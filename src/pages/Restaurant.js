import React from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import MaterialIcon from 'material-icons-react'
import MenuCategory from '../components/MenuCategory'
import categories from '../constants/categories'
import cuisineImages from '../images/cuisine'
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

  clearSearch = () => {
    this.search.value = ''
    this.setState({search: ''})
  }

  getCategoryMap(items) {
    const categoryMap = {}
    Object.keys(categories).forEach(category => {
      categoryMap[category] = []
    })
    items.filter((item) => {
      return item.name.toLowerCase().includes(this.state.search)
    }).forEach(item => {
      const category = item.category;
      categoryMap[category].push(item)
    })
    return categoryMap
  }

  render() {
    const {loading, restaurant, refetch} = this.props.data
    if(loading) return <div>Loading...</div>

    if(!restaurant) {
      return (
        <div>No Restaurant Found</div>
      )
    }

    const categoryMap = this.getCategoryMap(restaurant.items)

    let categoriesList;
    if(Object.keys(categoryMap).length > 0) {
      categoriesList = (
        <div className='restaurant-list'>
          {Object.keys(categoryMap).map((category, i) => {
            const items = categoryMap[category]
            if(items.length > 0) {
              return (
                <MenuCategory
                  key={i}
                  restaurantId={restaurant.id}
                  category={category}
                  items={items}
                  refetch={refetch}
                />
              )
            }
            return null
          })}
        </div>
      )
    } else {
      categoriesList = (
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
            src={cuisineImages[restaurant.type] || cuisineImages.default}
            alt={restaurant.type}
          />
          <div className='restaurant-title'>
            <div className='restaurant-name'>{restaurant.name}</div>
            <div className='restaurant-location'>{restaurant.location}</div>
          </div>
        </div>
        <div className='restaurant-search-background'>
          <div className="restaurant-search">
            <div className="restaurant-search-icon"/>
            <input
              className='restaurant-search-input'
              placeholder='Search Menu'
              onChange={this.onSearchChange}
              ref={(ref) => this.search = ref}
            />
            <div onClick={this.clearSearch}>
              <MaterialIcon
                className='restaurant-search-icon'
                icon={this.state.search ? 'cancel' : 'search'}
              />
            </div>
          </div>
        </div>
        {categoriesList}
      </div>
    )
  }
}

const QUERY_RESTAURANTS = gql`
  query getRestaurant($id: String!) {
    restaurant(id: $id) {
      id
      name
      address
      phone
      neighbourhood
      type
      cuisine
      items {
        id
        name
        category
        description
        price
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
