import { SET_FOODS } from '../actions/foodsActions';

const INITIAL_STATE = {
  foods: [],
};

const foodsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_FOODS:
    return {
      ...state,
      foods: action.foods,
    };
  default:
    return state;
  }
};

export default foodsReducer;
