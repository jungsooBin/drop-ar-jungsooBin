import React from "react";
import { Text, View, Image, TouchableOpacity, Button } from "react-native";

const Home = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.text}>GraftAR</Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(`Login`)}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(`SignUp`)}
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
    position: "absolute",
    top: 275,
    fontWeight: "800",
    fontSize: 40,
    color: "#FFF"
  },
  buttonContainer: {
    position: "absolute",
    top: 475
  },
  button: {
    backgroundColor: "#FFF",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    color: "#ff5858"
  },
  buttonText: {
    color: "#ff5858",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center"
  }
};

export default Home;
