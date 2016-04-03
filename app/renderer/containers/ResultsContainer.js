import React, { PropTypes } from 'react';
import ResultsList from '../components/ResultsList';

const ResultsContainer = ({ results }) => (
  <ResultsList results={results} />
);

ResultsContainer.propTypes = {
  results: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.array,
  ]),
};

export default ResultsContainer;
