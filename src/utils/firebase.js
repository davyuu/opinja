import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyCx2CMp37E-a5wpRrv7UI6MIEyMCITpGFk",
  authDomain: "opinja-68fb1.firebaseapp.com",
  databaseURL: "https://opinja-68fb1.firebaseio.com/",
  storageBucket: "opinja-68fb1.appspot.com",
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
