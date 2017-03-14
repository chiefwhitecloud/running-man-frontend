import React from 'react';
import RaceResultsTableRow from './RaceResultsTableRow';

class RaceResultsTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleRowClick = this.handleRowClick.bind(this);
  }
  handleRowClick(evt) {
    this.context.router.push('/racer/'+evt);
  }
  render() {
    let chipHeader = null;

    if (this.props.results[0] && this.props.results[0].chipTime) {
      // display the chip time for the row.
      chipHeader = <th style={{textAlign: 'right'}}>Chip</th>;
    }

    const results = this.props.results.map(result =>
      <RaceResultsTableRow
        key={result.racerId.toString()}
        result={result} selectedRacerId={this.props.selectedRacerId}
        handleClick={this.handleRowClick} showChipTime={chipHeader != null}
      />
    );

    return (<div>
      <table>
        <thead style={{ fontWeight: 'bold' }}>
          <tr>
            <th style={{ maxWidth: '25px', padding: '5px', textAlign: 'right' }}>Place</th>
            <th style={{ textAlign: 'right' }}>Bib</th>
            <th style={{ textAlign: 'left' }}>Name</th>
            <th style={{ textAlign: 'right' }}>Time</th>
            {chipHeader}
            <th>Cat</th>
            <th>Age</th>
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
