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
      backgroundColor: "#2196f3",
      height: 30
    }

    if (this.props.results.length > 0){
      for (const result of this.props.results) {
        rows.push(<tr key={result.racerId} onClick={() => this.handleRowClick(result.racerId)} style={this.props.selectedRacerId == result.racerId ? selectedRacer : null}>
          <td style={{textAlign:"right", padding:"5px"}}>{result.position}</td>
          <td style={{textAlign:"right", padding:"5px"}}>{result.bibNumber}</td>
          <td style={{padding:"5px 5px 5px 10px"}}>{result.name}</td>
          <td style={{textAlign:"right", padding:"5px 30px 5px 5px"}}>{result.time}</td>
          <td>{result.sex} ({result.sexPosition})</td>
          <td>{result.ageCategory} ({result.ageCategoryPosition})</td>
        </tr>);
      }
    }

    var tableStyle ={
      textTransform: "uppercase",
      borderCollapse: "collapse",
      width: "100%",
      fontSize: "14px",
      fontFamily: "monospace"
    }

    return <div style={{backgroundColor: "#ffffff", padding: "70px", marginTop: "20px"}}>
      <table style={tableStyle}>
        <thead style={{fontWeight: "bold"}}>
            <tr>
              <th style={{maxWidth:"25px", padding:"5px", textAlign:"right"}}>Place</th>
              <th style={{padding:"5px", textAlign:"right"}}>Bib</th>
              <th style={{padding:"5px 5px 5px 10px", textAlign:"left"}}>Name</th>
              <th style={{padding:"5px 30px 5px 5px", textAlign:"right"}}>Time</th>
              <th style={{padding:"5px"}}>Cat</th>
              <th style={{padding:"5px"}}>Age</th>
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
