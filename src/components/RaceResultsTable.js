import React from 'react';
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
      chipHeader = <th className={'table__header'} style={{textAlign: 'right'}}>Chip</th>;
    }

    if (this.props.results[0] && this.props.results[0].pace) {
      // display the chip time for the row.
      paceHeader = <th className={'table__header'} style={{textAlign: 'right'}}>Pace</th>;
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
      <table className={'table table--fullresults'}>
        <thead style={{ fontWeight: 'bold' }}>
          <tr>
            <th className={'table__header'} style={{ maxWidth: '25px', padding: '5px', textAlign: 'right' }}>Place</th>
            <th className={'table__header'} style={{ textAlign: 'right' }}>Bib</th>
            <th className={'table__header'} style={{ textAlign: 'left' }}>Name</th>
            <th className={'table__header'} style={{ textAlign: 'right' }}>Time</th>
            {paceHeader}
            {chipHeader}
            <th className={'table__header'}>Cat</th>
            <th className={'table__header'}>Age</th>
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
    router: React.PropTypes.object.isRequired
};

export default RaceResultsTable;
