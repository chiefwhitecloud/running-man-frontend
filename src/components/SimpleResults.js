import React from 'react';
import PropTypes from 'prop-types';
import { RaceResultPropType } from '../types/RaceResult';
import SimpleResultRow from './SimpleResultRow';

const SimpleResults = (props) => {
  const results = props.results.map(result =>
    <SimpleResultRow
      key={result.racerId}
      racerId={result.racerId}
      name={result.name}
      position={result.position}
      bibNumber={result.bibNumber}
      time={result.time}
      sex={result.sex}
      sexPosition={result.sexPosition}
      ageCategory={result.ageCategory}
      ageCategoryPosition={result.ageCategoryPosition}
    />);

  return (<div style={{ height: props.totalHeight, position: 'relative' }}>
    <div className={'table'} style={{ position: 'absolute', top: props.heightOffset }}>
      {results}
    </div>
  </div>);
};

SimpleResults.propTypes = {
  heightOffset: PropTypes.number.isRequired,
  totalHeight: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(RaceResultPropType).isRequired,
};

export default SimpleResults;
