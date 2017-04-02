import Radium from 'radium';
import React from 'react';

class ExpandButton extends React.Component {
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
    const styles = {
      base: {
        cursor: 'pointer',
        backgroundColor: 'black',
        border: 0,
        borderRadius: 4,
        width: '20px',
        height: '20px',
        color: 'white',
        fontSize: '12px',
        padding: '0.5em',
        ':hover': {
          backgroundColor: 'red',
        },
      },
    };

    if (this.state.isExpanded) {
      styles.base.fontSize = '12px';
      styles.base.padding = '0px';
    }

    return (
      <button style={styles.base} onClick={this.handleClick}>
        { this.state.isExpanded ? String.fromCharCode(9660) : String.fromCharCode(9664) }
      </button>
    );
  }
}

export default Radium(ExpandButton);
