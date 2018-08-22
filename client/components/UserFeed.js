import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, TouchableHighlight } from 'react-native';
import SingleArtItem from './SingleArtItem';
import { fetchAllArt, fetchUserArt } from '../store/artReducer';

class UserFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchUserArt(this.props.userId);
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.scrollContainer}>
          <ScrollView style={styles.scrollView}>
            {this.props.userArt.map(art => (
              <SingleArtItem key={art.id} art={art} />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    top: '3.75%',
  },
  scrollView: {
    flexGrow: 5,
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    height: '7.5%',
    bottom: '0%',
  },
  button: {
    backgroundColor: '#ff5858',
    padding: 10,
    width: '50%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
};

const mapStateToProps = state => {
  return {
    userArt: state.arts.userArt,
    user: state.users.user,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUserArt: id => {
    dispatch(fetchUserArt(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFeed);
