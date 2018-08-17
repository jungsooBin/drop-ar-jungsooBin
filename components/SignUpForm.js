import React, { Component } from "react";
import { View, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Text,
  CheckBox
} from "react-native-elements";
import { connect } from "react-redux";
import Button from "./Button";
import {
  formValidator,
  checkEachField,
  individualizedErrMsg
} from "../utilities/formValidator";
import { signup } from "../store/userReducer";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      terms: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
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
    const { terms } = this.state;
    const messages = individualizedErrMsg(
      checkEachField(formValidator, this.state)
    );
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={350}
      >
        <Text style={styles.titleText}>GraftAR</Text>
        <View style={styles.formContainer}>
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
            autoCapitalize="none"
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
        </View>
        <View style={styles.buttonContainer}>
          <CheckBox
            title="Terms and Conditions"
            checked={this.state.terms}
            style={styles.checkbox}
            onPress={() => this.setState({ terms: !terms })}
          />
          <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <Text
            style={styles.textLink}
            onPress={() => navigation.navigate(`LoginForm`)}
          >
            Have an account? Log in.
          </Text>
        </View>
        {!this.state.formErrs
          ? null
          : messages.map(entry => {
              return (
                <FormValidationMessage
                  key={entry}
                >{`${entry}`}</FormValidationMessage>
              );
            })}
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: `center`,
    backgroundColor: "#FFF"
  },
  titleText: {
    top: "15%",
    fontWeight: "800",
    fontSize: 48,
    color: "#ff5858"
  },
  formContainer: {
    top: "15%",
    width: 290
  },
  buttonContainer: {
    top: "15%"
  },
  button: {
    backgroundColor: "#ff5858",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: 250
  },
  buttonText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center"
  },
  textLink: {
    color: "#ff5858",
    fontWeight: "800",
    textAlign: "center",
    margin: 5
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleSignUp: formData => {
      return dispatch(signup(formData));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignUpForm);
