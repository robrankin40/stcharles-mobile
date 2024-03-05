import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation, useRoute} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';

import ScreenWrapper from '../components/ScreenWrapper';
import Input from '../components/Input';
import moment from 'moment';
import {Button} from '../components/Button';
import {useCreateScheduleMutation} from '../store/api/scheduleManagerApi';

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    width: 250,
    alignItems: 'stretch',
  },
  fieldLabel: {
    fontSize: 14,
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: '#3a86ff',
  },
  error: {
    marginTop: 16,
  },
  spacer: {
    marginBottom: 16,
  },
});

export const NewScheduleScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [createSchedule, {isLoading, isError, isSuccess}] =
    useCreateScheduleMutation();
  const date = route.params?.date;
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm({
    defaultValues: {
      customerName: '',
      customerPhone: '',
      vehicleType: '',
      vin: '',
      requiredServiceContent: '',
    },
  });

  const [startAt, setStartAt] = useState(moment(date).toDate());
  const [duration, setDuration] = useState('15m');
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (date) {
      setStartAt(moment(date).toDate());
    }
  }, [date]);

  useEffect(() => {
    if (!isLoading && !isError && isSuccess) {
      navigation.goBack();
    }
  }, [isLoading, isError, isSuccess]);

  const handleSetStartAt = dt => {
    setStartAt(dt);
    setShowDatePicker(false);
  };

  const isFormValid = useMemo(() => {
    return !!isValid && !!startAt && !!duration;
  }, [isValid, startAt, duration]);

  const onSubmit = useCallback(
    data => {
      createSchedule({...data, startAt, duration});
    },
    [startAt, duration, createSchedule],
  );

  return (
    <ScreenWrapper>
      <View style={styles.wrapper}>
        <Text style={styles.fieldLabel}>Customer Name:</Text>
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
          name="customerName"
        />
        <Text style={styles.fieldLabel}>Customer Phone:</Text>
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
          name="customerPhone"
        />
        <Text style={styles.fieldLabel}>Vehicle Type:</Text>
        <Controller
          control={control}
          rules={{required: false}}
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
          name="vehicleType"
        />
        <Text style={styles.fieldLabel}>VIN:</Text>
        <Controller
          control={control}
          rules={{required: true}}
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
          name="vin"
        />
        <Text style={styles.fieldLabel}>Requested Service:</Text>
        <Controller
          control={control}
          rules={{required: false}}
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
          name="requiredServiceContent"
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <>
            <Text style={styles.fieldLabel}>Starts At:</Text>
            <Text style={styles.input}>{moment(startAt).format('h:mm a')}</Text>
          </>
        </TouchableOpacity>
        <Text style={styles.fieldLabel}>Duration:</Text>
        <View style={styles.input}>
          <RNPickerSelect
            onValueChange={value => setDuration(value)}
            items={[
              {label: '15 minutes', value: '15m'},
              {label: '30 minutes', value: '30m'},
              {label: '1 hour', value: '1h'},
            ]}
          />
        </View>
        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="time"
          onConfirm={handleSetStartAt}
          onCancel={() => setShowDatePicker(false)}
        />
        {isError && (
          <Text style={styles.error}>
            Unexpected error while creating new schedule
          </Text>
        )}
        <View style={styles.spacer} />
        <Button
          label="Create New Schedule"
          disabled={!isFormValid || isLoading}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </ScreenWrapper>
  );
};
