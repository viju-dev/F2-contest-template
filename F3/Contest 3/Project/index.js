// Signup page
const signupForm = document.getElementById('signupForm');
const message = document.getElementById('message');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get user input
  const fullname = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Password validation
  if (password !== confirmPassword) {
    showMessage('Passwords do not match!', 'error');
    return;
  }

  // Generate access token
  const accessToken = generateAccessToken();

  // Save user state in local storage
  const user = {
    fullname,
    email,
    password,
    accessToken
  };
  localStorage.setItem('user', JSON.stringify(user));

  // Show success message
  showMessage('Successfully signed up!', 'success');

  // Redirect to profile page
  setTimeout(() => {
    window.location.href = 'profile.html';
  }, 1500);
});

// Helper function to generate a random 16-byte access token
function generateAccessToken() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let accessToken = '';

  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    accessToken += characters[randomIndex];
  }

  return accessToken;
}

// Helper function to display success or error message
function showMessage(msg, className) {
  message.textContent = msg;
  message.className = className;
}

// Check if user is authenticated on profile page load
window.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user || user.accessToken) {
      // Redirect to profile page if access token and user info is exist
      window.location.href = 'profile.html';
    }
  });