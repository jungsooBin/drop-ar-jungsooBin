import React from "react";

import { Text, View, Image, TouchableOpacity, Button } from "react-native";


const Home = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.text}>GraftAR</Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(`LoginForm`)}
      >
        <Text style={styles.buttonText}>Log In </Text>
        
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(`SignUpForm`)}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

    </View>
  </View>
);

const styles = {
  container: {
    flex: 1,
    alignItems: `center`,
    backgroundColor: "#ff5858"
  },
  text: {
    top: "30%",
    fontWeight: "800",
    fontSize: 48,
    color: "#FFF"
  },
  buttonContainer: {
    top: "55%"
  },
  button: {
    backgroundColor: "#FFF",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: 250
  },
  buttonText: {
    color: "#ff5858",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center"
  }
};

export default Home;
