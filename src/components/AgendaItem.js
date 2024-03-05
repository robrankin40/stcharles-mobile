import isEmpty from 'lodash/isEmpty';
import React, {useCallback} from 'react';
import moment from 'moment';
import {
  StyleSheet,
  Alert,
  View,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import {useDeleteScheduleMutation} from '../store/api/scheduleManagerApi';

const AgendaItem = props => {
  const {item} = props;
  const [deleteSchedule] = useDeleteScheduleMutation();

  const buttonPressed = useCallback(() => {
    deleteSchedule(item._id);
  }, [item, deleteSchedule]);

  const itemPressed = useCallback(() => {
    Alert.alert(
      `Call with ${item.customerName} at ${moment(item.startAt).format(
        'h:mm a',
      )}`,
      `Phone number: ${item.customerName}\n VIN: ${item.vin}\n Service: ${item.requiredServiceContent}`,
    );
  }, [item]);

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={itemPressed} style={styles.item}>
      <View>
        <Text style={styles.itemHourText}>
          {moment(item.startAt).format('h:mm a')}
        </Text>
        <Text style={styles.itemDurationText}>{item.duration}</Text>
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.itemTitleText}>{item.customerName}</Text>
        <Text style={styles.itemSubtitle}>{item.requiredServiceContent}</Text>
      </View>
      <View style={styles.itemButtonContainer}>
        <Button color={'grey'} title={'Delete'} onPress={buttonPressed} />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(AgendaItem);

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
  },
  itemHourText: {
    color: 'black',
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemSubtitle: {
    color: 'grey',
    fontSize: 12,
  },
  contentWrapper: {
    marginLeft: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14,
  },
});
