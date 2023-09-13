import {REMOVE_EVENT_FAILED, REMOVE_EVENT_SUCCESS} from '../types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REMOVE_EVENT_SUCCESS: {
      return {success: true};
    }
    case REMOVE_EVENT_FAILED: {
      return {success: false, error: action.payload};
    }

    default:
      return state;
  }
};
