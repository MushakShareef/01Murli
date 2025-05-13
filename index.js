

window.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById("dateInput");
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;

    // Function to scroll to the selected date section (optional if you use IDs in loaded HTML)
    function scrollToSectionByDate(date) {
        const section = document.getElementById(date);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        } else {
            console.warn("No section found for date:", date);
        }
    }

    // Load content when date changes
    dateInput.addEventListener("change", function () {
        const selectedDate = this.value;
        loadContentForDate(selectedDate);
        scrollToSectionByDate(selectedDate);
    });

    // ✅ Function to load content into .MurliBody with correct folder path
    function loadContentForDate(date) {
        const murliBody = document.querySelector(".MurliBody");

            const figure = document.querySelector("figure");

    if (figure && !figure.classList.contains("fade-out")) {
        figure.classList.add("fade-out");

        // Optional: Completely remove it after fade (e.g., after 2s)
        setTimeout(() => {
            figure.style.display = "none";
        }, 2000); // wait for fade animation to complete
    }


        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // JS months: 0–11
        const formattedMonthFolder = `${month}.${year}`;
        const fileName = `${date}.html`;

        const url = `/${year}/${formattedMonthFolder}/${fileName}`; // 👈 Dynamic path like /2025/05.2025/2025-05-13.html

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error("Unable to load content for date: " + date);
                }
            })
            .then(content => {
                murliBody.innerHTML = content;
            })
            .catch(error => {
                console.error(error);
                murliBody.innerHTML = "<p>Error loading content. Please try again later.</p>";
            });
    }

    // Load today's content on initial page load
    setTimeout(() => {
        const selectedDate = dateInput.value || today;
        loadContentForDate(selectedDate);
        scrollToSectionByDate(selectedDate);
    }, 100); // Wait for DOM readiness
});
