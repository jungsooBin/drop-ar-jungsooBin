import React from 'react';
import { Text, TouchableOpacity, View, Image, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

const SingleArtItem = props => {
  const { navigation } = props;
  const { title, likes, description, user, coverPhoto } = props.art;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.artImage}
        onPress={() =>
          navigation.navigate(`SingleArtView`, {
            art: props.art,
          })
        }
      >
        <Image style={styles.artImage} source={{ uri: coverPhoto }} />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.artTitle}>{title}</Text>
        <Text style={styles.artLikes}>{`Likes: ${likes}`}</Text>
        <Text style={styles.artDescription}>{description}</Text>
        <Text style={styles.artDescription}>
          Created by: {user.firstName + ' ' + user.lastName}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    marginTop: 5,
  },
  artImage: {
    width: '50%',
    height: '100%',
  },
  info: {
    flexDirection: 'column',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
};

export default withNavigation(SingleArtItem);
