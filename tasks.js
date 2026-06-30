/* ═══════════════════════════════════════════════════════════════
   RONNY BEST MATHEMATICS — tasks.js  v4.1  (FIXED)
   practice · Full CBC 13-topic engine
   Nav · Sidebar scroll-spy · Topic filter · Search
   AdSense-compliant · No policy violations
   ───────────────────────────────────────────────────────────────
   IMPORTANT: Generator, Free-Question, and Image-Scanner UI logic
   now live exclusively in tasks-generator-fix.js to prevent the
   duplicate-listener conflict that stopped topics from generating.
   This file only handles: nav, search, scroll-spy, filter,
   the taskFormulas bank, MathEngine, and utilities.
   ═══════════════════════════════════════════════════════════════ */
"use strict";
console.log("✅ tasks.js v4.1 LOADED");

/* ═══════════════════════════════════════════════════════════════
   SITE SEARCH DATA
   ═══════════════════════════════════════════════════════════════ */
const SITE_PAGES = [
  { name:"Home",               url:"index.html",          type:"Page",   icon:"🏠" },
  { name:"All Lessons",        url:"math-lessons.html",   type:"Page",   icon:"📚" },
  { name:"Practice",           url:"tasks.html",          type:"Page",   icon:"🎲" },
  { name:"Brain Games",        url:"mind.html",           type:"Page",   icon:"🧠" },
  { name:"Ask Mwalimu",        url:"ask-mwalimu.html",    type:"Page",   icon:"🧑‍🏫" },
  { name:"Achievements",       url:"achievements.html",   type:"Page",   icon:"🏆" },
  { name:"My Progress",        url:"progress.html",       type:"Page",   icon:"📈" },
  { name:"About",              url:"about.html",          type:"Page",   icon:"👤" },
  { name:"Contact",            url:"contact.html",        type:"Page",   icon:"✉" },
  { name:"Algebra",            url:"algebra.html",        type:"Lesson", icon:"𝑥" },
  { name:"Trigonometry",       url:"trigonometry.html",   type:"Lesson", icon:"△" },
  { name:"Statistics",         url:"statistics.html",     type:"Lesson", icon:"σ" },
  { name:"Limits",             url:"limits.html",         type:"Lesson", icon:"lim"},
  { name:"Differentiation",    url:"differentiation.html",type:"Lesson", icon:"d/dx"},
  { name:"Integration",        url:"integration.html",    type:"Lesson", icon:"∫" },
  { name:"Vectors",            url:"vectors.html",        type:"Lesson", icon:"→" },
  { name:"Matrices",           url:"matrices.html",       type:"Lesson", icon:"[ ]"},
  { name:"Conic Sections",     url:"conics.html",         type:"Lesson", icon:"⊕" },
  { name:"Sequences & Series", url:"sequences.html",      type:"Lesson", icon:"∑" },
  { name:"Complex Numbers",    url:"complex.html",        type:"Lesson", icon:"i" },
  { name:"Areas",              url:"areas.html",          type:"Lesson", icon:"□" },
  { name:"Volumes",            url:"volumes.html",        type:"Lesson", icon:"⬡" },
  { name:"Logarithms",         url:"algebra.html#logs",   type:"Lesson", icon:"log"},
  { name:"Privacy Policy",     url:"privacy.html",        type:"Page",   icon:"🔒" },
  { name:"Terms of Use",       url:"terms.html",          type:"Page",   icon:"📄" },
];

/* ═══════════════════════════════════════════════════════════════
   DOM READY  — only non-generator init here
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  initWelcomePill();
  initSearch();
  initTopicFilter();
  initSidebarScrollSpy();
  animateOnScroll(".topic-card, .sample-card, .study-step, .error-item, .cbc-pillar");
  loadTesseract();
});

/* ═══════════════════════════════════════════════════════════════
   WELCOME PILL
   ═══════════════════════════════════════════════════════════════ */
function initWelcomePill() {
  const el = document.getElementById("welcome");
  if (!el) return;
  try {
    const user = localStorage.getItem("currentUser");
    el.textContent = (user && user !== "null")
      ? `Welcome back, ${user}!`
      : "Welcome — practice sharpens skill";
  } catch {
    el.textContent = "Welcome — practice sharpens skill";
  }

  try {
    if (typeof MathProgress !== "undefined") {
      MathProgress.recordTopicViewed("practice");
      const stats = MathProgress.getStats();
      if (stats && stats.totalSolved > 0) showProgressPill(stats);
    }
  } catch (e) {}
}

function showProgressPill(stats) {
  const area = document.getElementById("heroProgressArea");
  if (!area || area.querySelector(".hero-progress-pill")) return;
  const pill = document.createElement("div");
  pill.className = "hero-progress-pill";
  pill.style.cssText =
    "margin-top:16px;display:inline-flex;flex-wrap:wrap;align-items:center;" +
    "gap:8px;font-family:var(--font-ui);font-size:.8rem;" +
    "color:rgba(255,228,196,.55);background:rgba(255,228,196,.07);" +
    "border:1px solid rgba(255,228,196,.15);padding:.45rem 1.1rem;border-radius:50px;";
  pill.innerHTML =
    "<span>Your progress:</span>" +
    "<strong style='color:#e8b87a;'>" + stats.totalSolved + "</strong> solved · " +
    "<strong style='color:#e8b87a;'>" + stats.accuracy + "%</strong> accuracy · " +
    "<strong style='color:#e8b87a;'>" + (stats.badges ? stats.badges.length : 0) + "</strong> badges " +
    "<a href='progress.html' style='color:#e8b87a;font-weight:700;text-decoration:none;margin-left:4px;'>View →</a>";
  area.insertAdjacentElement("afterend", pill);
}

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION — handled exclusively by shared.js
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   SEARCH — nav search bar only (hamburger/dropdown = shared.js)
   ═══════════════════════════════════════════════════════════════ */
function initSearch() {
  const searchToggle = document.getElementById("searchToggle");
  const searchBar    = document.getElementById("navSearchBar");
  const searchInput  = document.getElementById("siteSearch");
  const searchClear  = document.getElementById("searchClear");
  const searchRes    = document.getElementById("searchResults");

  function clearSearch() {
    if (searchClear) searchClear.hidden = true;
    if (searchRes)   { searchRes.hidden = true; searchRes.innerHTML = ""; }
  }

  if (searchToggle && searchBar) {
    searchToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const hidden = searchBar.hidden;
      searchBar.hidden = !hidden;
      searchToggle.setAttribute("aria-expanded", String(!hidden));
      if (!hidden) {
        clearSearch();
        if (searchInput) searchInput.value = "";
      } else {
        setTimeout(() => searchInput && searchInput.focus(), 50);
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) { clearSearch(); return; }
      if (searchClear) searchClear.hidden = false;

      const hits = SITE_PAGES.filter(p =>
        p.name.toLowerCase().includes(q) || p.type.toLowerCase().includes(q)
      ).slice(0, 8);

      if (!searchRes) return;
      if (!hits.length) {
        searchRes.hidden = false;
        searchRes.innerHTML = '<div class="sr-no-results">No results for "' + escHTML(q) + '"</div>';
        return;
      }
      searchRes.hidden = false;
      searchRes.innerHTML = hits.map(p =>
        '<a class="sr-item" href="' + p.url + '" role="option">' +
        '<div class="sr-item-icon">' + p.icon + '</div>' +
        '<div class="sr-item-text">' +
        '<span class="sr-item-name">' + escHTML(p.name) + '</span>' +
        '<span class="sr-item-type">' + p.type + '</span>' +
        '</div></a>'
      ).join("");
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (searchBar) searchBar.hidden = true;
        searchToggle && searchToggle.setAttribute("aria-expanded", "false");
        clearSearch();
      }
      if (e.key === "ArrowDown" && searchRes && !searchRes.hidden) {
        const first = searchRes.querySelector(".sr-item");
        if (first) { first.focus(); e.preventDefault(); }
      }
    });
  }

  if (searchClear) {
    searchClear.addEventListener("click", (e) => {
      e.stopPropagation();
      if (searchInput) searchInput.value = "";
      clearSearch();
      if (searchInput) searchInput.focus();
    });
  }

  /* Close search results when clicking outside */
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-search-bar") && !e.target.closest("#searchToggle")) {
      if (searchRes) searchRes.hidden = true;
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   TOPIC FILTER BUTTONS (the card grid in "Topics Covered")
   ═══════════════════════════════════════════════════════════════ */
function initTopicFilter() {
  const btns  = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll("#topicsGrid .topic-card");
  if (!btns.length || !cards.length) return;

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        card.classList.toggle("hidden", filter !== "all" && card.dataset.strand !== filter);
      });
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   SIDEBAR SCROLL-SPY
   ═══════════════════════════════════════════════════════════════ */
function initSidebarScrollSpy() {
  const links = document.querySelectorAll(".sidebar-link[href^='#']");
  if (!links.length || !window.IntersectionObserver) return;
  const sections = [...links]
    .map(l => document.getElementById(l.getAttribute("href").slice(1)))
    .filter(Boolean);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
      }
    });
  }, { rootMargin: "-20% 0px -60% 0px", threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL ENTRANCE ANIMATIONS
   ═══════════════════════════════════════════════════════════════ */
function animateOnScroll(selector) {
  if (!window.IntersectionObserver) return;
  document.querySelectorAll(selector).forEach(el => {
    el.style.opacity   = "0";
    el.style.transform = "translateY(14px)";
    el.style.transition = "opacity .4s ease, transform .4s ease";
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity   = "1";
        e.target.style.transform = "translateY(0)";
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(selector).forEach(el => io.observe(el));
}

/* ═══════════════════════════════════════════════════════════════
   LOAD TESSERACT (background, non-blocking)
   ═══════════════════════════════════════════════════════════════ */
function loadTesseract() {
  var s = document.createElement("script");
  s.src   = "https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/5.0.4/tesseract.min.js";
  s.async = true;
  document.head.appendChild(s);
}

/* ═══════════════════════════════════════════════════════════════
   UTILITY
   ═══════════════════════════════════════════════════════════════ */
function escHTML(str) {
  var d = document.createElement("div");
  d.textContent = String(str);
  return d.innerHTML;
}

/* ═══════════════════════════════════════════════════════════════
   PROBLEM GENERATOR BANK — All 13 CBC Topics
   Consumed by tasks-generator-fix.js (window.taskFormulas)
   ═══════════════════════════════════════════════════════════════ */
window.taskFormulas = {

  /* ── 1. DIFFERENTIATION ── */
  differentiation: [
    x => ({
      q: "Differentiate: y = " + x + "x\u2074 \u2212 " + (x+2) + "x\u00b3 + " + (x+1) + "x\u00b2 \u2212 " + x + "x + " + (x-1),
      ans: (4*x) + "x\u00b3 \u2212 " + (3*(x+2)) + "x\u00b2 + " + (2*(x+1)) + "x \u2212 " + x,
      steps: "<strong>Rule:</strong> Power rule \u2014 d/dx(x\u207f) = n\u00b7x\u207f\u207b\u00b9, d/dx(constant) = 0<br><br>" +
             "d/dx(" + x + "x\u2074) = <strong>" + (4*x) + "x\u00b3</strong><br>" +
             "d/dx(\u2212" + (x+2) + "x\u00b3) = <strong>\u2212" + (3*(x+2)) + "x\u00b2</strong><br>" +
             "d/dx(" + (x+1) + "x\u00b2) = <strong>" + (2*(x+1)) + "x</strong><br>" +
             "d/dx(\u2212" + x + "x) = <strong>\u2212" + x + "</strong><br><br>" +
             "<strong>\u2714 Final Answer: y\u2032 = " + (4*x) + "x\u00b3 \u2212 " + (3*(x+2)) + "x\u00b2 + " + (2*(x+1)) + "x \u2212 " + x + "</strong>"
    }),
    x => ({
      q: "Use the product rule to differentiate: y = " + x + "x\u00b2 \u00b7 sin(x)",
      ans: (2*x) + "x\u00b7sin(x) + " + x + "x\u00b2\u00b7cos(x)",
      steps: "<strong>Product Rule:</strong> d/dx[u\u00b7v] = u'v + uv'<br><br>" +
             "Let u = " + x + "x\u00b2, so u\u2032 = " + (2*x) + "x<br>" +
             "Let v = sin(x), so v\u2032 = cos(x)<br><br>" +
             "dy/dx = (" + (2*x) + "x)\u00b7sin(x) + (" + x + "x\u00b2)\u00b7cos(x)<br><br>" +
             "<strong>\u2714 Final Answer: y\u2032 = " + (2*x) + "x\u00b7sin(x) + " + x + "x\u00b2\u00b7cos(x)</strong>"
    }),
    x => ({
      q: "Differentiate using the chain rule: y = (" + x + "x + " + (x+1) + ")\u2075",
      ans: (5*x) + "(" + x + "x + " + (x+1) + ")\u2074",
      steps: "<strong>Chain Rule:</strong> d/dx[f(g(x))] = f\u2032(g(x))\u00b7g\u2032(x)<br><br>" +
             "Outer: u\u2075 where u = " + x + "x + " + (x+1) + "<br>" +
             "d/dx(u\u2075) = 5u\u2074, \u00a0 d/dx(" + x + "x + " + (x+1) + ") = " + x + "<br><br>" +
             "dy/dx = 5(" + x + "x + " + (x+1) + ")\u2074 \u00d7 " + x + " = <strong>" + (5*x) + "(" + x + "x + " + (x+1) + ")\u2074</strong><br><br>" +
             "<strong>\u2714 y\u2032 = " + (5*x) + "(" + x + "x + " + (x+1) + ")\u2074</strong>"
    }),
    x => ({
      q: "Differentiate: y = " + x + "e^(" + x + "x) + " + (x+1) + "ln(x)",
      ans: (x*x) + "e^(" + x + "x) + " + (x+1) + "/x",
      steps: "<strong>Rules:</strong> d/dx(e^(kx)) = k\u00b7e^(kx) \u00a0|\u00a0 d/dx(ln x) = 1/x<br><br>" +
             "d/dx(" + x + "e^(" + x + "x)) = " + x + " \u00d7 " + x + " \u00d7 e^(" + x + "x) = <strong>" + (x*x) + "e^(" + x + "x)</strong><br>" +
             "d/dx(" + (x+1) + "ln(x)) = <strong>" + (x+1) + "/x</strong><br><br>" +
             "<strong>\u2714 y\u2032 = " + (x*x) + "e^(" + x + "x) + " + (x+1) + "/x</strong>"
    }),
    x => ({
      q: "Use the quotient rule: y = (" + x + "x\u00b2) / (" + (x+1) + "x + 1)",
      ans: "[" + (2*x) + "(" + (x+1) + "x+1) \u2212 " + (x*(x+1)) + "x\u00b2] / (" + (x+1) + "x+1)\u00b2",
      steps: "<strong>Quotient Rule:</strong> d/dx[u/v] = (u'v \u2212 uv') / v\u00b2<br><br>" +
             "u = " + x + "x\u00b2, u\u2032 = " + (2*x) + "x\u00a0|\u00a0v = " + (x+1) + "x+1, v\u2032 = " + (x+1) + "<br><br>" +
             "dy/dx = [" + (2*x) + "x\u00b7(" + (x+1) + "x+1) \u2212 " + x + "x\u00b2\u00b7" + (x+1) + "] / (" + (x+1) + "x+1)\u00b2<br><br>" +
             "<strong>\u2714 y\u2032 = [" + (2*x) + "(" + (x+1) + "x+1) \u2212 " + (x*(x+1)) + "x\u00b2] / (" + (x+1) + "x+1)\u00b2</strong>"
    }),
    x => ({
      q: "Find dy/dx at x = 1 for: y = " + x + "x\u00b3 \u2212 " + (x+3) + "x",
      ans: String(3*x - (x+3)),
      steps: "<strong>Step 1:</strong> dy/dx = " + (3*x) + "x\u00b2 \u2212 " + (x+3) + "<br><br>" +
             "<strong>Step 2:</strong> At x = 1:<br>" +
             "dy/dx = " + (3*x) + "(1) \u2212 " + (x+3) + " = <strong>" + (3*x-(x+3)) + "</strong><br><br>" +
             "<strong>\u2714 dy/dx at x = 1 is " + (3*x-(x+3)) + "</strong>"
    })
  ],

  /* ── 2. INTEGRATION ── */
  integration: [
    x => ({
      q: "Integrate: \u222b(" + x + "x\u00b3 \u2212 " + (x+2) + "x\u00b2 + " + (x+4) + "x \u2212 " + x + ") dx",
      ans: (x/4).toFixed(3) + "x\u2074 \u2212 " + ((x+2)/3).toFixed(3) + "x\u00b3 + " + ((x+4)/2).toFixed(3) + "x\u00b2 \u2212 " + x + "x + C",
      steps: "<strong>Rule:</strong> \u222bx\u207f dx = x\u207f\u207a\u00b9/(n+1) + C<br><br>" +
             "\u222b" + x + "x\u00b3 dx = <strong>" + (x/4).toFixed(3) + "x\u2074</strong><br>" +
             "\u222b\u2212" + (x+2) + "x\u00b2 dx = <strong>\u2212" + ((x+2)/3).toFixed(3) + "x\u00b3</strong><br>" +
             "\u222b" + (x+4) + "x dx = <strong>" + ((x+4)/2).toFixed(3) + "x\u00b2</strong><br>" +
             "\u222b\u2212" + x + " dx = <strong>\u2212" + x + "x</strong><br>" +
             "Always add <strong>+ C</strong><br><br>" +
             "<strong>\u2714 Answer: " + (x/4).toFixed(3) + "x\u2074 \u2212 " + ((x+2)/3).toFixed(3) + "x\u00b3 + " + ((x+4)/2).toFixed(3) + "x\u00b2 \u2212 " + x + "x + C</strong>"
    }),
    x => ({
      q: "Evaluate: \u222b\u2080^" + x + " (" + x + "t\u00b2 + " + (x+1) + ") dt",
      ans: (x/3*x*x + (x+1)*x).toFixed(4),
      steps: "<strong>Antiderivative:</strong> F(t) = " + (x/3).toFixed(3) + "t\u00b3 + " + (x+1) + "t<br><br>" +
             "F(" + x + ") = " + (x/3).toFixed(3) + "(" + x + ")\u00b3 + " + (x+1) + "(" + x + ") = " + (x/3*x*x).toFixed(3) + " + " + ((x+1)*x) + " = " + (x/3*x*x+(x+1)*x).toFixed(4) + "<br>" +
             "F(0) = 0<br><br>" +
             "<strong>\u2714 Final Answer: " + (x/3*x*x+(x+1)*x).toFixed(4) + "</strong>"
    }),
    x => ({
      q: "Integrate by substitution: \u222b" + x + "\u00b7sin(" + x + "x + 1) dx",
      ans: "\u2212cos(" + x + "x + 1) + C",
      steps: "<strong>Let u = " + x + "x + 1</strong>, so du = " + x + " dx \u2192 dx = du/" + x + "<br><br>" +
             "\u222b" + x + "\u00b7sin(u) \u00b7 du/" + x + " = \u222bsin(u) du = \u2212cos(u) + C<br><br>" +
             "Back-substitute u = " + x + "x + 1:<br><br>" +
             "<strong>\u2714 \u2212cos(" + x + "x + 1) + C</strong>"
    }),
    x => ({
      q: "Integrate: \u222b(" + x + "e^(" + x + "x) + " + (x+1) + "/x) dx",
      ans: "e^(" + x + "x) + " + (x+1) + "\u00b7ln|x| + C",
      steps: "<strong>Rules:</strong> \u222be^(kx) dx = (1/k)e^(kx)+C \u00a0|\u00a0 \u222b1/x dx = ln|x|+C<br><br>" +
             "\u222b" + x + "e^(" + x + "x) dx = " + x + " \u00d7 (1/" + x + ")e^(" + x + "x) = <strong>e^(" + x + "x)</strong><br>" +
             "\u222b" + (x+1) + "/x dx = <strong>" + (x+1) + "\u00b7ln|x|</strong><br><br>" +
             "<strong>\u2714 e^(" + x + "x) + " + (x+1) + "\u00b7ln|x| + C</strong>"
    }),
    x => ({
      q: "Find the area under y = " + x + "x + " + (x+1) + " from x = 0 to x = " + x,
      ans: (x/2*x*x + (x+1)*x).toFixed(2),
      steps: "Area = \u222b\u2080^" + x + " (" + x + "x + " + (x+1) + ") dx<br><br>" +
             "F(x) = " + (x/2) + "x\u00b2 + " + (x+1) + "x<br><br>" +
             "F(" + x + ") = " + (x/2) + "(" + x + ")\u00b2 + " + (x+1) + "(" + x + ") = " + (x/2*x*x) + " + " + ((x+1)*x) + " = " + (x/2*x*x+(x+1)*x).toFixed(2) + "<br>" +
             "F(0) = 0<br><br>" +
             "<strong>\u2714 Area = " + (x/2*x*x+(x+1)*x).toFixed(2) + " square units</strong>"
    })
  ],

  /* ── 3. LIMITS ── */
  limits: [
    x => ({
      q: "Evaluate: lim(x\u2192" + x + ") [x\u00b2 \u2212 " + x + "x + " + (x*(x-1)) + "] / (x \u2212 " + x + ")",
      ans: String(x),
      steps: "<strong>Direct substitution gives 0/0 \u2192 L\u2019H\u00f4pital\u2019s Rule:</strong><br><br>" +
             "d/dx(x\u00b2 \u2212 " + x + "x + " + (x*(x-1)) + ") = 2x \u2212 " + x + "<br>" +
             "d/dx(x \u2212 " + x + ") = 1<br><br>" +
             "lim(x\u2192" + x + ") (2x \u2212 " + x + ")/1 = 2(" + x + ") \u2212 " + x + " = <strong>" + x + "</strong><br><br>" +
             "<strong>\u2714 Final Answer: " + x + "</strong>"
    }),
    x => ({
      q: "Evaluate: lim(x\u21920) sin(" + x + "x) / (" + x + "x)",
      ans: "1",
      steps: "<strong>Standard limit:</strong> lim(x\u21920) sin(kx)/(kx) = 1 for any k \u2260 0<br><br>" +
             "Let u = " + x + "x. As x\u21920, u\u21920.<br>" +
             "lim(u\u21920) sin(u)/u = <strong>1</strong> (squeeze theorem)<br><br>" +
             "<strong>\u2714 Final Answer: 1</strong>"
    }),
    x => ({
      q: "Find: lim(x\u2192\u221e) (" + x + "x\u00b2 + " + (x+1) + ") / (" + (x+2) + "x\u00b2 \u2212 " + x + ")",
      ans: (x/(x+2)).toFixed(4),
      steps: "<strong>Divide by x\u00b2 (highest power):</strong><br><br>" +
             "= lim (" + x + " + " + (x+1) + "/x\u00b2) / (" + (x+2) + " \u2212 " + x + "/x\u00b2)<br><br>" +
             "As x\u2192\u221e the extra terms \u21920:<br>" +
             "= " + x + " / " + (x+2) + " = <strong>" + (x/(x+2)).toFixed(4) + "</strong><br><br>" +
             "<strong>\u2714 " + (x/(x+2)).toFixed(4) + "</strong>"
    }),
    x => ({
      q: "L\u2019H\u00f4pital\u2019s Rule: lim(x\u21920) (e^(" + x + "x) \u2212 1) / (" + x + "x)",
      ans: "1",
      steps: "<strong>0/0 form \u2714 L\u2019H\u00f4pital applies</strong><br><br>" +
             "Numerator derivative: " + x + "e^(" + x + "x)<br>" +
             "Denominator derivative: " + x + "<br><br>" +
             "lim(x\u21920) " + x + "e^(" + x + "x)/" + x + " = lim e^(" + x + "x) = e\u2070 = <strong>1</strong><br><br>" +
             "<strong>\u2714 Final Answer: 1</strong>"
    })
  ],

  /* ── 4. ALGEBRA ── */
  algebra: [
    x => ({
      q: "Solve for x: " + (x+1) + "x + " + (2*x) + " = " + (x*(x+3) + 2*x),
      ans: "x = " + x,
      steps: (x+1) + "x + " + (2*x) + " = " + (x*(x+3)+2*x) + "<br>" +
             "Subtract " + (2*x) + ": \u00a0" + (x+1) + "x = " + (x*(x+3)) + "<br>" +
             "Divide by " + (x+1) + ": \u00a0x = " + x + "<br><br>" +
             "<strong>\u2714 x = " + x + "</strong>"
    }),
    x => ({
      q: "Solve: x\u00b2 \u2212 " + (x+3) + "x + " + (x*(x+3) - 2*x) + " = 0",
      ans: "x = " + x + " or x = " + (x+3-x),
      steps: "<strong>Quadratic formula:</strong> x = [\u2212b \u00b1 \u221a(b\u00b2\u22124ac)] / 2a<br><br>" +
             "a=1, b=\u2212" + (x+3) + ", c=" + (x*(x+3)-2*x) + "<br>" +
             "\u0394 = " + ((x+3)*(x+3)) + " \u2212 " + (4*(x*(x+3)-2*x)) + " = " + ((x+3)*(x+3)-4*(x*(x+3)-2*x)) + "<br>" +
             "\u221a\u0394 = " + Math.sqrt((x+3)*(x+3)-4*(x*(x+3)-2*x)).toFixed(3) + "<br><br>" +
             "x\u2081 = " + x + ", \u00a0 x\u2082 = " + (x+3-x) + "<br><br>" +
             "<strong>\u2714 x = " + x + " or x = " + (x+3-x) + "</strong>"
    }),
    x => ({
      q: "Solve simultaneously: " + x + "x + " + (x+1) + "y = " + (x*x+(x+1)*(x+2)) + " \u00a0and\u00a0 x \u2212 y = " + (x-(x+2)),
      ans: "x = " + x + ", y = " + (x+2),
      steps: "From eq 2: x = y \u2212 2<br>" +
             "Substitute: " + x + "(y\u22122) + " + (x+1) + "y = " + (x*x+(x+1)*(x+2)) + "<br>" +
             (2*x+1) + "y = " + (x*x+(x+1)*(x+2)+2*x) + " \u00a0\u21920 y = " + (x+2) + "<br>" +
             "x = " + (x+2) + " \u2212 2 = " + x + "<br><br>" +
             "<strong>\u2714 x = " + x + ", y = " + (x+2) + "</strong>"
    }),
    x => ({
      q: "Solve: " + (x+1) + "x \u2212 " + (2*x) + " > " + (x*(x-1)),
      ans: "x > " + x,
      steps: (x+1) + "x \u2212 " + (2*x) + " > " + (x*(x-1)) + "<br>" +
             "Add " + (2*x) + ": \u00a0" + (x+1) + "x > " + (x*(x-1)+2*x) + "<br>" +
             "Divide by " + (x+1) + " (positive): \u00a0x > " + x + "<br><br>" +
             "<strong>\u2714 x > " + x + "</strong>"
    }),
    x => ({
      q: "Factorise: " + x + "x\u00b2 + " + (x*(x+1)+x) + "x + " + (x*(x+1)),
      ans: x + "(x + 1)(x + " + (x+1) + ")",
      steps: "Factor out " + x + ": " + x + "[x\u00b2 + " + (x+2) + "x + " + (x+1) + "]<br>" +
             "Factor quadratic: numbers \u00d7 to " + (x+1) + " and add to " + (x+2) + " \u2192 1 and " + (x+1) + "<br>" +
             "= " + x + "(x + 1)(x + " + (x+1) + ")<br><br>" +
             "<strong>\u2714 " + x + "(x + 1)(x + " + (x+1) + ")</strong>"
    })
  ],

  /* ── 5. LOGARITHMS ── */
  logarithms: [
    x => ({
      q: "Solve: log\u2082(x) = " + x,
      ans: "x = " + Math.pow(2,x),
      steps: "<strong>Rule:</strong> log_a(x) = b \u2194 x = a^b<br><br>" +
             "log\u2082(x) = " + x + " \u21d2 x = 2^" + x + " = <strong>" + Math.pow(2,x) + "</strong><br><br>" +
             "<strong>\u2714 x = " + Math.pow(2,x) + "</strong>"
    }),
    x => ({
      q: "Simplify: log(" + (x*x) + ") + log(" + (x+1) + ") \u2212 log(" + (x*(x+1)) + ")",
      ans: "log(" + x + ")",
      steps: "log(A)+log(B) = log(AB) \u00a0|\u00a0 log(A)\u2212log(B) = log(A/B)<br><br>" +
             "log(" + (x*x) + ") + log(" + (x+1) + ") = log(" + (x*x*(x+1)) + ")<br>" +
             "log(" + (x*x*(x+1)) + ") \u2212 log(" + (x*(x+1)) + ") = log(" + x + ")<br><br>" +
             "<strong>\u2714 log(" + x + ")</strong>"
    }),
    x => ({
      q: "Evaluate: log\u2083(" + Math.pow(3,x) + ")",
      ans: String(x),
      steps: "log\u2083(3^" + x + ") = " + x + "\u00b7log\u2083(3) = " + x + "\u00b71 = <strong>" + x + "</strong><br><br>" +
             "<em>Or change-of-base: ln(" + Math.pow(3,x) + ")/ln(3) = " + (Math.log(Math.pow(3,x))).toFixed(4) + "/" + Math.log(3).toFixed(4) + " = " + x + "</em><br><br>" +
             "<strong>\u2714 " + x + "</strong>"
    }),
    x => ({
      q: "Solve: log\u2085(x + " + x + ") \u2212 log\u2085(x) = log\u2085(" + (x+1) + ")",
      ans: "x = " + x,
      steps: "log((x + " + x + ")/x) = log\u2085(" + (x+1) + ")<br>" +
             "Equal logs \u21d2 (x + " + x + ")/x = " + (x+1) + "<br>" +
             "x + " + x + " = " + (x+1) + "x<br>" +
             x + " = " + x + "x \u21d2 x = 1... let\u2019s verify: (1+" + x + ")/1 = " + (x+1) + " \u2714<br><br>" +
             "<strong>\u2714 x = " + x + "</strong>"
    })
  ],

  /* ── 6. SEQUENCES ── */
  sequences: [
    x => ({
      q: "An AP: first term " + x + ", common difference " + (x+1) + ". Find a\u2081\u2080 and S\u2081\u2080.",
      ans: "a\u2081\u2080 = " + (x+9*(x+1)) + ", S\u2081\u2080 = " + (5*(2*x+9*(x+1))),
      steps: "<strong>AP:</strong> a_n = a + (n\u22121)d \u00a0|\u00a0 S_n = n/2\u00b7[2a + (n\u22121)d]<br><br>" +
             "a = " + x + ", d = " + (x+1) + ", n = 10<br>" +
             "a\u2081\u2080 = " + x + " + 9\u00d7" + (x+1) + " = <strong>" + (x+9*(x+1)) + "</strong><br>" +
             "S\u2081\u2080 = 5\u00b7[" + (2*x) + " + " + (9*(x+1)) + "] = <strong>" + (5*(2*x+9*(x+1))) + "</strong><br><br>" +
             "<strong>\u2714 a\u2081\u2080 = " + (x+9*(x+1)) + ", S\u2081\u2080 = " + (5*(2*x+9*(x+1))) + "</strong>"
    }),
    x => ({
      q: "A GP: first term " + x + ", common ratio " + (x>4?0.5:2) + ". Find a\u2086 and " + (x>4?"S\u221e":"S\u2086") + ".",
      ans: x>4
        ? "a\u2086 = " + (x*Math.pow(0.5,5)).toFixed(4) + ", S\u221e = " + (x/0.5).toFixed(4)
        : "a\u2086 = " + (x*32) + ", S\u2086 = " + (x*63),
      steps: x>4
        ? "<strong>GP:</strong> a_n = a\u00b7r^(n\u22121) \u00a0|\u00a0 S\u221e = a/(1\u2212r) when |r|<1<br><br>" +
          "a=" + x + ", r=0.5<br>a\u2086 = " + x + "\u00b7(0.5)\u2075 = <strong>" + (x*Math.pow(0.5,5)).toFixed(4) + "</strong><br>" +
          "S\u221e = " + x + "/(1\u22120.5) = <strong>" + (x/0.5).toFixed(4) + "</strong><br><br>" +
          "<strong>\u2714 a\u2086=" + (x*Math.pow(0.5,5)).toFixed(4) + ", S\u221e=" + (x/0.5).toFixed(4) + "</strong>"
        : "<strong>GP:</strong> a_n = a\u00b7r^(n\u22121) \u00a0|\u00a0 S_n = a(r^n\u22121)/(r\u22121)<br><br>" +
          "a=" + x + ", r=2, n=6<br>a\u2086 = " + x + "\u00b72\u2075 = <strong>" + (x*32) + "</strong><br>" +
          "S\u2086 = " + x + "(2\u2076\u22121)/1 = " + x + "\u00d763 = <strong>" + (x*63) + "</strong><br><br>" +
          "<strong>\u2714 a\u2086=" + (x*32) + ", S\u2086=" + (x*63) + "</strong>"
    }),
    x => ({
      q: "U_n = " + x + "n\u00b2 \u2212 " + (x+1) + "n + " + x + ". Find U\u2081, U\u2083, U\u2085.",
      ans: "U\u2081=" + (x-(x+1)+x) + ", U\u2083=" + (9*x-3*(x+1)+x) + ", U\u2085=" + (25*x-5*(x+1)+x),
      steps: "Substitute n = 1, 3, 5:<br><br>" +
             "U\u2081 = " + x + "(1) \u2212 " + (x+1) + "(1) + " + x + " = <strong>" + (x-(x+1)+x) + "</strong><br>" +
             "U\u2083 = " + x + "(9) \u2212 " + (x+1) + "(3) + " + x + " = " + (9*x) + " \u2212 " + (3*(x+1)) + " + " + x + " = <strong>" + (9*x-3*(x+1)+x) + "</strong><br>" +
             "U\u2085 = " + x + "(25) \u2212 " + (x+1) + "(5) + " + x + " = <strong>" + (25*x-5*(x+1)+x) + "</strong><br><br>" +
             "<strong>\u2714 U\u2081=" + (x-(x+1)+x) + ", U\u2083=" + (9*x-3*(x+1)+x) + ", U\u2085=" + (25*x-5*(x+1)+x) + "</strong>"
    })
  ],

  /* ── 7. COMPLEX NUMBERS ── */
  complex: [
    x => ({
      q: "Find the modulus and argument of z = " + x + " + " + (x+1) + "i",
      ans: "|z| = " + Math.sqrt(x*x+(x+1)*(x+1)).toFixed(4) + ", arg(z) = " + (Math.atan2(x+1,x)*180/Math.PI).toFixed(2) + "\u00b0",
      steps: "|z| = \u221a(a\u00b2+b\u00b2) = \u221a(" + x + "\u00b2+" + (x+1) + "\u00b2) = \u221a" + (x*x+(x+1)*(x+1)) + " = <strong>" + Math.sqrt(x*x+(x+1)*(x+1)).toFixed(4) + "</strong><br><br>" +
             "arg(z) = arctan(b/a) = arctan(" + (x+1) + "/" + x + ") = <strong>" + (Math.atan2(x+1,x)*180/Math.PI).toFixed(2) + "\u00b0</strong><br><br>" +
             "<strong>\u2714 |z|=" + Math.sqrt(x*x+(x+1)*(x+1)).toFixed(4) + ", arg=" + (Math.atan2(x+1,x)*180/Math.PI).toFixed(2) + "\u00b0</strong>"
    }),
    x => ({
      q: "Multiply: (" + x + " + " + (x+1) + "i)(" + (x+2) + " \u2212 " + x + "i)",
      ans: (x*(x+2)+(x+1)*x) + " + " + ((x+1)*(x+2)-x*x) + "i",
      steps: "<strong>FOIL (i\u00b2 = \u22121):</strong><br><br>" +
             "= " + (x*(x+2)) + " \u2212 " + (x*x) + "i + " + ((x+1)*(x+2)) + "i \u2212 " + ((x+1)*x) + "i\u00b2<br>" +
             "= " + (x*(x+2)) + " + " + ((x+1)*x) + " + (" + ((x+1)*(x+2)) + " \u2212 " + (x*x) + ")i\u00a0\u00a0[i\u00b2=\u22121]<br>" +
             "= <strong>" + (x*(x+2)+(x+1)*x) + " + " + ((x+1)*(x+2)-x*x) + "i</strong><br><br>" +
             "<strong>\u2714 " + (x*(x+2)+(x+1)*x) + " + " + ((x+1)*(x+2)-x*x) + "i</strong>"
    }),
    x => ({
      q: "For z = " + x + " \u2212 " + (x+1) + "i, find z* and |z|\u00b2",
      ans: "z* = " + x + " + " + (x+1) + "i, |z|\u00b2 = " + (x*x+(x+1)*(x+1)),
      steps: "<strong>Conjugate:</strong> flip sign of Im part:<br>" +
             "z* = <strong>" + x + " + " + (x+1) + "i</strong><br><br>" +
             "|z|\u00b2 = a\u00b2+b\u00b2 = " + (x*x) + "+" + ((x+1)*(x+1)) + " = <strong>" + (x*x+(x+1)*(x+1)) + "</strong><br><br>" +
             "<strong>\u2714 z*=" + x + "+" + (x+1) + "i, |z|\u00b2=" + (x*x+(x+1)*(x+1)) + "</strong>"
    })
  ],

  /* ── 8. TRIGONOMETRY ── */
  trigonometry: [
    x => ({
      q: "Exact value: sin(" + [30,45,60,90,120,135,150,180][x%8] + "\u00b0)",
      ans: ["\u00bd","\u221a2/2","\u221a3/2","1","\u221a3/2","\u221a2/2","\u00bd","0"][x%8],
      steps: "<strong>Standard angles:</strong><br>" +
             "sin30\u00b0=\u00bd, sin45\u00b0=\u221a2/2, sin60\u00b0=\u221a3/2, sin90\u00b0=1<br>" +
             "sin120\u00b0=\u221a3/2, sin135\u00b0=\u221a2/2, sin150\u00b0=\u00bd, sin180\u00b0=0<br><br>" +
             "<strong>\u2714 sin(" + [30,45,60,90,120,135,150,180][x%8] + "\u00b0) = " + ["\u00bd","\u221a2/2","\u221a3/2","1","\u221a3/2","\u221a2/2","\u00bd","0"][x%8] + "</strong>"
    }),
    x => ({
      q: "Solve for 0\u00b0 \u2264 \u03b8 \u2264 360\u00b0: sin(\u03b8) = " + (x%2===0?"0.5":"\u22120.5"),
      ans: x%2===0 ? "\u03b8 = 30\u00b0 or \u03b8 = 150\u00b0" : "\u03b8 = 210\u00b0 or \u03b8 = 330\u00b0",
      steps: "Principal value: arcsin(" + (x%2===0?"0.5":"\u22120.5") + ") = " + (x%2===0?"30\u00b0":"\u222230\u00b0") + "<br><br>" +
             (x%2===0
               ? "sin positive \u2192 Q1 and Q2:<br>\u03b8\u2081=30\u00b0, \u03b8\u2082=180\u00b0\u221230\u00b0=150\u00b0"
               : "sin negative \u2192 Q3 and Q4:<br>\u03b8\u2081=180\u00b0+30\u00b0=210\u00b0, \u03b8\u2082=360\u00b0\u221230\u00b0=330\u00b0") + "<br><br>" +
             "<strong>\u2714 " + (x%2===0?"\u03b8=30\u00b0 or 150\u00b0":"\u03b8=210\u00b0 or 330\u00b0") + "</strong>"
    }),
    x => {
      var a=(x+2), b=(x+4), C=(30+x*5);
      var c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(C*Math.PI/180));
      return {
        q: "In \u25b3ABC: a=" + a + ", b=" + b + ", C=" + C + "\u00b0. Find c.",
        ans: "c \u2248 " + c.toFixed(3),
        steps: "<strong>Cosine Rule:</strong> c\u00b2 = a\u00b2+b\u00b2\u22122ab\u00b7cos(C)<br><br>" +
               "cos(" + C + "\u00b0) = " + Math.cos(C*Math.PI/180).toFixed(4) + "<br>" +
               "c\u00b2 = " + (a*a) + "+" + (b*b) + "\u22122\u00d7" + a + "\u00d7" + b + "\u00d7" + Math.cos(C*Math.PI/180).toFixed(4) + "<br>" +
               "c\u00b2 = " + (a*a+b*b-2*a*b*Math.cos(C*Math.PI/180)).toFixed(4) + "<br>" +
               "c = <strong>" + c.toFixed(3) + "</strong><br><br>" +
               "<strong>\u2714 c \u2248 " + c.toFixed(3) + "</strong>"
      };
    },
    x => {
      var deg=x*10;
      var s=Math.sin(deg*Math.PI/180), co=Math.cos(deg*Math.PI/180);
      return {
        q: "Verify: sin\u00b2(" + deg + "\u00b0) + cos\u00b2(" + deg + "\u00b0) = 1",
        ans: "1 \u2714",
        steps: "sin(" + deg + "\u00b0) = " + s.toFixed(6) + "<br>" +
               "cos(" + deg + "\u00b0) = " + co.toFixed(6) + "<br>" +
               "sin\u00b2+cos\u00b2 = " + (s*s).toFixed(6) + " + " + (co*co).toFixed(6) + " = " + (s*s+co*co).toFixed(6) + " \u2248 1 \u2714<br><br>" +
               "<strong>Key identities:</strong> 1+tan\u00b2\u03b8=sec\u00b2\u03b8, sin2A=2sinAcosA, cos2A=cos\u00b2A\u2212sin\u00b2A<br><br>" +
               "<strong>\u2714 Identity verified</strong>"
      };
    }
  ],

  /* ── 9. STATISTICS ── */
  statistics: [
    x => {
      var data=[x,x+2,x+4,x+1,x+5,x+3,x+2,x+6];
      var mean=data.reduce(function(a,b){return a+b;},0)/data.length;
      var sorted=[].concat(data).sort(function(a,b){return a-b;});
      var median=(sorted[3]+sorted[4])/2;
      var variance=data.reduce(function(s,v){return s+(v-mean)*(v-mean);},0)/data.length;
      var sd=Math.sqrt(variance);
      return {
        q: "Find mean, median and SD of: " + data.join(", "),
        ans: "Mean=" + mean.toFixed(2) + ", Median=" + median.toFixed(2) + ", SD=" + sd.toFixed(4),
        steps: "<strong>Mean:</strong> Sum=" + data.reduce(function(a,b){return a+b;},0) + ", n=" + data.length + " \u21d2 Mean=" + mean.toFixed(2) + "<br><br>" +
               "<strong>Median (sorted):</strong> " + sorted.join(", ") + " \u21d2 (" + sorted[3] + "+" + sorted[4] + ")/2 = " + median.toFixed(2) + "<br><br>" +
               "<strong>SD:</strong> Var=" + variance.toFixed(4) + " \u21d2 SD=\u221a" + variance.toFixed(4) + " = <strong>" + sd.toFixed(4) + "</strong><br><br>" +
               "<strong>\u2714 Mean=" + mean.toFixed(2) + ", Median=" + median.toFixed(2) + ", SD=" + sd.toFixed(4) + "</strong>"
      };
    },
    x => ({
      q: "A bag has " + (x+2) + " red and " + (x+3) + " blue balls. Find P(red) and P(2 reds without replacement).",
      ans: "P(red)=" + ((x+2)/(2*x+5)).toFixed(4) + ", P(2 reds)=" + (((x+2)*(x+1))/((2*x+5)*(2*x+4))).toFixed(4),
      steps: "Total = " + (x+2) + "+" + (x+3) + " = " + (2*x+5) + "<br><br>" +
             "P(red) = " + (x+2) + "/" + (2*x+5) + " = <strong>" + ((x+2)/(2*x+5)).toFixed(4) + "</strong><br><br>" +
             "P(2 reds, no replace) = " + (x+2) + "/" + (2*x+5) + " \u00d7 " + (x+1) + "/" + (2*x+4) + " = <strong>" + (((x+2)*(x+1))/((2*x+5)*(2*x+4))).toFixed(4) + "</strong><br><br>" +
             "<strong>\u2714 P(red)=" + ((x+2)/(2*x+5)).toFixed(4) + ", P(2 reds)=" + (((x+2)*(x+1))/((2*x+5)*(2*x+4))).toFixed(4) + "</strong>"
    }),
    x => {
      var n=x+5, k=x, r=1;
      for(var i=0;i<k;i++) r=r*(n-i)/(i+1);
      r=Math.round(r);
      return {
        q: "Find C(" + (x+5) + ", " + x + ") \u2014 choose " + x + " from " + (x+5) + ".",
        ans: String(r),
        steps: "<strong>C(n,r) = n! / [r!(n\u2212r)!]</strong><br><br>" +
               "C(" + (x+5) + "," + x + ") = [" + Array.from({length:x},function(_,i){return x+5-i;}).join("\u00d7") + "] / [" + Array.from({length:x},function(_,i){return i+1;}).join("\u00d7") + "]<br>" +
               "= <strong>" + r + "</strong><br><br>" +
               "<strong>\u2714 C(" + (x+5) + "," + x + ") = " + r + "</strong>"
      };
    }
  ],

  /* ── 10. MATRICES ── */
  matrices: [
    x => {
      var det = x*(x+4)-(x+1)*(x+2);
      return {
        q: "Find det and inverse of A = [[" + x + ", " + (x+1) + "], [" + (x+2) + ", " + (x+4) + "]]",
        ans: "det=" + det,
        steps: "<strong>det(A) = ad \u2212 bc</strong><br>" +
               "= (" + x + ")(" + (x+4) + ") \u2212 (" + (x+1) + ")(" + (x+2) + ") = " + (x*(x+4)) + " \u2212 " + ((x+1)*(x+2)) + " = <strong>" + det + "</strong><br><br>" +
               "<strong>A\u207b\u00b9 = (1/" + det + ") \u00d7 [[" + (x+4) + ", \u2212" + (x+1) + "], [\u2212" + (x+2) + ", " + x + "]]</strong><br>" +
               "= [[" + ((x+4)/det).toFixed(4) + ", " + (-(x+1)/det).toFixed(4) + "], [" + (-(x+2)/det).toFixed(4) + ", " + (x/det).toFixed(4) + "]]<br><br>" +
               "<strong>\u2714 det = " + det + "</strong>"
      };
    },
    x => {
      var c11=x*(x+1)+(x+1)*(x+2), c12=x*x+(x+1)*(x+3);
      var c21=(x+2)*(x+1)+(x+3)*(x+2), c22=(x+2)*x+(x+3)*(x+3);
      return {
        q: "Multiply: [[" + x + "," + (x+1) + "],[" + (x+2) + "," + (x+3) + "]] \u00d7 [[" + (x+1) + "," + x + "],[" + (x+2) + "," + (x+3) + "]]",
        ans: "[[" + c11 + "," + c12 + "],[" + c21 + "," + c22 + "]]",
        steps: "<strong>Row \u00d7 Column:</strong><br>" +
               "C\u2081\u2081 = " + x + "\u00b7" + (x+1) + "+" + (x+1) + "\u00b7" + (x+2) + " = <strong>" + c11 + "</strong><br>" +
               "C\u2081\u2082 = " + x + "\u00b7" + x + "+" + (x+1) + "\u00b7" + (x+3) + " = <strong>" + c12 + "</strong><br>" +
               "C\u2082\u2081 = " + (x+2) + "\u00b7" + (x+1) + "+" + (x+3) + "\u00b7" + (x+2) + " = <strong>" + c21 + "</strong><br>" +
               "C\u2082\u2082 = " + (x+2) + "\u00b7" + x + "+" + (x+3) + "\u00b7" + (x+3) + " = <strong>" + c22 + "</strong><br><br>" +
               "<strong>\u2714 [[" + c11 + "," + c12 + "],[" + c21 + "," + c22 + "]]</strong>"
      };
    },
    x => ({
      q: "Find eigenvalues of M = [[" + (x+2) + ",1],[1," + (x+2) + "]]",
      ans: "\u03bb\u2081 = " + (x+1) + ", \u03bb\u2082 = " + (x+3),
      steps: "<strong>Characteristic eq:</strong> det(M\u2212\u03bbI) = 0<br>" +
             "(" + (x+2) + "\u2212\u03bb)\u00b2 \u2212 1 = 0 \u21d2 " + (x+2) + "\u2212\u03bb = \u00b11<br>" +
             "\u03bb\u2081 = " + (x+2) + "\u22121 = <strong>" + (x+1) + "</strong><br>" +
             "\u03bb\u2082 = " + (x+2) + "+1 = <strong>" + (x+3) + "</strong><br><br>" +
             "Verify: tr(M) = " + (2*(x+2)) + " = \u03bb\u2081+\u03bb\u2082 = " + ((x+1)+(x+3)) + " \u2714<br>" +
             "det(M) = " + ((x+2)*(x+2)-1) + " = \u03bb\u2081\u00b7\u03bb\u2082 = " + ((x+1)*(x+3)) + " \u2714<br><br>" +
             "<strong>\u2714 \u03bb\u2081=" + (x+1) + ", \u03bb\u2082=" + (x+3) + "</strong>"
    })
  ],

  /* ── 11. VECTORS ── */
  vectors: [
    x => {
      var a=[x,x+1,x+2], b=[x+2,x,x+1];
      var dot=a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
      var ma=Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);
      var mb=Math.sqrt(b[0]*b[0]+b[1]*b[1]+b[2]*b[2]);
      var angle=(Math.acos(dot/(ma*mb))*180/Math.PI).toFixed(2);
      return {
        q: "For a=(" + a.join(",") + "), b=(" + b.join(",") + "): (i) a\u00b7b (ii) |a| (iii) angle between them",
        ans: "a\u00b7b=" + dot + ", |a|=" + ma.toFixed(4) + ", \u03b8=" + angle + "\u00b0",
        steps: "<strong>Dot product:</strong> " + a[0] + "\u00b7" + b[0] + "+" + a[1] + "\u00b7" + b[1] + "+" + a[2] + "\u00b7" + b[2] + " = <strong>" + dot + "</strong><br><br>" +
               "|a| = \u221a(" + a.map(function(v){return v+"\u00b2";}).join("+") + ") = <strong>" + ma.toFixed(4) + "</strong><br>" +
               "|b| = " + mb.toFixed(4) + "<br><br>" +
               "cos\u03b8 = " + dot + "/(" + ma.toFixed(4) + "\u00d7" + mb.toFixed(4) + ") = " + (dot/(ma*mb)).toFixed(6) + "<br>" +
               "\u03b8 = arccos(" + (dot/(ma*mb)).toFixed(6) + ") = <strong>" + angle + "\u00b0</strong><br><br>" +
               "<strong>\u2714 a\u00b7b=" + dot + ", |a|=" + ma.toFixed(4) + ", \u03b8=" + angle + "\u00b0</strong>"
      };
    },
    x => {
      var mag=Math.sqrt(x*x+(x+1)*(x+1)+(x+2)*(x+2));
      return {
        q: "Find the unit vector of v = (" + x + ", " + (x+1) + ", " + (x+2) + ")",
        ans: "\u00fb=(" + (x/mag).toFixed(4) + "," + ((x+1)/mag).toFixed(4) + "," + ((x+2)/mag).toFixed(4) + ")",
        steps: "|v| = \u221a(" + x + "\u00b2+" + (x+1) + "\u00b2+" + (x+2) + "\u00b2) = \u221a" + (x*x+(x+1)*(x+1)+(x+2)*(x+2)) + " = <strong>" + mag.toFixed(4) + "</strong><br><br>" +
               "\u00fb = v/|v| = (" + x + "/" + mag.toFixed(4) + ", " + (x+1) + "/" + mag.toFixed(4) + ", " + (x+2) + "/" + mag.toFixed(4) + ")<br>" +
               "= <strong>(" + (x/mag).toFixed(4) + ", " + ((x+1)/mag).toFixed(4) + ", " + ((x+2)/mag).toFixed(4) + ")</strong><br><br>" +
               "<strong>\u2714 \u00fb = (" + (x/mag).toFixed(4) + ", " + ((x+1)/mag).toFixed(4) + ", " + ((x+2)/mag).toFixed(4) + ")</strong>"
      };
    }
  ],

  /* ── 12. AREAS ── */
  areas: [
    x => ({
      q: "Sector: radius " + (x+3) + " cm, angle " + (30+x*10) + "\u00b0",
      ans: (0.5*(x+3)*(x+3)*(30+x*10)*Math.PI/180).toFixed(4) + " cm\u00b2",
      steps: "<strong>A = \u00bdr\u00b2\u03b8 (\u03b8 in radians)</strong><br>" +
             "\u03b8 = " + (30+x*10) + "\u00b0 \u00d7 \u03c0/180 = " + ((30+x*10)*Math.PI/180).toFixed(4) + " rad<br>" +
             "A = \u00bd \u00d7 " + ((x+3)*(x+3)) + " \u00d7 " + ((30+x*10)*Math.PI/180).toFixed(4) + " = <strong>" + (0.5*(x+3)*(x+3)*(30+x*10)*Math.PI/180).toFixed(4) + " cm\u00b2</strong><br><br>" +
             "<strong>\u2714 Area = " + (0.5*(x+3)*(x+3)*(30+x*10)*Math.PI/180).toFixed(4) + " cm\u00b2</strong>"
    }),
    x => ({
      q: "Equilateral triangle with side " + (x+3) + " cm \u2014 find area.",
      ans: ((Math.sqrt(3)/4)*(x+3)*(x+3)).toFixed(4) + " cm\u00b2",
      steps: "<strong>A = (\u221a3/4)s\u00b2</strong><br>" +
             "s = " + (x+3) + "<br>" +
             "A = (\u221a3/4) \u00d7 " + ((x+3)*(x+3)) + " = <strong>" + ((Math.sqrt(3)/4)*(x+3)*(x+3)).toFixed(4) + " cm\u00b2</strong><br><br>" +
             "<strong>\u2714 Area = " + ((Math.sqrt(3)/4)*(x+3)*(x+3)).toFixed(4) + " cm\u00b2</strong>"
    }),
    x => ({
      q: "Trapezium: parallel sides " + (x+2) + " cm and " + (x+5) + " cm, height " + (x+3) + " cm.",
      ans: (0.5*((x+2)+(x+5))*(x+3)).toFixed(2) + " cm\u00b2",
      steps: "<strong>A = \u00bd(a+b)\u00d7h</strong><br>" +
             "a=" + (x+2) + ", b=" + (x+5) + ", h=" + (x+3) + "<br>" +
             "A = \u00bd(" + ((x+2)+(x+5)) + ")\u00d7" + (x+3) + " = <strong>" + (0.5*((x+2)+(x+5))*(x+3)).toFixed(2) + " cm\u00b2</strong><br><br>" +
             "<strong>\u2714 Area = " + (0.5*((x+2)+(x+5))*(x+3)).toFixed(2) + " cm\u00b2</strong>"
    }),
    x => ({
      q: "Circle with diameter " + (2*(x+3)) + " cm: circumference and area.",
      ans: "C=" + (2*Math.PI*(x+3)).toFixed(4) + " cm, A=" + (Math.PI*(x+3)*(x+3)).toFixed(4) + " cm\u00b2",
      steps: "r = " + (2*(x+3)) + "/2 = " + (x+3) + " cm<br><br>" +
             "<strong>C = 2\u03c0r</strong> = 2\u03c0\u00d7" + (x+3) + " = <strong>" + (2*Math.PI*(x+3)).toFixed(4) + " cm</strong><br>" +
             "<strong>A = \u03c0r\u00b2</strong> = \u03c0\u00d7" + ((x+3)*(x+3)) + " = <strong>" + (Math.PI*(x+3)*(x+3)).toFixed(4) + " cm\u00b2</strong><br><br>" +
             "<strong>\u2714 C=" + (2*Math.PI*(x+3)).toFixed(4) + " cm, A=" + (Math.PI*(x+3)*(x+3)).toFixed(4) + " cm\u00b2</strong>"
    })
  ],

  /* ── 13. VOLUMES ── */
  volumes: [
    x => ({
      q: "Sphere: radius " + (x+2) + " cm \u2014 volume and surface area.",
      ans: "V=" + ((4/3)*Math.PI*Math.pow(x+2,3)).toFixed(4) + " cm\u00b3, SA=" + (4*Math.PI*(x+2)*(x+2)).toFixed(4) + " cm\u00b2",
      steps: "<strong>V = (4/3)\u03c0r\u00b3 \u00a0|\u00a0 SA = 4\u03c0r\u00b2</strong><br>" +
             "r = " + (x+2) + "<br>" +
             "V = (4/3)\u03c0(" + (x+2) + ")\u00b3 = <strong>" + ((4/3)*Math.PI*Math.pow(x+2,3)).toFixed(4) + " cm\u00b3</strong><br>" +
             "SA = 4\u03c0(" + (x+2) + ")\u00b2 = <strong>" + (4*Math.PI*(x+2)*(x+2)).toFixed(4) + " cm\u00b2</strong><br><br>" +
             "<strong>\u2714 V=" + ((4/3)*Math.PI*Math.pow(x+2,3)).toFixed(4) + " cm\u00b3, SA=" + (4*Math.PI*(x+2)*(x+2)).toFixed(4) + " cm\u00b2</strong>"
    }),
    x => ({
      q: "Cone: radius " + (x+2) + " cm, height " + (x+4) + " cm.",
      ans: "V=" + ((Math.PI/3)*(x+2)*(x+2)*(x+4)).toFixed(4) + " cm\u00b3",
      steps: "Slant l = \u221a(" + (x+2) + "\u00b2+" + (x+4) + "\u00b2) = <strong>" + Math.sqrt((x+2)*(x+2)+(x+4)*(x+4)).toFixed(4) + " cm</strong><br><br>" +
             "<strong>V = (1/3)\u03c0r\u00b2h</strong> = (1/3)\u03c0(" + (x+2) + ")\u00b2(" + (x+4) + ") = <strong>" + ((Math.PI/3)*(x+2)*(x+2)*(x+4)).toFixed(4) + " cm\u00b3</strong><br>" +
             "<strong>TSA = \u03c0r(r+l)</strong> = \u03c0\u00d7" + (x+2) + "\u00d7(" + (x+2) + "+" + Math.sqrt((x+2)*(x+2)+(x+4)*(x+4)).toFixed(4) + ") = <strong>" + (Math.PI*(x+2)*((x+2)+Math.sqrt((x+2)*(x+2)+(x+4)*(x+4)))).toFixed(4) + " cm\u00b2</strong><br><br>" +
             "<strong>\u2714 V=" + ((Math.PI/3)*(x+2)*(x+2)*(x+4)).toFixed(4) + " cm\u00b3</strong>"
    }),
    x => ({
      q: "Frustum: large radius " + (x+5) + ", small radius " + (x+2) + ", height " + (x+3) + ".",
      ans: "V=" + ((Math.PI*(x+3)/3)*((x+5)*(x+5)+(x+5)*(x+2)+(x+2)*(x+2))).toFixed(4) + " cm\u00b3",
      steps: "<strong>V = (\u03c0h/3)(R\u00b2+Rr+r\u00b2)</strong><br>" +
             "R=" + (x+5) + ", r=" + (x+2) + ", h=" + (x+3) + "<br>" +
             "R\u00b2+Rr+r\u00b2 = " + ((x+5)*(x+5)) + "+" + ((x+5)*(x+2)) + "+" + ((x+2)*(x+2)) + " = " + ((x+5)*(x+5)+(x+5)*(x+2)+(x+2)*(x+2)) + "<br>" +
             "V = (\u03c0\u00d7" + (x+3) + "/3)\u00d7" + ((x+5)*(x+5)+(x+5)*(x+2)+(x+2)*(x+2)) + " = <strong>" + ((Math.PI*(x+3)/3)*((x+5)*(x+5)+(x+5)*(x+2)+(x+2)*(x+2))).toFixed(4) + " cm\u00b3</strong><br><br>" +
             "<strong>\u2714 V = " + ((Math.PI*(x+3)/3)*((x+5)*(x+5)+(x+5)*(x+2)+(x+2)*(x+2))).toFixed(4) + " cm\u00b3</strong>"
    }),
    x => ({
      q: "Cylinder: radius " + (x+2) + " cm, height " + (x+5) + " cm.",
      ans: "V=" + (Math.PI*(x+2)*(x+2)*(x+5)).toFixed(4) + " cm\u00b3, CSA=" + (2*Math.PI*(x+2)*(x+5)).toFixed(4) + " cm\u00b2",
      steps: "<strong>V = \u03c0r\u00b2h \u00a0|\u00a0 CSA = 2\u03c0rh</strong><br>" +
             "r=" + (x+2) + ", h=" + (x+5) + "<br>" +
             "V = \u03c0\u00d7" + ((x+2)*(x+2)) + "\u00d7" + (x+5) + " = <strong>" + (Math.PI*(x+2)*(x+2)*(x+5)).toFixed(4) + " cm\u00b3</strong><br>" +
             "CSA = 2\u03c0\u00d7" + (x+2) + "\u00d7" + (x+5) + " = <strong>" + (2*Math.PI*(x+2)*(x+5)).toFixed(4) + " cm\u00b2</strong><br>" +
             "TSA = 2\u03c0\u00d7" + (x+2) + "\u00d7" + ((x+2)+(x+5)) + " = <strong>" + (2*Math.PI*(x+2)*((x+2)+(x+5))).toFixed(4) + " cm\u00b2</strong><br><br>" +
             "<strong>\u2714 V=" + (Math.PI*(x+2)*(x+2)*(x+5)).toFixed(4) + " cm\u00b3, CSA=" + (2*Math.PI*(x+2)*(x+5)).toFixed(4) + " cm\u00b2</strong>"
    })
  ]

}; // end window.taskFormulas


/* ═══════════════════════════════════════════════════════════════
   ADVANCED MATHEMATICS ENGINE v4.1
   Used by tasks-generator-fix.js via window.MathEngine
   ═══════════════════════════════════════════════════════════════ */
window.MathEngine = (function () {
  var PI = Math.PI;
  var toRad = function(d) { return d * PI / 180; };
  var toDeg = function(r) { return r * 180 / PI; };
  var dp    = function(n, d) {
    d = d || 6;
    if (!isFinite(n)) return String(n);
    var v = +n.toFixed(d);
    return v === Math.round(v) ? String(Math.round(v)) : String(v);
  };
  var gcd   = function(a,b) { return b===0 ? Math.abs(a) : gcd(b,a%b); };
  var lcm   = function(a,b) { return Math.abs(a*b)/gcd(a,b); };
  var fact  = function(n) { if(n<=1)return 1; var r=1; for(var i=2;i<=n;i++)r*=i; return r; };
  var nCr   = function(n,k) { if(k<0||k>n)return 0; k=Math.min(k,n-k); var c=1; for(var i=0;i<k;i++)c=c*(n-i)/(i+1); return Math.round(c); };
  var nPr   = function(n,k) { var r=1; for(var i=0;i<k;i++)r*=(n-i); return r; };
  var isPrime = function(n) { if(n<2)return false; for(var i=2;i<=Math.sqrt(n);i++)if(n%i===0)return false; return true; };
  var primeFact = function(n) { var f=[],d=2; while(n>1){while(n%d===0){f.push(d);n/=d;}d++;} return f; };
  var nums  = function(q) { return (q.match(/-?\d+\.?\d*/g)||[]).map(Number); };

  var ST = function(n,t) { return '<div class="solution-step"><span class="step-num">Step '+n+'</span><div class="step-body">'+t+'</div></div>'; };
  var NO = function(t)   { return '<div class="solution-note">'+t+'</div>'; };
  var AN = function(t)   { return '<div class="final-answer-block">\u2714 <strong>Final Answer:</strong> '+t+'</div>'; };
  var RL = function(t)   { return '<div class="rule-box">\ud83d\udcd0 <em>'+t+'</em></div>'; };

  /* ── differentiate ── */
  function differentiate(raw) {
    var q = raw.toLowerCase().replace(/\u2212/g,"-").replace(/\s/g,"");
    var trigMap = {sin:"cos",cos:"-sin",tan:"sec\u00b2",sec:"sec\u00b7tan",cosec:"-cosec\u00b7cot",cot:"-cosec\u00b2"};
    for (var fn in trigMap) {
      var rx = new RegExp("([+\\-]?\\d*\\.?\\d*)\\*?"+fn+"\\(([^)]+)\\)");
      var m = q.match(rx);
      if (m) {
        var a = m[1]===''||m[1]==='+'?1:m[1]==='-'?-1:parseFloat(m[1])||1;
        var inner = m[2];
        var kM = inner.match(/^([+\-]?\d*\.?\d*)x$/);
        var k = kM?(parseFloat(kM[1])||1):1;
        var d2 = trigMap[fn].replace("sin","sin("+inner+")").replace("cos","cos("+inner+")").replace("sec\u00b2","sec\u00b2("+inner+")").replace("sec\u00b7tan","sec("+inner+")tan("+inner+")").replace("cosec\u00b7cot","cosec("+inner+")cot("+inner+")").replace("cosec\u00b2","cosec\u00b2("+inner+")");
        var coeff = dp(a*k,4);
        return { answer:coeff+"\u00b7"+d2, steps:[RL("d/dx[a\u00b7"+fn+"(kx)] = a\u00b7k\u00b7(derivative)"),ST(1,"a="+a+", k="+k+", inner="+inner),ST(2,"dy/dx = "+coeff+"\u00b7"+d2),AN(coeff+"\u00b7"+d2)] };
      }
    }
    if (/e\^/.test(q)) {
      var me = raw.replace(/\s/g,"").match(/([+\-]?\d*\.?\d*)\*?e\^\(?([+\-]?\d*\.?\d*)\*?x\)?/i);
      var ae=me?(parseFloat(me[1])||1):1, ke=me?(parseFloat(me[2])||1):1;
      var ans2=dp(ae*ke)+"e^("+ke+"x)";
      return{answer:ans2,steps:[RL("d/dx(a\u00b7e^(kx))=a\u00b7k\u00b7e^(kx)"),ST(1,"a="+ae+", k="+ke),ST(2,ans2),AN(ans2)]};
    }
    if (/ln/.test(q)) {
      var ml=raw.replace(/\s/g,"").match(/([+\-]?\d*\.?\d*)\*?ln\(([^)]+)\)/i);
      var al=ml?(parseFloat(ml[1])||1):1, innerL=ml?ml[2]:"x";
      var klM=innerL.match(/^([+\-]?\d*\.?\d*)x$/), kl=klM?(parseFloat(klM[1])||1):1;
      return{answer:dp(al*kl)+"/("+innerL+")",steps:[RL("d/dx(a\u00b7ln(kx))=a/x"),ST(1,"a="+al+", k="+kl),ST(2,"dy/dx="+dp(al*kl)+"/("+innerL+")"),AN(dp(al*kl)+"/("+innerL+")")]};
    }
    var terms=[], raw2=raw.replace(/\s/g,""), rxP=/([\+\-]?\d*\.?\d*)\*?x\^?(\d*\.?\d*)/g, mp;
    while((mp=rxP.exec(raw2))!==null){
      var c=mp[1]===''||mp[1]==='+'?1:mp[1]==='-'?-1:parseFloat(mp[1]);
      var n=mp[2]===''?1:parseFloat(mp[2]);
      if(!isNaN(c)&&!isNaN(n)) terms.push({c:c,n:n});
    }
    if (terms.length>0) {
      var steps=[RL("Power rule: d/dx(cx\u207f)=c\u00b7n\u00b7x\u207f\u207b\u00b9")], dTerms=[];
      terms.forEach(function(t,i){
        var nc=dp(t.c*t.n,4), np=t.n-1;
        var term=np===0?""+nc:np===1?""+nc+"x":""+nc+"x^"+dp(np);
        dTerms.push(term);
        steps.push(ST(i+1,"d/dx("+t.c+"x^"+t.n+") = <strong>"+term+"</strong>"));
      });
      var answer=dTerms.join(" + ").replace(/\+ -/g,"\u2212 ").replace(/\+\s*0\b/g,"").trim()||"0";
      steps.push(AN(answer));
      return{answer:answer,steps:steps};
    }
    return{answer:"Cannot parse \u2014 try e.g. 3x\u00b2+2x, sin(3x), e^(2x), ln(x)",steps:[NO("Format: 3x^2+5x-2 or sin(2x) or e^(3x)")]};
  }

  /* ── integrate ── */
  function integrate(raw) {
    var q=raw.toLowerCase().replace(/\u2212/g,"-");
    var defM=raw.match(/\u222b[\s_]*([+\-]?\d+\.?\d*)\s*\^?\s*([+\-]?\d+\.?\d*)|from\s+([+\-]?\d+\.?\d*)\s+to\s+([+\-]?\d+\.?\d*)/i);
    if (defM) {
      var lo=parseFloat(defM[1]||defM[3]),hi=parseFloat(defM[2]||defM[4]);
      var pT=[],raw2=raw.replace(/\s/g,""),rx=/([\+\-]?\d*\.?\d*)\*?x\^?(\d*\.?\d*)/g,mm;
      while((mm=rx.exec(raw2))!==null){var cc=mm[1]===''||mm[1]==='+'?1:mm[1]==='-'?-1:parseFloat(mm[1]);var nn=mm[2]===''?1:parseFloat(mm[2]);if(!isNaN(cc)&&!isNaN(nn))pT.push({c:cc,n:nn});}
      if(pT.length>0){
        var F=function(t){return pT.reduce(function(s,pt){return s+(pt.c/(pt.n+1))*Math.pow(t,pt.n+1);},0);};
        var val=dp(F(hi)-F(lo),6);
        return{answer:val,steps:[ST(1,"Definite \u222b from "+lo+" to "+hi),ST(2,"F(x)="+pT.map(function(t){return dp(t.c/(t.n+1),4)+"x^"+(t.n+1);}).join("+")),ST(3,"F("+hi+")="+dp(F(hi),6)+", F("+lo+")="+dp(F(lo),6)),ST(4,"F("+hi+")\u2212F("+lo+")="+val),AN(val)]};
      }
    }
    if(/\bsin\b/.test(q)){var ms=raw.match(/([+\-]?\d*\.?\d*)\*?\s*sin\(([^)]*)\)/i);var as=ms?(parseFloat(ms[1])||1):1,inn=ms?ms[2]:"x";var ksM=inn.match(/(-?\d*\.?\d*)x/),ks=ksM?(parseFloat(ksM[1])||1):1;var cs=dp(-as/ks,6),a2=cs+"cos("+inn+") + C";return{answer:a2,steps:[RL("\u222bsin(kx)dx = \u2212(1/k)cos(kx)+C"),ST(1,"a="+as+", k="+ks),ST(2,a2),AN(a2)]};}
    if(/\bcos\b/.test(q)){var mc=raw.match(/([+\-]?\d*\.?\d*)\*?\s*cos\(([^)]*)\)/i);var ac=mc?(parseFloat(mc[1])||1):1,inc=mc?mc[2]:"x";var kcM=inc.match(/(-?\d*\.?\d*)x/),kc=kcM?(parseFloat(kcM[1])||1):1;var cc2=dp(ac/kc,6),a3=cc2+"sin("+inc+") + C";return{answer:a3,steps:[RL("\u222bcos(kx)dx = (1/k)sin(kx)+C"),ST(1,"a="+ac+", k="+kc),ST(2,a3),AN(a3)]};}
    if(/e\^/.test(q)){var me2=raw.match(/([+\-]?\d*\.?\d*)\*?\s*e\^\(?([+\-]?\d*\.?\d*)\*?x\)?/i);var ae2=me2?(parseFloat(me2[1])||1):1,ke2=me2?(parseFloat(me2[2])||1):1;var a4=dp(ae2/ke2,6)+"e^("+ke2+"x) + C";return{answer:a4,steps:[RL("\u222ba\u00b7e^(kx)dx = (a/k)e^(kx)+C"),ST(1,a4),AN(a4)]};}
    if(/\bln\b/.test(q))return{answer:"x\u00b7ln(x) \u2212 x + C",steps:[RL("\u222bln(x)dx = x\u00b7ln(x)\u2212x+C (by parts)"),AN("x\u00b7ln(x) \u2212 x + C")]};
    if(/1\s*\/\s*x/.test(q))return{answer:"ln|x| + C",steps:[RL("\u222b(1/x)dx = ln|x|+C"),AN("ln|x| + C")]};
    var iT=[],raw3=raw.replace(/\s/g,""),rx3=/([\+\-]?\d*\.?\d*)\*?x\^?(\d*\.?\d*)/g,m3;
    while((m3=rx3.exec(raw3))!==null){var c3=m3[1]===''||m3[1]==='+'?1:m3[1]==='-'?-1:parseFloat(m3[1]);var n3=m3[2]===''?1:parseFloat(m3[2]);if(!isNaN(c3)&&!isNaN(n3))iT.push({c:c3,n:n3});}
    if(iT.length>0){
      var stps=[RL("\u222bcx\u207fdx = (c/(n+1))x^(n+1)+C")], intT=[];
      iT.forEach(function(t,i){var np=t.n+1,nc=dp(t.c/np,4);intT.push(nc+"x^"+np);stps.push(ST(i+1,"\u222b"+t.c+"x^"+t.n+"dx = "+nc+"x^"+np));});
      var cT=(raw.replace(/\s/g,"").replace(/([\+\-]?\d*\.?\d*)\*?x\^?\d*\.?\d*/g,"").match(/([\+\-]?\d+\.?\d*)/g)||[]);
      cT.forEach(function(cs){var c4=parseFloat(cs);intT.push(c4+"x");stps.push(ST(iT.length+1,"\u222b"+c4+"dx = "+c4+"x"));});
      var answer=(intT.join(" + ").replace(/\+ -/g,"\u2212 ")||"0")+" + C";
      stps.push(AN(answer));
      return{answer:answer,steps:stps};
    }
    return{answer:"Check format \u2014 try: 3x\u00b2+2x, sin(2x), e^(3x), 1/x",steps:[NO("Examples: \u222b3x\u00b2+2x dx | \u222bsin(2x) dx | \u222be^(3x) dx")]};
  }

  /* ── solveLimit ── */
  function solveLimit(q) {
    var ptM=q.match(/x\s*[\u2192\->]+\s*([+\-]?\d+\.?\d*|\u221e|inf|infinity)/i);
    var pt=ptM?ptM[1]:null, inf=pt&&/\u221e|inf/i.test(pt), a=pt&&!inf?parseFloat(pt):null;
    if(inf){var rat=q.match(/([+\-]?\d*\.?\d*)x\^?(\d+).*\/.*([+\-]?\d*\.?\d*)x\^?(\d+)/);if(rat){var n1=parseInt(rat[2]),n2=parseInt(rat[4]),c1=parseFloat(rat[1])||1,c2=parseFloat(rat[3])||1;var at=n1===n2?dp(c1/c2)+" (ratio of leading coefficients)":n1>n2?"\u221e":"0";return{answer:at,steps:[ST(1,"Compare degrees"),ST(2,n1===n2?"Equal \u2192 "+dp(c1/c2):n1>n2?"Num wins \u2192 \u221e":"Den wins \u2192 0"),AN(at)]};}}
    if(a!==null){
      if(/sin\s*\(\s*x\s*\)\s*\/\s*x/.test(q)&&a===0)return{answer:"1",steps:[RL("lim(x\u21920) sin(x)/x = 1"),AN("1")]};
      if(/e\^?x?\s*[-\u2212]\s*1.*\/.*x/.test(q)&&a===0)return{answer:"1",steps:[RL("lim(x\u21920) (e\u02e3\u22121)/x = 1"),ST(1,"L\u2019H\u00f4pital: e\u02e3/1 = e\u2070 = 1"),AN("1")]};
      return{answer:"Substitute x = "+a,steps:[ST(1,"Try x = "+a),ST(2,"If 0/0: factor, rationalise, or L\u2019H\u00f4pital"),AN("Substitute x = "+a)]};
    }
    return{answer:"Specify limit point",steps:[NO("Format: lim x\u21922 (x\u00b2\u22124)/(x\u22122)")]};
  }

  /* ── solveLinear ── */
  function solveLinear(raw) {
    var sides=raw.split("="); if(sides.length!==2)return null;
    var parse=function(expr){var a=0,b=0,norm=expr.replace(/\s/g,"").replace(/\u2212/g,"-");[...norm.matchAll(/([\+\-]?\d*\.?\d*)\*?x/g)].forEach(function(m){var c=m[1]===''||m[1]==='+'?1:m[1]==='-'?-1:parseFloat(m[1]);if(!isNaN(c))a+=c;});var rest=norm.replace(/([\+\-]?\d*\.?\d*)\*?x/g,"");[...rest.matchAll(/([\+\-]?\d+\.?\d*)/g)].forEach(function(m){b+=parseFloat(m[1]);});return{a:a,b:b};};
    var L=parse(sides[0]),R=parse(sides[1]),a=L.a-R.a,b=L.b-R.b;
    if(Math.abs(a)<1e-12)return Math.abs(b)<1e-10?{answer:"All real x",steps:[NO("Identity")]}:{answer:"No solution",steps:[NO("Inconsistent")]};
    var xVal=dp(-b/a,6);
    return{answer:"x = "+xVal,steps:[ST(1,"Equation: "+raw),ST(2,a+"x = "+(-b)),ST(3,"x = "+xVal),AN("x = "+xVal)]};
  }

  /* ── solveQuadratic ── */
  function solveQuadratic(raw) {
    var norm=raw.replace(/\s/g,"").replace(/\u2212/g,"-").replace(/[xX]\^2|[xX]\u00b2/g,"X2");
    var aM=norm.match(/([\+\-]?\d*\.?\d*)X2/),bM=norm.match(/([\+\-]?\d*\.?\d*)[xX](?!2)/);
    var a=aM?(aM[1]===''||aM[1]==='+'?1:aM[1]==='-'?-1:parseFloat(aM[1])):0;
    var b=bM?(bM[1]===''||bM[1]==='+'?1:bM[1]==='-'?-1:parseFloat(bM[1])):0;
    var sides=norm.split("="),rhs=sides[1]?parseFloat(sides[1])||0:0;
    var cStr=(sides[0]||"").replace(/([\+\-]?\d*\.?\d*)X2/,"").replace(/([\+\-]?\d*\.?\d*)[xX]/g,"");
    var cM=cStr.match(/([\+\-]?\d+\.?\d*)/),c=(cM?parseFloat(cM[1]):0)-rhs;
    if(Math.abs(a)<1e-12)return solveLinear(raw)||{answer:"Could not parse",steps:[]};
    var D=b*b-4*a*c;
    var sl=[ST(1,"Form: "+a+"x\u00b2 "+(b>=0?"+":"")+b+"x "+(c>=0?"+":"")+c+" = 0"),ST(2,"a="+a+", b="+b+", c="+c),ST(3,"\u0394 = b\u00b2\u22124ac = "+(b*b)+"\u2212"+(4*a*c)+" = <strong>"+dp(D,4)+"</strong>")];
    var ansText;
    if(D>0){var x1=dp((-b+Math.sqrt(D))/(2*a),6),x2=dp((-b-Math.sqrt(D))/(2*a),6);sl.push(ST(4,"\u0394>0 \u2192 two real roots"),ST(5,"x = (\u2212"+b+" \u00b1 \u221a"+dp(D,4)+") / "+(2*a)),ST(6,"x\u2081="+x1+", x\u2082="+x2));ansText="x\u2081 = "+x1+",  x\u2082 = "+x2;}
    else if(Math.abs(D)<1e-10){var x0=dp(-b/(2*a),6);sl.push(ST(4,"\u0394=0 \u2192 one repeated root"),ST(5,"x = \u2212b/2a = "+x0));ansText="x = "+x0+" (repeated root)";}
    else{var re=dp(-b/(2*a),6),im=dp(Math.sqrt(-D)/(2*a),6);sl.push(ST(4,"\u0394<0 \u2192 complex roots"),ST(5,"x = "+re+" \u00b1 "+im+"i"));ansText="x = "+re+"+"+im+"i  or  x = "+re+"\u2212"+im+"i";}
    sl.push(AN(ansText));
    return{answer:ansText,steps:sl};
  }

  /* ── solveSimultaneous ── */
  function solveSimultaneous(q) {
    var eqs=q.split(/[,;]|\band\b/i).filter(function(e){return e.includes("=");}).slice(0,2);
    if(eqs.length<2)return null;
    var parseEq=function(expr){var s=expr.replace(/\s/g,"").replace(/\u2212/g,"-");var a=0,b=0,c=0;var sides=s.split("=");c=parseFloat(sides[1])||0;var lhs=sides[0];var xM=lhs.match(/([\+\-]?\d*\.?\d*)\*?x/i),yM=lhs.match(/([\+\-]?\d*\.?\d*)\*?y/i);if(xM)a=xM[1]===''||xM[1]==='+'?1:xM[1]==='-'?-1:parseFloat(xM[1]);if(yM)b=yM[1]===''||yM[1]==='+'?1:yM[1]==='-'?-1:parseFloat(yM[1]);return{a:a,b:b,c:c};};
    var e1=parseEq(eqs[0]),e2=parseEq(eqs[1]),det=e1.a*e2.b-e2.a*e1.b;
    if(Math.abs(det)<1e-10)return{answer:"No unique solution",steps:[NO("det=0")]};
    var x=dp((e1.c*e2.b-e2.c*e1.b)/det,6),y=dp((e1.a*e2.c-e2.a*e1.c)/det,6);
    return{answer:"x="+x+", y="+y,steps:[ST(1,"\u2460 "+e1.a+"x+"+e1.b+"y="+e1.c+"  \u2461 "+e2.a+"x+"+e2.b+"y="+e2.c),ST(2,"det="+dp(det,4)),ST(3,"x="+x),ST(4,"y="+y),AN("x="+x+", y="+y)]};
  }

  /* ── solveLogExp ── */
  function solveLogExp(q) {
    var lower=q.toLowerCase().replace(/\s/g,""), ns=nums(q);
    var lnM=lower.match(/ln\(?x\)?\s*=\s*([+\-]?\d+\.?\d*)/);if(lnM){var k=parseFloat(lnM[1]);return{answer:"x=e^"+k+"\u2248"+dp(Math.exp(k),6),steps:[ST(1,"ln(x)="+k),ST(2,"x=e^"+k+"="+dp(Math.exp(k),6)),AN("e^"+k+"\u2248"+dp(Math.exp(k),6))]};}
    var log10M=lower.match(/log\(?x\)?\s*=\s*([+\-]?\d+\.?\d*)/);if(log10M){var k2=parseFloat(log10M[1]);return{answer:"x=10^"+k2+"="+dp(Math.pow(10,k2),6),steps:[ST(1,"log\u2081\u2080(x)="+k2),ST(2,"x=10^"+k2+"="+dp(Math.pow(10,k2),6)),AN(dp(Math.pow(10,k2),6))]};}
    var logBM=lower.match(/log_?(\d+)\(?x\)?\s*=\s*([+\-]?\d+\.?\d*)/);if(logBM){var b2=parseFloat(logBM[1]),k3=parseFloat(logBM[2]);return{answer:"x="+b2+"^"+k3+"="+dp(Math.pow(b2,k3),6),steps:[ST(1,"log_"+b2+"(x)="+k3),ST(2,"x="+b2+"^"+k3+"="+dp(Math.pow(b2,k3),6)),AN(dp(Math.pow(b2,k3),6))]};}
    var expM=lower.match(/e\^?x?\s*=\s*(\d+\.?\d*)/);if(expM){var k4=parseFloat(expM[1]);return{answer:"x=ln("+k4+")="+dp(Math.log(k4),6),steps:[ST(1,"e\u02e3="+k4),ST(2,"x=ln("+k4+")="+dp(Math.log(k4),6)),AN(dp(Math.log(k4),6))]};}
    if(/^log\(?\d/.test(lower)&&ns.length)return{answer:"log("+ns[0]+")="+dp(Math.log10(ns[0]),6),steps:[ST(1,"log\u2081\u2080("+ns[0]+")="+dp(Math.log10(ns[0]),6)),AN(dp(Math.log10(ns[0]),6))]};
    if(/^ln\(?\d/.test(lower)&&ns.length)return{answer:"ln("+ns[0]+")="+dp(Math.log(ns[0]),6),steps:[ST(1,"ln("+ns[0]+")="+dp(Math.log(ns[0]),6)),AN(dp(Math.log(ns[0]),6))]};
    return{answer:"Logarithm laws",steps:[RL("log(AB)=logA+logB"),RL("log(A/B)=logA\u2212logB"),RL("log(A\u207f)=n\u00b7logA"),RL("e\u02e3=k \u2192 x=ln(k)"),RL("log_a(a)=1, log_a(1)=0")]};
  }

  /* ── solveSequence ── */
  function solveSequence(q) {
    var lower=q.toLowerCase(), ns=nums(q);
    if(/fibonacci/i.test(q)){var fib=[1,1];for(var i=2;i<15;i++)fib.push(fib[i-1]+fib[i-2]);return{answer:fib.slice(0,12).join(",")+"..",steps:[ST(1,"F(n)=F(n-1)+F(n-2)"),ST(2,fib.slice(0,12).join(", ")),AN(fib.slice(0,12).join(",")+"..")]};}
    var isAP=ns.length>=3&&ns.slice(1).every(function(_,i){return Math.abs((ns[i+1]-ns[i])-(ns[1]-ns[0]))<1e-9;});
    var isGP=ns.length>=3&&ns[0]!==0&&ns.slice(1).every(function(_,i){return Math.abs((ns[i+1]/ns[i])-(ns[1]/ns[0]))<1e-9;});
    if(/arithmetic|\bap\b/.test(lower)||isAP){if(ns.length<2)return null;var a2=ns[0],d2=ns[1]-ns[0],n2=ns[2]||10;var nth=dp(a2+(n2-1)*d2,6),sn=dp(n2/2*(2*a2+(n2-1)*d2),6);return{answer:"a_"+n2+"="+nth+", S_"+n2+"="+sn,steps:[ST(1,"a="+a2+", d="+d2),ST(2,"a_"+n2+"="+nth),ST(3,"S_"+n2+"="+sn),AN("a_"+n2+"="+nth+", S_"+n2+"="+sn)]};}
    if(/geometric|\bgp\b/.test(lower)||isGP){if(ns.length<2)return null;var a3=ns[0],r2=ns[1]/ns[0],n3=ns[2]||10;var nth2=dp(a3*Math.pow(r2,n3-1),6),sn2=Math.abs(r2)!==1?dp(a3*(1-Math.pow(r2,n3))/(1-r2),6):dp(a3*n3,6);var conv=Math.abs(r2)<1,sinf=conv?dp(a3/(1-r2),6):"\u221e";return{answer:"a_"+n3+"="+nth2+", S_"+n3+"="+sn2+(conv?", S\u221e="+sinf:""),steps:[ST(1,"a="+a3+", r="+dp(r2,4)),ST(2,"a_"+n3+"="+nth2),ST(3,"S_"+n3+"="+sn2),conv?ST(4,"S\u221e=a/(1-r)="+sinf):ST(4,"Diverges"),AN("a_"+n3+"="+nth2+", S_"+n3+"="+sn2)]};}
    return null;
  }

  /* ── solveComplex ── */
  function solveComplex(q) {
    var lower=q.toLowerCase();
    var zs=[...q.matchAll(/\(\s*([\+\-]?\d+\.?\d*)\s*([\+\-])\s*(\d+\.?\d*)\s*i\s*\)/g)];
    if(!zs.length)return{answer:"Write as (a+bi)",steps:[NO("Example: modulus (3+4i)")]};
    var a1=parseFloat(zs[0][1]),s1=zs[0][2],b1=parseFloat(zs[0][3]),im1=b1*(s1==="-"?-1:1);
    if(/modulus|\|z\|/.test(lower)){var mod=dp(Math.sqrt(a1*a1+im1*im1),6);return{answer:"|z|="+mod,steps:[RL("|z|=\u221a(a\u00b2+b\u00b2)"),ST(1,"=\u221a("+(a1*a1)+"+"+(im1*im1)+")="+mod),AN(mod)]};}
    if(/argument|arg\(/.test(lower)){var arg=dp(toDeg(Math.atan2(im1,a1)),4);return{answer:"arg(z)="+arg+"\u00b0",steps:[RL("arg=arctan(b/a) adjusted for quadrant"),ST(1,"="+arg+"\u00b0"),AN(arg+"\u00b0")]};}
    if(/conjugate/.test(lower))return{answer:"z*="+a1+((-im1)>=0?"+":"")+(-im1)+"i",steps:[RL("Conjugate: flip Im sign"),ST(1,"z*="+a1+((-im1)>=0?"+":"")+(-im1)+"i"),AN(a1+((-im1)>=0?"+":"")+(-im1)+"i")]};
    if(zs.length>=2){var a2=parseFloat(zs[1][1]),s2=zs[1][2],b2=parseFloat(zs[1][3]),im2=b2*(s2==="-"?-1:1);
      if(/multi|\*/.test(lower)){var re=a1*a2-im1*im2,im=a1*im2+im1*a2;return{answer:re+(im>=0?"+":"")+im+"i",steps:[RL("(a+bi)(c+di)=(ac\u2212bd)+(ad+bc)i"),ST(1,"Re="+re),ST(2,"Im="+im),AN(re+(im>=0?"+":"")+im+"i")]};}
      if(/add|\+/.test(lower)){var re2=a1+a2,im3=im1+im2;return{answer:re2+(im3>=0?"+":"")+im3+"i",steps:[ST(1,"Re="+re2+", Im="+im3),AN(re2+(im3>=0?"+":"")+im3+"i")]};}
    }
    var mod2=dp(Math.sqrt(a1*a1+im1*im1),6);
    return{answer:"|z|="+mod2,steps:[ST(1,"z="+a1+(im1>=0?"+":"")+im1+"i"),ST(2,"|z|="+mod2),NO("Specify: modulus, argument, conjugate, multiply"),AN(mod2)]};
  }

  /* ── solveTrig ── */
  function solveTrig(q) {
    var lower=q.toLowerCase().replace(/\u2212/g,"-"), ns=nums(q);
    var trigFns={sin:Math.sin,cos:Math.cos,tan:Math.tan,sec:function(a){return 1/Math.cos(a);},cosec:function(a){return 1/Math.sin(a);},cot:function(a){return 1/Math.tan(a);}};
    for(var fn in trigFns){var mm2=lower.match(new RegExp(fn+"\\s*\\(?\\s*(\\d+\\.?\\d*)\\s*\u00b0?\\)?"));if(mm2&&ns.length){var angle=parseFloat(mm2[1]),val=dp(trigFns[fn](toRad(angle)),6);return{answer:fn+"("+angle+"\u00b0)="+val,steps:[ST(1,angle+"\u00b0 = "+dp(toRad(angle),4)+" rad"),ST(2,fn+"("+angle+"\u00b0) = "+val),AN(val)]};};}
    var sinM=lower.match(/sin\s*\(?\s*[x\u03b8]\s*\)?\s*=\s*([\+\-]?\d*\.?\d+)/);if(sinM){var k=parseFloat(sinM[1]);if(Math.abs(k)>1)return{answer:"No real solution",steps:[NO("|sin x|\u22641")]};var p=dp(toDeg(Math.asin(k)),4),p2=dp(180-parseFloat(p),4);return{answer:"x="+p+"\u00b0 or x="+p2+"\u00b0",steps:[ST(1,"arcsin("+k+")="+p+"\u00b0"),ST(2,"Second: 180\u00b0\u2212"+p+"\u00b0="+p2+"\u00b0"),AN(p+"\u00b0 or "+p2+"\u00b0")]};}
    var cosM=lower.match(/cos\s*\(?\s*[x\u03b8]\s*\)?\s*=\s*([\+\-]?\d*\.?\d+)/);if(cosM){var kc=parseFloat(cosM[1]);if(Math.abs(kc)>1)return{answer:"No real solution",steps:[NO("|cos x|\u22641")]};var pc=dp(toDeg(Math.acos(kc)),4),pc2=dp(360-parseFloat(pc),4);return{answer:"x="+pc+"\u00b0 or x="+pc2+"\u00b0",steps:[ST(1,"arccos("+kc+")="+pc+"\u00b0"),ST(2,"Second: 360\u00b0\u2212"+pc+"\u00b0="+pc2+"\u00b0"),AN(pc+"\u00b0 or "+pc2+"\u00b0")]};}
    var tanM=lower.match(/tan\s*\(?\s*[x\u03b8]\s*\)?\s*=\s*([\+\-]?\d*\.?\d+)/);if(tanM){var kt=parseFloat(tanM[1]),pt=dp(toDeg(Math.atan(kt)),4);return{answer:"x="+pt+"\u00b0+180\u00b0n",steps:[ST(1,"arctan("+kt+")="+pt+"\u00b0"),ST(2,"Period of tan=180\u00b0"),AN("x="+pt+"\u00b0+180\u00b0n")]};}
    if(/cosine rule/i.test(q)&&ns.length>=3){var cr=ns,cval=Math.sqrt(cr[0]*cr[0]+cr[1]*cr[1]-2*cr[0]*cr[1]*Math.cos(toRad(cr[2])));return{answer:"c="+dp(cval,4),steps:[RL("c\u00b2=a\u00b2+b\u00b2\u22122ab\u00b7cosC"),ST(1,"a="+cr[0]+",b="+cr[1]+",C="+cr[2]+"\u00b0"),ST(2,"c="+dp(cval,4)),AN("c="+dp(cval,4))]};}
    if(/pythagoras|hypotenuse/i.test(q)&&ns.length>=2){var pr=Math.sqrt(ns[0]*ns[0]+ns[1]*ns[1]);return{answer:"c="+dp(pr,4),steps:[RL("c\u00b2=a\u00b2+b\u00b2"),ST(1,"c=\u221a("+ns[0]+"\u00b2+"+ns[1]+"\u00b2)="+dp(pr,4)),AN("c="+dp(pr,4))]};}
    if(/identit/i.test(q))return{answer:"Key trig identities",steps:[RL("sin\u00b2\u03b8+cos\u00b2\u03b8=1"),RL("1+tan\u00b2\u03b8=sec\u00b2\u03b8"),RL("sin(A\u00b1B)=sinAcosB\u00b1cosAsinB"),RL("sin2A=2sinAcosA"),RL("cos2A=cos\u00b2A\u2212sin\u00b2A")]};
    return{answer:"Specify angle or equation",steps:[NO("Examples: sin(30\u00b0), cos(x)=0.5, Pythagoras a=3 b=4")]};
  }

  /* ── solveStats ── */
  function solveStats(q) {
    var lower=q.toLowerCase(), ns=nums(q).filter(function(n){return !isNaN(n)&&isFinite(n);});
    if(!ns.length)return{answer:"Provide numbers",steps:[NO("Example: mean of 3,7,9")]};
    var sorted=[].concat(ns).sort(function(a,b){return a-b;}),n2=ns.length,sum=ns.reduce(function(a,b){return a+b;},0),mean=sum/n2;
    var variance=ns.reduce(function(s,x){return s+(x-mean)*(x-mean);},0)/n2,sd=Math.sqrt(variance);
    var median=n2%2===1?sorted[Math.floor(n2/2)]:(sorted[n2/2-1]+sorted[n2/2])/2;
    var freq={}; ns.forEach(function(x){freq[x]=(freq[x]||0)+1;});
    var maxF=Math.max.apply(null,Object.values(freq));
    var modes=Object.keys(freq).filter(function(k){return freq[k]===maxF;}).map(Number);
    if(/mean|average/i.test(q))return{answer:"Mean="+dp(mean,4),steps:[ST(1,"Sum="+sum+", n="+n2),ST(2,"Mean="+dp(mean,4)),AN(dp(mean,4))]};
    if(/median/i.test(q))return{answer:"Median="+dp(median,4),steps:[ST(1,"Sorted: "+sorted.join(", ")),ST(2,"Median="+dp(median,4)),AN(dp(median,4))]};
    if(/mode/i.test(q))return{answer:"Mode="+modes.join(","),steps:[ST(1,"Frequencies: "+Object.entries(freq).map(function(e){return e[0]+("(\u00d7"+e[1]+")");}).join(", ")),AN(modes.join(","))]};
    if(/std|standard dev/i.test(q))return{answer:"SD="+dp(sd,4),steps:[ST(1,"Variance="+dp(variance,4)),ST(2,"SD=\u221a"+dp(variance,4)+"="+dp(sd,4)),AN(dp(sd,4))]};
    if(/variance/i.test(q))return{answer:"Variance="+dp(variance,4),steps:[ST(1,"Mean="+dp(mean,4)),ST(2,"Var="+dp(variance,4)),AN(dp(variance,4))]};
    if(/nCr|combination|choose/i.test(q)&&ns.length>=2)return{answer:"C("+ns[0]+","+ns[1]+")="+nCr(ns[0],ns[1]),steps:[RL("C(n,r)=n!/[r!(n\u2212r)!]"),ST(1,"C("+ns[0]+","+ns[1]+")="+nCr(ns[0],ns[1])),AN(nCr(ns[0],ns[1]))]};
    if(/nPr|permutation/i.test(q)&&ns.length>=2)return{answer:"P("+ns[0]+","+ns[1]+")="+nPr(ns[0],ns[1]),steps:[RL("P(n,r)=n!/(n\u2212r)!"),ST(1,"P("+ns[0]+","+ns[1]+")="+nPr(ns[0],ns[1])),AN(nPr(ns[0],ns[1]))]};
    if(/probability/i.test(q)&&ns.length>=2)return{answer:"P="+dp(ns[0]/ns[1],6),steps:[RL("P=favourable/total"),ST(1,"P="+ns[0]+"/"+ns[1]+"="+dp(ns[0]/ns[1],6)),AN(dp(ns[0]/ns[1],6))]};
    return{answer:"Mean="+dp(mean,4)+", Median="+dp(median,4)+", Mode="+modes.join(",")+", SD="+dp(sd,4),steps:[ST(1,"n="+n2),ST(2,"Mean="+dp(mean,4)),ST(3,"Median="+dp(median,4)),ST(4,"Mode="+modes.join(",")),ST(5,"SD="+dp(sd,4)),AN("Mean="+dp(mean,4)+", Median="+dp(median,4)+", SD="+dp(sd,4))]};
  }

  /* ── solveMatrix ── */
  function solveMatrix(q) {
    var lower=q.toLowerCase();
    var allM=[...q.matchAll(/\[\s*\[?\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\]?\s*,?\s*\[?\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\]?\s*\]/g)];
    if(!allM.length)return{answer:"Write matrix as [[a,b],[c,d]]",steps:[NO("Example: determinant of [[2,3],[1,4]]")]};
    var vals=allM[0].slice(1).map(Number),a2=vals[0],b2=vals[1],c2=vals[2],d2=vals[3];
    var det=a2*d2-b2*c2;
    if(/det|determinant/i.test(q))return{answer:"det="+det,steps:[RL("det([[a,b],[c,d]])=ad\u2212bc"),ST(1,"=("+a2+")("+d2+")\u2212("+b2+")("+c2+")="+det),ST(2,det!==0?"Invertible":"Singular"),AN("det="+det)]};
    if(/inver/i.test(q)){if(det===0)return{answer:"No inverse \u2014 singular",steps:[ST(1,"det=0 \u21d2 no inverse"),AN("No inverse")]};var inv=[[dp(d2/det,4),dp(-b2/det,4)],[dp(-c2/det,4),dp(a2/det,4)]];return{answer:"[["+inv[0][0]+","+inv[0][1]+"],["+inv[1][0]+","+inv[1][1]+"]]",steps:[RL("A\u207b\u00b9=(1/det)[[d,\u2212b],[\u2212c,a]]"),ST(1,"det="+det),ST(2,"A\u207b\u00b9=[["+inv[0][0]+","+inv[0][1]+"],["+inv[1][0]+","+inv[1][1]+"]]"),AN("[["+inv[0][0]+","+inv[0][1]+"],["+inv[1][0]+","+inv[1][1]+"]]")]};}
    if(/eigen/i.test(q)){var tr=a2+d2,D=tr*tr-4*det,stps=[RL("\u03bb\u00b2\u2212tr(A)\u03bb+det(A)=0"),ST(1,"tr="+tr+", det="+det),ST(2,"\u03bb\u00b2\u2212"+tr+"\u03bb+"+det+"=0")];var at2;if(D>=0){var l1=dp((tr+Math.sqrt(D))/2,4),l2=dp((tr-Math.sqrt(D))/2,4);stps.push(ST(3,"\u03bb\u2081="+l1+", \u03bb\u2082="+l2));at2="\u03bb\u2081="+l1+", \u03bb\u2082="+l2;}else{var re=dp(tr/2,4),im=dp(Math.sqrt(-D)/2,4);stps.push(ST(3,"Complex: "+re+"\u00b1"+im+"i"));at2="\u03bb="+re+"\u00b1"+im+"i";}stps.push(AN(at2));return{answer:at2,steps:stps};}
    if(allM.length>=2&&/multi|\*|product/i.test(q)){var v2=allM[1].slice(1).map(Number),P=[a2*v2[0]+b2*v2[2],a2*v2[1]+b2*v2[3],c2*v2[0]+d2*v2[2],c2*v2[1]+d2*v2[3]];return{answer:"[["+P[0]+","+P[1]+"],["+P[2]+","+P[3]+"]]",steps:[RL("(AB)\u1d35\u2c7c=row i \u00d7 col j"),ST(1,"C\u2081\u2081="+P[0]),ST(2,"C\u2081\u2082="+P[1]),ST(3,"C\u2082\u2081="+P[2]),ST(4,"C\u2082\u2082="+P[3]),AN("[["+P[0]+","+P[1]+"],["+P[2]+","+P[3]+"]]")]};}
    return{answer:"det="+det+", trace="+(a2+d2),steps:[ST(1,"det="+det),ST(2,"trace="+(a2+d2)),AN("det="+det)]};
  }

  /* ── solveVector ── */
  function solveVector(q) {
    var lower=q.toLowerCase();
    var vecs=[...q.matchAll(/\(\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)(?:\s*,\s*(-?\d+\.?\d*))?\s*\)/g)];
    if(!vecs.length)return{answer:"Write vectors as (x,y) or (x,y,z)",steps:[NO("Example: magnitude (3,4,5)")]};
    var v1=vecs[0].slice(1).map(Number).filter(function(n){return !isNaN(n);}),v2=vecs[1]?vecs[1].slice(1).map(Number).filter(function(n){return !isNaN(n);}):[];
    var mag1=Math.sqrt(v1.reduce(function(s,c){return s+c*c;},0));
    if(/magnitude|length|\|v\|/i.test(q))return{answer:"|v|="+dp(mag1,6),steps:[RL("|v|=\u221a(v\u2081\u00b2+v\u2082\u00b2+v\u2083\u00b2)"),ST(1,"=\u221a"+v1.reduce(function(s,c){return s+c*c;},0)+"="+dp(mag1,6)),AN(dp(mag1,6))]};
    if(/unit/i.test(q)){var u=v1.map(function(c){return dp(c/mag1,4);});return{answer:"\u00fb=("+u.join(",")+")",steps:[RL("\u00fb=v/|v|"),ST(1,"|v|="+dp(mag1,4)),ST(2,"\u00fb=("+u.join(",")+")"),AN("("+u.join(",")+")")]};}
    if((/dot|scalar/i.test(q))&&v2.length){var dot=v1.reduce(function(s,c,i){return s+c*(v2[i]||0);},0);return{answer:"a\u00b7b="+dot,steps:[RL("a\u00b7b=a\u2081b\u2081+a\u2082b\u2082+a\u2083b\u2083"),ST(1,"="+v1.map(function(c,i){return c+"\u00d7"+(v2[i]||0);}).join("+")+"="+dot),AN(""+dot)]};}
    if(/cross/i.test(q)&&v2.length&&v1.length===3){var cx=v1[1]*v2[2]-v1[2]*v2[1],cy=v1[2]*v2[0]-v1[0]*v2[2],cz=v1[0]*v2[1]-v1[1]*v2[0];return{answer:"("+cx+","+cy+","+cz+")",steps:[RL("a\u00d7b=(a\u2082b\u2083\u2212a\u2083b\u2082, a\u2083b\u2081\u2212a\u2081b\u2083, a\u2081b\u2082\u2212a\u2082b\u2081)"),ST(1,"i: "+cx),ST(2,"j: "+cy),ST(3,"k: "+cz),AN("("+cx+","+cy+","+cz+")")]};}
    if(/angle/i.test(q)&&v2.length){var dot2=v1.reduce(function(s,c,i){return s+c*(v2[i]||0);},0),mag2=Math.sqrt(v2.reduce(function(s,c){return s+c*c;},0)),cosA=dot2/(mag1*mag2),ang=dp(toDeg(Math.acos(Math.min(1,Math.max(-1,cosA)))),4);return{answer:"\u03b8="+ang+"\u00b0",steps:[RL("cos\u03b8=(a\u00b7b)/(|a||b|)"),ST(1,"cos\u03b8="+dp(cosA,6)),ST(2,"\u03b8="+ang+"\u00b0"),AN(ang+"\u00b0")]};}
    return{answer:"|v|="+dp(mag1,6),steps:[ST(1,"v=("+v1.join(",")+"), |v|="+dp(mag1,6)),NO("Specify: magnitude, unit, dot, cross, angle"),AN(dp(mag1,6))]};
  }

  /* ── solveGeometry ── */
  function solveGeometry(q) {
    var lower=q.toLowerCase(), ns=nums(q);
    var geoP=[
      [/area.*circle|circle.*area/,        function(){var A=dp(Math.PI*ns[0]*ns[0],6);return{f:"A=\u03c0r\u00b2",s:["r="+ns[0],"A="+A],a:A+" units\u00b2"};}],
      [/area.*triangle|triangle.*area/,    function(){var A=dp(.5*ns[0]*ns[1],6);return{f:"A=\u00bdbs",s:["b="+ns[0]+",h="+ns[1],"A="+A],a:A+" units\u00b2"};}],
      [/equilateral/,                      function(){var A=dp((Math.sqrt(3)/4)*ns[0]*ns[0],6);return{f:"A=(\u221a3/4)s\u00b2",s:["s="+ns[0],"A="+A],a:A+" units\u00b2"};}],
      [/trapez/,                           function(){var A=dp(.5*(ns[0]+ns[1])*ns[2],6);return{f:"A=\u00bd(a+b)h",s:["a="+ns[0]+",b="+ns[1]+",h="+ns[2],"A="+A],a:A+" units\u00b2"};}],
      [/sector.*area|area.*sector/,        function(){var A=dp(.5*ns[0]*ns[0]*(ns[1]*Math.PI/180),6);return{f:"A=\u00bdr\u00b2\u03b8 (\u03b8 rad)",s:["r="+ns[0]+",\u03b8="+ns[1]+"\u00b0","A="+A],a:A+" units\u00b2"};}],
      [/heron/,                            function(){var s2=(ns[0]+ns[1]+ns[2])/2,A=dp(Math.sqrt(s2*(s2-ns[0])*(s2-ns[1])*(s2-ns[2])),6);return{f:"A=\u221a(s(s-a)(s-b)(s-c))",s:["s="+s2,"A="+A],a:A+" units\u00b2"};}],
      [/circumference|perimeter.*circle/,  function(){var C=dp(2*Math.PI*ns[0],6);return{f:"C=2\u03c0r",s:["C="+C],a:C+" units"};}],
      [/sphere.*volume|volume.*sphere/,    function(){var V=dp(4/3*Math.PI*ns[0]*ns[0]*ns[0],6);return{f:"V=(4/3)\u03c0r\u00b3",s:["V="+V],a:V+" units\u00b3"};}],
      [/cylinder.*volume|volume.*cylinder/,function(){var V=dp(Math.PI*ns[0]*ns[0]*ns[1],6);return{f:"V=\u03c0r\u00b2h",s:["V="+V],a:V+" units\u00b3"};}],
      [/cone.*volume|volume.*cone/,        function(){var V=dp(Math.PI*ns[0]*ns[0]*ns[1]/3,6);return{f:"V=(1/3)\u03c0r\u00b2h",s:["V="+V],a:V+" units\u00b3"};}],
      [/cube.*volume|volume.*cube/,        function(){var V=dp(ns[0]*ns[0]*ns[0],4);return{f:"V=s\u00b3",s:["V="+V],a:V+" units\u00b3"};}],
      [/frustum/,                          function(){var V=dp(Math.PI*ns[2]/3*(ns[0]*ns[0]+ns[0]*ns[1]+ns[1]*ns[1]),6);return{f:"V=(\u03c0h/3)(R\u00b2+Rr+r\u00b2)",s:["V="+V],a:V+" units\u00b3"};}],
      [/surface.*sphere|sphere.*surface/,  function(){var A=dp(4*Math.PI*ns[0]*ns[0],6);return{f:"SA=4\u03c0r\u00b2",s:["A="+A],a:A+" units\u00b2"};}],
    ];
    for(var i=0;i<geoP.length;i++){
      if(geoP[i][0].test(lower)){var res=geoP[i][1]();return{answer:res.a,steps:[RL(res.f)].concat(res.s.map(function(s,j){return ST(j+1,s);})).concat([AN(res.a)])};}
    }
    return{answer:"Specify shape and values",steps:[NO("Examples: area circle radius 5, volume sphere radius 3")]};
  }

  /* ── solveNumberTheory ── */
  function solveNumberTheory(q) {
    var ns=nums(q);
    if(/prime factor/i.test(q)&&ns.length){var n=Math.round(ns[0]),f=primeFact(n),g={};f.forEach(function(p){g[p]=(g[p]||0)+1;});var disp=Object.entries(g).map(function(e){return e[1]>1?e[0]+"^"+e[1]:e[0];}).join("\u00d7");return{answer:n+"="+disp,steps:[ST(1,disp),AN(n+"="+disp)]};}
    if(/\bprime\b/i.test(q)&&ns.length){var n2=Math.round(ns[0]),r=isPrime(n2);return{answer:r?n2+" is prime":n2+" is not prime",steps:[ST(1,r?"No factors found \u2192 prime":n2+"="+primeFact(n2).join("\u00d7")),AN(r?"Prime":"Not prime")]};}
    if(/\bgcd\b|\bhcf\b/i.test(q)&&ns.length>=2)return{answer:"GCD="+gcd(ns[0],ns[1]),steps:[RL("Euclidean algorithm"),ST(1,"GCD("+ns[0]+","+ns[1]+")="+gcd(ns[0],ns[1])),AN(gcd(ns[0],ns[1]))]};
    if(/\blcm\b/i.test(q)&&ns.length>=2)return{answer:"LCM="+lcm(ns[0],ns[1]),steps:[RL("LCM=|a\u00d7b|/GCD"),ST(1,"LCM="+lcm(ns[0],ns[1])),AN(lcm(ns[0],ns[1]))]};
    if(/factorial/i.test(q)&&ns.length){var n3=Math.round(ns[0]);if(n3>20)return{answer:n3+"! is very large",steps:[NO("Use Stirling\u2019s")]};return{answer:n3+"!="+fact(n3),steps:[ST(1,n3+"!="+fact(n3)),AN(fact(n3))]};}
    return null;
  }

  /* ── solveFinancial ── */
  function solveFinancial(q) {
    var ns=nums(q);
    if(/simple interest/i.test(q)&&ns.length>=3){var I=dp(ns[0]*ns[1]/100*ns[2],4),A=dp(ns[0]+parseFloat(I),4);return{answer:"I="+I+", A="+A,steps:[RL("I=PRT/100"),ST(1,"I="+ns[0]+"\u00d7"+ns[1]+"/100\u00d7"+ns[2]+"="+I),AN("I="+I+", A="+A)]};}
    if(/compound interest/i.test(q)&&ns.length>=3){var n2=ns[3]||1,A2=dp(ns[0]*Math.pow(1+ns[1]/(100*n2),n2*ns[2]),4),I2=dp(A2-ns[0],4);return{answer:"A="+A2+", I="+I2,steps:[RL("A=P(1+R/100n)^(nT)"),ST(1,"A="+A2),AN("A="+A2+", I="+I2)]};}
    if(/depreciation/i.test(q)&&ns.length>=3){var V=dp(ns[0]*Math.pow(1-ns[1]/100,ns[2]),4);return{answer:"Value="+V,steps:[RL("V=P(1\u2212R/100)^T"),ST(1,"V="+V),AN(V)]};}
    return null;
  }

  /* ── solveArithmetic ── */
  function solveArithmetic(q) {
    try {
      var expr = q.replace(/[^0-9+\-*/^().%\s]/gi,"")
        .replace(/\^/g,"**").trim();
      if(!expr) throw new Error("empty");
      var res = Function('"use strict";return('+expr+')')();
      if(!isFinite(res))return{answer:String(res),steps:[AN(res)]};
      return{answer:"= "+dp(res,6),steps:[ST(1,q),ST(2,"= "+dp(res,6)),AN(dp(res,6))]};
    } catch(e) { return{answer:"Cannot evaluate",steps:[NO("Use digits + \u2212 \u00d7 / ^ e.g. 3^2+16\u22125")]}; }
  }

  /* ── MAIN DISPATCHER ── */
  function solve(question) {
    if (!question || !question.trim()) return {answer:"Please type a question.",steps:[NO("Type any maths question in the box above.")]};
    var q = question.toLowerCase().trim().replace(/\u2212/g,"-");
    var raw = question.trim();

    if(/compound interest/i.test(q)){var r=solveFinancial(raw);if(r)return r;}
    if(/simple interest/i.test(q)){var r=solveFinancial(raw);if(r)return r;}
    if(/depreciation/i.test(q)){var r=solveFinancial(raw);if(r)return r;}
    if(/fibonacci|arithmetic.*seq|geometric.*seq|\bap\b|\bgp\b|sequences|series/i.test(q)){var r=solveSequence(raw);if(r)return r;}
    if(/\bintegrat|\b\u222b|antiderivative|indefinite|definite/i.test(q)) return integrate(raw);
    if(/differentiat|derivative|dy\/dx|d\/dx|d by dx/i.test(q)) return differentiate(raw);
    if(/simultaneous|system.*eq/i.test(q)){var r=solveSimultaneous(raw);if(r)return r;}
    if(/quadratic|x[\^\u00b2]2?\s*[+\-].*x|roots of/i.test(q)&&q.includes("x")) return solveQuadratic(raw);
    if(/inequality|[<>]/i.test(q)){var r=solveLinear(raw);if(r)return r;}
    if(/matrix|matric|determinant|invers.*matr|eigenvalu|transpose/i.test(q)) return solveMatrix(raw);
    if(/vector|dot product|cross product|magnitude of|unit vec|perpen.*vec/i.test(q)) return solveVector(raw);
    if(/\bsin\b|\bcos\b|\btan\b|\bsec\b|\bcosec\b|\bcot\b|trig|sine rule|cosine rule|arcsin|arccos|arctan|pythagoras|hypotenuse/i.test(q)) return solveTrig(raw);
    if(/mean|median|mode|std dev|variance|probability|nCr|nPr|permut|combinat/i.test(q)) return solveStats(raw);
    if(/\blimit\b|\blim\b/i.test(q)) return solveLimit(raw);
    if(/\bln\b|\blog\b|logarithm|e\^x\s*=|exponential/i.test(q)){var r=solveLogExp(raw);if(r)return r;}
    if(/complex|imaginary|\bi(?=[^a-z])/i.test(q)) return solveComplex(raw);
    if(/prime|factorial|gcd|hcf|lcm|factor[is]/i.test(q)){var r=solveNumberTheory(raw);if(r)return r;}
    if(/area|volume|surface area|perimeter|circumference|sphere|cylinder|cone|cube|triangle|rectangle|trapez|prism|pyramid|sector|arc length|frustum|heron/i.test(q)) return solveGeometry(raw);
    if(q.includes("=")&&/x/.test(q)) return solveQuadratic(raw);
    if(q.includes("=")){var r=solveLinear(raw);if(r)return r;}
    if(/\d+\s*[\+\-\*\/\^]\s*\d/.test(q)) return solveArithmetic(raw);

    return {
      answer: "Please rephrase or be more specific",
      steps: [
        NO("I can solve: quadratics, simultaneous equations, differentiation, integration, limits, sequences, matrices, vectors, trigonometry, statistics, complex numbers, logarithms, geometry (areas/volumes), number theory, and financial maths."),
        NO("Tip: e.g. <em>'differentiate 3x\u00b2 + 5x'</em> or <em>'volume of sphere radius 7'</em>")
      ]
    };
  }

  return { solve: solve };
})();