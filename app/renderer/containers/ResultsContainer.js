import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ResultsList from '../components/ResultsList';
import { selectPreviousItem, selectNextItem } from '../actions';
import ipc from '../ipc';
import {
  IPC_RESULT_PREVIOUS_ITEM,
  IPC_RESULT_NEXT_ITEM,
} from '../../const/ipc';

const ResultsContainer = class ResultsContainer extends Component {
  componentDidMount() {
    ipc.on(IPC_RESULT_PREVIOUS_ITEM, () => {
      this.props.dispatch(selectPreviousItem());
    });
    ipc.on(IPC_RESULT_NEXT_ITEM, () => {
      this.props.dispatch(selectNextItem());
    });
  }

  render() {
    const { selectedIndex, results } = this.props;
    return (
      <ResultsList results={results} selectedIndex={selectedIndex} />
    );
  }
};

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
