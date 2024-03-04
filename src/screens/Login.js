import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useSelector} from 'react-redux';

import ScreenWrapper from '../components/ScreenWrapper';
import {Button} from '../components/Button';
import Input from '../components/Input';
import {useNavigation} from '@react-navigation/native';
import {useLoginMutation} from '../store/api/authApi';
import {selectAuthErrorMessage} from '../store/authSlice';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'stretch',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 250,
  },
  fieldLabel: {
    fontSize: 14,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 32,
  },
  error: {
    marginVertical: 16,
    textAlign: 'center',
  },
});

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [login, {isLoading, isError}] = useLoginMutation();
  const errorMessage = useSelector(selectAuthErrorMessage);
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = data => {
    login({email: data.email, password: data.password});
  };
  return (
    <ScreenWrapper>
      <View style={styles.wrapper}>
        <Text style={styles.header}>Please log in to support account</Text>
        <Text style={styles.fieldLabel}>Email:</Text>
        <Controller
          control={control}
          rules={{required: true, minLength: 8}}
          render={({
            field: {onChange, onBlur, value},
            fieldState: {invalid},
          }) => (
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={invalid}
            />
          )}
          name="email"
        />
        <Text style={styles.fieldLabel}>Password:</Text>
        <Controller
          control={control}
          rules={{required: true, minLength: 3}}
          render={({
            field: {onChange, onBlur, value},
            fieldState: {invalid},
          }) => (
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={invalid}
              secureTextEntry={true}
            />
          )}
          name="password"
        />
        {isError && <Text style={styles.error}>{errorMessage}</Text>}
        <Button
          label="Log In"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isLoading}
        />
        <Button danger label="< Go Back" onPress={() => navigation.goBack()} />
      </View>
    </ScreenWrapper>
  );
};
