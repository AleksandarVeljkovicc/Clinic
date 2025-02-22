document.getElementById('report-types').addEventListener('change', function() {
    let selectedValue = this.value;
    let reportDivs = document.querySelectorAll('.third-row');
    
    reportDivs.forEach(function(div) {
        let reportTypeText = div.querySelector('p:nth-child(3)').textContent.trim();

        let hrAbove = div.previousElementSibling;
        let hrBelow = div.nextElementSibling;
        
        if (selectedValue && reportTypeText !== selectedValue) {
            div.style.display = 'none';
            if (hrAbove && hrAbove.tagName.toLowerCase() === 'hr') {
                hrAbove.style.display = 'none';
            }
            if (hrBelow && hrBelow.tagName.toLowerCase() === 'hr') {
                hrBelow.style.display = 'none';
            }
        } else {
            div.style.display = 'flex';  
            if (hrAbove && hrAbove.tagName.toLowerCase() === 'hr') {
                hrAbove.style.display = 'block';
            }
            if (hrBelow && hrBelow.tagName.toLowerCase() === 'hr') {
                hrBelow.style.display = 'block';
            }
        }
    });
});
