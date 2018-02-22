import React from 'react';
import { Link } from 'react-router-dom';

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
  shouldComponentUpdate() {
    return false;
  }
  render() {
    let chipCell = null;

    let paceCell = null;

    const rowIsEven = this.props.isEvenNumbered ? 'rrtable__cell--even' : '';
    const rowIsSelected = this.props.selectedRacerId === this.props.result.racerId ? 'rrtable__cell--highlighted' : '';
    const cellClassName = `rrtable__cell ${rowIsEven} ${rowIsSelected}`;

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

    return (<tr className={'rrtable__row'} key={this.props.result.racerId}>
      <td className={cellClassName} style={PositionRowStyle}>{this.props.result.position}</td>
      <td className={cellClassName} style={PositionRowStyle}>{this.props.result.bibNumber}</td>
      <td className={cellClassName} style={NameRowStyle}><Link to={`/racer/${this.props.result.racerId}`}>{this.props.result.name}</Link> {this.props.result.club != undefined ? '(' + this.props.result.club + ')' : '' }</td>
      <td className={cellClassName} style={TimeRowStyle}>{this.props.result.time}</td>
      {paceCell}
      {chipCell}
      <td className={cellClassName}>{this.props.result.sex} ({this.props.result.sexPosition})</td>
      <td className={cellClassName}>{this.props.result.ageCategory} ({this.props.result.ageCategoryPosition})</td>
    </tr>);
 }
}
