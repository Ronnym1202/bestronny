/* ═══════════════════════════════════════════════════════════════
   RONNY BEST MATHEMATICS — shared.js  v3.0
   Progress tracking · Badge system · Site-wide utilities
   AdSense & SEO compliant — zero external dependencies
   ═══════════════════════════════════════════════════════════════ */
"use strict";

/* ═══════════════════════════════════════════════════════════════
   MATH PROGRESS — localStorage-based progress tracker
   ═══════════════════════════════════════════════════════════════ */
const MathProgress = {

  _defaultProgress() {
    return {
      totalSolved:  0,
      correct:      0,
      accuracy:     0,
      topics: {
        algebra:        0,
        trigonometry:   0,
        statistics:     0,
        limits:         0,
        differentiation:0,
        integration:    0,
        vectors:        0,
        matrices:       0,
        conics:         0,
        sequences:      0,
        complex:        0,
        areas:          0,
        volumes:        0
      },
      badges:      ["Mathematics Learner"],
      activity:    [],
      gamesPlayed: 0,
      gamesWon:    0,
      streak:      0,
      lastActive:  null,
      lastUpdated: new Date().toISOString()
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
      const parsed = JSON.parse(raw);
      // Merge in any new default fields that older saves may be missing
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

    if (topic && progress.topics[topic] !== undefined) {
      progress.topics[topic] = Math.min(
        progress.topics[topic] + (isCorrect ? 3 : 1), 100
      );
    }

    // Streak tracking
    const today = new Date().toDateString();
    if (progress.lastActive !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      progress.streak = progress.lastActive === yesterday
        ? (progress.streak || 0) + 1
        : 1;
      progress.lastActive = today;
    }

    const label = `${isCorrect ? "✓" : "✗"} ${topic}: ${(problemDescription || "").slice(0, 60)}`;
    progress.activity.unshift({ text: label, time: new Date().toISOString() });
    if (progress.activity.length > 100) progress.activity = progress.activity.slice(0, 100);

    this._checkBadges(progress);
    this.saveProgress(progress);
    this._dispatchUpdate(progress);
    return progress;
  },

  recordTopicViewed(topicName) {
    const progress = this.getProgress();
    progress.activity.unshift({ text: `📖 Viewed: ${topicName}`, time: new Date().toISOString() });
    if (progress.activity.length > 100) progress.activity = progress.activity.slice(0, 100);

    // Track streak
    const today = new Date().toDateString();
    if (progress.lastActive !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      progress.streak = progress.lastActive === yesterday ? (progress.streak || 0) + 1 : 1;
      progress.lastActive = today;
    }

    this.saveProgress(progress);
    this._dispatchUpdate(progress);
    return progress;
  },

  recordGamePlayed(gameName, score, isWin) {
    const progress = this.getProgress();
    progress.activity.unshift({ text: `🎮 ${gameName}: ${isWin ? "Won" : "Played"} — score ${score}`, time: new Date().toISOString() });
    if (progress.activity.length > 100) progress.activity = progress.activity.slice(0, 100);
    progress.gamesPlayed = (progress.gamesPlayed || 0) + 1;
    if (isWin) progress.gamesWon = (progress.gamesWon || 0) + 1;
    this._checkBadges(progress);
    this.saveProgress(progress);
    this._dispatchUpdate(progress);
    return progress;
  },

  _checkBadges(progress) {
    const { badges, totalSolved, accuracy, topics, gamesWon, streak } = progress;
    const award = (name, note) => {
      if (!badges.includes(name)) {
        badges.push(name);
        progress.activity.unshift({ text: `🏅 Badge earned: ${name} — ${note}`, time: new Date().toISOString() });
        // Notify badge pages if open
        try { localStorage.setItem("newBadge", JSON.stringify({ name, note, time: Date.now() })); } catch {}
      }
    };

    if (totalSolved >= 1)   award("First Step",          "First problem attempted");
    if (totalSolved >= 10)  award("Problem Solver",       "10+ problems solved");
    if (totalSolved >= 25)  award("Dedicated Learner",    "25+ problems solved");
    if (totalSolved >= 50)  award("Practice Champion",    "50+ problems solved");
    if (totalSolved >= 100) award("Century Scholar",      "100+ problems solved");
    if (totalSolved >= 250) award("Mathematics Veteran",  "250+ problems solved");
    if (accuracy >= 70)     award("Sharp Mind",           "70%+ accuracy");
    if (accuracy >= 80)     award("Accuracy Star",        "80%+ accuracy");
    if (accuracy >= 90)     award("High Achiever",        "90%+ accuracy");
    if (accuracy >= 95)     award("Precision Master",     "95%+ accuracy");
    if ((streak || 0) >= 3) award("3-Day Streak",         "Studied 3 days in a row");
    if ((streak || 0) >= 7) award("Weekly Warrior",       "Studied 7 days in a row");
    if ((gamesWon || 0) >= 5) award("Game Champion",      "Won 5+ brain games");

    if (topics.algebra      >= 50)  award("Algebra Apprentice",  "algebra progress");
    if (topics.algebra      >= 90)  award("Algebra Expert",      "algebra mastery");
    if (topics.calculus     >= 50)  award("Calculus Apprentice", "calculus progress");
    if (topics.calculus     >= 90)  award("Calculus Master",     "calculus mastery");
    if (topics.geometry     >= 90)  award("Geometry Pro",        "geometry mastery");
    if (topics.trigonometry >= 90)  award("Trigonometry Wizard", "trigonometry mastery");
    if (topics.statistics   >= 90)  award("Statistics Expert",   "statistics mastery");

    // All-rounder: every topic at least 30
    if (Object.values(topics).every(v => v >= 30)) award("Well-Rounded Scholar", "Progress in all 7 topics");
  },

  _dispatchUpdate(progress) {
    try {
      window.dispatchEvent(new CustomEvent("mathProgressUpdate", { detail: progress }));
    } catch {}
  },

  resetProgress() {
    try { localStorage.removeItem("mathProgress"); } catch {}
    const p = this._defaultProgress();
    this.saveProgress(p);
    this._dispatchUpdate(p);
    return p;
  },

  getStats() {
    const p = this.getProgress();
    return {
      totalSolved:  p.totalSolved,
      correct:      p.correct,
      accuracy:     p.accuracy,
      topics:       p.topics,
      badges:       p.badges,
      activity:     (p.activity || []).slice(0, 20),
      gamesPlayed:  p.gamesPlayed || 0,
      gamesWon:     p.gamesWon    || 0,
      streak:       p.streak      || 0,
      lastActive:   p.lastActive  || null
    };
  }
};

window.MathProgress = MathProgress;

/* ═══════════════════════════════════════════════════════════════
   ACHIEVEMENTS PAGE RENDERER
   Call renderAchievements() on achievements.html
   ═══════════════════════════════════════════════════════════════ */
window.renderAchievements = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const ALL_BADGES = [
    { name: "Mathematics Learner",    icon: "📚", desc: "Joined Ronny Best Mathematics",          level: "bronze" },
    { name: "First Step",             icon: "👣", desc: "Attempted your first problem",            level: "bronze" },
    { name: "Problem Solver",         icon: "🧮", desc: "Solved 10+ problems",                    level: "bronze" },
    { name: "Dedicated Learner",      icon: "📖", desc: "Solved 25+ problems",                    level: "silver" },
    { name: "Practice Champion",      icon: "🏋️", desc: "Solved 50+ problems",                    level: "silver" },
    { name: "Century Scholar",        icon: "💯", desc: "Solved 100+ problems",                   level: "gold"   },
    { name: "Mathematics Veteran",    icon: "🎓", desc: "Solved 250+ problems",                   level: "gold"   },
    { name: "Sharp Mind",             icon: "🔍", desc: "Achieved 70%+ accuracy",                 level: "bronze" },
    { name: "Accuracy Star",          icon: "⭐", desc: "Achieved 80%+ accuracy",                 level: "silver" },
    { name: "High Achiever",          icon: "🎯", desc: "Achieved 90%+ accuracy",                 level: "gold"   },
    { name: "Precision Master",       icon: "💎", desc: "Achieved 95%+ accuracy",                 level: "gold"   },
    { name: "3-Day Streak",           icon: "🔥", desc: "Studied 3 consecutive days",             level: "bronze" },
    { name: "Weekly Warrior",         icon: "🗓️", desc: "Studied 7 consecutive days",             level: "silver" },
    { name: "Game Champion",          icon: "🎮", desc: "Won 5+ brain games",                     level: "silver" },
    { name: "Algebra Apprentice",     icon: "📐", desc: "50% algebra mastery",                    level: "bronze" },
    { name: "Algebra Expert",         icon: "📏", desc: "90% algebra mastery",                    level: "gold"   },
    { name: "Calculus Apprentice",    icon: "∫",  desc: "50% calculus mastery",                   level: "bronze" },
    { name: "Calculus Master",        icon: "∂",  desc: "90% calculus mastery",                   level: "gold"   },
    { name: "Geometry Pro",           icon: "📐", desc: "90% geometry mastery",                   level: "gold"   },
    { name: "Trigonometry Wizard",    icon: "〰️", desc: "90% trigonometry mastery",               level: "gold"   },
    { name: "Statistics Expert",      icon: "📊", desc: "90% statistics mastery",                 level: "gold"   },
    { name: "Well-Rounded Scholar",   icon: "🌟", desc: "Progress in all 7 topics",               level: "gold"   },
  ];

  const stats = MathProgress.getStats();
  const earnedSet = new Set(stats.badges);
  const levelColors = { bronze: "#cd7f32", silver: "#aaa", gold: "#f0c040" };

  const earned = ALL_BADGES.filter(b => earnedSet.has(b.name));
  const locked  = ALL_BADGES.filter(b => !earnedSet.has(b.name));

  let html = `
    <div class="ach-summary">
      <div class="ach-stat"><span>${earned.length}</span><label>Badges Earned</label></div>
      <div class="ach-stat"><span>${ALL_BADGES.length}</span><label>Total Available</label></div>
      <div class="ach-stat"><span>${Math.round((earned.length / ALL_BADGES.length) * 100)}%</span><label>Completion</label></div>
    </div>
    <h3 class="ach-section-title">🏆 Your Badges (${earned.length})</h3>
    <div class="ach-grid">
  `;
  earned.forEach(b => {
    html += `<div class="ach-card earned" style="--level-color:${levelColors[b.level]}">
      <div class="ach-icon">${b.icon}</div>
      <div class="ach-name">${b.name}</div>
      <div class="ach-desc">${b.desc}</div>
      <div class="ach-ribbon">${b.level}</div>
    </div>`;
  });
  html += `</div>
    <h3 class="ach-section-title locked-title">🔒 Locked Badges (${locked.length})</h3>
    <div class="ach-grid">`;
  locked.forEach(b => {
    html += `<div class="ach-card locked">
      <div class="ach-icon locked-icon">${b.icon}</div>
      <div class="ach-name">${b.name}</div>
      <div class="ach-desc">${b.desc}</div>
    </div>`;
  });
  html += `</div>`;

  container.innerHTML = html;

  // Inject styles if not already present
  if (!document.getElementById("ach-styles")) {
    const s = document.createElement("style");
    s.id = "ach-styles";
    s.textContent = `
      .ach-summary{display:flex;gap:24px;flex-wrap:wrap;margin-bottom:32px;justify-content:center}
      .ach-stat{background:#fff;border-radius:12px;padding:20px 32px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,.08);min-width:120px}
      .ach-stat span{display:block;font-size:2rem;font-weight:800;color:#0f2040;font-family:'Playfair Display',serif}
      .ach-stat label{font-size:.8rem;color:#7a6a58;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
      .ach-section-title{font-family:'Playfair Display',serif;font-size:1.25rem;margin:32px 0 16px;color:#0f2040}
      .locked-title{color:#9a8a78}
      .ach-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:16px;margin-bottom:24px}
      .ach-card{border-radius:14px;padding:20px 16px;text-align:center;position:relative;overflow:hidden;transition:.25s}
      .ach-card.earned{background:#fff;box-shadow:0 3px 16px rgba(0,0,0,.1);border:2px solid var(--level-color,#ccc)}
      .ach-card.earned:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(0,0,0,.14)}
      .ach-card.locked{background:#f5f3ef;border:2px dashed #d5cfc4;opacity:.6}
      .ach-icon{font-size:2.2rem;margin-bottom:8px;line-height:1}
      .locked-icon{filter:grayscale(1);opacity:.5}
      .ach-name{font-weight:700;font-size:.88rem;color:#0f2040;margin-bottom:4px}
      .ach-desc{font-size:.76rem;color:#7a6a58;line-height:1.4}
      .ach-ribbon{position:absolute;top:8px;right:-18px;background:var(--level-color,#ccc);color:#fff;font-size:.65rem;font-weight:800;padding:2px 22px 2px 8px;text-transform:uppercase;letter-spacing:.06em}
    `;
    document.head.appendChild(s);
  }
};

/* ═══════════════════════════════════════════════════════════════
   PROGRESS PAGE RENDERER
   Call renderProgress() on progress.html
   ═══════════════════════════════════════════════════════════════ */
window.renderProgress = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const stats = MathProgress.getStats();
  const topics = stats.topics;

  const topicLabels = {
    algebra:        "Algebra",
    trigonometry:   "Trigonometry",
    statistics:     "Statistics",
    limits:         "Limits",
    differentiation:"Differentiation",
    integration:    "Integration",
    vectors:        "Vectors",
    matrices:       "Matrices",
    conics:         "Conics",
    sequences:      "Sequences & Series",
    complex:        "Complex Numbers",
    areas:          "Areas",
    volumes:        "Volumes"
  };
  const topicColors = {
    algebra:        "#1a3560",
    trigonometry:   "#7a4a14",
    statistics:     "#1e6e36",
    limits:         "#5b3a8a",
    differentiation:"#5b3a8a",
    integration:    "#3a5f8a",
    vectors:        "#c8832a",
    matrices:       "#6b3c14",
    conics:         "#0e6888",
    sequences:      "#1d6e6e",
    complex:        "#7a1060",
    areas:          "#3a7a30",
    volumes:        "#1a5080"
  };

  let topicBars = "";
  Object.entries(topics).forEach(([key, val]) => {
    topicBars += `
      <div class="prog-topic">
        <div class="prog-topic-header">
          <span class="prog-topic-name">${topicLabels[key] || key}</span>
          <span class="prog-topic-val">${val}%</span>
        </div>
        <div class="prog-bar-bg">
          <div class="prog-bar-fill" style="width:${val}%;background:${topicColors[key]||'#1a3560'}"></div>
        </div>
      </div>`;
  });

  let activityHtml = "";
  if (stats.activity.length === 0) {
    activityHtml = `<p class="prog-empty">No activity yet. Start practising to see your history here.</p>`;
  } else {
    stats.activity.slice(0, 20).forEach(item => {
      const text = typeof item === "string" ? item : item.text;
      const time = typeof item === "object" && item.time
        ? new Date(item.time).toLocaleDateString("en-KE", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
        : "";
      activityHtml += `<div class="prog-activity-item"><span>${text}</span><span class="prog-act-time">${time}</span></div>`;
    });
  }

  container.innerHTML = `
    <div class="prog-stats-grid">
      <div class="prog-stat-card"><div class="prog-stat-num">${stats.totalSolved}</div><div class="prog-stat-label">Problems Attempted</div></div>
      <div class="prog-stat-card"><div class="prog-stat-num">${stats.correct}</div><div class="prog-stat-label">Correct Answers</div></div>
      <div class="prog-stat-card"><div class="prog-stat-num">${stats.accuracy}%</div><div class="prog-stat-label">Overall Accuracy</div></div>
      <div class="prog-stat-card"><div class="prog-stat-num">${stats.streak}</div><div class="prog-stat-label">Day Streak</div></div>
      <div class="prog-stat-card"><div class="prog-stat-num">${stats.gamesPlayed}</div><div class="prog-stat-label">Games Played</div></div>
      <div class="prog-stat-card"><div class="prog-stat-num">${stats.badges.length}</div><div class="prog-stat-label">Badges Earned</div></div>
    </div>

    <h3 class="prog-section-title">Topic Mastery</h3>
    <div class="prog-topics">${topicBars}</div>

    <h3 class="prog-section-title">Recent Activity</h3>
    <div class="prog-activity">${activityHtml}</div>

    <button class="prog-reset-btn" onclick="if(confirm('Reset all your progress? This cannot be undone.')){MathProgress.resetProgress();window.renderProgress('${containerId}');}">Reset Progress</button>
  `;

  // Inject styles
  if (!document.getElementById("prog-styles")) {
    const s = document.createElement("style");
    s.id = "prog-styles";
    s.textContent = `
      .prog-stats-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:16px;margin-bottom:32px}
      .prog-stat-card{background:#fff;border-radius:12px;padding:20px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,.08);border:1px solid #e8dfd0}
      .prog-stat-num{font-family:'Playfair Display',serif;font-size:2rem;font-weight:800;color:#0f2040;line-height:1.1}
      .prog-stat-label{font-size:.76rem;color:#7a6a58;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-top:4px}
      .prog-section-title{font-family:'Playfair Display',serif;font-size:1.2rem;color:#0f2040;margin:28px 0 14px;padding-bottom:8px;border-bottom:2px solid #e8dfd0}
      .prog-topics{display:flex;flex-direction:column;gap:14px;margin-bottom:8px}
      .prog-topic-header{display:flex;justify-content:space-between;margin-bottom:5px}
      .prog-topic-name{font-weight:700;font-size:.88rem;color:#1a1612}
      .prog-topic-val{font-weight:700;font-size:.88rem;color:#4a3f35}
      .prog-bar-bg{height:10px;background:#e8dfd0;border-radius:10px;overflow:hidden}
      .prog-bar-fill{height:100%;border-radius:10px;transition:width 1s cubic-bezier(.4,0,.2,1)}
      .prog-activity{background:#fff;border-radius:12px;border:1px solid #e8dfd0;overflow:hidden;margin-bottom:24px}
      .prog-activity-item{display:flex;justify-content:space-between;padding:10px 16px;font-size:.87rem;border-bottom:1px solid #f0ece5;gap:12px}
      .prog-activity-item:last-child{border-bottom:none}
      .prog-act-time{color:#9a8a78;font-size:.78rem;white-space:nowrap;flex-shrink:0}
      .prog-empty{color:#9a8a78;font-style:italic;padding:24px;text-align:center}
      .prog-reset-btn{background:none;border:1.5px solid #b91c1c;color:#b91c1c;padding:.5rem 1.4rem;border-radius:8px;font-size:.85rem;font-weight:700;cursor:pointer;font-family:inherit;transition:.2s}
      .prog-reset-btn:hover{background:#fef2f2}
    `;
    document.head.appendChild(s);
  }

  // Animate bars after render
  requestAnimationFrame(() => {
    document.querySelectorAll(".prog-bar-fill").forEach(bar => {
      const w = bar.style.width;
      bar.style.width = "0";
      requestAnimationFrame(() => { bar.style.width = w; });
    });
  });
};

/* ═══════════════════════════════════════════════════════════════
   SITE-WIDE DOM SETUP
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {

  /* ── Inject Ask Mwalimu into nav ── */
  const nav = document.querySelector("#main-nav ul, .main-nav .nav-list, nav ul");
  if (nav && !nav.querySelector('a[href="ask-mwalimu.html"]')) {
    const contactLi = Array.from(nav.querySelectorAll("li")).find(
      li => li.querySelector('a[href="contact.html"]')
    );
    const li = document.createElement("li");
    li.innerHTML = '<a href="ask-mwalimu.html" class="nav-ask-btn">Ask Mwalimu</a>';
    contactLi ? nav.insertBefore(li, contactLi) : nav.appendChild(li);
  }

  /* ── Inject Ask Mwalimu into footer ── */
  const footerCols = document.querySelectorAll(".footer-col ul, .footer-links-col ul");
  footerCols.forEach(ul => {
    const hrefs = Array.from(ul.querySelectorAll("a")).map(a => a.getAttribute("href"));
    if (hrefs.includes("main.html") && !hrefs.includes("ask-mwalimu.html")) {
      const li = document.createElement("li");
      li.innerHTML = '<a href="ask-mwalimu.html">Ask Mwalimu</a>';
      ul.appendChild(li);
    }
  });

  /* ── Active nav link highlight ── */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach(a => {
    if (a.getAttribute("href") === currentPage) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });

  /* ── Hamburger menu ── */
  const hamburger = document.querySelector(".hamburger");
  const mainNav   = document.getElementById("main-nav");
  if (hamburger && mainNav) {
    hamburger.addEventListener("click", () => {
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!expanded));
      mainNav.classList.toggle("open");
    });
    mainNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        hamburger.setAttribute("aria-expanded", "false");
        mainNav.classList.remove("open");
      });
    });
  }

  /* ── Smooth scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); }
    });
  });

  /* ── Record homepage visit ── */
  if (window.location.pathname.includes("index") || window.location.pathname === "/" || window.location.pathname.endsWith("/")) {
    MathProgress.recordTopicViewed("Homepage");
  }
});

/* ── Nav Ask Mwalimu styles ── */
(function () {
  const style = document.createElement("style");
  style.textContent = `
    nav a.nav-ask-btn {
      background: rgba(200,131,42,0.15);
      color: #e8a84e !important;
      border: 1px solid rgba(200,131,42,0.35);
      border-radius: 6px;
      transition: background 0.22s, color 0.22s;
    }
    nav a.nav-ask-btn:hover {
      background: #c8832a !important;
      color: #fff !important;
      border-color: #c8832a;
    }
  `;
  document.head.appendChild(style);
})();