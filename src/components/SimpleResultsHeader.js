import React from 'react';

const SimpleResultsHeader = (props) => {
  let chipTimeCell = null;

  if (props.showChipTime) {
    chipTimeCell = <div className={'table_header raceresultsheader__column_chiptime'}>Chip Time</div>
  }

  return (<div className={'table raceresultsheader'}>
    <div className={'theader'}>
      <div className={'table_header raceresultsheader__column_position'}>Place</div>
      <div className={'table_header raceresultsheader__column_bib'}>Bib</div>
      <div className={'table_header raceresultsheader__column_name'}>Name</div>
      <div className={'table_header raceresultsheader__column_time'}>Time</div>
      {chipTimeCell}
      <div className={'table_header raceresultsheader__column_pace'}>Pace</div>
      <div className={'table_header raceresultsheader__column_cat'}>Cat</div>
      <div className={'table_header raceresultsheader__column_age'}>Age</div>
    </div>
  </div>);
};

export default SimpleResultsHeader;
