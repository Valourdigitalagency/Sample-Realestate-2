const tabs = document.querySelectorAll(".spec-tab");
const panels = document.querySelectorAll(".spec-panel");
const form = document.querySelector(".lead-form");
const galleryTrack = document.querySelector("[data-gallery-track]");

const revealTargets = document.querySelectorAll(
  [
    ".brand-logo",
    ".site-nav a",
    ".header-actions > *",
    ".hero-mini",
    ".hero-copy h1",
    ".hero-location",
    ".hero-call",
    ".hero-ready",
    ".hero-image",
    ".gallery-section h2",
    ".gallery-lead",
    ".gallery-card",
    ".about-copy > *",
    ".about-image",
    ".config-section h2",
    ".config-table",
    ".amenity-card",
    ".specs-section h2",
    ".spec-tabs",
    ".spec-panel",
    ".location-section h2",
    ".location-list details",
    ".map-card",
    ".contact-copy > *",
    ".lead-form",
    ".site-footer p",
  ].join(",")
);

revealTargets.forEach((el, index) => {
  el.classList.add("reveal");
  el.style.setProperty("--reveal-delay", `${Math.min(index * 55, 550)}ms`);
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );

  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
}

if (galleryTrack && !galleryTrack.dataset.cloned) {
  const cards = Array.from(galleryTrack.children);
  cards.forEach((card) => {
    galleryTrack.appendChild(card.cloneNode(true));
  });
  galleryTrack.dataset.cloned = "true";
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.specTab;

    tabs.forEach((item) => item.classList.toggle("active", item === tab));
    panels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.specPanel === target);
    });
  });
});

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    const original = button.textContent;
    button.textContent = "Submitted";
    button.disabled = true;

    window.setTimeout(() => {
      form.reset();
      button.textContent = original;
      button.disabled = false;
    }, 1800);
  });
}
