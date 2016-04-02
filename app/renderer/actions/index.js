// Action Types
export const UPDATE_QUERY = 'QUUPDATE_QUERYERY';
export const RESET_QUERY = 'RESET_QUERY';
export const UPDATE_RESULTS = 'UPDATE_RESULTS';
export const RESET_RESULTS = 'RESET_RESULTS';

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
