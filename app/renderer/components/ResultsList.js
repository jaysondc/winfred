import React, { PropTypes } from 'react';
import ResultItemContainer from '../containers/ResultItemContainer';

const styles = {
  base: {
    margin: '0px',
    height: '500px',
    paddingLeft: '15px',
    paddingRight: '15px',
    listStyleType: 'none',
    fontFamily: 'Helvetica, Arial, sans-serif',
    overflowX: 'hidden',
    overflowY: 'scroll',
    boxSizing: 'border-box',
  },
};

const ResultsList = ({ results, selectedIndex }) => {
  let itemsHtml = '';
  if (results.length) {
    itemsHtml = results.map((item, key) => {
      const selected = key === selectedIndex;
      return <ResultItemContainer key={key} id={key} item={item} selected={selected} />;
    });
  }
  return (
    <ol style={styles.base}>
      {itemsHtml}
    </ol>
  );
};

ResultsList.propTypes = {
  results: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.array,
  ]),
  selectedIndex: PropTypes.number,
};

export default ResultsList;
