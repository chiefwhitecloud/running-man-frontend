export default class XHR  {

    constructor (method) {
        this.method = method;
    }

    static get (URL, opt = {}) {
        let xhr = new XHR('GET');
        return xhr.request(URL, opt);
    }

    static post (URL, opt = {}) {
        let xhr = new XHR('POST');
        return xhr.request(URL, opt);
    }

    static put (URL, opt = {}) {
        let xhr = new XHR('put');
        return xhr.request(URL, opt);
    }

    static delete (URL, opt = {}) {
        let xhr = new XHR('DELETE');
        return xhr.request(URL, opt);
    }

    static format_params (params) {
        let pairs = Object.keys(params).map( (k) => {
            return `${k}=${params[k]}`;
        });
        return `?${pairs.join('&')}`;
    }

    request (URL, {params = null, data = null, auth = null, headers = null}) {
        return new Promise( (OK, ERR) => {

            let XHR = new XMLHttpRequest();

            XHR.onload = () => {
                if(XHR.status === 200 || XHR.status === 201){
                    OK(JSON.parse(XHR.responseText));
                }else{
                    ERR(XHR.statusText);
                }
            };

            XHR.onerror = (err) => { ERR(err); };

            XHR.open(this.method, URL, true);

            if (headers instanceof Object) {
                Object.keys(headers).forEach( (k) => {
                    XHR.setRequestHeader(k, headers[k]);
                });
            } else {
                XHR.setRequestHeader('Content-Type', 'text/plain');
                XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            }

            if (params instanceof Object) {
                URL += this.format_params(params);
            }

            let opt = [this.method, URL, true];

            if (auth !== null) {
                opt.push(auth.user);
                opt.push(auth.password);
            }

            if (data instanceof Object) {
                data = JSON.stringify(data);
            }
            XHR.send(data);

        });
    }

}
