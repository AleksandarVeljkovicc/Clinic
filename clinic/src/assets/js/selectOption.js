document.querySelectorAll('.radio-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.radio-option').forEach(opt => {
            opt.style.backgroundColor = '#e0e0e0'; 
            opt.querySelector('input').checked = false;
        });

        option.style.backgroundColor = 'white'; 
        option.querySelector('input').checked = true;

        const isWithCaretakers = document.querySelector('input[value="with"]').checked;

        document.querySelectorAll('.patient-aprrove-reject').forEach(div => {
            const hasCaretakerText = Array.from(div.querySelectorAll('p')).some(p => p.textContent.includes('Caretaker'));

            if (isWithCaretakers) {
                div.style.display = hasCaretakerText ? 'block' : 'none';
            } else {
                div.style.display = hasCaretakerText ? 'none' : 'block';
            }
        });
    });
});
