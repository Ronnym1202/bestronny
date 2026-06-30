/* ═══════════════════════════════════════════════════════════════
   RONNY BEST MATHEMATICS — shared.js  v4.4  (FIXED)
   Progress tracking · Badge system · Cookie consent · Nav utilities

   ARCHITECTURE:
   ─────────────
   shared.js  → MathProgress, badges, cookie consent, hamburger,
                mobile dropdown, smooth scroll, topic-view recording.
                SINGLE SOURCE OF TRUTH for all navigation logic.
   index.js   → Homepage-only: search, filter/sort, FAQ, 3-D tilt.
   topic.js   → Lesson pages: search, TOC, reading progress bar.

   shared.js deliberately does NOT handle homepage search.
   index.js  deliberately does NOT touch hamburger / nav-menu.
   ═══════════════════════════════════════════════════════════════ */
"use strict";

/* ═══════════════════════════════════════════════════════════════
   INJECT MOBILE DROPDOWN CSS — runs immediately (before DOM ready)
   Guarantees .open rules exist on EVERY page regardless of which
   CSS file is loaded. index.css already has them, but a duplicate
   rule is harmless.
   ═══════════════════════════════════════════════════════════════ */
(function injectMobileNavCSS() {
  if (document.getElementById("shared-nav-css")) return;
  const s = document.createElement("style");
  s.id = "shared-nav-css";
  s.textContent = `
    /* ── Ensure hidden search bar stays hidden ── */
    .nav-search-bar[hidden] {
      display: none !important;
    }

    @media (max-width: 820px) {
      /* Disable CSS hover-based desktop dropdowns on mobile */
      .nav-has-dropdown:hover .nav-dropdown,
      .nav-has-dropdown:focus-within .nav-dropdown {
        display: none !important;
      }

      /* Show dropdown only when JS adds .open to the parent <li> */
      .nav-has-dropdown.open > .nav-dropdown {
        display: block !important;
        position: static !important;
        box-shadow: none !important;
        border: none !important;
        background: rgba(255,228,196,.04) !important;
        border-radius: 6px !important;
        padding: .25rem .5rem !important;
        margin: 0 0 .25rem .5rem !important;
        animation: none !important;
      }

      /* Rotate chevron when dropdown is open */
      .nav-has-dropdown.open > a .nav-chevron,
      .nav-has-dropdown.open > .nav-dropdown-trigger .nav-chevron {
        transform: rotate(180deg) !important;
      }

      /* Show nav list when hamburger opens it */
      .nav-list.open {
        display: flex !important;
        flex-direction: column !important;
        width: 100% !important;
        padding: .5rem 0 1rem !important;
        border-top: 1px solid rgba(255,228,196,.08) !important;
        gap: 0 !important;
      }

      /* Make sure nav-list is hidden by default on mobile */
      .nav-list:not(.open) {
        display: none !important;
      }
    }
  `;
  (document.head || document.documentElement).appendChild(s);
})();

/* ═══════════════════════════════════════════════════════════════
   MATH PROGRESS — localStorage-based progress tracker
   ═══════════════════════════════════════════════════════════════ */
const MathProgress = {

  TOPICS: [
    "algebra", "trigonometry", "statistics", "limits",
    "differentiation", "integration", "vectors", "matrices",
    "conics", "sequences", "complex", "areas", "volumes"
  ],

  _defaultProgress() {
    const topics = {};
    this.TOPICS.forEach(t => { topics[t] = 0; });
    return {
      totalSolved:  0,
      correct:      0,
      accuracy:     0,
      topics,
      badges:       ["Mathematics Learner"],
      activity:     [],
      gamesPlayed:  0,
      gamesWon:     0,
      streak:       0,
      lastActive:   null,
      lastUpdated:  new Date().toISOString()
    };
  },

  getProgress() {
    try {
      const raw = localStorage.getItem("mathProgress");
      if (!raw) {
        const p = this._defaultProgress();
        this.saveProgress(p);
        return p;
      }
      const parsed   = JSON.parse(raw);
      const defaults = this._defaultProgress();
      return Object.assign({}, defaults, parsed, {
        topics: Object.assign({}, defaults.topics, parsed.topics || {})
      });
    } catch {
      return this._defaultProgress();
    }
  },

  saveProgress(progress) {
    progress.lastUpdated = new Date().toISOString();
    try {
      localStorage.setItem("mathProgress", JSON.stringify(progress));
    } catch {
      console.warn("MathProgress: localStorage unavailable.");
    }
  },

  recordProblemSolved(topic, isCorrect, problemDescription) {
    const progress = this.getProgress();
    progress.totalSolved++;
    if (isCorrect) progress.correct++;
    progress.accuracy = progress.totalSolved > 0
      ? Math.round((progress.correct / progress.totalSolved) * 100)
      : 0;
    if (topic && this.TOPICS.includes(topic)) {
      progress.topics[topic] = Math.min(
        (progress.topics[topic] || 0) + (isCorrect ? 3 : 1),
        100
      );
    }
    this._updateStreak(progress);
    this._logActivity(progress, `${isCorrect ? "✓" : "✗"} ${topic}: ${(problemDescription || "").slice(0, 60)}`);
    try { this._checkBadges(progress); } catch (e) { console.warn("Badge check error:", e); }
    this.saveProgress(progress);
    this._dispatchUpdate(progress);
    return progress;
  },

  recordTopicViewed(topicName) {
    if (!topicName || topicName === "Homepage") return;
    const progress = this.getProgress();
    this._updateStreak(progress);
    this._logActivity(progress, `📖 Viewed: ${topicName}`);
    this.saveProgress(progress);
    this._dispatchUpdate(progress);
    return progress;
  },

  recordGamePlayed(gameName, score, isWin) {
    const progress = this.getProgress();
    progress.gamesPlayed = (progress.gamesPlayed || 0) + 1;
    if (isWin) progress.gamesWon = (progress.gamesWon || 0) + 1;
    this._updateStreak(progress);
    this._logActivity(progress, `🎮 ${gameName}: ${isWin ? "Won" : "Played"} — score ${score}`);
    try { this._checkBadges(progress); } catch (e) { console.warn("Badge check error:", e); }
    this.saveProgress(progress);
    this._dispatchUpdate(progress);
    return progress;
  },

  _updateStreak(progress) {
    const today     = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (progress.lastActive !== today) {
      progress.streak = (progress.lastActive === yesterday)
        ? (progress.streak || 0) + 1
        : 1;
      progress.lastActive = today;
    }
  },

  _logActivity(progress, text) {
    progress.activity = progress.activity || [];
    progress.activity.unshift({ text, time: new Date().toISOString() });
    if (progress.activity.length > 100) progress.activity = progress.activity.slice(0, 100);
  },

  _checkBadges(progress) {
    const { badges, totalSolved, accuracy, topics, gamesWon, streak } = progress;
    const award = (name, note) => {
      if (!badges.includes(name)) {
        badges.push(name);
        this._logActivity(progress, `🏅 Badge earned: ${name} — ${note}`);
        try { localStorage.setItem("newBadge", JSON.stringify({ name, note, time: Date.now() })); } catch {}
      }
    };
    if (totalSolved >= 1)   award("First Step",         "First problem attempted");
    if (totalSolved >= 10)  award("Problem Solver",      "10 problems solved");
    if (totalSolved >= 25)  award("Dedicated Learner",   "25 problems solved");
    if (totalSolved >= 50)  award("Practice Champion",   "50 problems solved");
    if (totalSolved >= 100) award("Century Scholar",     "100 problems solved");
    if (totalSolved >= 250) award("Mathematics Veteran", "250 problems solved");
    if (accuracy >= 70) award("Sharp Mind",       "70%+ accuracy");
    if (accuracy >= 80) award("Accuracy Star",    "80%+ accuracy");
    if (accuracy >= 90) award("High Achiever",    "90%+ accuracy");
    if (accuracy >= 95) award("Precision Master", "95%+ accuracy");
    if ((streak || 0) >= 3)  award("3-Day Streak",   "Studied 3 days in a row");
    if ((streak || 0) >= 7)  award("Weekly Warrior",  "Studied 7 days in a row");
    if ((streak || 0) >= 14) award("Fortnight Focus", "Studied 14 days in a row");
    if ((streak || 0) >= 30) award("Monthly Master",  "Studied 30 days in a row");
    if ((gamesWon || 0) >= 1)  award("First Win",     "Won first brain game");
    if ((gamesWon || 0) >= 5)  award("Game Champion", "Won 5 brain games");
    if ((gamesWon || 0) >= 20) award("Game Master",   "Won 20 brain games");
    if ((topics.algebra         || 0) >= 50) award("Algebra Apprentice",       "50% algebra mastery");
    if ((topics.algebra         || 0) >= 90) award("Algebra Expert",            "90% algebra mastery");
    if ((topics.trigonometry    || 0) >= 50) award("Trigonometry Apprentice",   "50% trigonometry mastery");
    if ((topics.trigonometry    || 0) >= 90) award("Trigonometry Wizard",       "90% trigonometry mastery");
    if ((topics.statistics      || 0) >= 50) award("Statistics Apprentice",     "50% statistics mastery");
    if ((topics.statistics      || 0) >= 90) award("Statistics Expert",         "90% statistics mastery");
    if ((topics.differentiation || 0) >= 50) award("Calculus Apprentice",       "50% differentiation mastery");
    if ((topics.differentiation || 0) >= 90) award("Calculus Master",           "90% differentiation mastery");
    if ((topics.integration     || 0) >= 90) award("Integration Pro",           "90% integration mastery");
    if ((topics.vectors         || 0) >= 90) award("Vectors Expert",            "90% vectors mastery");
    if ((topics.matrices        || 0) >= 90) award("Matrices Expert",           "90% matrices mastery");
    if ((topics.conics          || 0) >= 90) award("Conics Expert",             "90% conics mastery");
    if ((topics.sequences       || 0) >= 90) award("Series Expert",             "90% sequences mastery");
    if ((topics.complex         || 0) >= 90) award("Complex Numbers Expert",    "90% complex numbers mastery");
    if ((topics.areas           || 0) >= 90) award("Areas Expert",              "90% areas mastery");
    if ((topics.volumes         || 0) >= 90) award("Volumes Expert",            "90% volumes mastery");
    if (this.TOPICS.every(t => (topics[t] || 0) >= 30)) award("Well-Rounded Scholar",     "30%+ progress in all 13 CBC topics");
    if (this.TOPICS.every(t => (topics[t] || 0) >= 80)) award("CBC Mathematics Champion", "80%+ mastery in all 13 CBC topics");
  },

  _dispatchUpdate(progress) {
    try { window.dispatchEvent(new CustomEvent("mathProgressUpdate", { detail: progress })); } catch {}
  },

  resetProgress() {
    try { localStorage.removeItem("mathProgress"); } catch {}
    try { localStorage.removeItem("newBadge");     } catch {}
    const p = this._defaultProgress();
    this.saveProgress(p);
    this._dispatchUpdate(p);
    return p;
  },

  getStats() {
    const p = this.getProgress();
    return {
      totalSolved: p.totalSolved  || 0,
      correct:     p.correct      || 0,
      accuracy:    p.accuracy     || 0,
      topics:      p.topics       || {},
      badges:      p.badges       || [],
      activity:    (p.activity    || []).slice(0, 50),
      gamesPlayed: p.gamesPlayed  || 0,
      gamesWon:    p.gamesWon     || 0,
      streak:      p.streak       || 0,
      lastActive:  p.lastActive   || null
    };
  }
};

window.MathProgress = MathProgress;

/* ═══════════════════════════════════════════════════════════════
   ACHIEVEMENTS PAGE RENDERER
   ═══════════════════════════════════════════════════════════════ */
window.renderAchievements = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const ALL_BADGES = [
    { name: "Mathematics Learner",      icon: "📚", desc: "Joined Ronny Best Mathematics",           level: "bronze" },
    { name: "First Step",               icon: "👣", desc: "Attempted your first problem",            level: "bronze" },
    { name: "Problem Solver",           icon: "🧮", desc: "Solved 10+ problems",                    level: "bronze" },
    { name: "Dedicated Learner",        icon: "📖", desc: "Solved 25+ problems",                    level: "silver" },
    { name: "Practice Champion",        icon: "🏋️", desc: "Solved 50+ problems",                    level: "silver" },
    { name: "Century Scholar",          icon: "💯", desc: "Solved 100+ problems",                   level: "gold"   },
    { name: "Mathematics Veteran",      icon: "🎓", desc: "Solved 250+ problems",                   level: "gold"   },
    { name: "Sharp Mind",               icon: "🔍", desc: "Achieved 70%+ accuracy",                 level: "bronze" },
    { name: "Accuracy Star",            icon: "⭐", desc: "Achieved 80%+ accuracy",                 level: "silver" },
    { name: "High Achiever",            icon: "🎯", desc: "Achieved 90%+ accuracy",                 level: "gold"   },
    { name: "Precision Master",         icon: "💎", desc: "Achieved 95%+ accuracy",                 level: "gold"   },
    { name: "3-Day Streak",             icon: "🔥", desc: "Studied 3 consecutive days",             level: "bronze" },
    { name: "Weekly Warrior",           icon: "🗓️", desc: "Studied 7 consecutive days",             level: "silver" },
    { name: "Fortnight Focus",          icon: "📅", desc: "Studied 14 consecutive days",            level: "silver" },
    { name: "Monthly Master",           icon: "🏆", desc: "Studied 30 consecutive days",            level: "gold"   },
    { name: "First Win",                icon: "🎉", desc: "Won your first brain game",              level: "bronze" },
    { name: "Game Champion",            icon: "🎮", desc: "Won 5 brain games",                      level: "silver" },
    { name: "Game Master",              icon: "🕹️", desc: "Won 20 brain games",                     level: "gold"   },
    { name: "Algebra Apprentice",       icon: "📐", desc: "50% algebra mastery",                    level: "bronze" },
    { name: "Algebra Expert",           icon: "📏", desc: "90% algebra mastery",                    level: "gold"   },
    { name: "Trigonometry Apprentice",  icon: "△",  desc: "50% trigonometry mastery",               level: "bronze" },
    { name: "Trigonometry Wizard",      icon: "〰️", desc: "90% trigonometry mastery",               level: "gold"   },
    { name: "Statistics Apprentice",    icon: "📊", desc: "50% statistics mastery",                 level: "bronze" },
    { name: "Statistics Expert",        icon: "σ",  desc: "90% statistics mastery",                 level: "gold"   },
    { name: "Calculus Apprentice",      icon: "∫",  desc: "50% differentiation mastery",            level: "bronze" },
    { name: "Calculus Master",          icon: "∂",  desc: "90% differentiation mastery",            level: "gold"   },
    { name: "Integration Pro",          icon: "∫",  desc: "90% integration mastery",                level: "gold"   },
    { name: "Vectors Expert",           icon: "→",  desc: "90% vectors mastery",                    level: "gold"   },
    { name: "Matrices Expert",          icon: "[]", desc: "90% matrices mastery",                   level: "gold"   },
    { name: "Conics Expert",            icon: "○",  desc: "90% conics mastery",                     level: "gold"   },
    { name: "Series Expert",            icon: "∑",  desc: "90% sequences mastery",                  level: "gold"   },
    { name: "Complex Numbers Expert",   icon: "i",  desc: "90% complex numbers mastery",            level: "gold"   },
    { name: "Areas Expert",             icon: "□",  desc: "90% areas mastery",                      level: "gold"   },
    { name: "Volumes Expert",           icon: "⬡",  desc: "90% volumes mastery",                    level: "gold"   },
    { name: "Well-Rounded Scholar",     icon: "🌟", desc: "30%+ progress in all 13 CBC topics",     level: "gold"   },
    { name: "CBC Mathematics Champion", icon: "👑", desc: "80%+ mastery in all 13 CBC topics",      level: "gold"   },
  ];

  const stats      = MathProgress.getStats();
  const earnedSet  = new Set(stats.badges);
  const levelColor = { bronze: "#cd7f32", silver: "#9e9e9e", gold: "#f0c040" };
  const earned     = ALL_BADGES.filter(b =>  earnedSet.has(b.name));
  const locked     = ALL_BADGES.filter(b => !earnedSet.has(b.name));
  const pct        = Math.round((earned.length / ALL_BADGES.length) * 100);

  let html = `
    <div class="ach-summary">
      <div class="ach-stat"><span>${earned.length}</span><label>Badges Earned</label></div>
      <div class="ach-stat"><span>${ALL_BADGES.length}</span><label>Total Available</label></div>
      <div class="ach-stat"><span>${pct}%</span><label>Completion</label></div>
    </div>`;

  if (earned.length > 0) {
    html += `<h3 class="ach-section-title">🏆 Your Badges (${earned.length})</h3><div class="ach-grid">`;
    earned.forEach(b => {
      html += `<div class="ach-card earned" style="--lc:${levelColor[b.level]}">
        <div class="ach-icon">${b.icon}</div>
        <div class="ach-name">${_esc(b.name)}</div>
        <div class="ach-desc">${_esc(b.desc)}</div>
        <div class="ach-ribbon">${b.level}</div>
      </div>`;
    });
    html += `</div>`;
  } else {
    html += `<p class="ach-empty">No badges yet — solve your first practice problem to get started!</p>`;
  }

  html += `<h3 class="ach-section-title ach-locked-title">🔒 Locked Badges (${locked.length})</h3><div class="ach-grid">`;
  locked.forEach(b => {
    html += `<div class="ach-card locked">
      <div class="ach-icon ach-icon-locked">${b.icon}</div>
      <div class="ach-name">${_esc(b.name)}</div>
      <div class="ach-desc">${_esc(b.desc)}</div>
    </div>`;
  });
  html += `</div>`;
  container.innerHTML = html;

  if (!document.getElementById("ach-styles")) {
    const s = document.createElement("style");
    s.id = "ach-styles";
    s.textContent = `
      .ach-summary{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:2rem;justify-content:center}
      .ach-stat{background:var(--white,#fff);border:1px solid var(--cream-200,#e8dfd0);border-radius:14px;padding:1.2rem 2rem;text-align:center;box-shadow:0 2px 10px rgba(10,22,40,.08);min-width:120px}
      .ach-stat span{display:block;font-family:'Playfair Display',Georgia,serif;font-size:2rem;font-weight:900;color:var(--navy-800,#0f2040);line-height:1.1}
      .ach-stat label{font-size:.72rem;color:var(--ink-30,#9a8a78);font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-top:3px;display:block}
      .ach-section-title{font-family:'Playfair Display',Georgia,serif;font-size:1.2rem;margin:2rem 0 1rem;color:var(--navy-800,#0f2040);padding-bottom:.5rem;border-bottom:2px solid var(--cream-200,#e8dfd0)}
      .ach-locked-title{color:var(--ink-30,#9a8a78)}
      .ach-empty{color:var(--ink-30,#9a8a78);font-style:italic;padding:1.5rem;text-align:center;font-family:'DM Sans',system-ui,sans-serif;font-size:.92rem}
      .ach-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px;margin-bottom:1.5rem}
      .ach-card{border-radius:14px;padding:1.2rem 1rem;text-align:center;position:relative;overflow:hidden;transition:transform .22s,box-shadow .22s}
      .ach-card.earned{background:var(--white,#fff);box-shadow:0 3px 14px rgba(10,22,40,.1);border:2px solid var(--lc,#ccc)}
      .ach-card.earned:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(10,22,40,.15)}
      .ach-card.locked{background:var(--cream-100,#f4efe5);border:2px dashed var(--cream-200,#e8dfd0);opacity:.6}
      .ach-icon{font-size:2rem;margin-bottom:.5rem;line-height:1;display:block}
      .ach-icon-locked{filter:grayscale(1);opacity:.5}
      .ach-name{font-family:'DM Sans',system-ui,sans-serif;font-weight:700;font-size:.85rem;color:var(--navy-800,#0f2040);margin-bottom:.25rem;line-height:1.3}
      .ach-desc{font-size:.74rem;color:var(--ink-50,#5a4e42);line-height:1.4}
      .ach-ribbon{position:absolute;top:8px;right:-16px;background:var(--lc,#ccc);color:#fff;font-size:.6rem;font-weight:800;padding:2px 22px 2px 8px;text-transform:uppercase;letter-spacing:.06em}
    `;
    document.head.appendChild(s);
  }
};

/* ═══════════════════════════════════════════════════════════════
   COOKIE CONSENT BANNER
   ═══════════════════════════════════════════════════════════════ */
(function () {
  const STORAGE_KEY = "cookieConsent";

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function() { window.dataLayer.push(arguments); };
  }

  function applyConsent(choice) {
    const granted = choice === "accepted";
    window.gtag("consent", "update", {
      ad_storage:         granted ? "granted" : "denied",
      ad_user_data:       granted ? "granted" : "denied",
      ad_personalization: granted ? "granted" : "denied",
      analytics_storage:  granted ? "granted" : "denied"
    });
    if (!granted) {
      document.querySelectorAll("ins.adsbygoogle").forEach(el => el.remove());
    }
  }

  function injectStyles() {
    if (document.getElementById("cc-styles")) return;
    const s = document.createElement("style");
    s.id = "cc-styles";
    s.textContent = `
      #cookieBanner{
        position:fixed;bottom:0;left:0;right:0;
        background:var(--navy-900,#0a1628);
        color:rgba(255,228,196,.85);
        padding:16px 24px;
        display:flex;flex-wrap:wrap;align-items:center;
        gap:16px;justify-content:space-between;
        z-index:9999;
        box-shadow:0 -4px 32px rgba(0,0,0,.4);
        font-family:var(--font-ui,'DM Sans',system-ui,sans-serif);
        font-size:.88rem;line-height:1.6;
        border-top:2px solid var(--bisque-dark,#e8b87a);
        transform:translateY(100%);
        animation:cc-slideUp .45s .6s ease forwards;
      }
      @keyframes cc-slideUp{to{transform:translateY(0)}}
      #cookieBanner p{flex:1;min-width:200px;margin:0;color:rgba(255,228,196,.75)}
      #cookieBanner a{color:var(--bisque-dark,#e8b87a);text-decoration:underline}
      #cookieBanner strong{color:rgba(255,228,196,.95)}
      .cookie-btns{display:flex;gap:10px;flex-wrap:wrap;flex-shrink:0}
      .btn-cookie-accept{
        padding:9px 22px;background:var(--bisque-deep,#c8832a);color:#fff;
        border:none;border-radius:8px;
        font-family:var(--font-ui,'DM Sans',system-ui,sans-serif);
        font-size:.88rem;font-weight:700;cursor:pointer;
        transition:background .2s,transform .15s;
      }
      .btn-cookie-accept:hover{background:#a86820;transform:translateY(-1px)}
      .btn-cookie-decline{
        padding:9px 22px;background:transparent;
        color:rgba(255,228,196,.7);
        border:1.5px solid rgba(255,228,196,.3);border-radius:8px;
        font-family:var(--font-ui,'DM Sans',system-ui,sans-serif);
        font-size:.88rem;font-weight:600;cursor:pointer;
        transition:all .2s;
      }
      .btn-cookie-decline:hover{background:rgba(255,228,196,.1);border-color:rgba(255,228,196,.6)}
      @media(max-width:600px){
        #cookieBanner{flex-direction:column;align-items:stretch;text-align:center}
        .cookie-btns{justify-content:center}
      }
      @media(prefers-reduced-motion:reduce){
        #cookieBanner{animation-duration:.01ms!important}
      }
    `;
    document.head.appendChild(s);
  }

  function injectBanner() {
    if (document.getElementById("cookieBanner")) return;
    injectStyles();
    const banner = document.createElement("div");
    banner.id = "cookieBanner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.setAttribute("aria-modal", "false");
    banner.innerHTML = `
      <p>We use cookies to serve education-appropriate ads via <strong>Google AdSense</strong> and to save
      your progress on your device. Click <strong>Accept</strong> to consent, or <strong>Decline</strong>
      to use essential features only. <a href="privacy.html">Privacy Policy</a></p>
      <div class="cookie-btns">
        <button type="button" class="btn-cookie-accept" id="ccAccept">✓ Accept Cookies</button>
        <button type="button" class="btn-cookie-decline" id="ccDecline">Decline Non-Essential</button>
      </div>`;
    document.body.appendChild(banner);
    document.getElementById("ccAccept").addEventListener("click", function() {
      window.setCookieConsent("accepted");
    });
    document.getElementById("ccDecline").addEventListener("click", function() {
      window.setCookieConsent("declined");
    });
  }

  window.setCookieConsent = function(choice) {
    try { localStorage.setItem(STORAGE_KEY, choice); } catch {}
    const banner = document.getElementById("cookieBanner");
    if (banner) {
      banner.style.transition = "opacity .3s";
      banner.style.opacity    = "0";
      setTimeout(() => { banner.remove(); }, 320);
    }
    applyConsent(choice);
  };

  window.CookieConsent = {
    open() {
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
      const old = document.getElementById("cookieBanner");
      if (old) old.remove();
      injectBanner();
    },
    getChoice() {
      try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
    }
  };

  function initConsent() {
    let stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch {}
    if (stored === "accepted" || stored === "declined") {
      applyConsent(stored);
    } else {
      injectBanner();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initConsent, { once: true });
  } else {
    initConsent();
  }
})();

/* ═══════════════════════════════════════════════════════════════
   SITE-WIDE DOM SETUP — single DOMContentLoaded, { once: true }
   Hamburger · Mobile dropdown · Smooth scroll · Topic view
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function() {

  /* ── 1. Hamburger + mobile nav ──
     This is the ONLY place hamburger logic lives.
     index.js and topic.js must NOT touch #hamburger. */
  const hamburger = document.getElementById("hamburger");
  const navMenu   = document.getElementById("nav-menu");

  /* Internal helpers */
  function closeAllDropdowns() {
    if (!navMenu) return;
    navMenu.querySelectorAll(".nav-has-dropdown.open").forEach(function(li) {
      li.classList.remove("open");
      const t = li.querySelector(".nav-dropdown-trigger");
      if (t) t.setAttribute("aria-expanded", "false");
    });
  }

  function closeNav() {
    if (!hamburger || !navMenu) return;
    hamburger.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("open");
    closeAllDropdowns();
  }

  if (hamburger && navMenu) {

    /* Open / close the whole menu */
    hamburger.addEventListener("click", function(e) {
      e.stopPropagation();
      const isOpen = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", String(!isOpen));
      navMenu.classList.toggle("open", !isOpen);
      if (isOpen) closeAllDropdowns();
    });

    /* Mobile dropdown triggers — only intercepts on mobile (≤820px).
       Desktop uses CSS :hover — JS must not interfere there. */
    navMenu.querySelectorAll(".nav-dropdown-trigger").forEach(function(trigger) {
      trigger.addEventListener("click", function(e) {
        if (window.innerWidth > 820) return; /* Desktop: CSS handles it */
        e.preventDefault();
        e.stopPropagation();

        const parentLi = this.closest(".nav-has-dropdown");
        if (!parentLi) return;
        const isOpen = parentLi.classList.contains("open");

        closeAllDropdowns(); /* Close any other open dropdowns first */

        if (!isOpen) {
          parentLi.classList.add("open");
          this.setAttribute("aria-expanded", "true");
        }
        /* If it was already open, closeAllDropdowns() closed it above */
      });
    });

    /* Close menu when a dropdown leaf link is tapped */
    navMenu.querySelectorAll(".nav-dropdown a").forEach(function(a) {
      a.addEventListener("click", function() { closeNav(); });
    });

    /* Close menu when a top-level non-dropdown link is tapped */
    navMenu.querySelectorAll(".nav-list > li:not(.nav-has-dropdown) > a").forEach(function(a) {
      a.addEventListener("click", function() { closeNav(); });
    });

    /* Close everything when clicking anywhere outside the nav */
    document.addEventListener("click", function(e) {
      if (!navMenu.contains(e.target) && e.target !== hamburger) {
        closeNav();
      }
    });

    /* Close on Escape key */
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape") {
        closeNav();
        hamburger.focus();
      }
    });
  }

  /* ── 2. aria-current for active nav link ── */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-list a").forEach(function(a) {
    if (a.getAttribute("href") === currentPage) {
      a.setAttribute("aria-current", "page");
    }
  });

  /* ── 3. Smooth scroll for in-page anchors ── */
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener("click", function(e) {
      const id     = this.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ── 4. Record topic view on lesson pages ── */
  const topicH1 = document.querySelector(".topic-hero h1");
  if (topicH1) {
    const name = topicH1.textContent.trim();
    if (name) MathProgress.recordTopicViewed(name);
  }

  /* ── 5. Clean up stale newBadge notification (older than 30 s) ── */
  try {
    const raw = localStorage.getItem("newBadge");
    if (raw) {
      const nb = JSON.parse(raw);
      if (Date.now() - (nb.time || 0) > 30000) localStorage.removeItem("newBadge");
    }
  } catch {}

}, { once: true }); /* { once: true } prevents double-fire */

/* ═══════════════════════════════════════════════════════════════
   UTILITY — HTML escape (used by renderAchievements)
   ═══════════════════════════════════════════════════════════════ */
function _esc(str) {
  const d = document.createElement("div");
  d.textContent = String(str);
  return d.innerHTML;
}
/* ═══════════════════════════════════════════════════════════════
   PWA — Service Worker + Install Banner + iOS Instruction
   ═══════════════════════════════════════════════════════════════ */

// ── Register service worker ──
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

// ── Detect iOS ──
function _isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

// ── Detect standalone (already installed) ──
function _isStandalone() {
  return window.navigator.standalone === true ||
    window.matchMedia("(display-mode: standalone)").matches;
}

// ── Android / Desktop: capture beforeinstallprompt ──
let _pwaPrompt = null;

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  _pwaPrompt = e;

  // Show nav install button
  const navBtn = document.getElementById("nav-install-btn");
  if (navBtn) navBtn.style.display = "";

  // Don't show the banner if user already dismissed it this session
  if (sessionStorage.getItem("pwa-dismissed")) return;

  showInstallBanner();
});

// ── Called when user clicks Install in nav or banner ──
function triggerInstall() {
  if (_pwaPrompt) {
    _pwaPrompt.prompt();
    _pwaPrompt.userChoice.then(r => {
      if (r.outcome === "accepted") {
        const b = document.getElementById("pwa-banner");
        if (b) b.remove();
        const navBtn = document.getElementById("nav-install-btn");
        if (navBtn) navBtn.style.display = "none";
      }
      _pwaPrompt = null;
    });
  } else if (_isIOS()) {
    showIOSBanner();
  }
}

// ── Wire up nav install button ──
document.addEventListener("DOMContentLoaded", () => {
  const navBtn = document.getElementById("nav-install-btn");
  if (!navBtn) return;

  // Show on iOS even though beforeinstallprompt never fires
  if (_isIOS() && !_isStandalone()) {
    navBtn.style.display = "";
    navBtn.addEventListener("click", e => {
      e.preventDefault();
      showIOSBanner();
    });
  } else {
    navBtn.addEventListener("click", e => {
      e.preventDefault();
      triggerInstall();
    });
  }
});

// ── Android / Desktop install banner (bottom) ──
function showInstallBanner() {
  if (document.getElementById("pwa-banner")) return;

  const banner = document.createElement("div");
  banner.id = "pwa-banner";
  banner.setAttribute("role", "region");
  banner.setAttribute("aria-label", "Install app");
  banner.innerHTML = `
    <div class="pwa-banner-inner">
      <img src="/IMAGES/icon-192.png" alt="" width="40" height="40" class="pwa-banner-icon">
      <div class="pwa-banner-text">
        <strong>Install Ronny Best Mathematics</strong>
        <span>Access lessons offline, on any device</span>
      </div>
      <button id="pwa-install-btn" class="pwa-btn-install">Install</button>
      <button id="pwa-dismiss-btn" class="pwa-btn-dismiss" aria-label="Dismiss">✕</button>
    </div>
  `;
  document.body.appendChild(banner);

  document.getElementById("pwa-install-btn").addEventListener("click", () => {
    triggerInstall();
  });

  document.getElementById("pwa-dismiss-btn").addEventListener("click", () => {
    banner.remove();
    sessionStorage.setItem("pwa-dismissed", "1");
  });
}

// ── iOS instruction banner (bottom) ──
function showIOSBanner() {
  if (document.getElementById("ios-banner")) return;

  // Remove Android banner if somehow present
  const old = document.getElementById("pwa-banner");
  if (old) old.remove();

  const banner = document.createElement("div");
  banner.id = "ios-banner";
  banner.setAttribute("role", "region");
  banner.setAttribute("aria-label", "Install instructions for iPhone");
  banner.innerHTML = `
    <div class="ios-banner-inner">
      <button class="ios-btn-dismiss" aria-label="Dismiss">✕</button>
      <div class="ios-banner-title">📱 Install on iPhone / iPad</div>
      <div class="ios-banner-steps">
        1. Tap the <span>Share</span> button
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.2" stroke-linecap="round"
          style="vertical-align:middle;color:#e8b87a"
          aria-hidden="true">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
          <polyline points="16 6 12 2 8 6"/>
          <line x1="12" y1="2" x2="12" y2="15"/>
        </svg>
        at the bottom of your browser<br>
        2. Scroll down and tap <span>"Add to Home Screen"</span><br>
        3. Tap <span>"Add"</span> — done! Open it like any app.
      </div>
      <div class="ios-banner-arrow"></div>
    </div>
  `;
  document.body.appendChild(banner);

  banner.querySelector(".ios-btn-dismiss").addEventListener("click", () => {
    banner.remove();
    sessionStorage.setItem("pwa-dismissed", "1");
  });
}

// ── Auto-show iOS banner on first visit ──
window.addEventListener("DOMContentLoaded", () => {
  if (_isIOS() && !_isStandalone() && !sessionStorage.getItem("pwa-dismissed")) {
    // Small delay so page loads first, then show instruction
    setTimeout(showIOSBanner, 2500);
  }
});