import assert from 'assert';
import { GetRaceMapByYear, GetRacesSortedRaceGroup } from '../src/RaceFeedConverter';

const raceList = '[{"id":18,"name":"Cape to Cabot 20K Road Race","self":"http://localhost:8081/feed/race/18","results":"http://localhost:8081/feed/race/18/results","date":"2016-10-16","raceGroup":"http://localhost:8081/feed/racegroup/14"}]';
const raceGroupList = '[{"id":14,"name":"Cape to Cabot","distance":"20 km","self":"http://localhost:8081/feed/racegroup/14","races":"http://localhost:8081/feed/racegroup/14/races"}]';

const raceItems = JSON.parse(raceList);
const raceGroupItems = JSON.parse(raceGroupList);

describe('Race Feed Converter', function() {
  describe('#GetRaceMapByYear()', function() {
    it('should be present', function(done) {
      assert.ok(typeof GetRaceMapByYear === 'function');
      done();
    });
    it('should return a map grouped by year', function(done) {
      let races = GetRaceMapByYear(raceItems);
      assert.ok(races.get('2016') != undefined);
      done();
    });
    it('should return the race dates for each year', function(done) {
      let races = GetRaceMapByYear(raceItems);
      assert.ok(races.get('2016').get('2016-10-16'));
      assert.equal(1, races.get('2016').get('2016-10-16').length);
      assert.equal(raceItems[0], races.get('2016').get('2016-10-16')[0]);
      done();
    });
    it('should return an array of races for each race date', function(done) {
      let races = GetRaceMapByYear(raceItems);
      assert.equal(1, races.get('2016').get('2016-10-16').length);
      assert.equal(raceItems[0], races.get('2016').get('2016-10-16')[0]);
      done();
    });
  });

  describe('#GetRacesSortedRaceGroup()', function() {
    it('should be present', (done) => {
      assert.ok(typeof GetRacesSortedRaceGroup === 'function');
      done();
    });
    it('should return a map grouped by racegroup id', (done) => {
      const races = GetRacesSortedRaceGroup(raceGroupItems, raceItems);
      assert.ok(races.get(14));
      assert.equal(1, races.size);
      done();
    });
    it('should return an object with races and racegroup for each key returned in the map', function(done) {
      let races = GetRacesSortedRaceGroup(raceGroupItems, raceItems);
      let obj = races.get(14);
      assert.ok(obj.races);
      assert.equal(1, obj.races.length);
      assert.equal(raceItems[0], obj.races[0]);
      assert.ok(obj.raceGroup);
      done();
    });
  });
});
