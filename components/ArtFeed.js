import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, ScrollView, TouchableHighlight } from "react-native";
import SingleArtItem from "./SingleArtItem";
import { fetchAllArt } from "../store/artReducer";

class ArtFeed extends Component {
  componentDidMount() {
    this.props.fetchAllArt();
  }

  render() {
    const { navigation } = this.props;
    // const user = navigation.getParam('user');
    // console.log('user', this.props.user)
    return (
      <View style={styles.container}>
        <View style={styles.scrollContainer}>
          <ScrollView style={styles.scrollView}>
            {this.props.allArt.map(art => (
              <SingleArtItem key={art.id} art={art} />
            ))}
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            underlayColor={"#ff5858"}
            onPress={() => navigation.navigate(`CameraView`)}
          >
            <Text style={styles.buttonText}>Camera</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor={"#ff5858"}
            onPress={() => navigation.navigate(`UserProfile`)}
          >
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ff5858"
  },
  scrollContainer: {
    flex: 0.89,
    top: "3.75%"
  },
  scrollView: {
    flexGrow: 5
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    height: "7.5%",
    bottom: "0%"
  },
  button: {
    backgroundColor: "#ff5858",
    padding: 10,
    width: "50%"
  },
  buttonText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center"
  }
};

const mapStateToProps = state => {
  return {
    allArt: state.arts.allArt
  };
};

const mapDispatchToProps = dispatch => ({
  fetchAllArt: () => {
    dispatch(fetchAllArt());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtFeed);
