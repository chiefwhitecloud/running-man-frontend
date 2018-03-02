import React from 'react';

const SimpleResultsHeader = (props) => {
  let chipTimeCell = null;

  if (props.showChipTime) {
    chipTimeCell = <div className={'table_header'}>Chip Time</div>
  }

  return (<div className={'table'}>
    <div className={'theader'}>
      <div className={'table_header'}>Place</div>
      <div className={'table_header'}>Bib</div>
      <div className={'table_header'}>Name</div>
      <div className={'table_header'}>Time</div>
      {chipTimeCell}
      <div className={'table_header'}>Pace</div>
      <div className={'table_header'}>Cat</div>
      <div className={'table_header'}>Age</div>
    </div>
  </div>);
};

export default SimpleResultsHeader;
