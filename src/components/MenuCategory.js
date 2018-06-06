import React from 'react'
import PropTypes from 'prop-types'
import MenuItem from './MenuItem'
import categoryImages from '../images/categories'
import './MenuCategory.css'

class MenuCategory extends React.Component {
  render() {
    const {restaurantId, category, items, refetch} = this.props

    return (
      <div className='menu-category'>
        <div className='menu-category-header'>
          <img
            className='menu-category-img'
            src={categoryImages[category.toLowerCase()] || categoryImages.placeholder}
            alt={category}
          />
          <div className='menu-category-title'>
            <div className='menu-category-name'>{category}</div>
          </div>
        </div>
        {items.map((item, i) => {
          return (
            <MenuItem
              key={i}
              restaurantId={restaurantId}
              item={item}
              refetch={refetch}
            />
          )
        })}
      </div>
    )
  }
}

MenuCategory.propTypes = {
  restaurantId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  refetch: PropTypes.func.isRequired
}

export default MenuCategory
