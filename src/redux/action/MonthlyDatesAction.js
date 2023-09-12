import {MONTHLY_DATES_REQUEST} from '../types';

export default MonthlyDatesAction = payload => {
  return {
    type: MONTHLY_DATES_REQUEST,
    payload,
  };
};
