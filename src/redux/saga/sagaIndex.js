import {all} from 'redux-saga/effects';
import MonthlyDateSaga from './MonthlyDateSaga';
import AddEventSaga from './AddEventSaga';
import RemoveEventSaga from './RemoveEventSaga';
import EditEventSaga from './EditEventSaga';
import WeeklyDateSaga from './WeeklyDateSaga';

export default function* sagaIndex() {
  yield all([
    MonthlyDateSaga(),
    AddEventSaga(),
    RemoveEventSaga(),
    EditEventSaga(),
    WeeklyDateSaga(),
  ]);
}
