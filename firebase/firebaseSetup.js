import * as firebase from 'firebase';
import firebaseConfig from '../secrets.js'


firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  console.log("TETETESTSTSETESTETETSET", user)
  if (user != null) {
    console.log("THIS IS USER", user)
    console.log("We are authenticated now!");
    return user

  }
  // Do other things
});

async function loginWithFacebook() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    "2112247582376014",
    { permissions: ['public_profile'] }
  );
  
  
  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    // Sign in with credential from the Facebook user.
          firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
                  
            // Handle Errors here.
          });
  }
}

export default loginWithFacebook