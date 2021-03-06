import React from 'react';
import PropTypes from 'prop-types';

import RaceResultsTableRow from './RaceResultsTableRow';

class RaceResultsTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let chipHeader = null;
    let paceHeader = null;

    if (this.props.results[0] && this.props.results[0].chipTime) {
      // display the chip time for the row.
      chipHeader = <th className={'rrtable__header'} style={{textAlign: 'right'}}>Chip</th>;
    }

    if (this.props.results[0] && this.props.results[0].pace) {
      // display the chip time for the row.
      paceHeader = <th className={'rrtable__header'} style={{textAlign: 'right'}}>Pace</th>;
    }

    const results = this.props.results.map((result, index) =>
      <RaceResultsTableRow
        key={result.racerId.toString()}
        result={result}
        selectedRacerId={this.props.selectedRacerId}
        showChipTime={chipHeader != null}
        showPace={paceHeader != null}
        isEvenNumbered={index % 2 === 0}
      />
    );

    return (<div>
      <table className={'rrtable rrtable--fullresults'}>
        <thead style={{ fontWeight: 'bold' }}>
          <tr>
            <th className={'rrtable__header'} style={{ maxWidth: '25px', padding: '5px', textAlign: 'right' }}>Place</th>
            <th className={'rrtable__header'} style={{ textAlign: 'right' }}>Bib</th>
            <th className={'rrtable__header'} style={{ textAlign: 'left' }}>Name</th>
            <th className={'rrtable__header'} style={{ textAlign: 'right' }}>Time</th>
            {paceHeader}
            {chipHeader}
            <th className={'rrtable__header'}>Cat</th>
            <th className={'rrtable__header'}>Age</th>
          </tr>
        </thead>
        <tbody>
          {results}
        </tbody>
      </table>
    </div>);
  }
}

RaceResultsTable.contextTypes = {
    router: PropTypes.object.isRequired
};

export default RaceResultsTable;
