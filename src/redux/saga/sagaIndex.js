import {all} from 'redux-saga/effects';
import MonthlyDateSaga from './MonthlyDateSaga';
import AddEventSaga from './AddEventSaga';

export default function* sagaIndex() {
  yield all([MonthlyDateSaga(), AddEventSaga()]);
}
