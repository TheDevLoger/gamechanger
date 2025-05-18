const THEMES = {
  retro: "style.css",
  stalker: "stalker.css"
};

function setTheme(name) {
  localStorage.setItem("theme", name);
  document.getElementById("theme-link").setAttribute("href", THEMES[name]);
}

function toggleTheme() {
  const current = localStorage.getItem("theme") || "retro";
  const next = current === "retro" ? "stalker" : "retro";
  setTheme(next);
}

window.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme") || "retro";
  document.getElementById("theme-link").setAttribute("href", THEMES[theme]);
});
