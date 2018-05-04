import React from 'react'
import routes from '../constants/routes'

class Restaurant extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurant: props.location.state.restaurant
		}
	}

	render() {
		return (
			<div style={styles.container}>
				<p className="test">test</p>
			</div>
		)
	}
}

const styles = {
	container: {
	},
};

export default Restaurant
