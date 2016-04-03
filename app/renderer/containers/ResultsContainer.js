import React, { PropTypes } from 'react';
import ResultsList from '../components/ResultsList';
import { Result } from '../../models';

const ResultsContainer = ({ results }) => (
  <ResultsList results={results} />
);

ResultsContainer.propTypes = {
  results: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.instanceOf(Result)),
    PropTypes.array,
  ]),
};

export default ResultsContainer;
