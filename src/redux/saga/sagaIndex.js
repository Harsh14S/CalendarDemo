import {all} from 'redux-saga/effects';
import MonthlyDateSaga from './MonthlyDateSaga';
import AddEventSaga from './AddEventSaga';
import RemoveEventSaga from './RemoveEventSaga';
import EditEventSaga from './EditEventSaga';

export default function* sagaIndex() {
  yield all([
    MonthlyDateSaga(),
    AddEventSaga(),
    RemoveEventSaga(),
    EditEventSaga(),
  ]);
}
