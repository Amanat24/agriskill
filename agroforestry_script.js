// Toggle course descriptions
document.querySelectorAll('.course-item').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// Enroll button alert
document.getElementById('enrollBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior
    alert('Thank you for enrolling in the Agroforestry and Tree-Based Farming Course!');
});

// Show enroll form when "Enroll Now" button is clicked
document.getElementById('enrollBtn').addEventListener('click', function () {
    document.getElementById('enrollForm').style.display = 'block';
});

// Handle form submission
document.getElementById('enrollFormContent').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting

    // Hide the form and show the confirmation message
    document.getElementById('enrollForm').style.display = 'none';
    document.getElementById('confirmationMessage').style.display = 'block';

    // Optional: You can send the form data to your server here
    const formData = new FormData(event.target);
    console.log('Form Data:', Object.fromEntries(formData));
});