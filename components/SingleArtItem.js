import React from "react";
import { Text, TouchableOpacity, View, Image, Button } from "react-native";

const SingleArtItem = props => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Button
        title="button"
        onPress={() =>
          navigation.navigate(`SingleArtView`, {
            art: props.art
          })
        }
      />
      <TouchableOpacity
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
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    marginTop: 5,
    borderRadius: "5pt"
  },
  // artImage: {
  //   width: "40%",
  //   height: "17.5%"
  // },
  info: {
    flexDirection: "column",
    width: "45%",
    height: "17.5%",
    color: "#000",
    textAlign: "center"
  },
  artTitle: {
    fontSize: "20px"
  },
  artLikes: {
    fontSize: "16px"
  },
  artDescription: {
    fontSize: "16px"
  }
};

export default SingleArtItem;
