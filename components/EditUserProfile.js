// Edit user info
import React, { Component } from "react";
import { Text, View } from "react-native";
import Button from "./Button";

export default class EditUserProfile extends Component {
  constructor() {
    super();
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
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: '#ffffff',
    // top: -50
  },
  heading: {
    top: -40,
  },
};

const mapStateToProps = state => {
  return {
    user: state.users.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addArt: artObj => dispatch(saveArt(artObj)),
  };
};