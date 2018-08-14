import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Icon, FormLabel, FormInput } from "react-native-elements";
import { connect } from "react-redux";
import axios from "axios";

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    try {
      const res = await axios.put(`http://71.190.247.98:1337/api/auth/login`, {
        email: this.state.email,
        password: this.state.password
      });
      this.setState({ user: res.data });
      this.props.navigation.navigate("CameraView");
      // set user info to redux store
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" color="#ff5858" />
        </TouchableOpacity>

        
        
        <Text style={styles.titleText}>GraftAR</Text>
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
            onPress={() => navigation.navigate(`CameraView`)}
          >
            {/* Replace nav to CameraView with handleSubmit */}
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(`CameraView`)}
          >
            <Text style={styles.buttonText}>Go Cam (Temp)</Text>
          </TouchableOpacity>
          <Text
            style={styles.textLink}
            onPress={() => navigation.navigate(`SignUpForm`)}
          >
            First time here? Sign up.
          </Text>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(event) {
      const email = this.state.email;
      const password = this.state.password;
      dispatch(login({ email, password }));
    }
  };
};

const styles = {
  container: {
    flex: 1,
    alignItems: `center`,
    backgroundColor: "#FFF"
  },
  back: {
    top: "10%",
    right: "40%"
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

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
