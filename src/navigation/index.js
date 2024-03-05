import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LandingScreen} from '../screens/Landing';
import {JoinScreen} from '../screens/Join';
import {GenerateNewPassScreen} from '../screens/GenerateNewPass';
import {LoginScreen} from '../screens/Login';
import {NewScheduleScreen} from '../screens/NewSchedule';
import {SchedulesScreen} from '../screens/Schedules';
import {useSelector} from 'react-redux';
import {
  selectIsAuthenticated,
  selectIsTempPasswordReady,
  selectUserStatus,
} from '../store/authSlice';
import {NotifyGeneratedPasswordScreen} from '../screens/NotifyGeneratedPassword';

const Stack = createNativeStackNavigator();

function Navigation() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isTempPasswordReady = useSelector(selectIsTempPasswordReady);
  const userStatus = useSelector(selectUserStatus);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isAuthenticated && !isTempPasswordReady && (
          <React.Fragment>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Join" component={JoinScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </React.Fragment>
        )}
        {isTempPasswordReady && (
          <Stack.Screen
            name="NotifyGeneratePassword"
            component={NotifyGeneratedPasswordScreen}
          />
        )}
        {isAuthenticated && userStatus === 'password-generated' && (
          <Stack.Screen
            name="GenerateNewPassword"
            component={GenerateNewPassScreen}
          />
        )}
        {isAuthenticated && (
          <React.Fragment>
            <Stack.Screen name="Schedules" component={SchedulesScreen} />
            <Stack.Screen name="NewSchedule" component={NewScheduleScreen} />
          </React.Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
