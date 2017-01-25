import { EventEmitter } from 'events';
import xhr from './../xhr';

export default class ImportRace extends EventEmitter {
  constructor() {
    super();
    this.url = undefined;
    this.status = undefined;
    this.errorMessage = undefined;
    this.handleProcessSuccessResponse = this.handleProcessSuccessResponse.bind(this);
    this.handleTaskCheckSuccessResponse = this.handleTaskCheckSuccessResponse.bind(this);
  }

  setUrl(url) {
    this.url = url;
    this.status = undefined;
    this.errorMessage = undefined;
  }

  getStatus() {
    return this.status;
  }

  getErrorMessage() {
    return this.errorMessage;
  }

  process() {
    this.status = 'Submitting';
    this.errorMessage = undefined;
    this.emit('change');
    const self = this;
    xhr.post('/import', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        raceUrl: this.url,
      },
    }, this.handleProcessSuccessResponse, 202).catch((xhrResult) => {
      self.status = 'Failed';
      self.errorMessage = `${xhrResult.statusText} : ${xhrResult.responseText}`;
      self.emit('change');
    });
  }

  handleProcessSuccessResponse(xhrResponse) {
    this.taskLocation = xhrResponse.getResponseHeader('Location');
    this.status = 'Processing';
    this.emit('change');
    this.intervalId = setInterval(() => {
      this.checkTask();
    }, 1000);
  }

  handleTaskCheckSuccessResponse(xhrResponse) {
    if (xhrResponse.responseURL === this.taskLocation) {
      this.status = 'Still Processing';
      this.emit('change');
    } else {
      clearInterval(this.intervalId);
      this.status = 'Completed';
      this.emit('change');
    }
  }

  checkTask() {
    xhr.get(this.taskLocation, {}, this.handleTaskCheckSuccessResponse)
      .catch((errMessage) => {
        clearInterval(this.intervalId);
        this.status = 'Failed';
        this.errorMessage = errMessage;
        this.emit('change');
      });
  }
}
