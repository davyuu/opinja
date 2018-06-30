import cuisineImages from '../images/cuisine'

export const getCuisineImage = (cuisineString) => {
  const cuisineSplit = cuisineString.toLowerCase().split(',')
  let image;
  for(const cuisine of cuisineSplit) {
    image = cuisineImages[cuisine.trim()]
    if(image) {
      return image
    }
  }
  return cuisineImages.default
}
