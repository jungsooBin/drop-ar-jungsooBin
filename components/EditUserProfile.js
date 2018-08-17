// Edit user info
import React, { Component } from "react";
import {
  FormLabel,
  FormInput,
  Text,
  
} from 'react-native-elements';
import {  View } from "react-native";
import Button from "./Button";
import { connect } from 'react-redux';

import { updatingUser } from '../store/userReducer';

class EditUserProfilePresentational extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentWillMount() {
    const { navigation } = this.props;
    const userData = this.props.user
    this.setState(userData);
  }

  async handleSubmit(event, userData) {
    event.preventDefault();
    this.props.updateUser(userData);
  }
  

  render() {

    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text h1 style={styles.heading}>
          Edit Profile
        </Text>
          <FormLabel>First Name</FormLabel>
            <FormInput
              value={this.state.firstName}
              onChangeText={firstName => this.setState({ firstName })}
            />

          <FormLabel>Last Name</FormLabel>
            <FormInput
              value={this.state.lastName}
              onChangeText={lastName => this.setState({ lastName })}
            />

          <FormLabel>Email</FormLabel>
            <FormInput
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />

          <FormLabel>Password</FormLabel>
            <FormInput
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              autoCapitalize="none"
              secureTextEntry={true}
            />
          <Button onPress={evt => this.handleSubmit(evt, this.state)}>Submit</Button>

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
    updateUser: userData => dispatch(updatingUser(userData)),
  };
};

const ArtPostForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUserProfilePresentational);

export default ArtPostForm;