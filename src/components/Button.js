import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cta: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  ctaWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#8338ec',
    borderRadius: 4,
    marginVertical: 8,
  },
  dangerStyle: {
    backgroundColor: '#ff006e',
  },
  centered: {
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.3,
  },
});

export const Button = ({
  onPress,
  label,
  danger = false,
  disabled,
  centered = true,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.ctaWrapper,
        danger && styles.dangerStyle,
        disabled && styles.disabled,
      ]}
      onPress={onPress}>
      <Text style={[styles.cta, centered && styles.centered]}>{label}</Text>
    </TouchableOpacity>
  );
};
