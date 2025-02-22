document.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
        let thirdRow = event.target.closest(".third-row"); 
        if (thirdRow) {
            let hr = thirdRow.previousElementSibling; 

            if (hr && hr.tagName === "HR") {
                hr.remove(); 
            }
            thirdRow.remove(); 
            alert("Clinic deleted.");
        }
    }
});
