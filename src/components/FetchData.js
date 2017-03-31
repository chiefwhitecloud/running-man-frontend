import XHR from './../xhr';

export const GetRaces = () => XHR.get('/feed/races');

export const getRaceGroups = () => XHR.get('/feed/racegroups');

export const getRacer = racerId => XHR.get(`/feed/racer/${racerId}`);

export const doRequests = (requests) => {
  const xhrs = requests.map(url => (typeof url === 'string' ? XHR.get(url) : url()));
  return Promise.all(xhrs);
};
