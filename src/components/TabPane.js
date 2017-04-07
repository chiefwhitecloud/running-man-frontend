import React from 'react';

const TabPane = ({ label, children }) => (
  <div>
    {children}
  </div>
);

TabPane.propTypes = {
  label: React.PropTypes.string.isRequired,
};

export default TabPane;
