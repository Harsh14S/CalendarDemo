import {combineReducers} from 'redux';
import MonthlyDatesReducer from './MonthlyDatesReducer';
import AddEventReducer from './AddEventReducer';
export const RootReducer = combineReducers({
  getMonthlyData: MonthlyDatesReducer,
  addEventData: AddEventReducer,
});
