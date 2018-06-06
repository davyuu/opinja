import React from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {Link} from 'react-router-dom'
import routes from '../constants/routes'
import './TopUsers.css'

class TopUsers extends React.Component {
  render() {
    const {data} = this.props
    if(data.loading) return <p>Loading...</p>

    const {users} = data;

    if(!users) {
      return (
        <p>No Users Found</p>
      )
    }

    return (
      <div className='top-users'>
        {users.sort((a, b) => a.points < b.points)
          .map((user, i) => {
            return (
              <Link
                key={i}
                className='top-user'
                to={`${routes.profile}/${user.id}`}
              >
                <div className="top-user-rank">{i+1}</div>
                <div className="top-user-name">{user.name}</div>
                <div className="top-user-points">{user.points} points</div>
              </Link>
            )
          })
        }
      </div>
    )
  }
}

const QUERY_USERS = gql`{
  users {
    id
    name
    points
  }
}`

const OPTIONS_USERS = {
  options: {
    fetchPolicy: 'network-only'
  }
}

export default graphql(QUERY_USERS, OPTIONS_USERS)(TopUsers)
