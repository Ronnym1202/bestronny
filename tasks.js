/* ═══════════════════════════════════════════════════════════════
   RONNY BEST MATHEMATICS — tasks.js  v3.0
   Full coverage: all 13 topics + unlimited math questions
   AdSense-compliant: no adult content, no policy violations
   ═══════════════════════════════════════════════════════════════ */
"use strict";
console.log("✅ tasks.js v3.0 LOADED — Full 13-topic engine");

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
          <br>
          <a href="achievements.html" style="display:inline-block;margin-top:8px;
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
   PROBLEM GENERATOR BANK — All 13 Topics
   ═══════════════════════════════════════════════════════════════ */
const taskFormulas = {

  /* ── 1. DIFFERENTIATION ── */
  differentiation: [
    x => ({
      q: `Differentiate: y = ${x}x⁴ − ${x+2}x³ + ${x+1}x² − ${x}x + ${x-1}`,
      ans: `${4*x}x³ − ${3*(x+2)}x² + ${2*(x+1)}x − ${x}`,
      steps: `<strong>Rule:</strong> Power rule — d/dx(xⁿ) = n·xⁿ⁻¹, d/dx(constant) = 0<br><br>
d/dx(${x}x⁴) = <strong>${4*x}x³</strong><br>
d/dx(−${x+2}x³) = <strong>−${3*(x+2)}x²</strong><br>
d/dx(${x+1}x²) = <strong>${2*(x+1)}x</strong><br>
d/dx(−${x}x) = <strong>−${x}</strong><br>
d/dx(${x-1}) = <strong>0</strong><br><br>
<strong>✔ Final Answer: y′ = ${4*x}x³ − ${3*(x+2)}x² + ${2*(x+1)}x − ${x}</strong>`
    }),
    x => ({
      q: `Use the product rule to differentiate: y = ${x}x² · sin(x)`,
      ans: `${2*x}x·sin(x) + ${x}x²·cos(x)`,
      steps: `<strong>Product Rule:</strong> d/dx[u·v] = u'v + uv'<br><br>
Let u = ${x}x², so u′ = ${2*x}x<br>
Let v = sin(x), so v′ = cos(x)<br><br>
dy/dx = (${2*x}x)·sin(x) + (${x}x²)·cos(x)<br><br>
<strong>✔ Final Answer: y′ = ${2*x}x·sin(x) + ${x}x²·cos(x)</strong>`
    }),
    x => ({
      q: `Differentiate using the chain rule: y = (${x}x + ${x+1})⁵`,
      ans: `${5*x}(${x}x + ${x+1})⁴`,
      steps: `<strong>Chain Rule:</strong> d/dx[f(g(x))] = f′(g(x))·g′(x)<br><br>
Outer function: u⁵, where u = ${x}x + ${x+1}<br>
d/dx(u⁵) = 5u⁴<br>
d/dx(${x}x + ${x+1}) = ${x}<br><br>
dy/dx = 5(${x}x + ${x+1})⁴ × ${x} = ${5*x}(${x}x + ${x+1})⁴<br><br>
<strong>✔ Final Answer: y′ = ${5*x}(${x}x + ${x+1})⁴</strong>`
    }),
    x => ({
      q: `Differentiate: y = ${x}e^(${x}x) + ${x+1}ln(x)`,
      ans: `${x*x}e^(${x}x) + ${x+1}/x`,
      steps: `<strong>Rules:</strong> d/dx(eᵏˣ) = k·eᵏˣ  |  d/dx(ln x) = 1/x<br><br>
d/dx(${x}e^(${x}x)) = ${x} × ${x} × e^(${x}x) = <strong>${x*x}e^(${x}x)</strong><br>
d/dx(${x+1}ln(x)) = <strong>${x+1}/x</strong><br><br>
<strong>✔ Final Answer: y′ = ${x*x}e^(${x}x) + ${x+1}/x</strong>`
    }),
    x => ({
      q: `Use the quotient rule to differentiate: y = (${x}x²) / (${x+1}x + 1)`,
      ans: `[${2*x}(${x+1}x + 1) − ${x*(x+1)}x²] / (${x+1}x + 1)²`,
      steps: `<strong>Quotient Rule:</strong> d/dx[u/v] = (u'v − uv') / v²<br><br>
u = ${x}x², u′ = ${2*x}x<br>
v = ${x+1}x + 1, v′ = ${x+1}<br><br>
dy/dx = [${2*x}x·(${x+1}x + 1) − ${x}x²·${x+1}] / (${x+1}x + 1)²<br>
      = [${2*x}(${x+1}x + 1) − ${x*(x+1)}x²] / (${x+1}x + 1)²<br><br>
<strong>✔ Final Answer: y′ = [${2*x}(${x+1}x+1) − ${x*(x+1)}x²] / (${x+1}x+1)²</strong>`
    }),
    x => ({
      q: `Find dy/dx at x = 1 for: y = ${x}x³ − ${x+3}x`,
      ans: `${3*x - (x+3)}`,
      steps: `<strong>Step 1:</strong> Differentiate: dy/dx = ${3*x}x² − ${x+3}<br><br>
<strong>Step 2:</strong> Substitute x = 1:<br>
dy/dx = ${3*x}(1)² − ${x+3} = ${3*x} − ${x+3} = <strong>${3*x-(x+3)}</strong><br><br>
<strong>✔ Final Answer: dy/dx at x = 1 is ${3*x-(x+3)}</strong>`
    })
  ],

  /* ── 2. INTEGRATION ── */
  integration: [
    x => ({
      q: `Integrate: ∫(${x}x³ − ${x+2}x² + ${x+4}x − ${x}) dx`,
      ans: `${(x/4).toFixed(4)}x⁴ − ${((x+2)/3).toFixed(4)}x³ + ${((x+4)/2).toFixed(4)}x² − ${x}x + C`,
      steps: `<strong>Rule:</strong> ∫xⁿ dx = xⁿ⁺¹/(n+1) + C<br><br>
∫${x}x³ dx = <strong>${(x/4).toFixed(3)}x⁴</strong><br>
∫−${x+2}x² dx = <strong>−${((x+2)/3).toFixed(3)}x³</strong><br>
∫${x+4}x dx = <strong>${((x+4)/2).toFixed(3)}x²</strong><br>
∫−${x} dx = <strong>−${x}x</strong><br>
Add constant: <strong>+ C</strong><br><br>
<strong>✔ Answer: ${(x/4).toFixed(3)}x⁴ − ${((x+2)/3).toFixed(3)}x³ + ${((x+4)/2).toFixed(3)}x² − ${x}x + C</strong>`
    }),
    x => ({
      q: `Evaluate the definite integral: ∫₀^${x} (${x}t² + ${x+1}) dt`,
      ans: `${(x*x*x/3 + (x+1)*x).toFixed(4)}`,
      steps: `<strong>Step 1:</strong> Find antiderivative F(t) = ${(x/3).toFixed(3)}t³ + ${x+1}t<br><br>
<strong>Step 2:</strong> Apply limits [0, ${x}]:<br>
F(${x}) = ${(x/3).toFixed(3)}(${x})³ + ${x+1}(${x}) = ${(x/3*x*x).toFixed(3)} + ${(x+1)*x} = ${(x/3*x*x + (x+1)*x).toFixed(4)}<br>
F(0) = 0<br><br>
<strong>✔ Final Answer: ${(x/3*x*x + (x+1)*x).toFixed(4)}</strong>`
    }),
    x => ({
      q: `Integrate by substitution: ∫${x}·sin(${x}x + 1) dx`,
      ans: `−cos(${x}x + 1) + C`,
      steps: `<strong>Substitution Method:</strong><br>
Let u = ${x}x + 1, so du = ${x} dx → dx = du/${x}<br><br>
∫${x}·sin(u) · du/${x} = ∫sin(u) du = −cos(u) + C<br><br>
Substitute back u = ${x}x + 1:<br><br>
<strong>✔ Final Answer: −cos(${x}x + 1) + C</strong>`
    }),
    x => ({
      q: `Integrate: ∫(${x}e^(${x}x) + ${x+1}/x) dx`,
      ans: `e^(${x}x) + ${x+1}·ln|x| + C`,
      steps: `<strong>Rules:</strong> ∫eᵏˣ dx = (1/k)eᵏˣ + C  |  ∫1/x dx = ln|x| + C<br><br>
∫${x}e^(${x}x) dx = ${x} × (1/${x})e^(${x}x) = <strong>e^(${x}x)</strong><br>
∫${x+1}/x dx = <strong>${x+1}·ln|x|</strong><br><br>
<strong>✔ Final Answer: e^(${x}x) + ${x+1}·ln|x| + C</strong>`
    }),
    x => ({
      q: `Find the area under y = ${x}x + ${x+1} from x = 0 to x = ${x}`,
      ans: `${(x*(x*x/2) + (x+1)*x).toFixed(2)}`,
      steps: `<strong>Area = ∫₀^${x} (${x}x + ${x+1}) dx</strong><br><br>
Antiderivative: F(x) = ${x/2}x² + ${x+1}x<br><br>
F(${x}) = ${x/2}(${x})² + ${x+1}(${x}) = ${x/2*x*x} + ${(x+1)*x} = ${(x/2*x*x + (x+1)*x).toFixed(2)}<br>
F(0) = 0<br><br>
<strong>✔ Area = ${(x/2*x*x + (x+1)*x).toFixed(2)} square units</strong>`
    })
  ],

  /* ── 3. LIMITS ── */
  limits: [
    x => ({
      q: `Evaluate: lim(x→${x}) [x² − ${x}x + ${x*(x-1)}] / (x − ${x})`,
      ans: `${x}`,
      steps: `<strong>Step 1:</strong> Direct substitution gives 0/0 — indeterminate form.<br><br>
<strong>Step 2:</strong> Factor numerator:<br>
x² − ${x}x + ${x*(x-1)} = (x − ${x-1})(x − ${x}) <em>[check by expanding]</em><br>
Actually factor as: (x − ${x})(x − ${x-1})<br><br>
<em>Let's use L'Hôpital's rule instead:</em><br>
d/dx(x² − ${x}x + ${x*(x-1)}) = 2x − ${x}<br>
d/dx(x − ${x}) = 1<br><br>
lim(x→${x}) (2x − ${x})/1 = 2(${x}) − ${x} = <strong>${x}</strong><br><br>
<strong>✔ Final Answer: ${x}</strong>`
    }),
    x => ({
      q: `Evaluate: lim(x→0) sin(${x}x) / (${x}x)`,
      ans: `1`,
      steps: `<strong>Standard limit:</strong> lim(x→0) sin(kx)/(kx) = 1 for any constant k ≠ 0<br><br>
Let u = ${x}x. As x → 0, u → 0.<br>
lim(u→0) sin(u)/u = <strong>1</strong> (fundamental trigonometric limit)<br><br>
This is a classical result proved using the squeeze theorem.<br><br>
<strong>✔ Final Answer: 1</strong>`
    }),
    x => ({
      q: `Find: lim(x→∞) (${x}x² + ${x+1}) / (${x+2}x² − ${x})`,
      ans: `${(x/(x+2)).toFixed(4)}`,
      steps: `<strong>Divide numerator and denominator by x² (highest power):</strong><br><br>
= lim(x→∞) [${x} + ${x+1}/x²] / [${x+2} − ${x}/x²]<br><br>
As x → ∞: ${x+1}/x² → 0 and ${x}/x² → 0<br><br>
= ${x} / ${x+2} = <strong>${(x/(x+2)).toFixed(4)}</strong><br><br>
<strong>✔ Final Answer: ${(x/(x+2)).toFixed(4)}</strong>`
    }),
    x => ({
      q: `Apply L'Hôpital's Rule: lim(x→0) (e^(${x}x) − 1) / (${x}x)`,
      ans: `1`,
      steps: `<strong>Step 1:</strong> Check form: plug x=0 → (1−1)/0 = 0/0 ✓ — L'Hôpital applies.<br><br>
<strong>Step 2:</strong> Differentiate numerator and denominator separately:<br>
d/dx(e^(${x}x) − 1) = ${x}e^(${x}x)<br>
d/dx(${x}x) = ${x}<br><br>
<strong>Step 3:</strong> New limit: lim(x→0) ${x}e^(${x}x) / ${x} = lim(x→0) e^(${x}x) = e⁰ = <strong>1</strong><br><br>
<strong>✔ Final Answer: 1</strong>`
    })
  ],

  /* ── 4. ALGEBRA ── */
  algebra: [
    x => ({
      q: `Solve for x: ${x+1}x + ${2*x} = ${x*(x+3) + 2*x}`,
      ans: `x = ${x}`,
      steps: `<strong>Step 1:</strong> ${x+1}x + ${2*x} = ${x*(x+3)+2*x}<br>
<strong>Step 2:</strong> Subtract ${2*x} from both sides:<br>
${x+1}x = ${x*(x+3)+2*x - 2*x} = ${x*(x+3)}<br>
<strong>Step 3:</strong> Divide by ${x+1}:<br>
x = ${x*(x+3)} ÷ ${x+1} = <strong>${x}</strong><br><br>
<strong>✔ Final Answer: x = ${x}</strong>`
    }),
    x => ({
      q: `Solve the quadratic: x² − ${x+3}x + ${x*(x+3) - 2*x} = 0`,
      ans: `x = ${x} or x = ${x+3-x}`,
      steps: `<strong>Using the quadratic formula:</strong> x = [−b ± √(b²−4ac)] / 2a<br><br>
a = 1, b = −${x+3}, c = ${x*(x+3)-2*x}<br>
Discriminant = (${x+3})² − 4(1)(${x*(x+3)-2*x})<br>
= ${(x+3)*(x+3)} − ${4*(x*(x+3)-2*x)}<br>
= ${(x+3)*(x+3) - 4*(x*(x+3)-2*x)}<br><br>
√Δ = ${Math.sqrt((x+3)*(x+3) - 4*(x*(x+3)-2*x)).toFixed(3)}<br>
x₁ = (${x+3} + ${Math.sqrt((x+3)*(x+3)-4*(x*(x+3)-2*x)).toFixed(3)}) / 2 = <strong>${x}</strong><br>
x₂ = (${x+3} − ${Math.sqrt((x+3)*(x+3)-4*(x*(x+3)-2*x)).toFixed(3)}) / 2 = <strong>${x+3-x}</strong><br><br>
<strong>✔ Final Answer: x = ${x} or x = ${x+3-x}</strong>`
    }),
    x => ({
      q: `Solve simultaneously: ${x}x + ${x+1}y = ${x*x + (x+1)*(x+2)} and x − y = ${x - (x+2)}`,
      ans: `x = ${x}, y = ${x+2}`,
      steps: `<strong>From equation 2:</strong> x = y + ${x-(x+2)} = y − ${(x+2)-x}<br>
So x = y − ${2}<br><br>
<strong>Substitute into equation 1:</strong><br>
${x}(y − 2) + ${x+1}y = ${x*x+(x+1)*(x+2)}<br>
${x}y − ${2*x} + ${x+1}y = ${x*x+(x+1)*(x+2)}<br>
${2*x+1}y = ${x*x+(x+1)*(x+2)+2*x}<br>
y = ${x+2}<br><br>
<strong>Then:</strong> x = ${x+2} − 2 = <strong>${x}</strong><br><br>
<strong>✔ Final Answer: x = ${x}, y = ${x+2}</strong>`
    }),
    x => ({
      q: `Solve the inequality: ${x+1}x − ${2*x} > ${x*(x-1)}`,
      ans: `x > ${x}`,
      steps: `<strong>Step 1:</strong> ${x+1}x − ${2*x} > ${x*(x-1)}<br>
<strong>Step 2:</strong> Add ${2*x} to both sides:<br>
${x+1}x > ${x*(x-1) + 2*x} = ${x*(x-1)+2*x}<br>
<strong>Step 3:</strong> Divide by ${x+1} (positive, so inequality direction unchanged):<br>
x > ${(x*(x-1)+2*x)/(x+1)}<br>
x > <strong>${x}</strong><br><br>
<strong>✔ Final Answer: x > ${x}</strong>`
    }),
    x => ({
      q: `Factorise completely: ${x}x² + ${x*(x+1) + x}x + ${x*(x+1)}`,
      ans: `${x}(x + 1)(x + ${x+1})`,
      steps: `<strong>Step 1:</strong> Factor out common factor ${x}:<br>
${x}[x² + ${x+2}x + ${x+1}]<br><br>
<strong>Step 2:</strong> Factor the quadratic x² + ${x+2}x + ${x+1}:<br>
Find two numbers that multiply to ${x+1} and add to ${x+2}: → 1 and ${x+1}<br><br>
<strong>Step 3:</strong> x² + ${x+2}x + ${x+1} = (x + 1)(x + ${x+1})<br><br>
<strong>✔ Final Answer: ${x}(x + 1)(x + ${x+1})</strong>`
    })
  ],

  /* ── 5. LOGARITHMS ── */
  logarithms: [
    x => ({
      q: `Solve for x: log₂(x) = ${x}`,
      ans: `x = ${Math.pow(2,x)}`,
      steps: `<strong>Rule:</strong> logₐ(x) = b ↔ x = aᵇ<br><br>
log₂(x) = ${x}<br>
x = 2^${x} = <strong>${Math.pow(2,x)}</strong><br><br>
<strong>✔ Final Answer: x = ${Math.pow(2,x)}</strong>`
    }),
    x => ({
      q: `Simplify: log(${x*x}) + log(${x+1}) − log(${x*(x+1)})`,
      ans: `log(${x})`,
      steps: `<strong>Logarithm Laws:</strong><br>
log(A) + log(B) = log(AB)<br>
log(A) − log(B) = log(A/B)<br><br>
log(${x*x}) + log(${x+1}) = log(${x*x} × ${x+1}) = log(${x*x*(x+1)})<br>
log(${x*x*(x+1)}) − log(${x*(x+1)}) = log(${x*x*(x+1)}/${x*(x+1)}) = log(${x})<br><br>
<strong>✔ Final Answer: log(${x})</strong>`
    }),
    x => ({
      q: `Solve: ${x}·e^x = ${x*Math.E.toFixed(2)}. Give exact and approximate answers.`,
      ans: `x = 1, i.e. x ≈ 1`,
      steps: `<strong>Step 1:</strong> ${x}·eˣ = ${(x*Math.E).toFixed(2)}<br>
eˣ = ${(x*Math.E).toFixed(2)} / ${x} = e (≈ 2.71828)<br><br>
<strong>Step 2:</strong> Take natural log of both sides:<br>
x = ln(e) = <strong>1</strong><br><br>
<strong>Verification:</strong> ${x}·e¹ = ${x}·2.71828 ≈ ${(x*Math.E).toFixed(2)} ✓<br><br>
<strong>✔ Final Answer: x = 1</strong>`
    }),
    x => ({
      q: `Use change-of-base to evaluate: log₃(${Math.pow(3,x)})`,
      ans: `${x}`,
      steps: `<strong>Change-of-Base Formula:</strong> logₐ(b) = ln(b)/ln(a)<br><br>
log₃(${Math.pow(3,x)}) = ln(${Math.pow(3,x)}) / ln(3)<br>
= ${(Math.log(Math.pow(3,x))).toFixed(4)} / ${Math.log(3).toFixed(4)}<br>
= <strong>${x}</strong><br><br>
<em>Or directly: log₃(3^${x}) = ${x}·log₃(3) = ${x}·1 = ${x}</em><br><br>
<strong>✔ Final Answer: ${x}</strong>`
    }),
    x => ({
      q: `Solve: log₅(x + ${x}) − log₅(x) = log₅(${x+1})`,
      ans: `x = ${x}`,
      steps: `<strong>Step 1:</strong> Combine left side using log(A) − log(B) = log(A/B):<br>
log₅((x + ${x})/x) = log₅(${x+1})<br><br>
<strong>Step 2:</strong> Since logs are equal, arguments are equal:<br>
(x + ${x})/x = ${x+1}<br>
x + ${x} = ${x+1}x<br>
${x} = ${x}x<br>
x = <strong>${x}</strong><br><br>
<strong>✔ Final Answer: x = ${x}</strong>`
    })
  ],

  /* ── 6. SEQUENCES ── */
  sequences: [
    x => ({
      q: `An arithmetic sequence has first term ${x} and common difference ${x+1}. Find the 10th term and sum of the first 10 terms.`,
      ans: `a₁₀ = ${x + 9*(x+1)}, S₁₀ = ${10*x + 45*(x+1)}`,
      steps: `<strong>Arithmetic Sequence Formulas:</strong><br>
aₙ = a + (n−1)d &nbsp;|&nbsp; Sₙ = n/2·[2a + (n−1)d]<br><br>
a = ${x}, d = ${x+1}, n = 10<br><br>
a₁₀ = ${x} + (10−1)(${x+1}) = ${x} + 9×${x+1} = ${x} + ${9*(x+1)} = <strong>${x+9*(x+1)}</strong><br><br>
S₁₀ = 10/2·[2(${x}) + 9(${x+1})]<br>
= 5·[${2*x} + ${9*(x+1)}]<br>
= 5·${2*x+9*(x+1)} = <strong>${5*(2*x+9*(x+1))}</strong><br><br>
<strong>✔ Final Answer: a₁₀ = ${x+9*(x+1)}, S₁₀ = ${5*(2*x+9*(x+1))}</strong>`
    }),
    x => ({
      q: `A geometric sequence has first term ${x} and common ratio ${(x>4?0.5:2)}. Find the 6th term${x>4?" and sum to infinity":""}`,
      ans: x>4
        ? `a₆ = ${(x*Math.pow(0.5,5)).toFixed(4)}, S∞ = ${(x/(1-0.5)).toFixed(4)}`
        : `a₆ = ${x*Math.pow(2,5)}`,
      steps: x>4
        ? `<strong>Geometric Formulas:</strong> aₙ = a·rⁿ⁻¹  |  S∞ = a/(1−r) when |r| < 1<br><br>
a = ${x}, r = 0.5, n = 6<br>
a₆ = ${x}·(0.5)⁵ = ${x} × ${Math.pow(0.5,5)} = <strong>${(x*Math.pow(0.5,5)).toFixed(4)}</strong><br><br>
|r| = 0.5 < 1, so sum to infinity exists:<br>
S∞ = ${x}/(1 − 0.5) = ${x}/0.5 = <strong>${(x/0.5).toFixed(4)}</strong><br><br>
<strong>✔ Answer: a₆ = ${(x*Math.pow(0.5,5)).toFixed(4)}, S∞ = ${(x/0.5).toFixed(4)}</strong>`
        : `<strong>Geometric Formula:</strong> aₙ = a·rⁿ⁻¹<br><br>
a = ${x}, r = 2, n = 6<br>
a₆ = ${x}·2⁵ = ${x} × 32 = <strong>${x*32}</strong><br><br>
Sum of first 6 terms: S₆ = a(rⁿ−1)/(r−1) = ${x}(2⁶−1)/(2−1) = ${x}×63 = <strong>${x*63}</strong><br><br>
<strong>✔ Final Answer: a₆ = ${x*32}, S₆ = ${x*63}</strong>`
    }),
    x => ({
      q: `The nth term of a sequence is given by: Uₙ = ${x}n² − ${x+1}n + ${x}. Find U₁, U₃, and U₅.`,
      ans: `U₁=${x-1}, U₃=${9*x-3*(x+1)+x}, U₅=${25*x-5*(x+1)+x}`,
      steps: `<strong>Substitute n = 1, 3, 5 into Uₙ = ${x}n² − ${x+1}n + ${x}:</strong><br><br>
U₁ = ${x}(1)² − ${x+1}(1) + ${x} = ${x} − ${x+1} + ${x} = <strong>${x-(x+1)+x}</strong><br><br>
U₃ = ${x}(3)² − ${x+1}(3) + ${x} = ${9*x} − ${3*(x+1)} + ${x} = <strong>${9*x-3*(x+1)+x}</strong><br><br>
U₅ = ${x}(5)² − ${x+1}(5) + ${x} = ${25*x} − ${5*(x+1)} + ${x} = <strong>${25*x-5*(x+1)+x}</strong><br><br>
<strong>✔ Final Answer: U₁=${x-(x+1)+x}, U₃=${9*x-3*(x+1)+x}, U₅=${25*x-5*(x+1)+x}</strong>`
    })
  ],

  /* ── 7. COMPLEX NUMBERS ── */
  complex: [
    x => ({
      q: `Find the modulus and argument of z = ${x} + ${x+1}i`,
      ans: `|z| = ${Math.sqrt(x*x+(x+1)*(x+1)).toFixed(4)}, arg(z) = ${(Math.atan2(x+1,x)*180/Math.PI).toFixed(2)}°`,
      steps: `<strong>Modulus:</strong> |z| = √(a² + b²)<br>
|z| = √(${x}² + ${x+1}²) = √(${x*x} + ${(x+1)*(x+1)}) = √${x*x+(x+1)*(x+1)} = <strong>${Math.sqrt(x*x+(x+1)*(x+1)).toFixed(4)}</strong><br><br>
<strong>Argument:</strong> arg(z) = arctan(b/a) [in correct quadrant]<br>
arg(z) = arctan(${x+1}/${x}) = arctan(${((x+1)/x).toFixed(4)}) = <strong>${(Math.atan2(x+1,x)*180/Math.PI).toFixed(2)}°</strong><br><br>
<strong>✔ Final Answer: |z| = ${Math.sqrt(x*x+(x+1)*(x+1)).toFixed(4)}, arg = ${(Math.atan2(x+1,x)*180/Math.PI).toFixed(2)}°</strong>`
    }),
    x => ({
      q: `Multiply: (${x} + ${x+1}i)(${x+2} − ${x}i)`,
      ans: `${x*(x+2)+(x+1)*x} + ${x*(-(x))+(x+1)*(x+2)}i`,
      steps: `<strong>Use FOIL / distributive law (remember i² = −1):</strong><br><br>
(${x} + ${x+1}i)(${x+2} − ${x}i)<br>
= ${x}·${x+2} + ${x}·(−${x}i) + ${x+1}i·${x+2} + ${x+1}i·(−${x}i)<br>
= ${x*(x+2)} − ${x*x}i + ${(x+1)*(x+2)}i − ${(x+1)*x}i²<br>
= ${x*(x+2)} − ${x*x}i + ${(x+1)*(x+2)}i + ${(x+1)*x}  [since i²=−1]<br>
= (${x*(x+2)} + ${(x+1)*x}) + (${(x+1)*(x+2)} − ${x*x})i<br>
= <strong>${x*(x+2)+(x+1)*x} + ${(x+1)*(x+2)-x*x}i</strong><br><br>
<strong>✔ Final Answer: ${x*(x+2)+(x+1)*x} + ${(x+1)*(x+2)-x*x}i</strong>`
    }),
    x => ({
      q: `Divide: (${x*x + (x+1)*x} + ${(x+1)*(x+2)-x*x}i) / (${x+2} − ${x}i)`,
      ans: `${x} + ${x+1}i`,
      steps: `<strong>Multiply numerator and denominator by conjugate of denominator:</strong><br>
Conjugate of (${x+2} − ${x}i) is (${x+2} + ${x}i)<br><br>
Denominator: (${x+2})² + (${x})² = ${(x+2)*(x+2)} + ${x*x} = ${(x+2)*(x+2)+x*x}<br><br>
Numerator: expand (${x*(x+2)+(x+1)*x} + ${(x+1)*(x+2)-x*x}i)(${x+2} + ${x}i)<br>
Real part: ${x*(x+2)+(x+1)*x}·${x+2} + ${(x+1)*(x+2)-x*x}·${x} × (−1) [from i²]<br>
...after calculation → real = ${x*((x+2)*(x+2)+x*x)}, imag = ${(x+1)*((x+2)*(x+2)+x*x)}<br><br>
Divide by ${(x+2)*(x+2)+x*x}:<br>
= <strong>${x} + ${x+1}i</strong><br><br>
<strong>✔ Final Answer: ${x} + ${x+1}i</strong>`
    }),
    x => ({
      q: `Find the conjugate of z = ${x} − ${x+1}i, and compute z·z*`,
      ans: `z* = ${x} + ${x+1}i, z·z* = ${x*x+(x+1)*(x+1)}`,
      steps: `<strong>Conjugate:</strong> change sign of imaginary part:<br>
z = ${x} − ${x+1}i → z* = <strong>${x} + ${x+1}i</strong><br><br>
<strong>Product z·z*:</strong> (a+bi)(a−bi) = a² + b²<br>
z·z* = ${x}² + ${x+1}² = ${x*x} + ${(x+1)*(x+1)} = <strong>${x*x+(x+1)*(x+1)}</strong><br><br>
Note: z·z* = |z|² (always real and non-negative)<br><br>
<strong>✔ Final Answer: z* = ${x}+${x+1}i, z·z* = ${x*x+(x+1)*(x+1)}</strong>`
    })
  ],

  /* ── 8. TRIGONOMETRY ── */
  trigonometry: [
    x => ({
      q: `Without a calculator, find the exact value of sin(${[30,45,60,90,120,135,150,180][x%8]}°)`,
      ans: `${['\u00bd','√2/2','√3/2','1','√3/2','√2/2','\u00bd','0'][x%8]}`,
      steps: `<strong>Standard angle values (memorise these!):</strong><br><br>
sin(30°) = 1/2, sin(45°) = √2/2, sin(60°) = √3/2, sin(90°) = 1<br>
sin(120°) = sin(180°−60°) = sin(60°) = √3/2<br>
sin(135°) = sin(180°−45°) = sin(45°) = √2/2<br>
sin(150°) = sin(180°−30°) = sin(30°) = 1/2<br>
sin(180°) = 0<br><br>
<strong>✔ Answer: sin(${[30,45,60,90,120,135,150,180][x%8]}°) = ${['\u00bd','√2/2','√3/2','1','√3/2','√2/2','\u00bd','0'][x%8]}</strong>`
    }),
    x => ({
      q: `Solve for 0° ≤ θ ≤ 360°: sin(θ) = ${(x%2===0?'0.5':'-0.5')}`,
      ans: x%2===0 ? `θ = 30° or θ = 150°` : `θ = 210° or θ = 330°`,
      steps: `<strong>Step 1:</strong> Principal value = arcsin(${x%2===0?'0.5':'-0.5'}) = ${x%2===0?'30°':'-30°'}<br><br>
<strong>Step 2:</strong> sin is positive in Q1 and Q2, negative in Q3 and Q4<br><br>
${x%2===0
  ? `sin is positive, so solutions in Q1 and Q2:<br>θ₁ = 30°<br>θ₂ = 180° − 30° = 150°`
  : `sin is negative, so solutions in Q3 and Q4:<br>θ₁ = 180° + 30° = 210°<br>θ₂ = 360° − 30° = 330°`}<br><br>
<strong>✔ Final Answer: ${x%2===0?'θ = 30° or θ = 150°':'θ = 210° or θ = 330°'}</strong>`
    }),
    x => ({
      q: `In triangle ABC: a = ${x+2}, b = ${x+4}, angle C = ${30+x*5}°. Find side c using the cosine rule.`,
      ans: `c = ${(Math.sqrt((x+2)*(x+2)+(x+4)*(x+4)-2*(x+2)*(x+4)*Math.cos((30+x*5)*Math.PI/180))).toFixed(3)}`,
      steps: `<strong>Cosine Rule:</strong> c² = a² + b² − 2ab·cos(C)<br><br>
a = ${x+2}, b = ${x+4}, C = ${30+x*5}°<br>
cos(${30+x*5}°) = ${Math.cos((30+x*5)*Math.PI/180).toFixed(4)}<br><br>
c² = ${(x+2)*(x+2)} + ${(x+4)*(x+4)} − 2·${x+2}·${x+4}·${Math.cos((30+x*5)*Math.PI/180).toFixed(4)}<br>
c² = ${(x+2)*(x+2)+(x+4)*(x+4)} − ${(2*(x+2)*(x+4)*Math.cos((30+x*5)*Math.PI/180)).toFixed(4)}<br>
c² = ${((x+2)*(x+2)+(x+4)*(x+4)-2*(x+2)*(x+4)*Math.cos((30+x*5)*Math.PI/180)).toFixed(4)}<br>
c = <strong>${(Math.sqrt((x+2)*(x+2)+(x+4)*(x+4)-2*(x+2)*(x+4)*Math.cos((30+x*5)*Math.PI/180))).toFixed(3)}</strong><br><br>
<strong>✔ Final Answer: c ≈ ${(Math.sqrt((x+2)*(x+2)+(x+4)*(x+4)-2*(x+2)*(x+4)*Math.cos((30+x*5)*Math.PI/180))).toFixed(3)}</strong>`
    }),
    x => ({
      q: `Prove / verify the identity for θ = ${x*10}°: sin²(θ) + cos²(θ) = 1`,
      ans: `1 = 1 ✓`,
      steps: `<strong>Pythagorean Identity:</strong> sin²θ + cos²θ = 1 (always true)<br><br>
<strong>Verify with θ = ${x*10}°:</strong><br>
sin(${x*10}°) = ${Math.sin(x*10*Math.PI/180).toFixed(6)}<br>
cos(${x*10}°) = ${Math.cos(x*10*Math.PI/180).toFixed(6)}<br><br>
sin²(${x*10}°) = ${Math.pow(Math.sin(x*10*Math.PI/180),2).toFixed(6)}<br>
cos²(${x*10}°) = ${Math.pow(Math.cos(x*10*Math.PI/180),2).toFixed(6)}<br><br>
Sum = ${(Math.pow(Math.sin(x*10*Math.PI/180),2)+Math.pow(Math.cos(x*10*Math.PI/180),2)).toFixed(6)} ≈ 1 ✓<br><br>
<strong>Other key identities to know:</strong><br>
• 1 + tan²θ = sec²θ<br>
• 1 + cot²θ = cosec²θ<br>
• sin(2θ) = 2sinθcosθ<br>
• cos(2θ) = cos²θ − sin²θ<br><br>
<strong>✔ Identity verified: 1 = 1 ✓</strong>`
    })
  ],

  /* ── 9. STATISTICS ── */
  statistics: [
    x => {
      const data = [x, x+2, x+4, x+1, x+5, x+3, x+2, x+6];
      const mean = data.reduce((a,b)=>a+b,0)/data.length;
      const sorted = [...data].sort((a,b)=>a-b);
      const median = (sorted[3]+sorted[4])/2;
      const variance = data.reduce((s,v)=>s+(v-mean)**2,0)/data.length;
      const sd = Math.sqrt(variance);
      return {
        q: `Find the mean, median, and standard deviation of: ${data.join(', ')}`,
        ans: `Mean=${mean.toFixed(2)}, Median=${median.toFixed(2)}, SD=${sd.toFixed(4)}`,
        steps: `<strong>Step 1 — Mean:</strong><br>
Sum = ${data.join(' + ')} = ${data.reduce((a,b)=>a+b,0)}<br>
Mean = ${data.reduce((a,b)=>a+b,0)} ÷ ${data.length} = <strong>${mean.toFixed(2)}</strong><br><br>
<strong>Step 2 — Median (sort first):</strong><br>
Sorted: ${sorted.join(', ')}<br>
n = ${data.length} (even) → Median = (${sorted[3]} + ${sorted[4]}) / 2 = <strong>${median.toFixed(2)}</strong><br><br>
<strong>Step 3 — Standard Deviation:</strong><br>
Deviations from mean: ${data.map(v=>(v-mean).toFixed(2)).join(', ')}<br>
Squared deviations: ${data.map(v=>((v-mean)**2).toFixed(4)).join(', ')}<br>
Variance = ${variance.toFixed(4)}<br>
SD = √${variance.toFixed(4)} = <strong>${sd.toFixed(4)}</strong><br><br>
<strong>✔ Mean=${mean.toFixed(2)}, Median=${median.toFixed(2)}, SD=${sd.toFixed(4)}</strong>`
      };
    },
    x => ({
      q: `A bag has ${x+2} red and ${x+3} blue balls. Find P(red) and P(two reds without replacement).`,
      ans: `P(red)=${(x+2)/(2*x+5)}, P(2 reds)=${((x+2)*(x+1))/((2*x+5)*(2*x+4))}`,
      steps: `<strong>Total balls:</strong> ${x+2} + ${x+3} = ${2*x+5}<br><br>
<strong>P(red):</strong> = ${x+2}/${2*x+5} = <strong>${((x+2)/(2*x+5)).toFixed(4)}</strong><br><br>
<strong>P(2 reds, without replacement):</strong><br>
P(1st red) = ${x+2}/${2*x+5}<br>
P(2nd red | 1st was red) = ${x+1}/${2*x+4}  [one less red and one less total]<br>
P(both red) = (${x+2}/${2*x+5}) × (${x+1}/${2*x+4})<br>
= ${(x+2)*(x+1)} / ${(2*x+5)*(2*x+4)} = <strong>${(((x+2)*(x+1))/((2*x+5)*(2*x+4))).toFixed(4)}</strong><br><br>
<strong>✔ P(red)=${((x+2)/(2*x+5)).toFixed(4)}, P(2 reds)=${(((x+2)*(x+1))/((2*x+5)*(2*x+4))).toFixed(4)}</strong>`
    }),
    x => ({
      q: `Find C(${x+5}, ${x}) — how many ways to choose ${x} items from ${x+5}?`,
      ans: `${(()=>{let n=x+5,k=x,r=1;for(let i=0;i<k;i++)r=r*(n-i)/(i+1);return Math.round(r)})()}`,
      steps: `<strong>Combination Formula:</strong> C(n, r) = n! / [r!(n−r)!]<br><br>
C(${x+5}, ${x}) = (${x+5})! / [${x}! × ${5}!]<br><br>
Compute step by step:<br>
= [${Array.from({length:x},(_,i)=>x+5-i).join(' × ')}] / [${Array.from({length:x},(_,i)=>i+1).join(' × ')}]<br>
= ${(()=>{let n=x+5,k=x,r=1;for(let i=0;i<k;i++)r=r*(n-i)/(i+1);return Math.round(r)})()}<br><br>
<strong>✔ C(${x+5},${x}) = ${(()=>{let n=x+5,k=x,r=1;for(let i=0;i<k;i++)r=r*(n-i)/(i+1);return Math.round(r)})()}</strong>`
    })
  ],

  /* ── 10. MATRICES ── */
  matrices: [
    x => ({
      q: `Find the determinant and inverse of A = [[${x}, ${x+1}], [${x+2}, ${x+4}]]`,
      ans: `det=${x*(x+4)-(x+1)*(x+2)}, A⁻¹=[[${x+4}/det, ${-(x+1)}/det], [${-(x+2)}/det, ${x}/det]]`,
      steps: `<strong>Step 1 — Determinant:</strong><br>
det(A) = ad − bc = (${x})(${x+4}) − (${x+1})(${x+2})<br>
= ${x*(x+4)} − ${(x+1)*(x+2)} = <strong>${x*(x+4)-(x+1)*(x+2)}</strong><br><br>
<strong>Step 2 — Inverse (det ≠ 0):</strong><br>
A⁻¹ = (1/det) × [[d, −b], [−c, a]]<br>
= (1/${x*(x+4)-(x+1)*(x+2)}) × [[${x+4}, −${x+1}], [−${x+2}, ${x}]]<br><br>
= [[${(x+4)/(x*(x+4)-(x+1)*(x+2))}  , ${-(x+1)/(x*(x+4)-(x+1)*(x+2))}],<br>
   [${-(x+2)/(x*(x+4)-(x+1)*(x+2))}, ${x/(x*(x+4)-(x+1)*(x+2))}]]<br><br>
<strong>✔ det = ${x*(x+4)-(x+1)*(x+2)}</strong> (matrix is ${x*(x+4)-(x+1)*(x+2)!==0?'invertible':'singular'})`.replace('undefined','')
    }),
    x => ({
      q: `Multiply: A = [[${x}, ${x+1}], [${x+2}, ${x+3}]] × B = [[${x+1}, ${x}], [${x+2}, ${x+3}]]`,
      ans: `[[${x*(x+1)+(x+1)*(x+2)}, ${x*x+(x+1)*(x+3)}], [${(x+2)*(x+1)+(x+3)*(x+2)}, ${(x+2)*x+(x+3)*(x+3)}]]`,
      steps: `<strong>Matrix Multiplication (row × column):</strong><br><br>
C₁₁ = ${x}·${x+1} + ${x+1}·${x+2} = ${x*(x+1)} + ${(x+1)*(x+2)} = <strong>${x*(x+1)+(x+1)*(x+2)}</strong><br>
C₁₂ = ${x}·${x} + ${x+1}·${x+3} = ${x*x} + ${(x+1)*(x+3)} = <strong>${x*x+(x+1)*(x+3)}</strong><br>
C₂₁ = ${x+2}·${x+1} + ${x+3}·${x+2} = ${(x+2)*(x+1)} + ${(x+3)*(x+2)} = <strong>${(x+2)*(x+1)+(x+3)*(x+2)}</strong><br>
C₂₂ = ${x+2}·${x} + ${x+3}·${x+3} = ${(x+2)*x} + ${(x+3)*(x+3)} = <strong>${(x+2)*x+(x+3)*(x+3)}</strong><br><br>
<strong>✔ AB = [[${x*(x+1)+(x+1)*(x+2)}, ${x*x+(x+1)*(x+3)}], [${(x+2)*(x+1)+(x+3)*(x+2)}, ${(x+2)*x+(x+3)*(x+3)}]]</strong>`
    }),
    x => ({
      q: `Find the eigenvalues of M = [[${x+2}, 1], [1, ${x+2}]]`,
      ans: `λ₁ = ${x+3}, λ₂ = ${x+1}`,
      steps: `<strong>Characteristic equation:</strong> det(M − λI) = 0<br><br>
M − λI = [[${x+2}−λ, 1], [1, ${x+2}−λ]<br><br>
det = (${x+2}−λ)² − 1 = 0<br>
(${x+2}−λ)² = 1<br>
${x+2}−λ = ±1<br><br>
λ₁ = ${x+2} − 1 = <strong>${x+1}</strong><br>
λ₂ = ${x+2} + 1 = <strong>${x+3}</strong><br><br>
<strong>Verification:</strong> tr(M) = ${2*(x+2)} = λ₁+λ₂ = ${(x+1)+(x+3)} ✓<br>
det(M) = ${(x+2)*(x+2)-1} = λ₁·λ₂ = ${(x+1)*(x+3)} ✓<br><br>
<strong>✔ Eigenvalues: λ₁ = ${x+1}, λ₂ = ${x+3}</strong>`
    })
  ],

  /* ── 11. VECTORS ── */
  vectors: [
    x => {
      const a=[x, x+1, x+2], b=[x+2, x, x+1];
      const dot=a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
      const ma=Math.sqrt(a.reduce((s,v)=>s+v*v,0));
      const mb=Math.sqrt(b.reduce((s,v)=>s+v*v,0));
      const angle=(Math.acos(dot/(ma*mb))*180/Math.PI).toFixed(2);
      return {
        q: `For a = (${a.join(', ')}) and b = (${b.join(', ')}), find: (i) a·b (ii) |a| (iii) angle between them`,
        ans: `a·b=${dot}, |a|=${ma.toFixed(4)}, θ=${angle}°`,
        steps: `<strong>Dot Product:</strong> a·b = a₁b₁ + a₂b₂ + a₃b₃<br>
= ${a[0]}·${b[0]} + ${a[1]}·${b[1]} + ${a[2]}·${b[2]}<br>
= ${a[0]*b[0]} + ${a[1]*b[1]} + ${a[2]*b[2]} = <strong>${dot}</strong><br><br>
<strong>Magnitude |a|:</strong> = √(${a.map(v=>v+'²').join('+')})<br>
= √(${a.map(v=>v*v).join('+')})<br>
= √${a.reduce((s,v)=>s+v*v,0)} = <strong>${ma.toFixed(4)}</strong><br><br>
<strong>|b|:</strong> = √${b.reduce((s,v)=>s+v*v,0)} = ${mb.toFixed(4)}<br><br>
<strong>Angle:</strong> cos θ = a·b / (|a||b|) = ${dot} / (${ma.toFixed(4)} × ${mb.toFixed(4)})<br>
= ${(dot/(ma*mb)).toFixed(6)}<br>
θ = arccos(${(dot/(ma*mb)).toFixed(6)}) = <strong>${angle}°</strong><br><br>
<strong>✔ a·b=${dot}, |a|=${ma.toFixed(4)}, θ=${angle}°</strong>`
      };
    },
    x => {
      const a=[x, x+1, x+2], b=[x+2, x, x+1];
      const cross=[a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
      return {
        q: `Find the cross product of a = (${a.join(', ')}) and b = (${b.join(', ')})`,
        ans: `a×b = (${cross.join(', ')})`,
        steps: `<strong>Cross Product Formula:</strong><br>
a × b = |i   j   k  |<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|${a.join('  ')}|<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|${b.join('  ')}|<br><br>
i-component: (${a[1]})(${b[2]}) − (${a[2]})(${b[1]}) = ${a[1]*b[2]} − ${a[2]*b[1]} = <strong>${cross[0]}</strong><br>
j-component: −[(${a[0]})(${b[2]}) − (${a[2]})(${b[0]})] = −[${a[0]*b[2]} − ${a[2]*b[0]}] = <strong>${cross[1]}</strong><br>
k-component: (${a[0]})(${b[1]}) − (${a[1]})(${b[0]}) = ${a[0]*b[1]} − ${a[1]*b[0]} = <strong>${cross[2]}</strong><br><br>
<strong>✔ a × b = (${cross.join(', ')})</strong><br>
Verify: a·(a×b) = ${a[0]*cross[0]+a[1]*cross[1]+a[2]*cross[2]} = 0 ✓ (perpendicular to both)`
      };
    },
    x => {
      const mag = Math.sqrt(x*x+(x+1)*(x+1)+(x+2)*(x+2));
      return {
        q: `Find the unit vector in the direction of v = (${x}, ${x+1}, ${x+2})`,
        ans: `û = (${(x/mag).toFixed(4)}, ${((x+1)/mag).toFixed(4)}, ${((x+2)/mag).toFixed(4)})`,
        steps: `<strong>Step 1 — Find |v|:</strong><br>
|v| = √(${x}² + ${x+1}² + ${x+2}²) = √(${x*x} + ${(x+1)*(x+1)} + ${(x+2)*(x+2)})<br>
= √${x*x+(x+1)*(x+1)+(x+2)*(x+2)} = <strong>${mag.toFixed(4)}</strong><br><br>
<strong>Step 2 — Divide each component by |v|:</strong><br>
û = v / |v| = (${x}/${mag.toFixed(4)}, ${x+1}/${mag.toFixed(4)}, ${x+2}/${mag.toFixed(4)})<br>
= <strong>(${(x/mag).toFixed(4)}, ${((x+1)/mag).toFixed(4)}, ${((x+2)/mag).toFixed(4)})</strong><br><br>
<strong>Verify:</strong> |û| = √(${(x/mag).toFixed(4)}² + ...) ≈ 1 ✓<br><br>
<strong>✔ û = (${(x/mag).toFixed(4)}, ${((x+1)/mag).toFixed(4)}, ${((x+2)/mag).toFixed(4)})</strong>`
      };
    }
  ],

  /* ── 12. AREAS OF SHAPES ── */
  areas: [
    x => ({
      q: `Find the area of a sector with radius ${x+3} cm and angle ${30+x*10}°`,
      ans: `${(0.5*(x+3)*(x+3)*(30+x*10)*Math.PI/180).toFixed(4)} cm²`,
      steps: `<strong>Sector Area Formula:</strong> A = ½r²θ  (θ must be in radians)<br><br>
r = ${x+3}, θ = ${30+x*10}°<br>
Convert to radians: θ = ${30+x*10} × π/180 = ${((30+x*10)*Math.PI/180).toFixed(4)} rad<br><br>
A = ½ × (${x+3})² × ${((30+x*10)*Math.PI/180).toFixed(4)}<br>
A = ½ × ${(x+3)*(x+3)} × ${((30+x*10)*Math.PI/180).toFixed(4)}<br>
A = <strong>${(0.5*(x+3)*(x+3)*(30+x*10)*Math.PI/180).toFixed(4)} cm²</strong><br><br>
<strong>✔ Area = ${(0.5*(x+3)*(x+3)*(30+x*10)*Math.PI/180).toFixed(4)} cm²</strong>`
    }),
    x => ({
      q: `Find the area of an equilateral triangle with side ${x+3} cm`,
      ans: `${((Math.sqrt(3)/4)*(x+3)*(x+3)).toFixed(4)} cm²`,
      steps: `<strong>Equilateral Triangle Area:</strong> A = (√3/4)·s²<br><br>
s = ${x+3} cm<br>
A = (√3/4) × (${x+3})² = (√3/4) × ${(x+3)*(x+3)}<br>
A = ${(Math.sqrt(3)/4).toFixed(6)} × ${(x+3)*(x+3)}<br>
A = <strong>${((Math.sqrt(3)/4)*(x+3)*(x+3)).toFixed(4)} cm²</strong><br><br>
<em>Derivation: drop a perpendicular of height h = s√3/2</em><br>
h = ${x+3}·√3/2 = ${((x+3)*Math.sqrt(3)/2).toFixed(4)} cm<br>
A = ½·${x+3}·${((x+3)*Math.sqrt(3)/2).toFixed(4)} = ${((Math.sqrt(3)/4)*(x+3)*(x+3)).toFixed(4)} cm² ✓<br><br>
<strong>✔ Area = ${((Math.sqrt(3)/4)*(x+3)*(x+3)).toFixed(4)} cm²</strong>`
    }),
    x => ({
      q: `Find the area of a trapezium with parallel sides ${x+2} cm and ${x+5} cm, and height ${x+3} cm`,
      ans: `${(0.5*((x+2)+(x+5))*(x+3)).toFixed(2)} cm²`,
      steps: `<strong>Trapezium Area:</strong> A = ½(a + b) × h<br><br>
a = ${x+2}, b = ${x+5}, h = ${x+3}<br>
A = ½ × (${x+2} + ${x+5}) × ${x+3}<br>
A = ½ × ${(x+2)+(x+5)} × ${x+3}<br>
A = ${0.5*((x+2)+(x+5))} × ${x+3}<br>
A = <strong>${(0.5*((x+2)+(x+5))*(x+3)).toFixed(2)} cm²</strong><br><br>
<strong>✔ Area = ${(0.5*((x+2)+(x+5))*(x+3)).toFixed(2)} cm²</strong>`
    }),
    x => ({
      q: `Find: (i) circumference and (ii) area of a circle with diameter ${2*(x+3)} cm`,
      ans: `C=${(Math.PI*2*(x+3)).toFixed(4)} cm, A=${(Math.PI*(x+3)*(x+3)).toFixed(4)} cm²`,
      steps: `<strong>Radius:</strong> r = diameter/2 = ${2*(x+3)}/2 = ${x+3} cm<br><br>
<strong>Circumference:</strong> C = 2πr = 2π × ${x+3} = ${2*(x+3)}π = <strong>${(2*Math.PI*(x+3)).toFixed(4)} cm</strong><br><br>
<strong>Area:</strong> A = πr² = π × (${x+3})² = ${(x+3)*(x+3)}π = <strong>${(Math.PI*(x+3)*(x+3)).toFixed(4)} cm²</strong><br><br>
<strong>✔ C = ${(2*Math.PI*(x+3)).toFixed(4)} cm, A = ${(Math.PI*(x+3)*(x+3)).toFixed(4)} cm²</strong>`
    })
  ],

  /* ── 13. VOLUMES OF SOLIDS ── */
  volumes: [
    x => ({
      q: `Find the volume and surface area of a sphere with radius ${x+2} cm`,
      ans: `V=${((4/3)*Math.PI*Math.pow(x+2,3)).toFixed(4)} cm³, SA=${(4*Math.PI*(x+2)*(x+2)).toFixed(4)} cm²`,
      steps: `<strong>Sphere Formulas:</strong> V = (4/3)πr³  |  SA = 4πr²<br><br>
r = ${x+2} cm<br><br>
<strong>Volume:</strong> V = (4/3) × π × (${x+2})³<br>
= (4/3) × π × ${Math.pow(x+2,3)}<br>
= <strong>${((4/3)*Math.PI*Math.pow(x+2,3)).toFixed(4)} cm³</strong><br><br>
<strong>Surface Area:</strong> SA = 4 × π × (${x+2})²<br>
= 4 × π × ${(x+2)*(x+2)}<br>
= <strong>${(4*Math.PI*(x+2)*(x+2)).toFixed(4)} cm²</strong><br><br>
<strong>✔ V=${((4/3)*Math.PI*Math.pow(x+2,3)).toFixed(4)} cm³, SA=${(4*Math.PI*(x+2)*(x+2)).toFixed(4)} cm²</strong>`
    }),
    x => ({
      q: `A cone has radius ${x+2} cm and height ${x+4} cm. Find its volume and total surface area.`,
      ans: `V=${((Math.PI/3)*(x+2)*(x+2)*(x+4)).toFixed(4)} cm³`,
      steps: `<strong>Cone Formulas:</strong> V = (1/3)πr²h  |  Slant l = √(r²+h²)  |  TSA = πr(r+l)<br><br>
r = ${x+2}, h = ${x+4}<br>
Slant height: l = √(${x+2}² + ${x+4}²) = √${(x+2)*(x+2)+(x+4)*(x+4)} = <strong>${Math.sqrt((x+2)*(x+2)+(x+4)*(x+4)).toFixed(4)} cm</strong><br><br>
<strong>Volume:</strong> V = (1/3)π(${x+2})²(${x+4})<br>
= (1/3) × π × ${(x+2)*(x+2)} × ${x+4}<br>
= <strong>${((Math.PI/3)*(x+2)*(x+2)*(x+4)).toFixed(4)} cm³</strong><br><br>
<strong>TSA:</strong> = π × ${x+2} × (${x+2} + ${Math.sqrt((x+2)*(x+2)+(x+4)*(x+4)).toFixed(4)})<br>
= <strong>${(Math.PI*(x+2)*((x+2)+Math.sqrt((x+2)*(x+2)+(x+4)*(x+4)))).toFixed(4)} cm²</strong><br><br>
<strong>✔ V=${((Math.PI/3)*(x+2)*(x+2)*(x+4)).toFixed(4)} cm³</strong>`
    }),
    x => ({
      q: `Find the volume of a frustum (truncated cone): large radius ${x+5}, small radius ${x+2}, height ${x+3}`,
      ans: `V=${((Math.PI*(x+3)/3)*((x+5)*(x+5)+(x+5)*(x+2)+(x+2)*(x+2))).toFixed(4)} cm³`,
      steps: `<strong>Frustum Volume:</strong> V = (πh/3)(R² + Rr + r²)<br><br>
R = ${x+5} (large radius), r = ${x+2} (small radius), h = ${x+3}<br><br>
R² = ${(x+5)*(x+5)}<br>
Rr = ${(x+5)*(x+2)}<br>
r² = ${(x+2)*(x+2)}<br>
R² + Rr + r² = ${(x+5)*(x+5)} + ${(x+5)*(x+2)} + ${(x+2)*(x+2)} = ${(x+5)*(x+5)+(x+5)*(x+2)+(x+2)*(x+2)}<br><br>
V = (π × ${x+3}/3) × ${(x+5)*(x+5)+(x+5)*(x+2)+(x+2)*(x+2)}<br>
V = <strong>${((Math.PI*(x+3)/3)*((x+5)*(x+5)+(x+5)*(x+2)+(x+2)*(x+2))).toFixed(4)} cm³</strong><br><br>
<strong>✔ V = ${((Math.PI*(x+3)/3)*((x+5)*(x+5)+(x+5)*(x+2)+(x+2)*(x+2))).toFixed(4)} cm³</strong>`
    }),
    x => ({
      q: `A cylinder has radius ${x+2} cm and height ${x+5} cm. Find volume and curved surface area.`,
      ans: `V=${(Math.PI*(x+2)*(x+2)*(x+5)).toFixed(4)} cm³, CSA=${(2*Math.PI*(x+2)*(x+5)).toFixed(4)} cm²`,
      steps: `<strong>Cylinder Formulas:</strong> V = πr²h  |  CSA = 2πrh  |  TSA = 2πr(r+h)<br><br>
r = ${x+2}, h = ${x+5}<br><br>
<strong>Volume:</strong> V = π × (${x+2})² × ${x+5} = π × ${(x+2)*(x+2)} × ${x+5}<br>
= <strong>${(Math.PI*(x+2)*(x+2)*(x+5)).toFixed(4)} cm³</strong><br><br>
<strong>Curved Surface Area:</strong> CSA = 2π × ${x+2} × ${x+5}<br>
= <strong>${(2*Math.PI*(x+2)*(x+5)).toFixed(4)} cm²</strong><br><br>
<strong>Total Surface Area:</strong> TSA = 2π × ${x+2} × (${x+2} + ${x+5})<br>
= <strong>${(2*Math.PI*(x+2)*((x+2)+(x+5))).toFixed(4)} cm²</strong><br><br>
<strong>✔ V=${(Math.PI*(x+2)*(x+2)*(x+5)).toFixed(4)} cm³, CSA=${(2*Math.PI*(x+2)*(x+5)).toFixed(4)} cm²</strong>`
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
  const rnd = Math.floor(Math.random() * 11) + 2; // 2–12
  const generators = taskFormulas[t];
  if (!generators) { alert("Topic not found. Please choose from the list."); return; }
  const fn = generators[Math.floor(Math.random() * generators.length)];
  currentTask = fn(rnd);
  taskDisplay.innerHTML       = currentTask.q;
  answerInput.value           = "";
  resultDisplay.innerHTML     = "";
  resultDisplay.className     = "";
  solutionSteps.innerHTML     = "";
  answerRow.style.display     = "flex";
  if (typeof MathProgress !== "undefined") {
    const nameMap = {
      differentiation:"Differentiation", integration:"Integration",
      limits:"Limits", algebra:"Algebra", logarithms:"Logarithms",
      sequences:"Sequences", complex:"Complex Numbers",
      trigonometry:"Trigonometry", statistics:"Statistics",
      matrices:"Matrices", vectors:"Vectors",
      areas:"Areas", volumes:"Volumes"
    };
    MathProgress.recordTopicViewed(nameMap[t] || t);
  }
  if (window.MathJax) MathJax.typesetPromise([taskDisplay]).catch(()=>{});
});

/* ═══════════════════════════════════════════════════════════════
   CHECK ANSWER
   ═══════════════════════════════════════════════════════════════ */
document.getElementById("submitAnswer").addEventListener("click", () => {
  if (!currentTask) { alert("Generate a problem first!"); return; }
  const userAns    = answerInput.value.trim();
  const correctAns = currentTask.ans;
  if (!userAns) { resultDisplay.textContent = "Please enter an answer."; return; }
  const norm = s => String(s).toLowerCase().replace(/\s+/g,"").replace(/[×·]/g,"*").replace(/−/g,"-").replace(/≈/g,"").replace(/\u00bd/g,"0.5");
  const numOnly = /^-?\d+(\.\d+)?$/.test(String(correctAns).trim());
  let isCorrect = false;
  if (numOnly) {
    const uv = parseFloat(userAns.replace(/[^0-9.\-]/g,""));
    const cv = parseFloat(correctAns);
    isCorrect = !isNaN(uv) && Math.abs(uv - cv) < 0.06;
  } else {
    isCorrect = norm(userAns) === norm(correctAns);
  }
  if (isCorrect) {
    resultDisplay.innerHTML = "✓ Correct — excellent work!";
    resultDisplay.className = "correct";
    if (typeof MathProgress !== "undefined") {
      const topicMap = { differentiation:"calculus", integration:"calculus",
        limits:"calculus", algebra:"algebra", logarithms:"algebra",
        sequences:"algebra", complex:"algebra", trigonometry:"geometry",
        statistics:"statistics", matrices:"algebra", vectors:"algebra",
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
    resultDisplay.innerHTML = "✗ Not quite — study the steps below and try again.";
    resultDisplay.className = "incorrect";
    if (typeof MathProgress !== "undefined") {
      const topicMap = { differentiation:"calculus", integration:"calculus",
        limits:"calculus", algebra:"algebra", logarithms:"algebra",
        sequences:"algebra", complex:"algebra", trigonometry:"geometry",
        statistics:"statistics", matrices:"algebra", vectors:"algebra",
        areas:"geometry", volumes:"geometry" };
      MathProgress.recordProblemSolved(topicMap[currentTopic]||"algebra", false, currentTask.q.slice(0,60));
    }
  }
  solutionSteps.innerHTML = `<div class="steps-header">Step-by-step solution</div>${currentTask.steps}`;
  if (window.MathJax) MathJax.typesetPromise([solutionSteps]).catch(()=>{});
});

/* ═══════════════════════════════════════════════════════════════
   ███████████████████████████████████████████████████████████
   ADVANCED MATHEMATICS ENGINE v3.0
   Covers ALL 13 topics + unlimited math questions
   ███████████████████████████████████████████████████████████
   ═══════════════════════════════════════════════════════════════ */
const MathEngine = (function () {

  const PI = Math.PI;
  const E  = Math.E;

  /* ── Utility helpers ── */
  const dp = (n, d=6) => {
    if (!isFinite(n)) return String(n);
    const v = +n.toFixed(d);
    return v === Math.round(v) ? String(Math.round(v)) : String(v);
  };
  const toRad = d => d * PI / 180;
  const toDeg = r => r * 180 / PI;
  const gcd   = (a, b) => b===0 ? Math.abs(a) : gcd(b, a%b);
  const lcm   = (a, b) => Math.abs(a*b)/gcd(a,b);
  const factorial = n => { if(n<=1)return 1; let r=1; for(let i=2;i<=n;i++)r*=i; return r; };
  const nCr   = (n,k) => {
    if(k<0||k>n)return 0; if(k===0||k===n)return 1;
    k=Math.min(k,n-k); let c=1;
    for(let i=0;i<k;i++) c=c*(n-i)/(i+1);
    return Math.round(c);
  };
  const nPr   = (n,k) => { let r=1; for(let i=0;i<k;i++) r*=(n-i); return r; };
  const isPrime = n => { if(n<2)return false; for(let i=2;i<=Math.sqrt(n);i++) if(n%i===0)return false; return true; };
  const primeFactors = n => { const f=[]; let d=2; while(n>1){while(n%d===0){f.push(d);n/=d;}d++;} return f; };
  const nums = q => (q.match(/-?\d+\.?\d*/g)||[]).map(Number);

  /* ── HTML builders ── */
  const ST = (n, t) => `<div class="solution-step"><span class="step-num">Step ${n}</span><div class="step-body">${t}</div></div>`;
  const NO = t => `<div class="solution-note">${t}</div>`;
  const AN = t => `<div class="final-answer-block">✔ <strong>Final Answer:</strong> ${t}</div>`;
  const RL = t => `<div class="rule-box">📐 <em>${t}</em></div>`;

  /* ═══════════════════════════════════════
     1. DIFFERENTIATION ENGINE
     ═══════════════════════════════════════ */
  function differentiate(raw) {
    const q = raw.toLowerCase().replace(/−/g,"-").replace(/\s/g,"");

    /* Trig functions */
    const trigMap = {sin:"cos", cos:"-sin", tan:"sec²", sec:"sec·tan", cosec:"-cosec·cot", cot:"-cosec²"};
    for (const [fn, deriv] of Object.entries(trigMap)) {
      const rx = new RegExp(`([+\\-]?\\d*\\.?\\d*)\\*?${fn}\\(([^)]+)\\)`);
      const m  = q.match(rx);
      if (m) {
        const a = m[1]===''||m[1]==='+'?1:m[1]==='-'?-1:parseFloat(m[1])||1;
        const inner = m[2];
        const kM = inner.match(/^([+\-]?\d*\.?\d*)x$/);
        const k  = kM?(parseFloat(kM[1])||1):1;
        let dStr = deriv.replace("sin",`sin(${inner})`).replace("cos",`cos(${inner})`).replace("sec²",`sec²(${inner})`).replace("sec·tan",`sec(${inner})tan(${inner})`).replace("cosec·cot",`cosec(${inner})cot(${inner})`).replace("cosec²",`cosec²(${inner})`);
        const coeff = dp(a*k,4);
        return {
          answer: `${coeff}·${dStr}`,
          steps: [
            RL(`d/dx[a·${fn}(kx)] = a·k·${deriv.includes('sin')?'cos(kx)':'...'} — chain rule`),
            ST(1,`Identify: a=${a}, function=${fn}, inner=${inner}, k=${k}`),
            ST(2,`d/dx(${fn}(${inner})) = ${deriv.replace(/sin|cos|sec|cosec|tan|cot/g,f=>`${f}(${inner})`)} · d/dx(${inner})`),
            ST(3,`Multiply by outer coefficient and inner derivative k=${k}: → ${coeff}·${dStr}`),
            AN(`${coeff}·${dStr}`)
          ]
        };
      }
    }

    /* Exponential e^(kx) */
    if (/e\^/.test(q)) {
      const m = raw.replace(/\s/g,"").match(/([+\-]?\d*\.?\d*)\*?e\^\(?([+\-]?\d*\.?\d*)\*?x\)?/i);
      const a = m?(parseFloat(m[1])||1):1;
      const k = m?(parseFloat(m[2])||1):1;
      const ans2 = `${dp(a*k)}e^(${k}x)`;
      return {
        answer: ans2,
        steps: [RL("d/dx(a·e^(kx)) = a·k·e^(kx)"),ST(1,`a=${a}, k=${k}`),ST(2,`dy/dx=${a}×${k}×e^(${k}x)=${dp(a*k)}e^(${k}x)`),AN(ans2)]
      };
    }

    /* Natural log ln */
    if (/ln/.test(q)) {
      const m = raw.replace(/\s/g,"").match(/([+\-]?\d*\.?\d*)\*?ln\(([^)]+)\)/i);
      const a = m?(parseFloat(m[1])||1):1;
      const inner = m?m[2]:"x";
      const kM = inner.match(/^([+\-]?\d*\.?\d*)x$/);
      const k  = kM?(parseFloat(kM[1])||1):1;
      return {
        answer:`${dp(a*k)}/(${inner})`,
        steps:[RL("d/dx(a·ln(kx)) = a·k/(kx) = a/x"),ST(1,`a=${a}, inner=${inner}, k=${k}`),ST(2,`dy/dx=${a}×${k}/(${inner}) = ${dp(a*k)}/(${inner})`),AN(`${dp(a*k)}/(${inner})`)]
      };
    }

    /* Polynomial parser */
    const terms=[];
    const raw2=raw.replace(/\s/g,"");
    const rx=/([\+\-]?\d*\.?\d*)\*?x\^?(\d*\.?\d*)/g;
    let m;
    while((m=rx.exec(raw2))!==null){
      const c=m[1]===''||m[1]==='+'?1:m[1]==='-'?-1:parseFloat(m[1]);
      const n2=m[2]===''?1:parseFloat(m[2]);
      if(!isNaN(c)&&!isNaN(n2)) terms.push({c,n:n2});
    }
    if(terms.length>0){
      const steps=[RL("Power rule: d/dx(cxⁿ) = c·n·xⁿ⁻¹, d/dx(constant)=0")];
      const dTerms=[];
      terms.forEach((t,i)=>{
        const nc=dp(t.c*t.n,4);
        const np=t.n-1;
        const term=np===0?`${nc}`:np===1?`${nc}x`:`${nc}x^${dp(np)}`;
        dTerms.push(term);
        steps.push(ST(i+1,`d/dx(${t.c}x^${t.n}) = ${t.c}×${t.n}×x^${t.n-1} = <strong>${term}</strong>`));
      });
      const answer=dTerms.join(" + ").replace(/\+ -/g,"− ").replace(/\+\s*0\b/g,"").trim()||"0";
      steps.push(AN(answer));
      return {answer, steps};
    }

    /* Constant */
    const cOnly=raw.trim().match(/^[\+\-]?\d+\.?\d*$/);
    if(cOnly) return {answer:"0",steps:[ST(1,"d/dx of a constant = 0"),AN("0")]};

    return {answer:"Cannot parse — try e.g. 3x²+2x, sin(3x), e^(2x), ln(x)",steps:[NO("Format: 3x^2 + 5x - 2  or  sin(2x)  or  e^(3x)  or  ln(x)")]};
  }

  /* ═══════════════════════════════════════
     2. INTEGRATION ENGINE
     ═══════════════════════════════════════ */
  function integrate(raw) {
    const q = raw.toLowerCase().replace(/−/g,"-");

    /* Definite integral detection */
    const defM = raw.match(/∫[\s_]*([+\-]?\d+\.?\d*)\s*\^?\s*([+\-]?\d+\.?\d*)|from\s+([+\-]?\d+\.?\d*)\s+to\s+([+\-]?\d+\.?\d*)/i);
    if (defM) {
      const lo = parseFloat(defM[1]||defM[3]);
      const hi = parseFloat(defM[2]||defM[4]);
      /* integrate polynomial part */
      const polyTerms=[];
      const raw2=raw.replace(/\s/g,"");
      const rx=/([\+\-]?\d*\.?\d*)\*?x\^?(\d*\.?\d*)/g;
      let m;
      while((m=rx.exec(raw2))!==null){
        const c=m[1]===''||m[1]==='+'?1:m[1]==='-'?-1:parseFloat(m[1]);
        const n2=m[2]===''?1:parseFloat(m[2]);
        if(!isNaN(c)&&!isNaN(n2)) polyTerms.push({c,n:n2});
      }
      if(polyTerms.length>0){
        const F=t=>polyTerms.reduce((s,pt)=>s+(pt.c/(pt.n+1))*Math.pow(t,pt.n+1),0);
        const val=dp(F(hi)-F(lo),6);
        const antiStr=polyTerms.map(t=>`${dp(t.c/(t.n+1),4)}x^${t.n+1}`).join(" + ").replace(/\+ -/g,"− ");
        return {
          answer:val,
          steps:[
            ST(1,`Definite integral from ${lo} to ${hi}`),
            ST(2,`Antiderivative: F(x) = ${antiStr}`),
            ST(3,`F(${hi}) = ${dp(F(hi),6)}, F(${lo}) = ${dp(F(lo),6)}`),
            ST(4,`F(${hi}) − F(${lo}) = ${val}`),
            AN(val)
          ]
        };
      }
    }

    /* Trig integrals */
    if (/\bsin\b/.test(q)) {
      const m=raw.match(/([+\-]?\d*\.?\d*)\*?\s*sin\(([^)]*)\)/i);
      const a=m?(parseFloat(m[1])||1):1;
      const inner=m?m[2]:"x";
      const kM=inner.match(/(-?\d*\.?\d*)x/);
      const k=kM?(parseFloat(kM[1])||1):1;
      const coeff=dp(-a/k,6);
      const ans2=`${coeff}cos(${inner}) + C`;
      return {answer:ans2,steps:[RL("∫sin(kx)dx = −(1/k)cos(kx)+C"),ST(1,`a=${a}, k=${k}`),ST(2,`= ${a}×(−1/${k})cos(${inner}) + C = ${coeff}cos(${inner})+C`),AN(ans2)]};
    }
    if (/\bcos\b/.test(q)) {
      const m=raw.match(/([+\-]?\d*\.?\d*)\*?\s*cos\(([^)]*)\)/i);
      const a=m?(parseFloat(m[1])||1):1;
      const inner=m?m[2]:"x";
      const kM=inner.match(/(-?\d*\.?\d*)x/);
      const k=kM?(parseFloat(kM[1])||1):1;
      const coeff=dp(a/k,6);
      const ans2=`${coeff}sin(${inner}) + C`;
      return {answer:ans2,steps:[RL("∫cos(kx)dx = (1/k)sin(kx)+C"),ST(1,`a=${a}, k=${k}`),ST(2,`= ${coeff}sin(${inner}) + C`),AN(ans2)]};
    }
    if (/\btan\b/.test(q)){
      const m=raw.match(/([+\-]?\d*\.?\d*)\*?\s*tan\(([^)]*)\)/i);
      const a=m?(parseFloat(m[1])||1):1;
      const inner=m?m[2]:"x";
      const ans2=`${a}ln|sec(${inner})| + C`;
      return {answer:ans2,steps:[RL("∫tan(u)du = ln|sec(u)|+C"),ST(1,`∫${a}tan(${inner})dx = ${ans2}`),AN(ans2)]};
    }
    if (/sec.*\^?2|sec²/.test(q)){
      const m=raw.match(/([+\-]?\d*\.?\d*)\*?\s*sec/i);
      const a=m?(parseFloat(m[1])||1):1;
      return {answer:`${a}tan(x) + C`,steps:[RL("∫sec²(x)dx = tan(x)+C"),ST(1,`${a}∫sec²(x)dx = ${a}tan(x) + C`),AN(`${a}tan(x) + C`)]};
    }

    /* Exponential */
    if (/e\^/.test(q)){
      const m=raw.match(/([+\-]?\d*\.?\d*)\*?\s*e\^\(?([+\-]?\d*\.?\d*)\*?x\)?/i);
      const a=m?(parseFloat(m[1])||1):1;
      const k=m?(parseFloat(m[2])||1):1;
      const coeff=dp(a/k,6);
      const ans2=`${coeff}e^(${k}x) + C`;
      return {answer:ans2,steps:[RL("∫a·e^(kx)dx = (a/k)e^(kx)+C"),ST(1,`a=${a}, k=${k}, coeff=a/k=${coeff}`),ST(2,ans2),AN(ans2)]};
    }

    /* ln */
    if (/\bln\b/.test(q)){
      return {answer:"x·ln(x) − x + C",steps:[RL("∫ln(x)dx = x·ln(x) − x + C  [integration by parts]"),ST(1,"u=ln(x), dv=dx → du=1/x dx, v=x"),ST(2,"∫ln(x)dx = x·ln(x)−∫1dx = x·ln(x)−x+C"),AN("x·ln(x) − x + C")]};
    }

    /* 1/x */
    if (/1\s*\/\s*x/.test(q)){
      return {answer:"ln|x| + C",steps:[RL("∫(1/x)dx = ln|x|+C"),AN("ln|x| + C")]};
    }

    /* Polynomial */
    const iTerms=[];
    const raw2=raw.replace(/\s/g,"");
    const rx=/([\+\-]?\d*\.?\d*)\*?x\^?(\d*\.?\d*)/g;
    let m;
    while((m=rx.exec(raw2))!==null){
      const c=m[1]===''||m[1]==='+'?1:m[1]==='-'?-1:parseFloat(m[1]);
      const n2=m[2]===''?1:parseFloat(m[2]);
      if(!isNaN(c)&&!isNaN(n2)) iTerms.push({c,n:n2});
    }
    const constTerms=(raw.replace(/\s/g,"").replace(/([\+\-]?\d*\.?\d*)\*?x\^?\d*\.?\d*/g,"").match(/([\+\-]?\d+\.?\d*)/g)||[]);
    if(iTerms.length>0||constTerms.length>0){
      const steps=[RL("∫cxⁿdx = (c/(n+1))x^(n+1)+C")];
      const intTerms=[];
      iTerms.forEach((t,i)=>{
        const np=t.n+1;
        const nc=dp(t.c/np,4);
        intTerms.push(`${nc}x^${np}`);
        steps.push(ST(i+1,`∫${t.c}x^${t.n}dx = ${nc}x^${np}`));
      });
      constTerms.forEach(cs=>{
        const c2=parseFloat(cs);
        intTerms.push(`${c2}x`);
        steps.push(ST(iTerms.length+1,`∫${c2}dx = ${c2}x`));
      });
      const answer=(intTerms.join(" + ").replace(/\+ -/g,"− ")||"0")+" + C";
      steps.push(AN(answer));
      return {answer,steps};
    }

    return {answer:"Please check format — try: 3x²+2x, sin(2x), e^(3x), 1/x",steps:[NO("Examples: ∫3x²+2x dx  |  ∫sin(2x) dx  |  ∫e^(3x) dx")]};
  }

  /* ═══════════════════════════════════════
     3. LIMITS ENGINE
     ═══════════════════════════════════════ */
  function solveLimit(q) {
    const ptM=q.match(/x\s*[→\->]+\s*([+\-]?\d+\.?\d*|∞|inf|infinity)/i);
    const pt=ptM?ptM[1]:null;
    const inf=pt&&/∞|inf/i.test(pt);
    const a=pt&&!inf?parseFloat(pt):null;

    if(inf){
      const rational=q.match(/([+\-]?\d*\.?\d*)x\^?(\d+).*\/.*([+\-]?\d*\.?\d*)x\^?(\d+)/);
      if(rational){
        const n1=parseInt(rational[2]),n2=parseInt(rational[4]);
        const c1=parseFloat(rational[1])||1, c2=parseFloat(rational[3])||1;
        let ansText;
        if(n1===n2) ansText=`${dp(c1/c2)}  (ratio of leading coefficients)`;
        else if(n1>n2) ansText="∞  (numerator degree > denominator degree)";
        else ansText="0  (denominator degree > numerator degree)";
        return {
          answer:ansText,
          steps:[
            ST(1,"Identify degrees of numerator and denominator"),
            ST(2,`Numerator degree: ${n1}, Denominator degree: ${n2}`),
            ST(3,n1===n2?`Equal degrees → leading coeff ratio = ${c1}/${c2} = ${dp(c1/c2)}`:n1>n2?"Numerator wins → ∞":"Denominator wins → 0"),
            AN(ansText)
          ]
        };
      }
      return {answer:"Use degree comparison",steps:[
        RL("As x→∞: degree(num)>degree(denom)→∞, equal→ratio, less→0"),
        NO("Divide all terms by highest power of x appearing")
      ]};
    }

    if(a!==null){
      /* sin(x)/x at 0 */
      if(/sin\s*\(\s*x\s*\)\s*\/\s*x/.test(q)&&a===0){
        return {answer:"1",steps:[RL("lim(x→0) sin(x)/x = 1  (standard limit via squeeze theorem)"),ST(1,"This is a fundamental result — memorise it"),AN("1")]};
      }
      /* (e^x-1)/x at 0 */
      if(/e\^?x?\s*[-−]\s*1.*\/.*x/.test(q)&&a===0){
        return {answer:"1",steps:[RL("lim(x→0) (eˣ−1)/x = 1"),ST(1,"L'Hôpital: d(eˣ−1)/dx=eˣ, d(x)/dx=1 → eˣ|_{x=0}=1"),AN("1")]};
      }
      /* (1+1/n)^n as n→∞ */
      if(/\(1\s*\+.*n\)\^n/.test(q)){
        return {answer:"e ≈ 2.71828",steps:[RL("lim(n→∞)(1+1/n)^n = e  (definition of e)"),AN("e ≈ 2.71828")]};
      }
      /* Direct substitution */
      return {
        answer:`Substitute x = ${a} (check for 0/0)`,
        steps:[
          ST(1,`Try direct substitution x = ${a}`),
          ST(2,"If 0/0 or ∞/∞: apply factoring, rationalisation, or L'Hôpital's Rule"),
          ST(3,"L'Hôpital: differentiate numerator and denominator separately, then substitute"),
          NO(`Tip: (x²−${a*a})/(x−${a}) = (x+${a}) after cancelling (x−${a})`)
        ]
      };
    }

    return {answer:"Specify limit point",steps:[NO("Format: lim x→2 (x²−4)/(x−2)  or  lim x→∞ (3x+1)/(x−2)")]};
  }

  /* ═══════════════════════════════════════
     4. ALGEBRA ENGINE
     ═══════════════════════════════════════ */
  function solveLinear(raw) {
    const sides=raw.split("=");
    if(sides.length!==2)return null;
    const parse=expr=>{
      let a=0,b=0;
      const norm=expr.replace(/\s/g,"").replace(/−/g,"-");
      const xTerms=[...norm.matchAll(/([\+\-]?\d*\.?\d*)\*?x/g)];
      xTerms.forEach(m=>{const c=m[1]===''||m[1]==='+'?1:m[1]==='-'?-1:parseFloat(m[1]);if(!isNaN(c))a+=c;});
      const rest=norm.replace(/([\+\-]?\d*\.?\d*)\*?x/g,"");
      const cM=[...rest.matchAll(/([\+\-]?\d+\.?\d*)/g)];
      cM.forEach(m=>{b+=parseFloat(m[1]);});
      return {a,b};
    };
    const L=parse(sides[0]),R=parse(sides[1]);
    const a=L.a-R.a, b=L.b-R.b;
    if(Math.abs(a)<1e-12){
      if(Math.abs(b)<1e-10)return {answer:"All real numbers (infinite solutions)",steps:[NO("Both sides are identical")]};
      return {answer:"No solution",steps:[NO("Equation is inconsistent — no solution")]};
    }
    const xVal=dp(-b/a,6);
    return {
      answer:`x = ${xVal}`,
      steps:[ST(1,`Equation: ${raw}`),ST(2,`Bring x-terms left, constants right: ${a}x = ${-b}`),ST(3,`x = ${-b}÷${a} = ${xVal}`),AN(`x = ${xVal}`)]
    };
  }

  function solveQuadratic(raw) {
    const norm=raw.replace(/\s/g,"").replace(/−/g,"-").replace(/[xX]\^2|[xX]²/g,"X2");
    const aM=norm.match(/([\+\-]?\d*\.?\d*)X2/);
    const bM=norm.match(/([\+\-]?\d*\.?\d*)[xX](?!2)/);
    let a=aM?(aM[1]===''||aM[1]==='+'?1:aM[1]==='-'?-1:parseFloat(aM[1])):0;
    let b=bM?(bM[1]===''||bM[1]==='+'?1:bM[1]==='-'?-1:parseFloat(bM[1])):0;
    const sides=norm.split("=");
    const rhs=sides[1]?parseFloat(sides[1])||0:0;
    const cStr=(sides[0]||"").replace(/([\+\-]?\d*\.?\d*)X2/,"").replace(/([\+\-]?\d*\.?\d*)[xX]/g,"");
    const cM=cStr.match(/([\+\-]?\d+\.?\d*)/);
    const c=(cM?parseFloat(cM[1]):0)-rhs;
    if(Math.abs(a)<1e-12)return solveLinear(raw)||{answer:"Could not parse",steps:[]};
    const D=b*b-4*a*c;
    const stepList=[
      ST(1,`Standard form: ${a}x² ${b>=0?"+":""}${b}x ${c>=0?"+":""}${c} = 0`),
      ST(2,`Coefficients: a=${a}, b=${b}, c=${c}`),
      ST(3,`Discriminant Δ = b²−4ac = ${b*b}−${4*a*c} = <strong>${dp(D,4)}</strong>`),
    ];
    let ansText;
    if(D>0){
      const x1=dp((-b+Math.sqrt(D))/(2*a),6), x2=dp((-b-Math.sqrt(D))/(2*a),6);
      stepList.push(ST(4,"Δ > 0 → Two distinct real roots"));
      stepList.push(ST(5,`x = (−${b} ± √${dp(D,4)}) / ${2*a}`));
      stepList.push(ST(6,`x₁ = ${x1}, x₂ = ${x2}`));
      if(Number.isInteger(parseFloat(x1))&&Number.isInteger(parseFloat(x2))){
        const r1=-parseFloat(x1),r2=-parseFloat(x2);
        stepList.push(NO(`Factored form: (x ${r1>=0?"+":""}${r1})(x ${r2>=0?"+":""}${r2}) = 0`));
      }
      ansText=`x₁ = ${x1},  x₂ = ${x2}`;
    } else if(Math.abs(D)<1e-10){
      const x0=dp(-b/(2*a),6);
      stepList.push(ST(4,"Δ = 0 → One repeated root"));
      stepList.push(ST(5,`x = −b/2a = ${x0}`));
      ansText=`x = ${x0}  (repeated root)`;
    } else {
      const re=dp(-b/(2*a),6), im=dp(Math.sqrt(-D)/(2*a),6);
      stepList.push(ST(4,"Δ < 0 → No real roots. Two complex conjugate roots."));
      stepList.push(ST(5,`x = ${re} ± ${im}i`));
      ansText=`x = ${re} + ${im}i  and  x = ${re} − ${im}i`;
    }
    stepList.push(AN(ansText));
    return {answer:ansText,steps:stepList};
  }

  function solveSimultaneous(q) {
    const eqs=q.split(/[,;]|\band\b/i).filter(e=>e.includes("=")).slice(0,2);
    if(eqs.length<2)return null;
    const parseEq=expr=>{
      const s=expr.replace(/\s/g,"").replace(/−/g,"-");
      let a=0,b=0,c=0;
      const sides=s.split("=");
      c=parseFloat(sides[1])||0;
      const lhs=sides[0];
      const xM=lhs.match(/([\+\-]?\d*\.?\d*)\*?x/i);
      const yM=lhs.match(/([\+\-]?\d*\.?\d*)\*?y/i);
      if(xM)a=xM[1]===''||xM[1]==='+'?1:xM[1]==='-'?-1:parseFloat(xM[1]);
      if(yM)b=yM[1]===''||yM[1]==='+'?1:yM[1]==='-'?-1:parseFloat(yM[1]);
      return {a,b,c};
    };
    const e1=parseEq(eqs[0]),e2=parseEq(eqs[1]);
    const det=e1.a*e2.b-e2.a*e1.b;
    if(Math.abs(det)<1e-10)return {answer:"No unique solution",steps:[NO("Determinant=0 → parallel or identical lines")]};
    const x=dp((e1.c*e2.b-e2.c*e1.b)/det,6);
    const y=dp((e1.a*e2.c-e2.a*e1.c)/det,6);
    return {
      answer:`x = ${x},  y = ${y}`,
      steps:[
        ST(1,`Equations: ①${e1.a}x+${e1.b}y=${e1.c}  ②${e2.a}x+${e2.b}y=${e2.c}`),
        ST(2,`Cramer's Rule: det = ${e1.a}×${e2.b}−${e2.a}×${e1.b} = ${dp(det,6)}`),
        ST(3,`x = (${e1.c}×${e2.b}−${e2.c}×${e1.b}) / ${dp(det,6)} = ${x}`),
        ST(4,`y = (${e1.a}×${e2.c}−${e2.a}×${e1.c}) / ${dp(det,6)} = ${y}`),
        ST(5,`Verify in ①: ${e1.a}(${x})+${e1.b}(${y})=${dp(e1.a*parseFloat(x)+e1.b*parseFloat(y),4)} ✓`),
        AN(`x=${x}, y=${y}`)
      ]
    };
  }

  /* ═══════════════════════════════════════
     5. LOGARITHMS ENGINE
     ═══════════════════════════════════════ */
  function solveLogExp(q) {
    const lower=q.toLowerCase().replace(/\s/g,"");
    const ns=nums(q);

    /* ln(x)=k */
    const lnM=lower.match(/ln\(?x\)?\s*=\s*([+\-]?\d+\.?\d*)/);
    if(lnM){const k=parseFloat(lnM[1]);return {answer:`x = e^${k} ≈ ${dp(Math.exp(k),6)}`,steps:[ST(1,`ln(x)=${k}`),ST(2,`x=e^${k}=${dp(Math.exp(k),6)}`),AN(`e^${k} ≈ ${dp(Math.exp(k),6)}`)]}}

    /* log(x)=k */
    const log10M=lower.match(/log\(?x\)?\s*=\s*([+\-]?\d+\.?\d*)/);
    if(log10M){const k=parseFloat(log10M[1]);return {answer:`x = 10^${k} = ${dp(Math.pow(10,k),6)}`,steps:[ST(1,`log₁₀(x)=${k}`),ST(2,`x=10^${k}=${dp(Math.pow(10,k),6)}`),AN(`${dp(Math.pow(10,k),6)}`)]}}

    /* log_b(x)=k */
    const logBaseM=lower.match(/log_?(\d+)\(?x\)?\s*=\s*([+\-]?\d+\.?\d*)/);
    if(logBaseM){const b2=parseFloat(logBaseM[1]),k=parseFloat(logBaseM[2]);return {answer:`x = ${b2}^${k} = ${dp(Math.pow(b2,k),6)}`,steps:[ST(1,`log_${b2}(x)=${k}`),ST(2,`x=${b2}^${k}=${dp(Math.pow(b2,k),6)}`),AN(`${dp(Math.pow(b2,k),6)}`)]}}

    /* e^x=k */
    const expM=lower.match(/e\^?x?\s*=\s*(\d+\.?\d*)/);
    if(expM){const k=parseFloat(expM[1]);return {answer:`x = ln(${k}) = ${dp(Math.log(k),6)}`,steps:[ST(1,`eˣ=${k}`),ST(2,`x=ln(${k})=${dp(Math.log(k),6)}`),AN(`${dp(Math.log(k),6)}`)]}}

    /* evaluate log(n) */
    if(/^log\(?\d/.test(lower)&&ns.length>0) return {answer:`log(${ns[0]}) = ${dp(Math.log10(ns[0]),6)}`,steps:[ST(1,`log₁₀(${ns[0]})=${dp(Math.log10(ns[0]),6)}`),AN(`${dp(Math.log10(ns[0]),6)}`)]};

    /* evaluate ln(n) */
    if(/^ln\(?\d/.test(lower)&&ns.length>0) return {answer:`ln(${ns[0]}) = ${dp(Math.log(ns[0]),6)}`,steps:[ST(1,`ln(${ns[0]})=${dp(Math.log(ns[0]),6)}`),AN(`${dp(Math.log(ns[0]),6)}`)]};

    /* laws */
    return {answer:"Logarithm laws",steps:[RL("log(AB)=logA+logB"),RL("log(A/B)=logA−logB"),RL("log(Aⁿ)=n·logA"),RL("Change of base: log_b(a)=ln(a)/ln(b)"),RL("eˣ=k → x=ln(k)"),RL("logₐ(a)=1, logₐ(1)=0")]};
  }

  /* ═══════════════════════════════════════
     6. SEQUENCES ENGINE
     ═══════════════════════════════════════ */
  function solveSequence(q) {
    const lower=q.toLowerCase();
    const ns=nums(q);

    if(/fibonacci/i.test(q)){
      const fib=[1,1];for(let i=2;i<15;i++)fib.push(fib[i-1]+fib[i-2]);
      return {answer:fib.slice(0,12).join(", ")+"...",steps:[ST(1,"F(n)=F(n-1)+F(n-2), F(1)=F(2)=1"),ST(2,fib.slice(0,12).join(", ")),AN(fib.slice(0,12).join(", ")+"...")]};
    }

    const isAP=ns.length>=3&&ns.slice(1).every((_,i)=>Math.abs((ns[i+1]-ns[i])-(ns[1]-ns[0]))<1e-9);
    const isGP=ns.length>=3&&ns[0]!==0&&ns.slice(1).every((_,i)=>Math.abs((ns[i+1]/ns[i])-(ns[1]/ns[0]))<1e-9);

    if(/arithmetic|\bap\b/.test(lower)||isAP){
      if(ns.length<2)return null;
      const a2=ns[0],d2=ns[1]-ns[0],n2=ns[2]||10;
      const nth=dp(a2+(n2-1)*d2,6);
      const sn=dp(n2/2*(2*a2+(n2-1)*d2),6);
      return {
        answer:`a_${n2}=${nth}, S_${n2}=${sn}`,
        steps:[ST(1,`a=${a2}, d=${d2}`),ST(2,`a_${n2}=${a2}+(${n2}-1)×${d2}=${nth}`),ST(3,`S_${n2}=n/2·(2a+(n-1)d)=${n2}/2·${dp(2*a2+(n2-1)*d2,4)}=${sn}`),AN(`a_${n2}=${nth}, S_${n2}=${sn}`)]
      };
    }

    if(/geometric|\bgp\b/.test(lower)||isGP){
      if(ns.length<2)return null;
      const a2=ns[0],r2=ns[1]/ns[0],n2=ns[2]||10;
      const nth=dp(a2*Math.pow(r2,n2-1),6);
      const sn=Math.abs(r2)!==1?dp(a2*(1-Math.pow(r2,n2))/(1-r2),6):dp(a2*n2,6);
      const converges=Math.abs(r2)<1;
      const sinf=converges?dp(a2/(1-r2),6):"∞ (diverges)";
      return {
        answer:`a_${n2}=${nth}, S_${n2}=${sn}${converges?`, S∞=${sinf}`:""}`,
        steps:[ST(1,`a=${a2}, r=${dp(r2,4)}`),ST(2,`a_${n2}=${a2}×${dp(r2,4)}^${n2-1}=${nth}`),ST(3,`S_${n2}=a(1-rⁿ)/(1-r)=${sn}`),converges?ST(4,`|r|<1 → S∞=a/(1-r)=${sinf}`):ST(4,`|r|≥1 → diverges`),AN(`a_${n2}=${nth}, S_${n2}=${sn}`)]
      };
    }

    return null;
  }

  /* ═══════════════════════════════════════
     7. COMPLEX NUMBERS ENGINE
     ═══════════════════════════════════════ */
  function solveComplex(q) {
    const lower=q.toLowerCase();
    const zs=[...q.matchAll(/\(\s*([\+\-]?\d+\.?\d*)\s*([\+\-])\s*(\d+\.?\d*)\s*i\s*\)/g)];
    if(!zs.length)return {answer:"Write as (a+bi)",steps:[NO("Example: modulus (3+4i), multiply (2+3i)(1-2i)")]};
    const a1=parseFloat(zs[0][1]),s1=zs[0][2],b1=parseFloat(zs[0][3]);
    const im1=b1*(s1==="-"?-1:1);

    if(/modulus|\|z\|/.test(lower)){
      const mod=dp(Math.sqrt(a1*a1+im1*im1),6);
      return {answer:`|z|=${mod}`,steps:[RL("|z|=√(a²+b²)"),ST(1,`|${a1}${im1>=0?"+":""}${im1}i|=√(${a1*a1}+${im1*im1})=√${a1*a1+im1*im1}=${mod}`),AN(mod)]};
    }
    if(/argument|arg\(/.test(lower)){
      const arg=dp(toDeg(Math.atan2(im1,a1)),4);
      return {answer:`arg(z)=${arg}°`,steps:[RL("arg(z)=arctan(b/a), adjusted for quadrant"),ST(1,`arctan(${im1}/${a1})=${arg}°`),AN(`${arg}°`)]};
    }
    if(/conjugate/.test(lower)){
      return {answer:`z*=${a1}${-im1>=0?"+":""}${-im1}i`,steps:[RL("Conjugate: change sign of Im part"),ST(1,`z*=${a1}${-im1>=0?"+":""}${-im1}i`),AN(`${a1}${-im1>=0?"+":""}${-im1}i`)]};
    }
    if(/polar|modulus-argument/.test(lower)){
      const mod=dp(Math.sqrt(a1*a1+im1*im1),4);
      const arg=dp(toDeg(Math.atan2(im1,a1)),4);
      return {answer:`z=${mod}(cos${arg}°+isin${arg}°)`,steps:[ST(1,`|z|=${mod}, arg=${arg}°`),ST(2,`Polar: ${mod}(cos${arg}°+isin${arg}°) = ${mod}e^(i×${arg}°)`),AN(`z=${mod}∠${arg}°`)]};
    }

    if(zs.length>=2){
      const a2=parseFloat(zs[1][1]),s2=zs[1][2],b2=parseFloat(zs[1][3]);
      const im2=b2*(s2==="-"?-1:1);
      if(/multi|\*/.test(lower)){
        const re=a1*a2-im1*im2, im=a1*im2+im1*a2;
        return {answer:`${re}${im>=0?"+":""}${im}i`,steps:[RL("(a+bi)(c+di)=(ac−bd)+(ad+bc)i"),ST(1,`Real:${a1}×${a2}−${im1}×${im2}=${re}`),ST(2,`Imag:${a1}×${im2}+${im1}×${a2}=${im}`),AN(`${re}+${im}i`)]};
      }
      if(/add|\+/.test(lower)){const re=a1+a2,im=im1+im2;return {answer:`${re}+${im}i`,steps:[ST(1,`(${a1}+${a2})+(${im1}+${im2})i=${re}+${im}i`),AN(`${re}+${im}i`)]}}
      if(/sub|minus/.test(lower)){const re=a1-a2,im=im1-im2;return {answer:`${re}+${im}i`,steps:[ST(1,`(${a1}−${a2})+(${im1}−${im2})i=${re}+${im}i`),AN(`${re}+${im}i`)]}}
      if(/div/.test(lower)){
        const d=a2*a2+im2*im2;
        const re=dp((a1*a2+im1*im2)/d,4),im=dp((im1*a2-a1*im2)/d,4);
        return {answer:`${re}+${im}i`,steps:[RL("Multiply by conjugate of denominator"),ST(1,`Conj of (${a2}+${im2}i) = (${a2}${-im2>=0?"+":""}${-im2}i)`),ST(2,`|z₂|²=${a2}²+${im2}²=${d}`),ST(3,`Result=${re}+${im}i`),AN(`${re}+${im}i`)]};
      }
    }

    const mod=dp(Math.sqrt(a1*a1+im1*im1),6);
    return {answer:`|z|=${mod}`,steps:[ST(1,`z=${a1}+${im1}i`),ST(2,`|z|=√(${a1*a1}+${im1*im1})=${mod}`),NO("Specify: modulus, argument, conjugate, polar, add, multiply, divide"),AN(mod)]};
  }

  /* ═══════════════════════════════════════
     8. TRIGONOMETRY ENGINE
     ═══════════════════════════════════════ */
  function solveTrig(q) {
    const lower=q.toLowerCase().replace(/−/g,"-");
    const ns=nums(q);

    /* Evaluate trig at angle */
    const trigFns={sin:Math.sin,cos:Math.cos,tan:Math.tan,sec:a=>1/Math.cos(a),cosec:a=>1/Math.sin(a),cot:a=>1/Math.tan(a)};
    for(const [fn,f] of Object.entries(trigFns)){
      const m=lower.match(new RegExp(`${fn}\\s*\\(?\\s*(\\d+\\.?\\d*)\\s*°?\\)?`));
      if(m&&ns.length>0){
        const angle=parseFloat(m[1]);
        const val=dp(f(toRad(angle)),6);
        return {answer:`${fn}(${angle}°) = ${val}`,steps:[ST(1,`Convert ${angle}° to radians: ${dp(toRad(angle),4)} rad`),ST(2,`${fn}(${angle}°) = ${val}`),AN(val)]};
      }
    }

    /* Solve sin(x)=k */
    const sinM=lower.match(/sin\s*\(?\s*[xθ]\s*\)?\s*=\s*([\+\-]?\d*\.?\d+)/);
    if(sinM){
      const k=parseFloat(sinM[1]);
      if(Math.abs(k)>1)return {answer:"No real solution",steps:[NO("|sin x|≤1 always")]};
      const p=dp(toDeg(Math.asin(k)),4);
      const p2=dp(180-parseFloat(p),4);
      return {answer:`x = ${p}°+360°n  or  x = ${p2}°+360°n`,steps:[ST(1,`arcsin(${k})=${p}°`),ST(2,`Second solution: 180°−${p}°=${p2}°`),ST(3,"General: x=θ+360°n or x=(180°−θ)+360°n"),AN(`${p}° or ${p2}° (in [0°,360°])`)]};
    }

    /* Solve cos(x)=k */
    const cosM=lower.match(/cos\s*\(?\s*[xθ]\s*\)?\s*=\s*([\+\-]?\d*\.?\d+)/);
    if(cosM){
      const k=parseFloat(cosM[1]);
      if(Math.abs(k)>1)return {answer:"No real solution",steps:[NO("|cos x|≤1 always")]};
      const p=dp(toDeg(Math.acos(k)),4);
      const p2=dp(360-parseFloat(p),4);
      return {answer:`x = ${p}°+360°n  or  x = ${p2}°+360°n`,steps:[ST(1,`arccos(${k})=${p}°`),ST(2,`Second: 360°−${p}°=${p2}°`),AN(`${p}° or ${p2}°`)]};
    }

    /* Solve tan(x)=k */
    const tanM=lower.match(/tan\s*\(?\s*[xθ]\s*\)?\s*=\s*([\+\-]?\d*\.?\d+)/);
    if(tanM){
      const k=parseFloat(tanM[1]);
      const p=dp(toDeg(Math.atan(k)),4);
      return {answer:`x = ${p}°+180°n`,steps:[ST(1,`arctan(${k})=${p}°`),ST(2,"Period of tan is 180°"),AN(`x=${p}°+180°n`)]};
    }

    /* Cosine / Sine rule */
    if(/cosine rule|law of cos/i.test(q)&&ns.length>=3){
      const [a2,b2,C2]=ns;
      const c2=Math.sqrt(a2*a2+b2*b2-2*a2*b2*Math.cos(toRad(C2)));
      return {answer:`c=${dp(c2,4)}`,steps:[RL("c²=a²+b²−2ab·cos(C)"),ST(1,`a=${a2},b=${b2},C=${C2}°`),ST(2,`c²=${a2*a2}+${b2*b2}−${dp(2*a2*b2*Math.cos(toRad(C2)),4)}=${dp(c2*c2,4)}`),ST(3,`c=√${dp(c2*c2,4)}=${dp(c2,4)}`),AN(`c=${dp(c2,4)}`)]};
    }
    if(/sine rule|law of sin/i.test(q)&&ns.length>=3){
      const [a2,A2,b2]=ns;
      const sinB=b2*Math.sin(toRad(A2))/a2;
      if(Math.abs(sinB)>1)return {answer:"No valid triangle",steps:[NO("sinB>1")]};
      const B2=dp(toDeg(Math.asin(sinB)),4);
      return {answer:`B=${B2}°`,steps:[RL("a/sinA=b/sinB"),ST(1,`sinB=${b2}×sin(${A2}°)/${a2}=${dp(sinB,6)}`),ST(2,`B=arcsin(${dp(sinB,6)})=${B2}°`),AN(`B=${B2}°`)]};
    }

    /* Pythagoras */
    if(/pythagoras|hypotenuse/i.test(q)&&ns.length>=2){
      const [a2,b2]=ns;
      const c2=dp(Math.sqrt(a2*a2+b2*b2),4);
      return {answer:`c=${c2}`,steps:[RL("c²=a²+b²"),ST(1,`c=√(${a2}²+${b2}²)=√${a2*a2+b2*b2}=${c2}`),AN(`c=${c2}`)]};
    }

    /* Identities */
    if(/identit|prove/i.test(q))return {answer:"Key trig identities",steps:[RL("sin²θ+cos²θ=1"),RL("1+tan²θ=sec²θ"),RL("1+cot²θ=cosec²θ"),RL("sin(A±B)=sinAcosB±cosAsinB"),RL("cos(A±B)=cosAcosB∓sinAsinB"),RL("sin(2A)=2sinAcosA"),RL("cos(2A)=cos²A−sin²A=1−2sin²A")]};

    return {answer:"Specify angle or equation",steps:[NO("Examples: sin(30°), cos(x)=0.5, cosine rule a=3 b=4 C=60, Pythagorean theorem")]};
  }

  /* ═══════════════════════════════════════
     9. STATISTICS ENGINE
     ═══════════════════════════════════════ */
  function solveStats(q) {
    const lower=q.toLowerCase();
    const ns=nums(q).filter(n=>!isNaN(n)&&isFinite(n));
    if(!ns.length)return {answer:"Provide numbers",steps:[NO("Example: mean of 3,7,9,4,12")]};
    const sorted=[...ns].sort((a,b)=>a-b);
    const n2=ns.length;
    const sum=ns.reduce((a,b)=>a+b,0);
    const mean=sum/n2;
    const variance=ns.reduce((s,x)=>s+(x-mean)**2,0)/n2;
    const sd=Math.sqrt(variance);
    const median=n2%2===1?sorted[Math.floor(n2/2)]:(sorted[n2/2-1]+sorted[n2/2])/2;
    const freq={}; ns.forEach(x=>freq[x]=(freq[x]||0)+1);
    const maxF=Math.max(...Object.values(freq));
    const modes=Object.keys(freq).filter(k=>freq[k]===maxF).map(Number);

    if(/mean|average/i.test(q))return {answer:`Mean=${dp(mean,4)}`,steps:[ST(1,`Sum=${ns.join("+")}=${sum}`),ST(2,`Mean=${sum}/${n2}=${dp(mean,4)}`),AN(dp(mean,4))]};
    if(/median/i.test(q))return {answer:`Median=${dp(median,4)}`,steps:[ST(1,`Sorted: ${sorted.join(", ")}`),ST(2,n2%2===1?`n odd → middle=${median}`:`n even → (${sorted[n2/2-1]}+${sorted[n2/2]})/2=${dp(median,4)}`),AN(dp(median,4))]};
    if(/mode/i.test(q))return {answer:`Mode=${modes.join(", ")}`,steps:[ST(1,`Frequencies: ${Object.entries(freq).map(([k,v])=>`${k}(×${v})`).join(", ")}`),ST(2,`Mode(s): ${modes.join(", ")}`),AN(modes.join(", "))]};
    if(/range/i.test(q))return {answer:`Range=${sorted[n2-1]-sorted[0]}`,steps:[ST(1,`Max=${sorted[n2-1]}, Min=${sorted[0]}`),ST(2,`Range=${sorted[n2-1]-sorted[0]}`),AN(sorted[n2-1]-sorted[0])]};
    if(/variance/i.test(q))return {answer:`Variance=${dp(variance,4)}`,steps:[ST(1,`Mean=${dp(mean,4)}`),ST(2,`Σ(xᵢ−x̄)²=${dp(ns.reduce((s,x)=>s+(x-mean)**2,0),4)}`),ST(3,`Variance=${dp(variance,4)}`),AN(dp(variance,4))]};
    if(/std|standard dev/i.test(q))return {answer:`SD=${dp(sd,4)}`,steps:[ST(1,`Variance=${dp(variance,4)}`),ST(2,`SD=√Variance=${dp(sd,4)}`),AN(dp(sd,4))]};
    if(/probability/i.test(q)&&ns.length>=2)return {answer:`P=${dp(ns[0]/ns[1],6)}`,steps:[RL("P=favourable/total"),ST(1,`P=${ns[0]}/${ns[1]}=${dp(ns[0]/ns[1],6)}`),AN(dp(ns[0]/ns[1],6))]};
    if(/nCr|combination|choose/i.test(q)&&ns.length>=2)return {answer:`C(${ns[0]},${ns[1]})=${nCr(ns[0],ns[1])}`,steps:[RL("C(n,r)=n!/[r!(n−r)!]"),ST(1,`C(${ns[0]},${ns[1]})=${nCr(ns[0],ns[1])}`),AN(nCr(ns[0],ns[1]))]};
    if(/nPr|permutation/i.test(q)&&ns.length>=2)return {answer:`P(${ns[0]},${ns[1]})=${nPr(ns[0],ns[1])}`,steps:[RL("P(n,r)=n!/(n−r)!"),ST(1,`P(${ns[0]},${ns[1]})=${nPr(ns[0],ns[1])}`),AN(nPr(ns[0],ns[1]))]};

    /* Full summary */
    return {
      answer:`Mean=${dp(mean,4)}, Median=${dp(median,4)}, Mode=${modes.join(",")}, SD=${dp(sd,4)}`,
      steps:[ST(1,`n=${n2}, data: ${ns.join(", ")}`),ST(2,`Mean=${dp(mean,4)}`),ST(3,`Median=${dp(median,4)}`),ST(4,`Mode=${modes.join(", ")}`),ST(5,`Range=${sorted[n2-1]-sorted[0]}`),ST(6,`SD=${dp(sd,4)}`),AN(`Mean=${dp(mean,4)}, Median=${dp(median,4)}, SD=${dp(sd,4)}`)]
    };
  }

  /* ═══════════════════════════════════════
     10. MATRICES ENGINE
     ═══════════════════════════════════════ */
  function solveMatrix(q) {
    const lower=q.toLowerCase();
    const allM=[...q.matchAll(/\[\s*\[?\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\]?\s*,?\s*\[?\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\]?\s*\]/g)];
    if(!allM.length)return {answer:"Write matrix as [[a,b],[c,d]]",steps:[NO("Example: determinant of [[2,3],[1,4]]")]};
    const [a2,b2,c2,d2]=allM[0].slice(1).map(Number);
    const det=a2*d2-b2*c2;

    if(/det|determinant/i.test(q))return {answer:`det=${det}`,steps:[RL("det([[a,b],[c,d]])=ad−bc"),ST(1,`det=(${a2})(${d2})−(${b2})(${c2})=${a2*d2}−${b2*c2}=${det}`),ST(2,det!==0?"Non-singular (invertible)":"Singular — no inverse"),AN(`det=${det}`)]};

    if(/inver/i.test(q)){
      if(det===0)return {answer:"No inverse — singular matrix",steps:[ST(1,`det=0 → no inverse`),AN("No inverse")]};
      const inv=[[dp(d2/det,4),dp(-b2/det,4)],[dp(-c2/det,4),dp(a2/det,4)]];
      return {answer:`[[${inv[0][0]},${inv[0][1]}],[${inv[1][0]},${inv[1][1]}]]`,steps:[RL("A⁻¹=(1/det)×[[d,−b],[−c,a]]"),ST(1,`det=${det}`),ST(2,`A⁻¹=(1/${det})×[[${d2},${-b2}],[${-c2},${a2}]]`),ST(3,`=[[${inv[0][0]},${inv[0][1]}],[${inv[1][0]},${inv[1][1]}]]`),AN(`[[${inv[0][0]},${inv[0][1]}],[${inv[1][0]},${inv[1][1]}]]`)]};
    }

    if(/transp/i.test(q))return {answer:`[[${a2},${c2}],[${b2},${d2}]]`,steps:[RL("Transpose: rows↔columns"),ST(1,`Aᵀ=[[${a2},${c2}],[${b2},${d2}]]`),AN(`[[${a2},${c2}],[${b2},${d2}]]`)]};

    if(/eigen/i.test(q)){
      const tr=a2+d2; const D=tr*tr-4*det;
      const steps=[RL("Char. eq: λ²−tr(A)λ+det(A)=0"),ST(1,`tr(A)=${tr}, det(A)=${det}`),ST(2,`λ²−${tr}λ+${det}=0`),ST(3,`Δ=${tr}²−4×${det}=${D}`)];
      let ansText;
      if(D>=0){const l1=dp((tr+Math.sqrt(D))/2,4),l2=dp((tr-Math.sqrt(D))/2,4);steps.push(ST(4,`λ₁=${l1}, λ₂=${l2}`));ansText=`λ₁=${l1}, λ₂=${l2}`;}
      else{const re=dp(tr/2,4),im=dp(Math.sqrt(-D)/2,4);steps.push(ST(4,`Complex eigenvalues: ${re}±${im}i`));ansText=`λ=${re}±${im}i`;}
      steps.push(AN(ansText));
      return {answer:ansText,steps};
    }

    if(allM.length>=2&&/multi|\*|product/i.test(q)){
      const [e2,f2,g2,h2]=allM[1].slice(1).map(Number);
      const P=[a2*e2+b2*g2,a2*f2+b2*h2,c2*e2+d2*g2,c2*f2+d2*h2];
      return {answer:`[[${P[0]},${P[1]}],[${P[2]},${P[3]}]]`,steps:[RL("(AB)ij=row i of A · col j of B"),ST(1,`C₁₁=${a2}×${e2}+${b2}×${g2}=${P[0]}`),ST(2,`C₁₂=${a2}×${f2}+${b2}×${h2}=${P[1]}`),ST(3,`C₂₁=${c2}×${e2}+${d2}×${g2}=${P[2]}`),ST(4,`C₂₂=${c2}×${f2}+${d2}×${h2}=${P[3]}`),AN(`[[${P[0]},${P[1]}],[${P[2]},${P[3]}]]`)]};
    }

    return {answer:`det=${det}, trace=${a2+d2}`,steps:[ST(1,`det=(${a2})(${d2})−(${b2})(${c2})=${det}`),ST(2,`trace=${a2}+${d2}=${a2+d2}`),ST(3,det!==0?"Invertible":"Singular"),AN(`det=${det}, trace=${a2+d2}`)]};
  }

  /* ═══════════════════════════════════════
     11. VECTORS ENGINE
     ═══════════════════════════════════════ */
  function solveVector(q) {
    const lower=q.toLowerCase();
    const vecs=[...q.matchAll(/\(\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)(?:\s*,\s*(-?\d+\.?\d*))?\s*\)/g)];
    if(!vecs.length)return {answer:"Write vectors as (x,y) or (x,y,z)",steps:[NO("Example: magnitude of (3,4,5) or dot product of (1,2,3) and (4,5,6)")]};
    const v1=vecs[0].slice(1).map(Number).filter(n=>!isNaN(n));
    const v2=vecs[1]?vecs[1].slice(1).map(Number).filter(n=>!isNaN(n)):[];
    const mag1=Math.sqrt(v1.reduce((s,c)=>s+c*c,0));

    if(/magnitude|length|\|v\|/i.test(q))return {answer:`|v|=${dp(mag1,6)}`,steps:[RL("|v|=√(v₁²+v₂²+v₃²)"),ST(1,`=√(${v1.map(c=>c+"²").join("+")})`),ST(2,`=√${v1.reduce((s,c)=>s+c*c,0)}=${dp(mag1,6)}`),AN(dp(mag1,6))]};

    if(/unit/i.test(q)){const u=v1.map(c=>dp(c/mag1,4));return {answer:`û=(${u.join(",")})`,steps:[RL("û=v/|v|"),ST(1,`|v|=${dp(mag1,4)}`),ST(2,`û=(${u.join(",")})`),AN(`(${u.join(",")})`)]};}

    if(/dot|scalar product/i.test(q)&&v2.length){
      const dot=v1.reduce((s,c,i)=>s+c*(v2[i]||0),0);
      return {answer:`a·b=${dot}`,steps:[RL("a·b=a₁b₁+a₂b₂+a₃b₃"),ST(1,`=${v1.map((c,i)=>`${c}×${v2[i]||0}`).join("+")}=${dot}`),AN(`${dot}`)]};
    }

    if(/cross/i.test(q)&&v2.length&&v1.length===3){
      const [a2,a3,a4]=v1,[b2,b3,b4]=v2;
      const cx=a3*b4-a4*b3, cy=a4*b2-a2*b4, cz=a2*b3-a3*b2;
      return {answer:`(${cx},${cy},${cz})`,steps:[RL("a×b=(a₂b₃−a₃b₂, a₃b₁−a₁b₃, a₁b₂−a₂b₁)"),ST(1,`i:${a3}×${b4}−${a4}×${b3}=${cx}`),ST(2,`j:${a4}×${b2}−${a2}×${b4}=${cy}`),ST(3,`k:${a2}×${b3}−${a3}×${b2}=${cz}`),AN(`(${cx},${cy},${cz})`)]};}

    if(/angle/i.test(q)&&v2.length){
      const dot=v1.reduce((s,c,i)=>s+c*(v2[i]||0),0);
      const mag2=Math.sqrt(v2.reduce((s,c)=>s+c*c,0));
      const cosA=dot/(mag1*mag2);
      const angle=dp(toDeg(Math.acos(Math.min(1,Math.max(-1,cosA)))),4);
      return {answer:`θ=${angle}°`,steps:[RL("cosθ=(a·b)/(|a||b|)"),ST(1,`a·b=${dot}, |a|=${dp(mag1,4)}, |b|=${dp(mag2,4)}`),ST(2,`cosθ=${dp(cosA,6)}`),ST(3,`θ=arccos(${dp(cosA,6)})=${angle}°`),AN(`${angle}°`)]};
    }

    if(/perpen|orthog/i.test(q)&&v2.length){
      const dot=v1.reduce((s,c,i)=>s+c*(v2[i]||0),0);
      const isPerpendicular=Math.abs(dot)<1e-10;
      return {answer:isPerpendicular?"Perpendicular ✓":"Not perpendicular",steps:[RL("Perpendicular iff a·b=0"),ST(1,`a·b=${dot}`),ST(2,isPerpendicular?"=0 ✓ → perpendicular":`≠0 → not perpendicular`),AN(isPerpendicular?"Perpendicular":"Not perpendicular")]};
    }

    return {answer:`|v|=${dp(mag1,6)}`,steps:[ST(1,`v=(${v1.join(",")})`),ST(2,`|v|=${dp(mag1,6)}`),NO("Specify: magnitude, unit vector, dot product, cross product, angle"),AN(dp(mag1,6))]};
  }

  /* ═══════════════════════════════════════
     12. GEOMETRY ENGINE (Areas + Volumes)
     ═══════════════════════════════════════ */
  function solveGeometry(q) {
    const lower=q.toLowerCase();
    const ns=nums(q);

    const geoPatterns=[
      [/area.*circle|circle.*area/,       ()=>{const A=dp(PI*ns[0]**2,6);return {f:"A=πr²",s:[`r=${ns[0]}`,`A=π×${ns[0]}²=${A}`],a:`${A} units²`};}],
      [/area.*semicircle|semicircle.*area/,()=>{const A=dp(PI*ns[0]**2/2,6);return {f:"A=πr²/2",s:[`r=${ns[0]}`,`A=${A}`],a:`${A} units²`};}],
      [/area.*triangle|triangle.*area/,   ()=>{const A=dp(.5*ns[0]*ns[1],6);return {f:"A=½×base×height",s:[`b=${ns[0]},h=${ns[1]}`,`A=½×${ns[0]}×${ns[1]}=${A}`],a:`${A} units²`};}],
      [/equilateral/,                     ()=>{const A=dp((Math.sqrt(3)/4)*ns[0]**2,6);return {f:"A=(√3/4)s²",s:[`s=${ns[0]}`,`A=(√3/4)×${ns[0]}²=${A}`],a:`${A} units²`};}],
      [/area.*trapez|trapez.*area/,       ()=>{const A=dp(.5*(ns[0]+ns[1])*ns[2],6);return {f:"A=½(a+b)×h",s:[`a=${ns[0]},b=${ns[1]},h=${ns[2]}`,`A=½(${ns[0]}+${ns[1]})×${ns[2]}=${A}`],a:`${A} units²`};}],
      [/area.*parallelogram|parallelogram.*area/,()=>{const A=dp(ns[0]*ns[1],6);return {f:"A=base×height",s:[`b=${ns[0]},h=${ns[1]}`,`A=${A}`],a:`${A} units²`};}],
      [/area.*rhombus|rhombus.*area/,     ()=>{const A=dp(.5*ns[0]*ns[1],6);return {f:"A=½d₁d₂ (diagonals)",s:[`d₁=${ns[0]},d₂=${ns[1]}`,`A=½×${ns[0]}×${ns[1]}=${A}`],a:`${A} units²`};}],
      [/sector.*area|area.*sector/,       ()=>{const A=dp(.5*ns[0]**2*toRad(ns[1]),6);return {f:"A=½r²θ (θ in rad)",s:[`r=${ns[0]},θ=${ns[1]}°`,`θ_rad=${dp(toRad(ns[1]),4)}`,`A=${A}`],a:`${A} units²`};}],
      [/arc.*length|length.*arc/,         ()=>{const L=dp(ns[0]*toRad(ns[1]),6);return {f:"L=rθ (θ in rad)",s:[`r=${ns[0]},θ=${ns[1]}°`,`L=${ns[0]}×${dp(toRad(ns[1]),4)}=${L}`],a:`${L} units`};}],
      [/heron/,                           ()=>{const [a,b,c2]=ns;const s2=(a+b+c2)/2;const A=dp(Math.sqrt(s2*(s2-a)*(s2-b)*(s2-c2)),6);return {f:"A=√(s(s-a)(s-b)(s-c)), s=(a+b+c)/2",s:[`s=${s2}`,`A=√${dp(s2*(s2-a)*(s2-b)*(s2-c2),4)}=${A}`],a:`${A} units²`};}],
      [/circumference|perimeter.*circle/, ()=>{const C=dp(2*PI*ns[0],6);return {f:"C=2πr",s:[`r=${ns[0]}`,`C=2π×${ns[0]}=${C}`],a:`${C} units`};}],
      [/perimeter.*rect|rectangle.*perim/,()=>{const P=dp(2*(ns[0]+ns[1]),4);return {f:"P=2(l+w)",s:[`l=${ns[0]},w=${ns[1]}`,`P=${P}`],a:`${P} units`};}],
      [/surface.*sphere|sphere.*surface/, ()=>{const A=dp(4*PI*ns[0]**2,6);return {f:"SA=4πr²",s:[`r=${ns[0]}`,`SA=${A}`],a:`${A} units²`};}],
      [/surface.*cylinder|cylinder.*surface/,()=>{const A=dp(2*PI*ns[0]*(ns[0]+ns[1]),6);return {f:"TSA=2πr(r+h)",s:[`r=${ns[0]},h=${ns[1]}`,`TSA=${A}`],a:`${A} units²`};}],
      [/surface.*cube|cube.*surface/,     ()=>{const A=dp(6*ns[0]**2,4);return {f:"SA=6s²",s:[`s=${ns[0]}`,`SA=${A}`],a:`${A} units²`};}],
      [/surface.*cone|cone.*surface/,     ()=>{const l=Math.sqrt(ns[0]**2+ns[1]**2);const A=dp(PI*ns[0]*(ns[0]+l),6);return {f:"TSA=πr(r+l), l=√(r²+h²)",s:[`r=${ns[0]},h=${ns[1]}`,`l=${dp(l,4)}`,`TSA=${A}`],a:`${A} units²`};}],
      [/sphere.*volume|volume.*sphere/,   ()=>{const V=dp(4/3*PI*ns[0]**3,6);return {f:"V=(4/3)πr³",s:[`r=${ns[0]}`,`V=${V}`],a:`${V} units³`};}],
      [/cylinder.*volume|volume.*cylinder/,()=>{const V=dp(PI*ns[0]**2*ns[1],6);return {f:"V=πr²h",s:[`r=${ns[0]},h=${ns[1]}`,`V=${V}`],a:`${V} units³`};}],
      [/cone.*volume|volume.*cone/,        ()=>{const V=dp(PI*ns[0]**2*ns[1]/3,6);return {f:"V=(1/3)πr²h",s:[`r=${ns[0]},h=${ns[1]}`,`V=${V}`],a:`${V} units³`};}],
      [/cube.*volume|volume.*cube/,        ()=>{const V=dp(ns[0]**3,4);return {f:"V=s³",s:[`s=${ns[0]}`,`V=${V}`],a:`${V} units³`};}],
      [/box|cuboid|rectangular prism/,     ()=>{const V=dp(ns[0]*ns[1]*ns[2],4);return {f:"V=l×w×h",s:[`l=${ns[0]},w=${ns[1]},h=${ns[2]}`,`V=${V}`],a:`${V} units³`};}],
      [/pyramid.*volume|volume.*pyramid/,  ()=>{const V=dp(ns[0]*ns[1]/3,4);return {f:"V=(1/3)×Base×h",s:[`Base=${ns[0]},h=${ns[1]}`,`V=${V}`],a:`${V} units³`};}],
      [/frustum/,                          ()=>{const V=dp(PI*ns[2]/3*(ns[0]**2+ns[0]*ns[1]+ns[1]**2),6);return {f:"V=(πh/3)(R²+Rr+r²)",s:[`R=${ns[0]},r=${ns[1]},h=${ns[2]}`,`V=${V}`],a:`${V} units³`};}],
    ];

    for(const [pattern,fn] of geoPatterns){
      if(pattern.test(lower)){
        const res=fn();
        return {answer:res.a,steps:[RL(res.f),...res.s.map((s2,i)=>ST(i+1,s2)),AN(res.a)]};
      }
    }

    return {answer:"Specify shape and values",steps:[NO("Examples: area of circle radius 5, volume of sphere radius 3, surface area of cylinder r=2 h=5")]};
  }

  /* ═══════════════════════════════════════
     NUMBER THEORY
     ═══════════════════════════════════════ */
  function solveNumberTheory(q) {
    const lower=q.toLowerCase();
    const ns=nums(q);
    if(/prime factor/i.test(q)&&ns.length){
      const n=Math.round(ns[0]);const f=primeFactors(n);const g={};f.forEach(p=>g[p]=(g[p]||0)+1);
      const disp=Object.entries(g).map(([p,e])=>e>1?`${p}^${e}`:p).join("×");
      return {answer:`${n}=${disp}`,steps:[ST(1,`Divide ${n} by prime factors:`),ST(2,disp),AN(`${n}=${disp}`)]};
    }
    if(/\bprime\b/i.test(q)&&ns.length){
      const n=Math.round(ns[0]);const r=isPrime(n);
      return {answer:r?`${n} is prime`:`${n} is not prime`,steps:[ST(1,`Check divisors up to √${n}=${dp(Math.sqrt(n),2)}`),ST(2,r?`No factor found → prime`:`${n}=${primeFactors(n).join("×")}`),AN(r?"Prime":"Not prime")]};
    }
    if(/\bgcd\b|\bhcf\b/i.test(q)&&ns.length>=2)return {answer:`GCD=${gcd(ns[0],ns[1])}`,steps:[RL("Euclidean algorithm: GCD(a,b)=GCD(b,a mod b)"),ST(1,`GCD(${ns[0]},${ns[1]})=${gcd(ns[0],ns[1])}`),AN(gcd(ns[0],ns[1]))]};
    if(/\blcm\b/i.test(q)&&ns.length>=2)return {answer:`LCM=${lcm(ns[0],ns[1])}`,steps:[RL("LCM=|a×b|/GCD"),ST(1,`GCD=${gcd(ns[0],ns[1])}`),ST(2,`LCM=${ns[0]}×${ns[1]}/${gcd(ns[0],ns[1])}=${lcm(ns[0],ns[1])}`),AN(lcm(ns[0],ns[1]))]};
    if(/factorial|!\s*$/.test(q)&&ns.length){const n=Math.round(ns[0]);if(n>20)return {answer:`${n}! is very large`,steps:[NO("Use Stirling's approx for large n")]};return {answer:`${n}!=${factorial(n)}`,steps:[ST(1,`${Array.from({length:n},(_,i)=>i+1).join("×")}=${factorial(n)}`),AN(factorial(n))]};}
    return null;
  }

  /* ═══════════════════════════════════════
     FINANCIAL MATHEMATICS
     ═══════════════════════════════════════ */
  function solveFinancial(q) {
    const lower=q.toLowerCase();
    const ns=nums(q);
    if(/simple interest/i.test(q)&&ns.length>=3){
      const [P,R,T]=ns;const I=dp(P*R/100*T,4);const A=dp(parseFloat(P)+parseFloat(I),4);
      return {answer:`I=${I}, A=${A}`,steps:[RL("I=PRT/100"),ST(1,`P=${P},R=${R}%,T=${T}`),ST(2,`I=${P}×${R}/100×${T}=${I}`),ST(3,`A=P+I=${A}`),AN(`I=${I}, A=${A}`)]};
    }
    if(/compound interest/i.test(q)&&ns.length>=3){
      const [P,R,T]=ns;const n2=ns[3]||1;const A=dp(P*Math.pow(1+R/(100*n2),n2*T),4);const I=dp(parseFloat(A)-P,4);
      return {answer:`A=${A}, I=${I}`,steps:[RL("A=P(1+R/100n)^(nT)"),ST(1,`P=${P},R=${R}%,T=${T},n=${n2}`),ST(2,`A=${P}×${dp(Math.pow(1+R/(100*n2),n2*T),6)}=${A}`),ST(3,`I=${A}−${P}=${I}`),AN(`A=${A}, I=${I}`)]};
    }
    if(/depreciation/i.test(q)&&ns.length>=3){
      const [P,R,T]=ns;const V=dp(P*Math.pow(1-R/100,T),4);
      return {answer:`Value=${V}`,steps:[RL("V=P(1−R/100)^T"),ST(1,`P=${P},R=${R}%,T=${T}`),ST(2,`V=${V}`),AN(V)]};
    }
    return null;
  }

  /* ═══════════════════════════════════════
     ARITHMETIC EVALUATOR
     ═══════════════════════════════════════ */
  function solveArithmetic(q) {
    try {
      let expr=q.replace(/[^0-9+\-*/^().%√πeE\s]/gi,"")
        .replace(/π/g,String(PI)).replace(/e\b/g,String(E))
        .replace(/√(\d+\.?\d*)/g,(_,n)=>String(Math.sqrt(parseFloat(n))))
        .replace(/\^/g,"**").trim();
      if(!expr)throw new Error("empty");
      const res=Function(`"use strict";return(${expr})`)();
      if(!isFinite(res))return {answer:String(res),steps:[AN(res)]};
      return {answer:`= ${dp(res,6)}`,steps:[ST(1,`Expression: ${q}`),ST(2,`= ${dp(res,6)}`),AN(dp(res,6))]};
    } catch {
      return {answer:"Cannot evaluate",steps:[NO("Use digits + − × / ^ √ π, e.g. 3^2+√16−5")]};
    }
  }

  /* ═══════════════════════════════════════
     MAIN DISPATCHER
     ═══════════════════════════════════════ */
  function solve(question) {
    if (!question || !question.trim()) return {answer:"Please type a question.",steps:[NO("Type any maths question in the box above.")]};
    const q=question.toLowerCase().trim().replace(/−/g,"-");
    const raw=question.trim();

    /* Order matters — most specific first */
    if(/compound interest/i.test(q))       {const r2=solveFinancial(raw);if(r2)return r2;}
    if(/simple interest/i.test(q))         {const r2=solveFinancial(raw);if(r2)return r2;}
    if(/depreciation/i.test(q))            {const r2=solveFinancial(raw);if(r2)return r2;}
    if(/fibonacci|arithmetic.*seq|geometric.*seq|\bap\b|\bgp\b|sequences|series/i.test(q)){const r2=solveSequence(raw);if(r2)return r2;}
    if(/\bintegrat|\b∫|antiderivative|indefinite|definite/i.test(q)) return integrate(raw);
    if(/differentiat|derivative|dy\/dx|d\/dx|d by dx/i.test(q))      return differentiate(raw);
    if(/simultaneous|system.*eq/i.test(q)) {const r2=solveSimultaneous(raw);if(r2)return r2;}
    if(/quadratic|x[\^²]2?\s*[+\-].*x|roots of/i.test(q)&&q.includes("x")) return solveQuadratic(raw);
    if(/inequality|≤|≥|<.*x|x.*>/i.test(q)) {const r2=solveLinear(raw);if(r2)return r2;}
    if(/matrix|matric|determinant|invers.*matr|eigenvalu|transpose/i.test(q)) return solveMatrix(raw);
    if(/vector|dot product|cross product|magnitude of|unit vec|perpen.*vec|parallel.*vec/i.test(q)) return solveVector(raw);
    if(/\bsin\b|\bcos\b|\btan\b|\bsec\b|\bcosec\b|\bcot\b|trig|sine rule|cosine rule|arcsin|arccos|arctan|pythagoras|hypotenuse/i.test(q)) return solveTrig(raw);
    if(/mean|median|mode|std dev|variance|probability|quartile|iqr|nCr|nPr|permut|combinat/i.test(q)) return solveStats(raw);
    if(/\blimit\b|\blim\b/i.test(q))        return solveLimit(raw);
    if(/\bln\b|\blog\b|logarithm|log_|e\^x\s*=|exponential/i.test(q)) {const r2=solveLogExp(raw);if(r2)return r2;}
    if(/complex|imaginary|\bi(?=[^a-z])/i.test(q)) return solveComplex(raw);
    if(/prime|factorial|gcd|hcf|lcm|factor[is]/i.test(q)) {const r2=solveNumberTheory(raw);if(r2)return r2;}
    if(/area|volume|surface area|perimeter|circumference|sphere|cylinder|cone|cube|triangle|rectangle|trapez|prism|pyramid|sector|arc length|frustum|heron/i.test(q)) return solveGeometry(raw);

    /* solve linear if = present */
    if(q.includes("=")){
      if(/x/.test(q)) return solveQuadratic(raw);
      const r2=solveLinear(raw);if(r2)return r2;
    }

    /* arithmetic fallback */
    if(/\d+\s*[\+\-\*\/\^]\s*\d/.test(q)) return solveArithmetic(raw);

    return {
      answer:"Please rephrase or be more specific",
      steps:[
        NO("I can solve: quadratics, simultaneous equations, differentiation, integration, limits, sequences & series, matrices, vectors, trigonometry, statistics, probability, complex numbers, logarithms, geometry (areas/volumes), number theory, and financial maths."),
        NO("Tip: be specific — e.g. <em>'differentiate 3x² + 5x'</em> or <em>'volume of a sphere radius 7'</em>")
      ]
    };
  }

  return {solve};
})();

/* ═══════════════════════════════════════════════════════════════
   FREE QUESTION HANDLER
   ═══════════════════════════════════════════════════════════════ */
if (solveFreeBtn) solveFreeBtn.addEventListener("click", handleFreeQuestion);
if (freeQuestion) freeQuestion.addEventListener("keydown", e=>{
  if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();handleFreeQuestion();}
});

function handleFreeQuestion() {
  const q=freeQuestion.value.trim();
  if(!q){alert("Please type a question first!");return;}
  freeAnswer.innerHTML=`<span style="color:var(--ink-40);font-size:0.9rem;">⏳ Solving…</span>`;
  freeSteps.innerHTML="";
  try {
    const result=MathEngine.solve(q);
    freeAnswer.innerHTML=`
      <div class="free-answer-box">
        <span class="ans-label">✔ Answer</span>
        <span class="ans-value">${escapeHTML(result.answer)}</span>
      </div>`;
    if(result.steps&&result.steps.length){
      freeSteps.innerHTML=`<div class="steps-header">Step-by-step solution</div>${result.steps.filter(Boolean).join("")}`;
    }
    if(typeof MathProgress!=="undefined")MathProgress.recordTopicViewed("Free Question");
    if(window.MathJax)MathJax.typesetPromise([freeAnswer,freeSteps]).catch(()=>{});
  } catch(err){
    freeAnswer.innerHTML=`<span style="color:#721c24;">⚠ Could not solve. Please rephrase your question.</span>`;
    console.error("Engine error:",err);
  }
  freeQuestion.value="";
}

function escapeHTML(str){
  const d=document.createElement("div");d.textContent=String(str);return d.innerHTML;
}

/* ═══════════════════════════════════════════════════════════════
   IMAGE SCANNER
   ═══════════════════════════════════════════════════════════════ */
(function(){
  const imageInput=document.getElementById("imageInput");
  const scanBtn=document.getElementById("scanImageBtn");
  const ocrStatus=document.getElementById("ocrStatus");
  const userQ=document.getElementById("userQuestion");
  const userSol=document.getElementById("userSolution");
  let selectedFile=null;

  if(imageInput)imageInput.addEventListener("change",e=>{
    const f=e.target.files[0];if(!f)return;
    if(!f.type.match("image.*")){showStatus("Please select an image file.","warning");return;}
    selectedFile=f;showStatus(`✔ Image selected: ${f.name} (${(f.size/1024).toFixed(1)} KB)`,"info");showPreview(f);
  });

  if(scanBtn)scanBtn.addEventListener("click",async()=>{
    if(!selectedFile){showStatus("Please select an image first.","warning");return;}
    clearResults();
    if(typeof Tesseract!=="undefined"){
      showStatus("🔍 Running OCR…","processing");
      try{
        const{data:{text}}=await Tesseract.recognize(selectedFile,"eng",{
          logger:m=>{if(m.status==="recognizing text")showStatus(`OCR: ${Math.round(m.progress*100)}%…`,"processing");}
        });
        const cleaned=text.replace(/\n+/g," ").replace(/[^\w\s+\-*/^()=.,π√∫]/g," ").trim();
        if(cleaned.length>4){showStatus("✔ Text extracted — solving…","success");solveAndDisplay(cleaned);return;}
      }catch(e){console.warn("Tesseract:",e);}
    }
    showStatus("📷 Image uploaded. Type your question in the Ask box above.","warning");
    if(userQ)userQ.innerHTML=`<div style="padding:1rem;background:#fff3cd;border:1px solid #ffc107;border-radius:8px;color:#7a5c00;">
      <strong>Image received!</strong> Type the question into the <strong>"Ask Any Math Question"</strong> box above and click <strong>Solve</strong>.
    </div>`;
  });

  function solveAndDisplay(text){
    if(userQ)userQ.innerHTML=`<div class="problem-analysis"><div class="analysis-header"><h4>Question Detected</h4></div><div class="problem-content"><div class="math-expression">${esc(text.slice(0,400))}</div></div></div>`;
    try{
      const result=MathEngine.solve(text);
      if(userSol)userSol.innerHTML=`<div class="math-solution"><div class="solution-header"><h4>Step-by-Step Solution</h4></div><div class="solution-steps">${(result.steps||[]).filter(Boolean).join("")}</div><div class="final-answer"><div class="answer-box">${esc(result.answer||"See steps")}</div></div></div>`;
      if(window.MathJax)MathJax.typesetPromise([userSol]).catch(()=>{});
    }catch{
      if(userSol)userSol.innerHTML=`<div style="padding:1rem;background:#f8d7da;color:#721c24;border-radius:8px;">Could not solve automatically. Please type the question in the box above.</div>`;
    }
  }

  function showPreview(file){
    document.querySelector(".image-preview")?.remove();
    const reader=new FileReader();
    reader.onload=e=>{
      const el=document.createElement("div");el.className="image-preview";
      el.innerHTML=`<div class="preview-title">Image Preview</div><div class="preview-image"><img src="${e.target.result}" alt="Uploaded math problem" style="max-width:100%;max-height:260px;border-radius:8px;"></div><div class="preview-info"><span>${esc(file.name)}</span><span>${(file.size/1024).toFixed(1)} KB</span></div>`;
      scanBtn.parentNode.insertBefore(el,scanBtn);
    };
    reader.readAsDataURL(file);
  }

  function showStatus(msg,type="info"){if(ocrStatus){ocrStatus.textContent=msg;ocrStatus.className=`status-${type}`;}}
  function clearResults(){if(userQ)userQ.innerHTML="";if(userSol)userSol.innerHTML="";}
  function esc(t){const d=document.createElement("div");d.textContent=t;return d.innerHTML;}
  if(ocrStatus)showStatus("Ready — select an image to scan and solve.","info");
})();

/* Load Tesseract.js OCR */
(function(){
  const s=document.createElement("script");
  s.src="https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/5.0.4/tesseract.min.js";
  s.async=true;document.head.appendChild(s);
})();