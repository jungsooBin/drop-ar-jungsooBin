// Login Form
// Login Button
// link to CameraView
import React, { Component } from "react";
import { Text, View } from "react-native";
import Button from "./Button";

export default class Login extends Component {
  render() {
    // To Use navigation prop passed in app.js
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Button onPress={() => navigation.navigate(`CameraView`)}>
          Log In
        </Button>
        <Button onPress={() => navigation.goBack()}>Back</Button>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: "#ffffff"
  }
};
