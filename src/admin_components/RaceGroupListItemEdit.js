import React from 'react';
import PropTypes from 'prop-types';

export default class RaceGroupListItemEdit extends React.Component {
  constructor(props) {
    super(props);

    let distanceUnit = this.props.raceGroup.distanceUnit;
    if (distanceUnit === '') {
      distanceUnit = 'k';
    }

    this.state = {
      name: this.props.raceGroup.name,
      distance: this.props.raceGroup.distance,
      distanceUnit,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.handleDistanceUnitsChange = this.handleDistanceUnitsChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleDistanceChange(event) {
    this.setState({ distance: event.target.value });
  }

  handleDistanceUnitsChange(event) {
    this.setState({ distanceUnit: event.target.value });
  }

  handleSave(event) {
    event.preventDefault();
    this.props.onUpdateRaceGroup(this.props.raceGroup.self, this.state.name,
      this.state.distance, this.state.distanceUnit);
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.onCancelEdit(this.props.raceGroup.self);
  }

  render() {
    return (<tr>
      <td>
        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
      </td>
      <td>
        <input type="text" value={this.state.distance} onChange={this.handleDistanceChange} />
      </td>
      <td>
        <select value={this.state.distanceUnit} onChange={this.handleDistanceUnitsChange} >
          <option key="km" value="k">km</option>
          <option key="mile" value="m">miles</option>
        </select>
      </td>
      <td>
        <button onClick={this.handleSave}>Save</button>
      </td>
      <td>
        <button onClick={this.handleCancel}>Cancel</button>
      </td>
    </tr>);
  }
}

RaceGroupListItemEdit.propTypes = {
  raceGroup: PropTypes.shape({
    self: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    distance: PropTypes.string.isRequired,
    distanceUnit: PropTypes.string.isRequired,
  }).isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  onUpdateRaceGroup: PropTypes.func.isRequired,
};
