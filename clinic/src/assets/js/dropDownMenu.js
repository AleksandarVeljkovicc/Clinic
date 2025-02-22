document.addEventListener('click', function (e) {
    if (e.target.closest('.dropdown-toggle')) {
        const dropdown = e.target.closest('.dropdown');
        dropdown.classList.toggle('open');
        e.stopPropagation();
    }

    if (e.target.closest('.dropdown-item')) {
        const item = e.target.closest('.dropdown-item');
        const value = item.getAttribute('data-value');
        console.log('Selected value:', value);

        const dropdown = item.closest('.dropdown');
        dropdown.classList.remove('open');
    }

    document.querySelectorAll('.dropdown.open').forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });
});
