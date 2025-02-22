document.getElementById('search').addEventListener('keyup', function() {
    const searchValue = this.value.toLowerCase();
    const tableRows = document.querySelectorAll('tbody tr');

    tableRows.forEach(row => {
        const patientCell = row.querySelector('td strong');
        if (patientCell) {
            const patientName = patientCell.textContent.toLowerCase();
            if (patientName.includes(searchValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
});
