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
                n.style.cssText = "position:fixed;top:20px;right:20px;background:#2e6645;color:#fff;padding:14px 18px;border-radius:10px;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,0.2);font-size:0.9rem;";
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
   FULL CLIENT-SIDE MATHS ENGINE
   Handles: Differentiation, Integration, Equation solving,
   Matrices, Vectors, Trigonometry, Geometry, Statistics,
   Limits, Complex Numbers, Arithmetic
   ████████████████████████████████████████████████████████████
═══════════════════════════════════════════════════════════════ */
const MathEngine = (function () {
    const PI = Math.PI;
    const r  = (n, dp=4) => +n.toFixed(dp);
    const toRad = d => d * PI / 180;
    const toDeg = r_ => r_ * 180 / PI;

    /* ─── DIFFERENTIATION ─── */
    function differentiate(raw) {
        const q     = raw.toLowerCase();
        const steps = [];
        let answer  = "";

        // trigonometric
        if (/sin|cos|tan/.test(q)) {
            const coeff = (q.match(/(-?\d*\.?\d*)\s*\*?\s*(sin|cos|tan)/)||["","1"])[1];
            const k = coeff===''||coeff==='+'?1 : coeff==='-'?-1 : parseFloat(coeff)||1;
            if (/sin/.test(q)) { answer=`${k}cos(x)`; steps.push(`d/dx(${k}sin x) = ${k}cos x`); }
            else if (/cos/.test(q)) { answer=`${-k}sin(x)`; steps.push(`d/dx(${k}cos x) = ${-k}sin x`); }
            else if (/tan/.test(q)) { answer=`${k}sec²(x)`; steps.push(`d/dx(${k}tan x) = ${k}sec²(x)`); }
            steps.unshift("Standard trig derivative rules:");
            steps.push(`✔ f′(x) = ${answer}`);
            return { answer, steps };
        }

        // exponential e^(kx)
        if (/e\^/.test(q)) {
            const m = raw.match(/([+-]?\d*\.?\d*)\s*\*?\s*e\^\(?\s*([+-]?\d*\.?\d*)\s*x\)?/i);
            const a = m ? (parseFloat(m[1])||1) : 1;
            const k = m ? (parseFloat(m[2])||1) : 1;
            answer = `${a*k}e^(${k}x)`;
            steps.push(`Rule: d/dx(a·e^(kx)) = a·k·e^(kx)`);
            steps.push(`a = ${a}, k = ${k}  →  ${a}×${k} = ${a*k}`);
            steps.push(`✔ f′(x) = ${answer}`);
            return { answer, steps };
        }

        // ln
        if (/ln/.test(q)) {
            const m = raw.match(/([+-]?\d*\.?\d*)\s*\*?\s*ln\(([+-]?\d*\.?\d*)x\)/i);
            const a = m ? (parseFloat(m[1])||1) : 1;
            answer = `${a}/x`;
            steps.push(`Rule: d/dx(a·ln(bx)) = a/x`);
            steps.push(`✔ f′(x) = ${answer}`);
            return { answer, steps };
        }

        // polynomial
        steps.push("Power rule: d/dx(cxⁿ) = c·n·xⁿ⁻¹");
        const terms = raw.replace(/\s/g,"").replace(/([+-])/g," $1").trim().split(" ").filter(Boolean);
        const dTerms = [];
        for (const tok of terms) {
            if (!tok.includes("x")) {
                const c = parseFloat(tok); if (!isNaN(c)) steps.push(`d/dx(${c}) = 0`);
                continue;
            }
            const m = tok.match(/^([+-]?\d*\.?\d*)\*?x\^?(\d*\.?\d*)$/);
            if (!m) continue;
            const c  = m[1]===''||m[1]==='+'?1 : m[1]==='-'?-1 : parseFloat(m[1]);
            const n  = m[2]===''?1 : parseFloat(m[2]);
            const nc = c*n, np = n-1;
            const term = np===0?`${nc}` : np===1?`${nc}x`:`${nc}x^${np}`;
            dTerms.push(term);
            steps.push(`d/dx(${c}x^${n}) = ${nc}x^${np<=0?0:np}`);
        }
        answer = dTerms.join(" + ").replace(/\+ -/g,"- ") || "0";
        steps.push(`✔ f′(x) = ${answer}`);
        return { answer, steps };
    }

    /* ─── INTEGRATION ─── */
    function integrate(raw) {
        const q     = raw.toLowerCase();
        const steps = [];
        let answer  = "";

        if (/sin|cos/.test(q)) {
            if (/sin/.test(q)) {
                const m = raw.match(/([+-]?\d*\.?\d*)\*?\s*sin\(x\)/i);
                const k = m ? (parseFloat(m[1])||1) : 1;
                answer = `−${k}cos(x) + C`;
                steps.push(`∫${k}sin(x)dx = −${k}cos(x) + C`);
            } else {
                const m = raw.match(/([+-]?\d*\.?\d*)\*?\s*cos\(x\)/i);
                const k = m ? (parseFloat(m[1])||1) : 1;
                answer = `${k}sin(x) + C`;
                steps.push(`∫${k}cos(x)dx = ${k}sin(x) + C`);
            }
            steps.unshift("Standard trig integral:");
            steps.push(`✔ ${answer}`);
            return { answer, steps };
        }

        if (/e\^/.test(q)) {
            const m = raw.match(/([+-]?\d*\.?\d*)\*?\s*e\^\(?\s*([+-]?\d*\.?\d*)\s*x\)?/i);
            const a = m ? (parseFloat(m[1])||1) : 1;
            const k = m ? (parseFloat(m[2])||1) : 1;
            answer = `${r(a/k,4)}e^(${k}x) + C`;
            steps.push(`∫a·e^(kx)dx = (a/k)e^(kx) + C`);
            steps.push(`a=${a}, k=${k}  →  a/k = ${r(a/k,4)}`);
            steps.push(`✔ ${answer}`);
            return { answer, steps };
        }

        if (/ln/.test(q)) {
            answer = "x·ln(x) − x + C";
            steps.push("∫ln(x)dx = x·ln(x) − x + C  (integration by parts: u=ln x, dv=dx)");
            steps.push(`✔ ${answer}`);
            return { answer, steps };
        }

        // definite integral ∫_a^b simple polynomial
        const defMatch = raw.match(/∫[\s_]*([\d.]+)\s*\^\s*([\d.]+)\s*(.*?)\s*dt/i)
                      || raw.match(/integral from ([\d.]+) to ([\d.]+) of (.*)/i);
        if (defMatch) {
            const lo = parseFloat(defMatch[1]), hi = parseFloat(defMatch[2]);
            steps.push(`Definite integral from ${lo} to ${hi}`);
            steps.push(`Apply Fundamental Theorem: F(${hi}) − F(${lo})`);
        }

        // polynomial
        steps.push("Power rule: ∫cxⁿdx = (c/(n+1))x^(n+1) + C");
        const terms   = raw.replace(/\s/g,"").replace(/([+-])/g," $1").trim().split(" ").filter(Boolean);
        const iTerms  = [];
        for (const tok of terms) {
            if (!tok.includes("x")) {
                const c = parseFloat(tok);
                if (!isNaN(c)) { iTerms.push(`${c}x`); steps.push(`∫${c}dx = ${c}x`); }
                continue;
            }
            const m = tok.match(/^([+-]?\d*\.?\d*)\*?x\^?(\d*\.?\d*)$/);
            if (!m) continue;
            const c  = m[1]===''||m[1]==='+'?1 : m[1]==='-'?-1 : parseFloat(m[1]);
            const n  = m[2]===''?1 : parseFloat(m[2]);
            const np = n+1, nc = r(c/np,4);
            iTerms.push(`${nc}x^${np}`);
            steps.push(`∫${c}x^${n}dx = (${c}/${np})x^${np} = ${nc}x^${np}`);
        }
        answer = (iTerms.join(" + ").replace(/\+ -/g,"- ")||"0") + " + C";
        steps.push(`✔ ${answer}`);
        return { answer, steps };
    }

    /* ─── EQUATION SOLVING ─── */
    function solveEquation(raw) {
        const steps = [];
        // quadratic
        const qm = raw.match(/(-?\d*\.?\d*)x[\^²]2?\s*([+\-]\s*\d*\.?\d*x)?\s*([+\-]\s*\d*\.?\d*)?\s*=\s*(-?\d*\.?\d*)/i);
        if (qm || /x.2|x²/.test(raw)) {
            const parts = raw.replace(/=.*$/, "").trim();
            const am = parts.match(/(-?\d*\.?\d*)x[\^²]?2?/); const bm = parts.match(/([+\-]?\s*\d+\.?\d*)\s*x(?!\^|²)/); const cm = parts.match(/([+\-]\s*\d+\.?\d*)\s*(?=[^x]|$)/g);
            let a=1, b=0, c_=0;
            if (am) a=parseFloat(am[1])||1;
            if (bm) b=parseFloat(bm[1].replace(/\s/g,""))||0;
            const rhs = parseFloat(raw.replace(/.*=/,""))||0;
            c_ = rhs - (cm ? parseFloat(cm[cm.length-1].replace(/\s/g,""))||0 : 0);
            // simple fallback parse
            const nice = raw.replace(/\s/g,"");
            const aa = nice.match(/^(-?\d*\.?\d*)x\^?2/); if (aa) a=parseFloat(aa[1])||1;
            const bb = nice.match(/([+\-]\d*\.?\d*)x(?!\^)/); if (bb) b=parseFloat(bb[1])||0;
            const eq = nice.split("="); const rhsN = parseFloat(eq[1])||0;
            const cc = eq[0].match(/([+\-]\d+\.?\d*)(?=[^x]|$)/g);
            c_ = (cc ? parseFloat(cc[cc.length-1])||0 : 0) - rhsN;

            const D = b*b - 4*a*c_;
            steps.push(`Equation in standard form: ${a}x² + ${b}x + ${c_} = 0`);
            steps.push(`Discriminant: Δ = b²−4ac = ${b}²−4(${a})(${c_}) = ${D}`);
            let ans;
            if (D > 0) {
                const x1=r((-b+Math.sqrt(D))/(2*a),4), x2=r((-b-Math.sqrt(D))/(2*a),4);
                steps.push(`Δ > 0 → Two real roots`);
                steps.push(`x = (−b ± √Δ)/2a = (${-b} ± ${r(Math.sqrt(D),4)}) / ${2*a}`);
                ans = `x₁ = ${x1},  x₂ = ${x2}`;
            } else if (D===0) {
                ans = `x = ${r(-b/(2*a),4)}`;
                steps.push(`Δ = 0 → One repeated root`);
            } else {
                const re=r(-b/(2*a),4), im=r(Math.sqrt(-D)/(2*a),4);
                ans = `x = ${re} ± ${im}i`;
                steps.push(`Δ < 0 → Complex roots`);
            }
            steps.push(`✔ ${ans}`);
            return { answer:ans, steps };
        }

        // linear
        const lm = raw.match(/(-?\d*\.?\d*)\s*x\s*([+\-]\s*\d*\.?\d*)?\s*=\s*(-?\d*\.?\d*)/i);
        if (lm) {
            const a=parseFloat(lm[1])||1, b=parseFloat((lm[2]||"0").replace(/\s/g,""))||0, rhs=parseFloat(lm[3])||0;
            steps.push(`${a}x ${b>=0?'+ ':''}${b} = ${rhs}`);
            steps.push(`${a}x = ${rhs-b}`);
            const x = r((rhs-b)/a,4);
            steps.push(`x = ${rhs-b} / ${a} = ${x}`);
            return { answer:`x = ${x}`, steps };
        }

        return { answer:"Could not parse. Write as: 2x+5=11 or x²−5x+6=0", steps:["Ensure = sign is present."] };
    }

    /* ─── GEOMETRY ─── */
    function solveGeometry(q) {
        const steps = [];
        const nums  = (q.match(/-?\d+\.?\d*/g)||[]).map(Number);

        const geo = [
            [/circle.*area|area.*circle/,      () => { const A=r(PI*nums[0]**2,4); steps.push(`A=πr²=π×${nums[0]}²=${A}`); return `Area = ${A}`; }],
            [/triangle.*area|area.*triangle/,  () => { const A=r(.5*nums[0]*nums[1],4); steps.push(`A=½×${nums[0]}×${nums[1]}=${A}`); return `Area = ${A}`; }],
            [/rectangle|parallelogram/,         () => { const A=r(nums[0]*nums[1],4); steps.push(`A=l×w=${nums[0]}×${nums[1]}=${A}`); return `Area = ${A}`; }],
            [/trapez/,                          () => { const A=r(.5*(nums[0]+nums[1])*nums[2],4); steps.push(`A=½(${nums[0]}+${nums[1]})×${nums[2]}=${A}`); return `Area = ${A}`; }],
            [/circumference|perimeter.*circle/, () => { const C=r(2*PI*nums[0],4); steps.push(`C=2πr=2π×${nums[0]}=${C}`); return `Circumference = ${C}`; }],
            [/surface.*sphere/,                 () => { const A=r(4*PI*nums[0]**2,4); steps.push(`SA=4πr²=4π×${nums[0]}²=${A}`); return `Surface Area = ${A}`; }],
            [/surface.*cylinder/,               () => { const A=r(2*PI*nums[0]*(nums[0]+nums[1]),4); steps.push(`SA=2πr(r+h)=${A}`); return `Surface Area = ${A}`; }],
            [/surface.*cube/,                   () => { const A=6*nums[0]**2; steps.push(`SA=6s²=6×${nums[0]}²=${A}`); return `Surface Area = ${A}`; }],
            [/sphere.*volume|volume.*sphere/,   () => { const V=r(4/3*PI*nums[0]**3,4); steps.push(`V=(4/3)πr³=${V}`); return `Volume = ${V}`; }],
            [/cylinder.*volume|volume.*cylinder/,()=>{ const V=r(PI*nums[0]**2*nums[1],4); steps.push(`V=πr²h=π×${nums[0]}²×${nums[1]}=${V}`); return `Volume = ${V}`; }],
            [/cone.*volume|volume.*cone/,        ()=>{ const V=r(PI*nums[0]**2*nums[1]/3,4); steps.push(`V=(1/3)πr²h=${V}`); return `Volume = ${V}`; }],
            [/cube.*volume|volume.*cube/,        ()=>{ const V=nums[0]**3; steps.push(`V=s³=${V}`); return `Volume = ${V}`; }],
            [/box|cuboid|prism/,                 ()=>{ const V=nums[0]*nums[1]*nums[2]; steps.push(`V=l×w×h=${V}`); return `Volume = ${V}`; }],
            [/pyramid/,                          ()=>{ const V=r(nums[0]*nums[1]/3,4); steps.push(`V=(1/3)×Base×h=${V}`); return `Volume = ${V}`; }],
            [/sector/,                           ()=>{ const A=r(.5*nums[0]**2*toRad(nums[1]),4); steps.push(`A=½r²θ(rad)=${A}`); return `Area = ${A}`; }],
        ];

        for (const [pattern, fn] of geo) {
            if (pattern.test(q)) {
                steps.unshift(`Shape detected from: "${q.slice(0,60)}"`);
                const ans = fn();
                return { answer:ans, steps };
            }
        }
        return { answer:"Specify shape and values. E.g: 'area of circle radius 5' or 'volume of sphere radius 3'", steps:["Shapes: circle, triangle, rectangle, trapezium, sphere, cylinder, cone, cube, cuboid, pyramid, sector."] };
    }

    /* ─── MATRICES ─── */
    function solveMatrix(q) {
        const steps = [];
        const m2    = q.match(/\[?\s*\[?\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\]?\s*,?\s*\[?\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\]?\s*\]?/);

        if (m2 && (/det|determin/.test(q))) {
            const [,a,b,c,d] = m2.map((v,i)=>i===0?v:parseFloat(v));
            const det = a*d - b*c;
            steps.push(`[[${a},${b}],[${c},${d}]]`);
            steps.push(`det = ad−bc = (${a}×${d})−(${b}×${c}) = ${a*d}−${b*c} = ${det}`);
            det!==0 ? steps.push("Matrix IS invertible (det ≠ 0)") : steps.push("Matrix is SINGULAR (det = 0, no inverse)");
            return { answer:`det = ${det}`, steps };
        }

        if (m2 && /inver/.test(q)) {
            const [,a,b,c,d] = m2.map((v,i)=>i===0?v:parseFloat(v));
            const det = a*d-b*c;
            steps.push(`det = ${det}`);
            if (det===0) return { answer:"No inverse — singular matrix (det = 0)", steps };
            const ans = `[[${r(d/det,4)}, ${r(-b/det,4)}], [${r(-c/det,4)}, ${r(a/det,4)}]]`;
            steps.push(`Adjugate: [[${d},${-b}],[${-c},${a}]]`);
            steps.push(`A⁻¹ = (1/${det}) × adjugate`);
            steps.push(`✔ A⁻¹ = ${ans}`);
            return { answer:ans, steps };
        }

        const allM = [...q.matchAll(/\[\s*\[?\s*(-?\d+)\s*,\s*(-?\d+)\s*\]?\s*,?\s*\[?\s*(-?\d+)\s*,\s*(-?\d+)\s*\]?\s*\]/g)];
        if (allM.length >= 2 && /multi|product/.test(q)) {
            const [a,b,c,d] = allM[0].slice(1).map(Number);
            const [e,f,g,h] = allM[1].slice(1).map(Number);
            steps.push(`A=[[${a},${b}],[${c},${d}]]  B=[[${e},${f}],[${g},${h}]]`);
            steps.push(`(0,0): ${a}×${e}+${b}×${g}=${a*e+b*g}`);
            steps.push(`(0,1): ${a}×${f}+${b}×${h}=${a*f+b*h}`);
            steps.push(`(1,0): ${c}×${e}+${d}×${g}=${c*e+d*g}`);
            steps.push(`(1,1): ${c}×${f}+${d}×${h}=${c*f+d*h}`);
            const ans = `[[${a*e+b*g},${a*f+b*h}],[${c*e+d*g},${c*f+d*h}]]`;
            return { answer:ans, steps };
        }

        return { answer:"Write matrices as [[a,b],[c,d]] and say: determinant, inverse, or multiply.", steps };
    }

    /* ─── VECTORS ─── */
    function solveVector(q) {
        const steps = [];
        const vecs  = [...q.matchAll(/\(\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)(?:\s*,\s*(-?\d+\.?\d*))?\s*\)/g)];

        if (vecs.length===0) return { answer:"Write vectors as (x,y) or (x,y,z)", steps };

        const v1 = vecs[0].slice(1).map(Number).filter(n=>!isNaN(n));
        const v2 = vecs[1] ? vecs[1].slice(1).map(Number).filter(n=>!isNaN(n)) : [];

        if (/magnitude|length|norm/.test(q)) {
            const mag = r(Math.sqrt(v1.reduce((s,c)=>s+c*c,0)),4);
            steps.push(`|v| = √(${v1.map(c=>`${c}²`).join("+")})`);
            steps.push(`= √${v1.reduce((s,c)=>s+c*c,0)} = ${mag}`);
            return { answer:`|v| = ${mag}`, steps };
        }
        if (/dot|scalar product/.test(q) && v2.length) {
            const dot = v1.reduce((s,c,i)=>s+c*(v2[i]||0),0);
            steps.push(`a·b = ${v1.map((c,i)=>`${c}×${v2[i]||0}`).join("+")} = ${dot}`);
            return { answer:`a·b = ${dot}`, steps };
        }
        if (/cross/.test(q) && v2.length && v1.length===3) {
            const [a1,a2,a3]=v1, [b1,b2,b3]=v2;
            const cx=a2*b3-a3*b2, cy=a3*b1-a1*b3, cz=a1*b2-a2*b1;
            steps.push(`i: ${a2}×${b3}−${a3}×${b2}=${cx}`);
            steps.push(`j: ${a3}×${b1}−${a1}×${b3}=${cy}`);
            steps.push(`k: ${a1}×${b2}−${a2}×${b1}=${cz}`);
            return { answer:`(${cx}, ${cy}, ${cz})`, steps };
        }
        if (/angle/.test(q) && v2.length) {
            const dot=v1.reduce((s,c,i)=>s+c*(v2[i]||0),0);
            const m1=Math.sqrt(v1.reduce((s,c)=>s+c*c,0));
            const m2_=Math.sqrt(v2.reduce((s,c)=>s+c*c,0));
            const ang=r(toDeg(Math.acos(Math.min(1,Math.max(-1,dot/(m1*m2_))))),2);
            steps.push(`cos θ = (a·b)/(|a||b|) = ${dot}/(${r(m1,4)}×${r(m2_,4)}) = ${r(dot/(m1*m2_),6)}`);
            steps.push(`θ = ${ang}°`);
            return { answer:`θ = ${ang}°`, steps };
        }
        if (/unit/.test(q)) {
            const mag=Math.sqrt(v1.reduce((s,c)=>s+c*c,0));
            const u=v1.map(c=>r(c/mag,4));
            steps.push(`û = v/|v| = (${v1.join(",")})/${r(mag,4)} = (${u.join(",")})`);
            return { answer:`û = (${u.join(", ")})`, steps };
        }
        if (/add|sum/.test(q) && v2.length) {
            const sum=v1.map((c,i)=>c+(v2[i]||0));
            steps.push(`a+b = (${v1.join(",")}+${v2.join(",")}) = (${sum.join(",")})`);
            return { answer:`(${sum.join(", ")})`, steps };
        }
        return { answer:"Specify operation: magnitude, dot product, cross product, angle, unit vector, add.", steps };
    }

    /* ─── TRIGONOMETRY ─── */
    function solveTrig(q) {
        const steps = [];
        const nums  = (q.match(/-?\d+\.?\d*/g)||[]).map(Number);

        const sinM  = q.match(/sin\s*[\(\[]?\s*x\s*[\)\]]?\s*=\s*(-?\d*\.?\d+)/i);
        const cosM  = q.match(/cos\s*[\(\[]?\s*x\s*[\)\]]?\s*=\s*(-?\d*\.?\d+)/i);
        const tanM  = q.match(/tan\s*[\(\[]?\s*x\s*[\)\]]?\s*=\s*(-?\d*\.?\d+)/i);

        if (sinM) {
            const k=parseFloat(sinM[1]);
            if (Math.abs(k)>1) return { answer:"No real solution — |sin x| ≤ 1", steps };
            const p=r(toDeg(Math.asin(k)),2);
            steps.push(`x = arcsin(${k}) = ${p}°`);
            steps.push(`Second: x = 180°−${p}° = ${180-p}°`);
            steps.push(`General: x = ${p}°+360°k  or  x = ${180-p}°+360°k`);
            return { answer:`x = ${p}° or ${180-p}°`, steps };
        }
        if (cosM) {
            const k=parseFloat(cosM[1]);
            if (Math.abs(k)>1) return { answer:"No real solution — |cos x| ≤ 1", steps };
            const p=r(toDeg(Math.acos(k)),2);
            steps.push(`x = arccos(${k}) = ${p}°`);
            steps.push(`Second: x = 360°−${p}° = ${360-p}°`);
            return { answer:`x = ${p}° or ${360-p}°`, steps };
        }
        if (tanM) {
            const k=parseFloat(tanM[1]);
            const p=r(toDeg(Math.atan(k)),2);
            steps.push(`x = arctan(${k}) = ${p}°`);
            steps.push(`General: x = ${p}°+180°k`);
            return { answer:`x = ${p}° + 180°k`, steps };
        }

        if (/sin.*2.*cos.*2|pythagorean identity/i.test(q)) {
            steps.push("Identity: sin²θ + cos²θ = 1 — holds for all θ");
            return { answer:"Identity holds for all θ", steps };
        }

        // evaluate sin/cos/tan of a number
        if (nums.length > 0) {
            const ang = nums[0];
            const angR = toRad(ang);
            if (/sin/.test(q)) { const v=r(Math.sin(angR),6); steps.push(`sin(${ang}°) = ${v}`); return { answer:`${v}`, steps }; }
            if (/cos/.test(q)) { const v=r(Math.cos(angR),6); steps.push(`cos(${ang}°) = ${v}`); return { answer:`${v}`, steps }; }
            if (/tan/.test(q)) { const v=r(Math.tan(angR),6); steps.push(`tan(${ang}°) = ${v}`); return { answer:`${v}`, steps }; }
        }

        // cosine rule
        if (/cosine rule|law of cos/i.test(q) && nums.length>=3) {
            const [a,b,C]=nums, c2=a*a+b*b-2*a*b*Math.cos(toRad(C)), c=r(Math.sqrt(c2),4);
            steps.push(`c² = a²+b²−2ab·cos C = ${a*a}+${b*b}−${r(2*a*b*Math.cos(toRad(C)),4)} = ${r(c2,4)}`);
            steps.push(`c = ${c}`);
            return { answer:`c = ${c}`, steps };
        }

        // sine rule
        if (/sine rule|law of sin/i.test(q) && nums.length>=3) {
            const [a,A,b]=nums;
            const sinB=r(b*Math.sin(toRad(A))/a,6), B=r(toDeg(Math.asin(Math.min(1,sinB))),2);
            steps.push(`sin B = b·sin A / a = ${b}×sin${A}°/${a} = ${sinB}`);
            steps.push(`B = arcsin(${sinB}) = ${B}°`);
            return { answer:`B = ${B}°`, steps };
        }

        return { answer:"Write as: sin(x)=0.5, cos(45°), tan(x)=1, sine rule, cosine rule.", steps };
    }

    /* ─── STATISTICS ─── */
    function solveStats(q) {
        const steps = [];
        const nums  = (q.match(/-?\d+\.?\d*/g)||[]).map(Number).filter(n=>!isNaN(n)&&n!==undefined);
        if (nums.length < 2) return { answer:"Provide at least 2 numbers.", steps };

        const sorted = [...nums].sort((a,b)=>a-b);
        const n      = nums.length;
        const sum    = nums.reduce((a,b)=>a+b,0);
        const mean   = r(sum/n,4);

        if (/mean|average/.test(q)) {
            steps.push(`Sum = ${nums.join("+")} = ${sum}`);
            steps.push(`Mean = ${sum}/${n} = ${mean}`);
            return { answer:`Mean = ${mean}`, steps };
        }
        if (/median/.test(q)) {
            steps.push(`Sorted: ${sorted.join(", ")}`);
            const med = n%2===1 ? sorted[Math.floor(n/2)] : r((sorted[n/2-1]+sorted[n/2])/2,4);
            steps.push(`Median = ${med}`);
            return { answer:`Median = ${med}`, steps };
        }
        if (/mode/.test(q)) {
            const f={}; nums.forEach(x=>f[x]=(f[x]||0)+1);
            const maxF=Math.max(...Object.values(f));
            const modes=Object.keys(f).filter(k=>f[k]===maxF);
            steps.push(`Mode(s): ${modes.join(", ")} (each appears ${maxF} times)`);
            return { answer:`Mode = ${modes.join(", ")}`, steps };
        }
        if (/range/.test(q)) {
            steps.push(`Max=${sorted[n-1]}, Min=${sorted[0]}`);
            steps.push(`Range=${sorted[n-1]-sorted[0]}`);
            return { answer:`Range = ${sorted[n-1]-sorted[0]}`, steps };
        }
        if (/variance|std|standard dev/.test(q)) {
            const v=r(nums.reduce((s,x)=>s+(x-mean)**2,0)/n,4);
            const sd=r(Math.sqrt(v),4);
            steps.push(`Mean = ${mean}`);
            steps.push(`Variance = Σ(xᵢ−x̄)²/n = ${v}`);
            steps.push(`SD = √${v} = ${sd}`);
            return { answer:`SD = ${sd},  Variance = ${v}`, steps };
        }
        if (/probability/.test(q) && nums.length>=2) {
            const p=r(nums[0]/nums[1],4);
            steps.push(`P = favourable/total = ${nums[0]}/${nums[1]} = ${p}`);
            return { answer:`P = ${p} (${r(p*100,2)}%)`, steps };
        }
        // all stats
        const v=r(nums.reduce((s,x)=>s+(x-mean)**2,0)/n,4);
        const med= n%2===1?sorted[Math.floor(n/2)]:r((sorted[n/2-1]+sorted[n/2])/2,4);
        return { answer:`Mean=${mean}, Median=${med}, SD=${r(Math.sqrt(v),4)}`, steps:[
            `Dataset: ${nums.join(", ")}`, `Mean=${mean}`, `Median=${med}`, `SD=${r(Math.sqrt(v),4)}` ] };
    }

    /* ─── LIMITS ─── */
    function solveLimit(q) {
        const steps = [];
        const pt    = (q.match(/x\s*[→\->]\s*(-?\d+\.?\d*)/)||[,null])[1];
        const a     = pt!==null ? parseFloat(pt) : null;

        if (a!==null) {
            steps.push(`Approach point x → ${a}`);
            // factoring pattern (x²-a²)/(x-a)
            if (/x.2|x²/.test(q) && /x\s*-\s*\d/.test(q)) {
                steps.push("Direct substitution gives 0/0 — try factoring.");
                steps.push(`x² − ${a*a} = (x−${a})(x+${a})`);
                steps.push(`Cancel (x−${a}): limit = lim(x→${a})(x+${a}) = ${2*a}`);
                return { answer:`Limit = ${2*a}`, steps };
            }
            steps.push("Try direct substitution. If result is 0/0, use L'Hôpital's Rule or factoring.");
            return { answer:`Substitute x = ${a} into expression; if 0/0 apply L'Hôpital.`, steps };
        }
        return { answer:"Write: lim x→2 (x²−4)/(x−2)", steps };
    }

    /* ─── COMPLEX NUMBERS ─── */
    function solveComplex(q) {
        const steps = [];
        const zs    = [...q.matchAll(/\(\s*(-?\d+\.?\d*)\s*([+\-])\s*(\d+\.?\d*)\s*i\s*\)/g)];
        if (zs.length < 1) return { answer:"Write as (a+bi) e.g. (3+4i)(2−i)", steps };

        const [a1,s1,b1] = [parseFloat(zs[0][1]), zs[0][2], parseFloat(zs[0][3])];
        const im1 = b1*(s1==='-'?-1:1);

        if (zs.length < 2) {
            if (/modulus|\|/.test(q)) {
                const mod=r(Math.sqrt(a1*a1+im1*im1),4);
                steps.push(`|${a1}+${im1}i| = √(${a1}²+${im1}²) = ${mod}`);
                return { answer:`|z| = ${mod}`, steps };
            }
            if (/argument|angle/.test(q)) {
                const arg=r(toDeg(Math.atan2(im1,a1)),2);
                steps.push(`arg(z) = arctan(${im1}/${a1}) = ${arg}°`);
                return { answer:`arg(z) = ${arg}°`, steps };
            }
            if (/conjugate/.test(q)) {
                return { answer:`z* = ${a1} ${im1<0?'+':'-'} ${Math.abs(im1)}i`, steps:["Flip sign of imaginary part."] };
            }
        }

        const [a2,s2,b2] = zs[1] ? [parseFloat(zs[1][1]), zs[1][2], parseFloat(zs[1][3])] : [0,'+',0];
        const im2 = b2*(s2==='-'?-1:1);

        if (/multi|\*/.test(q)) {
            const re=a1*a2-im1*im2, im=a1*im2+im1*a2;
            steps.push(`FOIL: (${a1}+${im1}i)(${a2}+${im2}i)`);
            steps.push(`real = ${a1*a2}−(${im1}×${im2}) = ${re}`);
            steps.push(`imag = ${a1*im2}+${im1*a2} = ${im}  (i²=−1)`);
            return { answer:`${re} + ${im}i`, steps };
        }
        if (/add|sum|\+/.test(q)) {
            return { answer:`${a1+a2} + ${im1+im2}i`, steps:[`(${a1}+${im1}i)+(${a2}+${im2}i) = ${a1+a2}+${im1+im2}i`] };
        }
        if (/sub|minus/.test(q)) {
            return { answer:`${a1-a2} + ${im1-im2}i`, steps:[`(${a1}+${im1}i)−(${a2}+${im2}i) = ${a1-a2}+${im1-im2}i`] };
        }
        if (/div/.test(q)) {
            const d=a2*a2+im2*im2;
            const re=r((a1*a2+im1*im2)/d,4), im=r((im1*a2-a1*im2)/d,4);
            steps.push(`Multiply by conjugate (${a2}${-im2>=0?'+':''}${-im2}i)/${d}`);
            steps.push(`Result: ${re}+${im}i`);
            return { answer:`${re} + ${im}i`, steps };
        }
        return { answer:"Specify: add, subtract, multiply, divide, modulus, argument, or conjugate.", steps };
    }

    /* ─── ARITHMETIC ─── */
    function solveArithmetic(q) {
        const steps = [];
        try {
            let expr = q.replace(/[^0-9+\-*/^().%√πe\s]/gi,"")
                        .replace(/π/g, String(Math.PI))
                        .replace(/√(\d+\.?\d*)/g,(_,n)=>String(Math.sqrt(parseFloat(n))))
                        .replace(/\^/g,"**").trim();
            if (!expr) throw new Error("empty");
            steps.push(`Expression: ${expr}`);
            const res = Function(`"use strict"; return (${expr})`)();
            steps.push(`= ${res}`);
            return { answer:`= ${r(res,6)}`, steps };
        } catch {
            return { answer:"Could not evaluate. Use: digits + − × / ^ √ π", steps };
        }
    }

    /* ─── MAIN DISPATCH ─── */
    function solve(question) {
        const q = question.toLowerCase().trim();
        if (/\bintegrat|\b∫|antiderivative/.test(q))                          return integrate(question);
        if (/differentiat|derivative|dy\/dx|d\/dx|gradient of/.test(q))       return differentiate(question);
        if (/\bsolve\b.*=|quadratic|find x|linear eq/.test(q))                return solveEquation(question);
        if (/matrix|matric|determinant|invers.*matr|eigenvalu/.test(q))        return solveMatrix(question);
        if (/\bvector|\bdot product|\bcross product|\bmagnitude|\bunit vec/.test(q)) return solveVector(question);
        if (/\bsin|\bcos|\btan|trig|sine rule|cosine rule|arcsin|arccos|arctan/.test(q)) return solveTrig(question);
        if (/mean|median|mode|standard dev|variance|probability|range/.test(q)) return solveStats(question);
        if (/\blimit|\blim\b/.test(q))                                          return solveLimit(question);
        if (/complex|imaginary|\bi[^a-z]/.test(q))                             return solveComplex(question);
        if (/area|volume|surface area|perimeter|circumference|sphere|cylinder|cone|cube|triangle|rectangle|trapez|prism|pyramid|sector|radius|diameter/.test(q))
                                                                                return solveGeometry(question);
        return solveArithmetic(question);
    }

    return { solve };
})();

/* ═══════════════════════════════════════════════════════════════
   FREE QUESTION HANDLER
═══════════════════════════════════════════════════════════════ */
solveFreeBtn.addEventListener("click", () => {
    const q = freeQuestion.value.trim();
    if (!q) { alert("Please type a question first!"); return; }

    freeAnswer.innerHTML = `<span style="color:#7a5c42;font-size:0.9rem;">⏳ Solving…</span>`;
    freeSteps.innerHTML  = "";

    try {
        const result = MathEngine.solve(q);

        freeAnswer.innerHTML = `
            <div style="display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap;">
                <strong style="color:#155724;white-space:nowrap;">✔ Answer:</strong>
                <span style="font-size:1.15rem;font-weight:700;color:#2e1a0c;">${escapeHTML(result.answer)}</span>
            </div>`;

        if (result.steps && result.steps.length) {
            freeSteps.innerHTML = "<strong>Step-by-step solution:</strong><br><br>" +
                result.steps.map((s,i) =>
                    `<div style="margin:.3rem 0;padding:.45rem .7rem;border-left:3px solid #e8b98a;background:#fff9f3;border-radius:0 6px 6px 0;">
                        <strong style="color:#7b4a1e;">${i+1}.</strong>&nbsp;${escapeHTML(s)}
                    </div>`
                ).join("");
        }

        if (typeof MathProgress !== "undefined") MathProgress.recordTopicViewed("Free Question");
        if (window.MathJax) MathJax.typesetPromise([freeAnswer, freeSteps]).catch(()=>{});

    } catch (err) {
        freeAnswer.innerHTML = `<span style="color:#721c24;">⚠ Could not solve. Please rephrase your question.</span>`;
        console.error("Engine error:", err);
    }

    freeQuestion.value = "";
});

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

        // Try Tesseract OCR if loaded
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

        // Graceful fallback
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
        const topic = detectTopic(text.toLowerCase());
        userQ.innerHTML = `
            <div class="problem-analysis">
                <div class="analysis-header"><h4><i class="fas fa-search"></i> Question Detected</h4></div>
                <div class="problem-content">
                    <div class="problem-text">
                        <strong>Extracted text:</strong>
                        <div class="math-expression">${esc(text.slice(0,400))}</div>
                    </div>
                    <div class="analysis-details">
                        <div class="detail-item">
                            <span class="detail-label">Topic</span>
                            <span class="topic-badge ${topic.toLowerCase().replace(/\s+/g,"-")}">${topic}</span>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    function displaySolution(result) {
        const steps  = result.steps || [];
        const answer = result.answer || "See steps";
        userSol.innerHTML = `
            <div class="math-solution">
                <div class="solution-header">
                    <h4><i class="fas fa-check-circle"></i> Step-by-Step Solution</h4>
                </div>
                <div class="solution-steps">
                    <h5>Solution Steps</h5>
                    <div class="steps-container">
                        ${steps.map((s,i)=>`<div class="step-item">
                            <div class="step-number">${i+1}</div>
                            <div class="step-content">${esc(s)}</div>
                        </div>`).join("")}
                    </div>
                </div>
                <div class="final-answer">
                    <h5><i class="fas fa-lightbulb"></i> Final Answer</h5>
                    <div class="answer-box">${esc(answer)}</div>
                    <span class="verification"><i class="fas fa-check"></i> Computed solution</span>
                </div>
                <div class="solution-help">
                    <h5><i class="fas fa-question-circle"></i> Need more help?</h5>
                    <p>Retype the question in <strong>"Ask Any Math Question"</strong> above for more detail.</p>
                </div>
            </div>`;
        if (window.MathJax) MathJax.typesetPromise([userSol]).catch(()=>{});
    }

    function detectTopic(q) {
        if (/integrat|∫/.test(q))           return "Integration";
        if (/differentiat|derivative/.test(q)) return "Differentiation";
        if (/matrix|determinant/.test(q))    return "Matrices";
        if (/vector|magnitude/.test(q))      return "Vectors";
        if (/sin|cos|tan/.test(q))           return "Trigonometry";
        if (/mean|median|probability/.test(q)) return "Statistics";
        if (/area|volume/.test(q))           return "Geometry";
        if (/solve|equation/.test(q))        return "Algebra";
        return "Mathematics";
    }

    function showPreview(file) {
        document.querySelector(".image-preview")?.remove();
        const r_ = new FileReader();
        r_.onload = e => {
            const el = document.createElement("div");
            el.className = "image-preview";
            el.innerHTML = `
                <div class="preview-title"><i class="fas fa-image"></i> Image Preview</div>
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

/* Load Tesseract.js (OCR) in the background */
(function () {
    const s = document.createElement("script");
    s.src   = "https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/5.0.4/tesseract.min.js";
    s.async = true;
    document.head.appendChild(s);
})();