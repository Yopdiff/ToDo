const container = document.querySelector('.container');
let currentDate = new Date();

function updateMonthDisplay() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    const currentMonthIndex = currentDate.getMonth();
    const currentMonthName = monthNames[currentMonthIndex];
    const currentYear = currentDate.getFullYear();
    document.getElementById('currentMonth').textContent = `${currentMonthName} ${currentYear}`;

    // Update the dropdown to reflect the current month and year
    const monthDropdown = document.getElementById('month');
    monthDropdown.value = currentMonthIndex + 1; // Assuming the dropdown values are 1-indexed (1 for January, 12 for December)
}

function changeMonth(offset) {
    const originalDay = currentDate.getDate(); // Store the original day
    currentDate.setDate(1); // Set the day to the 1st to avoid overflow
    currentDate.setMonth(currentDate.getMonth() + offset); // Change the month

    // Set the date back to the original day, or the last day of the new month if the original day is too high
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    currentDate.setDate(Math.min(originalDay, daysInMonth));

    updateMonthDisplay();
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

// Update the month when the dropdown selection changes
document.getElementById('month').addEventListener('change', function(event) {
    const selectedMonth = parseInt(event.target.value, 10) - 1; // Convert back to 0-indexed
    const currentYear = currentDate.getFullYear();
    currentDate.setMonth(selectedMonth);
    currentDate.setFullYear(currentYear); // Ensure the year is consistent
    updateMonthDisplay();
});

document.getElementById('prevMonth').addEventListener('click', function() {
    changeMonth(-1);
});

document.getElementById('nextMonth').addEventListener('click', function() {
    changeMonth(1);
});

updateMonthDisplay();

function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const numberOfDays = new Date(year, month + 1, 0).getDate();

    const calendarContainer = document.querySelector('.container');
    calendarContainer.innerHTML = ''; // Clear the previous calendar

    let row = document.createElement('div');
    row.className = 'row';

    // Fill in the days of the month
    for (let day = 1; day <= numberOfDays; day++) {
        if ((day + firstDay - 1) % 7 === 0 || day === 1) { // Start a new row after every 7 days or if it's the first day
            if (day > 1) { // Don't append an empty row before the first day
                calendarContainer.appendChild(row);
            }
            row = document.createElement('div');
            row.className = 'row';
            if (day === 1) {
                // Add offset for the first day of the month
                for (let i = 0; i < firstDay; i++) {
                    const offsetDiv = document.createElement('div');
                    offsetDiv.className = 'day offset'; // Use 'offset' class to style or hide these cells
                    row.appendChild(offsetDiv);
                }
            }
        }
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = day;
        row.appendChild(dayElement);
    }
    const totalCells = firstDay + numberOfDays; // Total cells used by days of the month and starting offsets
    const postOffset = 7 - (totalCells % 7); // Calculate how many cells are needed to complete the last row
    if (postOffset < 7) { // If the last row is already complete, no need to add offsets
        for (let i = 0; i < postOffset; i++) {
            const offsetDiv = document.createElement('div');
            offsetDiv.className = 'day offset'; // Use the same 'offset' class
            row.appendChild(offsetDiv);
        }
    }

    calendarContainer.appendChild(row);
}