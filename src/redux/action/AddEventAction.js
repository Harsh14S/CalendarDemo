import {ADD_EVENT_REQUEST} from '../types';

export default AddEventAction = payload => {
  return {
    type: ADD_EVENT_REQUEST,
    payload,
  };
};
