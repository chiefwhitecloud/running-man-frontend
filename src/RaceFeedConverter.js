
/*
* Creates a map from the race items from the server.  Groups by year, then groups
* by race date.  Incase, there are more than one race on a given day.
*
* ex.
* {
*   year1: { date1 : [raceItem1], date2 : [raceItem2, raceItem3]},
*   year2: { date3 : [raceItem4], date4 : [raceItem5]},
* }
*
*/

export function GetRaceMapByYear (raceItems) {

  let raceMap = new Map();
  let yearRegEx = /^\d{4}/;

  //create a map with year as the key and value as an array
  //of race items from the server
  for (var value of raceItems) {
    let results = yearRegEx.exec(value["date"])
    if (results.length == 1){
      if (raceMap.get(results[0]) == undefined){
        raceMap.set(results[0], [value]);
      }
      else{
        let v = raceMap.get(results[0]);
        v.push(value);
        raceMap.set(results[0], v);
      }
    }
  }

  //group same races on same day
  for (var [year, value] of raceMap) {
    let racesForYear = raceMap.get(year);
    let raceYearMap = new Map();
    let prevDate = undefined;
    let newRaceList = [];
    for (var race of racesForYear){
      if (prevDate != race["date"]){
        //new entry;
        raceYearMap.set(race["date"], [race]);
      }
      else{
        //same day;
        let v = raceYearMap.get(race["date"]);
        v.push(race);
        raceYearMap.set(race["date"], v);
      }
      prevDate = race["date"];
    }
    raceMap.set(year, raceYearMap);
  }

  return raceMap;
}



/*
* Creates a map from the race groups from the server.
*
* ex.
* {
*   raceGroupId: {
*            raceGroup : {},
*            races : [raceItem2, raceItem3]
*   },
*   .
*   .
* }
*
*/

export function GetRacesSortedRaceGroup (raceGroupsItems, raceItems) {

  let raceMap = new Map();
  let raceGroupMap = new Map();

  raceItems.forEach(function(race) {
    raceMap.set(race["date"], race);
  });

  var sortedRaceMap = new Map([...raceMap.entries()].sort().reverse());

  sortedRaceMap.forEach(function(race){
    if (race["raceGroup"] == undefined){
      return;
    }
    
    let raceGroup = raceGroupsItems.find(function(raceGroup) {
      return race["raceGroup"] == raceGroup["self"];
    });

    if (raceGroupMap.has(raceGroup["id"])){
      let existingRaces = raceGroupMap.get(raceGroup["id"]).races;
      existingRaces.push(race);
      raceGroupMap.set(raceGroup["id"], {raceGroup: raceGroup, races: existingRaces})
    }
    else{
      raceGroupMap.set(raceGroup["id"], {raceGroup: raceGroup, races: [race]})
    }
  });

  return raceGroupMap;
}
