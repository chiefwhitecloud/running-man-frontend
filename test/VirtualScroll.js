/* global it, describe */

import assert from 'assert';
import { GetListHeightAvailableOnScreen,
  GetVisibleListitemHeightOffset, GetVisibleItems } from '../src/VirtualScroll';


describe('Virtual Scroll', () => {
  describe('#GetListHeightAvailableOnScreen()', () => {
    it('should be present', (done) => {
      assert.ok(typeof GetListHeightAvailableOnScreen === 'function');
      done();
    });

    it('should return correct values for natural numbers', (done) => {
      assert.equal(GetListHeightAvailableOnScreen(400, 20, 0, 200), 180);
      assert.equal(GetListHeightAvailableOnScreen(400, 20, 100, 200), 200);
      assert.equal(GetListHeightAvailableOnScreen(400, 20, 200, 200), 200);
      assert.equal(GetListHeightAvailableOnScreen(400, 20, 300, 200), 120);
      assert.equal(GetListHeightAvailableOnScreen(400, 20, 420, 200), 0);
      assert.equal(GetListHeightAvailableOnScreen(400, 20, 520, 200), 0);
      done();
    });
  });

  describe('#GetVisibleListitemHeightOffset()', () => {
    it('should be present', (done) => {
      assert.ok(typeof GetVisibleListitemHeightOffset === 'function');
      done();
    });

    it('should return correct values', (done) => {
      const elementHeight = 400;
      const elementOffsetY = 20;
      assert.equal(GetVisibleListitemHeightOffset(elementHeight, elementOffsetY, 0, 200), 0);
      assert.equal(GetVisibleListitemHeightOffset(elementHeight, elementOffsetY, 100, 200), 80);
      assert.equal(GetVisibleListitemHeightOffset(elementHeight, elementOffsetY, 200, 200), 180);
      assert.equal(GetVisibleListitemHeightOffset(elementHeight, elementOffsetY, 300, 200), 200);
      assert.equal(GetVisibleListitemHeightOffset(elementHeight, elementOffsetY, 420, 200), 0);
      assert.equal(GetVisibleListitemHeightOffset(elementHeight, elementOffsetY, 520, 200), 0);

      assert.equal(GetVisibleListitemHeightOffset(elementHeight, 0, 0, 200), 0);
      assert.equal(GetVisibleListitemHeightOffset(elementHeight, 0, 100, 200), 100);
      assert.equal(GetVisibleListitemHeightOffset(elementHeight, 0, 200, 200), 200);
      assert.equal(GetVisibleListitemHeightOffset(elementHeight, 0, 300, 200), 200);
      assert.equal(GetVisibleListitemHeightOffset(elementHeight, 0, 400, 200), 0);
      done();
    });
  });

  describe('#GetVisibleItems()', () => {
    it('should be present', (done) => {
      assert.ok(typeof GetVisibleItems === 'function');
      done();
    });

    const items = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const itemHeight = 20;

    it('should return correct values', (done) => {
      assert.deepEqual(GetVisibleItems(items, itemHeight, 100, 0),
        ['1', '2', '3', '4', '5']);
      assert.deepEqual(GetVisibleItems(items, itemHeight, 10, 0),
        ['1']);
      assert.deepEqual(GetVisibleItems(items, itemHeight, 20, 0),
        ['1']);
      assert.deepEqual(GetVisibleItems(items, itemHeight, 30, 0),
        ['1', '2']);
      assert.deepEqual(GetVisibleItems(items, itemHeight, 100, 100),
        ['6', '7', '8', '9', '10']);
      assert.deepEqual(GetVisibleItems(items, itemHeight, 60, 140),
        ['8', '9', '10']);
      assert.deepEqual(GetVisibleItems(items, itemHeight, 0, 200),
        []);
      done();
    });

    it('should return items that are half visible', (done) => {
      assert.deepEqual(GetVisibleItems(items, itemHeight, 40, 30),
        ['2', '3', '4'], 'should display 1/2 of 2, all of 3 and 1/2 of 4');

      assert.deepEqual(GetVisibleItems(items, itemHeight, 40, 10),
        ['1', '2', '3'], 'should display 1/2 of 1, all of 2 and 1/2 of 3');
      done();
    });
  });
});
