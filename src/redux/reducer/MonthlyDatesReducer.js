import moment from 'moment';
import {ADD_EVENT_REQUEST, MONTHLY_DATES_REQUEST} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getEvents() {
  const calendarEvents = await AsyncStorage.getItem('@allCalendarEvents');
  console.log('calendarEvents ----> ', calendarEvents);
}

function finalData(time) {
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
    return {
      day,
      isToday: false,
      isSelectedMonth: false,
      date,
      timestamp,
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
    return {
      day,
      isToday: new Date().getDate() === index + 1 && isSelectedMonth,
      isSelectedMonth: true,
      date,
      timestamp,
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
    return {
      day,
      isToday: false,
      isSelectedMonth: false,
      date,
      timestamp,
    };
  });

  return [...previousMonth, ...currentMonth, ...nextMonth];
}

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MONTHLY_DATES_REQUEST: {
      const time = action.payload.time;
      const data = finalData(time);
      return data;
    }

    case ADD_EVENT_REQUEST: {
      return [];
    }

    default:
      return state;
  }
};
