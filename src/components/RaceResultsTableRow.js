import React from 'react';

const PositionRowStyle = {
  textAlign: 'right',
};

const NameRowStyle = {
  textAlign: 'left',
};

const TimeRowStyle = {
  textAlign: 'right',
};

const chipTimeStyle = {
  textAlign: 'right',
};

export default class RaceResultTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.selectedRacerCss = {
      backgroundColor: '#2196f3',
      height: 30,
      ':hover': {
        background: 'red',
      },
    };
  }
  shouldComponentUpdate() {
    return false;
  }
  handleClick(e) {
    e.preventDefault();
    this.props.handleClick(this.props.result.racerId);
  }
  render() {
    let chipCell = null;

    let paceCell = null;

    if (this.props.showChipTime){
      chipCell = <td style={chipTimeStyle}>{this.props.result.chipTime}</td>;
    }

    if (this.props.showPace){
      paceCell = <td style={chipTimeStyle}>{this.props.result.pace}</td>;
    }

    return (<tr key={this.props.result.racerId.toString()} style={this.props.selectedRacerId == this.props.result.racerId ? this.selectedRacerCss : null}>
      <td style={PositionRowStyle}>{this.props.result.position}</td>
      <td style={PositionRowStyle}>{this.props.result.bibNumber}</td>
      <td style={NameRowStyle}><a href="#" onClick={this.handleClick}>{this.props.result.name}</a> {this.props.result.club != undefined ? '(' + this.props.result.club + ')' : '' }</td>
      <td style={TimeRowStyle}>{this.props.result.time}</td>
      {paceCell}
      {chipCell}
      <td>{this.props.result.sex} ({this.props.result.sexPosition})</td>
      <td>{this.props.result.ageCategory} ({this.props.result.ageCategoryPosition})</td>
    </tr>);
 }
}
