import React from 'react'
import TopRestaurants from '../components/TopRestaurants'
import './Top.css'

class Top extends React.Component {
  render() {
    return (
      <div className='top'>
        <TopRestaurants/>
      </div>
    )
  }
}

export default Top
