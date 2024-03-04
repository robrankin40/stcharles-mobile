import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import ScreenWrapper from '../components/ScreenWrapper';
import {
  resetAuth,
  selectAuthErrorMessage,
  selectTempPassword,
} from '../store/authSlice';
import {Button} from '../components/Button';
import {Controller, useForm} from 'react-hook-form';
import Input from '../components/Input';
import {useUpdatePasswordMutation} from '../store/api/authApi';

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
  error: {
    marginVertical: 16,
    textAlign: 'center',
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
  },
  spacer: {
    marginBottom: 24,
  },
});

export const GenerateNewPassScreen = () => {
  const dispatch = useDispatch();
  const [inputError, setInputError] = useState();
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm({
    defaultValues: {oldPassword: '', newPassword: '', confirmNewPassword: ''},
  });
  const [updatePassword, {isLoading, isSuccess, isError}] =
    useUpdatePasswordMutation();
  const errorMessage = useSelector(selectAuthErrorMessage);
  const onUpdatePassword = data => {
    if (
      data.newPassword === data.confirmNewPassword &&
      data.newPassword !== data.oldPassword
    ) {
      updatePassword({
        oldPassword: data.oldPassword,
        password: data.newPassword,
      });
      setInputError(false);
    } else {
      setInputError('Password input rules are not followed');
    }
  };
  const handleLogin = () => {
    dispatch(resetAuth());
  };
  return (
    <ScreenWrapper>
      <View style={styles.wrapper}>
        <Text style={styles.header}>You are now part of the support team!</Text>
        {isSuccess ? (
          <Text>Password updated successfully</Text>
        ) : (
          <>
            <Text style={styles.body}>
              Please update your generated password with your own.
            </Text>
            <Text style={styles.label}>Old Password</Text>
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
                  secureTextEntry={true}
                />
              )}
              name="oldPassword"
            />
            <Text style={styles.label}>New Password</Text>
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
                  secureTextEntry={true}
                />
              )}
              name="newPassword"
            />
            <Text style={styles.label}>Confirm New Password</Text>
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
                  secureTextEntry={true}
                />
              )}
              name="confirmNewPassword"
            />
          </>
        )}
        {inputError && <Text style={styles.error}>{inputError}</Text>}
        {isError && <Text style={styles.error}>{errorMessage}</Text>}
        <View style={styles.spacer} />
        {isSuccess ? (
          <Button
            label="Log In with new Password"
            onPress={handleLogin}
            disabled={!isValid || isLoading}
          />
        ) : (
          <Button
            label="Update Password"
            onPress={handleSubmit(onUpdatePassword)}
            disabled={!isValid || isLoading}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};
