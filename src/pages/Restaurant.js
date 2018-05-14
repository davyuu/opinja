import React from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import Modal from 'react-modal'
import MaterialIcon, {colorPallet} from 'material-icons-react'
import './Restaurant.css'

Modal.setAppElement('#root')

class Restaurant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      restaurant: null,
      selectedItem: null,
      recommend: 0,
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onRecommendChange = this.onRecommendChange.bind(this);
    this.onRecommendSubmit = this.onRecommendSubmit.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      recommend: 0
    });
  }

  onItemClick(item) {
    this.setState({
      selectedItem: item,
      recommend: item.recommend
    }, () => this.openModal())
  }

  onRecommendChange(e) {
    const value = e.currentTarget.value;
    if (value === '1') {
      this.setState({recommend: 1})
    } else if (value === '-1') {
      this.setState({recommend: -1})
    }
  }

  onRecommendSubmit() {
    const {restaurant, selectedItem, recommend} = this.state;
    if (recommend === 0) {
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

    const {selectedItem, recommend} = this.state;
    const itemName = selectedItem ? selectedItem.name : 'this item';
    const modal = (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        className='restaurant-modal'
        overlayClassName='restaurant-modal-overlay'
      >
        <div className='restaurant-recommend-container'>
          <p className='restaurant-recommend-title'>
            {`Would you recommend ${itemName}?`}
          </p>
          <div className='restaurant-recommend'>
            <div>
              <input
                type='radio'
                id='yes'
                name='recommend'
                checked={recommend === 1}
                onChange={this.onRecommendChange}
              value='1' />
              <label htmlFor='yes'>
                <MaterialIcon
                  icon='check_circle_outline'
                  color={recommend === 1 ? colorPallet.green._500 : null}
                  size={100}
                />
              </label>
            </div>
            <div>
              <input
                type='radio'
                id='no'
                name='recommend'
                checked={recommend === -1}
                onChange={this.onRecommendChange}
              value='-1' />
              <label htmlFor='no'>
                <MaterialIcon
                  icon='highlight_off'
                  color={recommend === -1 ? colorPallet.red._500 : null}
                  size={100}
                />
              </label>
            </div>
          </div>
          <div
            className='restaurant-recommend-submit'
            onClick={this.onRecommendSubmit}
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
