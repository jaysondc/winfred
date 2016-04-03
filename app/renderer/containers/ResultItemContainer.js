import React, { Component, PropTypes } from 'react';
import ResultItem from '../components/ResultItem';
import { Result } from '../../models';
import ipc from '../ipc';

const ResultItemContainer = class ResultItemContainer extends Component {
  render() {
    const { item } = this.props;
    return (
      <ResultItem item={item} onDoubleClick={::this.handleDoubleClick} />
    );
  }

  handleDoubleClick(e) {
    e.preventDefault();
    // execute this item
    ipc.execute(this.props.item);
  }
};

ResultItemContainer.propTypes = {
  item: PropTypes.object,
};

export default ResultItemContainer;
