import React from 'react';


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
  isSubmitted: React.PropTypes.bool.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onReset: React.PropTypes.func.isRequired,
  importStatus: React.PropTypes.string,
  errorMessage: React.PropTypes.string,
}
