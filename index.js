/* ═══════════════════════════════════════════════════════════════
   RONNY BEST MATHEMATICS — index.js  v3.0
   Homepage interactivity · Progress display · Utilities
   ═══════════════════════════════════════════════════════════════ */
"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* ── Welcome pill ── */
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

  /* ── Progress snapshot ── */
  try {
    if (typeof MathProgress !== "undefined") {
      MathProgress.recordTopicViewed("Homepage");
      const stats = MathProgress.getStats();
      if (stats.totalSolved > 0) {
        showProgressPill(stats);
      }
    }
  } catch (e) {
    console.log("Progress unavailable:", e);
  }

  /* ── Staggered card entrance ── */
  animateOnScroll(".topic-card, .why-card, .eg-card", "fadeUp");

  /* ── Topic card 3-D tilt ── */
  document.querySelectorAll(".topic-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - .5) * 8;
      const y = ((e.clientY - r.top)  / r.height - .5) * 8;
      card.style.transform = `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
});

/* ── Progress pill injected beneath hero stats ── */
function showProgressPill(stats) {
  const heroStats = document.querySelector(".hero-stats");
  if (!heroStats || document.querySelector(".hero-progress-pill")) return;

  const pill = document.createElement("div");
  pill.className = "hero-progress-pill";
  pill.innerHTML = `
    <span>Your progress:</span>
    <strong>${stats.totalSolved}</strong> problems solved ·
    <strong>${stats.accuracy}%</strong> accuracy ·
    <strong>${stats.badges.length}</strong> badges
    <a href="progress.html">View →</a>
  `;
  pill.style.cssText = `
    margin-top: 18px;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    font-family: var(--font-ui, 'DM Sans', sans-serif);
    font-size: .8rem;
    color: rgba(255,228,196,.55);
    background: rgba(255,228,196,.07);
    border: 1px solid rgba(255,228,196,.15);
    padding: .45rem 1.1rem;
    border-radius: 50px;
  `;
  pill.querySelector("strong").style.color = "var(--bisque-dark, #e8b87a)";
  const a = pill.querySelector("a");
  a.style.cssText = "color:#e8b87a;font-weight:700;text-decoration:none;margin-left:4px;";

  // Style all strongs
  pill.querySelectorAll("strong").forEach(s => { s.style.color = "#e8b87a"; });

  heroStats.insertAdjacentElement("afterend", pill);
}

/* ── Scroll-triggered entrance animations ── */
function animateOnScroll(selector, cls) {
  if (!window.IntersectionObserver) return;
  const els = document.querySelectorAll(selector);
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";
    el.style.transition = "opacity .45s ease, transform .45s ease";
    io.observe(el);
  });
}