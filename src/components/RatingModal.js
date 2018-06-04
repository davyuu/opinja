import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import Modal from 'react-modal'
import ReactStars from 'react-stars'
import {setLocalStorageRating, getLocalStorageUser} from '../utils/functions'
import './RatingModal.css'

Modal.setAppElement('#app')

class RatingModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      id: null,
      restaurantId: null,
      item: null,
      value: null,
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onRatingChange = this.onRatingChange.bind(this);
    this.onRatingSubmit = this.onRatingSubmit.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  openModal(id, restaurantId, item, value) {
    this.setState({
      modalIsOpen: true,
      id,
      restaurantId,
      item,
      value
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      id: null,
      restaurantId: null,
      item: null,
      value: null
    });
  }

  onRatingChange(value) {
    this.setState({value})
  }

  onRatingSubmit() {
    const {id, restaurantId, item, value} = this.state;
    if (value === null) {
      alert('Please select an option')
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
      this.props.refresh();
      setLocalStorageRating(data.addRating.id, item.id, value)
    }).catch(error => {
      alert(error)
    })

    this.closeModal()
  }

  render() {
    const {item, value} = this.state;
    const itemName = item ? item.name : 'this item';
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        className='rating-modal'
        overlayClassName='rating-modal-overlay'
      >
        <div className='rating-modal-container'>
          <p className='rating-modal-title'>
            How would you rate
          </p>
          <p className="rating-modal-title">
            {itemName}?
          </p>
          <div className='rating-modal-stars'>
            <ReactStars
              count={5}
              value={value}
              onChange={this.onRatingChange}
              size={60}
            />
          </div>
          <div
            className='rating-modal-submit'
            onClick={this.onRatingSubmit}
          >
            Submit
          </div>
        </div>
      </Modal>
    )
  }
}

RatingModal.propTypes = {
  onRef: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
}

const MUTATION_RATING = gql`

  mutation addRating($id: String, $userId: String, $restaurantId: String!, $itemId: String!, $value: Float!){
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

export default graphql(MUTATION_RATING)(RatingModal)
