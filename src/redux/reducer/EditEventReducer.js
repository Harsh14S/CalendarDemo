import {EDIT_EVENT_FAILED, EDIT_EVENT_SUCCESS} from '../types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EDIT_EVENT_SUCCESS: {
      return {success: true};
    }
    case EDIT_EVENT_FAILED: {
      return {success: false, error: action.payload};
    }

    default:
      return state;
  }
};
