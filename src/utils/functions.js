import keys from '../constants/keys'

export const getLocalStorageRatings = () => {
  const ratings = JSON.parse(localStorage.getItem(keys.LOCAL_STORAGE_RATINGS_KEY))
  console.log('ratings', ratings)
  if(ratings) {
    return ratings
  } else {
    return {}
  }
}

export const setLocalStorageRating = (id, itemId, rating) => {
  const ratings = getLocalStorageRatings()
  ratings[itemId] = {
    [keys.RATING_ID_KEY]: id,
    [keys.RATING_VALUE_KEY]: rating
  }
  localStorage.setItem(keys.LOCAL_STORAGE_RATINGS_KEY, JSON.stringify(ratings))
}
