// import action types
import {
  SELECT_PREVIOUS_ITEM,
  SELECT_NEXT_ITEM,
  SELECT_ITEM,
  RESET_SELECTED_ITEM,
} from '../actions';

// set default state
const initialState = 0;

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_PREVIOUS_ITEM:
      if (state === 0) {
        return 0;
      } else if (state === 1) {
        return 0;
      }
      return state - 1;
    case SELECT_NEXT_ITEM:
      return state + 1;
    case SELECT_ITEM:
      return action.key;
    case RESET_SELECTED_ITEM:
      return 0;
    default:
      return state;
  }
}
