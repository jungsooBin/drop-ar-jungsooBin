// Users info : Name (first name, last name), profile pic,
// Tab Bar, Created, Saved, --> Link to single art view
import { connect } from 'react-redux';

import React, { Component } from "react";
import { Text, View } from "react-native";
import Button from "./Button";

class UserProfile extends Component {


  render() {

    const { navigation } = this.props;
    console.log('mapstate is working?', this.props.user)
    return (
      <View style={styles.container}>
        <Text style={styles.buttonText}>
          User Email: 
        </Text>

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

const mapStateToProps = state => {
  return {
    user: state.users.user,
  }
}


export default connect(
  mapStateToProps,
  null
)(UserProfile);
