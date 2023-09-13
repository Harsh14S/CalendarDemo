import {put, call, takeEvery, take} from 'redux-saga/effects';
import {ADD_EVENT_REQUEST, ADD_EVENT_SUCCESS, ADD_EVENT_FAILED} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getEvents() {
  try {
    const calendarEvents = await AsyncStorage.getItem('@allCalendarEvents');
    return JSON.parse(calendarEvents);
  } catch (error) {
    console.log('Get Events Error -----> ', error);
  }
}

async function setEvents(newEvent) {
  const {date} = newEvent;
  let allEvents = await getEvents();
  if (allEvents) {
    let eventDateExists = allEvents.findIndex(item => item.date === date);
    if (eventDateExists !== -1) {
      let currEvent = allEvents[eventDateExists];
      let {events} = currEvent;
      const eventObj = {
        ...currEvent,
        events: [...events, newEvent],
      };
      allEvents[eventDateExists] = eventObj;
    } else {
      const eventObj = {
        date: date,
        events: [newEvent],
      };
      allEvents = [...allEvents, eventObj];
    }
    const stringArr = JSON.stringify(allEvents);
    // console.log('stringArr ----> ', stringArr);
    try {
      await AsyncStorage.setItem('@allCalendarEvents', stringArr);
      console.log('item set successfully');
    } catch (error) {
      console.log('if Set Events Error ----->', error);
    }
  } else {
    const eventObj = {
      date: date,
      events: [newEvent],
    };
    const stringArr = JSON.stringify([eventObj]);
    try {
      await AsyncStorage.setItem('@allCalendarEvents', stringArr);
      console.log('item set successfully');
    } catch (error) {
      console.log('else Set Events Error ----->', error);
    }
  }
}

function* AddEventAsync({payload}) {
  try {
    yield call(setEvents, payload);
    yield put({type: ADD_EVENT_SUCCESS, payload: payload});
  } catch (e) {
    // console.log('login error saga--->', e);
    yield put({type: ADD_EVENT_FAILED, payload: e});
  }
}

function* AddEventSaga() {
  yield takeEvery(ADD_EVENT_REQUEST, AddEventAsync);
}
export default AddEventSaga;
