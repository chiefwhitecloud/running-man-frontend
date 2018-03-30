import React from 'react';
import { Link } from 'react-router-dom';
import { RaceResultPropType } from '../types/RaceResult';

const SimpleResultRow = (props) => {
  let chipTimeCell = null;

  if (props.chipTime) {
    chipTimeCell = (<div className={'table_small raceresultstable__column_chiptime'}>
      <div className={'table_cell'}>Chip Time</div>
      <div className={'table_cell raceresultstable__value'}>{props.chipTime}</div>
    </div>);
  }

  return (<div className={'table_row raceresultstable__row'}>
    <div className={'table_small raceresultstable__column_position'}>
      <div className={'table_cell'}>Position</div>
      <div className={'table_cell raceresultstable__value raceresultstable__value_position'}>{props.position}</div>
    </div>
    <div className={'table_small raceresultstable__column_bib'}>
      <div className={'table_cell'}>Bib</div>
      <div className={'table_cell raceresultstable__value raceresultstable__value_bib'}>{props.bibNumber}</div>
    </div>
    <div className={'table_small raceresultstable__column_name'}>
      <div className={'table_cell'}>Name</div>
      <div className={'table_cell raceresultstable__value raceresultstable__value_name'}><Link to={`/racer/${props.racerId}`}>{props.name}</Link></div>
    </div>
    <div className={'table_small raceresultstable__column_time'}>
      <div className={'table_cell'}>Time</div>
      <div className={'table_cell raceresultstable__value'}>{props.time}</div>
    </div>
    {chipTimeCell}
    <div className={'table_small raceresultstable__column_pace'}>
      <div className={'table_cell'}>Pace</div>
      <div className={'table_cell raceresultstable__value'}>{props.pace}</div>
    </div>
    <div className={'table_small raceresultstable__column_cat'}>
      <div className={'table_cell'}>Category</div>
      <div className={'table_cell raceresultstable__value'}>{props.sex} ({props.sexPosition})</div>
    </div>
    <div className={'table_small raceresultstable__column_age'}>
      <div className={'table_cell'}>Age</div>
      <div className={'table_cell raceresultstable__value'}>{props.ageCategory} ({props.ageCategoryPosition})</div>
    </div>
  </div>);
};

SimpleResultRow.propTypes = RaceResultPropType;

export default SimpleResultRow;
