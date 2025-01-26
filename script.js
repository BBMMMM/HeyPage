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

  function addEasterHolidays() {
    const easterDates = [
      { year: 2024, dates: [{ month: 2, day: 29 }, { month: 2, day: 31 }, { month: 3, day: 1 }] },
      { year: 2025, dates: [{ month: 3, day: 18 }, { month: 3, day: 20 }, { month: 3, day: 21 }] },
      { year: 2026, dates: [{ month: 3, day: 3 }, { month: 3, day: 5 }, { month: 3, day: 6 }] },
      { year: 2027, dates: [{ month: 2, day: 26 }, { month: 2, day: 28 }, { month: 2, day: 29 }] },
      { year: 2028, dates: [{ month: 3, day: 14 }, { month: 3, day: 16 }, { month: 3, day: 17 }] },
      { year: 2029, dates: [{ month: 2, day: 30 }, { month: 3, day: 1 }, { month: 3, day: 2 }] },
      { year: 2030, dates: [{ month: 3, day: 19 }, { month: 3, day: 21 }, { month: 3, day: 22 }] },
      { year: 2031, dates: [{ month: 3, day: 11 }, { month: 3, day: 13 }, { month: 3, day: 14 }] },
      { year: 2032, dates: [{ month: 2, day: 26 }, { month: 2, day: 28 }, { month: 2, day: 29 }] },
      { year: 2033, dates: [{ month: 3, day: 15 }, { month: 3, day: 17 }, { month: 3, day: 18 }] },
      { year: 2034, dates: [{ month: 3, day: 7 }, { month: 3, day: 9 }, { month: 3, day: 10 }] },
    ];
  
    for (const entry of easterDates) {
      for (const date of entry.dates) {
        nationalHolidays.push({ year: entry.year, month: date.month, day: date.day });
      }
    }
  }
  addEasterHolidays();

  function addSecondSundayOfMay() {
    const startYear = new Date().getFullYear() - 1; // Start from the previous year
    const endYear = new Date().getFullYear() + 1;  // Add for the next year
  
    for (let year = startYear; year <= endYear; year++) {
      const mayFirst = new Date(year, 4, 1); // May 1st (month 4 in 0-based index)
      const dayOfWeek = mayFirst.getDay(); // Day of the week for May 1st
      const offset = dayOfWeek === 0 ? 7 : 7 - dayOfWeek; // Days to reach the first Sunday
      const secondSunday = offset + 8; // Second Sunday is one week after the first Sunday
  
      nationalHolidays.push({ year, month: 4, day: secondSunday });
    }
  }
  addSecondSundayOfMay();

  const currentDate = new Date();

  container.style.overflow = "auto"; // Enable scrolling
  container.style.webkitOverflowScrolling = "touch"; // Add momentum scrolling for iOS
  container.style.height = "100vh";
  container.style.width = "100%"; // Make the calendar full width
  container.style.position = "relative";
  container.style.backgroundColor = "#121212"; // Dark background
  container.style.color = "white"; // Default text color

  container.addEventListener("touchmove", (event) => {
    event.stopPropagation(); // Prevent interference with other scroll areas
  });
  

  const totalMonths = 37; // 12 months before and 24 months after the current month
  const startMonthIndex = currentMonth - 12;

  const calendarFragment = document.createDocumentFragment();

  function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  function isHoliday(year, month, day) {
    if (day > new Date(year, month + 1, 0).getDate()) {
      const nextMonth = (month + 1) % 12;
      const nextYear = month === 11 ? year + 1 : year;
      return nationalHolidays.some(
        (holiday) => holiday.year === nextYear && holiday.month === nextMonth && holiday.day === day - new Date(year, month + 1, 0).getDate()
      );
    }
    return nationalHolidays.some((holiday) => {
      if (holiday.year !== undefined) {
        return holiday.year === year && holiday.month === month && holiday.day === day;
      }
      return holiday.month === month && holiday.day === day;
    });
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
    if (event.target === container) {
      container.scrollTop += event.deltaY;
      event.preventDefault();
    }
  });
  
}

document.addEventListener("DOMContentLoaded", function () {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const calendarContainer = document.getElementById("calendar");

  createScrollableCalendar(calendarContainer, currentYear, currentMonth);
});
