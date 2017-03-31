function convertToSeconds(value, position) {
  switch (position) {
    case 0:
      // seconds
      return value;
    case 1:
      // minutes
      return value * 60;
    case 2:
      // hours
      return value * 60 * 60;
    default:
      return 0;
  }
}

export function GetSeconds(time) {
  let totalSeconds = 0;
  const partsArray = time.split(':');
  partsArray.reverse();
  partsArray.forEach((num, index) => {
    const v = parseInt(num, 10);
    totalSeconds += convertToSeconds(v, index);
  });
  return totalSeconds;
}

export function GetPaceInSeconds(time, distance) {
  const seconds = GetSeconds(time);
  return seconds / parseInt(distance, 10);
}

export function GetPace(time, distance) {
  const paceInSeconds = GetPaceInSeconds(time, distance);
  const minutes = Math.floor(paceInSeconds / 60);
  const seconds = parseInt(paceInSeconds - (minutes * 60), 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}
