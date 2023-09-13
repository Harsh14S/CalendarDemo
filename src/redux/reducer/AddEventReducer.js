import moment from 'moment';
import {ADD_EVENT_FAILED, ADD_EVENT_SUCCESS} from '../types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_EVENT_SUCCESS: {
      return {success: true};
    }
    case ADD_EVENT_FAILED: {
      return {success: false, error: action.payload};
    }

    default:
      return state;
  }
};
