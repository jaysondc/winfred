import React, { Component, PropTypes } from 'react';
import ResultsList from '../components/ResultsList';
import { Result } from '../../models';

const ResultsContainer = class ResultsContainer extends Component {
  render() {
    const { results } = this.props;
    return (
      <ResultsList results={results} />
    );
  }
};


ResultsContainer.propTypes = {
  results: PropTypes.arrayOf(PropTypes.instanceOf(Result)),
};

export default ResultsContainer;
