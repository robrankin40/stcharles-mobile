import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0)',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      width: 3,
      height: 2,
    },
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export const FloatButton = ({onPress, style}) => (
  <TouchableOpacity style={[styles.wrapper, style]} onPress={onPress}>
    <Text style={styles.text}>+</Text>
  </TouchableOpacity>
);
