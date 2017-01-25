import React from 'react'

export default class SelectedFilters extends React.Component {
  constructor(props) {
   super(props);
  }
  render() {
    return <div>{this.props.selectedAgeCategoryKey}</div>;
  }
}
