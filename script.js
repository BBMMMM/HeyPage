function createScrollableCalendar(container, currentYear, currentMonth) {
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

  const currentDate = new Date();

  container.style.overflowY = "scroll";
  container.style.height = "90vh";

  const totalMonths = 23; // 11 months before and after the current month
  const startMonthIndex = currentMonth - 11;

  const calendarFragment = document.createDocumentFragment();

  for (let offset = 0; offset < totalMonths; offset++) {
    const monthIndex = (startMonthIndex + offset + 12) % 12;
    const year = currentYear + Math.floor((startMonthIndex + offset) / 12);

    const monthContainer = document.createElement("div");
    monthContainer.className = "month-container";
    monthContainer.style.margin = "20px 0";

    const monthHeader = document.createElement("div");
    monthHeader.textContent = `${monthNames[monthIndex]} ${year}`;
    monthHeader.style.color = "white";
    monthHeader.style.fontSize = "30px";
    monthHeader.style.fontFamily = "'Caveat', cursive";
    monthHeader.style.padding = "10px 0";
    monthContainer.appendChild(monthHeader);

    const monthTable = document.createElement("table");
    monthTable.className = "month-table";

    const headerRow = document.createElement("tr");
    for (const dayOfWeek of daysOfWeek) {
      const th = document.createElement("th");
      th.textContent = dayOfWeek;
      th.style.color = "white";
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

      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");

        if ((i === 0 && j < (firstDay === 0 ? 6 : firstDay - 1)) || date > daysInMonth) {
          row.appendChild(cell);
          continue;
        }

        cell.textContent = date;
        cell.style.color = "white";
        cell.style.fontSize = "15px";
        cell.style.fontFamily = "'Caveat', cursive";
        cell.style.padding = "10px";
        cell.style.transition = "background-color 0.3s";

        const isWeekend = j === 5 || j === 6;
        cell.style.backgroundColor = isWeekend ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.2)";
        cell.style.borderRadius = "50%";

        if (
          date === currentDate.getDate() &&
          monthIndex === currentDate.getMonth() &&
          year === currentDate.getFullYear()
        ) {
          cell.style.border = "2px solid white";
        }

        cell.addEventListener("mouseenter", function () {
          cell.style.backgroundColor = isWeekend ? "rgba(0, 0, 0, 1.0)" : "rgba(0, 0, 0, 0.8)";
        });

        cell.addEventListener("mouseleave", function () {
          cell.style.backgroundColor = isWeekend ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.2)";
        });

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

  const focusMonthOffset = 11; // Index of the current month in the displayed range
  const scrollPosition = container.scrollHeight * (focusMonthOffset / totalMonths);
  container.scrollTop = scrollPosition;
}

document.addEventListener("DOMContentLoaded", function () {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const calendarContainer = document.getElementById("calendar");

  createScrollableCalendar(calendarContainer, currentYear, currentMonth);
});
