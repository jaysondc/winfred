import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ResultsList from '../components/ResultsList';

const ResultsContainer = ({ selectedIndex, results }) => (
  <ResultsList results={results} selectedIndex={selectedIndex} />
);

const mapStateToProps = state => ({
  selectedIndex: state.selectedIndex,
});

ResultsContainer.propTypes = {
  dispatch: PropTypes.func,
  selectedIndex: PropTypes.number,
  results: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.array,
  ]),
};

export default connect(mapStateToProps)(ResultsContainer);
