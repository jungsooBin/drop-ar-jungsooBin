import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { FormLabel, FormInput } from "react-native-elements";
import { connect } from "react-redux";
import { login } from "../store/userReducer";

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event, formData) {
    try {
      await this.props.handleLogin(formData);
      if (this.props.user.response) {
        this.showFailAlert(this.props.user.response.data);
      } else if (this.props.user.id) {
        this.props.navigation.navigate("ArtFeed");
        this.setState({
          email: "",
          password: ""
        });
      } else {
        this.showFailAlert("Server error. check your domain");
      }
    } catch (error) {
      console.log(error);
    }
  }
  showFailAlert = message => {
    Alert.alert(
      message,
      "Error!",
      [
        {
          text: "Please try again!",
          onPress: () => console.log("Will do!")
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.titleText}>DropAR</Text>
        <View style={styles.formContainer}>
          <FormLabel>Email</FormLabel>
          <FormInput
            name="email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            autoCapitalize="none"
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            name="password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            autoCapitalize="none"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={event => this.handleSubmit(event, this.state)}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <Text
            style={styles.textLink}
            onPress={() => navigation.navigate(`SignUpForm`)}
          >
            First time here? Sign up.
          </Text>
        </View>
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
    position: "absolute",
    top: "30%",
    fontWeight: "800",
    fontSize: 48,
    color: "#ff5858"
  },
  formContainer: {
    top: "40%",
    width: 290
  },
  buttonContainer: {
    top: "45%"
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
const mapStateToProps = state => {
  return {
    user: state.users.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: formData => {
      return dispatch(login(formData));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
