import { combineReducers } from 'redux';
import q from './q';
import results from './results';

// combine all reducers
const rootReducer = combineReducers({
  q, // the query
  results, // the results
});

// export the root reducer
export default rootReducer;
