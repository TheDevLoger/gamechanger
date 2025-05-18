const THEMES = {
  retro: "style.css",
  stalker: "stalker.css"
};

function switchTheme() {
  const current = localStorage.getItem("theme") || "retro";
  const next = current === "retro" ? "stalker" : "retro";
  localStorage.setItem("theme", next);
  document.getElementById("theme-link").href = THEMES[next];
}