import React from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import Modal from 'react-modal'
import MaterialIcon, {colorPallet} from 'material-icons-react'
import StarRatingComponent from 'react-star-rating-component';
import ReactStars from 'react-stars'
import './Restaurant.css'

Modal.setAppElement('#root')

class Restaurant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      restaurant: null,
      selectedItem: null,
      rating: null,
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onRatingChange = this.onRatingChange.bind(this);
    this.onRatingSubmit = this.onRatingSubmit.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      rating: null
    });
  }

  onItemClick(item) {
    this.setState({
      selectedItem: item,
      rating: item.rating
    }, () => this.openModal())
  }

  onRatingChange(rating) {
    this.setState({rating: rating})
  }

  onRatingSubmit() {
    const {restaurant, selectedItem, rating} = this.state;
    if (rating === null) {
      alert('Please select an option')
      return
    }

    //todo

    this.closeModal()
  }

  render() {
    const {data} = this.props
    if(data.loading) return <p>Loading...</p>

    const {restaurant} = data

    if(!restaurant) {
      return (
        <p>No Restaurant Found</p>
      )
    }

    const {selectedItem, rating} = this.state;
    const itemName = selectedItem ? selectedItem.name : 'this item';
    const modal = (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        className='restaurant-modal'
        overlayClassName='restaurant-modal-overlay'
      >
        <div className='restaurant-rating-container'>
          <p className='restaurant-rating-title'>
            How would you rate
          </p>
          <p className="restaurant-rating-title">
            {itemName}?
          </p>
          <div className='restaurant-rating'>
            <ReactStars
              count={5}
              value={rating}
              onChange={this.onRatingChange}
              size={60}
            />
          </div>
          <div
            className='restaurant-rating-submit'
            onClick={this.onRatingSubmit}
          >
            Submit
          </div>
        </div>
      </Modal>
    )

    return (
      <div className='restaurant'>
        <h1 className='restaurant-name'>{restaurant.name}</h1>
        <div className='restaurant-list'>
          {restaurant.items.map((item, i) => {
            let rating;
            if(item.rating) {
              rating = (
                <div className='restaurant-list-item-rating-container'>
                  <p className='restaurant-list-item-rating'>{item.rating}</p>
                  <MaterialIcon
                    className='restaurant-list-item-star'
                    icon='grade'
                    color={colorPallet.yellow._500}
                    size={16}
                  />
                </div>
              )
            }
            return (
              <div
                key={i}
                className='restaurant-list-item'
                onClick={() => this.onItemClick(item)}
              >
                {/* <div className='restaurant-list-item-fill'/> */}
                <p className='restaurant-list-item-name'>{item.name}</p>
                {rating}
              </div>
            )
          })}
        </div>
        {modal}
      </div>
    )
  }
}

const query = gql`
  query getRestaurant($id: Int!) {
    restaurant(id: $id) {
      id
      name
      items {
        id
        name
        rating
      }
    }
  }
`

const queryOptions = {
  options: props => ({
    variables: {
      id: props.match.params.id
    }
  })
}

export default graphql(query, queryOptions)(Restaurant)
