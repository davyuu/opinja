import React from 'react'
import Modal from 'react-modal'
import MaterialIcon, {colorPallet} from 'material-icons-react'
// import RestaurantItem from '../components/RestaurantItem'
import data from '../data/data'
import './Restaurant.css'

const customStyles = {
  content : {
    top                   : '80%',
    // left                  : '50%',
    // right                 : 'auto',
    // bottom                : 'auto',
    // marginRight           : '-50%',
    // transform             : 'translate(-50%, -50%)'
  }
};

class Restaurant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      restaurant: null
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    this.setState({modalIsOpen: false});
  }

  renderInvalid() {
    alert('invalid id')
  }

  render() {
    const {restaurant} = this.state;
    let content;
    if (restaurant) {
      content = (
        <div>
          <h1 className='restaurant-name'>{restaurant.name}</h1>
          <div className='restaurant-list'>
            {restaurant.items.map((item, i) => {
              const {recommend} = item;
              let recommendIcon;
              if(recommend == 1) {
                recommendIcon = (
                  <MaterialIcon
                    className='restaurant-list-item-recommend'
                    icon='check_circle'
                    color={colorPallet.green}
                  />
                )
              } else if(recommend == -1) {
                recommendIcon = (
                  <MaterialIcon
                    className='restaurant-list-item-recommend'
                    icon='cancel'
                    color={colorPallet.red}
                  />
                )
              } else {
                recommendIcon = (
                  <MaterialIcon
                    className='restaurant-list-item-recommend'
                    icon='help'
                    color={colorPallet.grey}
                  />
                )
              }
              return (
                <div
                  key={i}
                  className='restaurant-list-item'
                  onClick={() => this.openModal()}
                >
                  <div className='restaurant-list-item-fill'/>
                  <p className='restaurant-list-item-name'>{item.name}</p>
                  {recommendIcon}
                </div>
              )
            })}
          </div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            >
            <div className='restaurant-modal'>
              TEST
            </div>
          </Modal>
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

export default Restaurant
