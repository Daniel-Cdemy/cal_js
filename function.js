const dateToday = new Date();

let weekday = dateToday.getDay();
let dayName = getDayName(weekday);
// Ausgabe der Wochentage als Name:
function getDayName() {
  if (weekday === 0) return "Sonntag";
  else if (weekday === 1) return "Montag";
  else if (weekday === 2) return "Dienstag";
  else if (weekday === 3) return "Mittwoch";
  else if (weekday === 4) return "Donnerstag";
  else if (weekday === 5) return "Freitag";
  else if (weekday === 6) return "Samstag";
}
document.getElementById("weekDay").textContent = dayName;
document.getElementById("weekDay1").textContent = dayName;

let month = dateToday.getMonth();
let monthName = getMonthName(month);
// Ausgabe der Monate als Name:
function getMonthName() {
  if (month === 0) return "Januar";
  if (month === 1) return "Februar";
  if (month === 2) return "März";
  if (month === 3) return "April";
  if (month === 4) return "Mai";
  if (month === 5) return "Juni";
  if (month === 6) return "Juli";
  if (month === 7) return "August";
  if (month === 8) return "September";
  if (month === 9) return "Oktober";
  if (month === 10) return "November";
  if (month === 11) return "Dezember";
}
document.getElementById("fullMonth").textContent = monthName;
document.getElementById("fullMonth1").textContent = monthName;
document.getElementById("fullMonth2").textContent = monthName;
document.getElementById("fullMonth3").textContent = monthName;
document.getElementById("fullMonth4").textContent = monthName;
document.getElementById("fullMonth5").textContent = monthName;

let year = dateToday.getFullYear();
// Um die vergangenen und verbleibenden Tage richtig zu berechnen,
// nutze ich eine Formel für die Schaltjahre:
let isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
let daysInYear = getDaysInYear(year);
// Ausgabe ob Schaltjahr:
function getDaysInYear() {
  if (isLeapYear === true) return 366;
  if (isLeapYear === false) return 365;
}
document.getElementById("yearDig").textContent = year;
document.getElementById("yearDig1").textContent = year;
document.getElementById("yearDig2").textContent = year;
document.getElementById("yearDig3").textContent = year;

// Um herauszufinden wie viele Tage vergangen sind,
// vergleiche ich das aktuelle Datum mit dem 01.01 diesen Jahres
// und ermittle die Differenz:
const dateStart = new Date(year, 0, 1);
let diffInMS = dateToday - dateStart;
let diffInDays = Math.floor(diffInMS / 86400000) + 1;
let finalDiffInDays = diffInDays + ".";
document.getElementById("diffStart").textContent = finalDiffInDays;

// Um herauszufinden wie viele Tage es noch bis zum Jahresende sind,
// ziehe ich die aktuellen Tage von den gesamten Tagen im Jahr ab:
let remainingDays = daysInYear - diffInDays;
document.getElementById("remainingDays").textContent = remainingDays;

let day = dateToday.getDate();
let wievielte = getWievielte(day);
// Um richtig auszugeben, um die wievielte Woche es sich handelt,
// nutze ich folgende Funktion:
function getWievielte() {
  if (day < 8) return "erste";
  if (day < 15) return "zweite";
  if (day < 22) return "dritte";
  if (day < 29) return "vierte";
  if ((day) => 29) return "fünfte";
}
document.getElementById("wievielte").textContent = wievielte;

// Damit das Datum korrekt ausgegeben wird, füge ich ein "." nach jedem Tag hinzu:
datePeriod = finalDatePeriod() + ".";
// Damit einzelne Zahlen sich nicht von den doppelten unterscheiden,
// füge ich eine "0" vor die einzelnen Zahlen hinzu:
function finalDatePeriod() {
  if (day < 10) return "0" + day;
  else {
    return day;
  }
}
document.getElementById("day").textContent = datePeriod;
document.getElementById("day1").textContent = datePeriod;
document.getElementById("day2").textContent = datePeriod;

// Ermittlung des letzten Tages im aktuellen Monat:
const lastDayInMonth = new Date(year, month + 1, 0).getDate();
document.getElementById("lastDayInMonth").textContent = lastDayInMonth;

// Feste Feiertage:
const newYearsDay = new Date(year, 0, 1);
const laborDay = new Date(year, 4, 1);
const germanUnityDay = new Date(year, 9, 3);

// Berechnung von Ostersonntag nach Gauß:
function getEasterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const n = (h + l - 7 * m + 114) % 31;
  const day = n + 1;
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  return new Date(year, month, day);
}
// Berechnung Christi Himmelfahrt anhand von Ostersonntag:
function getAscensionDay(year) {
  const easterSunday = getEasterSunday(year);
  return new Date(easterSunday.getTime() + 39 * 24 * 60 * 60 * 1000);
}
// Berechnung von Pfingsten anhand von Ostersonntag:
function getPentecostSunday(year) {
  const easterSunday = getEasterSunday(year);
  return new Date(easterSunday.getTime() + 49 * 24 * 60 * 60 * 1000);
}
// Überprüfen ob heute ein Feiertag ist:
function isHoliday() {
  if (
    dateToday.getDate() === newYearsDay.getDate() &&
    dateToday.getMonth() === newYearsDay.getMonth() &&
    dateToday.getFullYear() === newYearsDay.getFullYear()
  ) {
    return "ist ein gesetzlicher Feiertag";
  }
  if (
    dateToday.getDate() === laborDay.getDate() &&
    dateToday.getMonth() === laborDay.getMonth() &&
    dateToday.getFullYear() === laborDay.getFullYear()
  ) {
    return "ist ein gesetzlicher Feiertag";
  }
  if (
    dateToday.getDate() === germanUnityDay.getDate() &&
    dateToday.getMonth() === germanUnityDay.getMonth() &&
    dateToday.getFullYear() === germanUnityDay.getFullYear()
  ) {
    return "ist ein gesetzlicher Feiertag";
  }
  if (
    dateToday.getDate() === getEasterSunday(year).getDate() &&
    dateToday.getMonth() === getEasterSunday(year).getMonth() &&
    dateToday.getFullYear() === getEasterSunday(year).getFullYear()
  ) {
    return "ist ein gesetzlicher Feiertag";
  }
  if (
    dateToday.getDate() === getAscensionDay(year).getDate() &&
    dateToday.getMonth() === getAscensionDay(year).getMonth() &&
    dateToday.getFullYear() === getAscensionDay(year).getFullYear()
  ) {
    return "ist ein gesetzlicher Feiertag";
  }
  if (
    dateToday.getDate() === getPentecostSunday(year).getDate() &&
    dateToday.getMonth() === getPentecostSunday(year).getMonth() &&
    dateToday.getFullYear() === getPentecostSunday(year).getFullYear()
  ) {
    return "ist ein gesetzlicher Feiertag";
  } else {
    return "ist kein gesetzlicher Feiertag";
  }
}
document.getElementById("holiday").textContent = isHoliday();
