import { combineReducers } from 'redux';
import q from './q';
import selectedIndex from './selectedIndex';
import results from './results';

// combine all reducers
const rootReducer = combineReducers({
  q, // the query
  selectedIndex, // the currently selected result item
  results, // the results
});

// export the root reducer
export default rootReducer;
