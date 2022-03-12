import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import foodsReducer from './foodsReducer';
import drinksReducer from './drinksReducer';

const rootReducer = combineReducers({
  loginReducer,
  foodsReducer,
  drinksReducer,
});

export default rootReducer;
