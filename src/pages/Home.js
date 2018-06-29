import React from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {Link} from 'react-router-dom'
import MaterialIcon from 'material-icons-react'
import Select, {Option} from 'rc-select'
import {getLocalStorageUser} from '../utils/functions'
import cuisineImages from '../images/cuisine'
import routes from '../constants/routes'
import './Home.css'
import 'rc-select/assets/index.css';

const NAME_ASC = 'Name Asc'
const NAME_DESC = 'Name Desc'

const sortOptions = {
  [NAME_ASC]: (a, b) => {
    const aName = a.name.toLowerCase()
    const bName = b.name.toLowerCase()
    return aName > bName ? 1 : aName < bName ? -1 : 0
  },
  [NAME_DESC]: (a, b) => {
    const aName = a.name.toLowerCase()
    const bName = b.name.toLowerCase()
    return aName < bName ? 1 : aName > bName ? -1 : 0
  }
}

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      search: '',
      selectedSort: NAME_ASC
    };
  }

  componentDidMount() {
    const user = getLocalStorageUser()
    this.setState({user: user})
  }

  onSearchChange = (event) => {
    this.setState({search: event.target.value.toLowerCase()})
  }

  clearSearch = () => {
    this.search.value = ''
    this.setState({search: ''})
  }

  onSortChange = (event) => {
    let value;
    if (event && event.target) {
      value = event.target.value;
    } else {
      value = event;
    }
    this.setState({
      selectedSort: value
    });
  };

  render() {
    const {user, search, selectedSort} = this.state
    const {data} = this.props
    if(data.loading || !user) return <p>Loading...</p>

    const {restaurants} = data;

    if(!restaurants) {
      return (
        <p>No Restaurants Found</p>
      )
    }

    const sortLabels = Object.keys(sortOptions)

    const filteredRestaurants = restaurants.filter((restaurant) => {
      return restaurant.name.toLowerCase().includes(search)
          || restaurant.address.toLowerCase().includes(search)
    }).sort(sortOptions[selectedSort])

    return (
      <div className='home'>
        <div className='home-title'>Restaurants</div>
        <div className='home-search-sort'>
          <div className='home-search'>
            <div className='home-search-icon'/>
            <input
              className='home-search-input'
              placeholder='Search for restaurant'
              onChange={this.onSearchChange}
              ref={(ref) => this.search = ref}
            />
            <div onClick={this.clearSearch}>
              <MaterialIcon
                className='home-search-icon'
                icon={search ? 'cancel' : 'search'}
              />
            </div>
          </div>
          <div className='home-sort'>
            <Select
              className='home-sort-select'
              dropdownClassName='home-sort-select-dropdown'
              value={selectedSort}
              onChange={this.onSortChange}
            >
              {sortLabels.map((label, i) => <Option key={i} value={label}>{label}</Option>)}
            </Select>
          </div>
        </div>
        <div className='home-list'>
          {filteredRestaurants.map((restaurant, i) => {
            return (
              <Link
                key={i}
                className='home-restaurant'
                to={`${routes.restaurant}/${restaurant.id}`}
              >
                <img
                  className='home-restaurant-img'
                  src={cuisineImages[restaurant.type.toLowerCase()] || cuisineImages.default}
                  alt={restaurant.type}
                />
                <div className='home-restaurant-title'>
                  <div className='home-restaurant-side'/>
                  <div className='home-restaurant-middle'>
                    <div className='home-restaurant-name'>{restaurant.name}</div>
                    <div className='home-restaurant-address'>{restaurant.address}</div>
                  </div>
                  <div className='home-restaurant-side'>
                    <MaterialIcon
                      className='home-restaurant-chevron'
                      icon={'chevron_right'}
                      size={16}
                      invert
                    />
                  </div>
                </div>
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
    address
    type
  }
}`

export default graphql(query)(Home)
