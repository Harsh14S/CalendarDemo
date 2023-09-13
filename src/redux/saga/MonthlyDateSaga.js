import {put, call, takeEvery, take} from 'redux-saga/effects';
import {
  MONTHLY_DATES_REQUEST,
  MONTHLY_DATES_SUCCESS,
  MONTHLY_DATES_FAILED,
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
  // console.log(JSON.stringify(allEvents));
  const totalDays = new Date(
    new Date(time).getFullYear(),
    new Date(time).getMonth() + 1,
    0,
  ).getDate();
  const _time = new Date(
    new Date(time).getFullYear(),
    new Date(time).getMonth(),
    1,
  );
  const isSelectedMonth =
    moment(new Date()).format('MMMM') === moment(time).format('MMMM') &&
    moment(new Date()).format('YYYY') === moment(time).format('YYYY');

  const emptyAdds = Number(moment(_time).format('d'));
  const lastMonthDays = Number(moment(time).subtract(1, 'month').daysInMonth());
  const nextMonthDays = Number(moment(time).add(1, 'month').daysInMonth());

  const remainAdds =
    Number(7 - ((emptyAdds + totalDays) % 7)) === 7
      ? 0
      : Number(7 - ((emptyAdds + totalDays) % 7));

  const previousMonth = new Array(emptyAdds).fill(0).map((item, index) => {
    const day = lastMonthDays - emptyAdds + (index + 1);
    const timestamp = new Date(
      new Date(time).getFullYear(),
      new Date(time).getMonth() - 1,
      day,
    ).getTime();
    const date = moment(timestamp).format('YYYY-MM-DD');
    let dayEvent = allEvents.find(item => item.date === date);
    events = dayEvent ? dayEvent.events : [];
    return {
      day,
      isToday: false,
      isSelectedMonth: false,
      date,
      timestamp,
      events,
    };
  });

  const currentMonth = new Array(totalDays).fill(0).map((item, index) => {
    const day = index + 1;
    const timestamp = new Date(
      new Date(time).getFullYear(),
      new Date(time).getMonth(),
      day,
    ).getTime();
    const date = moment(timestamp).format('YYYY-MM-DD');
    let dayEvent = allEvents.find(item => item.date === date);
    events = dayEvent ? dayEvent.events : [];
    // console.log('events ----> ', events);
    return {
      day,
      isToday: new Date().getDate() === index + 1 && isSelectedMonth,
      isSelectedMonth: true,
      date,
      timestamp,
      events,
    };
  });

  const nextMonth = new Array(remainAdds).fill(0).map((item, index) => {
    const day = index + 1;
    const timestamp = new Date(
      new Date(time).getFullYear(),
      new Date(time).getMonth() + 1,
      day,
    ).getTime();
    const date = moment(timestamp).format('YYYY-MM-DD');
    let dayEvent = allEvents.find(item => item.date === date);
    events = dayEvent ? dayEvent.events : [];
    return {
      day,
      isToday: false,
      isSelectedMonth: false,
      date,
      timestamp,
      events,
    };
  });

  return [...previousMonth, ...currentMonth, ...nextMonth];
}
function* MonthlyDateAsync({payload}) {
  try {
    const {time} = payload;
    const data = yield call(finalData, time);
    yield put({type: MONTHLY_DATES_SUCCESS, payload: data});
  } catch (e) {
    // console.log('login error saga--->', e);
    yield put({type: MONTHLY_DATES_FAILED, payload: e});
  }
}

function* MonthlyDateSaga() {
  yield takeEvery(MONTHLY_DATES_REQUEST, MonthlyDateAsync);
}
export default MonthlyDateSaga;
