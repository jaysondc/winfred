import React, { PropTypes } from 'react';
import ResultItemContainer from '../containers/ResultItemContainer';
import { Result } from '../../models';

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
  let itemsHtml = '';
  if (results.length) {
    itemsHtml = results.map((item, key) => <ResultItemContainer key={key} item={item} />);
  }
  return (
    <ol style={styles.base}>
      {itemsHtml}
    </ol>
  );
};

ResultsList.propTypes = {
  results: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.instanceOf(Result)),
    PropTypes.array,
  ]),
};

export default ResultsList;
