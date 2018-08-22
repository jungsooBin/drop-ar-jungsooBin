import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

const SingleArtItem = props => {
  const { navigation } = props;
  let { title, likes, description, artist, likedBy, coverPhoto } = props.art;

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
          <Image style={styles.imageStyle} source={{ uri: coverPhoto }} />
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
    backgroundColor: "#fff",
    marginTop: 7,
    marginLeft: 7,
    marginRight: 5
  },
  imageContainer: {
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
    width: "100%",
    padding: 10,
    marginTop: 5,
    marginLeft: 7
  },
  artTitle: {
    fontWeight: "800",
    fontSize: 15
  },
  artDescription: {
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

const mapStateToProps = state => {
  return {
    allArt: state.arts.allArt
  };
};

export default connect(
  mapStateToProps,
  null
)(withNavigation(SingleArtItem));
