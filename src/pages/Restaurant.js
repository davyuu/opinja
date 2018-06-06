import React from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import MaterialIcon from 'material-icons-react'
import MenuCategory from '../components/MenuCategory'
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

  getCategoriesMap(items) {
    const categories = {}
    items.filter((item) => {
      return item.name.toLowerCase().includes(this.state.search)
    }).forEach(item => {
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

    const categories = this.getCategoriesMap(restaurant.items)

    let categoriesList;
    if(Object.keys(categories).length > 0) {
      categoriesList = (
        <div className='restaurant-list'>
          {Object.keys(categories).sort((a, b) => {
            return categories[a].order - categories[b].order
          }).map((category, i) => {
            return (
              <MenuCategory
                key={i}
                restaurantId={restaurant.id}
                category={category}
                items={categories[category].items}
                refetch={refetch}
              />
            )
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
            src={cuisineImages[restaurant.type] || cuisineImages.placeholder}
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
            placeholder='Search Menu'
            onChange={this.onSearchChange}
          />
          <MaterialIcon
            className='restaurant-search-icon'
            icon='search'
          />
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
