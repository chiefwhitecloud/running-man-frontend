import React from 'react';

export default class ExpandButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isExpanded: false,
    };
  }

  handleClick(event) {
    event.preventDefault();
    this.props.handleClick(this.props.raceId);
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }

  render() {
    const modCss = this.state.isExpanded ? 'round-button--expanded' : 'round-button--collapsed';
    const buttonClassName = `round-button ${modCss}`;

    return (
      <button className={buttonClassName} onClick={this.handleClick} />
    );
  }
}
