import {combineReducers} from 'redux';
import MonthlyDatesReducer from './MonthlyDatesReducer';
import AddEventReducer from './AddEventReducer';
import EditEventReducer from './EditEventReducer';
import RemoveEventReducer from './RemoveEventReducer';
import WeeklyDatesReducer from './WeeklyDatesReducer';
export const RootReducer = combineReducers({
  getMonthlyData: MonthlyDatesReducer,
  addEventData: AddEventReducer,
  editEventData: EditEventReducer,
  removeEventData: RemoveEventReducer,
  getweeklyData: WeeklyDatesReducer,
});
