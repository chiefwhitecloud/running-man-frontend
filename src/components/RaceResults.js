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

    let headers =[];

    let hasChipTime = false;

    const selectedRacer = {
      backgroundColor: "#2196f3",
      height: 30
    }

    const RacerRow = (props) => {
      return <tr key={props.result.racerId} onClick={() => this.handleRowClick(props.result.racerId)} style={props.selectedRacerId == props.result.racerId ? selectedRacer : null}>
        {props.children}
      </tr>
    }

    if (this.props.results.length > 0){
      for (const result of this.props.results) {
        if (result.chipTime != undefined){
          hasChipTime = true;
          rows.push(<RacerRow result={result} selectedRacerId={this.props.selectedRacerId}>
            <td style={{textAlign:"right", padding:"5px"}}>{result.position}</td>
            <td style={{textAlign:"right", padding:"5px"}}>{result.bibNumber}</td>
            <td style={{padding:"5px 5px 5px 10px"}}>{result.name} {result.club != undefined ? '(' + result.club + ')' : '' }</td>
            <td style={{textAlign:"right", padding:"5px 30px 5px 5px"}}>{result.time}</td>
            <td style={{textAlign:"right", padding:"5px 30px 5px 5px"}}>{result.chipTime}</td>
            <td>{result.sex} ({result.sexPosition})</td>
            <td>{result.ageCategory} ({result.ageCategoryPosition})</td>
          </RacerRow>);
        }else{
          rows.push(<RacerRow result={result} selectedRacerId={this.props.selectedRacerId}>
            <td style={{textAlign:"right", padding:"5px"}}>{result.position}</td>
            <td style={{textAlign:"right", padding:"5px"}}>{result.bibNumber}</td>
            <td style={{padding:"5px 5px 5px 10px"}}>{result.name} {result.club != undefined ? '(' + result.club + ')' : '' }</td>
            <td style={{textAlign:"right", padding:"5px 30px 5px 5px"}}>{result.time}</td>
            <td>{result.sex} ({result.sexPosition})</td>
            <td>{result.ageCategory} ({result.ageCategoryPosition})</td>
          </RacerRow>);
        }
      }

      headers.push(<th style={{maxWidth:"25px", padding:"5px", textAlign:"right"}}>Place</th>);
      headers.push(<th style={{padding:"5px", textAlign:"right"}}>Bib</th>);
      headers.push(<th style={{padding:"5px 5px 5px 10px", textAlign:"left"}}>Name</th>);
      headers.push(<th style={{padding:"5px 30px 5px 5px", textAlign:"right"}}>Time</th>);
      if (hasChipTime){
        headers.push(<th style={{padding:"5px 30px 5px 5px", textAlign:"right"}}>Chip</th>);
      }
      headers.push(<th style={{padding:"5px"}}>Cat</th>);
      headers.push(<th style={{padding:"5px"}}>Age</th>);
    }

    var tableStyle ={
      textTransform: "uppercase",
      borderCollapse: "collapse",
      width: "100%",
      fontSize: "14px",
      fontFamily: "monospace"
    }

    return <div style={{backgroundColor: "#ffffff", padding: "70px"}}>
      <table style={tableStyle}>
        <thead style={{fontWeight: "bold"}}>
          <tr>
            {headers}
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
