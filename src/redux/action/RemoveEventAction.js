import {REMOVE_EVENT_REQUEST} from '../types';

export default RemoveEventAction = payload => {
  return {
    type: REMOVE_EVENT_REQUEST,
    payload,
  };
};
