const yearNode = document.getElementById("year");
const themeToggle = document.getElementById("theme-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const stackIconNodes = Array.from(document.querySelectorAll("[data-icon]"));
const savedTheme = window.localStorage.getItem("theme");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

function updateStackIcons(theme) {
  const iconTheme = theme === "dark" ? "dark" : "light";
  stackIconNodes.forEach((node) => {
    node.src = `https://skillicons.dev/icons?i=${node.dataset.icon}&theme=${iconTheme}`;
  });
}

function updateThemeToggle(theme) {
  if (!themeToggle) return;

  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );

  const trackIconNode = themeToggle.querySelector(".theme-toggle-track-icon");
  const thumbIconNode = themeToggle.querySelector(".theme-toggle-thumb-icon");

  if (trackIconNode) trackIconNode.textContent = isDark ? "☀" : "☾";
  if (thumbIconNode) thumbIconNode.textContent = isDark ? "☾" : "☀";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem("theme", theme);
  updateStackIcons(theme);
  updateThemeToggle(theme);

  if (themeMeta) {
    themeMeta.setAttribute("content", theme === "dark" ? "#1f1b28" : "#efeff4");
  }
}

applyTheme(savedTheme || "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });
}

const tabButtons = Array.from(document.querySelectorAll(".tab-button"));
const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));

function activateTab(targetId) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tabTarget === targetId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });

  tabPanels.forEach((panel) => {
    const isActive = panel.id === targetId;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateTab(button.dataset.tabTarget);
  });
});
