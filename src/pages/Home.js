import React from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {Link} from 'react-router-dom'
import {getLocalStorageUser} from '../utils/functions'
import routes from '../constants/routes'
import './Home.css'

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    const user = getLocalStorageUser()
    this.setState({user: user})
  }

  render() {
    const {user} = this.state
    const {data} = this.props
    if(data.loading || !user) return <p>Loading...</p>

    const {restaurants} = data;

    if(!restaurants) {
      return (
        <p>No Restaurants Found</p>
      )
    }

    return (
      <div className='home'>
        <h1 className="home-title">Hello {user.name}</h1>
        <h1 className="home-title">Select a restaurant</h1>
        <div className='home-list'>
          {restaurants.map((restaurant, i) => {
            return (
              <Link
                key={i}
                className="home-list-item-link"
                to={`${routes.restaurant}/${restaurant.id}`}
              >
                {restaurant.name}
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
  }
}`

export default graphql(query)(Home)
