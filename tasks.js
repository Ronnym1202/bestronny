console.log("✅ tasks.js LOADED");

/* ═══════════════════════════════════════════════════════════════
   WELCOME BANNER
═══════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {
    const welcomeDiv = document.getElementById("welcomeMessage");
    if (!welcomeDiv) return;
    try {
        if (typeof MathProgress !== "undefined") {
            const stats = MathProgress.getStats();
            if (stats.totalSolved > 0) {
                welcomeDiv.innerHTML = `
                    <div style="background:rgba(255,228,196,0.15);border:1px solid rgba(255,228,196,0.3);
                         padding:12px 20px;border-radius:10px;display:inline-flex;gap:24px;
                         flex-wrap:wrap;justify-content:center;margin-top:10px;">
                        <div style="text-align:center;">
                            <div style="font-size:1.6rem;font-weight:700;color:#ffe4c4;">${stats.totalSolved}</div>
                            <div style="font-size:0.78rem;color:rgba(255,228,196,0.6);">Solved</div>
                        </div>
                        <div style="text-align:center;">
                            <div style="font-size:1.6rem;font-weight:700;color:#ffe4c4;">${stats.accuracy}%</div>
                            <div style="font-size:0.78rem;color:rgba(255,228,196,0.6);">Accuracy</div>
                        </div>
                        <div style="text-align:center;">
                            <div style="font-size:1.6rem;font-weight:700;color:#ffe4c4;">${stats.badges.length}</div>
                            <div style="font-size:0.78rem;color:rgba(255,228,196,0.6);">Badges</div>
                        </div>
                    </div>
                    <br><a href="achievements.html" style="display:inline-block;margin-top:8px;
                         background:#2e6645;color:#fff;padding:5px 14px;border-radius:6px;
                         text-decoration:none;font-size:0.85rem;font-weight:700;">View Achievements →</a>`;
            } else {
                welcomeDiv.innerHTML = `
                    <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;justify-content:center;">
                        <span style="background:rgba(255,228,196,0.15);border:1px solid rgba(255,228,196,0.25);
                              padding:4px 12px;border-radius:20px;font-size:0.82rem;color:rgba(255,228,196,0.75);">
                              ✅ Auto-saves progress</span>
                        <span style="background:rgba(255,228,196,0.15);border:1px solid rgba(255,228,196,0.25);
                              padding:4px 12px;border-radius:20px;font-size:0.82rem;color:rgba(255,228,196,0.75);">
                              🏆 Earn badges</span>
                        <span style="background:rgba(255,228,196,0.15);border:1px solid rgba(255,228,196,0.25);
                              padding:4px 12px;border-radius:20px;font-size:0.82rem;color:rgba(255,228,196,0.75);">
                              📈 Track improvement</span>
                    </div>`;
            }
        }
    } catch (e) { console.warn("Welcome banner error:", e); }
});

/* ═══════════════════════════════════════════════════════════════
   GENERATED PROBLEM BANK
═══════════════════════════════════════════════════════════════ */
const taskFormulas = {
    differentiation: [
        (x) => ({
            q: `Differentiate: y = ${x}x³ + ${x+2}x² + ${x+4}x + ${x-1}`,
            ans: `${3*x}x² + ${2*(x+2)}x + ${x+4}`,
            steps: `<strong>Rule:</strong> Power rule — d/dx(xⁿ) = n·xⁿ⁻¹<br><br>
d/dx(${x}x³) = <strong>${3*x}x²</strong><br>
d/dx(${x+2}x²) = <strong>${2*(x+2)}x</strong><br>
d/dx(${x+4}x) = <strong>${x+4}</strong><br>
d/dx(${x-1}) = <strong>0</strong> (constant)<br><br>
<strong>✔ Final Answer: y′ = ${3*x}x² + ${2*(x+2)}x + ${x+4}</strong>`
        }),
        (x) => ({
            q: `Differentiate: y = ${x}sin(x) + ${x+1}cos(x)`,
            ans: `${x}cos(x) - ${x+1}sin(x)`,
            steps: `<strong>Rules:</strong> d/dx(sin x) = cos x &nbsp;|&nbsp; d/dx(cos x) = −sin x<br><br>
d/dx(${x}sin x) = <strong>${x}cos x</strong><br>
d/dx(${x+1}cos x) = <strong>−${x+1}sin x</strong><br><br>
<strong>✔ Final Answer: y′ = ${x}cos(x) − ${x+1}sin(x)</strong>`
        }),
        (x) => ({
            q: `Differentiate: y = e^(${x}x)`,
            ans: `${x}e^(${x}x)`,
            steps: `<strong>Rule:</strong> d/dx(e^(kx)) = k·e^(kx)<br><br>
Here k = ${x}<br><br>
<strong>✔ Final Answer: y′ = ${x}e^(${x}x)</strong>`
        }),
        (x) => ({
            q: `Differentiate: y = ${x}x^${x+2} − ${x+1}x + ${x}`,
            ans: `${x*(x+2)}x^${x+1} − ${x+1}`,
            steps: `<strong>Rule:</strong> Power rule + constant rule<br><br>
d/dx(${x}x^${x+2}) = ${x} × ${x+2} × x^${x+1} = <strong>${x*(x+2)}x^${x+1}</strong><br>
d/dx(−${x+1}x) = <strong>−${x+1}</strong><br>
d/dx(${x}) = <strong>0</strong><br><br>
<strong>✔ Final Answer: y′ = ${x*(x+2)}x^${x+1} − ${x+1}</strong>`
        })
    ],
    integration: [
        (x) => ({
            q: `Integrate: ∫(${x}x² + ${x+3}x + ${x-2}) dx`,
            ans: `${(x/3).toFixed(3)}x³ + ${((x+3)/2).toFixed(3)}x² + ${x-2}x + C`,
            steps: `<strong>Rule:</strong> ∫xⁿ dx = xⁿ⁺¹/(n+1) + C<br><br>
∫${x}x² dx = ${x} × x³/3 = <strong>${(x/3).toFixed(3)}x³</strong><br>
∫${x+3}x dx = ${x+3} × x²/2 = <strong>${((x+3)/2).toFixed(3)}x²</strong><br>
∫${x-2} dx = <strong>${x-2}x</strong><br>
Add constant of integration: <strong>+ C</strong><br><br>
<strong>✔ Final Answer: ${(x/3).toFixed(3)}x³ + ${((x+3)/2).toFixed(3)}x² + ${x-2}x + C</strong>`
        }),
        (x) => ({
            q: `Integrate: ∫(${x}cos(x) − ${x+1}sin(x)) dx`,
            ans: `${x}sin(x) + ${x+1}cos(x) + C`,
            steps: `<strong>Rules:</strong> ∫cos(x) dx = sin(x) &nbsp;|&nbsp; ∫sin(x) dx = −cos(x)<br><br>
∫${x}cos(x) dx = <strong>${x}sin(x)</strong><br>
∫−${x+1}sin(x) dx = <strong>${x+1}cos(x)</strong><br><br>
<strong>✔ Final Answer: ${x}sin(x) + ${x+1}cos(x) + C</strong>`
        }),
        (x) => ({
            q: `Integrate: ∫ e^(${x}x) dx`,
            ans: `1/${x} × e^(${x}x) + C`,
            steps: `<strong>Rule:</strong> ∫e^(kx) dx = e^(kx)/k + C<br><br>
k = ${x}<br>
∫e^(${x}x) dx = e^(${x}x) / ${x}<br><br>
<strong>✔ Final Answer: (1/${x})e^(${x}x) + C</strong>`
        }),
        (x) => ({
            q: `Evaluate: ∫₀^${x} (2t + 1) dt`,
            ans: `${x*x + x}`,
            steps: `<strong>Step 1:</strong> Find the antiderivative of (2t + 1):<br>
F(t) = t² + t<br><br>
<strong>Step 2:</strong> Apply limits [0, ${x}]:<br>
F(${x}) − F(0) = (${x}² + ${x}) − 0 = ${x*x} + ${x}<br><br>
<strong>✔ Final Answer: ${x*x + x}</strong>`
        })
    ],
    matrices: [
        (x) => ({
            q: `Find the determinant of [[${x}, ${x+1}], [${x+2}, ${x+5}]]`,
            ans: `${x*(x+5) - (x+1)*(x+2)}`,
            steps: `<strong>Formula for 2×2 determinant:</strong> det = ad − bc<br><br>
Matrix: a=${x}, b=${x+1}, c=${x+2}, d=${x+5}<br><br>
det = (${x} × ${x+5}) − (${x+1} × ${x+2})<br>
    = ${x*(x+5)} − ${(x+1)*(x+2)}<br><br>
<strong>✔ Final Answer: ${x*(x+5) - (x+1)*(x+2)}</strong>`
        }),
        (x) => ({
            q: `Does [[${x}, ${x+1}], [${x+2}, ${x+3}]] have an inverse?`,
            ans: x*(x+3)-(x+1)*(x+2) !== 0 ? "Yes" : "No",
            steps: `<strong>Rule:</strong> A matrix has an inverse only when det ≠ 0.<br><br>
det = (${x})(${x+3}) − (${x+1})(${x+2}) = ${x*(x+3)} − ${(x+1)*(x+2)} = ${x*(x+3)-(x+1)*(x+2)}<br><br>
<strong>✔ Answer: ${x*(x+3)-(x+1)*(x+2) !== 0 ? "Yes — inverse exists" : "No — matrix is singular"}</strong>`
        }),
        (x) => ({
            q: `Multiply matrices: [[${x}, 1], [0, ${x+1}]] × [[2], [${x}]]`,
            ans: `[[${3*x}], [${x*(x+1)}]]`,
            steps: `<strong>Matrix × Column vector:</strong><br><br>
Row 1: (${x}×2) + (1×${x}) = ${2*x} + ${x} = <strong>${3*x}</strong><br>
Row 2: (0×2) + (${x+1}×${x}) = 0 + ${x*(x+1)} = <strong>${x*(x+1)}</strong><br><br>
<strong>✔ Final Answer: [[${3*x}], [${x*(x+1)}]]</strong>`
        })
    ],
    vectors: [
        (x) => ({
            q: `Find the magnitude of vector v = (${x}, ${x+2}, ${x-1})`,
            ans: `${Math.sqrt(x*x + (x+2)*(x+2) + (x-1)*(x-1)).toFixed(2)}`,
            steps: `<strong>Formula:</strong> |v| = √(x₁² + x₂² + x₃²)<br><br>
x₁=${x}, x₂=${x+2}, x₃=${x-1}<br>
= √(${x}² + ${x+2}² + ${x-1}²)<br>
= √(${x*x} + ${(x+2)*(x+2)} + ${(x-1)*(x-1)})<br>
= √${x*x + (x+2)*(x+2) + (x-1)*(x-1)}<br><br>
<strong>✔ Final Answer: ${Math.sqrt(x*x + (x+2)*(x+2) + (x-1)*(x-1)).toFixed(2)}</strong>`
        }),
        (x) => ({
            q: `Find the dot product of a = (${x}, 2, 1) and b = (${x+1}, 3, ${x})`,
            ans: `${x*(x+1) + 6 + x}`,
            steps: `<strong>Formula:</strong> a·b = x₁y₁ + x₂y₂ + x₃y₃<br><br>
= (${x})(${x+1}) + (2)(3) + (1)(${x})<br>
= ${x*(x+1)} + 6 + ${x}<br><br>
<strong>✔ Final Answer: ${x*(x+1) + 6 + x}</strong>`
        }),
        (x) => ({
            q: `Are vectors (${x}, ${x}) and (${-x}, ${x}) perpendicular?`,
            ans: x*(-x) + x*x === 0 ? "Yes" : "No",
            steps: `<strong>Rule:</strong> Two vectors are perpendicular if their dot product = 0.<br><br>
a·b = (${x})(${-x}) + (${x})(${x})<br>
    = ${x*(-x)} + ${x*x} = ${x*(-x)+x*x}<br><br>
<strong>✔ Answer: ${x*(-x)+x*x === 0 ? "Yes — perpendicular (dot product = 0)" : "No — not perpendicular"}</strong>`
        })
    ],
    areas: [
        (x) => ({
            q: `Find the area of a triangle with base ${x} cm and height ${x+4} cm`,
            ans: `${0.5*x*(x+4)}`,
            steps: `<strong>Formula:</strong> A = ½ × base × height<br><br>
= ½ × ${x} × ${x+4}<br>
= 0.5 × ${x*(x+4)}<br><br>
<strong>✔ Final Answer: ${0.5*x*(x+4)} cm²</strong>`
        }),
        (x) => ({
            q: `Find the area of a circle with radius ${x} cm (leave in terms of π)`,
            ans: `${x*x}π`,
            steps: `<strong>Formula:</strong> A = πr²<br><br>
r = ${x} cm<br>
A = π × ${x}² = π × ${x*x}<br><br>
<strong>✔ Final Answer: ${x*x}π cm² ≈ ${(Math.PI*x*x).toFixed(2)} cm²</strong>`
        }),
        (x) => ({
            q: `Find the area of a trapezium with parallel sides ${x} cm and ${x+4} cm, height ${x+1} cm`,
            ans: `${0.5*(2*x+4)*(x+1)}`,
            steps: `<strong>Formula:</strong> A = ½(a + b) × h<br><br>
a = ${x}, b = ${x+4}, h = ${x+1}<br>
A = ½ × (${x} + ${x+4}) × ${x+1}<br>
A = ½ × ${2*x+4} × ${x+1}<br><br>
<strong>✔ Final Answer: ${0.5*(2*x+4)*(x+1)} cm²</strong>`
        }),
        (x) => ({
            q: `Find the surface area of a cube with side ${x} cm`,
            ans: `${6*x*x}`,
            steps: `<strong>Formula:</strong> SA = 6s²<br><br>
s = ${x} cm<br>
SA = 6 × ${x}² = 6 × ${x*x}<br><br>
<strong>✔ Final Answer: ${6*x*x} cm²</strong>`
        })
    ],
    volumes: [
        (x) => ({
            q: `Find the volume of a cylinder with radius ${x} cm and height ${x+2} cm`,
            ans: `${(Math.PI*x*x*(x+2)).toFixed(2)}`,
            steps: `<strong>Formula:</strong> V = πr²h<br><br>
r = ${x}, h = ${x+2}<br>
V = π × ${x}² × ${x+2} = π × ${x*x} × ${x+2} = ${x*x*(x+2)}π<br><br>
<strong>✔ Final Answer: ${(Math.PI*x*x*(x+2)).toFixed(2)} cm³</strong>`
        }),
        (x) => ({
            q: `Find the volume of a sphere with radius ${x} cm`,
            ans: `${((4/3)*Math.PI*x**3).toFixed(2)}`,
            steps: `<strong>Formula:</strong> V = (4/3)πr³<br><br>
r = ${x} cm<br>
V = (4/3) × π × ${x}³ = (4/3) × π × ${x**3}<br><br>
<strong>✔ Final Answer: ${((4/3)*Math.PI*x**3).toFixed(2)} cm³</strong>`
        }),
        (x) => ({
            q: `Find the volume of a cone with radius ${x} cm and height ${x+3} cm`,
            ans: `${((1/3)*Math.PI*x*x*(x+3)).toFixed(2)}`,
            steps: `<strong>Formula:</strong> V = (1/3)πr²h<br><br>
r = ${x}, h = ${x+3}<br>
V = (1/3) × π × ${x}² × ${x+3} = ${((1/3)*x*x*(x+3)).toFixed(4)}π<br><br>
<strong>✔ Final Answer: ${((1/3)*Math.PI*x*x*(x+3)).toFixed(2)} cm³</strong>`
        }),
        (x) => ({
            q: `Find the volume of a rectangular box: ${x} cm × ${x+1} cm × ${x+2} cm`,
            ans: `${x*(x+1)*(x+2)}`,
            steps: `<strong>Formula:</strong> V = l × w × h<br><br>
V = ${x} × ${x+1} × ${x+2}<br>
V = ${x*(x+1)} × ${x+2}<br><br>
<strong>✔ Final Answer: ${x*(x+1)*(x+2)} cm³</strong>`
        })
    ]
};

/* ═══════════════════════════════════════════════════════════════
   ELEMENT REFS
═══════════════════════════════════════════════════════════════ */
const topicSelect   = document.getElementById("topicSelect");
const taskDisplay   = document.getElementById("taskDisplay");
const answerInput   = document.getElementById("answerInput");
const answerRow     = document.getElementById("answerRow");
const resultDisplay = document.getElementById("resultDisplay");
const solutionSteps = document.getElementById("solutionSteps");
const freeQuestion  = document.getElementById("freeQuestion");
const solveFreeBtn  = document.getElementById("solveFreeQuestion");
const freeAnswer    = document.getElementById("freeAnswer");
const freeSteps     = document.getElementById("freeSteps");

let currentTask  = null;
let currentTopic = null;

/* ═══════════════════════════════════════════════════════════════
   GENERATE TASK
═══════════════════════════════════════════════════════════════ */
document.getElementById("generateTaskBtn").addEventListener("click", () => {
    const t = topicSelect.value;
    if (!t) { alert("Please choose a topic first."); return; }
    currentTopic = t;
    const rnd = Math.floor(Math.random() * 12) + 2;
    const generators = taskFormulas[t];
    currentTask = generators[Math.floor(Math.random() * generators.length)](rnd);
    taskDisplay.innerHTML = currentTask.q;
    answerInput.value     = "";
    resultDisplay.innerHTML = "";
    resultDisplay.className = "";
    solutionSteps.innerHTML = "";
    answerRow.style.display = "flex";
    if (typeof MathProgress !== "undefined") {
        const nameMap = { differentiation:"Differentiation", integration:"Integration",
                          matrices:"Matrices", vectors:"Vectors",
                          areas:"Areas of Shapes", volumes:"Volumes of Solids" };
        MathProgress.recordTopicViewed(nameMap[t] || t);
    }
    if (window.MathJax) MathJax.typesetPromise([taskDisplay]).catch(() => {});
});

/* ═══════════════════════════════════════════════════════════════
   CHECK ANSWER
═══════════════════════════════════════════════════════════════ */
document.getElementById("submitAnswer").addEventListener("click", () => {
    if (!currentTask) { alert("Generate a problem first!"); return; }
    const userAns    = answerInput.value.trim();
    const correctAns = currentTask.ans;
    if (!userAns) { resultDisplay.textContent = "Please enter an answer."; return; }
    const numOnly = /^-?\d+(\.\d+)?$/.test(String(correctAns).trim());
    let isCorrect = false;
    if (numOnly) {
        const uv = parseFloat(userAns.replace(/[^0-9.\-]/g,""));
        const cv = parseFloat(correctAns);
        isCorrect = !isNaN(uv) && Math.abs(uv - cv) < 0.05;
    } else {
        const norm = s => s.toLowerCase().replace(/\s+/g,"").replace(/[×·]/g,"*").replace(/−/g,"-");
        isCorrect = norm(userAns) === norm(correctAns);
    }
    if (isCorrect) {
        resultDisplay.innerHTML = "✓ Correct — well done!";
        resultDisplay.className = "correct";
        if (typeof MathProgress !== "undefined") {
            const topicMap = { differentiation:"calculus", integration:"calculus",
                               matrices:"algebra", vectors:"algebra",
                               areas:"geometry", volumes:"geometry" };
            MathProgress.recordProblemSolved(topicMap[currentTopic]||"algebra", true, currentTask.q.slice(0,60));
            setTimeout(() => {
                const n = document.createElement("div");
                n.style.cssText = "position:fixed;top:80px;right:20px;background:#2e6645;color:#fff;padding:14px 18px;border-radius:10px;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,0.2);font-size:0.9rem;";
                n.innerHTML = `<strong>🏆 Achievement updated!</strong><br><a href="achievements.html" style="color:#ffe4c4;font-weight:700;">View achievements →</a>`;
                document.body.appendChild(n);
                setTimeout(() => n.remove(), 4000);
            }, 400);
        }
    } else {
        resultDisplay.innerHTML = "✗ Not quite — check the steps below.";
        resultDisplay.className = "incorrect";
        if (typeof MathProgress !== "undefined") {
            const topicMap = { differentiation:"calculus", integration:"calculus",
                               matrices:"algebra", vectors:"algebra",
                               areas:"geometry", volumes:"geometry" };
            MathProgress.recordProblemSolved(topicMap[currentTopic]||"algebra", false, currentTask.q.slice(0,60));
        }
    }
    solutionSteps.innerHTML = "<strong>Step-by-step solution:</strong><br><br>" + currentTask.steps;
    if (window.MathJax) MathJax.typesetPromise([solutionSteps]).catch(() => {});
});

/* ═══════════════════════════════════════════════════════════════
   ████████████████████████████████████████████████████████████
   PROFESSIONAL MATHEMATICS ENGINE v2.0
   Covers: Algebra, Quadratics, Polynomials, Differentiation,
   Integration (definite & indefinite), Limits, Sequences,
   Series, Matrices, Vectors, Trigonometry, Geometry,
   Statistics, Probability, Complex Numbers, Number Theory,
   Logarithms, Exponentials, Conics, Financial Maths
   ████████████████████████████████████████████████████████████
═══════════════════════════════════════════════════════════════ */
const MathEngine = (function () {

    /* ── Utilities ── */
    const PI  = Math.PI;
    const r   = (n, dp = 6) => {
        if (!isFinite(n)) return String(n);
        const v = +n.toFixed(dp);
        return v === Math.round(v) ? String(Math.round(v)) : String(v);
    };
    const toRad  = d => d * PI / 180;
    const toDeg  = rad => rad * 180 / PI;
    const frac   = (num, den) => den === 1 ? String(num) : `${num}/${den}`;
    const gcd    = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);
    const lcm    = (a, b) => Math.abs(a * b) / gcd(a, b);
    const isPrime = n => {
        if (n < 2) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
        return true;
    };
    const primeFactors = n => {
        const f = [];
        let d = 2;
        while (n > 1) { while (n % d === 0) { f.push(d); n /= d; } d++; }
        return f;
    };
    const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);
    const nCr = (n, k) => {
        if (k < 0 || k > n) return 0;
        if (k === 0 || k === n) return 1;
        k = Math.min(k, n - k);
        let c = 1;
        for (let i = 0; i < k; i++) c = c * (n - i) / (i + 1);
        return Math.round(c);
    };
    const formatNum = n => {
        if (Math.abs(n) < 1e-10) return "0";
        return r(n, 6);
    };

    /* ── Step builder ── */
    const step = (n, text) =>
        `<div class="solution-step"><span class="step-num">Step ${n}</span><div class="step-body">${text}</div></div>`;
    const note = text => `<div class="solution-note">${text}</div>`;
    const ans  = text => `<div class="final-answer-block">✔ <strong>Final Answer:</strong> ${text}</div>`;
    const rule = text => `<div class="rule-box">📐 <em>${text}</em></div>`;

    /* ══════════════════════════════════════════
       ALGEBRA & EQUATIONS
    ══════════════════════════════════════════ */

    function solveLinear(rawQ) {
        const steps = [];
        /* Normalize: remove spaces around = and operators */
        const q = rawQ.replace(/\s+/g, " ").trim();

        /* Pattern: ax + b = c  or  ax - b = c  or  ax = c */
        /* Try to extract both sides */
        const sides = q.split("=");
        if (sides.length !== 2) return null;

        let lhs = sides[0].trim();
        let rhs = sides[1].trim();

        /* Move everything to lhs: lhs - rhs = 0 */
        /* Parse lhs - rhs to get a and b in ax + b = 0 */
        const parse = expr => {
            let a = 0, b = 0;
            const norm = expr.replace(/\s/g, "").replace(/−/g, "-");
            /* Match coefficient of x */
            const xTerms = [...norm.matchAll(/([+\-]?\d*\.?\d*)\*?x/g)];
            xTerms.forEach(m => {
                const c = m[1] === "" || m[1] === "+" ? 1 :
                          m[1] === "-" ? -1 : parseFloat(m[1]);
                if (!isNaN(c)) a += c;
            });
            /* Match constants */
            const constStr = norm.replace(/[+\-]?\d*\.?\d*\*?x/g, "");
            const cTerms = [...constStr.matchAll(/([+\-]?\d+\.?\d*)/g)];
            cTerms.forEach(m => { b += parseFloat(m[1]); });
            return { a, b };
        };

        const L = parse(lhs);
        const R = parse(rhs);
        const a = L.a - R.a;
        const b = L.b - R.b;

        if (Math.abs(a) < 1e-12) {
            if (Math.abs(b) < 1e-10) return { answer: "All real numbers (infinite solutions)", steps: [note("Both sides are identical — every real number is a solution.")] };
            return { answer: "No solution (inconsistent)", steps: [note("The equation reduces to a false statement — no solution exists.")] };
        }

        const xVal = r(-b / a, 6);
        return {
            answer: `x = ${xVal}`,
            steps: [
                step(1, `Start with: <code>${q}</code>`),
                step(2, `Rearrange — bring x-terms to the left, constants to the right:<br><code>${a}x = ${-b}</code>`),
                step(3, `Divide both sides by ${a}:<br><code>x = ${-b} ÷ ${a} = ${xVal}</code>`),
                ans(`x = ${xVal}`)
            ]
        };
    }

    function solveQuadratic(q) {
        const steps = [];
        /* Parse ax²+bx+c=0 */
        const norm = q.replace(/\s/g, "").replace(/−/g, "-").replace(/[xX]\^?2/g, "X2").replace(/[xX]\^?²/g, "X2");
        let a = 0, b = 0, c = 0;

        /* Pull coefficients */
        const aM = norm.match(/([+\-]?\d*\.?\d*)X2/);
        if (aM) a = aM[1] === "" || aM[1] === "+" ? 1 : aM[1] === "-" ? -1 : parseFloat(aM[1]);

        const bM = norm.match(/([+\-]?\d*\.?\d*)[xX](?!\^|2)/);
        if (bM) b = bM[1] === "" || bM[1] === "+" ? 1 : bM[1] === "-" ? -1 : parseFloat(bM[1]);

        /* Move rhs to lhs */
        const sides = norm.split("=");
        const rhs = sides[1] ? parseFloat(sides[1]) || 0 : 0;
        const cTerms = (sides[0] || "").replace(/[+\-]?\d*\.?\d*X2/g, "").replace(/[+\-]?\d*\.?\d*[xX]/g, "");
        const cM = cTerms.match(/([+\-]?\d+\.?\d*)/);
        c = (cM ? parseFloat(cM[1]) : 0) - rhs;

        if (Math.abs(a) < 1e-12) {
            /* Actually linear */
            return solveLinear(q.replace(/[xX]\^?2/g, "").replace(/[xX]\^?²/g, "")) || { answer: "Could not parse", steps: [] };
        }

        const D = b * b - 4 * a * c;
        const stepList = [
            step(1, `Write in standard form: <code>${a}x² ${b >= 0 ? "+" : ""}${b}x ${c >= 0 ? "+" : ""}${c} = 0</code>`),
            step(2, `Identify coefficients: a = ${a}, b = ${b}, c = ${c}`),
            step(3, `Compute discriminant Δ = b² − 4ac = ${b}² − 4(${a})(${c}) = ${b*b} − ${4*a*c} = <strong>${D}</strong>`),
        ];

        let ansText;
        if (D > 0) {
            const x1 = r((-b + Math.sqrt(D)) / (2 * a), 6);
            const x2 = r((-b - Math.sqrt(D)) / (2 * a), 6);
            stepList.push(step(4, `Δ > 0 → Two distinct real roots`));
            stepList.push(step(5, `x = (−b ± √Δ) / 2a = (${-b} ± ${r(Math.sqrt(D), 6)}) / ${2 * a}`));
            stepList.push(step(6, `x₁ = (${-b} + ${r(Math.sqrt(D), 6)}) / ${2 * a} = <strong>${x1}</strong><br>x₂ = (${-b} − ${r(Math.sqrt(D), 6)}) / ${2 * a} = <strong>${x2}</strong>`));
            ansText = `x₁ = ${x1},  x₂ = ${x2}`;
            /* Check for integer factoring */
            if (Number.isInteger(parseFloat(x1)) && Number.isInteger(parseFloat(x2))) {
                const r1 = -parseFloat(x1), r2 = -parseFloat(x2);
                stepList.push(note(`💡 Can also be written as: (x ${r1 >= 0 ? "+" : ""}${r1})(x ${r2 >= 0 ? "+" : ""}${r2}) = 0`));
            }
        } else if (Math.abs(D) < 1e-10) {
            const x0 = r(-b / (2 * a), 6);
            stepList.push(step(4, `Δ = 0 → One repeated root (double root)`));
            stepList.push(step(5, `x = −b / 2a = ${-b} / ${2 * a} = <strong>${x0}</strong>`));
            ansText = `x = ${x0}  (repeated root)`;
        } else {
            const re = r(-b / (2 * a), 6);
            const im = r(Math.sqrt(-D) / (2 * a), 6);
            stepList.push(step(4, `Δ < 0 → No real roots. Two complex conjugate roots.`));
            stepList.push(step(5, `x = (${-b} ± √(${D})) / ${2 * a} = ${re} ± ${im}i`));
            ansText = `x = ${re} + ${im}i  and  x = ${re} − ${im}i`;
        }
        stepList.push(ans(ansText));
        return { answer: ansText, steps: stepList };
    }

    function solveSimultaneous(q) {
        /* Expects: 2x + 3y = 7, x - y = 1 */
        const eqs = q.split(/[,;]|\band\b/i).filter(e => e.includes("=")).slice(0, 2);
        if (eqs.length < 2) return null;

        const parseEq = expr => {
            const s = expr.replace(/\s/g, "").replace(/−/g, "-");
            let a = 0, b = 0, c = 0;
            const sides = s.split("=");
            c = parseFloat(sides[1]) || 0;
            const lhs = sides[0];
            const xM = lhs.match(/([+\-]?\d*\.?\d*)\*?x/i);
            const yM = lhs.match(/([+\-]?\d*\.?\d*)\*?y/i);
            if (xM) a = xM[1] === "" || xM[1] === "+" ? 1 : xM[1] === "-" ? -1 : parseFloat(xM[1]);
            if (yM) b = yM[1] === "" || yM[1] === "+" ? 1 : yM[1] === "-" ? -1 : parseFloat(yM[1]);
            return { a, b, c };
        };

        const e1 = parseEq(eqs[0]);
        const e2 = parseEq(eqs[1]);

        const det = e1.a * e2.b - e2.a * e1.b;
        if (Math.abs(det) < 1e-10) {
            return { answer: "No unique solution (parallel or identical lines)", steps: [note("The determinant of the coefficient matrix is 0.")] };
        }
        const x = r((e1.c * e2.b - e2.c * e1.b) / det, 6);
        const y = r((e1.a * e2.c - e2.a * e1.c) / det, 6);

        return {
            answer: `x = ${x},  y = ${y}`,
            steps: [
                step(1, `Equations:<br>① ${e1.a}x ${e1.b >= 0 ? "+" : ""}${e1.b}y = ${e1.c}<br>② ${e2.a}x ${e2.b >= 0 ? "+" : ""}${e2.b}y = ${e2.c}`),
                step(2, `Use Cramer's Rule: det = (${e1.a})(${e2.b}) − (${e2.a})(${e1.b}) = ${r(det, 6)}`),
                step(3, `x = (${e1.c}·${e2.b} − ${e2.c}·${e1.b}) / ${r(det, 6)} = ${r(e1.c * e2.b - e2.c * e1.b, 6)} / ${r(det, 6)} = <strong>${x}</strong>`),
                step(4, `y = (${e1.a}·${e2.c} − ${e2.a}·${e1.c}) / ${r(det, 6)} = ${r(e1.a * e2.c - e2.a * e1.c, 6)} / ${r(det, 6)} = <strong>${y}</strong>`),
                step(5, `Verify in ①: ${e1.a}(${x}) + ${e1.b}(${y}) = ${r(e1.a * parseFloat(x) + e1.b * parseFloat(y), 4)} ✓`),
                ans(`x = ${x},  y = ${y}`)
            ]
        };
    }

    function solveInequality(q) {
        const norm = q.replace(/\s/g, "").replace(/−/g, "-");
        /* linear inequality: ax + b > c etc */
        const op = norm.match(/(≤|≥|<=|>=|<|>)/)?.[1] || ">";
        const sides = norm.split(/(≤|≥|<=|>=|<|>)/);
        if (sides.length < 3) return null;
        const lhs = sides[0], rhs = sides[2];
        const parseS = s => {
            let a = 0, b = 0;
            const xM = s.match(/([+\-]?\d*\.?\d*)\*?x/i);
            if (xM) a = xM[1] === "" || xM[1] === "+" ? 1 : xM[1] === "-" ? -1 : parseFloat(xM[1]);
            const rest = s.replace(/[+\-]?\d*\.?\d*\*?x/gi, "");
            const cM = rest.match(/([+\-]?\d+\.?\d*)/);
            if (cM) b = parseFloat(cM[1]);
            return { a, b };
        };
        const L = parseS(lhs), R = parseS(rhs);
        const a = L.a - R.a;
        const b = R.b - L.b;
        if (Math.abs(a) < 1e-12) return null;
        const xVal = r(b / a, 6);
        /* Flip inequality if dividing by negative */
        const flip = a < 0;
        const opMap = { ">": "<", "<": ">", ">=": "<=", "<=": ">=", "≤": "≥", "≥": "≤" };
        const finalOp = flip ? (opMap[op] || op) : op;
        return {
            answer: `x ${finalOp} ${xVal}`,
            steps: [
                step(1, `Original inequality: <code>${q}</code>`),
                step(2, `Rearrange to isolate x: <code>${a}x ${b >= 0 ? "+" : ""}${b >= 0 ? b : b} → ${a}x ${b >= 0 ? ">= " : ""}...</code>`),
                step(3, `Divide both sides by ${a}${flip ? " — <strong>inequality flips because we divide by a negative number</strong>" : ""}`),
                step(4, `Result: x ${finalOp} ${xVal}`),
                ans(`x ${finalOp} ${xVal}`)
            ]
        };
    }

    function factorQuadratic(q) {
        /* Factor ax²+bx+c */
        const norm = q.replace(/\s/g, "").replace(/−/g, "-").replace(/[xX]\^?2/g, "X2");
        const aM = norm.match(/([+\-]?\d*\.?\d*)X2/);
        const bM = norm.match(/([+\-]?\d*\.?\d*)[xX](?!2)/);
        const a = aM ? (aM[1] === "" || aM[1] === "+" ? 1 : aM[1] === "-" ? -1 : parseFloat(aM[1])) : 0;
        const b = bM ? (bM[1] === "" || bM[1] === "+" ? 1 : bM[1] === "-" ? -1 : parseFloat(bM[1])) : 0;
        const rest = norm.replace(/[+\-]?\d*\.?\d*X2/, "").replace(/[+\-]?\d*\.?\d*[xX]/g, "");
        const cM = rest.match(/([+\-]?\d+\.?\d*)/);
        const c = cM ? parseFloat(cM[1]) : 0;

        if (Math.abs(a) < 1e-12) return null;

        const D = b * b - 4 * a * c;
        if (D < 0) return { answer: `Cannot factor over reals (Δ = ${r(D,4)} < 0)`, steps: [note("Discriminant is negative — the quadratic has no real roots and cannot be factored over ℝ.")] };

        const r1 = (-b + Math.sqrt(D)) / (2 * a);
        const r2 = (-b - Math.sqrt(D)) / (2 * a);

        const fmtRoot = v => {
            const g = gcd(Math.round(Math.abs(v * 1e6)), 1e6);
            return r(v, 4);
        };

        const factored = Math.abs(a) === 1
            ? `(x − ${r(r1,4)})(x − ${r(r2,4)})`
            : `${a}(x − ${r(r1,4)})(x − ${r(r2,4)})`;

        return {
            answer: factored,
            steps: [
                step(1, `Expression: <code>${a}x² ${b>=0?"+":""}${b}x ${c>=0?"+":""}${c}</code>`),
                step(2, `Find discriminant: Δ = b²−4ac = ${b*b} − ${4*a*c} = ${r(D,4)}`),
                step(3, `Roots: x = (−b ± √Δ)/2a → x₁ = ${r(r1,4)},  x₂ = ${r(r2,4)}`),
                step(4, `Write factored form: a(x − r₁)(x − r₂)`),
                ans(factored)
            ]
        };
    }

    /* ══════════════════════════════════════════
       LOGARITHMS & EXPONENTIALS
    ══════════════════════════════════════════ */
    function solveLogExp(q) {
        const lower = q.toLowerCase();
        const nums = (q.match(/-?\d+\.?\d*/g) || []).map(Number);
        const steps = [];

        /* log(x) = k  → x = 10^k */
        const logEqM = lower.match(/log\s*\(?\s*x\s*\)?\s*=\s*(-?\d+\.?\d*)/);
        if (logEqM) {
            const k = parseFloat(logEqM[1]);
            const val = r(Math.pow(10, k), 6);
            return {
                answer: `x = ${val}`,
                steps: [
                    step(1, `Equation: log(x) = ${k}  (base 10)`),
                    step(2, `Convert: x = 10^${k}`),
                    step(3, `x = ${val}`),
                    ans(`x = ${val}`)
                ]
            };
        }

        /* ln(x) = k */
        const lnEqM = lower.match(/ln\s*\(?\s*x\s*\)?\s*=\s*(-?\d+\.?\d*)/);
        if (lnEqM) {
            const k = parseFloat(lnEqM[1]);
            const val = r(Math.exp(k), 6);
            return {
                answer: `x = e^${k} ≈ ${val}`,
                steps: [
                    step(1, `Equation: ln(x) = ${k}`),
                    step(2, `Convert from natural log: x = e^${k}`),
                    step(3, `x = ${val}`),
                    ans(`x = e^${k} ≈ ${val}`)
                ]
            };
        }

        /* log_b(x) = k → x = b^k */
        const logBaseM = lower.match(/log_?(\d+)\s*\(?\s*x\s*\)?\s*=\s*(-?\d+\.?\d*)/);
        if (logBaseM) {
            const base = parseFloat(logBaseM[1]);
            const k = parseFloat(logBaseM[2]);
            const val = r(Math.pow(base, k), 6);
            return {
                answer: `x = ${val}`,
                steps: [
                    step(1, `Equation: log_${base}(x) = ${k}`),
                    step(2, `By definition of logarithm: x = ${base}^${k}`),
                    step(3, `x = ${val}`),
                    ans(`x = ${val}`)
                ]
            };
        }

        /* Evaluate log_b(n) */
        const logValM = lower.match(/log_?(\d+\.?\d*)\s*\(?(\d+\.?\d*)\)?/);
        if (logValM) {
            const base = parseFloat(logValM[1]);
            const n = parseFloat(logValM[2]);
            const val = r(Math.log(n) / Math.log(base), 6);
            return {
                answer: `log_${base}(${n}) = ${val}`,
                steps: [
                    step(1, `Use change-of-base formula: log_b(n) = ln(n)/ln(b)`),
                    step(2, `= ln(${n}) / ln(${base}) = ${r(Math.log(n),6)} / ${r(Math.log(base),6)}`),
                    step(3, `= ${val}`),
                    ans(`${val}`)
                ]
            };
        }

        /* Evaluate log(n) or ln(n) */
        if (/^log\s*\(?\s*\d/.test(lower) && nums.length > 0) {
            const val = r(Math.log10(nums[0]), 6);
            return {
                answer: `log(${nums[0]}) = ${val}`,
                steps: [step(1, `log₁₀(${nums[0]}) = ${val}`), ans(val)]
            };
        }
        if (/^ln\s*\(?\s*\d/.test(lower) && nums.length > 0) {
            const val = r(Math.log(nums[0]), 6);
            return {
                answer: `ln(${nums[0]}) = ${val}`,
                steps: [step(1, `ln(${nums[0]}) = ${val}`), ans(val)]
            };
        }

        /* e^x = k → x = ln(k) */
        const expEqM = lower.match(/e\^?\s*\(?\s*x\s*\)?\s*=\s*(\d+\.?\d*)/);
        if (expEqM) {
            const k = parseFloat(expEqM[1]);
            const val = r(Math.log(k), 6);
            return {
                answer: `x = ln(${k}) = ${val}`,
                steps: [
                    step(1, `Equation: eˣ = ${k}`),
                    step(2, `Apply natural log to both sides: x = ln(${k})`),
                    step(3, `x = ${val}`),
                    ans(`x = ln(${k}) = ${val}`)
                ]
            };
        }

        /* Logarithm laws simplification */
        if (/expand|simplify|laws/.test(lower)) {
            return {
                answer: "See logarithm laws",
                steps: [
                    rule("log(AB) = log A + log B"),
                    rule("log(A/B) = log A − log B"),
                    rule("log(Aⁿ) = n·log A"),
                    rule("log_b(b) = 1"),
                    rule("log_b(1) = 0"),
                    note("Apply the appropriate law to simplify your expression.")
                ]
            };
        }

        return null;
    }

    /* ══════════════════════════════════════════
       DIFFERENTIATION
    ══════════════════════════════════════════ */
    function differentiate(raw) {
        const q     = raw.toLowerCase().replace(/−/g, "-");
        const steps = [];

        /* Product rule: f(x)·g(x) */
        if (/product rule|\*.*x|x.*\*/.test(q) && !/chain/.test(q)) {
            steps.push(rule("Product rule: d/dx[f·g] = f'g + fg'"));
        }

        /* Chain rule */
        if (/chain rule|\bsin\(.+x\)|\bcos\(.+x\)|e\^/.test(q) && /\d/.test(q)) {
            steps.push(rule("Chain rule: d/dx[f(g(x))] = f'(g(x))·g'(x)"));
        }

        /* Quotient rule */
        if (/quotient rule|\/.*x|divide/.test(q)) {
            steps.push(rule("Quotient rule: d/dx[f/g] = (f'g − fg')/g²"));
        }

        /* Trigonometric */
        if (/\bsin\b|\bcos\b|\btan\b|\bcosec\b|\bcot\b|\bsec\b/.test(q)) {
            const coeff = (q.match(/(-?\d*\.?\d*)\s*\*?\s*(sin|cos|tan|sec|cosec|cot)/)||["","1"])[1];
            const fn    = (q.match(/\b(sin|cos|tan|sec|cosec|cot)\b/)||["","sin"])[1];
            const k     = coeff === "" || coeff === "+" ? 1 : coeff === "-" ? -1 : parseFloat(coeff) || 1;
            const inner = (q.match(/(?:sin|cos|tan|sec|cosec|cot)\(([^)]+)\)/)||[,"x"])[1];

            /* Inner derivative */
            let dInner = "1", innerDisp = inner;
            if (/(\d+)x/.test(inner)) {
                const km = inner.match(/(-?\d*\.?\d*)x/);
                dInner = km ? (km[1] || "1") : "1";
            }

            const derivMap = {
                sin:    `${k * parseFloat(dInner) || k}cos(${inner})`,
                cos:    `${-(k * parseFloat(dInner) || k)}sin(${inner})`,
                tan:    `${k * parseFloat(dInner) || k}sec²(${inner})`,
                sec:    `${k}sec(${inner})tan(${inner})${dInner !== "1" ? "·" + dInner : ""}`,
                cosec:  `${-k}cosec(${inner})cot(${inner})${dInner !== "1" ? "·" + dInner : ""}`,
                cot:    `${-k}cosec²(${inner})${dInner !== "1" ? "·" + dInner : ""}`
            };
            const deriv = derivMap[fn] || "See trig derivatives";

            return {
                answer: deriv,
                steps: [
                    rule(`d/dx(sin u) = cos u · du/dx  |  d/dx(cos u) = −sin u · du/dx  |  d/dx(tan u) = sec²u · du/dx`),
                    step(1, `Identify: outer function = ${fn}(u),  inner = u = ${inner}`),
                    step(2, `d/dx(${inner}) = ${dInner}`),
                    step(3, `Apply chain rule: dy/dx = ${deriv}`),
                    ans(deriv)
                ]
            };
        }

        /* Exponential e^(kx) */
        if (/e\^/.test(q)) {
            const m = raw.match(/([+\-]?\d*\.?\d*)\s*\*?\s*e\^\(?\s*([+\-]?\d*\.?\d*)\s*x\)?/i);
            const a = m ? (parseFloat(m[1]) || 1) : 1;
            const k = m ? (parseFloat(m[2]) || 1) : 1;
            const deriv = `${a * k}e^(${k}x)`;
            return {
                answer: deriv,
                steps: [
                    rule("d/dx(a·e^(kx)) = a·k·e^(kx)"),
                    step(1, `a = ${a},  k = ${k}`),
                    step(2, `dy/dx = ${a} × ${k} × e^(${k}x) = ${a * k}e^(${k}x)`),
                    ans(deriv)
                ]
            };
        }

        /* Natural log ln(x) */
        if (/\bln\b/.test(q)) {
            const m = raw.match(/([+\-]?\d*\.?\d*)\s*\*?\s*ln\(([+\-]?\d*\.?\d*)\s*x\)/i);
            const a = m ? (parseFloat(m[1]) || 1) : 1;
            const k = m ? (parseFloat(m[2]) || 1) : 1;
            const deriv = k === 1 ? `${a}/x` : `${a * k}/(${k}x) = ${a}/x`;
            return {
                answer: `${a}/x`,
                steps: [
                    rule("d/dx(a·ln(kx)) = a/x"),
                    step(1, `a = ${a},  k = ${k}`),
                    step(2, `dy/dx = ${a}·(1/x) = ${a}/x`),
                    ans(`${a}/x`)
                ]
            };
        }

        /* Polynomial — parse term by term */
        const termRx = /([+\-]?\d*\.?\d*)\*?x\^?(\d*\.?\d*)/g;
        const terms  = [];
        let match;
        const rawNoSpaces = raw.replace(/\s/g, "");
        while ((match = termRx.exec(rawNoSpaces)) !== null) {
            const c = match[1] === "" || match[1] === "+" ? 1 :
                      match[1] === "-" ? -1 : parseFloat(match[1]);
            const n = match[2] === "" ? 1 : parseFloat(match[2]);
            if (!isNaN(c) && !isNaN(n)) terms.push({ c, n });
        }

        if (terms.length > 0) {
            const polySteps = [rule("Power rule: d/dx(cxⁿ) = c·n·xⁿ⁻¹")];
            const dTerms = [];
            terms.forEach((t, i) => {
                const nc = t.c * t.n;
                const np = t.n - 1;
                const term = np === 0 ? `${nc}` :
                             np === 1 ? `${nc}x` : `${nc}x^${np}`;
                dTerms.push(term);
                polySteps.push(step(i + 1, `d/dx(${t.c}x^${t.n}) = ${t.c} × ${t.n} × x^${t.n - 1} = <strong>${term}</strong>`));
            });
            const answer = dTerms.join(" + ").replace(/\+ -/g, "− ").replace(/\+\s*0/g,"").trim() || "0";
            polySteps.push(ans(answer));
            return { answer, steps: polySteps };
        }

        /* Constant check */
        const constOnly = raw.match(/^([+\-]?\d+\.?\d*)$/);
        if (constOnly) return { answer: "0", steps: [step(1, "d/dx of a constant = 0"), ans("0")] };

        return { answer: "Please check your expression format.", steps: [note("Try: 3x² + 2x + 1,  sin(2x),  e^(3x),  ln(x)")] };
    }

    /* ══════════════════════════════════════════
       INTEGRATION
    ══════════════════════════════════════════ */
    function integrate(raw) {
        const q = raw.toLowerCase().replace(/−/g, "-");
        const steps = [];

        /* Definite integral: ∫_a^b or between a and b */
        const defM1 = raw.match(/∫[\s_]*([+\-]?\d+\.?\d*)\s*\^\s*([+\-]?\d+\.?\d*)\s*(.*?)\s*d[xt]/i);
        const defM2 = raw.match(/(?:from|between)\s+([+\-]?\d+\.?\d*)\s+(?:to)\s+([+\-]?\d+\.?\d*)/i);
        const defM = defM1 || defM2;

        if (defM) {
            const lo = parseFloat(defM[1]);
            const hi = parseFloat(defM[2]);
            const integrand = defM1 ? defM[3] : raw.replace(/.*to\s+\d+\.?\d*\s*/i, "");

            /* Handle simple polynomials for definite */
            const polyTerms = [];
            const termRx2 = /([+\-]?\d*\.?\d*)\*?x\^?(\d*\.?\d*)/g;
            let m2;
            const cleanInt = integrand.replace(/\s/g, "");
            while ((m2 = termRx2.exec(cleanInt)) !== null) {
                const c = m2[1] === "" || m2[1] === "+" ? 1 : m2[1] === "-" ? -1 : parseFloat(m2[1]);
                const n = m2[2] === "" ? 1 : parseFloat(m2[2]);
                if (!isNaN(c) && !isNaN(n)) polyTerms.push({ c, n });
            }

            if (polyTerms.length > 0) {
                const antideriv = t => (c, n) => {
                    const np = n + 1;
                    return c / np * Math.pow(t, np);
                };
                const F = t => polyTerms.reduce((sum, t2) => sum + t2.c / (t2.n + 1) * Math.pow(t, t2.n + 1), 0);
                const val = r(F(hi) - F(lo), 6);
                const antiStr = polyTerms.map(t => {
                    const nc = r(t.c / (t.n + 1), 4);
                    return `${nc}x^${t.n + 1}`;
                }).join(" + ").replace(/\+ -/g, "− ");

                return {
                    answer: val,
                    steps: [
                        step(1, `Definite integral from ${lo} to ${hi}`),
                        step(2, `Find antiderivative F(x) = ${antiStr}`),
                        step(3, `Apply Fundamental Theorem: F(${hi}) − F(${lo})`),
                        step(4, `F(${hi}) = ${r(F(hi), 6)},  F(${lo}) = ${r(F(lo), 6)}`),
                        step(5, `Result = ${r(F(hi), 6)} − ${r(F(lo), 6)} = ${val}`),
                        ans(val)
                    ]
                };
            }
        }

        /* Trig integrals */
        if (/\bsin\b|\bcos\b|\btan\b/.test(q)) {
            if (/sin/.test(q)) {
                const m = raw.match(/([+\-]?\d*\.?\d*)\*?\s*sin\(([^)]*)\)/i);
                const a = m ? (parseFloat(m[1]) || 1) : 1;
                const inner = m ? m[2] : "x";
                const kM = inner.match(/(-?\d*\.?\d*)x/);
                const k = kM ? (parseFloat(kM[1]) || 1) : 1;
                const coeff = r(-a / k, 6);
                const answer = `${coeff}cos(${inner}) + C`;
                return {
                    answer,
                    steps: [
                        rule("∫sin(kx) dx = −(1/k)cos(kx) + C"),
                        step(1, `a = ${a},  inner = ${inner},  k = ${k}`),
                        step(2, `∫${a}sin(${inner}) dx = ${a} × (−1/${k})cos(${inner}) = ${coeff}cos(${inner})`),
                        step(3, `Add constant of integration: + C`),
                        ans(answer)
                    ]
                };
            }
            if (/cos/.test(q)) {
                const m = raw.match(/([+\-]?\d*\.?\d*)\*?\s*cos\(([^)]*)\)/i);
                const a = m ? (parseFloat(m[1]) || 1) : 1;
                const inner = m ? m[2] : "x";
                const kM = inner.match(/(-?\d*\.?\d*)x/);
                const k = kM ? (parseFloat(kM[1]) || 1) : 1;
                const coeff = r(a / k, 6);
                const answer = `${coeff}sin(${inner}) + C`;
                return {
                    answer,
                    steps: [
                        rule("∫cos(kx) dx = (1/k)sin(kx) + C"),
                        step(1, `a = ${a},  k = ${k}`),
                        step(2, `∫${a}cos(${inner}) dx = ${coeff}sin(${inner})`),
                        step(3, `Add constant: + C`),
                        ans(answer)
                    ]
                };
            }
            if (/tan/.test(q)) {
                const m = raw.match(/([+\-]?\d*\.?\d*)\*?\s*tan\(([^)]*)\)/i);
                const a = m ? (parseFloat(m[1]) || 1) : 1;
                const inner = m ? m[2] : "x";
                const answer = `${a}ln|sec(${inner})| + C`;
                return {
                    answer,
                    steps: [
                        rule("∫tan(u) du = ln|sec(u)| + C"),
                        step(1, `u = ${inner}`),
                        step(2, `∫${a}tan(${inner}) dx = ${a}ln|sec(${inner})| + C`),
                        ans(answer)
                    ]
                };
            }
        }

        /* Exponential */
        if (/e\^/.test(q)) {
            const m = raw.match(/([+\-]?\d*\.?\d*)\*?\s*e\^\(?\s*([+\-]?\d*\.?\d*)\s*x\)?/i);
            const a = m ? (parseFloat(m[1]) || 1) : 1;
            const k = m ? (parseFloat(m[2]) || 1) : 1;
            const coeff = r(a / k, 6);
            const answer = `${coeff}e^(${k}x) + C`;
            return {
                answer,
                steps: [
                    rule("∫a·e^(kx) dx = (a/k)e^(kx) + C"),
                    step(1, `a = ${a},  k = ${k}`),
                    step(2, `Coefficient = a/k = ${a}/${k} = ${coeff}`),
                    step(3, `∫${a}e^(${k}x) dx = ${coeff}e^(${k}x) + C`),
                    ans(answer)
                ]
            };
        }

        /* Natural log */
        if (/\bln\b/.test(q)) {
            return {
                answer: "x·ln(x) − x + C",
                steps: [
                    rule("∫ln(x) dx = x·ln(x) − x + C  (integration by parts)"),
                    step(1, `Let u = ln(x),  dv = dx`),
                    step(2, `Then du = 1/x dx,  v = x`),
                    step(3, `∫ln(x) dx = x·ln(x) − ∫x·(1/x) dx = x·ln(x) − ∫1 dx`),
                    step(4, `= x·ln(x) − x + C`),
                    ans("x·ln(x) − x + C")
                ]
            };
        }

        /* 1/x */
        if (/1\s*\/\s*x/.test(q)) {
            return {
                answer: "ln|x| + C",
                steps: [rule("∫(1/x) dx = ln|x| + C"), ans("ln|x| + C")]
            };
        }

        /* Polynomial */
        const termRx = /([+\-]?\d*\.?\d*)\*?x\^?(\d*\.?\d*)/g;
        const iTerms = [];
        let match3;
        const cleanQ = raw.replace(/\s/g, "");
        while ((match3 = termRx.exec(cleanQ)) !== null) {
            const c = match3[1] === "" || match3[1] === "+" ? 1 :
                      match3[1] === "-" ? -1 : parseFloat(match3[1]);
            const n = match3[2] === "" ? 1 : parseFloat(match3[2]);
            if (!isNaN(c) && !isNaN(n)) iTerms.push({ c, n });
        }
        /* Constants */
        const constTerms = raw.replace(/\s/g,"").replace(/[+\-]?\d*\.?\d*\*?x\^?\d*\.?\d*/g,"");
        const constM = [...constTerms.matchAll(/([+\-]?\d+\.?\d*)/g)];

        if (iTerms.length > 0 || constM.length > 0) {
            const polySteps = [rule("∫cxⁿ dx = (c/(n+1))x^(n+1) + C")];
            const intTerms = [];
            iTerms.forEach((t, i) => {
                const np = t.n + 1;
                const nc = r(t.c / np, 4);
                intTerms.push(`${nc}x^${np}`);
                polySteps.push(step(i + 1, `∫${t.c}x^${t.n} dx = (${t.c}/${np})x^${np} = <strong>${nc}x^${np}</strong>`));
            });
            constM.forEach(m => {
                const c = parseFloat(m[1]);
                intTerms.push(`${c}x`);
                polySteps.push(step(iTerms.length + 1, `∫${c} dx = <strong>${c}x</strong>`));
            });
            const answer = (intTerms.join(" + ").replace(/\+ -/g, "− ") || "0") + " + C";
            polySteps.push(ans(answer));
            return { answer, steps: polySteps };
        }

        return { answer: "Please check your expression format.", steps: [note("Try: ∫3x² + 2x dx,  ∫sin(2x) dx,  ∫e^(3x) dx")] };
    }

    /* ══════════════════════════════════════════
       LIMITS
    ══════════════════════════════════════════ */
    function solveLimit(q) {
        const ptM = q.match(/x\s*[→\->]+\s*([+\-]?\d+\.?\d*|∞|inf|infinity)/i);
        const pt = ptM ? ptM[1] : null;
        const inf = pt && /∞|inf/i.test(pt);
        const a = pt && !inf ? parseFloat(pt) : null;

        const steps = [];

        if (inf) {
            /* Degree comparison */
            if (/x\^(\d+).*\/.*x\^(\d+)/.test(q)) {
                const m = q.match(/x\^(\d+).*\/.*x\^(\d+)/);
                const n1 = parseInt(m[1]), n2 = parseInt(m[2]);
                let ans2;
                if (n1 === n2) ans2 = "Leading coefficient ratio";
                else if (n1 > n2) ans2 = n1 > 0 ? "∞ (or −∞)" : "0";
                else ans2 = "0";
                return {
                    answer: ans2,
                    steps: [
                        step(1, "As x→∞, compare degrees of numerator and denominator"),
                        step(2, `Numerator degree: ${n1},  Denominator degree: ${n2}`),
                        step(3, n1 === n2 ? "Equal degrees → ratio of leading coefficients" :
                                n1 > n2   ? "Numerator grows faster → limit is ±∞" :
                                            "Denominator grows faster → limit is 0"),
                        ans(ans2)
                    ]
                };
            }
            return {
                answer: "Depends on expression",
                steps: [
                    step(1, "Divide all terms by the highest power of x"),
                    step(2, "Terms with x in denominator → 0 as x→∞"),
                    step(3, "Evaluate remaining constants"),
                    note("Please provide a specific rational expression for a numeric answer.")
                ]
            };
        }

        if (a !== null) {
            steps.push(step(1, `Try direct substitution: x = ${a}`));

            /* 0/0 indeterminate form: (x^2 - a^2)/(x - a) = x + a */
            if (/x[\^²]?2?\s*[-−]\s*(\d+\.?\d*).*\/.*x\s*[-−]\s*(\d+\.?\d*)/.test(q)) {
                const factorN = r(2 * a, 4);
                steps.push(step(2, `Direct substitution gives 0/0 — indeterminate form. Factor numerator.`));
                steps.push(step(3, `x² − ${a*a} = (x − ${a})(x + ${a})`));
                steps.push(step(4, `Cancel (x − ${a}) from numerator and denominator`));
                steps.push(step(5, `lim = (x + ${a}) as x→${a} = ${a} + ${a} = ${factorN}`));
                steps.push(ans(factorN));
                return { answer: factorN, steps };
            }

            /* L'Hôpital trigger */
            if (/sin\s*\(\s*x\s*\)\s*\/\s*x|x\s*\/\s*sin/.test(q) && a === 0) {
                steps.push(step(2, "lim(x→0) sin(x)/x is a standard result"));
                steps.push(step(3, "Using L'Hôpital's Rule: d(sin x)/dx = cos x,  d(x)/dx = 1"));
                steps.push(step(4, "lim(x→0) cos(x)/1 = cos(0) = 1"));
                steps.push(ans("1"));
                return { answer: "1", steps };
            }

            steps.push(step(2, `Substitute x = ${a} directly if no 0/0 or ∞/∞ form`));
            steps.push(note(`If 0/0: try factoring or L'Hôpital's Rule (differentiate numerator and denominator separately).`));
            steps.push(note("If still indeterminate, check one-sided limits."));
            return { answer: `Substitute x = ${a} (check for 0/0)`, steps };
        }

        return {
            answer: "Specify limit point",
            steps: [note("Write as: lim x→2 (x²−4)/(x−2)  or  lim x→∞ (3x²+1)/(x²−2)")]
        };
    }

    /* ══════════════════════════════════════════
       SEQUENCES & SERIES
    ══════════════════════════════════════════ */
    function solveSequence(q) {
        const nums = (q.match(/-?\d+\.?\d*/g) || []).map(Number);
        const lower = q.toLowerCase();

        /* Arithmetic Sequence */
        if (/arithmetic|ap\b/.test(lower) || (nums.length >= 3 && (() => {
            const diffs = nums.slice(1).map((v, i) => v - nums[i]);
            return diffs.every(d => Math.abs(d - diffs[0]) < 1e-9);
        })())) {
            if (nums.length < 2) return null;
            const a = nums[0], d = nums[1] - nums[0], n = nums[2] || 10;
            const nthTerm = r(a + (n - 1) * d, 6);
            const sumN = r(n / 2 * (2 * a + (n - 1) * d), 6);
            return {
                answer: `nth term = ${a} + (n−1)×${d};  a_${n} = ${nthTerm};  S_${n} = ${sumN}`,
                steps: [
                    step(1, `Identify: first term a₁ = ${a},  common difference d = ${d}`),
                    step(2, `Formula for nth term: aₙ = a + (n−1)d`),
                    step(3, `a_${n} = ${a} + (${n}−1)×${d} = ${a} + ${(n-1)*d} = <strong>${nthTerm}</strong>`),
                    step(4, `Sum of first n terms: Sₙ = n/2·(2a + (n−1)d)`),
                    step(5, `S_${n} = ${n}/2·(2×${a} + (${n}−1)×${d}) = ${n}/2·${r(2*a+(n-1)*d,4)} = <strong>${sumN}</strong>`),
                    ans(`a_${n} = ${nthTerm},  S_${n} = ${sumN}`)
                ]
            };
        }

        /* Geometric Sequence */
        if (/geometric|gp\b/.test(lower) || (nums.length >= 3 && (() => {
            const ratios = nums.slice(1).map((v, i) => nums[i] !== 0 ? v / nums[i] : NaN);
            return ratios.every(r2 => Math.abs(r2 - ratios[0]) < 1e-9);
        })())) {
            if (nums.length < 2) return null;
            const a = nums[0], rr = nums.length > 1 ? nums[1] / nums[0] : nums[1], n = nums[2] || 10;
            const nthTerm = r(a * Math.pow(rr, n - 1), 6);
            const sumN = Math.abs(rr) !== 1 ? r(a * (1 - Math.pow(rr, n)) / (1 - rr), 6) : r(a * n, 6);
            const converges = Math.abs(rr) < 1;
            const sumInf = converges ? r(a / (1 - rr), 6) : "∞ (diverges)";
            return {
                answer: `a_${n} = ${nthTerm};  S_${n} = ${sumN}${converges ? ";  S∞ = " + sumInf : ""}`,
                steps: [
                    step(1, `Identify: first term a = ${a},  common ratio r = ${r(rr, 4)}`),
                    step(2, `nth term formula: aₙ = a·rⁿ⁻¹`),
                    step(3, `a_${n} = ${a} × ${r(rr,4)}^${n-1} = <strong>${nthTerm}</strong>`),
                    step(4, `Sum formula: Sₙ = a(1−rⁿ)/(1−r)  [when r ≠ 1]`),
                    step(5, `S_${n} = ${a}(1 − ${r(rr,4)}^${n})/(1 − ${r(rr,4)}) = <strong>${sumN}</strong>`),
                    converges ? step(6, `|r| < 1 → series converges. S∞ = a/(1−r) = ${a}/(1−${r(rr,4)}) = <strong>${sumInf}</strong>`) :
                                step(6, `|r| ≥ 1 → series diverges (S∞ = ∞)`),
                    ans(`a_${n} = ${nthTerm},  S_${n} = ${sumN}`)
                ]
            };
        }

        /* Fibonacci */
        if (/fibonacci/.test(lower)) {
            const fib = [1, 1];
            for (let i = 2; i < 15; i++) fib.push(fib[i-1] + fib[i-2]);
            return {
                answer: fib.slice(0, 12).join(", ") + "...",
                steps: [
                    step(1, "Fibonacci: each term = sum of two preceding terms"),
                    step(2, "F(1)=1, F(2)=1, F(n) = F(n−1) + F(n−2)"),
                    step(3, `First 12 terms: ${fib.slice(0,12).join(", ")}`),
                    ans(fib.slice(0, 12).join(", ") + "...")
                ]
            };
        }

        return null;
    }

    /* ══════════════════════════════════════════
       MATRICES
    ══════════════════════════════════════════ */
    function solveMatrix(q) {
        const lower = q.toLowerCase();

        /* Extract all 2×2 matrices */
        const allM = [...q.matchAll(/\[\s*\[?\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\]?\s*,?\s*\[?\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\]?\s*\]/g)];

        if (allM.length === 0) {
            return {
                answer: "Write matrices as [[a,b],[c,d]]",
                steps: [
                    note("Format: [[1,2],[3,4]]"),
                    note("Operations: determinant, inverse, multiply, transpose, eigenvalues, rank")
                ]
            };
        }

        const M1 = allM[0].slice(1).map(Number);
        const [a, b, cc, d] = M1;
        const det1 = a * d - b * cc;

        /* Determinant */
        if (/det|determinant/.test(lower)) {
            return {
                answer: `det = ${det1}`,
                steps: [
                    rule("det([[a,b],[c,d]]) = ad − bc"),
                    step(1, `Matrix: [[${a}, ${b}], [${cc}, ${d}]]`),
                    step(2, `det = (${a})(${d}) − (${b})(${cc}) = ${a*d} − ${b*cc} = <strong>${det1}</strong>`),
                    step(3, det1 !== 0 ? "det ≠ 0 → Matrix is invertible (non-singular)" : "det = 0 → Matrix is singular (no inverse)"),
                    ans(`det = ${det1}`)
                ]
            };
        }

        /* Inverse */
        if (/inver/.test(lower)) {
            if (det1 === 0) return { answer: "No inverse (singular matrix)", steps: [step(1, `det = ${det1} = 0 → matrix has no inverse`), ans("No inverse")] };
            const inv = [[r(d/det1,4), r(-b/det1,4)], [r(-cc/det1,4), r(a/det1,4)]];
            return {
                answer: `[[${inv[0][0]}, ${inv[0][1]}], [${inv[1][0]}, ${inv[1][1]}]]`,
                steps: [
                    rule("A⁻¹ = (1/det) × [[d, −b], [−c, a]]"),
                    step(1, `det = ${det1}`),
                    step(2, `Adjugate: [[${d}, ${-b}], [${-cc}, ${a}]]`),
                    step(3, `A⁻¹ = (1/${det1}) × [[${d}, ${-b}], [${-cc}, ${a}]]`),
                    step(4, `A⁻¹ = [[${inv[0][0]}, ${inv[0][1]}], [${inv[1][0]}, ${inv[1][1]}]]`),
                    ans(`[[${inv[0][0]}, ${inv[0][1]}], [${inv[1][0]}, ${inv[1][1]}]]`)
                ]
            };
        }

        /* Transpose */
        if (/transp/.test(lower)) {
            return {
                answer: `[[${a}, ${cc}], [${b}, ${d}]]`,
                steps: [
                    rule("Transpose: rows ↔ columns"),
                    step(1, `Original: [[${a}, ${b}], [${cc}, ${d}]]`),
                    step(2, `Transposed Aᵀ = [[${a}, ${cc}], [${b}, ${d}]]`),
                    ans(`[[${a}, ${cc}], [${b}, ${d}]]`)
                ]
            };
        }

        /* Eigenvalues */
        if (/eigen/.test(lower)) {
            /* λ² − (a+d)λ + det = 0 */
            const tr = a + d;
            const D = tr * tr - 4 * det1;
            let ansText;
            const stepList = [
                rule("Characteristic equation: det(A − λI) = 0 → λ² − tr(A)λ + det(A) = 0"),
                step(1, `tr(A) = a + d = ${a} + ${d} = ${tr}`),
                step(2, `det(A) = ${det1}`),
                step(3, `Characteristic equation: λ² − ${tr}λ + ${det1} = 0`),
                step(4, `Discriminant: Δ = ${tr}² − 4×${det1} = ${D}`)
            ];
            if (D >= 0) {
                const l1 = r((tr + Math.sqrt(D)) / 2, 4), l2 = r((tr - Math.sqrt(D)) / 2, 4);
                stepList.push(step(5, `λ₁ = (${tr} + ${r(Math.sqrt(D),4)}) / 2 = <strong>${l1}</strong>`));
                stepList.push(step(6, `λ₂ = (${tr} − ${r(Math.sqrt(D),4)}) / 2 = <strong>${l2}</strong>`));
                ansText = `λ₁ = ${l1},  λ₂ = ${l2}`;
            } else {
                const re = r(tr / 2, 4), im = r(Math.sqrt(-D) / 2, 4);
                stepList.push(step(5, `Δ < 0 → complex eigenvalues`));
                ansText = `λ = ${re} ± ${im}i`;
                stepList.push(step(6, `λ = ${re} ± ${im}i`));
            }
            stepList.push(ans(ansText));
            return { answer: ansText, steps: stepList };
        }

        /* Matrix multiplication */
        if (allM.length >= 2 && /multi|product|\*/.test(lower)) {
            const M2 = allM[1].slice(1).map(Number);
            const [e, f, g, h] = M2;
            const P = [a*e+b*g, a*f+b*h, cc*e+d*g, cc*f+d*h];
            return {
                answer: `[[${P[0]}, ${P[1]}], [${P[2]}, ${P[3]}]]`,
                steps: [
                    rule("(AB)ᵢⱼ = row i of A · column j of B"),
                    step(1, `A = [[${a}, ${b}], [${cc}, ${d}}]`),
                    step(2, `B = [[${e}, ${f}], [${g}, ${h}]]`),
                    step(3, `C₁₁ = ${a}×${e} + ${b}×${g} = ${a*e} + ${b*g} = <strong>${P[0]}</strong>`),
                    step(4, `C₁₂ = ${a}×${f} + ${b}×${h} = ${a*f} + ${b*h} = <strong>${P[1]}</strong>`),
                    step(5, `C₂₁ = ${cc}×${e} + ${d}×${g} = ${cc*e} + ${d*g} = <strong>${P[2]}</strong>`),
                    step(6, `C₂₂ = ${cc}×${f} + ${d}×${h} = ${cc*f} + ${d*h} = <strong>${P[3]}</strong>`),
                    ans(`[[${P[0]}, ${P[1]}], [${P[2]}, ${P[3]}]]`)
                ]
            };
        }

        /* Addition / subtraction */
        if (allM.length >= 2 && /add|sum|\+/.test(lower)) {
            const M2 = allM[1].slice(1).map(Number);
            const [e, f, g, h] = M2;
            return { answer: `[[${a+e}, ${b+f}], [${cc+g}, ${d+h}]]`, steps: [
                rule("Matrix addition: add corresponding elements"),
                step(1, `A + B = [[${a}+${e}, ${b}+${f}], [${cc}+${g}, ${d}+${h}]]`),
                ans(`[[${a+e}, ${b+f}], [${cc+g}, ${d+h}]]`)
            ]};
        }

        /* Default: show properties */
        return {
            answer: `det = ${det1};  trace = ${a+d}`,
            steps: [
                step(1, `Matrix: [[${a}, ${b}], [${cc}, ${d}]]`),
                step(2, `Determinant = ${a*d} − ${b*cc} = <strong>${det1}</strong>`),
                step(3, `Trace (sum of diagonal) = ${a} + ${d} = <strong>${a+d}</strong>`),
                step(4, det1 !== 0 ? "Invertible (det ≠ 0)" : "Singular (det = 0, not invertible)"),
                ans(`det = ${det1},  trace = ${a+d}`)
            ]
        };
    }

    /* ══════════════════════════════════════════
       VECTORS
    ══════════════════════════════════════════ */
    function solveVector(q) {
        const lower = q.toLowerCase();
        const vecs = [...q.matchAll(/\(\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)(?:\s*,\s*(-?\d+\.?\d*))?\s*\)/g)];

        if (vecs.length === 0) return {
            answer: "Write vectors as (x,y) or (x,y,z)",
            steps: [note("Example: magnitude of (3,4,0)  or  dot product of (1,2,3) and (4,5,6)")]
        };

        const v1 = vecs[0].slice(1).map(Number).filter(n => !isNaN(n));
        const v2 = vecs[1] ? vecs[1].slice(1).map(Number).filter(n => !isNaN(n)) : [];
        const dim = v1.length;

        /* Magnitude */
        if (/magnitude|length|norm|\|v\|/.test(lower)) {
            const mag = Math.sqrt(v1.reduce((s, c) => s + c * c, 0));
            return {
                answer: `|v| = ${r(mag, 6)}`,
                steps: [
                    rule("|v| = √(v₁² + v₂² + ... + vₙ²)"),
                    step(1, `v = (${v1.join(", ")})`),
                    step(2, `|v|² = ${v1.map(c => `${c}²`).join(" + ")} = ${v1.reduce((s,c)=>s+c*c,0)}`),
                    step(3, `|v| = √${v1.reduce((s,c)=>s+c*c,0)} = <strong>${r(mag,6)}</strong>`),
                    ans(`${r(mag, 6)}`)
                ]
            };
        }

        /* Unit vector */
        if (/unit/.test(lower)) {
            const mag = Math.sqrt(v1.reduce((s, c) => s + c * c, 0));
            const u = v1.map(c => r(c / mag, 4));
            return {
                answer: `û = (${u.join(", ")})`,
                steps: [
                    rule("û = v / |v|"),
                    step(1, `|v| = ${r(mag,4)}`),
                    step(2, `û = (${v1.join(", ")}) / ${r(mag,4)}`),
                    step(3, `û = (${u.join(", ")})`),
                    ans(`(${u.join(", ")})`)
                ]
            };
        }

        /* Dot product */
        if (/dot|scalar product/.test(lower) && v2.length) {
            const dot = v1.reduce((s, c, i) => s + c * (v2[i] || 0), 0);
            return {
                answer: `a·b = ${dot}`,
                steps: [
                    rule("a·b = a₁b₁ + a₂b₂ + a₃b₃"),
                    step(1, `a = (${v1.join(", ")}),  b = (${v2.join(", ")})`),
                    step(2, `a·b = ${v1.map((c,i) => `${c}×${v2[i]||0}`).join(" + ")} = ${dot}`),
                    ans(`${dot}`)
                ]
            };
        }

        /* Cross product (3D only) */
        if (/cross/.test(lower) && v2.length && dim === 3) {
            const [a1,a2,a3] = v1, [b1,b2,b3] = v2;
            const cx = a2*b3 - a3*b2;
            const cy = a3*b1 - a1*b3;
            const cz = a1*b2 - a2*b1;
            return {
                answer: `(${cx}, ${cy}, ${cz})`,
                steps: [
                    rule("a×b = (a₂b₃−a₃b₂, a₃b₁−a₁b₃, a₁b₂−a₂b₁)"),
                    step(1, `i-component: ${a2}×${b3} − ${a3}×${b2} = ${a2*b3}−${a3*b2} = <strong>${cx}</strong>`),
                    step(2, `j-component: ${a3}×${b1} − ${a1}×${b3} = ${a3*b1}−${a1*b3} = <strong>${cy}</strong>`),
                    step(3, `k-component: ${a1}×${b2} − ${a2}×${b1} = ${a1*b2}−${a2*b1} = <strong>${cz}</strong>`),
                    ans(`(${cx}, ${cy}, ${cz})`)
                ]
            };
        }

        /* Angle between vectors */
        if (/angle/.test(lower) && v2.length) {
            const dot = v1.reduce((s,c,i) => s + c*(v2[i]||0), 0);
            const m1 = Math.sqrt(v1.reduce((s,c)=>s+c*c,0));
            const m2v = Math.sqrt(v2.reduce((s,c)=>s+c*c,0));
            const cosA = dot / (m1 * m2v);
            const angle = r(toDeg(Math.acos(Math.min(1, Math.max(-1, cosA)))), 4);
            return {
                answer: `θ = ${angle}°`,
                steps: [
                    rule("cos θ = (a·b) / (|a||b|)"),
                    step(1, `a·b = ${dot}`),
                    step(2, `|a| = ${r(m1,4)},  |b| = ${r(m2v,4)}`),
                    step(3, `cos θ = ${dot} / (${r(m1,4)}×${r(m2v,4)}) = ${r(cosA,6)}`),
                    step(4, `θ = arccos(${r(cosA,6)}) = <strong>${angle}°</strong>`),
                    ans(`${angle}°`)
                ]
            };
        }

        /* Perpendicular check */
        if (/perpen|orthog/.test(lower) && v2.length) {
            const dot = v1.reduce((s,c,i)=>s+c*(v2[i]||0),0);
            const isPerpendicular = Math.abs(dot) < 1e-10;
            return {
                answer: isPerpendicular ? "Yes — perpendicular" : "No — not perpendicular",
                steps: [
                    rule("Vectors are perpendicular iff a·b = 0"),
                    step(1, `a·b = ${v1.map((c,i)=>`${c}×${v2[i]||0}`).join(" + ")} = ${dot}`),
                    step(2, isPerpendicular ? "dot product = 0 ✓ → perpendicular" : `dot product = ${dot} ≠ 0 → not perpendicular`),
                    ans(isPerpendicular ? "Perpendicular" : "Not perpendicular")
                ]
            };
        }

        /* Parallel check */
        if (/parallel/.test(lower) && v2.length) {
            const ratios = v1.map((c,i) => v2[i] !== 0 ? c/v2[i] : (c === 0 ? 0 : Infinity));
            const isParallel = ratios.every(r2 => Math.abs(r2 - ratios[0]) < 1e-10);
            return {
                answer: isParallel ? "Yes — parallel" : "No — not parallel",
                steps: [
                    rule("Parallel if a = k·b for some scalar k"),
                    step(1, `Component ratios: ${ratios.map(r2=>r(r2,4)).join(", ")}`),
                    step(2, isParallel ? `All ratios equal → parallel (k = ${r(ratios[0],4)})` : "Ratios differ → not parallel"),
                    ans(isParallel ? `Parallel (k = ${r(ratios[0],4)})` : "Not parallel")
                ]
            };
        }

        /* Vector addition */
        if (/add|sum|\+/.test(lower) && v2.length) {
            const sum = v1.map((c,i) => c + (v2[i]||0));
            return {
                answer: `(${sum.join(", ")})`,
                steps: [
                    step(1, `a + b = (${v1.join(", ")}) + (${v2.join(", ")})`),
                    step(2, `= (${v1.map((c,i)=>`${c}+${v2[i]||0}`).join(", ")}) = (${sum.join(", ")})`),
                    ans(`(${sum.join(", ")})`)
                ]
            };
        }

        /* Default: magnitude */
        const mag = Math.sqrt(v1.reduce((s,c)=>s+c*c,0));
        return {
            answer: `|v| = ${r(mag,6)}`,
            steps: [
                step(1, `v = (${v1.join(", ")})`),
                step(2, `|v| = √(${v1.map(c=>`${c}²`).join("+")}) = ${r(mag,6)}`),
                note("Specify: magnitude, unit vector, dot product, cross product, angle, add, subtract"),
                ans(r(mag,6))
            ]
        };
    }

    /* ══════════════════════════════════════════
       TRIGONOMETRY
    ══════════════════════════════════════════ */
    function solveTrig(q) {
        const lower = q.toLowerCase().replace(/−/g,"-");
        const nums = (q.match(/-?\d+\.?\d*/g)||[]).map(Number);

        /* Evaluate trig functions */
        if (nums.length > 0 && /sin|cos|tan|sec|cosec|cot/.test(lower)) {
            const angle = nums[0];
            const rad = toRad(angle);
            const exact = { 0:[0,"1",0], 30:[0.5,"√3/2","√3/3"], 45:["√2/2","√2/2","1"], 60:["√3/2","1/2","√3"], 90:["1","0","∞"], 180:["0","-1","0"], 270:["-1","0","∞"], 360:["0","1","0"] };

            if (/sin/.test(lower)) {
                const val = r(Math.sin(rad),6);
                const exactVal = exact[angle] ? exact[angle][0] : null;
                return {
                    answer: `sin(${angle}°) = ${val}`,
                    steps: [
                        step(1, `Convert ${angle}° to radians: ${angle} × π/180 = ${r(rad,4)} rad`),
                        step(2, `sin(${angle}°) = ${val}`),
                        exactVal !== null ? note(`Exact value: sin(${angle}°) = ${exactVal}`) : "",
                        ans(val)
                    ].filter(Boolean)
                };
            }
            if (/cos/.test(lower)) {
                const val = r(Math.cos(rad),6);
                return { answer: `cos(${angle}°) = ${val}`,
                    steps: [step(1,`cos(${angle}°) = ${val}`), ans(val)] };
            }
            if (/\btan\b/.test(lower)) {
                const val = r(Math.tan(rad),6);
                return { answer: `tan(${angle}°) = ${val}`,
                    steps: [step(1,`tan(${angle}°) = ${val}`), ans(val)] };
            }
            if (/sec/.test(lower)) {
                const val = r(1/Math.cos(rad),6);
                return { answer: `sec(${angle}°) = ${val}`,
                    steps: [rule("sec θ = 1/cos θ"), step(1,`1/cos(${angle}°) = ${val}`), ans(val)] };
            }
            if (/cosec|csc/.test(lower)) {
                const val = r(1/Math.sin(rad),6);
                return { answer: `cosec(${angle}°) = ${val}`,
                    steps: [rule("cosec θ = 1/sin θ"), step(1,`1/sin(${angle}°) = ${val}`), ans(val)] };
            }
            if (/\bcot\b/.test(lower)) {
                const val = r(1/Math.tan(rad),6);
                return { answer: `cot(${angle}°) = ${val}`,
                    steps: [rule("cot θ = cos θ/sin θ"), step(1,`1/tan(${angle}°) = ${val}`), ans(val)] };
            }
        }

        /* Solve trig equations: sin(x) = k, cos(x) = k, tan(x) = k */
        const sinM = lower.match(/sin\s*\(?\s*x\s*\)?\s*=\s*(-?\d*\.?\d+)/);
        const cosM = lower.match(/cos\s*\(?\s*x\s*\)?\s*=\s*(-?\d*\.?\d+)/);
        const tanM = lower.match(/tan\s*\(?\s*x\s*\)?\s*=\s*(-?\d*\.?\d+)/);

        if (sinM) {
            const k = parseFloat(sinM[1]);
            if (Math.abs(k) > 1) return { answer: "No real solution (|sin x| ≤ 1)", steps: [note("sin x can only take values in [−1, 1]")] };
            const p = r(toDeg(Math.asin(k)),4);
            const q2 = r(180 - parseFloat(p),4);
            return {
                answer: `x = ${p}° + 360°n  or  x = ${q2}° + 360°n`,
                steps: [
                    step(1, `sin(x) = ${k} — take arcsin`),
                    step(2, `Principal value: x = arcsin(${k}) = ${p}°`),
                    step(3, `Second solution in [0°, 360°]: x = 180° − ${p}° = ${q2}°`),
                    step(4, `General solution: x = ${p}° + 360°n  or  x = ${q2}° + 360°n  (n ∈ ℤ)`),
                    ans(`x = ${p}° + 360°n  or  x = ${q2}° + 360°n`)
                ]
            };
        }

        if (cosM) {
            const k = parseFloat(cosM[1]);
            if (Math.abs(k) > 1) return { answer: "No real solution (|cos x| ≤ 1)", steps: [] };
            const p = r(toDeg(Math.acos(k)),4);
            const q2 = r(360 - parseFloat(p),4);
            return {
                answer: `x = ±${p}° + 360°n`,
                steps: [
                    step(1, `cos(x) = ${k} — take arccos`),
                    step(2, `x = arccos(${k}) = ${p}°`),
                    step(3, `Second solution: x = 360° − ${p}° = ${q2}°`),
                    step(4, `General: x = ${p}° + 360°n  or  x = ${q2}° + 360°n`),
                    ans(`x = ±${p}° + 360°n`)
                ]
            };
        }

        if (tanM) {
            const k = parseFloat(tanM[1]);
            const p = r(toDeg(Math.atan(k)),4);
            return {
                answer: `x = ${p}° + 180°n`,
                steps: [
                    step(1, `tan(x) = ${k}`),
                    step(2, `x = arctan(${k}) = ${p}°`),
                    step(3, `Period of tan is 180°`),
                    step(4, `General solution: x = ${p}° + 180°n  (n ∈ ℤ)`),
                    ans(`x = ${p}° + 180°n`)
                ]
            };
        }

        /* Cosine rule */
        if (/cosine rule|law of cos/i.test(q) && nums.length >= 3) {
            const [a, b, C] = nums;
            const c2 = a*a + b*b - 2*a*b*Math.cos(toRad(C));
            const c = r(Math.sqrt(c2), 4);
            return {
                answer: `c = ${c}`,
                steps: [
                    rule("c² = a² + b² − 2ab·cos(C)"),
                    step(1, `a = ${a}, b = ${b}, C = ${C}°`),
                    step(2, `c² = ${a}² + ${b}² − 2×${a}×${b}×cos(${C}°)`),
                    step(3, `c² = ${a*a} + ${b*b} − ${r(2*a*b*Math.cos(toRad(C)),4)} = ${r(c2,4)}`),
                    step(4, `c = √${r(c2,4)} = <strong>${c}</strong>`),
                    ans(`c = ${c}`)
                ]
            };
        }

        /* Sine rule */
        if (/sine rule|law of sin/i.test(q) && nums.length >= 3) {
            const [a, A, b] = nums;
            const sinB = b * Math.sin(toRad(A)) / a;
            if (Math.abs(sinB) > 1) return { answer: "No triangle possible", steps: [note("sin B > 1 — no valid triangle")] };
            const B = r(toDeg(Math.asin(sinB)), 4);
            return {
                answer: `B = ${B}°`,
                steps: [
                    rule("a/sin A = b/sin B"),
                    step(1, `sin B = b·sin A / a = ${b}×sin(${A}°)/${a}`),
                    step(2, `sin B = ${r(sinB,6)}`),
                    step(3, `B = arcsin(${r(sinB,6)}) = <strong>${B}°</strong>`),
                    ans(`B = ${B}°`)
                ]
            };
        }

        /* Pythagorean theorem */
        if (/pythagoras|hypotenuse/.test(lower) && nums.length >= 2) {
            const [a, b] = nums;
            const c = r(Math.sqrt(a*a + b*b), 4);
            return {
                answer: `c = ${c}`,
                steps: [
                    rule("c² = a² + b²"),
                    step(1, `a = ${a}, b = ${b}`),
                    step(2, `c² = ${a}² + ${b}² = ${a*a} + ${b*b} = ${a*a+b*b}`),
                    step(3, `c = √${a*a+b*b} = <strong>${c}</strong>`),
                    ans(`c = ${c}`)
                ]
            };
        }

        /* Trig identities */
        if (/identit|prove/.test(lower)) {
            return {
                answer: "Key trig identities",
                steps: [
                    rule("sin²θ + cos²θ = 1"),
                    rule("1 + tan²θ = sec²θ"),
                    rule("1 + cot²θ = cosec²θ"),
                    rule("sin(A±B) = sinA·cosB ± cosA·sinB"),
                    rule("cos(A±B) = cosA·cosB ∓ sinA·sinB"),
                    rule("tan(A+B) = (tanA + tanB)/(1 − tanA·tanB)"),
                    rule("sin(2A) = 2sinA·cosA"),
                    rule("cos(2A) = cos²A − sin²A = 1 − 2sin²A = 2cos²A − 1")
                ]
            };
        }

        return { answer: "Specify angle or equation", steps: [note("Examples: sin(30°),  cos(x)=0.5,  cosine rule,  sine rule,  Pythagorean theorem")] };
    }

    /* ══════════════════════════════════════════
       GEOMETRY
    ══════════════════════════════════════════ */
    function solveGeometry(q) {
        const lower = q.toLowerCase();
        const nums = (q.match(/-?\d+\.?\d*/g)||[]).map(Number);

        const geo = [
            [/circle.*area|area.*circle/,        () => { const A=r(PI*nums[0]**2,6); return { f:"A = πr²", s:[`r = ${nums[0]}`, `A = π × ${nums[0]}² = ${A} units²`], a:`${A} units²  (= ${r(nums[0]**2,4)}π)` }; }],
            [/semicircle.*area|area.*semicircle/, () => { const A=r(PI*nums[0]**2/2,6); return { f:"A = πr²/2", s:[`r = ${nums[0]}`, `A = π × ${nums[0]}² / 2 = ${A}`], a:`${A} units²` }; }],
            [/triangle.*area|area.*triangle/,     () => { const A=r(.5*nums[0]*nums[1],6); return { f:"A = ½ × base × height", s:[`b = ${nums[0]}, h = ${nums[1]}`, `A = ½ × ${nums[0]} × ${nums[1]} = ${A}`], a:`${A} units²` }; }],
            [/rectangle.*area|area.*rect|area.*square/, () => { const A=r(nums[0]*nums[1],6); return { f:"A = l × w", s:[`l = ${nums[0]}, w = ${nums[1]}`, `A = ${nums[0]} × ${nums[1]} = ${A}`], a:`${A} units²` }; }],
            [/trapez.*area|area.*trapez/,         () => { const A=r(.5*(nums[0]+nums[1])*nums[2],6); return { f:"A = ½(a + b) × h", s:[`a=${nums[0]}, b=${nums[1]}, h=${nums[2]}`, `A = ½(${nums[0]}+${nums[1]})×${nums[2]} = ${A}`], a:`${A} units²` }; }],
            [/parallelogram.*area|area.*parallelogram/, () => { const A=r(nums[0]*nums[1],6); return { f:"A = base × height", s:[`b=${nums[0]}, h=${nums[1]}`, `A = ${A}`], a:`${A} units²` }; }],
            [/circumference|perimeter.*circle/,   () => { const C=r(2*PI*nums[0],6); return { f:"C = 2πr", s:[`r = ${nums[0]}`, `C = 2π × ${nums[0]} = ${C}`], a:`${C} units  (= ${r(2*nums[0],4)}π)` }; }],
            [/perimeter.*rectangle|rectangle.*perim/, () => { const P=r(2*(nums[0]+nums[1]),4); return { f:"P = 2(l + w)", s:[`l=${nums[0]}, w=${nums[1]}`, `P = 2(${nums[0]}+${nums[1]}) = ${P}`], a:`${P} units` }; }],
            [/perimeter.*triangle|triangle.*perim/, () => { const P=r(nums[0]+nums[1]+nums[2],4); return { f:"P = a + b + c", s:[`sides: ${nums[0]}, ${nums[1]}, ${nums[2]}`, `P = ${P}`], a:`${P} units` }; }],
            [/surface.*sphere/,                   () => { const A=r(4*PI*nums[0]**2,6); return { f:"SA = 4πr²", s:[`r = ${nums[0]}`, `SA = 4π × ${nums[0]}² = ${A}`], a:`${A} units²` }; }],
            [/surface.*cylinder/,                 () => { const A=r(2*PI*nums[0]*(nums[0]+nums[1]),6); return { f:"SA = 2πr(r + h)", s:[`r=${nums[0]}, h=${nums[1]}`, `SA = 2π×${nums[0]}×(${nums[0]}+${nums[1]}) = ${A}`], a:`${A} units²` }; }],
            [/surface.*cube/,                     () => { const A=r(6*nums[0]**2,4); return { f:"SA = 6s²", s:[`s = ${nums[0]}`, `SA = 6×${nums[0]}² = ${A}`], a:`${A} units²` }; }],
            [/surface.*cone/,                     () => { const l=Math.sqrt(nums[0]**2+nums[1]**2); const A=r(PI*nums[0]*(nums[0]+l),6); return { f:"SA = πr(r + l),  l = √(r²+h²)", s:[`r=${nums[0]}, h=${nums[1]}`, `l = √(${nums[0]}²+${nums[1]}²) = ${r(l,4)}`, `SA = π×${nums[0]}×(${nums[0]}+${r(l,4)}) = ${A}`], a:`${A} units²` }; }],
            [/sphere.*volume|volume.*sphere/,      () => { const V=r(4/3*PI*nums[0]**3,6); return { f:"V = (4/3)πr³", s:[`r = ${nums[0]}`, `V = (4/3)π × ${nums[0]}³ = ${V}`], a:`${V} units³` }; }],
            [/cylinder.*volume|volume.*cylinder/,  () => { const V=r(PI*nums[0]**2*nums[1],6); return { f:"V = πr²h", s:[`r=${nums[0]}, h=${nums[1]}`, `V = π×${nums[0]}²×${nums[1]} = ${V}`], a:`${V} units³` }; }],
            [/cone.*volume|volume.*cone/,           () => { const V=r(PI*nums[0]**2*nums[1]/3,6); return { f:"V = (1/3)πr²h", s:[`r=${nums[0]}, h=${nums[1]}`, `V = (1/3)π×${nums[0]}²×${nums[1]} = ${V}`], a:`${V} units³` }; }],
            [/cube.*volume|volume.*cube/,           () => { const V=r(nums[0]**3,4); return { f:"V = s³", s:[`s = ${nums[0]}`, `V = ${nums[0]}³ = ${V}`], a:`${V} units³` }; }],
            [/box|cuboid|prism.*volume|volume.*prism/, () => { const V=r(nums[0]*nums[1]*nums[2],4); return { f:"V = l × w × h", s:[`l=${nums[0]}, w=${nums[1]}, h=${nums[2]}`, `V = ${V}`], a:`${V} units³` }; }],
            [/pyramid.*volume|volume.*pyramid/,    () => { const V=r(nums[0]*nums[1]/3,4); return { f:"V = (1/3) × Base Area × h", s:[`base area=${nums[0]}, h=${nums[1]}`, `V = ${V}`], a:`${V} units³` }; }],
            [/sector.*area|area.*sector/,          () => { const A=r(.5*nums[0]**2*toRad(nums[1]),4); return { f:"A = ½r²θ  (θ in radians)", s:[`r=${nums[0]}, θ=${nums[1]}°`, `θ_rad = ${r(toRad(nums[1]),4)}`, `A = ½×${nums[0]}²×${r(toRad(nums[1]),4)} = ${A}`], a:`${A} units²` }; }],
            [/arc.*length|length.*arc/,            () => { const L=r(nums[0]*toRad(nums[1]),4); return { f:"L = rθ  (θ in radians)", s:[`r=${nums[0]}, θ=${nums[1]}°`, `L = ${nums[0]}×${r(toRad(nums[1]),4)} = ${L}`], a:`${L} units` }; }],
            [/heron|herons/,                       () => {
                const [a,b,c2] = nums; const s2=(a+b+c2)/2;
                const A=r(Math.sqrt(s2*(s2-a)*(s2-b)*(s2-c2)),4);
                return { f:"Heron's formula: A = √(s(s−a)(s−b)(s−c)),  s=(a+b+c)/2",
                    s:[`a=${a}, b=${b}, c=${c2}`, `s = (${a}+${b}+${c2})/2 = ${s2}`, `A = √(${s2}×${r(s2-a,4)}×${r(s2-b,4)}×${r(s2-c2,4)}) = ${A}`], a:`${A} units²` }; }],
        ];

        for (const [pattern, fn] of geo) {
            if (pattern.test(lower)) {
                const res = fn();
                return {
                    answer: res.a,
                    steps: [
                        rule(res.f),
                        ...res.s.map((s2, i) => step(i + 1, s2)),
                        ans(res.a)
                    ]
                };
            }
        }

        return { answer: "Specify shape and values", steps: [note("Examples: area of circle radius 5, volume of sphere radius 3, perimeter of rectangle 4 by 6, surface area of cylinder radius 2 height 5")] };
    }

    /* ══════════════════════════════════════════
       STATISTICS
    ══════════════════════════════════════════ */
    function solveStats(q) {
        const lower = q.toLowerCase();
        const nums = (q.match(/-?\d+\.?\d*/g)||[]).map(Number).filter(n=>!isNaN(n));

        if (nums.length < 1) return { answer: "Provide numbers to analyze", steps: [] };

        const sorted = [...nums].sort((a,b)=>a-b);
        const n = nums.length;
        const sum = nums.reduce((a,b)=>a+b,0);
        const mean = sum / n;
        const variance = nums.reduce((s,x)=>s+(x-mean)**2,0)/n;
        const sd = Math.sqrt(variance);
        const median = n%2===1 ? sorted[Math.floor(n/2)] : (sorted[n/2-1]+sorted[n/2])/2;
        const freq = {}; nums.forEach(x=>freq[x]=(freq[x]||0)+1);
        const maxF = Math.max(...Object.values(freq));
        const modes = Object.keys(freq).filter(k=>freq[k]===maxF).map(Number);

        if (/mean|average/.test(lower)) return {
            answer: `Mean = ${r(mean,4)}`,
            steps: [
                step(1, `Data: ${nums.join(", ")}`),
                step(2, `Sum = ${nums.join(" + ")} = ${sum}`),
                step(3, `Mean = Sum / n = ${sum} / ${n} = <strong>${r(mean,4)}</strong>`),
                ans(r(mean,4))
            ]
        };

        if (/median/.test(lower)) return {
            answer: `Median = ${r(median,4)}`,
            steps: [
                step(1, `Sorted data: ${sorted.join(", ")}`),
                step(2, `n = ${n}`),
                step(3, n%2===1 ? `n is odd → median = middle value = ${median}` : `n is even → median = average of ${sorted[n/2-1]} and ${sorted[n/2]} = ${r(median,4)}`),
                ans(r(median,4))
            ]
        };

        if (/mode/.test(lower)) return {
            answer: `Mode = ${modes.join(", ")}`,
            steps: [
                step(1, `Count frequencies: ${Object.entries(freq).map(([k,v])=>`${k}:${v}`).join(", ")}`),
                step(2, `Highest frequency = ${maxF}`),
                step(3, `Mode(s): ${modes.join(", ")}`),
                ans(modes.join(", "))
            ]
        };

        if (/range/.test(lower)) return {
            answer: `Range = ${sorted[n-1]-sorted[0]}`,
            steps: [
                step(1, `Max = ${sorted[n-1]},  Min = ${sorted[0]}`),
                step(2, `Range = Max − Min = ${sorted[n-1]} − ${sorted[0]} = <strong>${sorted[n-1]-sorted[0]}</strong>`),
                ans(sorted[n-1]-sorted[0])
            ]
        };

        if (/variance/.test(lower)) return {
            answer: `Variance = ${r(variance,4)}`,
            steps: [
                step(1, `Mean = ${r(mean,4)}`),
                step(2, `Deviations²: ${nums.map(x=>r((x-mean)**2,4)).join(", ")}`),
                step(3, `Variance = ${r(nums.reduce((s,x)=>s+(x-mean)**2,0),4)} / ${n} = <strong>${r(variance,4)}</strong>`),
                ans(r(variance,4))
            ]
        };

        if (/std|standard dev/.test(lower)) return {
            answer: `SD = ${r(sd,4)}`,
            steps: [
                step(1, `Variance = ${r(variance,4)}`),
                step(2, `SD = √variance = √${r(variance,4)} = <strong>${r(sd,4)}</strong>`),
                ans(r(sd,4))
            ]
        };

        if (/probability/.test(lower) && nums.length >= 2) {
            const p = r(nums[0]/nums[1],6);
            return {
                answer: `P = ${p}`,
                steps: [
                    rule("P(event) = favourable outcomes / total outcomes"),
                    step(1, `Favourable = ${nums[0]},  Total = ${nums[1]}`),
                    step(2, `P = ${nums[0]}/${nums[1]} = ${p} (${r(parseFloat(p)*100,4)}%)`),
                    ans(p)
                ]
            };
        }

        if (/quartile|iqr|interquartile/.test(lower)) {
            const q1idx = Math.floor(n/4);
            const q3idx = Math.floor(3*n/4);
            const q1 = sorted[q1idx], q3 = sorted[q3idx];
            const iqr = q3 - q1;
            return {
                answer: `Q1=${q1},  Q3=${q3},  IQR=${iqr}`,
                steps: [
                    step(1, `Sorted: ${sorted.join(", ")}`),
                    step(2, `Q1 (25th percentile) = ${q1}`),
                    step(3, `Q3 (75th percentile) = ${q3}`),
                    step(4, `IQR = Q3 − Q1 = ${iqr}`),
                    ans(`Q1=${q1},  Q3=${q3},  IQR=${iqr}`)
                ]
            };
        }

        if (/permutation|nPr/.test(lower) && nums.length >= 2) {
            const [nn, k] = nums;
            const val = r(factorial(nn) / factorial(nn - k), 0);
            return {
                answer: `P(${nn},${k}) = ${val}`,
                steps: [
                    rule("P(n,r) = n! / (n−r)!"),
                    step(1, `n = ${nn}, r = ${k}`),
                    step(2, `P(${nn},${k}) = ${nn}! / ${nn-k}! = ${val}`),
                    ans(val)
                ]
            };
        }

        if (/combination|nCr|choose/.test(lower) && nums.length >= 2) {
            const [nn, k] = nums;
            const val = nCr(nn, k);
            return {
                answer: `C(${nn},${k}) = ${val}`,
                steps: [
                    rule("C(n,r) = n! / (r!(n−r)!)"),
                    step(1, `n = ${nn}, r = ${k}`),
                    step(2, `C(${nn},${k}) = ${nn}! / (${k}! × ${nn-k}!) = ${val}`),
                    ans(val)
                ]
            };
        }

        /* Full summary */
        return {
            answer: `Mean=${r(mean,4)}, Median=${r(median,4)}, Mode=${modes.join(",")}, SD=${r(sd,4)}`,
            steps: [
                step(1, `Dataset (n=${n}): ${nums.join(", ")}`),
                step(2, `Mean = ${r(mean,4)}`),
                step(3, `Median = ${r(median,4)}`),
                step(4, `Mode = ${modes.join(", ")}`),
                step(5, `Range = ${sorted[n-1]-sorted[0]}`),
                step(6, `Variance = ${r(variance,4)}`),
                step(7, `Standard Deviation = ${r(sd,4)}`),
                ans(`Mean=${r(mean,4)}, Median=${r(median,4)}, Mode=${modes.join(",")}, SD=${r(sd,4)}`)
            ]
        };
    }

    /* ══════════════════════════════════════════
       COMPLEX NUMBERS
    ══════════════════════════════════════════ */
    function solveComplex(q) {
        const lower = q.toLowerCase();
        const zs = [...q.matchAll(/\(\s*(-?\d+\.?\d*)\s*([+\-])\s*(\d+\.?\d*)\s*i\s*\)/g)];
        if (zs.length < 1) return { answer: "Write as (a+bi) or (a−bi)", steps: [note("Example: modulus of (3+4i)  or  multiply (2+3i)(1−i)")] };

        const [a1, s1, b1] = [parseFloat(zs[0][1]), zs[0][2], parseFloat(zs[0][3])];
        const im1 = b1 * (s1 === "-" ? -1 : 1);

        if (zs.length < 2) {
            if (/modulus|\|z\|/.test(lower)) {
                const mod = r(Math.sqrt(a1*a1 + im1*im1), 6);
                return { answer: `|z| = ${mod}`,
                    steps: [rule("|z| = √(a²+b²)"), step(1,`|${a1}+${im1}i| = √(${a1}²+${im1}²) = √${a1*a1+im1*im1} = <strong>${mod}</strong>`), ans(mod)] };
            }
            if (/argument|arg|angle/.test(lower)) {
                const arg = r(toDeg(Math.atan2(im1, a1)), 4);
                return { answer: `arg(z) = ${arg}°`,
                    steps: [rule("arg(z) = arctan(b/a)"), step(1,`arctan(${im1}/${a1}) = ${arg}°`), ans(`${arg}°`)] };
            }
            if (/conjugate/.test(lower)) {
                return { answer: `z* = ${a1} ${im1 < 0 ? "+" : "−"} ${Math.abs(im1)}i`,
                    steps: [rule("Conjugate: flip sign of imaginary part"), step(1,`z* = ${a1} ${im1<0?"+":"−"} ${Math.abs(im1)}i`), ans(`${a1} ${im1<0?"+":"−"}${Math.abs(im1)}i`)] };
            }
            /* Square */
            if (/square|z\^2/.test(lower)) {
                const re = a1*a1 - im1*im1, im = 2*a1*im1;
                return { answer: `z² = ${re} ${im>=0?"+":""}${im}i`,
                    steps: [rule("z² = (a+bi)² = a²−b² + 2abi"), step(1,`= ${a1*a1}−${im1*im1} + 2×${a1}×${im1}i = ${re} + ${im}i`), ans(`${re} + ${im}i`)] };
            }
        }

        if (zs.length >= 2) {
            const [a2, s2, b2] = [parseFloat(zs[1][1]), zs[1][2], parseFloat(zs[1][3])];
            const im2 = b2 * (s2 === "-" ? -1 : 1);

            if (/multi|\*/.test(lower)) {
                const re = a1*a2 - im1*im2, im = a1*im2 + im1*a2;
                return { answer: `${re} ${im>=0?"+":""}${im}i`,
                    steps: [rule("(a+bi)(c+di) = (ac−bd) + (ad+bc)i  [using i²=−1]"),
                        step(1,`Real part: ${a1}×${a2} − ${im1}×${im2} = ${a1*a2}−${im1*im2} = <strong>${re}</strong>`),
                        step(2,`Imaginary part: ${a1}×${im2} + ${im1}×${a2} = ${a1*im2}+${im1*a2} = <strong>${im}</strong>`),
                        ans(`${re} + ${im}i`)] };
            }
            if (/add|\+/.test(lower)) {
                return { answer: `${a1+a2} + ${im1+im2}i`,
                    steps: [step(1,`Add real and imaginary parts separately`), step(2,`= (${a1}+${a2}) + (${im1}+${im2})i = ${a1+a2} + ${im1+im2}i`), ans(`${a1+a2} + ${im1+im2}i`)] };
            }
            if (/sub|minus/.test(lower)) {
                return { answer: `${a1-a2} + ${im1-im2}i`,
                    steps: [step(1,`Subtract real and imaginary parts`), step(2,`= (${a1}−${a2}) + (${im1}−${im2})i = ${a1-a2} + ${im1-im2}i`), ans(`${a1-a2} + ${im1-im2}i`)] };
            }
            if (/div/.test(lower)) {
                const d = a2*a2 + im2*im2;
                const re = r((a1*a2 + im1*im2)/d, 4);
                const im = r((im1*a2 - a1*im2)/d, 4);
                return { answer: `${re} + ${im}i`,
                    steps: [
                        rule("Multiply numerator and denominator by the conjugate of denominator"),
                        step(1,`Conjugate of (${a2}+${im2}i) = (${a2}−${im2}i)`),
                        step(2,`Numerator: (${a1}+${im1}i)(${a2}−${im2}i)`),
                        step(3,`= (${a1*a2+im1*im2}) + (${im1*a2-a1*im2})i`),
                        step(4,`Denominator: |z₂|² = ${a2}² + ${im2}² = ${d}`),
                        step(5,`Result = ${re} + ${im}i`),
                        ans(`${re} + ${im}i`)
                    ] };
            }
        }

        return { answer: "Specify: modulus, argument, conjugate, add, subtract, multiply, divide", steps: [] };
    }

    /* ══════════════════════════════════════════
       NUMBER THEORY & ARITHMETIC
    ══════════════════════════════════════════ */
    function solveNumberTheory(q) {
        const lower = q.toLowerCase();
        const nums = (q.match(/\d+/g)||[]).map(Number);

        if (/prime factor|factori[sz]e?\s+\d/.test(lower) && nums.length > 0) {
            const n = nums[0];
            const factors = primeFactors(n);
            const grouped = {};
            factors.forEach(f => grouped[f] = (grouped[f]||0)+1);
            const display = Object.entries(grouped).map(([p,e])=>e>1?`${p}^${e}`:p).join(" × ");
            return {
                answer: `${n} = ${display}`,
                steps: [
                    step(1, `Divide ${n} by smallest prime factors repeatedly`),
                    ...Object.entries(grouped).map(([p,e],i) => step(i+2, `Divide by ${p}: appears ${e} time${e>1?"s":""}`)),
                    ans(`${n} = ${display}`)
                ]
            };
        }

        if (/^is\s+\d+\s+prime|prime\?/.test(lower) && nums.length > 0) {
            const n = nums[0];
            const result = isPrime(n);
            return {
                answer: result ? `${n} is prime` : `${n} is not prime`,
                steps: [
                    step(1, `Check divisibility up to √${n} = ${r(Math.sqrt(n),2)}`),
                    result ? step(2, `No factors found — ${n} is prime`) :
                             step(2, `${n} = ${primeFactors(n).join(" × ")} — not prime`),
                    ans(result ? "Prime" : "Not prime")
                ]
            };
        }

        if (/\bgcd\b|\bhcf\b/.test(lower) && nums.length >= 2) {
            const [a,b] = nums;
            const g = gcd(a,b);
            return {
                answer: `GCD(${a},${b}) = ${g}`,
                steps: [
                    rule("Euclidean algorithm: GCD(a,b) = GCD(b, a mod b)"),
                    step(1, `GCD(${a}, ${b})`),
                    step(2, `= GCD(${b}, ${a%b})`),
                    step(3, `= ${g}`),
                    ans(`${g}`)
                ]
            };
        }

        if (/\blcm\b/.test(lower) && nums.length >= 2) {
            const [a,b] = nums;
            const l = lcm(a,b), g = gcd(a,b);
            return {
                answer: `LCM(${a},${b}) = ${l}`,
                steps: [
                    rule("LCM(a,b) = |a×b| / GCD(a,b)"),
                    step(1, `GCD(${a},${b}) = ${g}`),
                    step(2, `LCM = ${a}×${b} / ${g} = ${a*b} / ${g} = <strong>${l}</strong>`),
                    ans(`${l}`)
                ]
            };
        }

        if (/factorial|!/.test(lower) && nums.length > 0) {
            const n = nums[0];
            if (n > 20) return { answer: `${n}! ≈ ${n}! (very large)`, steps: [note("Use Stirling's approximation for large factorials.")] };
            const val = factorial(n);
            return {
                answer: `${n}! = ${val}`,
                steps: [
                    step(1, `${n}! = ${Array.from({length:n},(_,i)=>i+1).join(" × ")}`),
                    step(2, `= ${val}`),
                    ans(`${val}`)
                ]
            };
        }

        return null;
    }

    /* ══════════════════════════════════════════
       FINANCIAL MATHEMATICS
    ══════════════════════════════════════════ */
    function solveFinancial(q) {
        const lower = q.toLowerCase();
        const nums = (q.match(/-?\d+\.?\d*/g)||[]).map(Number);

        if (/simple interest/.test(lower) && nums.length >= 3) {
            const [P, R, T] = nums;
            const I = r(P * R/100 * T, 4);
            const A = r(parseFloat(P) + parseFloat(I), 4);
            return {
                answer: `Interest = ${I},  Amount = ${A}`,
                steps: [
                    rule("Simple Interest: I = P×R×T/100"),
                    step(1,`P = ${P}, R = ${R}%, T = ${T} years`),
                    step(2,`I = ${P} × ${R}/100 × ${T} = <strong>${I}</strong>`),
                    step(3,`Amount = P + I = ${P} + ${I} = <strong>${A}</strong>`),
                    ans(`I = ${I},  A = ${A}`)
                ]
            };
        }

        if (/compound interest/.test(lower) && nums.length >= 3) {
            const [P, R, T] = nums;
            const n2 = nums[3] || 1; /* compounding periods */
            const A = r(P * Math.pow(1 + R/(100*n2), n2*T), 4);
            const I = r(parseFloat(A) - P, 4);
            return {
                answer: `Amount = ${A},  Interest = ${I}`,
                steps: [
                    rule("Compound Interest: A = P(1 + R/100n)^(nT)"),
                    step(1,`P = ${P}, R = ${R}%, T = ${T} years, n = ${n2} (compoundings/year)`),
                    step(2,`A = ${P} × (1 + ${R/100/n2})^${n2*T}`),
                    step(3,`A = ${P} × ${r(Math.pow(1+R/(100*n2), n2*T), 6)} = <strong>${A}</strong>`),
                    step(4,`Interest earned = ${A} − ${P} = <strong>${I}</strong>`),
                    ans(`A = ${A},  I = ${I}`)
                ]
            };
        }

        if (/depreciation/.test(lower) && nums.length >= 3) {
            const [P, R, T] = nums;
            const V = r(P * Math.pow(1 - R/100, T), 4);
            return {
                answer: `Value after ${T} years = ${V}`,
                steps: [
                    rule("Depreciation: V = P(1 − R/100)^T"),
                    step(1,`P = ${P}, R = ${R}%, T = ${T} years`),
                    step(2,`V = ${P} × (1 − ${R}/100)^${T} = ${P} × ${r(Math.pow(1-R/100,T),6)} = <strong>${V}</strong>`),
                    ans(V)
                ]
            };
        }

        return null;
    }

    /* ══════════════════════════════════════════
       CONICS
    ══════════════════════════════════════════ */
    function solveConics(q) {
        const lower = q.toLowerCase();
        const nums = (q.match(/-?\d+\.?\d*/g)||[]).map(Number);

        if (/circle/.test(lower)) {
            /* (x-h)² + (y-k)² = r² */
            if (nums.length >= 3) {
                const [h,k,rr] = nums;
                return {
                    answer: `Centre (${h}, ${k}), radius ${rr}`,
                    steps: [
                        rule("Standard circle: (x−h)² + (y−k)² = r²"),
                        step(1,`Centre = (${h}, ${k})`),
                        step(2,`Radius = ${rr}`),
                        step(3,`Area = πr² = ${r(PI*rr*rr,4)}`),
                        step(4,`Circumference = 2πr = ${r(2*PI*rr,4)}`),
                        ans(`Centre (${h}, ${k}), r = ${rr}`)
                    ]
                };
            }
        }

        if (/parabola/.test(lower)) {
            if (nums.length >= 1) {
                const a = nums[0];
                const focus = r(1/(4*a),4), vertex = "origin";
                return {
                    answer: `Parabola y = ${a}x²;  Focus at (0, ${focus}),  Directrix y = −${focus}`,
                    steps: [
                        rule("y = ax²: vertex at origin, focus at (0, 1/4a)"),
                        step(1,`a = ${a}`),
                        step(2,`Focus: (0, 1/(4×${a})) = (0, ${focus})`),
                        step(3,`Directrix: y = −${focus}`),
                        ans(`Focus (0, ${focus}), Directrix y = −${focus}`)
                    ]
                };
            }
        }

        if (/ellipse/.test(lower) && nums.length >= 2) {
            const [a, b] = nums;
            const c = r(Math.sqrt(Math.abs(a*a - b*b)),4);
            const e = r(parseFloat(c)/a, 4);
            return {
                answer: `a=${a}, b=${b}, c=${c}, eccentricity=${e}`,
                steps: [
                    rule("x²/a² + y²/b² = 1 (a > b):  c² = a²−b²,  e = c/a < 1"),
                    step(1,`a = ${a} (semi-major axis), b = ${b} (semi-minor axis)`),
                    step(2,`c = √(a²−b²) = √(${a*a}−${b*b}) = ${c}`),
                    step(3,`Eccentricity e = c/a = ${c}/${a} = ${e}`),
                    step(4,`Foci at (±${c}, 0),  Area = πab = ${r(PI*a*b,4)}`),
                    ans(`c = ${c},  e = ${e},  Area = ${r(PI*a*b,4)}`)
                ]
            };
        }

        if (/hyperbola/.test(lower) && nums.length >= 2) {
            const [a, b] = nums;
            const c = r(Math.sqrt(a*a + b*b), 4);
            const e = r(parseFloat(c)/a, 4);
            return {
                answer: `c = ${c},  eccentricity = ${e}`,
                steps: [
                    rule("x²/a² − y²/b² = 1:  c² = a²+b²,  e = c/a > 1"),
                    step(1,`a = ${a}, b = ${b}`),
                    step(2,`c = √(a²+b²) = ${c}`),
                    step(3,`Eccentricity e = c/a = ${e} (> 1 ✓)`),
                    step(4,`Asymptotes: y = ±(${b}/${a})x`),
                    ans(`c = ${c},  e = ${e}`)
                ]
            };
        }

        return null;
    }

    /* ══════════════════════════════════════════
       ARITHMETIC EVALUATOR
    ══════════════════════════════════════════ */
    function solveArithmetic(q) {
        try {
            let expr = q
                .replace(/[^0-9+\-*/^().%√πeE\s]/gi, "")
                .replace(/π/g, String(Math.PI))
                .replace(/√(\d+\.?\d*)/g, (_, n) => String(Math.sqrt(parseFloat(n))))
                .replace(/\^/g, "**")
                .trim();
            if (!expr) throw new Error("empty");
            const res = Function(`"use strict"; return (${expr})`)();
            if (!isFinite(res)) return { answer: String(res), steps: [step(1, `= ${res}`), ans(res)] };
            return {
                answer: `= ${r(res, 6)}`,
                steps: [
                    step(1, `Expression: ${q}`),
                    step(2, `= ${r(res, 6)}`),
                    ans(r(res, 6))
                ]
            };
        } catch {
            return { answer: "Could not evaluate. Use: digits + − × / ^ √ π", steps: [note("Example: 3^2 + √16 − 5")] };
        }
    }

    /* ══════════════════════════════════════════
       MAIN DISPATCH
    ══════════════════════════════════════════ */
    function solve(question) {
        const q    = question.toLowerCase().trim().replace(/−/g, "-");
        const raw  = question.trim();

        /* Ordered by specificity */
        if (/compound interest/.test(q))                                        { const r2 = solveFinancial(raw); if (r2) return r2; }
        if (/simple interest/.test(q))                                          { const r2 = solveFinancial(raw); if (r2) return r2; }
        if (/depreciation/.test(q))                                             { const r2 = solveFinancial(raw); if (r2) return r2; }
        if (/fibonacci|arithmetic.*sequence|geometric.*sequence|\bap\b|\bgp\b|sequences|series/.test(q))
                                                                                { const r2 = solveSequence(raw); if (r2) return r2; }
        if (/\bintegrat|\b∫|antiderivative|indefinite|definite/.test(q))        return integrate(raw);
        if (/differentiat|derivative|dy\/dx|d\/dx|gradient of|d by dx/.test(q)) return differentiate(raw);
        if (/simultaneous|system.*equation|2.*equations/.test(q))               { const r2 = solveSimultaneous(raw); if (r2) return r2; }
        if (/inequality|≤|≥|<.*x|x.*>/.test(q))                               { const r2 = solveInequality(raw); if (r2) return r2; }
        if (/factor.*quadratic|factoris|factori[sz]e.*x/.test(q))              { const r2 = factorQuadratic(raw); if (r2) return r2; }
        if (/quadratic|x[\^²]2?\s*[+\-].*x|solve.*x².?|roots/.test(q) && q.includes("x")) return solveQuadratic(raw);
        if (/solve|find x|linear eq|what is x/.test(q) && q.includes("="))     { const r2 = solveLinear(raw); if (r2) return r2; }
        if (/matrix|matric|determinant|invers.*matr|eigenvalu|transpose/.test(q)) return solveMatrix(raw);
        if (/\bvector|\bdot product|\bcross product|\bmagnitude of\b|\bunit vec|\bperpen|\bparallel/.test(q)) return solveVector(raw);
        if (/\bsin\b|\bcos\b|\btan\b|\bsec\b|\bcosec\b|\bcot\b|trig|sine rule|cosine rule|arcsin|arccos|arctan|pythagoras|hypotenuse/.test(q)) return solveTrig(raw);
        if (/mean|median|mode|standard dev|variance|probability|range|quartile|iqr|permutation|combination|nPr|nCr|choose/.test(q)) return solveStats(raw);
        if (/\blimit\b|\blim\b/.test(q))                                        return solveLimit(raw);
        if (/\bln\b|\blog\b|logarithm|log_|e\^x\s*=|expo/.test(q))             { const r2 = solveLogExp(raw); if (r2) return r2; }
        if (/complex|imaginary|\bi[^a-z]/i.test(q))                            return solveComplex(raw);
        if (/prime|factorial|gcd|hcf|lcm|factor[is]/.test(q))                  { const r2 = solveNumberTheory(raw); if (r2) return r2; }
        if (/parabola|ellipse|hyperbola|conic|circle.*centre|centre.*circle/.test(q)) { const r2 = solveConics(raw); if (r2) return r2; }
        if (/area|volume|surface area|perimeter|circumference|sphere|cylinder|cone|cube|triangle|rectangle|trapez|prism|pyramid|sector|radius|diameter|heron/.test(q))
                                                                                return solveGeometry(raw);
        if (/\b\d+\s*[+\-*/^]\s*\d+|\d+\s*plus|\d+\s*minus|\d+\s*times|\d+\s*divide/.test(q)) return solveArithmetic(raw);

        /* Try linear as fallback if = is present */
        if (q.includes("="))                                                    { const r2 = solveLinear(raw); if (r2) return r2; }

        return {
            answer: "Please rephrase your question",
            steps: [
                note("I can solve: quadratics, simultaneous equations, differentiation, integration, limits, sequences & series, matrices, vectors, trigonometry, statistics, probability, complex numbers, logarithms, geometry (areas/volumes), conics, number theory, and financial maths."),
                note("Tip: be specific, e.g. <em>'differentiate 3x² + 5x'</em> or <em>'find the area of a circle radius 7'</em>")
            ]
        };
    }

    return { solve };
})();

/* ═══════════════════════════════════════════════════════════════
   FREE QUESTION HANDLER
═══════════════════════════════════════════════════════════════ */
solveFreeBtn.addEventListener("click", handleFreeQuestion);
freeQuestion.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleFreeQuestion(); } });

function handleFreeQuestion() {
    const q = freeQuestion.value.trim();
    if (!q) { alert("Please type a question first!"); return; }

    freeAnswer.innerHTML  = `<span style="color:var(--muted);font-size:0.9rem;">⏳ Solving…</span>`;
    freeSteps.innerHTML   = "";

    try {
        const result = MathEngine.solve(q);

        freeAnswer.innerHTML = `
            <div class="free-answer-box">
                <span class="ans-label">✔ Answer</span>
                <span class="ans-value">${escapeHTML(result.answer)}</span>
            </div>`;

        if (result.steps && result.steps.length) {
            freeSteps.innerHTML = `
                <div class="steps-header">Step-by-step solution</div>
                ${result.steps.filter(Boolean).join("")}`;
        }

        if (typeof MathProgress !== "undefined") MathProgress.recordTopicViewed("Free Question");
        if (window.MathJax) MathJax.typesetPromise([freeAnswer, freeSteps]).catch(() => {});

    } catch (err) {
        freeAnswer.innerHTML = `<span style="color:#721c24;">⚠ Could not solve. Please rephrase your question.</span>`;
        console.error("Engine error:", err);
    }

    freeQuestion.value = "";
}

function escapeHTML(str) {
    const d = document.createElement("div");
    d.textContent = String(str);
    return d.innerHTML;
}

/* ═══════════════════════════════════════════════════════════════
   IMAGE SCANNER
═══════════════════════════════════════════════════════════════ */
(function () {
    const imageInput = document.getElementById("imageInput");
    const scanBtn    = document.getElementById("scanImageBtn");
    const ocrStatus  = document.getElementById("ocrStatus");
    const userQ      = document.getElementById("userQuestion");
    const userSol    = document.getElementById("userSolution");
    let selectedFile = null;

    if (imageInput) imageInput.addEventListener("change", e => {
        const f = e.target.files[0];
        if (!f) return;
        if (!f.type.match("image.*")) { showStatus("Please select an image file.", "warning"); return; }
        selectedFile = f;
        showStatus(`✔ Image selected: ${f.name}  (${(f.size/1024).toFixed(1)} KB)`, "info");
        showPreview(f);
    });

    if (scanBtn) scanBtn.addEventListener("click", async () => {
        if (!selectedFile) { showStatus("Please select an image first.", "warning"); return; }
        clearResults();

        if (typeof Tesseract !== "undefined") {
            showStatus("🔍 Running OCR — this may take a moment…", "processing");
            try {
                const { data: { text } } = await Tesseract.recognize(selectedFile, "eng", {
                    logger: m => {
                        if (m.status === "recognizing text")
                            showStatus(`OCR: ${Math.round(m.progress*100)}% complete…`, "processing");
                    }
                });
                const cleaned = text.replace(/\n+/g," ").replace(/[^\w\s+\-*/^()=.,π√∫]/g," ").trim();
                if (cleaned.length > 4) {
                    showStatus("✔ Text read — solving…", "success");
                    solveAndDisplay(cleaned);
                    return;
                }
            } catch(e) { console.warn("Tesseract:", e); }
        }

        showStatus("📷 Image uploaded. Type the question below to solve it.", "warning");
        userQ.innerHTML = `
            <div style="padding:1rem 1.2rem;background:#fff3cd;border:1px solid #ffc107;border-radius:8px;color:#7a5c00;line-height:1.7;">
                <strong>Image received!</strong> For best results, type or paste the question text into the
                <strong>"Ask Any Math Question"</strong> box above and click <strong>Solve</strong>.<br><br>
                <em>Example: "Differentiate y = 3x² + 5x"  or  "Find the volume of a sphere radius 4"</em>
            </div>`;
    });

    function solveAndDisplay(text) {
        displayProblem(text);
        try {
            const result = MathEngine.solve(text);
            displaySolution(result);
            showStatus("✔ Solved!", "success");
        } catch {
            userSol.innerHTML = `<div style="padding:1rem;background:#f8d7da;color:#721c24;border-radius:8px;">
                Could not solve automatically. Please type the question in the box above.</div>`;
        }
    }

    function displayProblem(text) {
        userQ.innerHTML = `
            <div class="problem-analysis">
                <div class="analysis-header"><h4>Question Detected</h4></div>
                <div class="problem-content">
                    <div class="problem-text">
                        <strong>Extracted text:</strong>
                        <div class="math-expression">${esc(text.slice(0,400))}</div>
                    </div>
                </div>
            </div>`;
    }

    function displaySolution(result) {
        const stepsHTML = (result.steps||[]).filter(Boolean).join("");
        userSol.innerHTML = `
            <div class="math-solution">
                <div class="solution-header"><h4>Step-by-Step Solution</h4></div>
                <div class="solution-steps">${stepsHTML}</div>
                <div class="final-answer">
                    <div class="answer-box">${esc(result.answer||"See steps")}</div>
                </div>
            </div>`;
        if (window.MathJax) MathJax.typesetPromise([userSol]).catch(()=>{});
    }

    function showPreview(file) {
        document.querySelector(".image-preview")?.remove();
        const r_ = new FileReader();
        r_.onload = e => {
            const el = document.createElement("div");
            el.className = "image-preview";
            el.innerHTML = `
                <div class="preview-title">Image Preview</div>
                <div class="preview-image"><img src="${e.target.result}" alt="Uploaded math problem"></div>
                <div class="preview-info"><span>${esc(file.name)}</span><span>${(file.size/1024).toFixed(1)} KB</span></div>`;
            scanBtn.parentNode.insertBefore(el, scanBtn);
        };
        r_.readAsDataURL(file);
    }

    function showStatus(msg, type="info") {
        if (!ocrStatus) return;
        ocrStatus.textContent = msg;
        ocrStatus.className   = `status-${type}`;
    }
    function clearResults() {
        if (userQ)   userQ.innerHTML   = "";
        if (userSol) userSol.innerHTML = "";
    }
    function esc(t) {
        const d = document.createElement("div");
        d.textContent = t;
        return d.innerHTML;
    }
    showStatus("Ready — select an image to scan and solve.", "info");
})();

/* Load Tesseract.js (OCR) lazily */
(function () {
    const s = document.createElement("script");
    s.src   = "https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/5.0.4/tesseract.min.js";
    s.async = true;
    document.head.appendChild(s);
})();