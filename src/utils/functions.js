import keys from '../constants/keys'
import routes from '../constants/routes'

export const getLocalStorageRatings = () => {
  const ratings = JSON.parse(localStorage.getItem(keys.LOCAL_STORAGE_RATINGS_KEY))
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

export const getLocalStorageUser = () => {
  return JSON.parse(localStorage.getItem(keys.LOCAL_STORAGE_USER_KEY))
}

export const setLocalStorageUser = (user) => {
  localStorage.setItem(keys.LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
}

export const isLoggedIn = () => {
  if (getLocalStorageUser()) {
    console.log('logged in')
    return true
  }
  console.log('not logged in')
  return false
}

export const logout = (push) => {
  console.log('logging out')
  clearLocalStorage()
  push(routes.welcome)
}

export const clearLocalStorage = () => {
  localStorage.clear();
}
