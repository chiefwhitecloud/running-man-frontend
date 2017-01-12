import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleRaceGroupChange = this.handleRaceGroupChange.bind(this);
  }

  handleRaceGroupChange(event) {
    event.preventDefault();
    this.props.onRaceGroupSelectionChange(event.target.value, this.props.race.id);
  }
  render() {

    let selectedValue = undefined;
    if (this.props.race.raceGroup){
      selectedValue = this.props.race.raceGroup;
    }
    return (
      <tr>
        <td>{this.props.race.date}</td>
        <td>{this.props.race.name}</td>
        <td>
          <form>
            <label>
              <select onChange={this.handleRaceGroupChange} value={selectedValue}>
                <option key="notfound" ></option>
                {this.props.raceGroups.map(function(raceGroup){
                  return <option value={raceGroup.self} key={raceGroup.id} >{raceGroup["name"]} - {raceGroup["distance"]}</option>
                })}
              </select>
            </label>
          </form>
        </td>
      </tr>
    );
  }
}
