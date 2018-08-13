// Users info : Name (first name, last name), profile pic,
// Tab Bar, Created, Saved, --> Link to single art view

import React, { Component } from "react";
import { Text, View } from "react-native";
import Button from "./Button";

export default class UserProfile extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Button onPress={() => navigation.navigate(`EditUserProfile`)}>
          Edit Profile
        </Button>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF"
  }
};
