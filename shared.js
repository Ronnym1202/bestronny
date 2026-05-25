/* ═══════════════════════════════════════════════════════════════
   RONNY BEST MATHEMATICS — shared.js  v3.0
   Progress tracking · Badge system · Site-wide utilities
   ═══════════════════════════════════════════════════════════════ */
"use strict";
console.log("✅ shared.js v3.0 LOADED");

/* ═══════════════════════════════════════════════════════════════
   MATH PROGRESS — localStorage-based progress tracker
   ═══════════════════════════════════════════════════════════════ */
const MathProgress = {

  STORAGE_KEY: "mathProgress",

  _defaultProgress() {
    return {
      totalSolved:  0,
      correct:      0,
      accuracy:     0,
      streak:       0,
      bestStreak:   0,
      lastSolvedDate: null,
      topics: {
        algebra:      0,
        geometry:     0,
        calculus:     0,
        trigonometry: 0,
        matrices:     0,
        vectors:      0,
        statistics:   0
      },
      badges:      ["Math Learner"],
      activity:    [],
      gamesPlayed: 0,
      gamesWon:    0,
      createdAt:   new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
  },

  getProgress() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) {
        const p = this._defaultProgress();
        this.saveProgress(p);
        return p;
      }
      // Merge with defaults so new fields are always present
      const saved = JSON.parse(raw);
      return Object.assign({}, this._defaultProgress(), saved);
    } catch (e) {
      console.warn("MathProgress: error reading progress →", e);
      return this._defaultProgress();
    }
  },

  saveProgress(progress) {
    progress.lastUpdated = new Date().toISOString();
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
      // Dispatch event so progress.html / achievements.html can react without a reload
      window.dispatchEvent(new CustomEvent("mathProgressUpdated", { detail: progress }));
    } catch (e) {
      console.warn("MathProgress: localStorage unavailable →", e);
    }
  },

  recordProblemSolved(topic, isCorrect, problemDescription) {
    const progress = this.getProgress();

    progress.totalSolved++;
    if (isCorrect) {
      progress.correct++;
      // Update streak
      const today = new Date().toDateString();
      if (progress.lastSolvedDate === today) {
        progress.streak = (progress.streak || 0) + 1;
      } else if (progress.lastSolvedDate === new Date(Date.now() - 86400000).toDateString()) {
        progress.streak = (progress.streak || 0) + 1;
      } else {
        progress.streak = 1;
      }
      progress.lastSolvedDate = today;
      progress.bestStreak = Math.max(progress.bestStreak || 0, progress.streak);
    } else {
      progress.streak = 0;
    }

    progress.accuracy = progress.totalSolved > 0
      ? Math.round((progress.correct / progress.totalSolved) * 100)
      : 0;

    if (topic && progress.topics[topic] !== undefined) {
      progress.topics[topic] = Math.min(
        progress.topics[topic] + (isCorrect ? 3 : 1),
        100
      );
    }

    const label = `${isCorrect ? "✓" : "✗"} ${topic}: ${(problemDescription || "").slice(0, 60)}`;
    progress.activity.unshift({ text: label, time: new Date().toISOString() });
    if (progress.activity.length > 100) progress.activity = progress.activity.slice(0, 100);

    this._checkBadges(progress);
    this.saveProgress(progress);
    return progress;
  },

  recordTopicViewed(topicName) {
    const progress = this.getProgress();
    progress.activity.unshift({ text: `📖 Viewed: ${topicName}`, time: new Date().toISOString() });
    if (progress.activity.length > 100) progress.activity = progress.activity.slice(0, 100);
    this.saveProgress(progress);
    return progress;
  },

  recordGamePlayed(gameName, score, isWin) {
    const progress = this.getProgress();
    progress.gamesPlayed = (progress.gamesPlayed || 0) + 1;
    if (isWin) progress.gamesWon = (progress.gamesWon || 0) + 1;
    progress.activity.unshift({
      text: `🎮 ${gameName}: ${isWin ? "Won" : "Played"} — score ${score}`,
      time: new Date().toISOString()
    });
    if (progress.activity.length > 100) progress.activity = progress.activity.slice(0, 100);
    this._checkBadges(progress);
    this.saveProgress(progress);
    return progress;
  },

  _checkBadges(progress) {
    const { badges, totalSolved, accuracy, topics, streak, gamesWon } = progress;

    const award = (name, note) => {
      if (!badges.includes(name)) {
        badges.push(name);
        progress.activity.unshift({ text: `🏅 Badge earned: ${name} — ${note}`, time: new Date().toISOString() });
      }
    };

    // Problem milestones
    if (totalSolved >= 1)   award("First Step",        "First problem solved!");
    if (totalSolved >= 10)  award("Problem Solver",    "10 problems solved");
    if (totalSolved >= 25)  award("Dedicated Learner", "25 problems solved");
    if (totalSolved >= 50)  award("Practice Champion", "50 problems solved");
    if (totalSolved >= 100) award("Century Scholar",   "100 problems solved");
    if (totalSolved >= 250) award("Math Warrior",      "250 problems solved");

    // Accuracy milestones
    if (accuracy >= 60 && totalSolved >= 5)  award("Sharp Mind",       "60%+ accuracy");
    if (accuracy >= 80 && totalSolved >= 10) award("Accuracy Star",    "80%+ accuracy");
    if (accuracy >= 90 && totalSolved >= 10) award("Sharpshooter",     "90%+ accuracy");
    if (accuracy >= 95 && totalSolved >= 20) award("Precision Master", "95%+ accuracy");

    // Streak milestones
    if ((streak || 0) >= 3)  award("On a Roll",    "3-problem streak");
    if ((streak || 0) >= 10) award("Unstoppable",  "10-problem streak");

    // Topic mastery
    if ((topics.algebra      || 0) >= 50) award("Algebra Apprentice",  "algebra progress");
    if ((topics.algebra      || 0) >= 90) award("Algebra Expert",      "algebra mastery");
    if ((topics.calculus     || 0) >= 50) award("Calculus Apprentice", "calculus progress");
    if ((topics.calculus     || 0) >= 90) award("Calculus Master",     "calculus mastery");
    if ((topics.geometry     || 0) >= 90) award("Geometry Pro",        "geometry mastery");
    if ((topics.trigonometry || 0) >= 90) award("Trig Wizard",         "trigonometry mastery");
    if ((topics.statistics   || 0) >= 90) award("Statistics Guru",     "statistics mastery");

    // Games
    if ((gamesWon || 0) >= 1)  award("Game Starter",   "first game won");
    if ((gamesWon || 0) >= 10) award("Brain Games Pro", "10 games won");
  },

  resetProgress() {
    try { localStorage.removeItem(this.STORAGE_KEY); } catch (e) {}
    return this.getProgress();
  },

  getStats() {
    const p = this.getProgress();
    return {
      totalSolved:  p.totalSolved,
      correct:      p.correct,
      accuracy:     p.accuracy,
      streak:       p.streak       || 0,
      bestStreak:   p.bestStreak   || 0,
      topics:       p.topics,
      badges:       p.badges,
      activity:     (p.activity || []).slice(0, 20),
      gamesPlayed:  p.gamesPlayed  || 0,
      gamesWon:     p.gamesWon     || 0,
      createdAt:    p.createdAt    || p.lastUpdated,
      lastUpdated:  p.lastUpdated
    };
  }
};

window.MathProgress = MathProgress;

/* ═══════════════════════════════════════════════════════════════
   SITE-WIDE NAV — injects Ask Mwalimu link + hamburger + active
   Works with BOTH the old nav structure (ul.nav-list inside
   nav.main-nav) AND the legacy #main-nav ul structure.
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {

  /* ── 1. Find nav list (supports both HTML structures) ── */
  const navList =
    document.querySelector(".main-nav .nav-list") ||
    document.querySelector("#main-nav ul");

  if (navList) {
    /* ── 1a. Inject Ask Mwalimu if missing ── */
    const alreadyHasLink = !!navList.querySelector('a[href="ask-mwalimu.html"]');
    if (!alreadyHasLink) {
      const li = document.createElement("li");
      li.innerHTML = '<a href="ask-mwalimu.html" class="nav-ask-btn">Ask Mwalimu</a>';

      // Try to insert before Contact; otherwise append
      const contactLi = Array.from(navList.querySelectorAll("li")).find(
        li => li.querySelector('a[href="contact.html"]')
      );
      contactLi ? navList.insertBefore(li, contactLi) : navList.appendChild(li);
    }

    /* ── 1b. Active link highlight ── */
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    navList.querySelectorAll("a").forEach(a => {
      const href = (a.getAttribute("href") || "").split("#")[0];
      if (href === currentPage || (currentPage === "" && href === "index.html")) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      }
    });
  }

  /* ── 2. Inject Ask Mwalimu into footer navigation column ── */
  const footerCols = document.querySelectorAll(".footer-col ul, .footer-links");
  footerCols.forEach(ul => {
    const links = Array.from(ul.querySelectorAll("a")).map(a => a.getAttribute("href") || "");
    if (links.includes("main.html") && !links.includes("ask-mwalimu.html")) {
      const achievementsLi = Array.from(ul.querySelectorAll("li, a")).find(
        el => (el.getAttribute("href") || "").includes("achievements.html")
      );
      const li = document.createElement("li");
      li.innerHTML = '<a href="ask-mwalimu.html">Ask Mwalimu</a>';
      achievementsLi
        ? achievementsLi.closest("li") 
          ? achievementsLi.closest("li").insertAdjacentElement("afterend", li)
          : ul.appendChild(li)
        : ul.appendChild(li);
    }
  });

  /* ── 3. Hamburger menu (works with either .hamburger or injected toggle) ── */
  const hamburger = document.querySelector(".hamburger");
  const mainNav   = document.getElementById("main-nav");
  if (hamburger && mainNav) {
    hamburger.addEventListener("click", () => {
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!expanded));
      mainNav.classList.toggle("open");
    });
    mainNav.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        hamburger.setAttribute("aria-expanded", "false");
        mainNav.classList.remove("open");
      })
    );
  }

  /* ── 4. Smooth scroll for all anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ── 5. Log homepage visit if on index ── */
  const page = window.location.pathname.split("/").pop() || "index.html";
  if (page === "index.html" || page === "") {
    MathProgress.recordTopicViewed("Homepage");
  }

});

/* ═══════════════════════════════════════════════════════════════
   STYLE INJECTION — Ask Mwalimu button + nav-ask-btn styles
   Injected here so every page gets correct styling automatically
   ═══════════════════════════════════════════════════════════════ */
(function injectSharedStyles() {
  if (document.getElementById("shared-injected-styles")) return;
  const style = document.createElement("style");
  style.id = "shared-injected-styles";
  style.textContent = `
    /* Ask Mwalimu pill — works in both nav structures */
    .nav-list a.nav-ask-btn,
    #main-nav a.nav-ask-btn {
      background: rgba(200, 131, 42, 0.15);
      color: #e8a84e !important;
      border: 1px solid rgba(200, 131, 42, 0.40);
      border-radius: 6px;
      transition: background 0.22s, color 0.22s, border-color 0.22s;
      padding: 0.55rem 1.1rem !important;
    }
    .nav-list a.nav-ask-btn:hover,
    #main-nav a.nav-ask-btn:hover {
      background: #c8832a;
      color: #fff !important;
      border-color: #c8832a;
    }
    /* Progress toast notification */
    .math-progress-toast {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      background: linear-gradient(135deg, #0f2040, #1a3560);
      color: #fff3e8;
      padding: 1rem 1.4rem;
      border-radius: 14px;
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      font-weight: 500;
      box-shadow: 0 8px 30px rgba(10, 22, 40, 0.4);
      border-left: 4px solid #e8b87a;
      z-index: 9999;
      max-width: 320px;
      animation: toastIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
    .math-progress-toast.removing {
      animation: toastOut 0.3s ease forwards;
    }
    .math-progress-toast .toast-title {
      font-weight: 700;
      color: #e8b87a;
      font-size: 0.8rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 0.25rem;
    }
    @keyframes toastIn {
      from { opacity: 0; transform: translateX(120%); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes toastOut {
      from { opacity: 1; transform: translateX(0); }
      to   { opacity: 0; transform: translateX(120%); }
    }
  `;
  document.head.appendChild(style);
})();

/* ═══════════════════════════════════════════════════════════════
   TOAST NOTIFICATION — show badge / milestone alerts
   Call window.showProgressToast(title, message) from any page
   ═══════════════════════════════════════════════════════════════ */
window.showProgressToast = function (title, message, duration = 4000) {
  const toast = document.createElement("div");
  toast.className = "math-progress-toast";
  toast.innerHTML = `<div class="toast-title">${title}</div><div>${message}</div>`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("removing");
    setTimeout(() => toast.remove(), 350);
  }, duration);
};

/* ═══════════════════════════════════════════════════════════════
   BADGE NOTIFICATION — auto-fire when new badge is earned
   Progress pages listen for "mathProgressUpdated" event
   ═══════════════════════════════════════════════════════════════ */
window.addEventListener("mathProgressUpdated", function (e) {
  const progress = e.detail;
  const recent = (progress.activity || [])[0];
  if (recent && recent.text && recent.text.startsWith("🏅 Badge earned:")) {
    const badgeName = recent.text.replace("🏅 Badge earned: ", "").split(" — ")[0];
    window.showProgressToast("🏅 Badge Earned!", badgeName);
  }
});