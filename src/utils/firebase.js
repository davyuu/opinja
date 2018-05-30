import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyDN4QoGrB3RUpUYqU-vOmk3cbrouINGiRs",
  authDomain: "ispoll-204321.firebaseapp.com",
  databaseURL: "https://ispoll-204321.firebaseio.com",
  projectId: "ispoll-204321",
  storageBucket: "ispoll-204321.appspot.com",
  messagingSenderId: "563048300519"
};

firebase.initializeApp(config)

const facebookProvider = new firebase.auth.FacebookAuthProvider()
const googleProvider = new firebase.auth.GoogleAuthProvider()
const auth = firebase.auth()


export const loginWithFacebook = () => {
  return auth.signInWithPopup(facebookProvider)
}

export const loginWithGoogle = () => {
  return auth.signInWithPopup(googleProvider)
}
