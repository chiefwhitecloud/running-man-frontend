import React from 'react';

const TabPane = ({ label, children }) => (
  <div>
    {children}
  </div>
);

TabPane.propTypes = {
  label: React.PropTypes.array.isRequired,
};

export default TabPane;
