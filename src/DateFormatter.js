
function dayOfWeek(num) {
  switch (num) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return '';
  }
}

function getMonth(num) {
  switch (num) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      return '';
  }
}

function getDateObject(date) {
  const regex = /^(\d{4})-(\d{2})-(\d{2})/;
  const result = regex.exec(date);
  const year = parseInt(result[1], 10);
  const month = parseInt(result[2], 10) - 1;
  const day = parseInt(result[3], 10);
  return new Date(Date.UTC(year, month, day, 0, 0, 0));
}

export function LongDateFormat(date) {
  const d = getDateObject(date);
  return `${dayOfWeek(d.getUTCDay())} , ${getMonth(d.getUTCMonth())} ${d.getUTCDate()}`;
}

export function DayOfMonth(date) {
  const d = getDateObject(date);
  return d.getUTCDate();
}

export function Year(date) {
  const d = getDateObject(date);
  return d.getUTCFullYear();
}

export function ShortMonthName(date) {
  const d = getDateObject(date);
  return getMonth(d.getUTCMonth()).substring(0, 3);
}
