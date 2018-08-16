// Edit user info
import React, { Component } from "react";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Text,
  
} from 'react-native-elements';
import {  View } from "react-native";
import Button from "./Button";
import { connect } from 'react-redux';
import {
  formValidator,
  checkEachField,
  individualizedErrMsg,
} from '../utilities/formValidator';
import { updatingUser } from '../store/userReducer';

class EditUserProfilePresentational extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentWillMount() {
    const { navigation } = this.props;
    const artObj = navigation.getParam('artObj');
    this.setState({
      location: artObj.location,
      artPiece: artObj.artPiece,
      coverPhoto: artObj.coverPhoto.uri,
      userId: this.props.user.id
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    //Post new user in DB

    if (checkEachField(formValidator, this.state).length < 1) {
      try {
        await this.props.handleSignUp({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
          terms: this.state.terms
        });
        this.props.navigation.navigate(`ArtFeed`);
      } catch (err) {
        console.log(err);
      }
    } else {
      this.setState({ formErrs: true });
    }
  }

  render() {

    const { navigation } = this.props;
    const messages = individualizedErrMsg(
      checkEachField(formValidator, this.state)
    );
    return (
      <View style={styles.container}>
        <Text h1 style={styles.heading}>
          Sign Up
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

          <FormLabel>Re-Enter Password</FormLabel>
            <FormInput
              value={this.state.rePassword}
              onChangeText={rePassword => this.setState({ rePassword })}
              autoCapitalize="none"
              secureTextEntry={true}
            />
          <Button onPress={this.handleSubmit}>Submit</Button>

          {!this.state.formErrs
              ? null
              : messages.map(entry => {
                  return (
                    <FormValidationMessage
                      key={entry}
                    >{`${entry}`}</FormValidationMessage>
                  );
          })}
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