import React from 'react';
import { Link } from 'react-router-dom';
import { RaceResultPropType } from '../types/RaceResult';

const SimpleResultRow = props => (
  <div className={'table_row'}>
    <div className={'table_small'}>
      <div className={'table_cell'}>Position</div>
      <div className={'table_cell'}>{props.position}</div>
    </div>
    <div className={'table_small'}>
      <div className={'table_cell'}>Bib</div>
      <div className={'table_cell'}>{props.bibNumber}</div>
    </div>
    <div className={'table_small'}>
      <div className={'table_cell'}>Name</div>
      <div className={'table_cell'}><Link to={`/racer/${props.racerId}`}>{props.name}</Link></div>
    </div>
    <div className={'table_small'}>
      <div className={'table_cell'}>Time</div>
      <div className={'table_cell'}>{props.time}</div>
    </div>
    <div className={'table_small'}>
      <div className={'table_cell'}>Category</div>
      <div className={'table_cell'}>{props.sex} ({props.sexPosition})</div>
    </div>
    <div className={'table_small'}>
      <div className={'table_cell'}>Age</div>
      <div className={'table_cell'}>{props.ageCategory} ({props.ageCategoryPosition})</div>
    </div>
  </div>
);

SimpleResultRow.propTypes = RaceResultPropType;

export default SimpleResultRow;
