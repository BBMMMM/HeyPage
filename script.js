function createCalendar(container, year, month) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const monthNames = [
        "Janvāris", "Februāris", "Marts", "Aprīlis",
        "Maijs", "Jūnijs", "Jūlijs", "Augusts",
        "Septembris", "Oktobris", "Novemberis", "Decembris"
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

                // Check if it's Saturday (j === 5) or Sunday (j === 6) and add a circular background
                if (j === 5 || j === 6) {
                    cell.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
                    cell.style.borderRadius = "50%"; // Make the background circular
                }

                row.appendChild(cell);
                date++;
            }
        }
        calendarTable.appendChild(row);
    }

    container.appendChild(calendarTable);
}

// Get the current date to determine the current month and year
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

// Call the createCalendar function with the current year and month
const calendarContainer = document.getElementById("calendar");
createCalendar(calendarContainer, currentYear, currentMonth);
