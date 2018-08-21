import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import EditProfileButton from "./EditProfileButton";
import UserFeed from "./UserFeed";

class UserProfile extends Component {
  render() {
    const { navigation } = this.props;
    const { email, firstName, lastName, picture } = this.props.user;
    return (
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <Image style={styles.thumbnailStyle} source={{ uri: picture }} />
          <Text style={styles.textStyle}>{firstName + " " + lastName}</Text>
          <Text style={styles.textStyle}>{email}</Text>
          <EditProfileButton
            style={styles.buttonStyle}
            onPress={() => navigation.navigate(`EditUserProfile`)}
          >
            Edit
          </EditProfileButton>
        </View>
        <View style={styles.feedContainer}>
          <UserFeed userId={this.props.user.id} />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#EEE",
    alignItems: "center"
  },
  userInfoContainer: {
    backgroundColor: "#FFF",
    alignItems: "center",
    width: "100%",
    height: "30%",
    padding: "2.5%"
  },
  thumbnailStyle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginTop: 30,
    marginBottom: 10
  },
  buttonStyle: {
    height: 20,
    width: 80,
    alignSelf: "stretch",
    borderRadius: 5,
    backgroundColor: "#009a9a",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  textStyle: {
    fontSize: 14,
    width: "100%",
    textAlign: "center",
    fontFamily: "Helvetica Neue"
  },
  feedContainer: {
    backgroundColor: "#FFF",
    alignItems: "center",
    width: "100%",
    height: "70%",
    top: "1%"
  }
};

const mapStateToProps = state => {
  return {
    user: state.users.user
  };
};

export default connect(
  mapStateToProps,
  null
)(UserProfile);
