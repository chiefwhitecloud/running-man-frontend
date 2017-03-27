import React from 'react';

export default class ImportRaceForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      url: '',
      error: false,
    };
  }

  handleInputChange(event) {
    this.setState({
      url: event.target.value,
      error: false,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const urls = this.state.url;

    if (urls.length === 0) {
      this.setState({
        error: true,
      });
      return;
    }

    const urlsArray = urls.split('\n');
    this.props.onSubmit(urlsArray);
  }

  render() {
    return (<form onSubmit={this.handleSubmit}>
      <div>
        <label htmlFor="import_urls">Enter Race Results Urls:</label>
      </div>
      <textarea
        id="import_urls"
        rows="10"
        cols="100"
        value={this.state.url}
        onChange={this.handleInputChange}
      />
      <div>
        <input type="submit" value="Import" />
      </div>
    </form>);
  }
}
