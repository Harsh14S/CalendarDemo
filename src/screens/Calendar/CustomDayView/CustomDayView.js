import React, {useState, useReducer, useRef, useCallback} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Alert, Text} from 'react-native';

import WeekView, {createFixedWeekDate} from 'react-native-week-view';
import {buildDateCycler, makeBuilder, eventsWithUpdate} from './debug-utils';

const buildEvent = makeBuilder();

const sampleEvents = [
  // Previous week
  buildEvent(-24 * 7 - 5, 2, 'pink', {resolveOverlap: 'lane'}),
  buildEvent(-24 * 7 - 14, 3, 'lightblue', {resolveOverlap: 'lane'}),

  // This week
  buildEvent(0, 2, 'blue', {resolveOverlap: 'lane'}),
  buildEvent(1, 3, 'red', {resolveOverlap: 'lane'}),
  buildEvent(-18, 48 + 5, 'green', {
    eventKind: 'block',
    resolveOverlap: 'lane',
  }),

  buildEvent(0 - 24, 2, 'blue', {
    allDay: true,
    description: 'Long description is wrapped',
    resolveOverlap: 'lane',
  }),
  buildEvent(1, 3, 'red', {allDay: true, resolveOverlap: 'lane'}),
  buildEvent(-18, 48 + 5, 'green', {allDay: true, resolveOverlap: 'lane'}),

  // Next week
  buildEvent(24 * 7, 2, 'magenta', {resolveOverlap: 'lane'}),
  buildEvent(24 * 7 - 48, 3, 'green', {
    style: {
      borderWidth: 5,
    },
    disableDrag: true,
    disablePress: true,
    disableLongPress: true,
    resolveOverlap: 'lane',
  }),
  buildEvent(24 * 7 + 6, 6, 'brown', {resolveOverlap: 'lane'}),
  buildEvent(24 * 7 + 13, 2, 'lightgreen', {
    allDay: true,
    description: 'Long description is wrapped',
    resolveOverlap: 'lane',
  }),
  buildEvent(24 * 7 - 18, 48 + 5, 'lightgreen', {
    allDay: true,
    resolveOverlap: 'lane',
  }),

  // Two more weeks
  buildEvent(48 * 7, 2, 'pink', {resolveOverlap: 'lane'}),
  buildEvent(48 * 7 - 54, 4, 'green', {resolveOverlap: 'lane'}),
  buildEvent(48 * 7 + 1, 3, 'lightgreen', {
    allDay: true,
    resolveOverlap: 'lane',
  }),

  // Many events
  // ...Array.from({length: 1000}, (_, i) =>
  //   buildEvent(24 + i * 5, 2, 'lightblue'),
  // ),
];

const sampleFixedEvents = [
  {
    id: 1,
    description: 'Event 1',
    startDate: createFixedWeekDate('Monday', 12),
    endDate: createFixedWeekDate(1, 14),
    color: 'blue',
    resolveOverlap: 'lane',
  },
  {
    id: 2,
    description: 'Event 2',
    startDate: createFixedWeekDate('wed', 16),
    endDate: createFixedWeekDate(3, 17, 30),
    color: 'red',
    resolveOverlap: 'lane',
  },
  {
    id: 4,
    startDate: new Date(2022, 6, 23, 12, 0, 0),
    endDate: new Date(2022, 6, 23, 16, 30, 0),
    color: 'dodgerblue',
    description: 'EvtA 1',
    resolveOverlap: 'stack',
    stackKey: 'type-A',
  },
  {
    id: 5,
    startDate: new Date(2022, 6, 23, 14, 0, 0),
    endDate: new Date(2022, 6, 23, 18, 15, 0),
    color: 'lightblue',
    description: 'EvtA 2',
    resolveOverlap: 'stack',
    stackKey: 'type-A',
  },
  {
    id: 6,
    startDate: new Date(2022, 6, 23, 14, 30, 0),
    endDate: new Date(2022, 6, 23, 16, 30, 0),
    color: 'gold',
    description: 'EvtB 1',
    resolveOverlap: 'stack',
    stackKey: 'type-B',
  },
  {
    id: 7,
    startDate: new Date(2022, 6, 23, 16, 0, 0),
    endDate: new Date(2022, 6, 23, 18, 30, 0),
    color: 'orange',
    description: 'EvtB 2',
    resolveOverlap: 'stack',
    stackKey: 'type-B',
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
const dateCycler = buildDateCycler([]);

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

    const {id, color, startDate, endDate} = event;
    Alert.alert(
      `Event press ${color} - ${id}`,
      `start: ${startDate}\nend: ${endDate}`,
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
          formatDateHeader={showFixedComponent ? 'ddd' : 'ddd DD'}
          hoursInDisplay={12}
          timeStep={60}
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
