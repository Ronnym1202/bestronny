/* ═══════════════════════════════════════════════════════════════
   tasks-generator-fix.js
   Custom dropdown + problem generator + answer checker
   Add LAST in <body> after all other scripts
═══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── Wait for DOM ── */
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    initCustomDropdown();
    initGenerator();
    initFreeQuestion();
  });

  /* ════════════════════════════════════════
     CUSTOM DROPDOWN
  ════════════════════════════════════════ */
  function initCustomDropdown() {
    const trigger   = document.getElementById("customSelectTrigger");
    const dropdown  = document.getElementById("customSelectDropdown");
    const label     = document.getElementById("customSelectLabel");
    const native    = document.getElementById("topicSelect");
    if (!trigger || !dropdown) return;

    /* Open / close */
    trigger.addEventListener("click", function () {
      const isOpen = dropdown.classList.contains("open");
      closeDropdown();
      if (!isOpen) openDropdown();
    });

    trigger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); trigger.click(); }
      if (e.key === "Escape") closeDropdown();
    });

    /* Option click */
    dropdown.querySelectorAll(".custom-select-option").forEach(function (opt) {
      opt.addEventListener("click", function () {
        const val  = opt.dataset.value;
        const text = opt.textContent.trim();

        /* Update visual */
        label.textContent = text;
        dropdown.querySelectorAll(".custom-select-option").forEach(function (o) {
          o.classList.remove("selected");
        });
        opt.classList.add("selected");

        /* Sync native select */
        if (native) native.value = val;

        closeDropdown();
        trigger.focus();
      });
    });

    /* Close on outside click */
    document.addEventListener("click", function (e) {
      if (!e.target.closest("#customTopicSelect")) closeDropdown();
    });

    function openDropdown() {
      dropdown.classList.add("open");
      trigger.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
    }

    function closeDropdown() {
      dropdown.classList.remove("open");
      trigger.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    }
  }

  /* ════════════════════════════════════════
     PROBLEM GENERATOR
  ════════════════════════════════════════ */
  function initGenerator() {
    const genBtn        = document.getElementById("generateTaskBtn");
    const topicSelect   = document.getElementById("topicSelect");
    const taskDisplay   = document.getElementById("taskDisplay");
    const answerRow     = document.getElementById("answerRow");
    const answerInput   = document.getElementById("answerInput");
    const submitBtn     = document.getElementById("submitAnswer");
    const resultDisplay = document.getElementById("resultDisplay");
    const solutionSteps = document.getElementById("solutionSteps");

    if (!genBtn) return;

    var currentTask  = null;
    var currentTopic = null;

    var topicProgressMap = {
      differentiation:"calculus", integration:"calculus", limits:"calculus",
      algebra:"algebra", logarithms:"algebra", sequences:"algebra",
      complex:"algebra", trigonometry:"geometry", statistics:"statistics",
      matrices:"algebra", vectors:"algebra", areas:"geometry", volumes:"geometry"
    };

    genBtn.addEventListener("click", function () {
      var t = topicSelect ? topicSelect.value : "";
      if (!t) {
        var old = genBtn.innerHTML;
        genBtn.textContent = "⚠ Pick a topic first!";
        genBtn.style.background = "#fde8d0";
        setTimeout(function () {
          genBtn.innerHTML = old;
          genBtn.style.background = "";
        }, 1800);
        return;
      }

      currentTopic = t;
      var generators = (typeof taskFormulas !== "undefined") ? taskFormulas[t] : null;
      if (!generators) {
        taskDisplay.textContent = 'Topic "' + t + '" not found.';
        return;
      }

      var rnd = Math.floor(Math.random() * 11) + 2;
      var fn  = generators[Math.floor(Math.random() * generators.length)];
      currentTask = fn(rnd);

      taskDisplay.innerHTML = currentTask.q;
      taskDisplay.style.display = "block";

      if (answerInput)   answerInput.value = "";
      if (resultDisplay) { resultDisplay.innerHTML = ""; resultDisplay.className = "result-display"; }
      if (solutionSteps) solutionSteps.innerHTML = "";
      if (answerRow)     answerRow.hidden = false;
      setTimeout(function () { if (answerInput) answerInput.focus(); }, 80);

      if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([taskDisplay]).catch(function () {});
      }

      try { if (typeof MathProgress !== "undefined") MathProgress.recordTopicViewed(t); }
      catch (e) {}
    });

    /* ── Answer check ── */
    function checkAnswer() {
      if (!currentTask || !answerInput) return;
      var userAns    = answerInput.value.trim();
      var correctAns = String(currentTask.ans);
      if (!userAns) {
        if (resultDisplay) resultDisplay.textContent = "Enter your answer above.";
        return;
      }

      function norm(s) {
        return String(s).toLowerCase()
          .replace(/\s+/g, "").replace(/[×·]/g, "*").replace(/−/g, "-")
          .replace(/≈/g, "").replace(/\u00bd/g, "0.5");
      }

      var numOnly = /^-?\d+(\.\d+)?$/.test(correctAns.trim());
      var isCorrect = false;

      if (numOnly) {
        var uv = parseFloat(userAns.replace(/[^0-9.\-]/g, ""));
        var cv = parseFloat(correctAns);
        isCorrect = !isNaN(uv) && Math.abs(uv - cv) < 0.06;
      } else {
        isCorrect = norm(userAns) === norm(correctAns);
      }

      if (resultDisplay) {
        resultDisplay.className = "result-display " + (isCorrect ? "correct" : "incorrect");
        resultDisplay.innerHTML = isCorrect
          ? "✓ Correct — well done!"
          : "✗ Not quite. Correct answer: <strong>" + escHTML(correctAns) + "</strong>";
      }

      var stepsArr = Array.isArray(currentTask.steps) ? currentTask.steps : [currentTask.steps || ""];
      if (solutionSteps) {
        solutionSteps.innerHTML = '<div class="steps-header">Step-by-step solution</div>' +
          stepsArr.filter(Boolean).join("");
        if (window.MathJax && MathJax.typesetPromise) {
          MathJax.typesetPromise([solutionSteps]).catch(function () {});
        }
      }

      try {
        if (typeof MathProgress !== "undefined") {
          MathProgress.recordProblemSolved(topicProgressMap[currentTopic] || "algebra", isCorrect, currentTask.q.slice(0, 60));
        }
      } catch (e) {}

      if (isCorrect) showToast();
    }

    if (submitBtn) submitBtn.addEventListener("click", checkAnswer);
    if (answerInput) {
      answerInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") checkAnswer();
      });
    }
  }

  /* ════════════════════════════════════════
     FREE QUESTION
  ════════════════════════════════════════ */
  function initFreeQuestion() {
    var solveBtn   = document.getElementById("solveFreeQuestion");
    var freeQ      = document.getElementById("freeQuestion");
    var freeAnswer = document.getElementById("freeAnswer");
    var freeSteps  = document.getElementById("freeSteps");
    if (!solveBtn || !freeQ) return;

    function runFree() {
      var q = freeQ.value.trim();
      if (!q) {
        if (freeAnswer) freeAnswer.innerHTML = '<span style="color:#9a8a78;">Type a question first.</span>';
        return;
      }
      if (freeAnswer) freeAnswer.innerHTML = '<span style="color:#9a8a78;">⏳ Solving…</span>';
      if (freeSteps)  freeSteps.innerHTML = "";

      try {
        var result = MathEngine.solve(q);
        if (freeAnswer) {
          freeAnswer.innerHTML =
            '<div class="free-answer-box">' +
            '<span class="ans-label">✔ Answer</span>' +
            '<span class="ans-value">' + escHTML(result.answer) + '</span>' +
            '</div>';
        }
        var stepsArr = Array.isArray(result.steps) ? result.steps : [];
        if (freeSteps && stepsArr.length) {
          freeSteps.innerHTML = '<div class="steps-header">Step-by-step solution</div>' +
            stepsArr.filter(Boolean).join("");
        }
        if (window.MathJax && MathJax.typesetPromise) {
          MathJax.typesetPromise([freeAnswer, freeSteps]).catch(function () {});
        }
      } catch (err) {
        if (freeAnswer) freeAnswer.innerHTML = '<span style="color:#b91c1c;">⚠ Could not solve — please rephrase.</span>';
      }
      freeQ.value = "";
    }

    solveBtn.addEventListener("click", runFree);
    freeQ.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); runFree(); }
    });
  }

  /* ── fillQ global (used by example pills) ── */
  window.fillQ = function (text) {
    var ta = document.getElementById("freeQuestion");
    if (!ta) return;
    ta.value = text;
    var sec = document.getElementById("ask-section");
    if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(function () { ta.focus(); }, 400);
  };

  /* ── Toast ── */
  function showToast() {
    if (document.querySelector(".achieve-toast")) return;
    var t = document.createElement("div");
    t.className = "achieve-toast";
    t.style.cssText =
      "position:fixed;top:78px;right:20px;background:#1e6e36;color:#fff;" +
      "padding:14px 18px;border-radius:12px;z-index:9999;" +
      "box-shadow:0 4px 20px rgba(0,0,0,.2);font-size:.9rem;" +
      "font-family:'DM Sans',sans-serif;";
    t.innerHTML = "<strong>🏆 Correct!</strong><br>" +
      '<a href="achievements.html" style="color:#ffe4c4;font-weight:700;text-decoration:none;">View achievements →</a>';
    document.body.appendChild(t);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 4000);
  }

  /* ── escHTML ── */
  function escHTML(str) {
    var d = document.createElement("div");
    d.textContent = String(str);
    return d.innerHTML;
  }

})();