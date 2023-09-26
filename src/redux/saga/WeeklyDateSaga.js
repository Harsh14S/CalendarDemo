import {put, call, takeEvery, take} from 'redux-saga/effects';
import {
  WEEKLY_DATES_REQUEST,
  WEEKLY_DATES_SUCCESS,
  WEEKLY_DATES_FAILED,
} from '../types';
import moment from 'moment';

import AsyncStorage from '@react-native-async-storage/async-storage';

async function getEvents() {
  try {
    const calendarEvents = await AsyncStorage.getItem('@allCalendarEvents');
    return JSON.parse(calendarEvents);
  } catch (error) {
    console.log('Get Events Error -----> ', error);
  }
}

async function finalData(time) {
  const allEvents = await getEvents();

  const weekDayNum = Number(moment(time).format('d'));
  const currentDate = new Date(time);
  let _date = currentDate;
  if (weekDayNum !== 0) {
    _date = currentDate.setDate(currentDate.getDate() - currentDate.getDay());
  } else {
    _date = currentDate.getTime();
  }

  const isSelectedMonth =
    moment(new Date()).format('MMMM') === moment(_date).format('MMMM') &&
    moment(new Date()).format('YYYY') === moment(_date).format('YYYY');

  const currentWeek = new Array(7).fill(0).map((item, index) => {
    const day = index + 1;
    const timestamp = new Date(
      new Date(_date).getFullYear(),
      new Date(_date).getMonth(),
      new Date(_date).getDate() + index,
    ).getTime();
    const dayName = moment(timestamp).format('dddd');
    const date = moment(timestamp).format('YYYY-MM-DD');
    let dayEvent = allEvents
      ? allEvents.find(item => item.date === date)
      : null;
    let events = dayEvent ? dayEvent.events : [];
    return {
      day,
      dayName,
      isToday:
        new Date(timestamp).getDate() === new Date().getDate() &&
        isSelectedMonth,
      date,
      timestamp,
      events,
    };
  });
  return [...currentWeek];
}
function* WeeklyDateAsync({payload}) {
  try {
    const {time} = payload;
    const data = yield call(finalData, time);
    yield put({type: WEEKLY_DATES_SUCCESS, payload: data});
  } catch (e) {
    yield put({type: WEEKLY_DATES_FAILED, payload: e});
  }
}

function* WeeklyDateSaga() {
  yield takeEvery(WEEKLY_DATES_REQUEST, WeeklyDateAsync);
}
export default WeeklyDateSaga;
