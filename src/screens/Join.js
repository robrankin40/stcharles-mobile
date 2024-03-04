import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import ScreenWrapper from '../components/ScreenWrapper';
import {Button} from '../components/Button';
import Input from '../components/Input';
import {useJoinMutation} from '../store/api/authApi';
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
    marginBottom: 8,
    marginTop: 16,
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

export const JoinScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm({
    defaultValues: {
      email: '',
      inviteCode: '',
    },
  });
  const [joinUser, {isError, isLoading}] = useJoinMutation();
  const errorMessage = useSelector(selectAuthErrorMessage);
  const onSubmit = data => {
    joinUser({email: data.email, inviteCode: data.inviteCode});
  };
  return (
    <ScreenWrapper>
      <View style={styles.wrapper}>
        <Text style={styles.header}>
          Please provide email and invite code to join
        </Text>
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
        <Text style={styles.fieldLabel}>Invite Code:</Text>
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
            />
          )}
          name="inviteCode"
        />
        {isError && <Text style={styles.error}>{errorMessage}</Text>}
        <Button
          label="Join"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading || !isValid}
        />
        <Button danger label="< Go Back" onPress={() => navigation.goBack()} />
      </View>
    </ScreenWrapper>
  );
};
