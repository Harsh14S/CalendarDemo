import {EDIT_EVENT_REQUEST} from '../types';

export default EditEventAction = payload => {
  return {
    type: EDIT_EVENT_REQUEST,
    payload,
  };
};
