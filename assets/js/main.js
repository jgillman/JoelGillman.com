const btn = document.querySelector(".btn-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

btn.addEventListener("click", function() {
  // If the OS is set to dark mode...
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    // Remove the dark theme class if needed (edge case)
    document.body.classList.remove("dark-theme");
  } else {
    document.body.classList.toggle("dark-theme");
    // Remove the light theme class if needed (edge case)
    document.body.classList.remove("light-theme");
  }
});
