import React from 'react';
import PropTypes from 'prop-types';

const ImportRaceListItem = ({ url, status }) => (
  <div>
    {url} : {status}
  </div>
);

ImportRaceListItem.propTypes = {
  url: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default ImportRaceListItem;
