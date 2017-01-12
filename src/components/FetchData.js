import xhr from './../xhr'

export const GetRaces = function(){
  return xhr.get('/feed/races');
};

export const getRaceGroups = function(){
  return xhr.get('/feed/racegroups');
};

export const getRacer = function(racerId){
  return xhr.get('/feed/racer/' + racerId);
};

export const doRequests = function(requests){
  let xhrs = requests.map(url => typeof url === 'string' ? xhr.get(url) : url());
  return Promise.all(xhrs);
}
