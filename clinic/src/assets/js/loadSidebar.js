document.addEventListener("DOMContentLoaded", function () {
    fetch('/public/externalHTML/sidebar.html') 
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const body = document.body; 
            if (body) {
                body.insertAdjacentHTML('afterbegin', data); 

                const collapseIcon = document.getElementById("collapse-icon");
                const sidebar = document.querySelector(".sidebar");

                if (collapseIcon && sidebar) {
                    collapseIcon.addEventListener("click", () => {
                        sidebar.classList.toggle("collapsed");
                        const icon = collapseIcon.querySelector("i");

                        if (sidebar.classList.contains("collapsed")) {
                            icon.classList.remove("fa-chevron-left");
                            icon.classList.add("fa-chevron-right");

                            document.querySelectorAll('#nav-links li a span').forEach(span => {
                                span.style.display = 'none';
                            });
                        } else {
                            icon.classList.remove("fa-chevron-right");
                            icon.classList.add("fa-chevron-left");

                            document.querySelectorAll('#nav-links li a span').forEach(span => {
                                span.style.display = 'inline';
                            });
                        }
                    });
                } else {
                    console.error("Error: Sidebar or collapse ikon not found!");
                }
            }
        })
        .catch(error => console.error('Error ocured while loading sidebar:', error));
});
