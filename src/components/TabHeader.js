import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onSelected(this.props.index);
  }

  render() {
    const active = this.props.isActive ? 'selected' : '';
    const cssClasses = `tab-header ${active}`;

    return (
      <button onClick={this.handleClick} className={cssClasses} >
        {this.props.text}
      </button>
    );
  }
}
