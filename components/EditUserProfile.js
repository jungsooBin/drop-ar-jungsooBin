// Edit user info
import React, { Component } from "react";
import { Text, View } from "react-native";
import Button from "./Button";

export default class EditUserProfile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Button onPress={() => navigation.goBack()}>Back</Button>
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
