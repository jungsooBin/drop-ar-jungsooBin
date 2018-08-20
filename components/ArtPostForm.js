import { connect } from "react-redux";
import React, { Component } from "react";
import { FormLabel, FormInput, Text } from "react-native-elements";
import { View, Image } from "react-native";
import Button from "./Button";
import * as firebase from "firebase";
import { saveArt } from "../store/artReducer";

class ArtPostFormPresenTational extends Component {
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
    event.preventDefault();
    const callback = this.uploadImage(artData.coverPhoto, `${artData.title}`);
    this.props.addArt(artData);
  }

  async uploadImage(uri, imageName) {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("images/" + imageName);
    return ref.put(blob);
  }

  render() {
    const { navigation } = this.props;
    const { checked } = this.state;
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: this.state.coverPhoto }}
        />

        <Text h1 style={styles.heading}>
          ArtForm
        </Text>
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
        <Button onPress={evt => this.handleSubmit(evt, this.state)}>
          Submit
        </Button>
        <Button onPress={() => navigation.goBack()}>Back</Button>
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
    backgroundColor: "#ffffff"
    // top: -50
  },
  heading: {
    top: -40
  }
};
const mapStateToProps = state => {
  return {
    user: state.users.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addArt: artObj => dispatch(saveArt(artObj))
  };
};

const ArtPostForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtPostFormPresenTational);

export default ArtPostForm;
