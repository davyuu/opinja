import cuisineImages from '../images/cuisine'

const cuisineMatch = {
  greek: 'mediterranean',
  american: 'canadian',
  asian: 'chinese',
  british: 'pub'
}

export const getCuisineImage = (cuisineString) => {
  const cuisineSplit = cuisineString.toLowerCase().split(',')
  let image;
  for(let cuisine of cuisineSplit) {
    cuisine = cuisine.trim()
    if(cuisineMatch[cuisine]) {
      cuisine = cuisineMatch[cuisine]
    }
    if(cuisineImages[cuisine]) {
      return cuisineImages[cuisine]
    }
  }
  return cuisineImages.default
}
