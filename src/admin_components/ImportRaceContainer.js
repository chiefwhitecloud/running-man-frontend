import React from 'react';
import { ImportRace, Status } from './ImportRace';
import ImportRaceListItem from './ImportRaceListItem';
import ImportRaceForm from './ImportRaceForm';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.raceImporter = new ImportRace();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleRaceImporterChange = this.handleRaceImporterChange.bind(this);
    this.state = {
      importJobs: new Map(),
      importJobsCompleted: false,
    };
  }

  componentDidMount() {
    this.raceImporter.on('change', this.handleRaceImporterChange);
  }

  componentWillUnmount() {
    this.raceImporter.removeListener('change', this.handleRaceImporterChange);
  }

  handleSubmit(urls) {
    const jobs = new Map();
    urls.forEach(url => jobs.set(url, { isCurrent: false, status: 'pending' }));
    this.setState({
      importJobs: jobs,
    });
    setTimeout(() => this.startNextImportJob(), 0);
  }

  startNextImportJob() {
    const arr = [...this.state.importJobs];
    const nextItem = arr.find(el => !el[1].isCurrent && el[1].status === 'pending');
    if (nextItem === undefined) {
      // jobs are completed!
      this.setState({
        importJobsCompleted: true,
      });
    } else {
      nextItem[1].isCurrent = true;
      this.setState({
        importJobs: new Map(arr),
      });
      this.raceImporter.setUrl(nextItem[0]);
      setTimeout(() => this.raceImporter.process(), 0);
    }
  }

  handleRaceImporterChange() {
    // update the current job
    const arr = [...this.state.importJobs];
    const currentJob = arr.find(el => el[1].isCurrent);

    if (this.raceImporter.getStatus() === Status.FAILED
      || this.raceImporter.getStatus() === Status.COMPLETED) {
      // set this job as done and start the next one
      if (this.raceImporter.getStatus() === Status.FAILED) {
        currentJob[1].status = 'failed';
      } else {
        currentJob[1].status = 'completed';
      }
      currentJob[1].isCurrent = false;
      this.setState({
        importJobs: new Map(arr),
      });
      setTimeout(() => this.startNextImportJob(), 0);
    } else if (this.raceImporter.getStatus() === Status.PROCESSING) {
      if (currentJob[1].status !== 'processing') {
        currentJob[1].status = 'processing';
        this.setState({
          importJobs: new Map(arr),
        });
      }
    }
  }

  handleReset() {
    this.setState({
      importJobs: new Map(),
      importJobsCompleted: false,
    });
  }

  render() {
    let display;
    if (this.state.importJobs.size === 0) {
      display = <ImportRaceForm onSubmit={this.handleSubmit} />;
    } else {
      let resetButton;
      let completedMessage;
      if (this.state.importJobsCompleted) {
        resetButton = <div><button type="button" onClick={this.handleReset}>Reset</button></div>;
        completedMessage = <div>Import Completed!</div>;
      }

      const jobs = [];
      const arr = [...this.state.importJobs];
      arr.forEach(item => jobs.push(<ImportRaceListItem
        key={item[0]}
        url={item[0]}
        status={item[1].status}
      />));

      display = (<div>
        <h3>Importing...</h3>
        <div>{jobs}</div>
        {completedMessage}
        {resetButton}
      </div>);
    }

    return display;
  }
}
