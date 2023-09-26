import moment from 'moment';
import {WEEKLY_DATES_SUCCESS} from '../types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WEEKLY_DATES_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
};
