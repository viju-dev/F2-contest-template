// Profile page
const profileDetails = document.getElementById('profileDetails');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
  // Clear user state and access token from local storage
  localStorage.removeItem('user');

  // Redirect to signup page
  window.location.href = 'index.html';
});

// Check if user is authenticated on profile page load
window.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.accessToken) {
    // Redirect to signup page if access token is not found
    window.location.href = 'index.html';
  } else {
    // Display user details
    const fullname = user.fullname;
    const email = user.email;
    const password = user.password;
    // const accessToken = user.accessToken;
    profileDetails.innerHTML = `
      <h2>Profile</h2>
      <p>Full Name: ${fullname}</p>
      <p>Email: ${email}</p>
      <p>Access Token: ${password}</p>
    `;
  }
});
