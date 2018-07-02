import React from 'react'
import PropTypes from 'prop-types'
import MenuItem from './MenuItem'
import categories from '../constants/sum_categories'
import categoryImages from '../images/categories'
import './MenuCategory.css'

class MenuCategory extends React.Component {

  getCategoryImage(category) {
    return categoryImages[categories[category].image] || categoryImages.default
  }

  render() {
    const {restaurantId, category, items, refetch} = this.props

    return (
      <div className='menu-category'>
        <div className='menu-category-header'>
          <img
            className='menu-category-img'
            src={this.getCategoryImage(category)}
            alt={category}
          />
          <div className='menu-category-title'>
            <div className='menu-category-name'>{categories[category].name}</div>
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
