import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  loginReducer,
  searchReducer,
});

export default rootReducer;
