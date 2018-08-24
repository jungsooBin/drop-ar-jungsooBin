import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { FormLabel, FormInput, Text } from "react-native-elements";
import { saveArt, editArt} from "../store/artReducer";
import * as firebase from "firebase";

class ArtPostFormPresentational extends Component {
  constructor() {
    super();
    this.state = {
      location: [],
      artPiece: null,
      title: "",
      description: "",
      likes: 0,
      artistId: 0,
      coverPhoto: null,
      tempPhotoUrl: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  async componentWillMount() {
    const { navigation } = this.props;
    const artObj = navigation.getParam("artObj");
    this.setState({
      location: artObj.location,
      artPiece: artObj.artPiece,
      coverPhoto: artObj.coverPhoto.uri,
      artistId: this.props.user.id
    });
  }

  async handleSubmit(event, artData) {
    try {
    await this.props.addArt(artData);
    console.log(this.props.singleArt)
    await this.uploadImage(artData.coverPhoto, `${this.props.singleArt.id}`);
    const ref = await firebase.storage().ref(`images/${this.props.singleArt.id}`);
    const url = await ref.getDownloadURL()
    await this.props.modifyArt(this.props.singleArt.id, { coverPhoto: url });
    this.props.navigation.navigate(`ArtFeed`);

    } catch (error) {
      console.log(error)
    }
    this.showAlert()

  }

  async uploadImage(uri, artId) {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("images/" + artId);
    return ref.put(blob);
  }

  showAlert = () => {
    Alert.alert(
      "Posted!",
      "Awesome!",
      [{ text: ":)", onPress: () => console.log("Posted") }],
      { cancelable: false }
    );
  };

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
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={200}
        style={styles.container}
      >
        <Text style={styles.titleText}>Art Form</Text>
        <View style={styles.imageContainer}>
          <Image
            style={{ width: 100, height: 100, borderRadius: "50%" }}
            source={{ uri: this.state.coverPhoto }}
          />
        </View>
        <View style={styles.formContainer}>
          <FormLabel>Title</FormLabel>
          <FormInput
            value={this.state.title}
            onChangeText={title => this.setState({ title })}
          />
          <FormLabel>Description</FormLabel>
          <FormInput
            value={this.state.description}
            onChangeText={description => this.setState({ description })}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={evt => this.handleSubmit(evt, this.state)}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
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
    top: "20%",
    fontWeight: "800",
    fontSize: 36,
    color: "#ff5858"
  },
  imageContainer: {
    top: "23%"
  },
  formContainer: {
    top: "25%",
    width: 290
  },
  buttonContainer: {
    top: "30%"
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
  }
};

const mapStateToProps = state => {
  return {
    user: state.users.user,
    singleArt: state.arts.singleArt
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addArt: artObj => dispatch(saveArt(artObj)),
    modifyArt: (artId, editArtObj) => dispatch(editArt(artId, editArtObj))
  };
};

const ArtPostForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtPostFormPresentational);

export default ArtPostForm;
