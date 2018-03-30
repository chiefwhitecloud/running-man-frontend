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
      pace={result.pace}
      chipTime={result.chipTime}
      sex={result.sex}
      sexPosition={result.sexPosition}
      ageCategory={result.ageCategory}
      ageCategoryPosition={result.ageCategoryPosition}
    />);

  const resultsStyle = {
    position: 'absolute',
    top: props.heightOffset,
    left: 0,
    right: 0,
    width: '100%',
  };

  return (<div style={{ height: props.totalHeight, position: 'relative' }}>
    <div className={'table raceresultstable'} style={resultsStyle}>
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
