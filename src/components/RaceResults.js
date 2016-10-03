import React from 'react'
import xhr from './../xhr'

class RaceResults extends React.Component {
  constructor(props, context) {
   super(props);
   context.router;
  }
  handleRowClick(evt) {
    this.context.router.push('/racer/'+evt);
  }
  render() {

    let rows = [];

    const selectedRacer = {
      backgroundColor: "gray"
    }

    if (this.props.results.length > 0){
      for (const result of this.props.results) {
        rows.push(<tr key={result.racerId} onClick={() => this.handleRowClick(result.racerId)} style={this.props.selectedRacerId == result.racerId ? selectedRacer : null}>
          <td>{result.position}</td>
          <td>{result.bibNumber}</td>
          <td>{result.name}</td>
          <td>{result.time}</td>
          <td>{result.sex}</td>
          <td>{result.sexPosition}</td>
          <td>{result.ageCategory}</td>
          <td>{result.ageCategoryPosition}</td>
        </tr>);
      }
    }

    return <div>
      <table>
        <thead>
            <tr>
              <td>Position</td>
              <td>Bib</td>
              <td>Name</td>
              <td>Time</td>
              <td>Category</td>
              <td>Category Position</td>
              <td>Age Category</td>
              <td>Age Category Position</td>
            </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>

    </div>;
  }
}

RaceResults.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default RaceResults;
