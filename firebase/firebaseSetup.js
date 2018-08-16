import * as firebase from 'firebase';
import firebaseConfig from '../secrets.js'
import axios from 'axios';
const processFBData = require('../utilities/getDataFromFB')


firebase.initializeApp(firebaseConfig);


 firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    const dataToSend = processFBData(user)
  }
  // Do other things
});

async function loginWithFacebook() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    "2112247582376014",
    { permissions: ['public_profile', 'email'] }
  );
  
  
  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    // Sign in with credential from the Facebook user.
          firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
                  console.log(error)
            // Handle Errors here.
          });
  }
}

export default loginWithFacebook