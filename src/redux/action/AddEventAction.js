import {ADD_EVENT_REQUEST} from '../types';

export default AddEventAction = params => {
  return {
    type: ADD_EVENT_REQUEST,
    params,
  };
};
