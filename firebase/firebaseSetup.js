// import * as firebase from 'firebase';
// import firebaseConfig from '../secrets.js'
// import {connect} from 'react-redux'
// import axios from 'axios'
// import domain from "../domain.js";

// const processFBData = require('../utilities/getDataFromFB')


// firebase.initializeApp(firebaseConfig);

// async function sendToDB(user){
//    await axios.post(`${domain}/api/user/signup`, user);
// }

//  firebase.auth().onAuthStateChanged((user) => {
//   if (user != null) {
//     newUser = processFBData(user)

//     sendToDB(newUser)

//   }
//   // Do other things
// });

// async function loginWithFacebook() {
//   const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
//     "2112247582376014",
//     { permissions: ['public_profile', 'email'] }
//   );
  
//   if (type === 'success') {
//     // Build Firebase credential with the Facebook access token.
//     const credential = firebase.auth.FacebookAuthProvider.credential(token);
//     // Sign in with credential from the Facebook user.
//           firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
//                   console.log(error)
//             // Handle Errors here.
//           });
//   }
// }

// module.exports = {loginWithFacebook} 
