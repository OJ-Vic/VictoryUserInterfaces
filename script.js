const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});



// Get form element and add submit event listener for Book Meeting form
const meetingForm = document.getElementById('meeting-form');
meetingForm.addEventListener('submit', validateForm);

// Function to validate the form
function validateForm(e) {
  e.preventDefault(); // Prevent form submission

  // Get form input values
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');
  const messageInput = document.getElementById('message');

  // Validate input values
  if (nameInput.value.trim() === '') {
    setErrorFor(nameInput, 'Please enter your name');
  } else {
    setSuccessFor(nameInput);
  }

  if (emailInput.value.trim() === '') {
    setErrorFor(emailInput, 'Please enter your email');
  } else if (!isEmail(emailInput.value.trim())) {
    setErrorFor(emailInput, 'Please enter a valid email');
  } else {
    setSuccessFor(emailInput);
  }

  if (dateInput.value.trim() === '') {
    setErrorFor(dateInput, 'Please select a date');
  } else {
    setSuccessFor(dateInput);
  }

  if (timeInput.value.trim() === '') {
    setErrorFor(timeInput, 'Please select a time');
  } else {
    setSuccessFor(timeInput);
  }

  if (messageInput.value.trim() === '') {
    setErrorFor(messageInput, 'Please enter a message');
  } else {
    setSuccessFor(messageInput);
  }

  // Check if all fields are valid
  const formGroups = document.getElementsByClassName('form-group');
  const isValid = !Array.from(formGroups).some(formGroup => formGroup.classList.contains('error'));
  
  if (isValid) {
    showSuccessMessage();
  }
}

// Function to set error state for input field
function setErrorFor(input, message) {
  const formGroup = input.parentElement;
  const errorText = formGroup.querySelector('.error-text');
  formGroup.classList.add('error');
  errorText.innerText = message;
}

// Function to set success state for input field
function setSuccessFor(input) {
  const formGroup = input.parentElement;
  formGroup.classList.remove('error');
  formGroup.classList.add('success');
}

// Function to validate email format
function isEmail(email) {
  // Regular expression for email validation
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}

// Function to show success message
function showSuccessMessage() {
  const successMessage = document.createElement('div');
  successMessage.classList.add('success-message');
  successMessage.innerText = 'Meeting successfully booked!';
  
  const bookMeetingSection = document.querySelector('.book-meeting');
  bookMeetingSection.appendChild(successMessage);
}



// Function to retrieve users from JSON file
async function getUsersFromJSON() {
  try {
    const response = await fetch('Users.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

// Function to save users to JSON file
async function saveUsersToJSON(users) {
  try {
    const response = await fetch('Users.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(users),
    });
    if (response.ok) {
      console.log('Users saved successfully.');
    } else {
      console.error('Failed to save users.');
    }
  } catch (error) {
    console.error('Error saving users:', error);
  }
}


// Function to handle form toggle
function toggleForm() {
  const loginForm = document.querySelector('.login_form');
  const signupForm = document.querySelector('.signup_form');
  const formCloseBtn = document.querySelector('.form_close');
  const formOpenBtn = document.querySelector('#form-open');

  // Show login form by default
  loginForm.style.display = 'block';
  signupForm.style.display = 'none';

  // Event listener for form open button
  formOpenBtn.addEventListener('click', () => {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
  });

  // Event listener for form close button
  formCloseBtn.addEventListener('click', () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
  });

  // Event listener for signup link
  const signupLink = document.getElementById('signup');
  signupLink.addEventListener('click', () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  });
}

async function handleLoginFormSubmit(event) {
  event.preventDefault();
  const email = event.target.querySelector('input[type="email"]').value;
  const password = event.target.querySelector('input[type="password"]').value;

  // Perform login validation here
  // ...

  // Example: Login validation
  if (email && password) {
    const users = await getUsersFromJSON();
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      alert('Login successful');
      // Redirect the user to the desired page
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid email or password');
    }
  }
}

// Function to handle signup form submission
async function handleSignupFormSubmit(event) {
  event.preventDefault();
  const email = event.target.querySelector('input[type="email"]').value;
  const password = event.target.querySelector('input[type="password"]').value;

  // Perform signup validation here
  // ...

  // Example: Signup validation
  if (email && password) {
    const users = await getUsersFromJSON();
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      alert('User with this email already exists');
    } else {
      const newUser = { email, password };
      users.push(newUser);
      await saveUsersToJSON(users);
      alert('Signup successful');
      // Clear the form fields after successful signup
      event.target.reset();
      // Display the login form after successful signup
      const loginForm = document.querySelector('.login_form');
      const signupForm = document.querySelector('.signup_form');
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
    }
  }
}

// Call the toggleForm function on page load
window.addEventListener('DOMContentLoaded', toggleForm);

// Add event listeners to the login and signup forms
const loginForm = document.querySelector('.login_form');
const signupForm = document.querySelector('.signup_form');
loginForm.addEventListener('submit', handleLoginFormSubmit);
signupForm.addEventListener('submit', handleSignupFormSubmit);