import React from 'react';
import ImportRace from './ImportRace';
import ImportRaceComponent from './ImportRaceComponent';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.raceImporter = new ImportRace();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleRaceImporterChange = this.handleRaceImporterChange.bind(this);
    this.state = {
      importStatus: undefined,
      importErrorText: undefined,
    };
  }

  componentDidMount() {
    this.raceImporter.on('change', this.handleRaceImporterChange);
  }

  componentWillUnmount() {
    this.raceImporter.off('change', this.handleRaceImporterChange);
  }

  handleRaceImporterChange() {
    this.setState({
      importStatus: this.raceImporter.getStatus(),
      errorMessage: this.raceImporter.getErrorMessage(),
    });
  }

  handleSubmit(url) {
    this.raceImporter.setUrl(url);
    this.raceImporter.process();
  }

  handleReset() {
    this.setState({
      importStatus: undefined,
      errorMessage: undefined,
    });
  }

  render() {
    return (
      <ImportRaceComponent
        isSubmitted={this.state.importStatus !== undefined}
        onSubmit={this.handleSubmit}
        onReset={this.handleReset}
        importStatus={this.state.importStatus}
        errorMessage={this.state.errorMessage}
      />
    );
  }
}
