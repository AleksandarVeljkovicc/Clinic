const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function updateCalendar() {
    const dates = document.getElementById('dates');
    const monthYear = document.getElementById('monthYear');
    dates.innerHTML = '';
    monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        dates.appendChild(emptyDiv);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const div = document.createElement('div');
        div.classList.add('date');
        div.textContent = i;
        div.onclick = (event) => {
            event.stopPropagation();
            selectDate(div);
            filterTableByDate(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`);
        };
        dates.appendChild(div);
    }
}

function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
}

function selectDate(el) {
    document.querySelectorAll('.date').forEach(date => date.classList.remove('selected'));
    el.classList.add('selected');
}

document.addEventListener('click', () => {
    document.querySelectorAll('.date').forEach(date => date.classList.remove('selected'));
    filterTableByDate('');
});

function filterTableByDate(date) {
    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
        const cellDate = row.cells[2].textContent;
        if (date === '' || cellDate === date) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

updateCalendar();
