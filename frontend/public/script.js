// public/script.js
// This file defines the custom JS script for the HTML template

// Define a function to show a toast message
function showToast(message) {
    // Create a toast element with the message
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
  
    // Append the toast element to the body
    document.body.appendChild(toast);
  
    // Set a timeout to remove the toast element after 3 seconds
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  }
  
  // Add an event listener for the window load event
  window.addEventListener("load", () => {
    // Show a welcome message
    showToast("Welcome to EduNex!");
  });
  