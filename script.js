document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    // First Name
    const firstName = document.getElementById('firstName').value.trim();
    if (!/^[A-Z][a-zA-Z]+$/.test(firstName)) {
        document.getElementById('firstNameError').textContent = "Please enter only letters and start with a capital letter.";
        valid = false;
    }

    // Last Name
    const lastName = document.getElementById('lastName').value.trim();
    if (!/^[A-Z][a-zA-Z]+$/.test(lastName)) {
        document.getElementById('lastNameError').textContent = "Please enter only letters and start with a capital letter.";
        valid = false;
    }

    // Email
    const email = document.getElementById('emailAddress').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('emailError').textContent = "Please enter a valid email address.";
        valid = false;
    }

    // Mobile
    const mobile = document.getElementById('mobileNumber').value.trim();
    if (!/^[1-9][0-9]{9}$/.test(mobile)) {
        document.getElementById('mobileError').textContent = "Enter a valid 10-digit mobile number starting with a non-zero digit.";
        valid = false;
    }

    // Password
    const password = document.getElementById('password').value;
    if (password.length < 6 || password.length > 12) {
        document.getElementById('passwordError').textContent = "Password must be 6-12 characters long.";
        valid = false;
    }

    // Confirm Password
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = "Passwords do not match.";
        valid = false;
    }

    if (valid) {
        alert("Registration successful!");
        document.getElementById('registrationForm').reset();
    }
});

const email = document.getElementById('emailAddress').value.trim();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
(!emailPattern.test(email));
{

}

console.log('Hello World')