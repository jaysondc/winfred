import React, { PropTypes } from 'react';
import ResultItem from './ResultItem';

const styles = {
  base: {
    marginLeft: '0px',
    paddingLeft: '15px',
    paddingRight: '15px',
    listStyleType: 'none',
    fontFamily: 'Helvetica, Arial, sans-serif',
  },
};

const ResultsList = ({ results }) => {
  const itemsHtml = results.map(item => <ResultItem item={item} />);
  return (
    <ol style={styles.base}>
      {itemsHtml}
    </ol>
  );
};

ResultsList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
};

export default ResultsList;
