import React from 'react';

export default class ImportRaceComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      url: '',
    };
  }

  handleInputChange(event) {
    this.setState({
      url: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.url);
  }

  handleReset(event) {
    event.preventDefault();
    // reset the component state.
    this.setState({
      url: '',
    });
    this.props.onReset();
  }

  render() {
    let display;

    const form = (<form onSubmit={this.handleSubmit}>
      <label>
        Url:
        <input value={this.state.url} type="text" name="url" onChange={this.handleInputChange} />
      </label>
      <input type="submit" value="Import" />
    </form>);

    if (!this.props.isSubmitted) {
      display = form;
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
