import React from "react";
import { Text, TouchableOpacity, View, Image, Button } from "react-native";
import { withNavigation } from "react-navigation";

const SingleArtItem = props => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.artImage}
        onPress={() =>
          navigation.navigate(`SingleArtView`, {
            art: props.art
          })
        }
      >
        <Image style={styles.artImage} source={{ uri: props.art.coverPhoto }} />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.artTitle}>{props.art.title}</Text>
        <Text style={styles.artLikes}>{`Likes: ${props.art.likes}`}</Text>
        <Text style={styles.artDescription}>{props.art.description}</Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    marginTop: 5
  },
  artImage: {
    width: "50%",
    height: "80%"
  },
  info: {
    flexDirection: "column",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    fontSize: 16
  }
};

export default withNavigation(SingleArtItem);
