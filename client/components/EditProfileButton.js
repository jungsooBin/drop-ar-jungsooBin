import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const EditProfileButton = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    fontSize: 12,
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonStyle: {
    borderWidth: 1,
    width: 75,
    height: 30,
    alignItems: `center`,
    justifyContent: `center`,
  },
};

export default EditProfileButton;
