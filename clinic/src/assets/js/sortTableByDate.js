function sortTableByDate() {
    const tableBody = document.querySelector('tbody');
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        const dateA = new Date(a.cells[2].textContent.trim());
        const dateB = new Date(b.cells[2].textContent.trim());

        return dateB - dateA;
    });

    rows.forEach(row => tableBody.appendChild(row));
}

sortTableByDate();
