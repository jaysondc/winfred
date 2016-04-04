// import action types
import { SELECT_PREVIOUS_ITEM, SELECT_NEXT_ITEM, SELECT_ITEM } from '../actions';

// set default state
const initialState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_PREVIOUS_ITEM:
      if (state === null) {
        return 0;
      } else if (state === 1) {
        return 0;
      }
      return state - 1;
    case SELECT_NEXT_ITEM:
      if (state === null) {
        return 0;
      }
      return state + 1;
    case SELECT_ITEM:
      return action.key;
    default:
      return state;
  }
}
