// Get all the accordion headers
const accordionHeaders = document.querySelectorAll('.accordion-header');

// Add event listener to each accordion header
accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
        // Toggle the active state of the clicked header
        const body = this.nextElementSibling;
        
        // Close all other open bodies
        document.querySelectorAll('.accordion-body').forEach(body => {
            if (body !== this.nextElementSibling) {
                body.style.display = 'none';
            }
        });
        
        // Toggle the clicked accordion body
        if (body.style.display === 'block') {
            body.style.display = 'none';
        } else {
            body.style.display = 'block';
        }
    });
});
