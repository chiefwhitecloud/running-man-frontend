
function dayOfWeek(num){

  switch (num){
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
       return "Thursday";
      case 5:
       return "Friday";
      case 6:
        return "Saturday";
      default:
        return "";
  }
}



function getMonth(num){

  switch (num){
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
       return "May";
      case 5:
       return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
  }
}

function getDateObject (date) {
  const regex = /^(\d{4})-(\d{2})-(\d{2})/;
  let result = regex.exec(date);
  return new Date(Date.UTC(parseInt(result[1], 10), (parseInt(result[2], 10) - 1), parseInt(result[3], 10), 0, 0, 0));
}

export function LongDateFormat (date) {
  let d = getDateObject(date);
  return dayOfWeek(d.getUTCDay()) + ', ' + getMonth(d.getUTCMonth()) + ' ' + d.getUTCDate();
}

export function DayOfMonth (date) {
  const regex = /^(\d{4})-(\d{2})-(\d{2})/;
  let result = regex.exec(date);
  return result[3];
}

export function Year (date) {
  const regex = /^(\d{4})-(\d{2})-(\d{2})/;
  let result = regex.exec(date);
  return result[1];
}

export function ShortMonthName (date) {
  let d = getDateObject(date);
  return getMonth(d.getUTCMonth()).substring(0, 3);
}
