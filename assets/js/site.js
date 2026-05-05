const formatHuf = (value) =>
  new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "HUF",
    maximumFractionDigits: 0,
  }).format(value);

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const filterButtons = document.querySelectorAll("[data-filter-button]");
  const productCards = document.querySelectorAll("[data-product-card]");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filterButton;
      filterButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      productCards.forEach((card) => {
        const category = card.dataset.category || "";
        const show = filter === "all" || category.includes(filter);
        card.hidden = !show;
      });
    });
  });

  const compareToggles = document.querySelectorAll("[data-compare-toggle]");
  const compareBar = document.querySelector("[data-compare-bar]");
  const compareCount = document.querySelector("[data-compare-count]");
  const updateCompare = () => {
    const checked = document.querySelectorAll("[data-compare-toggle]:checked").length;
    if (compareCount) compareCount.textContent = checked;
    if (compareBar) compareBar.classList.toggle("is-visible", checked > 0);
  };
  compareToggles.forEach((toggle) => toggle.addEventListener("change", updateCompare));

  document.querySelectorAll("[data-gallery-thumb]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.galleryThumb);
      const image = button.querySelector("img");
      if (target && image) {
        target.src = image.src;
        target.alt = image.alt || target.alt;
      }
    });
  });

  document.querySelectorAll("[data-form-demo]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const note = form.querySelector(".form-note");
      if (note) note.textContent = "A V2 prototípusban a beküldés helyfoglaló állapot.";
    });
  });

  document.querySelectorAll("[data-finance-calculator]").forEach((calculator) => {
    const price = Number(calculator.dataset.price || 0);
    const downPayment = calculator.querySelector("[data-down-payment]");
    const term = calculator.querySelector("[data-term]");
    const downOutput = calculator.querySelector("[data-down-output]");
    const monthlyOutput = calculator.querySelector("[data-monthly-output]");

    const update = () => {
      const down = Number(downPayment.value || 0);
      const months = Number(term.value || 36);
      const principal = Math.max(price - down, 0);
      const estimatedTotal = principal * 1.145;
      const monthly = Math.ceil(estimatedTotal / months / 100) * 100;
      downOutput.textContent = formatHuf(down);
      monthlyOutput.textContent = formatHuf(monthly);
    };

    downPayment.addEventListener("input", update);
    term.addEventListener("change", update);
    update();
  });
});
