export default class XHR {

  constructor(method) {
    this.method = method;
  }

  static get(URL, opt = {}, processXHR) {
    const xhr = new XHR('GET');
    return xhr.request(URL, opt).then((resultXHR) => {
      if (processXHR) {
        return processXHR(resultXHR);
      } else if (resultXHR.getResponseHeader('Content-Type') === 'application/json') {
        return JSON.parse(resultXHR.responseText);
      }
      return resultXHR.responseText;
    }, failedXhr => (
      Promise.reject(failedXhr.responseText)
    ));
  }

  static post(URL, opt = {}, processXHR = undefined, expectedStatus = 201) {
    const xhr = new XHR('POST');
    return xhr.request(URL, opt, expectedStatus).then((resultXHR) => {
      if (processXHR) {
        return processXHR(resultXHR);
      } else if (resultXHR.getResponseHeader('Content-Type') === 'application/json') {
        return JSON.parse(resultXHR.responseText);
      }
      return resultXHR.responseText;
    });
  }

  static put(URL, opt = {}) {
    return new XHR('put').request(URL, opt);
  }

  static delete(URL, opt = {}) {
    return new XHR('DELETE').request(URL, opt);
  }

  static formatParams(params) {
    const pairs = Object.keys(params).map(k => `${k}=${params[k]}`);
    return `?${pairs.join('&')}`;
  }

  request(URL, { params = null, data = null, auth = null, headers = null }, expectedStatus = 200) {
    let url = URL;

    return new Promise((OK, ERR) => {
      const xhrRequest = new XMLHttpRequest();

      xhrRequest.onload = () => {
        if (xhrRequest.status === expectedStatus) {
          OK(xhrRequest);
        } else {
          ERR(xhrRequest);
        }
      };

      xhrRequest.onerror = (err) => { ERR(err); };

      xhrRequest.open(this.method, url, true);

      if (headers instanceof Object) {
        Object.keys(headers).forEach(k => xhrRequest.setRequestHeader(k, headers[k]));
      } else {
        xhrRequest.setRequestHeader('Content-Type', 'text/plain');
        xhrRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      }

      if (params instanceof Object) {
        url += this.formatParams(params);
      }

      xhrRequest.send(data instanceof Object ? JSON.stringify(data) : data);
    });
  }
}
