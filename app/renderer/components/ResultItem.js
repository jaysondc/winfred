import React, { Component, PropTypes } from 'react';

const styles = {
  base: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginBottom: '10px',
    paddingLeft: '15px',
    paddingRight: '15px',
  },
  icon: {
    width: '40px',
    height: '40px',
    marginRight: '15px',
  },
  info: {
    color: '#000',
  },
  title: {
    color: '#000',
    fontSize: '24px',
    lineHeight: '35px',
  },
  subtitle: {
    lineHeight: '20px',
    fontSize: '18px',
    color: '#888',
  },
  active: {
    backgroundColor: '#efefef',
  },
};

const ResultItem = class ResultItem extends Component {
  componentWillMount() {
    this.setState({ isActive: false });
  }

  render() {
    const { item, onDoubleClick } = this.props;
    let itemStyle = styles.base;
    if (this.state.isActive) {
      itemStyle = Object.assign({}, styles.base, styles.active);
    }
    return (
      <li style={itemStyle}
        onDoubleClick={onDoubleClick}
        onMouseOver={::this.handleMouseOver}
        onMouseOut={::this.handleMouseOut}
      >
        <div style={styles.icon}><img src={item.icon} style={styles.icon} /></div>
        <div style={styles.info}>
          <div style={styles.title}>{item.title}</div>
          <div style={styles.subtitle}>{item.subtitle}</div>
        </div>
      </li>
    );
  }

  handleMouseOver() {
    this.setState({ isActive: true });
  }

  handleMouseOut() {
    this.setState({ isActive: false });
  }
};

ResultItem.propTypes = {
  item: PropTypes.object,
  onDoubleClick: PropTypes.func,
};

export default ResultItem;
