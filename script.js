function createScrollableCalendar(container, currentYear, currentMonth) {
  const daysOfWeek = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const nationalHolidays = [
    { month: 0, day: 1 }, // 1. Jan — Jaungada diena
    { month: 4, day: 1 }, // 1. May — Darba svētki
    { month: 4, day: 4 }, // 4. May — Latvijas Republikas Neatkarības atjaunošanas diena
    { month: 5, day: 23 }, // 23. June — Līgo diena
    { month: 5, day: 24 }, // 24. June — Jāņu diena
    { month: 10, day: 18 }, // 18. November — Latvijas Republikas Proklamēšanas diena
    { month: 11, day: 24 }, // 24. December — Ziemassvētki
    { month: 11, day: 25 }, // 25. December — Ziemassvētki
    { month: 11, day: 26 }, // 26. December — Ziemassvētki
    { month: 11, day: 31 }, // 31. December — Vecgada diena
  ];

  const currentDate = new Date();

  container.style.overflow = "hidden"; // Hide the scroll bar
  container.style.height = "100vh";
  container.style.width = "100%"; // Make the calendar full width
  container.style.position = "relative";
  container.style.backgroundColor = "#121212"; // Dark background
  container.style.color = "white"; // Default text color

  const totalMonths = 37; // 12 months before and 24 months after the current month
  const startMonthIndex = currentMonth - 12;

  const calendarFragment = document.createDocumentFragment();

  function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  function isHoliday(year, month, day) {
    return nationalHolidays.some(
      (holiday) => holiday.month === month && holiday.day === day
    );
  }

  function getNextDay(year, month, day) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    if (day < daysInMonth) {
      return { year, month, day: day + 1 };
    }
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    return { year: nextYear, month: nextMonth, day: 1 };
  }

  for (let offset = 0; offset < totalMonths; offset++) {
    const monthIndex = (startMonthIndex + offset + 12) % 12;
    const year = currentYear + Math.floor((startMonthIndex + offset) / 12);

    const monthContainer = document.createElement("div");
    monthContainer.className = "month-container";
    monthContainer.style.margin = "20px 0";

    const monthHeader = document.createElement("div");
    monthHeader.textContent = `${monthNames[monthIndex]} ${year} 📅`;
    monthHeader.style.color = "white";
    monthHeader.style.fontSize = "23px";
    monthHeader.style.fontFamily = "'Caveat', cursive";
    monthHeader.style.padding = "10px 0";
    monthContainer.appendChild(monthHeader);

    const monthTable = document.createElement("table");
    monthTable.className = "month-table";
    monthTable.style.margin = "0 auto"; // Center the table

    const headerRow = document.createElement("tr");
    for (const dayOfWeek of daysOfWeek) {
      const th = document.createElement("th");
      th.textContent = dayOfWeek;
      th.style.color = "rgba(255, 255, 255, 0.2)"; // Barely visible by default
      th.style.fontSize = "15px";
      th.style.fontFamily = "'Caveat', cursive";
      headerRow.appendChild(th);
    }
    monthTable.appendChild(headerRow);

    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const firstDay = new Date(year, monthIndex, 1).getDay();

    let date = 1;
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");

      const weekNumberCell = document.createElement("td");
      weekNumberCell.textContent = date <= daysInMonth ? `W${getWeekNumber(new Date(year, monthIndex, date))}` : "";
      weekNumberCell.style.color = "rgba(255, 255, 255, 0.2)"; // Barely visible by default
      weekNumberCell.style.fontSize = "15px";
      weekNumberCell.style.fontFamily = "'Caveat', cursive";
      weekNumberCell.style.padding = "10px";
      row.appendChild(weekNumberCell);

      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");

        if ((i === 0 && j < (firstDay === 0 ? 6 : firstDay - 1)) || date > daysInMonth) {
          row.appendChild(cell);
          continue;
        }

        cell.textContent = date;
        cell.style.fontSize = "15px";
        cell.style.fontFamily = "'Caveat', cursive";
        cell.style.padding = "10px";
        cell.style.transition = "background-color 0.3s, color 0.3s";

        const isCurrentDayHoliday = isHoliday(year, monthIndex, date);
        const isWeekend = j === 5 || j === 6;

        if (isCurrentDayHoliday) {
          cell.style.backgroundColor = "rgba(255, 0, 0, 0.1)"; // Highlight holidays with red background
          cell.style.color = "red"; // Holiday text color is white
          cell.addEventListener("mouseenter", function () {
            cell.style.backgroundColor = "rgba(255, 0, 0, 0.5)"; // Ensure hover keeps the red background
          });

          cell.addEventListener("mouseleave", function () {
            cell.style.backgroundColor = "rgba(255, 0, 0, 0.1)"; // Ensure it resets to red
          });
        } else {
          const { year: nextYear, month: nextMonth, day: nextDay } = getNextDay(year, monthIndex, date);
          const isNextDayHoliday = isHoliday(nextYear, nextMonth, nextDay);

          if (isNextDayHoliday && !isWeekend && j !== 5 && j !== 6) {
            // Highlight only weekdays (Monday-Friday) before a holiday
            cell.style.color = "rgba(255, 255, 0, 1.0)"; // Slightly yellow
          } else {
            cell.style.color = "white"; // Default color
          }

          cell.addEventListener("mouseenter", function () {
            cell.style.backgroundColor = isWeekend ? "rgba(0, 0, 0, 1.0)" : "rgba(0, 0, 0, 0.8)";
          });

          cell.addEventListener("mouseleave", function () {
            cell.style.backgroundColor = isWeekend ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.2)";
          });
        }

        cell.style.backgroundColor = isWeekend ? "rgba(0, 0, 0, 0.7)" : cell.style.backgroundColor || "rgba(0, 0, 0, 0.2)";
        cell.style.borderRadius = "50%";

        if (
          date === currentDate.getDate() &&
          monthIndex === currentDate.getMonth() &&
          year === currentYear
        ) {
          cell.style.border = "2px solid white";
        }

        row.appendChild(cell);
        date++;
      }

      monthTable.appendChild(row);
    }

    monthContainer.appendChild(monthTable);
    calendarFragment.appendChild(monthContainer);
  }

  container.innerHTML = "";
  container.appendChild(calendarFragment);

  const focusMonthOffset = 12; // Index of the current month in the displayed range
  const visibleHeight = container.clientHeight; // Height of the viewport
  const monthHeight = container.scrollHeight / totalMonths; // Approximate height of one month
  const scrollPosition = (monthHeight * focusMonthOffset) - (visibleHeight / 2) + (monthHeight / 2);

  container.scrollTop = scrollPosition;

  // Add custom scroll handling to the entire document
  document.addEventListener("wheel", (event) => {
    event.preventDefault();
    container.scrollTop += event.deltaY;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const calendarContainer = document.getElementById("calendar");

  createScrollableCalendar(calendarContainer, currentYear, currentMonth);
});
