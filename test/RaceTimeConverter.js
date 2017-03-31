import assert from 'assert';
import { GetSeconds, GetPaceInSeconds } from '../src/RaceTimeConverter';

describe('Race Time Converter', () => {
  describe('#GetSeconds()', () => {
    it('should be present', (done) => {
      assert.ok(typeof GetSeconds === 'function');
      done();
    });
    it('should return total seconds', (done) => {
      const seconds = GetSeconds('23:45');
      assert.ok(seconds === 1425);
      done();
    });
  });
  describe('#GetPaceInSeconds()', () => {
    it('should be present', (done) => {
      assert.ok(typeof GetPaceInSeconds === 'function');
      done();
    });
    it('should return pace in seconds', (done) => {
      const pace = GetPaceInSeconds('23:45', 5);
      assert.ok(pace === 285);
      done();
    });
  })
});
