const btn = document.querySelector("#theme-toggle-btn");

function handleThemeToggleTriggerEvent(event) {
  // Check to see if space or enter were pressed for a11y
  // "Spacebar" for IE11 support
  if (event.type === "click" || event.key === " " || event.key === "Enter" || event.key === "Spacebar") {
    // Prevent the default action to stop scrolling when space is pressed
    event.preventDefault();
    toggleTheme(event.currentTarget);
  }
};

function toggleTheme(element) {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
    var theme = document.body.classList.contains("light-mode") ? "light" : "dark";
  } else {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
    var theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
  }
  element.classList.toggle("theme-toggle--toggled");
  localStorage.setItem("theme", theme);
};

btn.addEventListener("click", handleThemeToggleTriggerEvent);
btn.addEventListener("keydown", handleThemeToggleTriggerEvent);

