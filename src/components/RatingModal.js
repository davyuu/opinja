import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import Modal from 'react-modal'
import ReactStars from 'react-stars'
import {setLocalStorageRating} from '../utils/functions'
import './RatingModal.css'

Modal.setAppElement('#root')

class RatingModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      item: null,
      id: null,
      rating: null,
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

  openModal(item, id, rating) {
    this.setState({
      modalIsOpen: true,
      item: item,
      id: id,
      rating: rating
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      item: null,
      id: null,
      rating: null
    });
  }

  onRatingChange(rating) {
    this.setState({rating: rating})
  }

  onRatingSubmit() {
    const {item, id, rating} = this.state;
    if (rating === null) {
      alert('Please select an option')
      return
    }

    this.props.mutate({
      variables: {
        id: id,
        itemId: item.id,
        rating: rating
      },
    }).then(({data}) => {
      this.props.refresh();
      setLocalStorageRating(data.addRating.id, item.id, rating)
    }).catch(error => {
    })

    this.closeModal()
  }


  render() {
    const {item, rating} = this.state;
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
              value={rating}
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
  mutation addRating($id: Int, $itemId: Int!, $rating: Float!) {
    addRating(id: $id, itemId: $itemId, rating: $rating) {
      id
      itemId
      rating
    }
  }
`

export default graphql(MUTATION_RATING)(RatingModal)
