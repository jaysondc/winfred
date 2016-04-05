import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ipc from '../ipc';
import { IPC_SEARCH_FOCUS_FIELD } from '../../const/ipc';

const styles = {
  base: {
    width: '100%',
    height: '100%',
    border: '0px',
    fontSize: '35px',
    lineHeight: '35px',
    fontWeight: 'normal',
    outline: '0px',
    padding: '15px',
    boxSizing: 'border-box',
  },
};

const QueryFieldContainer = class QueryFieldContainer extends Component {
  componentDidMount() {
    // register ipc event
    ipc.on(IPC_SEARCH_FOCUS_FIELD, () => {
      this.q.focus();
    });
    if (this.q !== null) {
      this.q.focus();
    }
  }

  render() {
    const { onChange } = this.props;
    return (
      <input
        ref={ref => {this.q = ref;}}
        style={styles.base}
        type="text"
        value={this.props.q}
        placeholder="Type something..."
        onChange={onChange}
      />
    );
  }
};

QueryFieldContainer.propTypes = {
  q: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ q: state.q });

export default connect(mapStateToProps)(QueryFieldContainer);
