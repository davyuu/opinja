import React from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {Link} from 'react-router-dom'
import MaterialIcon from 'material-icons-react'
import {getLocalStorageUser} from '../utils/functions'
import routes from '../constants/routes'
import './Home.css'

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      search: ''
    };
  }

  componentDidMount() {
    const user = getLocalStorageUser()
    this.setState({user: user})
  }

  onSearchChange = (event) => {
    this.setState({search: event.target.value.toLowerCase()})
  }

  render() {
    const {user, search} = this.state
    const {data} = this.props
    if(data.loading || !user) return <p>Loading...</p>

    const {restaurants} = data;

    if(!restaurants) {
      return (
        <p>No Restaurants Found</p>
      )
    }

    const filteredRestaurants = restaurants.filter((restaurant) => {
      return restaurant.name.toLowerCase().includes(search)
          || restaurant.location.toLowerCase().includes(search)
    })

    return (
      <div className='home'>
        <div className="home-title">Restaurants</div>
        <div className="home-search">
          <div className="home-search-icon"/>
          <input
            className='home-search-input'
            placeholder='Search for restaurant'
            onChange={this.onSearchChange}
          />
          <MaterialIcon
            className='home-search-icon'
            icon='search'
          />
        </div>
        <div className='home-list'>
          {filteredRestaurants.map((restaurant, i) => {
            return (
              <Link
                key={i}
                className="home-restaurant"
                to={`${routes.restaurant}/${restaurant.id}`}
              >
                <div className="home-restaurant-name">{restaurant.name}</div>
                <div className="home-restaurant-location">{restaurant.location}</div>
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
    location
  }
}`

export default graphql(query)(Home)
