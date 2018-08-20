import React from 'react';
import { Text, TouchableOpacity, View, Image, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
// import * as firebase from 'firebase';
import { connect } from 'react-redux'




const SingleArtItem = props => {
  console.log("STORE STATES", props.art.id)
  const { navigation } = props;
  let { title, likes, description, artist, likedBy, coverPhoto} = props.art;
  console.log('THIS IS LIKEDBY', likedBy)
  
  // const ref = firebase.storage().ref(`images/${props.art.id}`);
  // ref.getDownloadURL().then(function(url) {
  //   console.log('url', url)
  // })
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(`SingleArtView`, {
            art: props.art
          })
        }
      >
        <View style={styles.imageContainer}>

          <Image style={styles.imageStyle} source={{ uri: coverPhoto}} />

        </View>
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.artTitle}>{title}</Text>
        <Text style={styles.artDescription}>{'"' + description + '"'}</Text>
        {artist ? (
          <Text style={styles.artDescription}>
            ARtist: {artist.firstName + " " + artist.lastName}
          </Text>
        ) : null}
        <Text style={styles.artDescription}>{`Likes: ${likedBy.length}`}</Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    // justifyContent: 'center',
    backgroundColor: "#fff",
    marginTop: 7,
    marginLeft: 7,
    marginRight: 5
  },
  imageContainer: {
    // alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#FFF",
    marginTop: 5
  },
  artImage: {
    width: "50%",
    height: "100%"
  },
  info: {
    flexDirection: "column",
    // width: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flexDirection: 'row',
    width: "100%",
    padding: 10,
    marginTop: 5,
    marginLeft: 7
  },
  artTitle: {
    fontFamily: "Georgia-BoldItalic",
    fontSize: 15
  },
  artDescription: {
    fontFamily: "Georgia-Italic",
    fontSize: 13
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5
  }
};

// export default withNavigation(SingleArtItem);

const mapStateToProps = state => {
  return {
    allArt: state.arts.allArt,
  };
};

// const mapDispatchToProps = dispatch => ({
//   fetchAllArt: () => {
//     dispatch(fetchAllArt());
//   },
//   getLikeForArt: (id) => {
//     dispatch(fetchLikesForPiece(id))
//   }
// });

export default connect(
  mapStateToProps,
  null
)(withNavigation(SingleArtItem));