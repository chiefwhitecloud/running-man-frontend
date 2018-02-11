import React from 'react';
import PropTypes from 'prop-types';

const TabPane = ({ label, children }) => (
  <div>
    {children}
  </div>
);

TabPane.propTypes = {
  label: PropTypes.string.isRequired,
};

export default TabPane;
