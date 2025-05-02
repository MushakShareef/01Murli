
window.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById("dateInput");
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;

    // Function to scroll to the selected date section
    function scrollToSectionByDate(date) {
        const section = document.getElementById(date);
        if (section) {
            section.scrollIntoView({ behavior: "auto" });
        } else {
            console.warn("No section found for date:", date);
        }
    }

    // Scroll to the selected date section when user changes the date
    dateInput.addEventListener("change", function () {
        scrollToSectionByDate(this.value);
    });

    // Scroll to the date from the date input (today or previously selected)
    setTimeout(() => {
        const selectedDate = dateInput.value || today;
        scrollToSectionByDate(selectedDate);
    }, 100);  // Timeout to ensure everything is loaded
});