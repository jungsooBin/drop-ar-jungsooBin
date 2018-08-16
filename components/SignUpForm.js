import React, { Component } from 'react';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Text,
  CheckBox,
} from 'react-native-elements';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Button from './Button';
import {
  formValidator,
  checkEachField,
  individualizedErrMsg,
} from '../utilities/formValidator';
import { signup } from '../store/userReducer';


class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rePassword: '',
      terms: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
          terms: this.state.terms,
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

    const { terms } = this.state;

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

        <CheckBox
          title="Terms and Conditions"
          checked={this.state.terms}
          onPress={() => this.setState({ terms: !terms })}
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
      </View>
    );
  }
}

//Styles
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

const mapDispatchToProps = dispatch => {
  return {
    handleSignUp: formData => {
      return dispatch(signup(formData));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignUpForm);
