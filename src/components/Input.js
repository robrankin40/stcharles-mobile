import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: '#3a86ff',
  },
  error: {
    borderWidth: 1,
    borderColor: '#ff006e',
  },
});

const Input = ({error, style, ...props}) => (
  <TextInput style={[styles.input, error && styles.error, style]} {...props} />
);

export default Input;
