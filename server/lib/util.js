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
  const differenceMs = Math.abs(date1.getTime() - date2.getTime());

  // Convert back to days and return
  return Math.round(differenceMs / ONE_DAY);
}

f.isSpinAvailable = function (record, now = new Date(Date.now())) {
  // let now = new Date(Date.now());
  // console.log("Stt", record.startDate)
  // console.log("End", record.endDate)
  // console.log(now.getTime())
  // console.log(record.startDate.getTime() <= now.getTime())

  if (new Date(record.startDate).getTime() < now.getTime() && new Date(record.endDate).getTime() > now.getTime()) {
    let todatspin = this.getTodaySpin(record, now);
    let completedSpins = record.completedSpins;
    if (completedSpins[todatspin]) return false;
    return !this.isSunday(now);
    // return true;
  }
  return false;
}

f.getTodaySpin = function (record, now = new Date()) {
  now.setHours(0);
  let start = new Date(new Date(record.startDate).toDateString())
  let end = new Date(new Date(record.endDate).toDateString())
  // console.log(start)
  if (start.getTime() > now.getTime()) {
    return 0;
  }
  if (end.getTime() < now.getTime()) {
    return 0;
  }
  // console.log("Start", start)
  // console.log("now",now)
  return moment(now).diff(moment(start), 'days');
  // console.log(this.daysBetween(now, start));
  // return this.daysBetween(now, start)
}

f.isSunday = function (date = new Date()) {
  return !(date.getDay() % 6);
}

f.nextSpinDate = function (record) {
  // console.log(record)
  let now = new Date(Date.now());
  now = new Date((new Date(now).toDateString()))
  // let days = 1;
  now.setMinutes(0, 1)
  for (let day = 0; day <= 44; day++) {
    console.log("Test Next Date " + day, now);
    // now.setDate(now.getDay() + 1);
    now = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    // now.setMinutes(now.getMinutes() + 5);
    if (this.isSpinAvailable(record, new Date(now))) {
      return now;
    }
  }
  return false;
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
