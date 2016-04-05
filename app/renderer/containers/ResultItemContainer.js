import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ResultItem from '../components/ResultItem';
import { selectItem } from '../actions';
import ipc from '../ipc';
import { IPC_RESULT_EXECUTE_ITEM } from '../../const/ipc';

const ResultItemContainer = class ResultItemContainer extends Component {
  componentDidMount() {
    ipc.once(IPC_RESULT_EXECUTE_ITEM, ::this.execute);
  }

  componentWillUnmount() {
    ipc.removeAllListeners(IPC_RESULT_EXECUTE_ITEM);
  }

  /**
   * Execute this item
   */
  execute() {
    // execute only if it's a selected item
    if (this.props.selected) {
      ipc.execute(this.props.item);
    }
  }

  render() {
    const { item, selected } = this.props;
    return (
      <ResultItem
        item={item}
        selected={selected}
        onDoubleClick={::this.handleDoubleClick}
        onMouseOver={::this.handleMouseOver}
      />
    );
  }

  handleDoubleClick(e) {
    e.preventDefault();
    // execute this item
    ipc.execute(this.props.item);
  }

  handleMouseOver() {
    this.props.dispatch(selectItem(this.props.id));
  }
};

ResultItemContainer.propTypes = {
  dispatch: PropTypes.func,
  id: PropTypes.number,
  item: PropTypes.object,
  selected: PropTypes.boolean,
};

export default connect()(ResultItemContainer);
