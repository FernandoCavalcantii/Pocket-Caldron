import { SEARCH_STATUS } from '../actions/searchInputActions';

const INITIAL_STATE = {
  status: false,
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_STATUS:
    return {
      status: !state.status,
    };
  default:
    return state;
  }
};

export default searchReducer;
