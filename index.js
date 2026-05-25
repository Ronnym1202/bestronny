/* ═══════════════════════════════════════════════════════════════
   RONNY BEST MATHEMATICS — index.js  v3.0
   Homepage interactivity · Progress integration · Animations
   ═══════════════════════════════════════════════════════════════ */
"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // ── 1. Welcome banner ──────────────────────────────────────
    initWelcomeBanner();

    // ── 2. Count-up animation for hero stats ──────────────────
    initCountUpStats();

    // ── 3. Practice problem interactivity ─────────────────────
    initPracticeProblems();

    // ── 4. Formula copy-to-clipboard ──────────────────────────
    initFormulaCopy();

    // ── 5. 3-D card tilt on hover ─────────────────────────────
    initCardTilt();

    // ── 6. Scroll-reveal for section entries ──────────────────
    initScrollReveal();

    // ── 7. Track this page view ───────────────────────────────
    if (typeof MathProgress !== "undefined") {
        MathProgress.recordTopicViewed("Homepage");
    }
});

/* ═══════════════════════════════════════════════════════════════
   WELCOME BANNER
   ═══════════════════════════════════════════════════════════════ */
function initWelcomeBanner() {
    const banner = document.getElementById("welcome");
    if (!banner) return;

    try {
        const user = localStorage.getItem("currentUser");
        const progress = typeof MathProgress !== "undefined"
            ? MathProgress.getStats()
            : null;

        if (user && user !== "null" && user !== "undefined") {
            if (progress && progress.totalSolved > 0) {
                const achievement = getAchievementLabel(progress.totalSolved);
                banner.textContent = `Welcome back, ${user}! ${progress.totalSolved} problems solved · ${progress.accuracy}% accuracy · ${achievement}`;
            } else {
                banner.textContent = `Welcome back, ${user}! Ready to practise some mathematics?`;
            }
        } else {
            banner.textContent = "Welcome! Improve your maths skills here — free, always.";
        }
    } catch (e) {
        banner.textContent = "Welcome! Improve your maths skills here — free, always.";
    }
}

function getAchievementLabel(solved) {
    if (solved >= 250) return "🏆 Math Warrior";
    if (solved >= 100) return "🥇 Century Scholar";
    if (solved >= 50)  return "⭐ Practice Champion";
    if (solved >= 25)  return "📚 Dedicated Learner";
    if (solved >= 10)  return "✏️ Problem Solver";
    return "🎯 Keep Going!";
}

/* ═══════════════════════════════════════════════════════════════
   COUNT-UP ANIMATION FOR HERO STATISTICS
   ═══════════════════════════════════════════════════════════════ */
function initCountUpStats() {
    const nums = document.querySelectorAll(".stat-num[data-target]");
    if (!nums.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);
            animateCount(entry.target);
        });
    }, { threshold: 0.5 });

    nums.forEach(n => observer.observe(n));
}

function animateCount(el) {
    const target  = parseInt(el.dataset.target, 10);
    const duration = 1200;
    const start    = performance.now();

    function step(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
    }

    requestAnimationFrame(step);
}

/* ═══════════════════════════════════════════════════════════════
   PRACTICE PROBLEM INTERACTIVITY
   Toggle show/hide answers; track with MathProgress
   ═══════════════════════════════════════════════════════════════ */
function initPracticeProblems() {
    const items = document.querySelectorAll(".practice-item");

    items.forEach(item => {
        const answerEl = item.querySelector(".pi-a");
        if (!answerEl || item.dataset.init === "true") return;
        item.dataset.init = "true";

        // Hide answer initially
        answerEl.style.display = "none";

        const btn = document.createElement("button");
        btn.className  = "show-answer-btn";
        btn.textContent = "Show Answer";
        btn.setAttribute("aria-expanded", "false");
        applyBtnStyles(btn, false);

        btn.addEventListener("click", () => {
            const visible = answerEl.style.display !== "none";
            answerEl.style.display = visible ? "none" : "block";
            btn.textContent = visible ? "Show Answer" : "Hide Answer";
            btn.setAttribute("aria-expanded", String(!visible));
            applyBtnStyles(btn, !visible);

            if (!visible) {
                // Track that student revealed an answer
                trackActivity("Revealed answer for practice problem");
            }
        });

        item.appendChild(btn);
    });
}

function applyBtnStyles(btn, active) {
    Object.assign(btn.style, {
        background: active ? "#2a9d50" : "#1a3560",
        color:       "#fff",
        border:      "none",
        padding:     "4px 14px",
        borderRadius: "20px",
        marginTop:   "6px",
        cursor:      "pointer",
        fontSize:    "0.78rem",
        fontWeight:  "600",
        fontFamily:  "Inter, sans-serif",
        transition:  "background 0.22s",
        display:     "block"
    });
}

/* ═══════════════════════════════════════════════════════════════
   FORMULA COPY TO CLIPBOARD
   Click any .formula-text or .tc-preview code to copy
   ═══════════════════════════════════════════════════════════════ */
function initFormulaCopy() {
    const copyTargets = document.querySelectorAll(".formula-text, .tc-preview code");

    copyTargets.forEach(el => {
        if (el.dataset.copyEnabled) return;
        el.dataset.copyEnabled = "true";

        el.title = "Click to copy";
        el.style.cursor = "pointer";

        el.addEventListener("click", async () => {
            const text = el.innerText.trim();
            try {
                await navigator.clipboard.writeText(text);
                showInlineFeedback(el, "Copied!");
                trackActivity("Copied formula: " + text.slice(0, 40));
            } catch {
                showInlineFeedback(el, "Select & copy");
            }
        });
    });
}

function showInlineFeedback(anchor, msg) {
    // Remove existing tooltip if any
    const existing = anchor.parentElement.querySelector(".copy-tip");
    if (existing) existing.remove();

    const tip = document.createElement("span");
    tip.className = "copy-tip";
    tip.textContent = msg;
    Object.assign(tip.style, {
        display:      "inline-block",
        marginLeft:   "0.6rem",
        padding:      "2px 10px",
        background:   "#2a9d50",
        color:        "#fff",
        borderRadius: "12px",
        fontSize:     "0.75rem",
        fontWeight:   "600",
        fontFamily:   "Inter, sans-serif",
        verticalAlign: "middle",
        animation:    "fadeInTip 0.25s ease"
    });

    anchor.insertAdjacentElement("afterend", tip);
    setTimeout(() => tip.remove(), 1800);

    // Inject keyframes once
    if (!document.getElementById("copy-tip-kf")) {
        const s = document.createElement("style");
        s.id = "copy-tip-kf";
        s.textContent = `
            @keyframes fadeInTip {
                from { opacity: 0; transform: translateY(-4px); }
                to   { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(s);
    }
}

/* ═══════════════════════════════════════════════════════════════
   3-D CARD TILT
   Subtle perspective rotation on topic / feature cards
   ═══════════════════════════════════════════════════════════════ */
function initCardTilt() {
    // Skip on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const cards = document.querySelectorAll(".topic-card, .feat-card, .eg-card");

    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x  = e.clientX - left;
            const y  = e.clientY - top;
            const rx = ((y / height) - 0.5) * 8;   // ±4deg
            const ry = (0.5 - (x / width))  * 8;

            card.style.transform =
                `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
            card.style.transition = "transform .4s ease";
            setTimeout(() => { card.style.transition = ""; }, 400);
        });
    });
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL-REVEAL
   Adds .visible class to sections as they enter viewport
   ═══════════════════════════════════════════════════════════════ */
function initScrollReveal() {
    if (!("IntersectionObserver" in window)) return;

    const targets = document.querySelectorAll(
        ".topic-card, .feat-card, .eg-card, .method-card, .about-inner"
    );

    // Inject styles once
    if (!document.getElementById("scroll-reveal-styles")) {
        const s = document.createElement("style");
        s.id = "scroll-reveal-styles";
        s.textContent = `
            .sr-hidden {
                opacity: 0;
                transform: translateY(22px);
                transition: opacity .55s ease, transform .55s ease;
            }
            .sr-hidden.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(s);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger by index within batch
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, (i % 4) * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    targets.forEach(el => {
        el.classList.add("sr-hidden");
        observer.observe(el);
    });
}

/* ═══════════════════════════════════════════════════════════════
   UTILITY: TRACK ACTIVITY
   ═══════════════════════════════════════════════════════════════ */
function trackActivity(label, isCorrect = null) {
    try {
        if (typeof MathProgress === "undefined") return;
        if (isCorrect !== null) {
            MathProgress.recordProblemSolved("general", isCorrect, label);
        } else {
            MathProgress.recordTopicViewed(label);
        }
    } catch (e) {
        // Silent fail — never break the page
    }
}