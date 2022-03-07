import { SAVE_LOGIN } from '../actions/loginActions';

const INITIAL_STATE = {
  name: '',
  password: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN:
    return {
      ...state,
      name: action.name,
      password: action.password,
    };
  default:
    return state;
  }
};

export default loginReducer;
