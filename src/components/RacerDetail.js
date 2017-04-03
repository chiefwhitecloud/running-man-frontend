import React from 'react';

const RacerDetail = props => (
  <div>
    <div className={'header header--racer'}>{props.name}</div>
  </div>
);

RacerDetail.propTypes = {
  name: React.PropTypes.string.isRequired,
};

export default RacerDetail;
