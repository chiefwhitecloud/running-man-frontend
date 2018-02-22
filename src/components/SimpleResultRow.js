import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class SimpleResultRow extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (<div className={'table_row'}>
      <div className={'table_small'}>
        <div className={'table_cell'}>Position</div>
        <div className={'table_cell'}>{this.props.position}</div>
      </div>
      <div className={'table_small'}>
        <div className={'table_cell'}>Bib</div>
        <div className={'table_cell'}>{this.props.bibNumber}</div>
      </div>
      <div className={'table_small'}>
        <div className={'table_cell'}>Name</div>
        <div className={'table_cell'}><Link to={`/racer/${this.props.racerId}`}>{this.props.name}</Link></div>
      </div>
      <div className={'table_small'}>
        <div className={'table_cell'}>Time</div>
        <div className={'table_cell'}>{this.props.time}</div>
      </div>
      <div className={'table_small'}>
        <div className={'table_cell'}>Category</div>
        <div className={'table_cell'}>{this.props.sex} ({this.props.sexPosition})</div>
      </div>
      <div className={'table_small'}>
        <div className={'table_cell'}>Age</div>
        <div className={'table_cell'}>{this.props.ageCategory} ({this.props.ageCategoryPosition})</div>
      </div>
    </div>);
  }
}

SimpleResultRow.propTypes = {
  bibNumber: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  racerId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};
