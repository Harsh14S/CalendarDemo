import React, {useState, useReducer, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Alert,
  Text,
  ScrollView,
} from 'react-native';

import WeekView, {createFixedWeekDate} from 'react-native-week-view';
import {buildDateCycler, makeBuilder, eventsWithUpdate} from './debug-utils';
import moment from 'moment';

const buildEvent = makeBuilder();

const sampleEvents = [
  // Previous week
  buildEvent(-24 * 7 - 5, 2, 'pink'),
  buildEvent(-24 * 7 - 14, 3, 'lightblue'),

  // This week
  buildEvent(0, 2, 'blue', {eventKind: 'block'}),
  buildEvent(1, 3, 'red', {resolveOverlap: 'lane'}),
  buildEvent(-18, 48 + 5, 'green', {eventKind: 'block'}),

  buildEvent(0 - 24, 2, 'blue', {
    allDay: true,
    description: 'Long description is wrapped',
  }),
  buildEvent(1, 3, 'red', {allDay: true}),
  buildEvent(-18, 48 + 5, 'green', {allDay: true}),

  // Next week
  buildEvent(24 * 7, 2, 'magenta'),
  buildEvent(24 * 7 - 48, 3, 'green', {
    style: {
      borderWidth: 5,
    },
    disableDrag: true,
    disablePress: true,
    disableLongPress: true,
  }),
  buildEvent(24 * 7 + 6, 6, 'brown', {resolveOverlap: 'ignore'}),
  buildEvent(24 * 7 + 13, 2, 'lightgreen', {
    allDay: true,
    description: 'Long description is wrapped',
  }),
  buildEvent(24 * 7 - 18, 48 + 5, 'lightgreen', {allDay: true}),

  // Two more weeks
  buildEvent(48 * 7, 2, 'pink'),
  buildEvent(48 * 7 - 54, 4, 'green'),
  buildEvent(48 * 7 + 1, 3, 'lightgreen', {allDay: true}),

  // Many events
  // ...Array.from({length: 1000}, (_, i) =>
  //   buildEvent(24 + i * 5, 2, 'lightblue'),
  // ),
];

const countries = [
  'USA',
  'Canada',
  'India',
  'Australia',
  'Germany',
  'France',
  'Japan',
];
const sampleFixedEvents = [
  {
    id: 1,
    title: 'Event 1',
    startDate: createFixedWeekDate('Monday', 12),
    endDate: createFixedWeekDate(1, 14),
    color: 'blue',
    description: 'This is a test description',
  },
  {
    id: 2,
    title: 'Event 2',
    startDate: createFixedWeekDate('wed', 16),
    endDate: createFixedWeekDate(3, 17, 30),
    description: 'This is a test description',
    color: 'red',
  },
];

// For debugging purposes
const showFixedComponent = false;
const INITIAL_EVENTS = showFixedComponent ? sampleFixedEvents : sampleEvents;

const MyRefreshComponent = ({style}) => (
  // eslint-disable-next-line react-native/no-inline-styles
  <Text style={[style, {fontSize: 20, color: 'black'}]}>Loading...</Text>
);

const DRAG_EVENT_CONFIG = null;

const EDIT_EVENT_CONFIG = {
  top: true,
  bottom: true,
  left: true,
  right: true,
};

const PAGE_START_AT = {
  weekday: 1,
};

const onDayPress = (date, formattedDate) => {
  console.log('Day: ', date, formattedDate);
};

const onSwipeNext = d => console.log('Swipe next', d.toDateString());
const onSwipePrev = d => console.log('Swipe prev', d.toDateString());
const onTimeScrolled = d => console.log('Time scrolled', d.toTimeString());

// Use this to manually debug navigate through dates
// eslint-disable-next-line no-unused-vars
const dateCycler = buildDateCycler([
  // Example:
  // selectedDate={new Date(2022, 7, 14)}
  // new Date(2022, 7, 20),
  // new Date(2022, 7, 18),
  // new Date(2022, 7, 2),
]);

export default ({}) => {
  const componentRef = useRef(null);

  const [events, updateEvent] = useReducer(eventsWithUpdate, INITIAL_EVENTS);

  const onDragEvent = useCallback(
    (event, newStartDate, newEndDate) => {
      updateEvent({event, newStartDate, newEndDate});
    },
    [updateEvent],
  );

  const onEditEvent = useCallback(
    (event, newStartDate, newEndDate) => {
      console.log('Editing: ', event.id, newStartDate, newEndDate);
      updateEvent({event, newStartDate, newEndDate});
    },
    [updateEvent],
  );

  const [editingEvent, setEditEvent] = useState(null);

  const handleLongPressEvent = event => {
    if (editingEvent == null) {
      setEditEvent(event.id);
    } else {
      setEditEvent(null);
    }
  };

  const handlePressEvent = event => {
    if (editingEvent != null) {
      setEditEvent(null);
      return;
    }

    const {id, color, startDate, endDate, description} = event;
    const country = getNextCountry(startDate);
    Alert.alert(
      `Event press ${color} - ${id}`,
      `start: ${startDate}\nend: ${endDate}\nLocation: ${country}\nDescription: ${description}`,
    );
  };

  const handlePressGrid = (event, startHour, date) => {
    if (editingEvent != null) {
      setEditEvent(null);
      return;
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // zero-based
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    Alert.alert(`${year}-${month}-${day} ${hour}:${minutes}:${seconds}`);
  };

  const onMonthPress = useCallback((date, formattedDate) => {
    // // Debug navigating through dates:
    // if (componentRef && componentRef.current) {
    //   componentRef.current.goToDate(dateCycler.next());
    // }

    console.log('Month: ', date, formattedDate);
  }, []);

  // Display Location Name
  const getNextCountry = date => {
    const dayOfYear = moment(date).dayOfYear();
    console.log('dayOfYear', dayOfYear);
    const index = dayOfYear % countries.length;
    console.log('index', index);
    return countries[index];
  };

  // Create Custom Day Componts Header
  const CustomeHeaderComponts = ({date, formattedDate}) => {
    console.log('date', date);
    console.log('formattedDate', formattedDate);
    const country = getNextCountry(date);

    const nEventsInDay = events.filter(evt =>
      moment(evt.startDate).isSame(date, 'day'),
    ).length;
    console.log('nEventsInDay', nEventsInDay);

    return (
      <>
        <Text>{formattedDate}</Text>
        <Text>
          {/* {nEventsInDay} */}
          {country}
        </Text>
      </>
    );

    // return (
    //   <FlatList
    //     data={countries}
    //     renderItem={({item}) => <Text style={{fontSize: 20}}>{item}</Text>}
    //     keyExtractor={(item, index) => index.toString()}
    //   />
    // );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <WeekView
          ref={componentRef}
          events={events}
          selectedDate={new Date()}
          numberOfDays={7}
          pageStartAt={PAGE_START_AT}
          onEventPress={handlePressEvent}
          onEventLongPress={handleLongPressEvent}
          onGridLongPress={handlePressGrid}
          headerStyle={styles.header}
          headerTextStyle={styles.headerText}
          hourTextStyle={styles.hourText}
          eventContainerStyle={styles.eventContainer}
          gridColumnStyle={styles.gridColumn}
          gridRowStyle={styles.gridRow}
          // formatDateHeader={showFixedComponent ? 'ddd' : 'ddd DD'}
          // formatTimeLabel={''}
          hoursInDisplay={12}
          timeStep={60}
          DayHeaderComponent={CustomeHeaderComponts}
          startHour={15}
          fixedHorizontally={showFixedComponent}
          showTitle={!showFixedComponent}
          timesColumnWidth={0.2}
          showNowLine
          onDragEvent={onDragEvent}
          isRefreshing={false}
          RefreshComponent={MyRefreshComponent}
          onDayPress={onDayPress}
          onMonthPress={onMonthPress}
          onTimeScrolled={onTimeScrolled}
          onSwipeNext={onSwipeNext}
          onSwipePrev={onSwipePrev}
          editingEvent={editingEvent}
          onEditEvent={onEditEvent}
          editEventConfig={EDIT_EVENT_CONFIG}
          dragEventConfig={DRAG_EVENT_CONFIG}
          runOnJS={false}
          enableVerticalPinch
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#4286f4',
    borderColor: '#fff',
  },
  headerText: {
    color: 'white',
  },
  hourText: {
    color: 'black',
  },
  eventContainer: {
    borderWidth: 1,
    borderColor: 'black',
  },
  gridRow: {
    borderTopWidth: 1,
    borderColor: '#E9EDF0',
  },
  gridColumn: {
    borderLeftWidth: 1,
    borderColor: '#E9EDF0',
  },
});