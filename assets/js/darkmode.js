const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("theme");

// If no theme is saved and dark is preferred set and save that
if (!currentTheme && prefersDarkScheme) {
  localStorage.setItem("theme", "dark");
  document.body.classList.add("dark-mode");
}

if (currentTheme == "dark") {
  document.body.classList.toggle("dark-mode");
} else if (currentTheme == "light") {
  document.body.classList.toggle("light-mode");
}

