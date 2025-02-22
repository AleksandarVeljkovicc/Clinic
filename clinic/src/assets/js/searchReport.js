document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const reportTypes = document.getElementById("report-types");
    const reports = document.querySelectorAll(".third-row");

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase(); 
        const selectedType = reportTypes.value.trim().toLowerCase(); 

        reports.forEach(report => {
            const firstParagraph = report.querySelector("p:first-of-type"); 
            const thirdParagraph = report.querySelector("p:nth-of-type(3)"); 
            const hrAbove = report.previousElementSibling; 
            const hrBelow = report.nextElementSibling; 

            if (firstParagraph && thirdParagraph) {
                const text = firstParagraph.textContent.trim().toLowerCase();
                
                const thirdText = thirdParagraph.cloneNode(true); 
                thirdText.querySelectorAll("*").forEach(el => el.remove()); // Remove all chiled html tags
                const cleanThirdText = thirdText.textContent.trim().toLowerCase();

                const matchesType = selectedType ? cleanThirdText === selectedType : true;
                const matchesQuery = text.includes(query); 

                if (matchesQuery && matchesType) {
                    report.style.display = "flex"; 
                } else {
                    report.style.display = "none"; 
                }

                if (hrAbove && hrAbove.tagName.toLowerCase() === 'hr') {
                    hrAbove.style.display = (matchesQuery && matchesType) ? "block" : "none"; 
                }
                if (hrBelow && hrBelow.tagName.toLowerCase() === 'hr') {
                    if (reports.length > 1 || (matchesQuery && matchesType)) {
                        hrBelow.style.display = (matchesQuery && matchesType) ? "block" : "none"; 
                    } else {
                        hrBelow.style.display = "none"; 
                    }
                }
            }
        });
    });
});
