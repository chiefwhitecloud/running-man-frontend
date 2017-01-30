import React from 'react';

const ImportRaceListItem = ({ url, status }) => (
  <div>
    {url} : {status}
  </div>
);

ImportRaceListItem.propTypes = {
  url: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
};

export default ImportRaceListItem;
