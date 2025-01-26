function createYearCalendar(container, year) {
  const daysOfWeek = ["P", "O", "T", "C", "P", "S", "Sv"];
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

  const currentDate = new Date(); // Get the current date

  const calendarTable = document.createElement("table");
  calendarTable.className = "year-calendar";

  const caption = document.createElement("caption");
  caption.textContent = year;
  caption.style.color = "white";
  caption.style.fontSize = "45px";
  caption.style.fontFamily = "'Caveat', cursive";
  caption.style.padding = "25px";
  calendarTable.appendChild(caption);

  const headerRow = document.createElement("tr");
  for (const dayOfWeek of daysOfWeek) {
    const th = document.createElement("th");
    th.textContent = dayOfWeek;
    th.style.color = "white";
    th.style.fontSize = "15px";
    th.style.fontFamily = "'Caveat', cursive";
    headerRow.appendChild(th);
  }
  calendarTable.appendChild(headerRow);

  const firstDayOfYear = new Date(year, 0, 1); // January 1st of the year
  const lastDayOfYear = new Date(year, 11, 31); // December 31st of the year
  const daysInYear = Math.ceil((lastDayOfYear - firstDayOfYear + 1) / (1000 * 60 * 60 * 24));

  let currentDay = firstDayOfYear;

  while (currentDay.getFullYear() === year) {
    const row = document.createElement("tr");

    for (let i = 0; i < 7; i++) {
      const cell = document.createElement("td");

      if (currentDay.getDay() === i && currentDay.getFullYear() === year) {
        cell.textContent = currentDay.getDate();
        cell.style.color = "white";
        cell.style.fontSize = "15px";
        cell.style.fontFamily = "'Caveat', cursive";
        cell.style.padding = "5px";
        cell.style.transition = "background-color 0.3s"; // Add transition effect

        // Check if it's a weekend (Saturday or Sunday)
        const isWeekend = i === 5 || i === 6;

        // Set the background color based on weekend or weekday
        cell.style.backgroundColor = isWeekend
          ? "rgba(0, 0, 0, 0.7)"
          : "rgba(0, 0, 0, 0.2)";
        cell.style.borderRadius = "50%"; // Make the background circular

        // Check if the current cell's date matches the current day
        if (
          currentDay.getDate() === currentDate.getDate() &&
          currentDay.getMonth() === currentDate.getMonth() &&
          currentDay.getFullYear() === currentDate.getFullYear()
        ) {
          cell.style.border = "2px solid white"; // Add a white circular border
        }

        // Add hover effects
        cell.addEventListener("mouseenter", function () {
          cell.style.backgroundColor = isWeekend
            ? "rgba(0, 0, 0, 1.0)"
            : "rgba(0, 0, 0, 0.8)";
        });

        cell.addEventListener("mouseleave", function () {
          cell.style.backgroundColor = isWeekend
            ? "rgba(0, 0, 0, 0.7)"
            : "rgba(0, 0, 0, 0.2)";
        });

        currentDay.setDate(currentDay.getDate() + 1); // Move to the next day
      }

      row.appendChild(cell);
    }

    calendarTable.appendChild(row);
  }

  container.innerHTML = ""; // Clear the container before rendering
  container.appendChild(calendarTable);
}

document.addEventListener("DOMContentLoaded", function () {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const calendarContainer = document.getElementById("calendar");

  createYearCalendar(calendarContainer, currentYear);
});
