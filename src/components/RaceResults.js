import React from 'react'
import xhr from './../xhr'

class RaceResults extends React.Component {
  constructor(props, context) {
   super(props);
   context.router;
   this.handleRowClick = this.handleRowClick.bind(this);
   this.chipTimeStyle = {
     textAlign:"right",
     padding:"5px 30px 5px 5px",
     display: "none"
   };
  }
  handleRowClick(evt) {
    this.context.router.push('/racer/'+evt);
  }
  shouldComponentUpdate() {
   return false;
  }
  render() {

    let hasChipTime = false;

    let chipStyle = {
      padding:"5px 30px 5px 5px",
      textAlign:"right",
      display: "none"
    }

    const tableStyle ={
      textTransform: "uppercase",
      borderCollapse: "collapse",
      width: "100%",
      fontSize: "14px",
      fontFamily: "monospace"
    }

    if (this.props.results[0] && this.props.results[0].chipTime){
        hasChipTime = true;
        //display the chip time for the row.
        this.chipTimeStyle.display = "block";
        chipStyle.display = "block";
    }

    const results = this.props.results.map((result) =>
      <RacerRow key={result.racerId.toString()} result={result} selectedRacerId={this.props.selectedRacerId} handleClick={this.handleRowClick} chipTimeStyle={this.chipTimeStyle} />
    );

    return <div style={{backgroundColor: "#ffffff", padding: "70px"}}>
      <table style={tableStyle}>
        <thead style={{fontWeight: "bold"}}>
          <tr>
            <th style={{maxWidth:"25px", padding:"5px", textAlign:"right"}}>Place</th>
            <th style={{padding:"5px", textAlign:"right"}}>Bib</th>
            <th style={{padding:"5px 5px 5px 10px", textAlign:"left"}}>Name</th>
            <th style={{padding:"5px 30px 5px 5px", textAlign:"right"}}>Time</th>
            <th style={chipStyle}>Chip</th>
            <th style={{padding:"5px"}}>Cat</th>
            <th style={{padding:"5px"}}>Age</th>
          </tr>
        </thead>
        <tbody>
          {results}
        </tbody>
      </table>

    </div>;
  }
}

RaceResults.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const PositionRowStyle ={
  textAlign:"right",
  padding:"5px"
}

const NameRowStyle ={
  padding:"5px 5px 5px 10px"
}

const TimeRowStyle = {
  textAlign:"right",
  padding:"5px 30px 5px 5px"
}

class RacerRow extends React.Component {
  constructor(props){
    super(props);
    this.click = this.click.bind(this);
    this.selectedRacerCss = {
      backgroundColor: "#2196f3",
      height: 30
    }
  }
  click(e) {
    this.props.handleClick(this.props.result.racerId);
  }
  shouldComponentUpdate() {
   return false;
  }
  render() {
    return <tr key={this.props.result.racerId.toString()} onClick={this.click} style={this.props.selectedRacerId == this.props.result.racerId ? this.selectedRacerCss : null}>
      <td style={PositionRowStyle}>{this.props.result.position}</td>
      <td style={PositionRowStyle}>{this.props.result.bibNumber}</td>
      <td style={NameRowStyle}>{this.props.result.name} {this.props.result.club != undefined ? '(' + this.props.result.club + ')' : '' }</td>
      <td style={TimeRowStyle}>{this.props.result.time}</td>
      <td style={this.props.chipTimeStyle}>{this.props.result.chipTime}</td>
      <td>{this.props.result.sex} ({this.props.result.sexPosition})</td>
      <td>{this.props.result.ageCategory} ({this.props.result.ageCategoryPosition})</td>
    </tr>
 }
}

export default RaceResults;
