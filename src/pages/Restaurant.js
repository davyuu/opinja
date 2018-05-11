import React from 'react'
import Modal from 'react-modal'
import MaterialIcon, {colorPallet} from 'material-icons-react'
// import RestaurantItem from '../components/RestaurantItem'
import data from '../data/data'
import './Restaurant.css'

Modal.setAppElement('#root')

export default class Restaurant extends React.Component {
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

  componentDidMount() {
    const {id} = this.props.match.params;
    let isValid = false;
    data.forEach((restaurant) => {
      if(Number(id) === restaurant.id) {
        isValid = true;
        this.setState({restaurant: restaurant})
      }
    })
    if(!isValid) {
      this.renderInvalid()
    }
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
      console.log("test1")
      return
    }

    console.log("test2")

    data.forEach(r => {
      if(r.id === restaurant.id) {
        r.items.forEach(i => {
          if(i.id === selectedItem.id) {
            i.recommend = recommend;
          }
        })
      }
    })

    this.closeModal()
  }

  renderInvalid() {
    alert('invalid id')
  }

  render() {
    const {restaurant, selectedItem, recommend} = this.state;

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

    let content;
    if (restaurant) {
      content = (
        <div>
          <h1 className='restaurant-name'>{restaurant.name}</h1>
          <div className='restaurant-list'>
            {restaurant.items.map((item, i) => {
              const {recommend} = item;
              let recommendIcon;
              if(recommend === 1) {
                recommendIcon = (
                  <MaterialIcon
                    className='restaurant-list-item-recommend'
                    icon='check_circle'
                    color={colorPallet.green._500}
                  />
                )
              } else if(recommend === -1) {
                recommendIcon = (
                  <MaterialIcon
                    className='restaurant-list-item-recommend'
                    icon='cancel'
                    color={colorPallet.red._500}
                  />
                )
              } else {
                recommendIcon = (
                  <MaterialIcon
                    className='restaurant-list-item-recommend'
                    icon='help'
                  />
                )
              }
              return (
                <div
                  key={i}
                  className='restaurant-list-item'
                  onClick={() => this.onItemClick(item)}
                >
                  <div className='restaurant-list-item-fill'/>
                  <p className='restaurant-list-item-name'>{item.name}</p>
                  {recommendIcon}
                </div>
              )
            })}
          </div>
          {modal}
        </div>
      )
    } else {
      content = (
        <div>No Restaurant Found</div>
      )
    }
    return (
      <div className='restaurant'>
        {content}
      </div>
    )
  }
}
