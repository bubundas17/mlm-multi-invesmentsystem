let f = {}
const moment = require('moment');
// Generates a array with given length with false value
f.emptyArray = (length = 1, value = false) => {
  let arr = [];
  arr.length = length;
  return Array.from(arr, x => value)
}
f.daysBetween = function (date1, date2) {

  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;

  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(date1 - date2);

  // Convert back to days and return
  return Math.round(differenceMs / ONE_DAY);

}

f.isSpinAvailable = function (record) {
  let now = new Date(Date.now());
  // console.log("Stt", record.startDate)
  // console.log("End", record.endDate)
  // console.log(now.getTime())
  // console.log(record.startDate.getTime() <= now.getTime())

  if (new Date(record.startDate).getTime() < now.getTime() && new Date(record.endDate).getTime() > now.getTime()) {
    let todatspin = this.getTodaySpin(record);
    let completedSpins = record.completedSpins;
    if(completedSpins[todatspin]) return false;
    return !this.isSunday(now);
    // return true;
  }
  return false;
}

f.getTodaySpin = function (record) {
  let now = new Date();

  if (record.startDate.getTime() > now.getTime()) {
    return 0;
  }
  if (record.endDate.getTime() < now.getTime()) {
    return 0;
  }
  return moment(now).diff(moment(record.startDate), 'days');
}

f.isSunday = function (date = new Date()) {
  return !(date.getDay() % 6);
}

f.weekDays = function (fromDate, toDate) {
  let weekendDayCount = 0;
  while (fromDate < toDate) {
    fromDate.setDate(fromDate.getDate() + 1);
    if (fromDate.getDay() === 0) {
      ++weekendDayCount;
    }
  }
  return weekendDayCount;
}

module.exports = f;
