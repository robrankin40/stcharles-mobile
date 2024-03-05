import React, {useCallback, useRef, useMemo, useState, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from 'react-native-calendars';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

import AgendaItem from '../components/AgendaItem';
import {getTheme, themeColor, lightThemeColor} from '../mocks/theme';

import ScreenWrapper from '../components/ScreenWrapper';
import {useListScheduleQuery} from '../store/api/scheduleManagerApi';
import {FloatButton} from '../components/FloatButton';

const leftArrowIcon = require('../img/previous.png');
const rightArrowIcon = require('../img/next.png');

export const SchedulesScreen = () => {
  const navigation = useNavigation();
  const {data} = useListScheduleQuery();
  const [weekView] = useState(false);
  const theme = useRef(getTheme());
  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor,
  });
  const dateRef = useRef();

  const [marked, agendaItems] = useMemo(() => {
    const datesMap = {};
    for (let i = 0; i < data?.length; i += 1) {
      const date = moment(data[i].startAt).format('YYYY-MM-DD');
      if (datesMap[date]) {
        datesMap[date].push(data[i]);
      } else {
        datesMap[date] = [data[i]];
      }
    }
    const dates =
      Object.keys(datesMap).sort((a, b) => moment(a).isAfter(moment(b))) ?? [];
    return [
      dates.reduce((prev, cur) => ({...prev, [cur]: {marked: true}}), {}),
      dates.map(date => ({
        title: date,
        data: datesMap[date],
      })),
    ];
  }, [data]);

  const renderItem = useCallback(({item}) => {
    return <AgendaItem item={item} />;
  }, []);

  const handleAddSchedule = () => {
    navigation.navigate('NewSchedule', {date: dateRef.current});
  };

  return (
    <ScreenWrapper>
      <Text>Schedules Screen</Text>
      <CalendarProvider
        date={agendaItems?.[0]?.title ?? new Date()}
        showTodayButton
        theme={todayBtnTheme.current}
        onDateChanged={date => (dateRef.current = date)}>
        {weekView ? (
          <WeekCalendar firstDay={1} markedDates={marked} />
        ) : (
          <ExpandableCalendar
            theme={theme.current}
            firstDay={1}
            markedDates={marked}
            leftArrowImageSource={leftArrowIcon}
            rightArrowImageSource={rightArrowIcon}
          />
        )}
        <AgendaList
          sections={agendaItems}
          renderItem={renderItem}
          sectionStyle={styles.section}
        />
      </CalendarProvider>
      <FloatButton style={styles.floatButton} onPress={handleAddSchedule} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    backgroundColor: 'lightgrey',
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize',
  },
  floatButton: {
    bottom: 32,
    right: 32,
  },
});
