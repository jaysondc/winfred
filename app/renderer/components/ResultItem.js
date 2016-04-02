import React, { PropTypes } from 'react';

const styles = {
  base: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  icon: {
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
  highlighted: {
    backgroundColor: '#ccc',
  },
};

const ResultItem = ({ item }) => (
  <li style={styles.base}>
    <div style={styles.icon}>[ICON]</div>
    <div style={styles.info}>
      <div style={styles.title}>{item.string}</div>
      <div style={styles.subtitle}>This is a test subtitle.</div>
    </div>
  </li>
);

ResultItem.propTypes = {
  item: PropTypes.object,
};

export default ResultItem;
