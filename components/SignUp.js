import React, { Component } from "react";
import { Text, View } from "react-native";
import Button from "./Button";

export default class SignUp extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Button onPress={() => navigation.navigate(`SignUpForm`)}>
          Sign Up
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
    backgroundColor: "#FFF"
  }
};
