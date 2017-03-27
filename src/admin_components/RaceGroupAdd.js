import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      distance: '',
      distanceUnit: 'k',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.handleDistanceUnitsChange = this.handleDistanceUnitsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    this.props.addRaceGroup(this.state.name, this.state.distance, this.state.distanceUnit);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Race Group Name:
          <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        </label>
        <label>
          Distance:
          <input type="text" value={this.state.distance} onChange={this.handleDistanceChange} />
        </label>
        <label>
          Units:
          <select value={this.state.distanceUnit} onChange={this.handleDistanceUnitsChange} >
            <option key="km" value="k">km</option>
            <option key="mile" value="m">miles</option>
          </select>
        </label>
        <input type="submit" value="Add" />
      </form>
    );
  }
}
