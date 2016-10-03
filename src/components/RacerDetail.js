import React from 'react';

const RacerDetail = (props) => (
  <div>
    <div>{props.name}</div>
  </div>
);

RacerDetail.propTypes = {
  name: React.PropTypes.string.isRequired
};

export default RacerDetail;
