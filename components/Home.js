import React, {Component} from "react";
import { Text, View, Image, TouchableOpacity, Button } from "react-native";
// import {loginWithFacebook} from '../firebase/firebaseSetup'
// other shit
import * as firebase from 'firebase';
import firebaseConfig from '../secrets.js'
import processFBData from '../utilities/getDataFromFB'
import axios from 'axios'
import domain from "../domain.js";
import { signup } from '../store/userReducer';
import {connect} from 'react-redux'

// const Home = ({ navigation }) => (

//   <View style={styles.container}>
//     <Text style={styles.text}>GraftAR</Text>
//     <View style={styles.buttonContainer}>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate(`LoginForm`)}
        
//       >
//         <Text style={styles.buttonText}>Log In </Text>
        
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate('SignUpForm')}
//       >
//         <Text style={styles.buttonText}>Sign Up</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => loginWithFacebook()}
//       >
//         <Text style={styles.buttonText}>Sign Up with Facebook</Text>
//       </TouchableOpacity>

//     </View>
//   </View>
// );


firebase.initializeApp(firebaseConfig);
let newUser
class Home extends Component{ 
  constructor(){
    super()
    
  }
  
  async componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
     if (user != null) {
       newUser = processFBData(user)
       return newUser
      }
    })    
  }

// async sendToDB(user){
//    await axios.post(`${domain}/api/user/signup`, user);
// }

  async loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "2112247582376014",
      { permissions: ['public_profile', 'email'] }
    );
    
    if (type === 'success') {
      // Build Firebase credential with the Facebook access token.
      await this.props.handleSignUp(newUser)
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      // Sign in with credential from the Facebook user.
            firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
                    console.log(error)
              // Handle Errors here.
            });
    }
  }

render(){
 const {navigation} = this.props
 return (
      <View style={styles.container}>
        <Text style={styles.text}>GraftAR</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(`LoginForm`)}
            
          >
            <Text style={styles.buttonText}>Log In </Text>
            
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignUpForm')}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.loginWithFacebook()
              navigation.navigate('ArtFeed')
            }
          }
          >
            <Text style={styles.buttonText}>Sign Up with Facebook</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: `center`,
    backgroundColor: "#ff5858"
  },
  text: {
    top: "30%",
    fontWeight: "800",
    fontSize: 48,
    color: "#FFF"
  },
  buttonContainer: {
    top: "55%"
  },
  button: {
    backgroundColor: "#FFF",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: 250
  },
  buttonText: {
    color: "#ff5858",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center"
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleSignUp: formData => {
      return dispatch(signup(formData));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Home);
