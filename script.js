document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const messageParagraph = document.getElementById('formMessage');
    const passwordMismatchMsg = document.getElementById('passwordMismatchMsg');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let valid = true;

        // Clear previous error messages and feedback
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.color = '';
        });
        messageParagraph.textContent = '';
        messageParagraph.className = '';
        messageParagraph.removeAttribute('role');
        messageParagraph.style.display = 'none';
        passwordMismatchMsg.style.display = 'none';
        passwordMismatchMsg.textContent = '';

        // Get values
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
            messageParagraph.className = 'error';
            messageParagraph.setAttribute('role', 'alert');
            messageParagraph.style.display = 'block';
            return;
        }

        // First Name
        if (!firstName) {
            showError('firstNameError', "First name is required.");
            valid = false;
        } else if (!/^[A-Z][a-zA-Z]+$/.test(firstName)) {
            showError('firstNameError', "Please enter only letters and start with a capital letter.");
            valid = false;
        }

        // Last Name
        if (!lastName) {
            showError('lastNameError', "Last name is required.");
            valid = false;
        } else if (!/^[A-Z][a-zA-Z]+$/.test(lastName)) {
            showError('lastNameError', "Please enter only letters and start with a capital letter.");
            valid = false;
        }

        // Email
        if (!email) {
            showError('emailError', "Email address is required.");
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('emailError', "Please enter a valid email address.");
            valid = false;
        }

        // Mobile
        if (!mobile) {
            showError('mobileError', "Mobile number is required.");
            valid = false;
        } else if (!/^[1-9][0-9]{9}$/.test(mobile)) {
            showError('mobileError', "Enter a valid 10-digit mobile number starting with a non-zero digit.");
            valid = false;
        }

        // Password
        if (!password) {
            showError('passwordError', "Password is required.");
            valid = false;
        } else if (password.length < 6 || password.length > 12) {
            showError('passwordError', "Password must be 6-12 characters long.");
            valid = false;
        }

        // Confirm Password logic:
        if (!confirmPassword) {
            showError('confirmPasswordError', "Please confirm your password.");
            valid = false;
        } else if (password !== confirmPassword) {
            showError('confirmPasswordError', "");
            // Show side pop-up error instead of field error!
            passwordMismatchMsg.textContent = "The passwords do not match. Please enter the same password and try again.";
            passwordMismatchMsg.style.display = "block";
            valid = false;
        }

        // Display result
        if (valid) {
            messageParagraph.className = 'success';
            messageParagraph.innerHTML = `
                Registration successful!<br>
                <strong>First Name:</strong> ${escapeHTML(firstName)} <br>
                <strong>Last Name:</strong> ${escapeHTML(lastName)} <br>
                <strong>Email:</strong> ${escapeHTML(email)} <br>
                <strong>Mobile:</strong> ${escapeHTML(mobile)}
            `;
            messageParagraph.style.display = 'block';
            passwordMismatchMsg.style.display = 'none';
            form.reset();
        } else {
            if (!passwordMismatchMsg.textContent) {
                messageParagraph.className = 'error';
                messageParagraph.setAttribute('role', 'alert');
                messageParagraph.textContent = "Please fix the errors above and try again.";
                messageParagraph.style.display = 'block';
            }
        }
    });

    // Helper for error output
    function showError(elementId, message) {
        const el = document.getElementById(elementId);
        if (el) {
            el.textContent = message;
            el.style.color = "#b30000";
        }
    }
    // Helper for escaping
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