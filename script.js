const yearElement = document.querySelector("#year");
const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");
const tabLinks = document.querySelectorAll("[data-open-tab]");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

function activateTab(tabName) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  tabPanels.forEach((panel) => {
    const isActive = panel.dataset.panel === tabName;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateTab(button.dataset.tab);
  });
});

tabLinks.forEach((link) => {
  link.addEventListener("click", () => {
    activateTab(link.dataset.openTab);
  });
});
