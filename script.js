document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    let messageParagraph = document.getElementById('formMessage');
    if (!messageParagraph) {
        messageParagraph = document.createElement('p');
        messageParagraph.id = 'formMessage';
        form.after(messageParagraph);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let valid = true;

        // Clear previous error messages and reset styles
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.color = '';
        });
        messageParagraph.textContent = '';
        messageParagraph.className = '';
        messageParagraph.removeAttribute('role');
        messageParagraph.style.display = 'none';

        // Get field values
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('emailAddress').value.trim();
        const mobile = document.getElementById('mobileNumber').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Check for empty form
        if (
            !firstName &&
            !lastName &&
            !email &&
            !mobile &&
            !password &&
            !confirmPassword
        ) {
            messageParagraph.textContent = "You cannot submit an empty form, please fill out each field and try again.";
            messageParagraph.classList.add('error');
            messageParagraph.setAttribute('role', 'alert');
            messageParagraph.style.display = 'block';
            return;
        }

        // First Name validation
        if (!firstName) {
            showError('firstNameError', "First name is required.");
            valid = false;
        } else if (!/^[A-Z][a-zA-Z]+$/.test(firstName)) {
            showError('firstNameError', "Please enter only letters and start with a capital letter.");
            valid = false;
        }

        // Last Name validation
        if (!lastName) {
            showError('lastNameError', "Last name is required.");
            valid = false;
        } else if (!/^[A-Z][a-zA-Z]+$/.test(lastName)) {
            showError('lastNameError', "Please enter only letters and start with a capital letter.");
            valid = false;
        }

        // Email validation
        if (!email) {
            showError('emailError', "Email address is required.");
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('emailError', "Please enter a valid email address.");
            valid = false;
        }

        // Mobile validation
        if (!mobile) {
            showError('mobileError', "Mobile number is required.");
            valid = false;
        } else if (!/^[1-9][0-9]{9}$/.test(mobile)) {
            showError('mobileError', "Enter a valid 10-digit mobile number starting with a non-zero digit.");
            valid = false;
        }

        // Password validation
        if (!password) {
            showError('passwordError', "Password is required.");
            valid = false;
        } else if (password.length < 6 || password.length > 12) {
            showError('passwordError', "Password must be 6-12 characters long.");
            valid = false;
        }

        // Confirm Password validation
        if (!confirmPassword) {
            showError('confirmPasswordError', "Please confirm your password.");
            valid = false;
        } else if (password !== confirmPassword) {
            showError('confirmPasswordError', "Passwords do not match.");
            valid = false;
        }

        // Display results
        if (valid) {
            messageParagraph.classList.add('success');
            messageParagraph.innerHTML = `
                Registration successful!<br>
                <strong>First Name:</strong> ${escapeHTML(firstName)} <br>
                <strong>Last Name:</strong> ${escapeHTML(lastName)} <br>
                <strong>Email:</strong> ${escapeHTML(email)} <br>
                <strong>Mobile:</strong> ${escapeHTML(mobile)}
            `;
            messageParagraph.style.display = 'block';
            form.reset();
        } else {
            messageParagraph.classList.add('error');
            messageParagraph.setAttribute('role', 'alert');
            messageParagraph.textContent = "Please fix the errors above and try again.";
            messageParagraph.style.display = 'block';
        }
    });

    // Helper: Show error message in red
    function showError(elementId, message) {
        const el = document.getElementById(elementId);
        if (el) {
            el.textContent = message;
            el.style.color = "#b30000";
        }
    }

    // Helper: Escape HTML for form values
    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, function (m) {
            return ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            })[m];
        });
    }
});