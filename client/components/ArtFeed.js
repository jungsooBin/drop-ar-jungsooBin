import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Image,
  RefreshControl,
} from 'react-native';
import SingleArtItem from './SingleArtItem';
import { fetchAllArt } from '../store/artReducer';

let count = 0;

class ArtFeed extends Component {
  constructor() {
    super();
    this.state = {
      refreshing: false,
    };
  }
  componentDidMount() {
    this.props.fetchAllArt();
    count++;
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.fetchAllArt();
    this.setState({ refreshing: false });
  };

  render() {
    const { navigation } = this.props;
    
    this.props.allArt.sort(function(a,b){
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return (
      <View style={styles.container}>
        <View style={styles.scrollContainer}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            {this.props.allArt.map(art => {
              return <SingleArtItem key={art.id} art={art} />;
            })}
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            underlayColor={'#ff5858'}
            onPress={() => navigation.navigate(`CameraViewCollaboration`)}
          >
            <View style={styles.textButtonContainer}>
              <Image
                style={{ width: 30, height: 30, marginBottom: 4 }}
                source={{
                  uri:
                    'https://www.musohealth.org/wp-content/uploads/2015/09/icons-04.png',
                }}
              />
              {/* <Text style={styles.buttonText}>Camera</Text> */}
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor={'#ff5858'}
            onPress={() => navigation.navigate(`CameraView`)}
          >
            <View style={styles.textButtonContainer}>
              <Image
                style={{ width: 30, height: 30, marginBottom: 4 }}
                source={{
                  uri:
                    'https://www.peace.edu/wp-content/uploads/Camera-icon-White-SMALL.png',
                }}
              />
              {/* <Text style={styles.buttonText}>Camera</Text> */}
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor={'#ff5858'}
            onPress={() => navigation.navigate(`UserProfile`)}
          >
            <View style={styles.textButtonContainer}>
              <Image
                style={{ width: 25, height: 25, marginBottom: 4 }}
                source={{
                  uri:
                    'https://flaticons.net/gd/makefg.php?i=icons/Application/User-Profile.png&r=255&g=255&b=255',
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
    alignItems: 'center',
    backgroundColor: '#EEE',
  },
  scrollContainer: {
    flex: 0.92,
  },
  scrollView: {
    flexGrow: 5,
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    height: '7.5%',
    bottom: '0%',
    backgroundColor: '#FF5858',
  },
  textButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    width: '33.3%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
};

const mapStateToProps = state => {
  return {
    allArt: state.arts.allArt,
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
