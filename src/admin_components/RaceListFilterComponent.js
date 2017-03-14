import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedValue: 'all' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ selectedValue: event.target.value });
    this.props.onSelectionChange(event.target.value);
  }

  render() {
    const years = this.props.years.map(year => <option value={`year-${year}`} key={year}>{year}</option>);

    return (
      <select onChange={this.handleChange} value={this.state.selectedValue}>
        <option value="all">All</option>
        <option value="noracegroup">No Race Group Assigned</option>
        {years}
      </select>
    );
  }
}
