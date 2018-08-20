import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import firebaseConfig from "../secrets.js";
import processFBData from "../utilities/getDataFromFB";
import { signup, setCurrentUser } from "../store/userReducer";
import { connect } from "react-redux";
import axios from "axios";
import domain from "../domain.js";


//Globals
firebase.initializeApp(firebaseConfig);

//Component
class Home extends Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user != null) {
        const newUser = processFBData(user);
        //Checks whether user exists
        const doesUserExist = await axios.get(`${domain}/api/user/${newUser.email}`)
        //Adds id property to newUser 
        newUser.id = doesUserExist.data[0].id

        //If user doesn't exist, sign them up and log them in, if they do exist, log in
      if (!doesUserExist.data.length ){
        await this.props.handleSignUp(newUser)  
        this.props.navigation.navigate('ArtFeed') 
      } else {
          await this.props.setCurrentUser(newUser)
          this.props.navigation.navigate('ArtFeed') 
        }
      }
    });
  }

  async loginWithFacebook() {
    const { navigation } = this.props;
    const { token, type } = await Expo.Facebook.logInWithReadPermissionsAsync(
      process.env.FACEBOOK_APP_ID,
      { permissions: ["public_profile", "email"] }
    );

    if (type === "success") {
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      // Sign in with credential from the Facebook user.
      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .catch(error => {
          // Handle Errors here.
          console.log(error);
        });
    }
  }

  render() {
    const { navigation } = this.props;
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
            onPress={() => navigation.navigate("SignUpForm")}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.loginWithFacebook()}
          >
            <Text style={styles.buttonText}>Sign Up w/ FB</Text>
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
    top: "50%"
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
    setCurrentUser: formData => {
      return dispatch(setCurrentUser(formData));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Home);
