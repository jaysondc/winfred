import { throttle } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateQuery, updateResults, resetResults } from '../actions';
import ipc from '../ipc';
import QueryFieldContainer from '../containers/QueryFieldContainer';
import ResultsContainer from '../containers/ResultsContainer';
import {
  IPC_SEARCH,
  IPC_SEARCH_REPLY,
  IPC_SEARCH_COLLAPSE_WINDOW,
  IPC_SEARCH_EXPAND_WINDOW,
} from '../../const/ipc';

const styles = {
  base: {
    width: '100%',
    height: '100%',
    padding: '15px',
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

const mapStateToProps = (state) => ({
  q: state.q,
  results: state.results,
});

AppContainer.propTypes = {
  dispatch: PropTypes.func,
  q: PropTypes.string,
  results: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.array,
  ]),
};

export default connect(mapStateToProps)(AppContainer);
