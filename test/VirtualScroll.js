/* global it, describe */

import assert from 'assert';
import { GetListHeightAvailableOnScreen,
  GetOffsetYForElement, GetVisibleItems,
  GetNumberOfItemScrolledOutOfView } from '../src/VirtualScroll';


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
      assert.ok(typeof GetOffsetYForElement === 'function');
      done();
    });

    it('should return correct values of an element with an offset of 0', (done) => {
      // the total height of the element
      const elementHeight = 400;

      // how many pixels the element is below the top of the screen when the
      // scroll position is 0
      const elementOffsetY = 0;

      assert.equal(GetOffsetYForElement(elementHeight, elementOffsetY, 0, 200), 0,
        'The top of the element is on the screen');

      assert.equal(GetOffsetYForElement(elementHeight, elementOffsetY, 100, 200), 100,
        'When the window is scrolled down 100, the top 100px of the element is off the page');

      assert.equal(GetOffsetYForElement(elementHeight, elementOffsetY, 200, 200), 200,
        'When the window is scrolled down 200, the top 200px of the element is off the page');

      assert.equal(GetOffsetYForElement(elementHeight, elementOffsetY, 300, 200), 300,
        'When the window is scrolled down 300, the top 300px of the element is off the page');

      assert.equal(GetOffsetYForElement(elementHeight, elementOffsetY, 400, 200), 0,
        'When the window is scrolled down 400, the element is off the page');

      done();
    });

    it('should return correct values of an element with an offset of 20', (done) => {
      // the total height of the element
      const elementHeight = 400;

      // how many pixels the element is below the top of the screen when the
      // scroll position is 0
      const elementOffsetY = 20;

      assert.equal(GetOffsetYForElement(elementHeight, elementOffsetY, 0, 200), 0,
        'The top of the element is on the screen');

      assert.equal(GetOffsetYForElement(elementHeight, elementOffsetY, 100, 200), 80,
        'When the window is scrolled down 100, the top 80px of the element is off the viewable area');

      assert.equal(GetOffsetYForElement(elementHeight, elementOffsetY, 200, 200), 180,
        'When the window is scrolled down 200, the top 180px of the element is off the viewable area');

      assert.equal(GetOffsetYForElement(elementHeight, elementOffsetY, 300, 200), 280,
        'When the window is scrolled down 300, the top 280px of the element is off the viewable area');

      assert.equal(GetOffsetYForElement(elementHeight, elementOffsetY, 420, 200), 0,
        'When the window is scrolled down 420, the element is off the viewable area');

      assert.equal(GetOffsetYForElement(elementHeight, elementOffsetY, 520, 200), 0,
        'When the window is scrolled down 520, the element is off the viewable area');

      done();
    });
  });


  describe('#GetNumberOfItemScrolledOutOfView()', () => {
    it('should be present', (done) => {
      assert.ok(typeof GetNumberOfItemScrolledOutOfView === 'function');
      done();
    });

    it('should return correct values with no element offset', (done) => {
      const elementHeight = 100;
      const elementYFromTopOfWindow = 0;
      const itemHeight = 20;

      assert.equal(
        GetNumberOfItemScrolledOutOfView(elementHeight, elementYFromTopOfWindow, itemHeight, 0),
        0,
        'Top of the element is visible, no items are scrolled out of view',
      );

      assert.equal(
        GetNumberOfItemScrolledOutOfView(elementHeight, elementYFromTopOfWindow, itemHeight, 40),
        2,
        'Two items have scrolled by',
      );

      assert.equal(
        GetNumberOfItemScrolledOutOfView(elementHeight, elementYFromTopOfWindow, itemHeight, 50),
        2,
        'Two full items have scrolled by',
      );

      done();
    });

    it('should return correct values with element offset', (done) => {
      const elementHeight = 100;
      const elementYFromTopOfWindow = 20;
      const itemHeight = 20;

      assert.equal(
        GetNumberOfItemScrolledOutOfView(elementHeight, elementYFromTopOfWindow, itemHeight, 0),
        0,
        'Top of the element is visible, no items are scrolled out of view',
      );

      assert.equal(
        GetNumberOfItemScrolledOutOfView(elementHeight, elementYFromTopOfWindow, itemHeight, 40),
        1,
        'One item have scrolled by',
      );

      assert.equal(
        GetNumberOfItemScrolledOutOfView(elementHeight, elementYFromTopOfWindow, itemHeight, 50),
        1,
        'One full item have scrolled by, item two is half visible',
      );

      assert.equal(
        GetNumberOfItemScrolledOutOfView(elementHeight, elementYFromTopOfWindow, itemHeight, 60),
        2,
        'Two full items have scrolled by.',
      );

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
        ['2', '3', '4'], 'should display bottom half of 2, all of 3 and top half of 4');

      assert.deepEqual(GetVisibleItems(items, itemHeight, 40, 10),
        ['1', '2', '3'], 'should display bottom half of 1, all of 2 and top half of of 3');
      done();
    });
  });
});
