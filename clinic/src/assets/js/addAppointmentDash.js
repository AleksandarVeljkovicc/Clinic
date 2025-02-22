const addAppointmentBtn = document.getElementById('addAppointmentBtn');
  const overlay = document.getElementById('overlay');
  const cancelBtn = document.getElementById('cancelBtn');
  const appointmentForm = document.getElementById('appointmentForm');

  addAppointmentBtn.addEventListener('click', () => {
    overlay.style.display = 'block';
  });

  cancelBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
      appointmentForm.reset();
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.style.display = 'none';
    }
  });

  appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();  

    if (!validateForm()) {
        return;
    }
    alert("Patient added");

    overlay.style.display = 'none';

    const patientName = document.getElementById('patientName').value;
    const doctorName = document.getElementById('doctorName').value;
    const appointmentTime = document.getElementById('appointmentTime').value;

    const newAppointment = document.createElement('div');
    newAppointment.classList.add('appointment-time-person');

    const timeParts = appointmentTime.split(':');
    let hours = parseInt(timeParts[0]);
    let minutes = timeParts[1];
    let period = hours >= 12 ? 'PM' : 'AM';

    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    newAppointment.innerHTML = `
        <div class="left-section">
            <p>${formattedHours}:${formattedMinutes} ${period}</p>   
            <p>${patientName}</p>
        </div>
        <div class="right-section">
            <p>Dr. ${doctorName}</p>
        </div>
    `;

    const appointmentsList = document.querySelector('.fixed-div');
    appointmentsList.appendChild(newAppointment)[0];

    appointmentForm.reset();
});


  function validateForm() {
    const patientName = document.getElementById('patientName');
    const doctorName = document.getElementById('doctorName');

    let errors = [];

    const fields = [
      { field: patientName, name: "Patient full name" },
      { field: doctorName, name: "Doctor full name" },
    ];

    fields.forEach(field => {
      if (!field.field.value.trim()) {
        errors.push(`${field.name} is required.`);
      }
    });

    const invalidChars = /[<>'"^%&]/;
    fields.forEach(field => {
      if (invalidChars.test(field.field.value)) {
        errors.push(`${field.name} contains invalid characters.`);
      }
    });

    if (patientName.value.trim().length < 3 || patientName.value.trim().length > 20) {
      errors.push("Patient name must be between 3 and 20 characters.");
    }

    if (doctorName.value.trim().length < 3 || doctorName.value.trim().length > 20) {
      errors.push("Doctor name must be between 3 and 20 characters.");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return false;
    }

    return true;
  }