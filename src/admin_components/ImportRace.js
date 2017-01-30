import { EventEmitter } from 'events';
import xhr from './../xhr';

export const Status = {
  PROCESSING: Symbol('PROCESSING'),
  FAILED: Symbol('FAILED'),
  COMPLETED: Symbol('COMPLETED'),
};

export class ImportRace extends EventEmitter {
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
    this.status = Status.PROCESSING;
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
      self.status = Status.FAILED;
      self.errorMessage = `${xhrResult.statusText} : ${xhrResult.responseText}`;
      self.emit('change');
    });
  }

  handleProcessSuccessResponse(xhrResponse) {
    this.taskLocation = xhrResponse.getResponseHeader('Location');
    this.status = Status.PROCESSING;
    this.emit('change');
    this.intervalId = setInterval(() => {
      this.checkTask();
    }, 1000);
  }

  handleTaskCheckSuccessResponse(xhrResponse) {
    if (xhrResponse.responseURL === this.taskLocation) {
      this.status = Status.PROCESSING;
      this.emit('change');
    } else {
      clearInterval(this.intervalId);
      this.status = Status.COMPLETED;
      this.emit('change');
    }
  }

  checkTask() {
    xhr.get(this.taskLocation, {}, this.handleTaskCheckSuccessResponse)
      .catch((errMessage) => {
        clearInterval(this.intervalId);
        this.status = Status.FAILED;
        this.errorMessage = errMessage;
        this.emit('change');
      });
  }
}
