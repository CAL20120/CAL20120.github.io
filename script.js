const HERO_TEXT = "Christopher Lucas - Pipeline TD & Outils";

function typeHero() {
    const el = document.getElementById("typeLine");

    if (!el) {
        return;
    }

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        el.textContent = HERO_TEXT;
        return;
    }

    let i = 0;
    const speed = 32;

    function step() {
        if (i <= HERO_TEXT.length) {
            el.textContent = HERO_TEXT.slice(0, i);
            i++;

        setTimeout(step, speed);
        }

    }

    step();
}

document.addEventListener("DOMContentLoaded", typeHero);



function initViewToggle() {
    const buttons = document.querySelectorAll("[data-view-btn]");
    const panels = document.querySelectorAll("[data-view-panel]");

    buttons.forEach((btn => {
       btn.addEventListener("click", () => {
           const target = btn.getAttribute("data-view-btn");

           buttons.forEach((i => {
               const isActive = i === btn;
               i.classList.toggle("active", isActive);
               i.setAttribute("aria-selected", isActive ? "true": "false");
           }));

           panels.forEach((panel => {
               const matches = panel.getAttribute("data-view-panel") === target;
               panel.hidden = !matches;
           }));
       });
    }));
}


function initStepper() {
    const stepButtons = document.querySelectorAll("[data-step]");
    const stepContents = document.querySelectorAll("[data-step-content]")

    stepButtons.forEach(btn => {
       btn.addEventListener("click", () => {
          const target = btn.getAttribute("data-step");

          stepButtons.forEach((i) => {
              const isActive = i === btn;

              i.classList.toggle("active", isActive);
              i.setAttribute("aria-selected", isActive ? "true": "false");
          });

          stepContents.forEach((content) => {
             content.classList.toggle(
                 "active",
                 content.getAttribute("data-step-content") === target
             );
          });

       });
    });
}



function initLightBox() {
    const lightbox = document.getElementById("lightbox");

    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");

    const closeBtn = document.getElementById("lightboxClose");
    const shots = document.querySelectorAll(".shot img");

    function openLightbox(img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;

        const caption = img.closest(".shot").querySelector("figcaption");
        lightboxCaption.textContent = caption ? caption.textContent: "";

        lightbox.hidden = false;
    }

    function closeLightbox() {
        lightbox.hidden = true;
    }

    shots.forEach((img) => {
       img.addEventListener("click", () => openLightbox(img));
    });

    closeBtn.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (e) => {
       if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
       if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
}


document.addEventListener("DOMContentLoaded", () => {
  initViewToggle();
  initLightBox();
  initStepper();
})