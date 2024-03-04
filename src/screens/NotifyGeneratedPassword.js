import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import ScreenWrapper from '../components/ScreenWrapper';
import {resetAuth, selectTempPassword} from '../store/authSlice';
import {Button} from '../components/Button';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 250,
  },
  header: {
    marginVertical: 32,
    fontSize: 24,
    textAlign: 'center',
  },
  body: {
    fontSize: 16,
    textAlign: 'center',
  },
  password: {
    fontSize: 16,
    backgroundColor: '#ffbe0b',
    color: 'white',
    textAlign: 'center',
    padding: 8,
    margin: 16,
  },
  spacer: {
    marginBottom: 24,
  },
});

export const NotifyGeneratedPasswordScreen = () => {
  const dispatch = useDispatch();
  const generatedPassword = useSelector(selectTempPassword);
  const handleLogin = () => {
    dispatch(resetAuth());
  };
  return (
    <ScreenWrapper>
      <View style={styles.wrapper}>
        <Text style={styles.header}>Congrats on Joining!</Text>
        <Text style={styles.body}>Your temporary password is generated</Text>
        <Text style={styles.password}>{generatedPassword}</Text>
        <Text style={styles.body}>
          Do not share this with anyone. Please login use email and password.
          After that app will let you update your password.
        </Text>
        <View style={styles.spacer} />
        <Button label="Login" onPress={handleLogin} />
      </View>
    </ScreenWrapper>
  );
};
