import moment from 'moment';
import {MONTHLY_DATES_SUCCESS} from '../types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MONTHLY_DATES_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
};
