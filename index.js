/* ═══════════════════════════════════════════════════════════════
   RONNY BEST MATHEMATICS — index.js  v4.3  (FIXED)
   Homepage only: search, filter/sort, FAQ, 3-D tilt, scroll anim.
   NAV / HAMBURGER / DROPDOWN → handled exclusively by shared.js
   ═══════════════════════════════════════════════════════════════ */
"use strict";

/* ─── SEARCH DATA ─── */
const SITE_PAGES = [
  { name: "Algebra",            url: "algebra.html",        type: "Lesson",   icon: "𝑥",   keywords: ["algebra","linear","quadratic","logarithm","exponent","factorisation","equations","simultaneous"] },
  { name: "Trigonometry",       url: "trigonometry.html",   type: "Lesson",   icon: "△",   keywords: ["trigonometry","trig","sine","cosine","tangent","sin","cos","tan","identity","unit circle","angles"] },
  { name: "Statistics",         url: "statistics.html",     type: "Lesson",   icon: "σ",   keywords: ["statistics","mean","median","mode","standard deviation","probability","distribution","data"] },
  { name: "Limits",             url: "limits.html",         type: "Lesson",   icon: "lim", keywords: ["limits","continuity","l'hopital","one-sided","approaching","calculus"] },
  { name: "Differentiation",    url: "differentiation.html",type: "Lesson",   icon: "d/dx",keywords: ["differentiation","derivative","chain rule","product rule","power rule","turning point","rates of change"] },
  { name: "Integration",        url: "integration.html",    type: "Lesson",   icon: "∫",   keywords: ["integration","integral","definite","indefinite","substitution","area under curve"] },
  { name: "Vectors",            url: "vectors.html",        type: "Lesson",   icon: "→",   keywords: ["vectors","magnitude","direction","dot product","position vector","addition","subtraction"] },
  { name: "Matrices",           url: "matrices.html",       type: "Lesson",   icon: "[]",  keywords: ["matrices","matrix","determinant","inverse","transformation","linear systems","operations"] },
  { name: "Conic Sections",     url: "conics.html",         type: "Lesson",   icon: "○",   keywords: ["conics","conic sections","circle","ellipse","parabola","hyperbola","focus","directrix"] },
  { name: "Sequences & Series", url: "sequences.html",      type: "Lesson",   icon: "∑",   keywords: ["sequences","series","arithmetic","geometric","progression","sum","convergence"] },
  { name: "Complex Numbers",    url: "complex.html",        type: "Lesson",   icon: "i",   keywords: ["complex","imaginary","real","argand","modulus","argument","complex numbers"] },
  { name: "Areas",              url: "areas.html",          type: "Lesson",   icon: "□",   keywords: ["areas","area","plane shapes","composite","surface area","sector","segment"] },
  { name: "Volumes",            url: "volumes.html",        type: "Lesson",   icon: "⬡",   keywords: ["volumes","volume","cylinder","cone","sphere","prism","pyramid","solid"] },
  { name: "Practice Problems",  url: "tasks.html",          type: "Practice", icon: "✏",   keywords: ["practice","problems","exercises","tasks","questions"] },
  { name: "Brain Games",        url: "mind.html",           type: "Games",    icon: "🧠",  keywords: ["brain games","games","puzzles","mind","fun"] },
  { name: "Ask Mwalimu",        url: "ask-mwalimu.html",    type: "Feature",  icon: "💬",  keywords: ["ask","question","help","mwalimu","tutor","stuck"] },
  { name: "My Progress",        url: "progress.html",       type: "Feature",  icon: "📊",  keywords: ["progress","tracking","stats","accuracy","history"] },
  { name: "Achievements",       url: "achievements.html",   type: "Feature",  icon: "🏅",  keywords: ["achievements","badges","milestones","rewards"] },
  { name: "About Mwalimu Ronny",url: "about.html",          type: "Info",     icon: "👨‍🏫",  keywords: ["about","mwalimu ronny","teacher","bio","qualifications"] },
  { name: "Contact",            url: "contact.html",        type: "Info",     icon: "✉",   keywords: ["contact","email","phone","reach","message"] },
];

document.addEventListener("DOMContentLoaded", () => {

  /* ══════════════════════════════════════════
     1. Welcome pill
  ══════════════════════════════════════════ */
  const welcome = document.getElementById("welcome");
  if (welcome) {
    try {
      const user = localStorage.getItem("currentUser");
      welcome.textContent = (user && user !== "null")
        ? `Welcome back, ${user}!`
        : "Welcome — improve your mathematics here";
    } catch {
      welcome.textContent = "Welcome — improve your mathematics here";
    }
  }

  /* ══════════════════════════════════════════
     2. NAV / HAMBURGER / DROPDOWN
        ► Handled exclusively by shared.js ◄
        Do NOT add any nav listeners here.
  ══════════════════════════════════════════ */

  /* ══════════════════════════════════════════
     3. Search (nav search bar — homepage)
  ══════════════════════════════════════════ */
  const searchToggle  = document.getElementById("searchToggle");
  const navSearchBar  = document.getElementById("navSearchBar");
  const siteSearch    = document.getElementById("siteSearch");
  const searchClear   = document.getElementById("searchClear");
  const searchResults = document.getElementById("searchResults");

  if (searchToggle && navSearchBar && siteSearch) {

    /* Toggle search bar open / close */
    searchToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const currentlyHidden = navSearchBar.hidden;
      if (currentlyHidden) {
        navSearchBar.hidden = false;
        searchToggle.setAttribute("aria-expanded", "true");
        siteSearch.focus();
      } else {
        navSearchBar.hidden = true;
        searchToggle.setAttribute("aria-expanded", "false");
        siteSearch.value = "";
        if (searchResults) searchResults.hidden = true;
        if (searchClear)   searchClear.hidden   = true;
      }
    });

    /* Stop clicks inside the search bar from bubbling to the
       document listener that closes the results dropdown */
    navSearchBar.addEventListener("click", (e) => e.stopPropagation());

    /* Live search */
    siteSearch.addEventListener("input", () => {
      const q = siteSearch.value.trim().toLowerCase();
      if (searchClear) searchClear.hidden = q.length === 0;

      if (q.length < 2) {
        if (searchResults) searchResults.hidden = true;
        return;
      }

      const matches = SITE_PAGES.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.keywords.some(k => k.includes(q))
      ).slice(0, 8);

      if (matches.length === 0) {
        searchResults.innerHTML =
          `<p class="sr-no-results">No results for "<strong>${escHtml(q)}</strong>"</p>`;
      } else {
        searchResults.innerHTML = matches.map(m => `
          <a href="${m.url}" class="sr-item" role="option">
            <div class="sr-item-icon">${m.icon}</div>
            <div class="sr-item-text">
              <span class="sr-item-name">${highlightMatch(m.name, q)}</span>
              <span class="sr-item-type">${m.type}</span>
            </div>
          </a>
        `).join("");
      }
      searchResults.hidden = false;
    });

    /* Clear button */
    if (searchClear) {
      searchClear.addEventListener("click", (e) => {
        e.stopPropagation();
        siteSearch.value = "";
        if (searchResults) searchResults.hidden = true;
        searchClear.hidden = true;
        siteSearch.focus();
      });
    }

    /* Keyboard navigation inside search */
    siteSearch.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        navSearchBar.hidden = true;
        searchToggle.setAttribute("aria-expanded", "false");
        siteSearch.value = "";
        if (searchResults) searchResults.hidden = true;
        if (searchClear)   searchClear.hidden   = true;
      }
      if (e.key === "ArrowDown" && searchResults && !searchResults.hidden) {
        const first = searchResults.querySelector(".sr-item");
        if (first) { first.focus(); e.preventDefault(); }
      }
    });

    if (searchResults) {
      searchResults.addEventListener("keydown", (e) => {
        const items = [...searchResults.querySelectorAll(".sr-item")];
        const idx   = items.indexOf(document.activeElement);
        if (e.key === "ArrowDown" && idx < items.length - 1) {
          items[idx + 1].focus(); e.preventDefault();
        }
        if (e.key === "ArrowUp") {
          if (idx > 0) { items[idx - 1].focus(); }
          else         { siteSearch.focus(); }
          e.preventDefault();
        }
        if (e.key === "Escape") {
          navSearchBar.hidden = true;
          searchToggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  /* Close search results when clicking outside the nav */
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".main-nav")) {
      if (searchResults) searchResults.hidden = true;
    }
  });

  /* ══════════════════════════════════════════
     4. Topic filter + sort
  ══════════════════════════════════════════ */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const sortSelect = document.getElementById("sortTopics");
  const topicsGrid = document.getElementById("topicsGrid");
  const noResults  = document.getElementById("noResults");
  const resetFilter= document.getElementById("resetFilter");

  let activeFilter = "all";
  let activeSort   = "default";

  function applyFilterSort() {
    if (!topicsGrid) return;
    const cards = [...topicsGrid.querySelectorAll(".topic-card")];

    /* Apply filter */
    let visible = cards.filter(c =>
      activeFilter === "all" || c.dataset.strand === activeFilter
    );
    cards.forEach(c => c.classList.add("hidden"));
    visible.forEach(c => c.classList.remove("hidden"));

    /* Apply sort */
    if (activeSort !== "default") {
      visible.sort((a, b) => {
        if (activeSort === "az")              return a.dataset.name.localeCompare(b.dataset.name);
        if (activeSort === "difficulty-asc")  return Number(a.dataset.difficulty) - Number(b.dataset.difficulty);
        if (activeSort === "difficulty-desc") return Number(b.dataset.difficulty) - Number(a.dataset.difficulty);
        return 0;
      });
      visible.forEach(c => topicsGrid.appendChild(c));
    }

    if (noResults) noResults.hidden = visible.length > 0;
  }

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      applyFilterSort();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      activeSort = sortSelect.value;
      applyFilterSort();
    });
  }

  if (resetFilter) {
    resetFilter.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      const allBtn = document.querySelector('[data-filter="all"]');
      if (allBtn) allBtn.classList.add("active");
      activeFilter = "all";
      if (sortSelect) { sortSelect.value = "default"; }
      activeSort = "default";
      applyFilterSort();
    });
  }

  /* ══════════════════════════════════════════
     5. FAQ accordion
  ══════════════════════════════════════════ */
  document.querySelectorAll(".faq-q").forEach(btn => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const answerId = btn.getAttribute("aria-controls");
      const answer   = document.getElementById(answerId);

      /* Close all others */
      document.querySelectorAll(".faq-q").forEach(other => {
        if (other !== btn) {
          other.setAttribute("aria-expanded", "false");
          const otherA = document.getElementById(other.getAttribute("aria-controls"));
          if (otherA) otherA.hidden = true;
        }
      });

      /* Toggle this one */
      btn.setAttribute("aria-expanded", String(!expanded));
      if (answer) answer.hidden = expanded;
    });
  });

  /* ══════════════════════════════════════════
     6. Topic card 3-D tilt (desktop hover only)
  ══════════════════════════════════════════ */
  if (window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".topic-card").forEach(card => {
      card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width  - 0.5) * 7;
        const y = ((e.clientY - r.top)  / r.height - 0.5) * 7;
        card.style.transform =
          `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-5px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ══════════════════════════════════════════
     7. Scroll-triggered entrance animations
  ══════════════════════════════════════════ */
  animateOnScroll(".topic-card, .why-card, .eg-card, .how-step, .faq-item");

  /* ══════════════════════════════════════════
     8. Progress snapshot (deferred to window load)
  ══════════════════════════════════════════ */
  window.addEventListener("load", () => {
    try {
      if (typeof MathProgress !== "undefined") {
        MathProgress.recordTopicViewed("Homepage");
        const stats = MathProgress.getStats();
        if (stats && stats.totalSolved > 0) showProgressPill(stats);
      }
    } catch (e) {
      /* MathProgress not available — safe to ignore */
    }
  });

}); /* end DOMContentLoaded */

/* ══════════════════════════════════════════════
   UTILITY FUNCTIONS
══════════════════════════════════════════════ */

/* Escape a string for safe HTML insertion */
function escHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

/* Escape a string for safe use inside a RegExp */
function escRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* Highlight matched query text inside a result name */
function highlightMatch(text, query) {
  const safeText  = escHtml(text);
  const safeQuery = escRegex(escHtml(query));
  const re        = new RegExp(`(${safeQuery})`, "gi");
  return safeText.replace(re, "<mark>$1</mark>");
}

/* Show a progress summary pill in the hero section */
function showProgressPill(stats) {
  const heroStats = document.querySelector(".hero-stats");
  if (!heroStats || document.querySelector(".hero-progress-pill")) return;

  const pill = document.createElement("div");
  pill.className = "hero-progress-pill";
  pill.innerHTML = `
    <span>Your progress:</span>
    <strong>${stats.totalSolved}</strong> solved &middot;
    <strong>${stats.accuracy}%</strong> accuracy &middot;
    <strong>${stats.badges ? stats.badges.length : 0}</strong> badges
    &nbsp;<a href="progress.html">View &rarr;</a>
  `;
  pill.style.cssText = `
    margin-top: 16px;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 5px;
    font-family: 'DM Sans', sans-serif;
    font-size: .78rem;
    color: rgba(255,228,196,.5);
    background: rgba(255,228,196,.07);
    border: 1px solid rgba(255,228,196,.14);
    padding: .4rem 1rem;
    border-radius: 50px;
  `;
  pill.querySelectorAll("strong").forEach(s => { s.style.color = "#e8b87a"; });
  const a = pill.querySelector("a");
  if (a) a.style.cssText = "color:#e8b87a; font-weight:700; text-decoration:none;";

  heroStats.insertAdjacentElement("afterend", pill);
}

/* Scroll-triggered entrance animations using CSS classes */
function animateOnScroll(selector) {
  if (!window.IntersectionObserver) return;

  const els = document.querySelectorAll(selector);
  const io  = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("anim-hidden");
        entry.target.classList.add("anim-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });

  els.forEach(el => {
    el.classList.add("anim-hidden");
    io.observe(el);
  });
}