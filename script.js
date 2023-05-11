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
