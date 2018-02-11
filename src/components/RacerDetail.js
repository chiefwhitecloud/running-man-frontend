import React from 'react';
import PropTypes from 'prop-types';

const RacerDetail = props => (
  <div>
    <div className={'header header--racer'}>{props.name}</div>
  </div>
);

RacerDetail.propTypes = {
  name: PropTypes.string.isRequired,
};

export default RacerDetail;
