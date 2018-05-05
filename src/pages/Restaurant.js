import React from 'react'
import data from '../data/data'

class Restaurant extends React.Component {
	state = {
    restaurant: null
  }

	componentDidMount() {
		const {id} = this.props.match.params;
		data.forEach((restaurant) => {
			if(Number(id) === restaurant.id) {
				this.setState(
					{restaurant: restaurant},
					() => this.renderInvalid()
				)
			}
		})
	}

	renderInvalid() {
		if(!this.state.restaurant) {
			console.log('invalid id')
		}
	}

	render() {
		const {restaurant} = this.state;
		return (
			<div style={styles.container}>
				{restaurant ?
					<p>{restaurant.name}</p>
					:
					<p>No restaurant found</p>
				}
			</div>
		)
	}
}

const styles = {
	container: {
		textAlign: 'center'
	},
};

export default Restaurant
