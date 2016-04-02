import React, { Component, PropTypes } from 'react';
import ResultsList from '../components/ResultsList';

const ResultsContainer = class ResultsContainer extends Component {
  render() {
    const { results } = this.props;
    return (
      <ResultsList results={results} />
    );
  }
};


ResultsContainer.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
};

export default ResultsContainer;
