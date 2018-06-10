import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import ReactStars from 'react-stars'
import keys from '../constants/keys'
import {getLocalStorageRatings, setLocalStorageRating, getLocalStorageUser} from '../utils/functions'
import './RatingPanel.css'

class RatingPanel extends React.Component {
  state = {
    id: null,
    value: null
  }

  componentWillReceiveProps() {
    const {item} = this.props
    const ratings = getLocalStorageRatings()
    if(ratings[item.id]) {
      this.setState({
        id: ratings[item.id][keys.RATING_ID_KEY],
        value: ratings[item.id][keys.RATING_VALUE_KEY]
      })
    }
  }

  onRatingChange = (value) => {
    this.setState({value})
  }

  onRatingSubmit = () => {
    const {id, value} = this.state;
    const {restaurantId, item, refetch} = this.props;
    if (value === null) {
      alert('Please select a rating')
      return
    }

    const user = getLocalStorageUser();

    this.props.mutate({
      variables: {
        id: id,
        userId: user.id,
        restaurantId: restaurantId,
        itemId: item.id,
        value: value
      },
    }).then(({data}) => {
      refetch();
      setLocalStorageRating(data.addRating.id, item.id, value)
    }).catch(error => {
      alert(error)
    })
  }

  render() {
    return (
      <div className='rating-panel'>
        <div className="rating-panel-container">
          <div className='rating-panel-label'>
            Your Rating:
          </div>
          <div className='rating-panel-stars'>
            <ReactStars
              count={5}
              value={this.state.value}
              onChange={this.onRatingChange}
              size={22}
            />
          </div>
          <div
            className='rating-panel-submit'
            onClick={this.onRatingSubmit}
          >
            Vote
          </div>
        </div>
    </div>
    )
  }
}

RatingPanel.propTypes = {
  restaurantId: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired
}

const MUTATION_RATING = gql`
  mutation addRating($id: String, $userId: String, $restaurantId: String!, $itemId: String!, $value: Float!) {
    addRating(id: $id, userId: $userId, restaurantId: $restaurantId, itemId: $itemId, value: $value) {
      id
      user {
        id
      }
      item {
        id
      }
      value
    }
  }
`

export default graphql(MUTATION_RATING)(RatingPanel)
