import React from 'react';
import PropTypes from 'prop-types';

export default class ImportRaceComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(urls) {
    this.props.onSubmit(urls);
  }

  handleReset(event) {
    event.preventDefault();
    this.props.onReset();
  }

  render() {
    let display;

    if (!this.props.isSubmitted) {
      display = <ImportRaceForm onSubmit={this.handleSubmit} />;
    } else if (this.props.importStatus === 'Failed') {
      display = (<div>{this.props.importStatus} {this.props.errorMessage}
        <button onClick={this.handleReset}>Submit Another</button>
      </div>);
    } else {
      display = <div>{this.props.importStatus} {this.props.errorMessage}</div>;
    }
    return display;
  }
}


ImportRaceComponent.propTypes = {
  isSubmitted: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  importStatus: PropTypes.string,
  errorMessage: PropTypes.string,
}
