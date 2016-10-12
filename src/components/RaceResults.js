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

    var tableStyle ={
      textTransform: "uppercase",
      borderSpacing: "0px",
      width: "100%",
      fontSize: "16px",
    }

    return <div style={{backgroundColor: "#ffffff", borderRadius: "16px", padding: "10px", marginTop: "20px", boxShadow: "4px 4px 20px -4px rgba(0,0,0,0.75)"}}>
      <table style={tableStyle}>
        <thead style={{fontWeight: "bold"}}>
            <tr>
              <td>Place</td>
              <td>Bib</td>
              <td>Name</td>
              <td>Time</td>
              <td>Cat</td>
              <td>Cat Place</td>
              <td>Age</td>
              <td>Age Place</td>
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
