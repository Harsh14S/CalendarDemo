import {WEEKLY_DATES_REQUEST} from '../types';

export default WeeklyDatesAction = payload => {
  return {
    type: WEEKLY_DATES_REQUEST,
    payload,
  };
};
