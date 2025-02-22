document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('open-form-btn').addEventListener('click', () => {
        document.getElementById('appointment-form-container').classList.remove('hidden');
    });

    document.getElementById('cancel-btn').addEventListener('click', () => {
        document.getElementById('appointment-form-container').classList.add('hidden');
    });

    document.getElementById('appointment-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const patientName = document.getElementById('patient-name').value;
        const doctorName = document.getElementById('doctor-name').value;
        const appointmentDate = document.getElementById('appointment-date').value;
        let appointmentTime = document.getElementById('appointment-time').value;
        const appointmentType = document.getElementById('appointment-type').value;

        let [hours, minutes] = appointmentTime.split(':');
        let period = 'AM';
        hours = parseInt(hours);
        if (hours >= 12) {
            period = 'PM';
            if (hours > 12) hours -= 12;
        }
        if (hours === 0) {
            hours = 12;
        }
        hours = hours.toString().padStart(2, '0');
        appointmentTime = `${hours}:${minutes} ${period}`;

        const tableBody = document.querySelector('table tbody');
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td><strong>${patientName}</strong></td>
            <td>${doctorName}</td>
            <td>${appointmentDate}</td>
            <td>${appointmentTime}</td>
            <td>${appointmentType}</td>
            <td><span class="status scheduled">Scheduled</span></td>
            <td>
                <div class="dropdown">
                    <div class="dropdown-toggle">
                        <i class="fa-solid fa-ellipsis-v"></i>
                    </div>
                    <div class="dropdown-menu">
                        <div class="dropdown-item" data-value="edit">Edit</div>
                        <div class="dropdown-item" data-value="cancel">Cancel</div>
                    </div>
                </div>
            </td>
        `;

        tableBody.appendChild(newRow);

        sortTableByDate();

        document.getElementById('appointment-form').reset();

        document.getElementById('appointment-form-container').classList.add('hidden');
        alert("Appointment added");
    });
});
