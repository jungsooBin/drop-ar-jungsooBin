import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import SingleArtItem from './SingleArtItem';
import { fetchAllArt } from '../store/artReducer';

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
        <ScrollView style={styles.scrollContainer}>
          {!this.props.allArt ? (
            <Text>:(</Text>
          ) : (
            this.props.allArt.map(art => {
              return <SingleArtItem key={art.id} art={art} />;
            })
          )}
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
    alignItems: 'center',
    backgroundColor: '#ff5858',
  },
  scrollContainer: {
    top: '3.75%',
    height: 200,
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: '0%',
    height: '7.5%',
  },
  button: {
    backgroundColor: '#FFF',
    padding: 10,
    width: '50%',
  },
  buttonText: {
    color: '#ff5858',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
};

const mapStateToProps = state => {
  return {
    allArt: state.arts.allArt,
    user: state.users.user
  };
};

const mapDispatchToProps = dispatch => ({
  fetchAllArt: () => {
    dispatch(fetchAllArt());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtFeed);
