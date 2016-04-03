import React, { PropTypes } from 'react';
import ResultsList from '../components/ResultsList';
import { Result } from '../../models';

const ResultsContainer = ({ results }) => (
  <ResultsList results={results} />
);

ResultsContainer.propTypes = {
  results: PropTypes.arrayOf(PropTypes.instanceOf(Result)),
};

export default ResultsContainer;
