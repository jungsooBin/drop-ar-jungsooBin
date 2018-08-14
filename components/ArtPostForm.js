import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Text,
  CheckBox,
} from 'react-native-elements';
import { View } from 'react-native';
import Button from './Button';
import axios from 'axios';
import Expo from 'expo';
import { saveArt } from '../store/artReducer';

class ArtPostFormPresenTational extends Component {
  constructor() {
    super();

    this.state = {
      location: [],
      artPiece: null,
      title: '',
      description: '',
      likes: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentWillMount() {
    const { navigation } = this.props;
    const artObj = navigation.getParam('artObj');
    this.setState({
      location: artObj.location,
      artPiece: artObj.artPiece,
      description: artObj.description,
      title: artObj.title,
      likes: artObj.likes,
    });
  }

  async handleSubmit(event, artData) {
    event.preventDefault();
    //Post new user in DB
    this.props.addArt(artData);

    this.setState({
      location: [],
      artPiece: {},
      description: '',
      likes: 0,
    });
    // Some event that: [ (i) validates form, (ii) if valid info sent to backend, (iii) if not, sends err message],
  }

  render() {
    const { navigation } = this.props;
    const { checked } = this.state;
    return (
      <View style={styles.container}>
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

        <FormLabel>Author</FormLabel>
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
    backgroundColor: '#ffffff',
    // top: -50
  },
  heading: {
    top: -40,
  },
};

const mapDispatchToProps = dispatch => {
  return {
    addArt: artObj => dispatch(saveArt(artObj)),
  };
};

const ArtPostForm = connect(
  null,
  mapDispatchToProps
)(ArtPostFormPresenTational);

export default ArtPostForm;
