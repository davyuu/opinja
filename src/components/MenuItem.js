import React from 'react'
import PropTypes from 'prop-types'
import MaterialIcon from 'material-icons-react'
import {Collapse} from 'react-collapse'
import RatingPanel from './RatingPanel'
import './MenuItem.css'

class MenuItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpened: false
    };
  }

  toggleIsOpened = () => {
    this.setState({isOpened: !this.state.isOpened})
  }

  render() {
    const {isOpened} = this.state
    const {restaurantId, item, refetch} = this.props

    let overallRatingView;
    const overallRating = item.overallRating
    if(overallRating) {
      let ratingColor;
      if(overallRating >= 4) {
        ratingColor = '#81C784'
      } else if(overallRating < 3) {
        ratingColor = '#F44336'
      } else {
        ratingColor = '#FFEB3B'
      }
      overallRatingView = (
        <div
          className='menu-item-rating'
          style={{background: ratingColor}}
        >
          {overallRating.toFixed(1)}
        </div>
      )
    }

    return (
      <div className='menu-item'>
        <div
          className='menu-item-description'
          onClick={this.toggleIsOpened}
        >
          <div className='menu-item-name'>{item.name}</div>
          <div className='menu-item-rating-container'>
            {overallRatingView}
            <MaterialIcon
              className='menu-item-arrow'
              icon={isOpened ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
              size={24}
            />
          </div>
          </div>
        <Collapse isOpened={isOpened}>
          <RatingPanel
            restaurantId={restaurantId}
            item={item}
            refetch={refetch}
          />
        </Collapse>
      </div>
    )
  }
}

MenuItem.propTypes = {
  restaurantId: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired
}

export default MenuItem
