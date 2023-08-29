const date = new Date();

function DaysInMonth(year, month) {
  const totalDays = new Date(year, month, 0).getDate();
  return totalDays;
}

function nextPrevDay(currDay) {
  return currDay;
}
function nextPrevMonth(currMonth, press) {
  if (press) {
    // const a = new Date(currMonth);
    // return Number(year) + 1;
  } else {
    // return Number(year) - 1;
  }
  return currMonth;
}
function nextPrevYear(year, press) {
  if (press) {
    return Number(year) + 1;
  } else {
    return Number(year) - 1;
  }
}

export {DaysInMonth, nextPrevDay, nextPrevMonth, nextPrevYear};
