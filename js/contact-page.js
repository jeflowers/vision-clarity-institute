/**
 * Vision Clarity Institute - Contact Page Enhancements
 * Script to enhance the contact page functionality and match Image 2 design behaviors
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            // Update ARIA attributes for accessibility
            const isExpanded = navList.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Form validation enhancements
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validate form fields
            const isValid = validateForm(contactForm);
            
            if (isValid) {
                // Simulate form submission
                submitForm(contactForm);
            }
        });

        // Add input validation feedback
        const inputFields = contactForm.querySelectorAll('input, select, textarea');
        inputFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(field);
            });
        });
    }

    // Initialize language selector change event
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            // Language change is handled by i18n.js, but we can add specific
            // contact page adjustments here if needed
        });
    }

    // Add map interaction if placeholder map is clicked
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.addEventListener('click', function() {
            // Placeholder for map interaction enhancement
            // In a real implementation, this might open a full map view or directions
        });
    }
});

/**
 * Validate the entire form
 * @param {HTMLFormElement} form - The form element to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Validate a single form field
 * @param {HTMLElement} field - The field to validate
 * @returns {boolean} - Whether the field is valid
 */
function validateField(field) {
    // Remove any existing error messages
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Remove error styling
    field.classList.remove('error');
    
    // Skip validation if the field is not required and empty
    if (!field.required && field.value === '') {
        return true;
    }
    
    let isValid = field.checkValidity();
    
    // Additional custom validation rules
    if (field.type === 'email' && field.value !== '') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailPattern.test(field.value);
    }
    
    if (field.type === 'tel' && field.value !== '') {
        // Allow various phone formats
        const phonePattern = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        isValid = phonePattern.test(field.value.replace(/\s+/g, ''));
    }
    
    // Display error message if invalid
    if (!isValid) {
        field.classList.add('error');
        
        // Create error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        
        // Set appropriate error message based on field type
        if (field.value === '' && field.required) {
            errorMessage.textContent = 'This field is required';
        } else if (field.type === 'email') {
            errorMessage.textContent = 'Please enter a valid email address';
        } else if (field.type === 'tel') {
            errorMessage.textContent = 'Please enter a valid phone number';
        } else if (field.type === 'checkbox') {
            errorMessage.textContent = 'This checkbox is required';
        } else {
            errorMessage.textContent = 'Please enter a valid value';
        }
        
        // Add error message after the field
        field.parentNode.appendChild(errorMessage);
    }
    
    return isValid;
}

/**
 * Handle form submission
 * @param {HTMLFormElement} form - The form to submit
 */
function submitForm(form) {
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    
    // Simulate API call with timeout
    setTimeout(() => {
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        
        // Show success message
        const formContainer = form.parentNode;
        form.style.display = 'none';
        
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <h3>Thank You for Your Request!</h3>
            <p>We've received your consultation request and will contact you within 24 hours to schedule your appointment.</p>
            <p>If you have any immediate questions, please call us at <strong>(800) 555-2020</strong>.</p>
        `;
        
        formContainer.appendChild(successMessage);
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1500); // Simulate network delay
}
