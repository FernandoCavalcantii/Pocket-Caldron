import { SET_DRINKS } from '../actions/drinksActions';

const INITIAL_STATE = {
  drinks: [],
};

const drinksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_DRINKS:
    return {
      ...state,
      drinks: action.drinks,
    };
  default:
    return state;
  }
};

export default drinksReducer;
