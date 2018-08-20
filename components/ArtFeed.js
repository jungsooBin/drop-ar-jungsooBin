import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
<<<<<<< HEAD
  Image,
} from 'react-native';
import SingleArtItem from './SingleArtItem';
import { fetchAllArt } from '../store/artReducer';
import { fetchAllLikes } from '../store/likesReducer';
=======
  Image
} from "react-native";
import SingleArtItem from "./SingleArtItem";
import { fetchAllArt } from "../store/artReducer";

// import { fetchAllLikes } from '../store/likesReducer';
>>>>>>> 741c48fa8860989e99525cc0ec281203a3935741

class ArtFeed extends Component {
  componentDidMount() {
    this.props.fetchAllArt();
    this.props.fetchAllLikes();
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.scrollContainer}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {this.props.allArt.map(art => {
              return (
                <SingleArtItem key={art.id} art={art} />
              )
            }
            )}
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            underlayColor={"#ff5858"}
            onPress={() => navigation.navigate(`CameraView`)}
          >
            <View style={styles.textButtonContainer}>
              <Image
                style={{ width: 30, height: 30, marginBottom: 4 }}
                source={{
                  uri:
                    "https://www.peace.edu/wp-content/uploads/Camera-icon-White-SMALL.png"
                }}
              />
              {/* <Text style={styles.buttonText}>Camera</Text> */}
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor={"#ff5858"}
            onPress={() => navigation.navigate(`UserProfile`)}
          >
            <View style={styles.textButtonContainer}>
              <Image
                style={{ width: 25, height: 25, marginBottom: 4 }}
                source={{
                  uri:
                    "https://flaticons.net/gd/makefg.php?i=icons/Application/User-Profile.png&r=255&g=255&b=255"
                }}
              />
              {/* <Text style={styles.buttonText}>Profile</Text> */}
            </View>
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
    backgroundColor: "#EEE"
  },
  scrollContainer: {
    flex: 0.92
  },
  scrollView: {
    flexGrow: 5
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    height: "7.5%",
    bottom: "0%",
    backgroundColor: "#FF5858"
  },
  textButtonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    padding: 10,
    width: "50%"
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center"
  }
};

const mapStateToProps = state => {
  return {
<<<<<<< HEAD
    allArt: state.arts.allArt,
    allLikes: state.likes.allLikes,
=======
    allArt: state.arts.allArt
    // allLikes: state.likes.allLikes,
>>>>>>> 741c48fa8860989e99525cc0ec281203a3935741
  };
};

const mapDispatchToProps = dispatch => ({
  fetchAllArt: () => {
    dispatch(fetchAllArt());
<<<<<<< HEAD
  },
  fetchAllLikes: () => {
    dispatch(fetchAllLikes());
  },
=======
  }
  // fetchAllLikes: () => {
  //   dispatch(fetchAllLikes());
  // },
>>>>>>> 741c48fa8860989e99525cc0ec281203a3935741
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtFeed);
