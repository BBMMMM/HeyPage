function generateCalendar(year, month) {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();

  const calendar = [];
  let currentWeek = [];

  // Fill in empty days before the start of the month
  for (let i = 0; i < firstDay.getDay() - 1; i++) {
    currentWeek.push("");
  }

  // Fill in the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      calendar.push([...currentWeek]);
      currentWeek = [];
    }
  }

  // Fill in empty days at the end of the last week
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push("");
    }
    calendar.push([...currentWeek]);
  }

  return calendar;
}

const year = 2024;
const month = 1;
const calendar = generateCalendar(year, month);

// Printing the calendar to the console
calendar.forEach((week) => {
  console.log(week.join("\t"));
});
