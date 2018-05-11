import React from 'react'
import PropTypes from 'prop-types'
import './RestaurantItem.css'

export default class RestaurantItem extends React.Component {
	render() {
		return (
			<div className='restaurant-item'>
				{this.props.item}
			</div>
		)
	}
}

RestaurantItem.propTypes = {
	item: PropTypes.string.isRequired
}
