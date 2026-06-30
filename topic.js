/* ═══════════════════════════════════════════════════════════════
   RONNY BEST MATHEMATICS — topic.js  v4.0
   Shared by all lesson/topic pages
   Handles: nav hamburger · search · TOC active · progress bar
   ═══════════════════════════════════════════════════════════════ */
"use strict";

/* ── SEARCH DATA — all pages on the site ── */
const SITE_PAGES = [
  { name: "Algebra",                 url: "algebra.html",        icon: "𝑥",   type: "Lesson" },
  { name: "Trigonometry",            url: "trigonometry.html",   icon: "sin", type: "Lesson" },
  { name: "Statistics",              url: "statistics.html",     icon: "σ",   type: "Lesson" },
  { name: "Limits",                  url: "limits.html",         icon: "lim", type: "Lesson" },
  { name: "Differentiation",         url: "differentiation.html",icon: "d/dx",type: "Lesson" },
  { name: "Integration",             url: "integration.html",    icon: "∫",   type: "Lesson" },
  { name: "Vectors",                 url: "vectors.html",        icon: "→",   type: "Lesson" },
  { name: "Matrices",                url: "matrices.html",       icon: "[]",  type: "Lesson" },
  { name: "Conic Sections",          url: "conics.html",         icon: "⊙",   type: "Lesson" },
  { name: "Sequences & Series",      url: "sequences.html",      icon: "…",   type: "Lesson" },
  { name: "Complex Numbers",         url: "complex.html",        icon: "𝑖",   type: "Lesson" },
  { name: "Areas of Shapes",         url: "areas.html",          icon: "□",   type: "Lesson" },
  { name: "Volumes",                 url: "volumes.html",        icon: "▣",   type: "Lesson" },
  { name: "Practice Problems",       url: "tasks.html",          icon: "✓",   type: "Practice" },
  { name: "Brain Games",             url: "mind.html",           icon: "🧠",  type: "Games" },
  { name: "Ask Mwalimu",             url: "ask-mwalimu.html",    icon: "?",   type: "Help" },
  { name: "Achievements",            url: "achievements.html",   icon: "🏆",  type: "Progress" },
  { name: "My Progress",             url: "progress.html",       icon: "📈",  type: "Progress" },
  { name: "About Mwalimu Ronny",     url: "about.html",          icon: "👤",  type: "Site" },
  { name: "Contact",                 url: "contact.html",        icon: "✉",   type: "Site" },
  { name: "Home",                    url: "index.html",          icon: "🏠",  type: "Site" },
];

document.addEventListener("DOMContentLoaded", () => {

  /* ══════════════════════════════════════════
     WELCOME PILL
  ══════════════════════════════════════════ */
  const welcome = document.getElementById("welcome");
  if (welcome) {
    try {
      const user = localStorage.getItem("currentUser");
      welcome.textContent = (user && user !== "null")
        ? `Welcome back, ${user}!`
        : "Welcome — improve your mathematics here";
    } catch { /* storage blocked */ }
  }

  /* ══════════════════════════════════════════
     TRACK TOPIC VIEW
  ══════════════════════════════════════════ */
  try {
    if (typeof MathProgress !== "undefined") {
      const h1 = document.querySelector("h1");
      if (h1) MathProgress.recordTopicViewed(h1.textContent.trim());
    }
  } catch(e) {}

  /* ══════════════════════════════════════════
     HAMBURGER MENU
  ══════════════════════════════════════════ */
  // Support both id="hamburger" and any .nav-hamburger
  const hamburger = document.getElementById("hamburger");
  // Support both id="nav-menu" and id="navList"
  const navMenu   = document.getElementById("nav-menu") || document.getElementById("navList");

  

  /* ══════════════════════════════════════════
     SEARCH — supports both navSearchBar and searchBar IDs
  ══════════════════════════════════════════ */
  const searchToggle = document.getElementById("searchToggle");
  // Support both ID conventions
  const searchBar    = document.getElementById("navSearchBar") || document.getElementById("searchBar");
  // Support both input IDs
  const searchInput  = document.getElementById("siteSearch");
  const searchClear  = document.getElementById("searchClear");
  const searchResults= document.getElementById("searchResults");

  

  /* Toggle button (mobile only) */
  if (searchToggle && searchBar) {
    searchToggle.addEventListener("click", e => {
      e.stopPropagation();
      const isHidden = searchBar.hasAttribute("hidden");
      if (isHidden) {
        searchBar.removeAttribute("hidden");
        searchToggle.setAttribute("aria-expanded", "true");
        if (searchInput) searchInput.focus();
      } else {
        searchBar.setAttribute("hidden", "");
        searchToggle.setAttribute("aria-expanded", "false");
        if (searchResults) searchResults.hidden = true;
      }
    });
  }

  /* Live search */
  if (searchInput && searchResults) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();

      // Show/hide clear button
      if (searchClear) searchClear.hidden = q.length === 0;

      if (!q) {
        searchResults.hidden = true;
        return;
      }

      const matches = SITE_PAGES.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
      ).slice(0, 8);

      if (!matches.length) {
        searchResults.innerHTML = `<div class="sr-no-results">No results for "${escHtml(searchInput.value)}"</div>`;
      } else {
        searchResults.innerHTML = matches.map(p => `
          <a class="sr-item" href="${p.url}">
            <div class="sr-item-icon">${p.icon}</div>
            <div class="sr-item-text">
              <span class="sr-item-name">${escHtml(p.name)}</span>
              <span class="sr-item-type">${p.type}</span>
            </div>
          </a>`).join("");
      }
      searchResults.hidden = false;
    });

    /* Keyboard: Escape closes results */
    searchInput.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        searchResults.hidden = true;
        searchInput.blur();
      }
    });
  }

  /* Clear button */
  if (searchClear && searchInput && searchResults) {
    searchClear.addEventListener("click", () => {
      searchInput.value = "";
      searchResults.hidden = true;
      searchClear.hidden = true;
      searchInput.focus();
    });
  }

  /* Close search results when clicking outside */
  document.addEventListener("click", e => {
    if (searchBar && searchResults && !searchBar.contains(e.target)) {
      searchResults.hidden = true;
    }
  });

  /* ══════════════════════════════════════════
     TOC ACTIVE STATE + READING PROGRESS
  ══════════════════════════════════════════ */
  const tocLinks     = document.querySelectorAll(".toc-link");
  const progressFill = document.getElementById("tocProgressFill") || document.getElementById("tocProgress");
  const sections     = document.querySelectorAll(
    ".lesson-section[id], .cbc-context-banner[id], section[id], article[id]"
  );

  if (sections.length && tocLinks.length && window.IntersectionObserver) {
    const tocObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tocLinks.forEach(l => l.classList.remove("active"));
          const activeLink = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
          if (activeLink) activeLink.classList.add("active");
        }
      });
    }, { rootMargin: "-15% 0px -75% 0px" });

    sections.forEach(s => tocObserver.observe(s));
  }

  /* Reading progress bar */
  if (progressFill) {
    function updateProgress() {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct  = docH > 0 ? Math.min(100, Math.round((window.scrollY / docH) * 100)) : 0;
      progressFill.style.width = pct + "%";
      const bar = progressFill.parentElement;
      if (bar) bar.setAttribute("aria-valuenow", pct);
    }
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  /* ══════════════════════════════════════════
     ENTRANCE ANIMATIONS
  ══════════════════════════════════════════ */
  if (window.IntersectionObserver) {
    const animTargets = document.querySelectorAll(
      ".lesson-section, .we-card, .error-card, .fs-card, .dp-case, .cbc-context-banner"
    );
    const animObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity  = "1";
          entry.target.style.transform = "translateY(0)";
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07 });

    animTargets.forEach(el => {
      el.style.opacity    = "0";
      el.style.transform  = "translateY(14px)";
      el.style.transition = "opacity .4s ease, transform .4s ease";
      animObserver.observe(el);
    });
  }

  /* ══════════════════════════════════════════
     UTILITY
  ══════════════════════════════════════════ */
  function escHtml(str) {
    return str.replace(/[&<>"']/g, m => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[m]));
  }

});