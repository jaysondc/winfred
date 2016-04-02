import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const styles = {
  base: {
    width: '100%',
    height: '100%',
    border: '0px',
    fontSize: '32px',
    fontWeight: 'normal',
    padding: '5px',
    outline: '0px',
    boxSizing: 'border-box',
  },
};

const QueryFieldContainer = class QueryFieldContainer extends Component {
  componentDidMount() {
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
