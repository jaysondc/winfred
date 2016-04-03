import { throttle } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateQuery, updateResults, resetResults } from '../actions';
import ipc from '../ipc';
import { IPC_SEARCH, IPC_SEARCH_REPLY } from '../../const/ipc';
import { Result } from '../../models';
import QueryFieldContainer from '../containers/QueryFieldContainer';
import ResultsContainer from '../containers/ResultsContainer';

const AppContainer = class AppContainer extends Component {
  componentDidMount() {
    this.search = throttle(this.search, 100);
    // listen for search replies
    ipc.on(IPC_SEARCH_REPLY, (evt, results) => {
      this.props.dispatch(updateResults(results));
    });
  }

  render() {
    const { results } = this.props;
    const resultsContainerHtml = results.length ? <ResultsContainer results={results} /> : '';
    return (
      <div>
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
  results: PropTypes.arrayOf(PropTypes.instanceOf(Result)),
};

export default connect(mapStateToProps)(AppContainer);
