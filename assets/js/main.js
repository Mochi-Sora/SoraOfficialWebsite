(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Footer year ----------------------------------------------------------- */
  $$("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  /* Header, scroll progress, back to top ---------------------------------- */
  const header = $(".site-header");
  const progressBar = $("#scroll-progress-bar");
  const backToTop = $(".back-to-top");

  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle("is-scrolled", y > 12);

    if (progressBar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = `${max > 0 ? Math.min((y / max) * 100, 100) : 0}%`;
    }

    if (backToTop) backToTop.hidden = y < 700;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  /* Mobile navigation ----------------------------------------------------- */
  const menuToggle = $(".menu-toggle");
  const mobileNav = $("#mobile-nav");

  const closeNav = () => {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    mobileNav.hidden = true;
    document.body.classList.remove("nav-open");
  };

  const openNav = () => {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    mobileNav.hidden = false;
    document.body.classList.add("nav-open");
  };

  menuToggle?.addEventListener("click", () => {
    if (menuToggle.getAttribute("aria-expanded") === "true") closeNav();
    else openNav();
  });

  if (mobileNav) {
    $$("a", mobileNav).forEach((link) => link.addEventListener("click", closeNav));
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  document.addEventListener("click", (event) => {
    if (!mobileNav || mobileNav.hidden) return;
    if (mobileNav.contains(event.target) || menuToggle?.contains(event.target)) return;
    closeNav();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) closeNav();
  });

  /* Reveal on scroll ------------------------------------------------------ */
  const revealElements = $$(".reveal");

  revealElements.forEach((el) => {
    const siblings = [...(el.parentElement?.children ?? [])].filter((child) =>
      child.classList.contains("reveal"),
    );
    const index = siblings.indexOf(el);
    if (index > 0) el.style.setProperty("--reveal-order", String(Math.min(index, 5)));
  });

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  /* Active navigation ----------------------------------------------------- */
  const navLinks = $$(".site-nav a");
  const navSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && navSections.length) {
    const visibleSections = new Set();
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSections.add(entry.target.id);
          else visibleSections.delete(entry.target.id);
        });

        const activeId = navSections.find((section) => visibleSections.has(section.id))?.id;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    navSections.forEach((section) => navObserver.observe(section));
  }

  /* Install tabs ---------------------------------------------------------- */
  const installTabs = $$(".install-tab");
  const installPanes = $$(".install-pane");

  const activateTab = (tab) => {
    const key = tab.dataset.tab;

    installTabs.forEach((candidate) => {
      const active = candidate === tab;
      candidate.classList.toggle("is-active", active);
      candidate.setAttribute("aria-selected", String(active));
      candidate.tabIndex = active ? 0 : -1;
    });

    installPanes.forEach((pane) => {
      const active = pane.dataset.pane === key;
      pane.classList.toggle("is-active", active);
      pane.hidden = !active;
    });
  };

  installTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));

    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + installTabs.length) % installTabs.length;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % installTabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = installTabs.length - 1;

      installTabs[nextIndex].focus();
      activateTab(installTabs[nextIndex]);
    });
  });

  /* Copy buttons ---------------------------------------------------------- */
  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-1000px";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
    } finally {
      textarea.remove();
    }
  };

  $$(".copy-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const block = button.closest(".code-block");
      const code = block?.querySelector("code");
      if (!code) return;

      const original = button.textContent;

      try {
        await copyText(code.innerText.trim());
        button.textContent = "Copied";
        button.classList.add("is-copied");
        window.setTimeout(() => {
          button.textContent = original;
          button.classList.remove("is-copied");
        }, 1800);
      } catch {
        button.textContent = "Copy failed";
        window.setTimeout(() => {
          button.textContent = original;
        }, 1800);
      }
    });
  });

  /* Subtle hero card tilt ------------------------------------------------- */
  const tiltArea = $("[data-tilt]");
  const tiltCard = $("#tilt-card");

  if (
    tiltArea &&
    tiltCard &&
    !prefersReducedMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {
    let frame = 0;

    tiltArea.addEventListener("pointerenter", () => {
      tiltCard.style.transition = "transform 140ms ease-out";
    });

    tiltArea.addEventListener("pointermove", (event) => {
      const rect = tiltArea.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        tiltCard.style.transform = `rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) rotateZ(${(2.5 - x * 1.5).toFixed(2)}deg)`;
      });
    });

    tiltArea.addEventListener("pointerleave", () => {
      cancelAnimationFrame(frame);
      tiltCard.style.transition = "";
      tiltCard.style.transform = "";
    });
  }
})();
