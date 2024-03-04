import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import ScreenWrapper from '../components/ScreenWrapper';
import {useNavigation} from '@react-navigation/native';
import {Button} from '../components/Button';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 16,
  },
  welcome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
  },
});

export const LandingScreen = () => {
  const navigation = useNavigation();
  return (
    <ScreenWrapper>
      <View style={styles.wrapper}>
        <Text style={styles.welcome}>
          Welcome To StCharles Vehicle Support Team
        </Text>
        <Text style={styles.body}>If you are member please</Text>
        <Button label="Log In" onPress={() => navigation.navigate('Login')} />
        <Text style={styles.body}>If you have a invite code then please</Text>
        <Button
          label="Join over here"
          onPress={() => navigation.navigate('Join')}
        />
      </View>
    </ScreenWrapper>
  );
};
