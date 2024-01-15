function createCalendar(container, year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const currentDate = new Date(); // Get the current date

  const monthNames = [
    "Janvāris",
    "Februāris",
    "Marts",
    "Aprīlis",
    "Maijs",
    "Jūnijs",
    "Jūlijs",
    "Augusts",
    "Septembris",
    "Oktobris",
    "Novemberis",
    "Decembris",
  ];

  const calendarTable = document.createElement("table");
  calendarTable.className = "calendar";

  const caption = document.createElement("caption");
  caption.textContent = monthNames[month] + " " + year;
  caption.style.color = "white";
  caption.style.fontSize = "40px";
  caption.style.fontFamily = "'Caveat', cursive";
  caption.style.padding = "20px";
  calendarTable.appendChild(caption);

  const headerRow = document.createElement("tr");
  const daysOfWeek = ["P", "O", "T", "C", "P", "S", "Sv"];
  for (const dayOfWeek of daysOfWeek) {
    const th = document.createElement("th");
    th.textContent = dayOfWeek;
    th.style.color = "white";
    th.style.fontSize = "15px";
    th.style.fontFamily = "'Caveat', cursive";
    headerRow.appendChild(th);
  }
  calendarTable.appendChild(headerRow);

  let date = 1;

  // Set the background color for weekend date cells
  const weekendBackgroundColor = "rgba(0, 0, 0, 0.7)";
  // Set the background color for weekday date cells
  const weekdayBackgroundColor = "rgba(0, 0, 0, 0.2)";

  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDay - 1) || date > daysInMonth) {
        const emptyCell = document.createElement("td");
        row.appendChild(emptyCell);
      } else {
        const cell = document.createElement("td");
        cell.textContent = date;
        cell.style.color = "white";
        cell.style.fontSize = "30px";
        cell.style.fontFamily = "'Caveat', cursive";
        cell.style.padding = "15px";
        cell.style.transition = "background-color 0.3s"; // Add transition effect

        // Check if it's a weekend (Saturday or Sunday)
        const isWeekend = j === 5 || j === 6;

        // Set the background color based on weekend or weekday
        cell.style.backgroundColor = isWeekend
          ? weekendBackgroundColor
          : weekdayBackgroundColor;
        cell.style.borderRadius = "50%"; // Make the background circular

        // Check if the current cell's date matches the current day
        if (
          date === currentDate.getDate() &&
          year === currentDate.getFullYear() &&
          month === currentDate.getMonth()
        ) {
          cell.style.border = "2px solid white"; // Add a white circular border
        }

        // Add a hover effect to change the background color slightly
        cell.addEventListener("mouseenter", function () {
          cell.style.backgroundColor = isWeekend
            ? "rgba(0, 0, 0, 1.0)" // Darken the background on hover for weekends
            : "rgba(0, 0, 0, 0.8)"; // Darken the background on hover for weekdays
        });

        // Reset the background color on hover out
        cell.addEventListener("mouseleave", function () {
          cell.style.backgroundColor = isWeekend
            ? weekendBackgroundColor
            : weekdayBackgroundColor; // Reset to original background color
        });

        row.appendChild(cell);
        date++;
      }
    }
    calendarTable.appendChild(row);
  }

  container.innerHTML = ""; // Clear the container before rendering
  container.appendChild(calendarTable);
}

document.addEventListener("DOMContentLoaded", function () {
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();

  const calendarContainer = document.getElementById("calendar");
  const prevMonthButton = document.getElementById("prevMonth");
  const nextMonthButton = document.getElementById("nextMonth");

  createCalendar(calendarContainer, currentYear, currentMonth);

  prevMonthButton.addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    createCalendar(calendarContainer, currentYear, currentMonth);
  });

  nextMonthButton.addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    createCalendar(calendarContainer, currentYear, currentMonth);
  });
});
