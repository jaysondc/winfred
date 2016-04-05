import { throttle } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ipc from '../ipc';
import QueryFieldContainer from '../containers/QueryFieldContainer';
import ResultsContainer from '../containers/ResultsContainer';
import {
  updateQuery,
  updateResults,
  resetResults,
  selectPreviousItem,
  selectNextItem,
  resetSelectedItem,
} from '../actions';
import {
  IPC_SEARCH,
  IPC_SEARCH_REPLY,
  IPC_SEARCH_COLLAPSE_WINDOW,
  IPC_SEARCH_EXPAND_WINDOW,
  IPC_RESULT_PREVIOUS_ITEM,
  IPC_RESULT_NEXT_ITEM,
  IPC_RESET_SELECTED_ITEM,
} from '../../const/ipc';

const styles = {
  base: {
    width: '100%',
    height: '100%',
    padding: '0px',
    boxSizing: 'border-box',
  },
};

const AppContainer = class AppContainer extends Component {
  componentDidMount() {
    this.search = throttle(this.search, 100);

    // listen for search replies
    ipc.on(IPC_SEARCH_REPLY, (evt, results) => {
      // if results are not available, send a message to upadte the main window
      if (results.length) {
        ipc.send(IPC_SEARCH_EXPAND_WINDOW);
      } else {
        ipc.send(IPC_SEARCH_COLLAPSE_WINDOW);
      }
      this.props.dispatch(updateResults(results));
    });

    ipc.on(IPC_RESULT_PREVIOUS_ITEM, () => {
      this.props.dispatch(selectPreviousItem());
    });

    ipc.on(IPC_RESULT_NEXT_ITEM, () => {
      if (this.props.selectedIndex < this.props.results.length - 1) {
        this.props.dispatch(selectNextItem());
      }
    });

    ipc.on(IPC_RESET_SELECTED_ITEM, () => {
      this.props.dispatch(resetSelectedItem());
    });
  }

  render() {
    const { results } = this.props;
    const resultsContainerHtml = results.length ? <ResultsContainer results={results} /> : '';
    return (
      <div style={styles.base}>
        <QueryFieldContainer onChange={::this.handleChange} />
        {resultsContainerHtml}
      </div>
    );
  }

  handleChange(e) {
    // retrieve the query
    const q = e.target.value;
    // updates the query
    this.props.dispatch(updateQuery(q));
    if (q.length) {
      // do the search
      this.search(q);
    } else {
      // collapse the window
      ipc.send(IPC_SEARCH_COLLAPSE_WINDOW);
      // resets the results
      this.props.dispatch(resetResults(q));
    }
  }

  /**
   * Executes the search
   *
   * @param string q
   */
  search(q) {
    ipc.send(IPC_SEARCH, { q });
  }
};

const mapStateToProps = state => ({
  q: state.q,
  selectedIndex: state.selectedIndex,
  results: state.results,
});

AppContainer.propTypes = {
  dispatch: PropTypes.func,
  q: PropTypes.string,
  selectedIndex: PropTypes.number,
  results: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.array,
  ]),
};

export default connect(mapStateToProps)(AppContainer);
