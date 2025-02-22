document.addEventListener("DOMContentLoaded", function () {
    fetch('/public/externalHTML/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const mainContent = document.querySelector('.main-content'); 
            if (mainContent) {
                mainContent.insertAdjacentHTML('afterbegin', data); 
                
                // sets h1 value to be the same as title
                const pageTitle = document.title;
                const headerTitle = document.getElementById('header-title');
                if (headerTitle) {
                    headerTitle.textContent = pageTitle;
                }
            } else {
                console.error("error: .main-content div not found!");
            }
        })
        .catch(error => console.error('Error ocured while loading header:', error));
});
