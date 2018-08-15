import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Button from "./Button";
import SingleArtItem from "./SingleArtItem";
import { fetchAllArt } from "../store";

export default class ArtFeed extends Component {
  // componentDidMount() {
  //   this.props.fetchAllArt();
  // }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* {this.props.allArt.map(art => {
            return <SingleArtItem key={art.id} />;
          })} */}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(`CameraView`)}
          >
            <Text style={styles.buttonText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(`UserProfile`)}
          >
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff5858"
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: "0%",
    height: "7.5%"
  },
  button: {
    backgroundColor: "#FFF",
    padding: 10,
    margin: 0,
    width: "50%"
  },
  buttonText: {
    color: "#ff5858",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center"
  }
};

// const mapStateToProps = state => {
//   return {
//     allArt: state.allArt
//   };
// };

// const mapDispatchToProps = dispatch => ({
//   fetchAllArt: () => {
//     dispatch(fetchAllArt());
//   }
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ArtFeed);
