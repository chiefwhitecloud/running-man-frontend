
// return the array items we can display
export function GetNumberOfItemScrolledOutOfView(elementHeight,
  elementYFromTopOfWindow, itemHeight, scrollPositionY) {
  if ((elementYFromTopOfWindow - Math.round(scrollPositionY)) >= 0) {
    return 0;
  }


  return Math.floor((Math.round(scrollPositionY) - elementYFromTopOfWindow) / itemHeight);
}


// return the number of visible pixels available
export function GetListHeightAvailableOnScreen(elementHeight,
  elementYFromTopOfWindow, scrollPositionY, windowHeight) {
  if ((elementYFromTopOfWindow - Math.round(scrollPositionY)) > 0) {
    // the top of the element is on the screen
    const distanceFromElementYToBottomOfPage =
      windowHeight - (elementYFromTopOfWindow - Math.round(scrollPositionY));

    if (elementHeight <= distanceFromElementYToBottomOfPage) {
      return elementHeight;
    }

    return distanceFromElementYToBottomOfPage;
  }

  // the top of the element is off the screen
  const remainingElementHeight =
    elementHeight - (Math.round(scrollPositionY) - elementYFromTopOfWindow);

  if (remainingElementHeight <= windowHeight) {
    return remainingElementHeight >= 0 ? remainingElementHeight : 0;
  }

  // we have the full height of the window available;
  return windowHeight;
}

// return the number of array items we can display
export function GetNumberOfItemsThatFit(heightAvailable, itemHeight) {
  if (heightAvailable <= 0) {
    return 0;
  }

  return Math.ceil(heightAvailable / itemHeight);
}

// return the array items we can display
export function GetVisibleItems(itemArray, itemHeight, heightAvailable, heightOffset) {
  if (heightAvailable <= 0) {
    return [];
  }

  let numOfItemsThatCanBeRendered = GetNumberOfItemsThatFit(heightAvailable, itemHeight);

  if (heightOffset === 0) {
    if (itemArray.length <= numOfItemsThatCanBeRendered) {
      // return all the items
      return itemArray.slice(0, itemArray.length - 1);
    }

    return itemArray.slice(0, numOfItemsThatCanBeRendered);
  }

  // heightOffset is greater than 0... the top of the element is off the page
  const numOfItemsOffThePage = Math.floor(heightOffset / itemHeight);

  if ((heightOffset % itemHeight) > 0) {
    // didn't divide evenly
    numOfItemsThatCanBeRendered += 1;
  }

  const startPosition = numOfItemsOffThePage;
  const endPosition = startPosition + numOfItemsThatCanBeRendered;

  return itemArray.slice(startPosition, endPosition);
}

// calc how far down we need to move the items within the container
export function GetOffsetYForElement(elementHeight, elementYFromTopOfWindow,
  scrollPositionY, windowHeight) {
  if (elementYFromTopOfWindow >= Math.round(scrollPositionY)) {
    // no offset needed.. the top of the element is visible
    return 0;
  }

  const availableHeightForElement =
    GetListHeightAvailableOnScreen(elementHeight, elementYFromTopOfWindow,
      scrollPositionY, windowHeight);

  if (availableHeightForElement === 0) {
    // the element is off the visible page.
    return 0;
  }

  //this places the offset at the top of the window
  const offset = (Math.round(scrollPositionY) - elementYFromTopOfWindow);

  return offset;
}
