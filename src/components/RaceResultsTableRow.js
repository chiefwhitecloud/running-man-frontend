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

    const rowIsEven = this.props.isEvenNumbered ? 'table__cell--even' : '';
    const rowIsSelected = this.props.selectedRacerId === this.props.result.racerId ? 'table__cell--highlighted' : '';
    const cellClassName = `table table__cell ${rowIsEven} ${rowIsSelected}`;

    if (this.props.showChipTime) {
      chipCell = (
        <td className={cellClassName} style={chipTimeStyle}>
          {this.props.result.chipTime}
        </td>
      );
    }

    if (this.props.showPace) {
      paceCell = (
        <td className={cellClassName} style={chipTimeStyle}>
          {this.props.result.pace}
        </td>
      );
    }

    return (<tr className={'table table__row'} key={this.props.result.racerId}>
      <td className={cellClassName} style={PositionRowStyle}>{this.props.result.position}</td>
      <td className={cellClassName} style={PositionRowStyle}>{this.props.result.bibNumber}</td>
      <td className={cellClassName} style={NameRowStyle}><a href="#" onClick={this.handleClick}>{this.props.result.name}</a> {this.props.result.club != undefined ? '(' + this.props.result.club + ')' : '' }</td>
      <td className={cellClassName} style={TimeRowStyle}>{this.props.result.time}</td>
      {paceCell}
      {chipCell}
      <td className={cellClassName}>{this.props.result.sex} ({this.props.result.sexPosition})</td>
      <td className={cellClassName}>{this.props.result.ageCategory} ({this.props.result.ageCategoryPosition})</td>
    </tr>);
 }
}
