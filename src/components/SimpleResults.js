import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SimpleResultRow from './SimpleResultRow';

export default class SimpleResults extends Component {
  render() {
    const results = this.props.results.map(result =>
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

    return (<div style={{ height: this.props.totalHeight, position: 'relative' }}>
      <div className={'table'} style={{ position: 'absolute', top: this.props.heightOffset }}>
        {results}
      </div>
    </div>);
  }
}

SimpleResults.propTypes = {
  heightOffset: PropTypes.number.isRequired,
  totalHeight: PropTypes.number.isRequired,
  results: PropTypes.array.isRequired,
};
