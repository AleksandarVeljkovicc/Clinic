document.querySelectorAll(".third-row").forEach((row, index) => {
    row.dataset.id = index;
});

document.addEventListener("click", function (event) {
    if (event.target.id === "add-clinic") {
        openAddClinicForm();
    } else if (event.target.classList.contains("edit-btn")) {
        const clinicDiv = event.target.closest(".third-row");
        openEditClinicForm(clinicDiv);
    }
});

//Add clinic function
function openAddClinicForm() {
    const popupForm = document.getElementById("popup-form");
    popupForm.style.display = "flex";

    const form = document.getElementById("new-clinic-form");
    const addedServicesList = document.getElementById("added-services-list");

    document.getElementById("add-service").addEventListener("click", function () {
        const serviceInput = document.getElementById("service-input");
        const serviceValue = serviceInput.value.trim();

        if (serviceValue) {
            const li = document.createElement("li");
            li.textContent = serviceValue;

            const removeButton = document.createElement("span");
            removeButton.textContent = "\u2716";
            removeButton.classList.add("remove-btn");
            removeButton.addEventListener("click", function () {
                li.remove();
            });

            li.appendChild(removeButton);
            addedServicesList.appendChild(li);
            serviceInput.value = "";
        }
    });

    form.addEventListener("submit", handleFormSubmit);

    document.getElementById("cancel-popup").addEventListener("click", function () {
        form.reset();
        addedServicesList.innerHTML = "";
        popupForm.style.display = "none";
    });
}

function validateFormAdd() {
    const errors = [];
    const clinicName = document.getElementById("clinic-name");
    const specialization = document.getElementById("specialization");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const postalCode = document.getElementById("postal-code");
    const phoneNumber = document.getElementById("phone-number");
    const email = document.getElementById("email");
    const operatingHoursStart = document.getElementById("operating-hours-start");
    const operatingHoursEnd = document.getElementById("operating-hours-end");

    const fields = [
        { field: clinicName, name: "Clinic Name" },
        { field: specialization, name: "Specialization" },
        { field: address, name: "Address" },
        { field: city, name: "City" },
        { field: postalCode, name: "Postal Code" },
        { field: phoneNumber, name: "Phone Number" },
        { field: email, name: "Email" },
        { field: operatingHoursStart, name: "Operating Hours Start" },
        { field: operatingHoursEnd, name: "Operating Hours End" }
    ];

    fields.forEach(field => {
        if (!field.field.value.trim()) {
            errors.push(`${field.name} is required.`);
        }
    });

    const invalidChars = /[<>'"^%&]/;
    fields.forEach(field => {
        if (invalidChars.test(field.field.value)) {
            errors.push(`${field.name} contains invalid characters`);
        }
    });

    if (clinicName.value.trim().length < 3 || clinicName.value.trim().length > 50) {
        errors.push("Clinic Name must be between 3 and 50 characters.");
    }

    if (!/^\d{10}$/.test(phoneNumber.value.trim())) {
        errors.push("Phone Number must be 10 digits.");
    }

    if (!/^\d{5}$/.test(postalCode.value.trim())) {
        errors.push("Postal Code must be 5 digits.");
    }

    if (!/\S+@\S+\.\S+/.test(email.value.trim())) {
        errors.push("Email is invalid.");
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }

    return true;
}


function handleFormSubmit(event) {
    event.preventDefault();

    if (!validateFormAdd()) {
        return; 
    }

    const clinicName = document.getElementById("clinic-name").value;
    const specialization = document.getElementById("specialization").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const postalCode = document.getElementById("postal-code").value;
    const phoneNumber = document.getElementById("phone-number").value;
    const email = document.getElementById("email").value;
    const operatingHoursStart = document.getElementById("operating-hours-start").value;
    const operatingHoursEnd = document.getElementById("operating-hours-end").value;
    const addedServicesList = document.getElementById("added-services-list");
    const services = Array.from(addedServicesList.children).map(li => li.textContent.replace("\u2716", "").trim());
    const is24_7 = document.getElementById("service-24-7").checked;
    const acceptsEmergency = document.getElementById("accepts-emergency").checked;

    function formatTime(time) {
        const [hour, minute] = time.split(":");
        const hourInt = parseInt(hour, 10);
        const period = hourInt >= 12 ? "PM" : "AM";
        const formattedHour = hourInt % 12 || 12;
        return `${formattedHour}:${minute} ${period}`;
    }

    const clinicDiv = document.createElement("div");
    clinicDiv.classList.add("third-row");

    const existingRows = document.querySelectorAll(".third-row");
    const lastId = existingRows.length > 0 ? parseInt(existingRows[existingRows.length - 1].dataset.id) : -1;
    clinicDiv.dataset.id = lastId + 1;

    const firstColumn = document.createElement("div");
    firstColumn.classList.add("first-colum-third-row");
    let emergencyHtml = "";

    if (is24_7 || acceptsEmergency) {
        emergencyHtml = `
            <div class="emergency-24/7-div">
                ${is24_7 ? `<p class="service-24-7">24/7</p>` : ""}
                ${acceptsEmergency ? `<p class="accepts-emergency">Emergency Care</p>` : ""}
            </div>
        `;
    }

    firstColumn.innerHTML = `
        <p>${clinicName}</p>
        <p>${specialization}</p>
        ${emergencyHtml}
    `;

    const secondColumn = document.createElement("div");
    secondColumn.classList.add("second-colum-third-row");
    secondColumn.innerHTML = `
        <p>${address}</p>
        <p>${city}, ${postalCode}</p>
    `;

    const thirdColumn = document.createElement("div");
    thirdColumn.classList.add("second-colum-third-row");
    thirdColumn.innerHTML = `
        <p>${phoneNumber}</p>
        <p>${email}</p>
    `;

    const fourthColumn = document.createElement("div");
    fourthColumn.classList.add("forth-colum-third-row");
    const servicesList = services.length > 0 ? services.map(service => `<li>${service}</li>`).join('') : "<li>No services listed</li>";
    fourthColumn.innerHTML = `<ul>${servicesList}</ul>`;

    const fifthColumn = document.createElement("div");
    fifthColumn.classList.add("fift-colum-third-row");

    if (operatingHoursStart && operatingHoursEnd) {
        fifthColumn.innerHTML = `<p>Monday - Friday: ${formatTime(operatingHoursStart)} - ${formatTime(operatingHoursEnd)}</p>`;
    } else {
        fifthColumn.innerHTML = `<p>Operating hours not set</p>`;
    }

    const actionButtons = document.createElement("div");
    actionButtons.innerHTML = `
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;

    clinicDiv.appendChild(firstColumn);
    clinicDiv.appendChild(secondColumn);
    clinicDiv.appendChild(thirdColumn);
    clinicDiv.appendChild(fourthColumn);
    clinicDiv.appendChild(fifthColumn);
    clinicDiv.appendChild(actionButtons);

    const wrapper = document.getElementById("wrapper");
    const lastChild = wrapper.lastElementChild;

    if (!lastChild || lastChild.tagName !== "HR") {
        const hr = document.createElement("hr");
        wrapper.appendChild(hr);
    }

    wrapper.appendChild(clinicDiv);
    alert("New clinic has been added.");

    const popupForm = document.getElementById("popup-form");
    popupForm.style.display = "none";

    const form = document.getElementById("new-clinic-form");
    form.reset();
    addedServicesList.innerHTML = "";
}



/*Edit clinic*/
function openEditClinicForm(clinicDiv) {
    const firstCol = clinicDiv.children[0];
    document.getElementById("clinic-name1").value = firstCol.children[0].textContent;
    document.getElementById("specialization1").value = firstCol.children[1].textContent;

    const emergencyDiv = firstCol.querySelector(".emergency-24\\/7-div");
    if (emergencyDiv) {
        const emergencyChildren = emergencyDiv.children;
        document.getElementById("service-24-71").checked = false;
        document.getElementById("accepts-emergency1").checked = false;

        for (let i = 0; i < emergencyChildren.length; i++) {
            if (emergencyChildren[i].classList.contains("service-24-7")) {
                document.getElementById("service-24-71").checked = true;
            }
            if (emergencyChildren[i].classList.contains("accepts-emergency")) {
                document.getElementById("accepts-emergency1").checked = true;
            }
        }
    } else {
        document.getElementById("service-24-71").checked = false;
        document.getElementById("accepts-emergency1").checked = false;
    }

    const secondCol1 = clinicDiv.children[1];
    document.getElementById("address1").value = secondCol1.children[0].textContent;
    const cityPostal = secondCol1.children[1].textContent.split(",");
    document.getElementById("city1").value = cityPostal[0].trim();
    document.getElementById("postal-code1").value = cityPostal[1]?.trim() || "";

    const secondCol2 = clinicDiv.children[2];
    document.getElementById("phone-number1").value = secondCol2.children[0].textContent;
    document.getElementById("email1").value = secondCol2.children[1].textContent;

    const forthCol = clinicDiv.children[3];
    const servicesList = forthCol.querySelector("ul");
    const addedServicesList = document.getElementById("added-services-list1");
    addedServicesList.innerHTML = ""; 

    servicesList.querySelectorAll("li").forEach(service => {
        const li = document.createElement("li");
        li.textContent = service.textContent;

        const removeButton = document.createElement("span");
        removeButton.textContent = "\u2716"; 
        removeButton.classList.add("remove-btn");
        removeButton.addEventListener("click", function () {
            li.remove();
        });

        li.appendChild(removeButton);
        addedServicesList.appendChild(li);
    });

    const fiftCol = clinicDiv.children[4];
    const operatingHoursText = fiftCol.children[0].textContent;

    const timeMatch = operatingHoursText.match(/(\d{1,2}):?(\d{2})?\s?(AM|PM)\s*-\s*(\d{1,2}):?(\d{2})?\s?(AM|PM)/);

    if (timeMatch) {
        const startHour = timeMatch[1];
        const startMinute = timeMatch[2] || "00";
        const startPeriod = timeMatch[3];
        const endHour = timeMatch[4];
        const endMinute = timeMatch[5] || "00";
        const endPeriod = timeMatch[6];

        const convertTo24Hour = (hour, minute, period) => {
            hour = parseInt(hour);
            if (period === "PM" && hour !== 12) {
                hour += 12;
            } else if (period === "AM" && hour === 12) {
                hour = 0;
            }
            return hour.toString().padStart(2, '0') + ":" + minute;
        };

        document.getElementById("operating-hours-start1").value = convertTo24Hour(startHour, startMinute, startPeriod);
        document.getElementById("operating-hours-end1").value = convertTo24Hour(endHour, endMinute, endPeriod);
    }

    const popupForm = document.getElementById("popup-form1");
    popupForm.style.display = "flex";
    popupForm.dataset.clinicRow = clinicDiv.dataset.id;
}

document.getElementById("cancel-popup1").addEventListener("click", function () {
    document.getElementById("popup-form1").style.display = "none";

    const form = document.getElementById("new-clinic-form1");
    form.reset();
    document.getElementById("added-services-list1").innerHTML = ""; 
});

function validateFormEdit() {
    const errors = [];
    const clinicName = document.getElementById("clinic-name1");
    const specialization = document.getElementById("specialization1");
    const address = document.getElementById("address1");
    const city = document.getElementById("city1");
    const postalCode = document.getElementById("postal-code1");
    const phoneNumber = document.getElementById("phone-number1");
    const email = document.getElementById("email1");
    const operatingHoursStart = document.getElementById("operating-hours-start1");
    const operatingHoursEnd = document.getElementById("operating-hours-end1");

    const fields = [
        { field: clinicName, name: "Clinic Name" },
        { field: specialization, name: "Specialization" },
        { field: address, name: "Address" },
        { field: city, name: "City" },
        { field: postalCode, name: "Postal Code" },
        { field: phoneNumber, name: "Phone Number" },
        { field: email, name: "Email" },
        { field: operatingHoursStart, name: "Operating Hours Start" },
        { field: operatingHoursEnd, name: "Operating Hours End" }
    ];

    fields.forEach(field => {
        if (!field.field.value.trim()) {
            errors.push(`${field.name} is required.`);
        }
    });

    const invalidChars = /[<>'"^%&]/;
    fields.forEach(field => {
        if (invalidChars.test(field.field.value)) {
            errors.push(`${field.name} contains invalid characters`);
        }
    });

    if (clinicName.value.trim().length < 3 || clinicName.value.trim().length > 50) {
        errors.push("Clinic Name must be between 3 and 50 characters.");
    }

    if (!/^\d{10}$/.test(phoneNumber.value.trim())) {
        errors.push("Phone Number must be 10 digits.");
    }

    if (!/^\d{5}$/.test(postalCode.value.trim())) {
        errors.push("Postal Code must be 5 digits.");
    }

    if (!/\S+@\S+\.\S+/.test(email.value.trim())) {
        errors.push("Email is invalid.");
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }

    return true;
}

document.getElementById("new-clinic-form1").addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validateFormEdit()) {
        return; 
    }

    const popupForm = document.getElementById("popup-form1");
    const clinicDiv = document.querySelector(`.third-row[data-id='${popupForm.dataset.clinicRow}']`);

    if (!clinicDiv) return;

    const firstCol = clinicDiv.children[0];
    firstCol.children[0].textContent = document.getElementById("clinic-name1").value;
    firstCol.children[1].textContent = document.getElementById("specialization1").value;

    let emergencyDiv = firstCol.querySelector(".emergency-24\\/7-div");
    const is24_7 = document.getElementById("service-24-71").checked;
    const isEmergency = document.getElementById("accepts-emergency1").checked;

    if (is24_7 || isEmergency) {
        if (!emergencyDiv) {
            emergencyDiv = document.createElement("div");
            emergencyDiv.classList.add("emergency-24/7-div");
            firstCol.appendChild(emergencyDiv);
        }
        emergencyDiv.innerHTML = "";
        if (is24_7) {
            const p1 = document.createElement("p");
            p1.textContent = "24/7";
            p1.classList.add("service-24-7");
            emergencyDiv.appendChild(p1);
        }
        if (isEmergency) {
            const p2 = document.createElement("p");
            p2.textContent = "Emergency Care";
            p2.classList.add("accepts-emergency");
            emergencyDiv.appendChild(p2);
        }
    } else if (emergencyDiv) {
        emergencyDiv.remove();
    }

    clinicDiv.children[1].children[0].textContent = document.getElementById("address1").value;
    clinicDiv.children[1].children[1].textContent = `${document.getElementById("city1").value}, ${document.getElementById("postal-code1").value}`;
    clinicDiv.children[2].children[0].textContent = document.getElementById("phone-number1").value;
    clinicDiv.children[2].children[1].textContent = document.getElementById("email1").value;

    const startTime = document.getElementById("operating-hours-start1").value;
    const endTime = document.getElementById("operating-hours-end1").value;

    const formatTimeWithoutSeconds = (time) => {
        let [hour, minute] = time.split(":");
        hour = parseInt(hour);
        let period = "AM";
        if (hour >= 12) {
            period = "PM";
            if (hour > 12) hour -= 12;
        } else if (hour === 0) {
            hour = 12;
        }
        return `${hour}:${minute} ${period}`;
    };

    clinicDiv.children[4].children[0].textContent = `Monday - Friday: ${formatTimeWithoutSeconds(startTime)}-${formatTimeWithoutSeconds(endTime)}`;

    const servicesList = clinicDiv.querySelector(".forth-colum-third-row ul");
    servicesList.innerHTML = "";
    const newServices = [...document.querySelectorAll("#added-services-list1 li")];

    newServices.forEach(service => {
        const li = document.createElement("li");
        li.textContent = service.textContent.replace("\u2716", "").trim(); 

        servicesList.appendChild(li);
    });
    alert("Clinic information has been changed.");

    popupForm.style.display = "none";

    const form = document.getElementById("new-clinic-form1");
    form.reset();
    document.getElementById("added-services-list1").innerHTML = ""; 
});

const addedServicesList = document.getElementById("added-services-list1");

document.getElementById("add-service1").addEventListener("click", function () {
    const serviceInput = document.getElementById("service-input1");
    const serviceValue = serviceInput.value.trim();

    if (serviceValue) {
        const li = document.createElement("li");
        li.textContent = serviceValue;

        const removeButton = document.createElement("span");
        removeButton.textContent = "\u2716"; 
        removeButton.classList.add("remove-btn");
        removeButton.addEventListener("click", function () {
            li.remove();
        });

        li.appendChild(removeButton);
        addedServicesList.appendChild(li);

        serviceInput.value = "";
    }
});