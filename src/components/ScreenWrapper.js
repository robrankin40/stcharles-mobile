import React from 'react';
import {View, SafeAreaView} from 'react-native';

const ScreenWrapper = props => (
  <SafeAreaView style={{flex: 1}}>
    <View style={{flex: 1}}>{props.children}</View>
  </SafeAreaView>
);

export default ScreenWrapper;
