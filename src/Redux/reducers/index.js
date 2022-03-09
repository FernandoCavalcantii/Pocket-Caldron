import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import foodsReducer from './foodsReducer';

const rootReducer = combineReducers({
  loginReducer,
  foodsReducer,
});

export default rootReducer;
