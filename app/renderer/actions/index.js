// Action Types
export const UPDATE_QUERY = 'UPDATE_QUERY';
export const RESET_QUERY = 'RESET_QUERY';
export const UPDATE_RESULTS = 'UPDATE_RESULTS';
export const RESET_RESULTS = 'RESET_RESULTS';
export const RESET_SELECTED_ITEM = 'RESET_SELECTED_ITEM';
export const SELECT_PREVIOUS_ITEM = 'SELECT_PREVIOUS_ITEM';
export const SELECT_NEXT_ITEM = 'SELECT_NEXT_ITEM';
export const SELECT_ITEM = 'SELECT_ITEM';

// Action Creators
export function updateQuery(q) {
  return { type: UPDATE_QUERY, q };
}

export function resetQuery() {
  return { type: RESET_QUERY };
}

export function updateResults(results) {
  return { type: UPDATE_RESULTS, results };
}

export function resetResults() {
  return { type: RESET_RESULTS };
}

export function resetSelectedItem() {
  return { type: RESET_SELECTED_ITEM };
}

export function selectPreviousItem() {
  return { type: SELECT_PREVIOUS_ITEM };
}

export function selectNextItem() {
  return { type: SELECT_NEXT_ITEM };
}

export function selectItem(key) {
  return { type: SELECT_ITEM, key };
}
