import {combineReducers} from 'redux';
import MonthlyDatesReducer from './MonthlyDatesReducer';
export const RootReducer = combineReducers({
  getMonthlyData: MonthlyDatesReducer,
});
