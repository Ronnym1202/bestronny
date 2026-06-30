/* ============================================================
   MATH BRAIN GAMES – mind.js  v3.1
   Ronny Best · Professional Level-Categorised Games
   All games: primary (3), secondary (4), university (4)
   ============================================================ */
'use strict';

/* ── Helpers ─────────────────────────────────────────────────── */
const $    = id => document.getElementById(id);
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randF = (min, max, dp = 1) => parseFloat((Math.random() * (max - min) + min).toFixed(dp));
const gcd  = (a, b) => b === 0 ? a : gcd(b, a % b);
const lcm  = (a, b) => (a * b) / gcd(a, b);

function setResult(id, msg, ok) {
    const el = $(id);
    if (!el) return;
    el.textContent = msg;
    el.className = 'result ' + (ok ? 'ok' : 'err');
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = rand(0, i);
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function buildOptions(containerId, options, correctIdx, onAnswer) {
    const el = $(containerId);
    if (!el) return;
    el.innerHTML = '';
    options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'opt-btn';
        btn.innerHTML = opt;
        btn.setAttribute('aria-label', `Option ${i + 1}: ${opt}`);
        btn.onclick = () => {
            el.querySelectorAll('.opt-btn').forEach(b => { b.onclick = null; });
            btn.classList.add(i === correctIdx ? 'correct' : 'wrong');
            if (i !== correctIdx) {
                const allBtns = el.querySelectorAll('.opt-btn');
                if (allBtns[correctIdx]) allBtns[correctIdx].classList.add('correct');
            }
            onAnswer(i === correctIdx);
        };
        el.appendChild(btn);
    });
}

/* ── Level / Tab Navigation ──────────────────────────────────── */
function switchLevel(level, btn) {
    document.querySelectorAll('.level-tab').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.level-panel').forEach(p => p.classList.remove('active'));

    if (btn) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
    }
    const panel = $(`panel-${level}`);
    if (panel) panel.classList.add('active');
}

function showGame(gameId, btn, level) {
    const panel = $(`panel-${level}`);
    if (!panel) return;
    panel.querySelectorAll('.game-panel').forEach(g => g.classList.remove('active'));
    panel.querySelectorAll('.gtab').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
    });
    const sec = $(gameId);
    if (sec) sec.classList.add('active');
    if (btn) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
    }
}

/* ══════════════════════════════════════════════════════════════
   PRIMARY 1 — NUMBER NINJA
   ══════════════════════════════════════════════════════════════ */
let ninjaScore = 0, ninjaStreak = 0, ninjaRound = 0;
let ninjaAnswer = 0, ninjaTimerInt = null, ninjaTimeLeft = 15;
let ninjaRunning = false;

function startNinja() {
    ninjaScore = 0; ninjaStreak = 0; ninjaRound = 0;
    $('ninjaScore').textContent = 0;
    $('ninjaStreak').textContent = 0;
    $('ninjaResult').textContent = '';
    $('ninjaResult').className = 'result';
    ninjaRunning = true;
    nextNinjaRound();
}

function nextNinjaRound() {
    if (ninjaRound >= 10) { endNinja(); return; }
    ninjaRound++;

    const roundEl = $('ninjaRound');
    if (roundEl) roundEl.textContent = `Round ${ninjaRound} / 10`;

    const progressBar = $('ninjaProgress');
    if (progressBar) {
        progressBar.style.width = ((ninjaRound - 1) * 10) + '%';
        const progressTrack = progressBar.parentElement;
        if (progressTrack) progressTrack.setAttribute('aria-valuenow', ninjaRound - 1);
    }

    const ninjaInput = $('ninjaInput');
    if (ninjaInput) { ninjaInput.value = ''; ninjaInput.focus(); }

    const ops = ['+', '−', '×'];
    const op = ops[rand(0, ops.length - 1)];
    let a, b;
    if (op === '+')      { a = rand(10, 99); b = rand(10, 99); ninjaAnswer = a + b; }
    else if (op === '−') { a = rand(20, 99); b = rand(10, a);  ninjaAnswer = a - b; }
    else                 { a = rand(2, 15);  b = rand(2, 15);  ninjaAnswer = a * b; }

    $('ninjaStart').textContent = a;
    $('ninjaOp').textContent = op;
    $('ninjaVal').textContent = b;

    if (ninjaTimerInt) clearInterval(ninjaTimerInt);
    ninjaTimeLeft = 15;
    $('ninjaTimer').textContent = ninjaTimeLeft;

    ninjaTimerInt = setInterval(() => {
        ninjaTimeLeft--;
        $('ninjaTimer').textContent = ninjaTimeLeft;
        if (ninjaTimeLeft <= 0) {
            clearInterval(ninjaTimerInt);
            ninjaStreak = 0;
            $('ninjaStreak').textContent = 0;
            setResult('ninjaResult', `⏱ Time up! Answer was ${ninjaAnswer}`, false);
            setTimeout(nextNinjaRound, 1500);
        }
    }, 1000);
}

function checkNinja() {
    if (!ninjaRunning) return;
    const val = parseInt($('ninjaInput').value);
    if (isNaN(val)) return;
    clearInterval(ninjaTimerInt);

    if (val === ninjaAnswer) {
        ninjaStreak++;
        const bonus = ninjaTimeLeft >= 10 ? 15 : ninjaTimeLeft >= 5 ? 10 : 5;
        ninjaScore += bonus + (ninjaStreak >= 3 ? 5 : 0);
        $('ninjaScore').textContent = ninjaScore;
        $('ninjaStreak').textContent = ninjaStreak;
        setResult('ninjaResult', `✅ Correct! +${bonus}${ninjaStreak >= 3 ? ' 🔥 Streak bonus!' : ''}`, true);
    } else {
        ninjaStreak = 0;
        $('ninjaStreak').textContent = 0;
        setResult('ninjaResult', `❌ Answer was ${ninjaAnswer}`, false);
    }
    setTimeout(nextNinjaRound, 1200);
}

function endNinja() {
    ninjaRunning = false;
    clearInterval(ninjaTimerInt);

    const progressBar = $('ninjaProgress');
    if (progressBar) progressBar.style.width = '100%';

    const best = parseInt(localStorage.getItem('ninjaBest') || '0');
    const newBest = ninjaScore > best;
    if (newBest) localStorage.setItem('ninjaBest', ninjaScore);
    setResult('ninjaResult',
        `🏆 Final Score: ${ninjaScore}${newBest ? ' — New Record! 🎉' : ` (Best: ${Math.max(best, ninjaScore)})`}`, true);

    if (typeof MathProgress !== 'undefined') {
        MathProgress.recordGamePlayed('Number Ninja', ninjaScore, ninjaScore >= 80);
    }
}

/* ══════════════════════════════════════════════════════════════
   PRIMARY 2 — TIMES TABLE BLITZ
   ══════════════════════════════════════════════════════════════ */
let blitzTable = 0, blitzMultiplier = 0, blitzAnswer = 0;
let blitzScore = 0, blitzRunning = false, blitzTimerInt = null;
let blitzTimeLeft = 60;

function getBlitzBest() {
    return parseInt(localStorage.getItem(`blitzBest_${blitzTable}`) || '0');
}

function initBlitz() {
    const grid = $('tableGrid');
    if (!grid) return;
    grid.innerHTML = '';
    for (let i = 2; i <= 12; i++) {
        const btn = document.createElement('button');
        btn.className = 'tbl-btn';
        btn.textContent = i;
        btn.setAttribute('aria-label', `${i} times table`);
        btn.onclick = () => selectBlitzTable(i, btn);
        grid.appendChild(btn);
    }
    const bestEl = $('blitzBest');
    if (bestEl) bestEl.textContent = 0;
}

function selectBlitzTable(n, btn) {
    if (blitzTimerInt) { clearInterval(blitzTimerInt); blitzTimerInt = null; }
    blitzTable = n;
    document.querySelectorAll('.tbl-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    blitzScore = 0; blitzTimeLeft = 60;
    $('blitzScore').textContent = 0;
    $('blitzTimer').textContent = '60s';
    $('blitzBest').textContent = getBlitzBest();
    $('blitzResult').textContent = '';
    $('blitzResult').className = 'result';
    blitzRunning = true;
    nextBlitzQ();

    blitzTimerInt = setInterval(() => {
        blitzTimeLeft--;
        $('blitzTimer').textContent = blitzTimeLeft + 's';
        if (blitzTimeLeft <= 0) {
            clearInterval(blitzTimerInt);
            blitzTimerInt = null;
            blitzRunning = false;
            const best = getBlitzBest();
            const newBest = blitzScore > best;
            if (newBest) localStorage.setItem(`blitzBest_${blitzTable}`, blitzScore);
            $('blitzBest').textContent = Math.max(best, blitzScore);
            $('blitzQuestion').innerHTML = `<span class="display-eq">Time's up! Score: ${blitzScore}</span>`;
            setResult('blitzResult', `🏁 Final: ${blitzScore} correct${newBest ? ' — New Record! 🏆' : ''}`, true);
            if (typeof MathProgress !== 'undefined') {
                MathProgress.recordGamePlayed(`Times Table Blitz (×${blitzTable})`, blitzScore, newBest);
            }
        }
    }, 1000);
}

function nextBlitzQ() {
    blitzMultiplier = rand(1, 12);
    blitzAnswer = blitzTable * blitzMultiplier;
    $('blitzQuestion').innerHTML = `<span class="display-eq">${blitzTable} × ${blitzMultiplier} = ?</span>`;
    const blitzInput = $('blitzInput');
    if (blitzInput) { blitzInput.value = ''; blitzInput.focus(); }
}

function checkBlitz() {
    if (!blitzRunning) return;
    const val = parseInt($('blitzInput').value);
    if (isNaN(val)) return;
    if (val === blitzAnswer) {
        blitzScore++;
        $('blitzScore').textContent = blitzScore;
        setResult('blitzResult', `✅ Correct! ${blitzTable} × ${blitzMultiplier} = ${blitzAnswer}`, true);
        nextBlitzQ();
    } else {
        setResult('blitzResult', `❌ Try again — ${blitzTable} × ${blitzMultiplier} = ?`, false);
        $('blitzInput').value = '';
        $('blitzInput').focus();
    }
}

/* ══════════════════════════════════════════════════════════════
   PRIMARY 3 — SHAPE QUEST
   ══════════════════════════════════════════════════════════════ */
let shapeScore = 0, shapeStreak = 0;

const SHAPES = [
    {
        name: 'Rectangle',
        gen() {
            const w = rand(3, 10), h = rand(3, 8);
            const svg = `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="20" width="${w * 14}" height="${h * 14}" fill="#dbeafe" stroke="#1a56a0" stroke-width="2"/>
                <text x="${20 + w * 7}" y="130" text-anchor="middle" font-size="13" fill="#4a2508">${w} cm</text>
                <text x="12" y="${20 + h * 7}" text-anchor="middle" font-size="13" fill="#4a2508" transform="rotate(-90,12,${20 + h * 7})">${h} cm</text>
            </svg>`;
            const area = w * h, peri = 2 * (w + h);
            const q = Math.random() < 0.5 ? 'area' : 'perimeter';
            const ans = q === 'area' ? area : peri;
            const unit = q === 'area' ? 'cm²' : 'cm';
            return { svg, q: `What is the ${q} of this rectangle?`, ans, unit };
        }
    },
    {
        name: 'Triangle (Right)',
        gen() {
            const base = rand(3, 10), height = rand(3, 8);
            const svg = `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
                <polygon points="20,130 ${20 + base * 14},130 20,${130 - height * 14}" fill="#dcfce7" stroke="#2e6645" stroke-width="2"/>
                <text x="${20 + base * 7}" y="148" text-anchor="middle" font-size="13" fill="#4a2508">${base} cm</text>
                <text x="8" y="${130 - height * 7}" text-anchor="end" font-size="13" fill="#4a2508">${height} cm</text>
                <rect x="20" y="118" width="12" height="12" fill="none" stroke="#2e6645" stroke-width="1.5"/>
            </svg>`;
            const area = parseFloat((0.5 * base * height).toFixed(1));
            return { svg, q: `What is the area of this right-angled triangle?`, ans: area, unit: 'cm²' };
        }
    },
    {
        name: 'Circle',
        gen() {
            const r = rand(2, 6);
            const svg = `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="80" r="${r * 14}" fill="#fef9c3" stroke="#c97b0a" stroke-width="2"/>
                <line x1="100" y1="80" x2="${100 + r * 14}" y2="80" stroke="#c97b0a" stroke-width="1.5" stroke-dasharray="4"/>
                <text x="${100 + r * 7}" y="75" text-anchor="middle" font-size="13" fill="#4a2508">${r} cm</text>
            </svg>`;
            const q = Math.random() < 0.5 ? 'area' : 'circumference';
            const unit = q === 'area' ? 'cm²' : 'cm';
            const approx = q === 'area'
                ? parseFloat((3.14 * r * r).toFixed(2))
                : parseFloat((2 * 3.14 * r).toFixed(2));
            return { svg, q: `What is the ${q} of this circle? (Use π ≈ 3.14)`, ans: approx, unit };
        }
    },
    {
        name: 'Parallelogram',
        gen() {
            const b = rand(4, 10), h = rand(3, 7);
            const svg = `<svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg">
                <polygon points="40,120 ${40 + b * 14},120 ${40 + b * 14 + 20},40 60,40" fill="#fce7f3" stroke="#9333ea" stroke-width="2"/>
                <text x="${40 + b * 7 + 10}" y="136" text-anchor="middle" font-size="13" fill="#4a2508">${b} cm</text>
                <line x1="40" y1="120" x2="40" y2="40" stroke="#9333ea" stroke-width="1.5" stroke-dasharray="4"/>
                <text x="28" y="82" text-anchor="middle" font-size="13" fill="#4a2508">${h} cm</text>
            </svg>`;
            const area = b * h;
            return { svg, q: `What is the area of this parallelogram?`, ans: area, unit: 'cm²' };
        }
    }
];

let shapeCurrentAns = 0, shapeCurrentUnit = '';

function startShape() {
    shapeScore = 0; shapeStreak = 0;
    $('shapeScore').textContent = 0;
    $('shapeStreak').textContent = 0;
    nextShape();
}

function nextShape() {
    const shape = SHAPES[rand(0, SHAPES.length - 1)];
    const { svg, q, ans, unit } = shape.gen();
    shapeCurrentAns = ans;
    shapeCurrentUnit = unit;
    $('shapeDisplay').innerHTML = svg;
    $('shapeQuestion').textContent = q;

    const wrongs = new Set();
    let attempts = 0;
    while (wrongs.size < 3 && attempts < 50) {
        attempts++;
        const delta = randF(0.3, ans * 0.8 + 1, 2);
        const w = parseFloat((Math.random() < 0.5 ? ans + delta : Math.max(0.1, ans - delta)).toFixed(2));
        if (Math.abs(w - ans) > 0.05 && w > 0) wrongs.add(w);
    }
    const opts = shuffle([ans, ...[...wrongs].slice(0, 3)]);
    const ci = opts.indexOf(ans);

    buildOptions('shapeOptions', opts.map(v => `${v}${unit ? ' ' + unit.split('(')[0].trim() : ''}`), ci, (correct) => {
        if (correct) {
            shapeScore += 10; shapeStreak++;
            $('shapeScore').textContent = shapeScore;
            $('shapeStreak').textContent = shapeStreak;
            setResult('shapeResult', `✅ Correct! ${ans}${shapeCurrentUnit ? ' ' + shapeCurrentUnit : ''}`, true);
        } else {
            shapeStreak = 0;
            $('shapeStreak').textContent = 0;
            setResult('shapeResult', `❌ Answer: ${ans}${shapeCurrentUnit ? ' ' + shapeCurrentUnit : ''}`, false);
        }
        setTimeout(nextShape, 1500);
    });

    $('shapeResult').textContent = '';
    $('shapeResult').className = 'result';
}

/* ══════════════════════════════════════════════════════════════
   SECONDARY 1 — ALGEBRA DUEL
   ══════════════════════════════════════════════════════════════ */
let algebraType = 'linear';
let algebraAnswer = null;
let algebraScore = 0, algebraStreak = 0;
let algebraTimerInt = null, algebraTimeLeft = 90, algebraRunning = false;

function setAlgebraType(type, btn) {
    algebraType = type;
    document.querySelectorAll('.atype-btn[data-type]').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
}

function startAlgebra() {
    if (algebraTimerInt) clearInterval(algebraTimerInt);
    algebraScore = 0; algebraStreak = 0; algebraRunning = true;
    algebraTimeLeft = 90;
    $('algebraScore').textContent = 0;
    $('algebraStreak').textContent = 0;
    $('algebraTimer').textContent = algebraTimeLeft;
    $('algebraResult').textContent = '';
    $('algebraResult').className = 'result';
    nextAlgebra();
    algebraTimerInt = setInterval(() => {
        algebraTimeLeft--;
        $('algebraTimer').textContent = algebraTimeLeft;
        if (algebraTimeLeft <= 0) {
            clearInterval(algebraTimerInt);
            algebraTimerInt = null;
            algebraRunning = false;
            setResult('algebraResult', `⏱ Time up! Final score: ${algebraScore}`, false);
            if (typeof MathProgress !== 'undefined') {
                MathProgress.recordGamePlayed('Algebra Duel', algebraScore, algebraScore >= 50);
            }
        }
    }, 1000);
}

function nextAlgebra() {
    if (!algebraRunning) return;
    $('algebraResult').textContent = '';
    $('algebraResult').className = 'result';
    const note = $('algebraNote');
    note.className = 'algebra-note';
    note.textContent = '';

    const inputArea = $('algebraInputArea');
    inputArea.innerHTML = '';

    if (algebraType === 'linear') {
        const a = rand(2, 9), b = rand(-10, 10), x = rand(-8, 8);
        const c = a * x + b;
        algebraAnswer = { x };
        const sign = b >= 0 ? `+ ${b}` : `− ${Math.abs(b)}`;
        $('algebraEq').innerHTML = `<span class="display-eq">${a}x ${sign} = ${c}</span>`;
        note.textContent = 'Solve for x. Give an exact integer.';
        note.classList.add('visible');
        inputArea.innerHTML = `<label>x = <input type="number" id="alg-x" placeholder="x…" autocomplete="off" aria-label="Value of x"></label>`;
        setTimeout(() => { const el = $('alg-x'); if (el) el.focus(); }, 50);

    } else if (algebraType === 'quadratic') {
        const p = rand(-6, 6), q = rand(-6, 6);
        const B = -(p + q), C = p * q;
        algebraAnswer = { roots: [p, q].sort((a, b) => a - b) };
        const Bstr = B > 0 ? `+ ${B}x` : B < 0 ? `− ${Math.abs(B)}x` : '';
        const Cstr = C > 0 ? `+ ${C}` : C < 0 ? `− ${Math.abs(C)}` : '';
        $('algebraEq').innerHTML = `<span class="display-eq">x² ${Bstr} ${Cstr} = 0</span>`;
        note.textContent = 'Find both roots. Enter the smaller root first.';
        note.classList.add('visible');
        inputArea.innerHTML = `
            <label>Root 1 (smaller): <input type="number" id="alg-r1" placeholder="smaller root…" aria-label="Smaller root"></label>
            <label>Root 2 (larger):  <input type="number" id="alg-r2" placeholder="larger root…"  aria-label="Larger root"></label>`;
        setTimeout(() => { const el = $('alg-r1'); if (el) el.focus(); }, 50);

    } else {
        // Simultaneous — use elimination method to guarantee integer solutions
        const x = rand(-5, 5), y = rand(-5, 5);
        const a1 = rand(1, 4), b1 = rand(1, 4);
        const a2 = rand(1, 4), b2 = rand(1, 4);
        const c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y;
        algebraAnswer = { x, y };
        const s1 = (b1 >= 0 ? `+ ${b1}y` : `− ${Math.abs(b1)}y`);
        const s2 = (b2 >= 0 ? `+ ${b2}y` : `− ${Math.abs(b2)}y`);
        $('algebraEq').innerHTML = `<span class="display-eq" style="font-size:1.3rem;">${a1}x ${s1} = ${c1}<br>${a2}x ${s2} = ${c2}</span>`;
        note.textContent = 'Solve simultaneously for x and y.';
        note.classList.add('visible');
        inputArea.innerHTML = `
            <label>x = <input type="number" id="alg-x" placeholder="x…" aria-label="Value of x"></label>
            <label>y = <input type="number" id="alg-y" placeholder="y…" aria-label="Value of y"></label>`;
        setTimeout(() => { const el = $('alg-x'); if (el) el.focus(); }, 50);
    }
}

function checkAlgebra() {
    if (!algebraRunning) return;
    let correct = false;

    if (algebraType === 'linear') {
        const val = parseFloat($('alg-x')?.value);
        correct = !isNaN(val) && val === algebraAnswer.x;

    } else if (algebraType === 'quadratic') {
        const r1 = parseFloat($('alg-r1')?.value);
        const r2 = parseFloat($('alg-r2')?.value);
        const [er1, er2] = algebraAnswer.roots;
        correct = !isNaN(r1) && !isNaN(r2) && r1 === Math.min(er1, er2) && r2 === Math.max(er1, er2);

    } else {
        const xv = parseFloat($('alg-x')?.value);
        const yv = parseFloat($('alg-y')?.value);
        correct = !isNaN(xv) && !isNaN(yv) && xv === algebraAnswer.x && yv === algebraAnswer.y;
    }

    const points = algebraType === 'simultaneous' ? 25 : algebraType === 'quadratic' ? 20 : 10;
    if (correct) {
        algebraStreak++;
        algebraScore += points + (algebraStreak >= 3 ? 5 : 0);
        $('algebraScore').textContent = algebraScore;
        $('algebraStreak').textContent = algebraStreak;
        setResult('algebraResult', `✅ Correct! +${points} pts`, true);
        if (typeof MathProgress !== 'undefined') {
            MathProgress.recordProblemSolved('algebra', true, algebraType + ' equation');
        }
    } else {
        algebraStreak = 0;
        $('algebraStreak').textContent = 0;
        let ansStr = '';
        if (algebraType === 'linear') ansStr = `x = ${algebraAnswer.x}`;
        else if (algebraType === 'quadratic') ansStr = `x = ${algebraAnswer.roots[0]} and x = ${algebraAnswer.roots[1]}`;
        else ansStr = `x = ${algebraAnswer.x}, y = ${algebraAnswer.y}`;
        setResult('algebraResult', `❌ Answer: ${ansStr}`, false);
        if (typeof MathProgress !== 'undefined') {
            MathProgress.recordProblemSolved('algebra', false, algebraType + ' equation');
        }
    }
    setTimeout(nextAlgebra, 1600);
}

function skipAlgebra() {
    if (!algebraRunning) return;
    algebraScore = Math.max(0, algebraScore - 5);
    $('algebraScore').textContent = algebraScore;
    nextAlgebra();
}

/* ══════════════════════════════════════════════════════════════
   SECONDARY 2 — TRIG CHALLENGE
   ══════════════════════════════════════════════════════════════ */
let trigAnswer = 0, trigHintText = '', trigScore = 0, trigStreak = 0;

const DEG = Math.PI / 180;
const sinD = a => Math.sin(a * DEG);
const cosD = a => Math.cos(a * DEG);
const tanD = a => Math.tan(a * DEG);

const TRIG_TYPES = [
    {
        gen() {
            const angle = [30, 45, 60, 37, 53][rand(0, 4)];
            const hyp   = rand(5, 15);
            const opp   = parseFloat((hyp * sinD(angle)).toFixed(2));
            const adj   = parseFloat((hyp * cosD(angle)).toFixed(2));
            drawRightTriangle(hyp, adj, opp, angle);
            trigHintText = `sin(${angle}°) = opposite / hypotenuse → opposite = ${hyp} × sin(${angle}°)`;
            $('trigQuestion').innerHTML = `<p>Given: angle = ${angle}°, hypotenuse = ${hyp} cm</p><p>Find the length of the <strong>opposite side</strong> (to 2 d.p.)</p>`;
            return { ans: opp };
        }
    },
    {
        gen() {
            const angle = [30, 45, 60, 37, 53][rand(0, 4)];
            const adj   = rand(5, 15);
            const hyp   = parseFloat((adj / cosD(angle)).toFixed(2));
            const opp   = parseFloat((hyp * sinD(angle)).toFixed(2));
            drawRightTriangle(hyp, adj, opp, angle);
            trigHintText = `cos(${angle}°) = adjacent / hypotenuse → hypotenuse = ${adj} / cos(${angle}°)`;
            $('trigQuestion').innerHTML = `<p>Given: angle = ${angle}°, adjacent = ${adj} cm</p><p>Find the <strong>hypotenuse</strong> (to 2 d.p.)</p>`;
            return { ans: hyp };
        }
    },
    {
        gen() {
            const opp = rand(4, 12), adj = rand(4, 12);
            const angle = parseFloat((Math.atan2(opp, adj) / DEG).toFixed(1));
            drawRightTriangleSOH(opp, adj);
            trigHintText = `tan(θ) = opposite / adjacent → θ = arctan(${opp} / ${adj})`;
            $('trigQuestion').innerHTML = `<p>Given: opposite = ${opp} cm, adjacent = ${adj} cm</p><p>Find <strong>angle θ</strong> in degrees (to 1 d.p.)</p>`;
            return { ans: parseFloat(angle) };
        }
    },
    {
        gen() {
            const a = rand(5, 12), b = rand(5, 12), C = rand(30, 120);
            const c = parseFloat(Math.sqrt(a * a + b * b - 2 * a * b * cosD(C)).toFixed(2));
            drawGeneralTriangle(a, b, C);
            trigHintText = `Cosine Rule: c² = a² + b² − 2ab·cos(C)`;
            $('trigQuestion').innerHTML = `<p>a = ${a} cm, b = ${b} cm, C = ${C}°</p><p>Using the <strong>Cosine Rule</strong>, find side <em>c</em> (to 2 d.p.)</p>`;
            return { ans: c };
        }
    },
    {
        gen() {
            const A = rand(30, 80), a = rand(5, 15);
            const B = rand(30, 180 - A - 1);
            const b = parseFloat((a * sinD(B) / sinD(A)).toFixed(2));
            drawSineRuleTriangle(a, A, b, B);
            trigHintText = `Sine Rule: a / sin(A) = b / sin(B) → b = a × sin(B) / sin(A)`;
            $('trigQuestion').innerHTML = `<p>a = ${a} cm, A = ${A}°, B = ${B}°</p><p>Using the <strong>Sine Rule</strong>, find side <em>b</em> (to 2 d.p.)</p>`;
            return { ans: b };
        }
    }
];

function drawRightTriangle(hyp, adj, opp, angle) {
    const svg = $('trigSVG');
    if (!svg) return;
    const scale = 12;
    const bx = 30, by = 180;
    const ex = bx + Math.min(adj * scale, 200);
    const ey = by - Math.min(opp * scale, 140);
    svg.innerHTML = `
        <line x1="${bx}" y1="${by}" x2="${ex}" y2="${by}" stroke="#1a56a0" stroke-width="2"/>
        <line x1="${ex}" y1="${by}" x2="${ex}" y2="${ey}" stroke="#1a56a0" stroke-width="2"/>
        <line x1="${bx}" y1="${by}" x2="${ex}" y2="${ey}" stroke="#c97b0a" stroke-width="2.5"/>
        <rect x="${ex - 10}" y="${by - 10}" width="10" height="10" fill="none" stroke="#1a56a0" stroke-width="1.5"/>
        <text x="${(bx + ex) / 2}" y="${by + 18}" text-anchor="middle" font-size="13" fill="#4a2508">${adj.toFixed(2)} cm (adj)</text>
        <text x="${ex + 14}" y="${(by + ey) / 2}" text-anchor="start" font-size="13" fill="#4a2508">${opp.toFixed(2)} cm (opp)</text>
        <text x="${(bx + ex) / 2 - 10}" y="${(by + ey) / 2 - 10}" text-anchor="middle" font-size="13" fill="#c97b0a">${hyp} cm (hyp)</text>
        <text x="${bx + 28}" y="${by - 6}" font-size="12" fill="#7b4a1e">${angle}°</text>`;
}

function drawRightTriangleSOH(opp, adj) {
    const svg = $('trigSVG');
    if (!svg) return;
    const scale = 10;
    const bx = 30, by = 180, ex = bx + adj * scale, ey = by - opp * scale;
    svg.innerHTML = `
        <line x1="${bx}" y1="${by}" x2="${ex}" y2="${by}" stroke="#1a56a0" stroke-width="2"/>
        <line x1="${ex}" y1="${by}" x2="${ex}" y2="${ey}" stroke="#1a56a0" stroke-width="2"/>
        <line x1="${bx}" y1="${by}" x2="${ex}" y2="${ey}" stroke="#c97b0a" stroke-width="2.5"/>
        <rect x="${ex - 10}" y="${by - 10}" width="10" height="10" fill="none" stroke="#1a56a0" stroke-width="1.5"/>
        <text x="${(bx + ex) / 2}" y="${by + 18}" text-anchor="middle" font-size="13" fill="#4a2508">${adj} cm (adj)</text>
        <text x="${ex + 14}" y="${(by + ey) / 2}" text-anchor="start" font-size="13" fill="#4a2508">${opp} cm (opp)</text>
        <text x="${bx + 28}" y="${by - 6}" font-size="12" fill="#7b4a1e">θ = ?</text>`;
}

function drawGeneralTriangle(a, b, C) {
    const svg = $('trigSVG');
    if (!svg) return;
    const scale = 8;
    const ax = 30, ay = 180;
    const bxp = ax + a * scale, byp = ay;
    const cxp = ax + b * scale * cosD(C), cyp = ay - b * scale * sinD(C);
    svg.innerHTML = `
        <polygon points="${ax},${ay} ${bxp},${byp} ${cxp},${cyp}" fill="none" stroke="#1a56a0" stroke-width="2"/>
        <text x="${(ax + bxp) / 2}" y="${ay + 18}" text-anchor="middle" font-size="13" fill="#4a2508">a = ${a} cm</text>
        <text x="${(ax + cxp) / 2 - 12}" y="${(ay + cyp) / 2}" text-anchor="end" font-size="13" fill="#4a2508">b = ${b} cm</text>
        <text x="${(bxp + cxp) / 2 + 10}" y="${(byp + cyp) / 2}" font-size="13" fill="#c97b0a">c = ?</text>
        <text x="${ax + 30}" y="${ay - 8}" font-size="12" fill="#7b4a1e">C = ${C}°</text>`;
}

function drawSineRuleTriangle(a, A, b, B) {
    const svg = $('trigSVG');
    if (!svg) return;
    const scale = 9;
    const ax = 30, ay = 180;
    const bxp = ax + a * scale, byp = ay;
    const cxp = ax + b * scale * cosD(A), cyp = ay - b * scale * sinD(A);
    svg.innerHTML = `
        <polygon points="${ax},${ay} ${bxp},${byp} ${cxp},${cyp}" fill="none" stroke="#1a56a0" stroke-width="2"/>
        <text x="${(ax + bxp) / 2}" y="${ay + 18}" text-anchor="middle" font-size="13" fill="#4a2508">a = ${a} cm</text>
        <text x="${(ax + cxp) / 2 - 12}" y="${(ay + cyp) / 2}" text-anchor="end" font-size="13" fill="#c97b0a">b = ?</text>
        <text x="${ax + 28}" y="${ay - 6}" font-size="12" fill="#7b4a1e">A = ${A}°</text>
        <text x="${(bxp + cxp) / 2}" y="${(byp + cyp) / 2 - 6}" font-size="12" fill="#7b4a1e">B = ${B}°</text>`;
}

function newTrig() {
    const type = TRIG_TYPES[rand(0, TRIG_TYPES.length - 1)];
    const { ans } = type.gen();
    trigAnswer = ans;
    const trigInput = $('trigInput');
    if (trigInput) { trigInput.value = ''; trigInput.focus(); }
    $('trigResult').textContent = '';
    $('trigResult').className = 'result';
    const hintEl = $('trigHint');
    if (hintEl) { hintEl.style.display = 'none'; hintEl.textContent = ''; }
}

function showTrigHint() {
    const h = $('trigHint');
    if (!h) return;
    h.textContent = `💡 ${trigHintText}`;
    h.style.display = 'block';
}

function checkTrig() {
    const inputEl = $('trigInput');
    if (!inputEl) return;
    const val = parseFloat(parseFloat(inputEl.value).toFixed(2));
    if (isNaN(val)) return;
    const correct = Math.abs(val - trigAnswer) <= 0.05;
    if (correct) {
        trigScore += 20; trigStreak++;
        $('trigScore').textContent = trigScore;
        $('trigStreak').textContent = trigStreak;
        setResult('trigResult', `✅ Correct! Answer = ${trigAnswer}`, true);
        if (typeof MathProgress !== 'undefined') {
            MathProgress.recordProblemSolved('trigonometry', true, 'trig problem');
        }
        setTimeout(newTrig, 1500);
    } else {
        trigStreak = 0;
        $('trigStreak').textContent = 0;
        const hintEl = $('trigHint');
        if (hintEl) { hintEl.textContent = `💡 ${trigHintText}`; hintEl.style.display = 'block'; }
        setResult('trigResult', `❌ Answer = ${trigAnswer}. Check your formula.`, false);
        if (typeof MathProgress !== 'undefined') {
            MathProgress.recordProblemSolved('trigonometry', false, 'trig problem');
        }
        setTimeout(newTrig, 2500);
    }
}

/* ══════════════════════════════════════════════════════════════
   SECONDARY 3 — GRAPH DECODER
   ══════════════════════════════════════════════════════════════ */
let graphScore = 0, graphStreak = 0;
let graphCtx = null;

function initGraph() {
    const canvas = $('graphCanvas');
    if (canvas && canvas.getContext) graphCtx = canvas.getContext('2d');
}

const GRAPH_PUZZLES = [
    { fn: x => 2 * x + 3,   label: 'y = 2x + 3',  q: 'What is the equation of this line?',                      opts: ['y = 2x + 3', 'y = 3x + 2', 'y = 2x − 3', 'y = −2x + 3'], ci: 0 },
    { fn: x => -x + 4,      label: 'y = −x + 4',   q: 'What is the equation of this line?',                      opts: ['y = x + 4', 'y = −x + 4', 'y = −x − 4', 'y = x − 4'],   ci: 1 },
    { fn: x => x * x - 4,   label: 'y = x² − 4',   q: 'What are the x-intercepts (roots) of this curve?',        opts: ['x = 2 and x = −2', 'x = 4 and x = −4', 'x = 2 only', 'x = 0 and x = 4'], ci: 0 },
    { fn: x => 0.5 * x + 1, label: 'y = ½x + 1',   q: 'What is the gradient (slope) of this line?',              opts: ['1', '½', '2', '−½'], ci: 1 },
    { fn: x => -x * x + 4,  label: 'y = −x² + 4',  q: 'Where does this parabola reach its maximum?',             opts: ['(0, −4)', '(0, 4)', '(2, 0)', '(−2, 0)'], ci: 1 },
    { fn: x => 3 * x - 6,   label: 'y = 3x − 6',   q: 'What is the y-intercept?',                                opts: ['y = 3', 'y = −6', 'y = 6', 'y = 0'], ci: 1 }
];

let currentGraphPuzzle = null;

function drawGraph(fn, xMin = -5, xMax = 5) {
    if (!graphCtx) return;
    const canvas = $('graphCanvas');
    const W = canvas.width, H = canvas.height;
    const ctx = graphCtx;
    ctx.clearRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2;
    const scaleX = W / (xMax - xMin);
    const scaleY = H / 12;

    ctx.strokeStyle = '#e8e0d8'; ctx.lineWidth = 1;
    for (let x = -5; x <= 5; x++) {
        const px = cx + x * scaleX;
        ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, H); ctx.stroke();
    }
    for (let y = -6; y <= 6; y++) {
        const py = cy - y * scaleY;
        ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(W, py); ctx.stroke();
    }

    ctx.strokeStyle = '#4a2508'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();

    ctx.fillStyle = '#7a5c42';
    ctx.font = '11px DM Mono, monospace';
    ctx.textAlign = 'center';
    for (let x = -5; x <= 5; x++) {
        if (x === 0) continue;
        ctx.fillText(x, cx + x * scaleX, cy + 14);
    }
    ctx.textAlign = 'right';
    for (let y = -5; y <= 5; y++) {
        if (y === 0) continue;
        ctx.fillText(y, cx - 4, cy - y * scaleY + 4);
    }

    ctx.strokeStyle = '#1a56a0'; ctx.lineWidth = 2.5;
    ctx.beginPath();
    let first = true;
    for (let px = 0; px <= W; px++) {
        const x = (px - cx) / scaleX;
        const y = fn(x);
        const py = cy - y * scaleY;
        if (Math.abs(py) > H * 3) { first = true; continue; }
        if (first) { ctx.moveTo(px, py); first = false; }
        else ctx.lineTo(px, py);
    }
    ctx.stroke();
}

function newGraph() {
    currentGraphPuzzle = GRAPH_PUZZLES[rand(0, GRAPH_PUZZLES.length - 1)];
    drawGraph(currentGraphPuzzle.fn);
    $('graphQuestion').innerHTML = `<p>${currentGraphPuzzle.q}</p>`;
    $('graphResult').textContent = '';
    $('graphResult').className = 'result';

    buildOptions('graphOptions', currentGraphPuzzle.opts, currentGraphPuzzle.ci, (correct) => {
        if (correct) {
            graphScore += 15; graphStreak++;
            $('graphScore').textContent = graphScore;
            $('graphStreak').textContent = graphStreak;
            setResult('graphResult', `✅ Correct! ${currentGraphPuzzle.label}`, true);
        } else {
            graphStreak = 0;
            $('graphStreak').textContent = 0;
            setResult('graphResult', `❌ Answer: ${currentGraphPuzzle.label}`, false);
        }
        setTimeout(newGraph, 2000);
    });
}

/* ══════════════════════════════════════════════════════════════
   SECONDARY 4 — FACTOR STORM
   ══════════════════════════════════════════════════════════════ */
let factorScore = 0, factorStreak = 0;
let stormTimeout = null;

const FACTOR_PUZZLES = [];

(function buildFactorPuzzles() {
    for (let p = -6; p <= 6; p++) {
        for (let q = -6; q <= 6; q++) {
            if (p === 0 || q === 0) continue;
            const b = p + q, c = p * q;
            const bstr = b > 0 ? `+ ${b}x` : b < 0 ? `− ${Math.abs(b)}x` : '';
            const cstr = c > 0 ? `+ ${c}` : c < 0 ? `− ${Math.abs(c)}` : '';
            const pSign = p > 0 ? '+' : '';
            const qSign = q > 0 ? '+' : '';
            FACTOR_PUZZLES.push({
                eq: `x² ${bstr} ${cstr}`.trim(),
                ans: `(x ${pSign} ${p})(x ${qSign} ${q})`,
                wrongs: [
                    `(x + ${p + 1})(x + ${q - 1})`,
                    `(x ${pSign}${p})(x ${-q > 0 ? '+' : ''}${-q})`,
                    `(x − ${Math.abs(p)})(x + ${Math.abs(q) + 1})`
                ]
            });
        }
    }
    [[2, 3], [3, 4], [4, 5], [2, 5], [3, 2], [5, 2]].forEach(([a, b]) => {
        FACTOR_PUZZLES.push({
            eq: `${a * a}x² − ${b * b}`,
            ans: `(${a}x + ${b})(${a}x − ${b})`,
            wrongs: [`(${a}x + ${b})²`, `(${a}x − ${b})²`, `${a * 2}x(x − ${b})`]
        });
    });
})();

let factorCurrentPuzzle = null;

function startFactorStorm() {
    factorScore = 0; factorStreak = 0;
    $('factorScore').textContent = 0;
    $('factorStreak').textContent = 0;
    nextFactorPuzzle();
}

function nextFactorPuzzle() {
    if (stormTimeout) clearTimeout(stormTimeout);

    factorCurrentPuzzle = FACTOR_PUZZLES[rand(0, Math.min(FACTOR_PUZZLES.length - 1, 100))];
    $('factorEq').textContent = factorCurrentPuzzle.eq;
    $('factorResult').textContent = '';
    $('factorResult').className = 'result';

    // Rebuild storm bar
    const stormBar = $('stormBar');
    stormBar.innerHTML = '';
    const overlay = document.createElement('div');
    overlay.id = 'stormOverlay';
    stormBar.appendChild(overlay);

    // Force reflow then kick off the CSS transition (width 100% → 0% in 8 s)
    overlay.getBoundingClientRect();
    overlay.style.width = '0%';

    // Auto-fail after 8 s
    stormTimeout = setTimeout(() => {
        factorStreak = 0;
        $('factorStreak').textContent = 0;
        setResult('factorResult', `⛈ Storm hit! Answer: ${factorCurrentPuzzle.ans}`, false);
        const opts = shuffle([factorCurrentPuzzle.ans, ...factorCurrentPuzzle.wrongs]);
        buildOptions('factorOptions', opts, opts.indexOf(factorCurrentPuzzle.ans), () => {});
        stormTimeout = setTimeout(nextFactorPuzzle, 2500);
    }, 8000);

    const opts = shuffle([factorCurrentPuzzle.ans, ...factorCurrentPuzzle.wrongs]);
    const ci = opts.indexOf(factorCurrentPuzzle.ans);
    buildOptions('factorOptions', opts, ci, (correct) => {
        clearTimeout(stormTimeout);
        if (correct) {
            factorScore += 20; factorStreak++;
            $('factorScore').textContent = factorScore;
            $('factorStreak').textContent = factorStreak;
            setResult('factorResult', `✅ Correct! ${factorCurrentPuzzle.eq} = ${factorCurrentPuzzle.ans}`, true);
            if (typeof MathProgress !== 'undefined') {
                MathProgress.recordProblemSolved('algebra', true, 'factorisation');
            }
        } else {
            factorStreak = 0;
            $('factorStreak').textContent = 0;
            setResult('factorResult', `❌ Answer: ${factorCurrentPuzzle.ans}`, false);
        }
        stormTimeout = setTimeout(nextFactorPuzzle, 1500);
    });
}

/* ══════════════════════════════════════════════════════════════
   UNIVERSITY 1 — CALCULUS DUEL
   ══════════════════════════════════════════════════════════════ */
let calcMode = 'diff';
let calculusScore = 0, calculusStreak = 0;

const DIFF_PROBLEMS = [
    { fn: 'f(x) = x⁵',                 directive: 'Differentiate',                    ans: '5x⁴',                   working: 'Power rule: d/dx[xⁿ] = nxⁿ⁻¹\nd/dx[x⁵] = 5x⁴',                                                                              wrongs: ['4x⁵', '5x⁵', 'x⁴'] },
    { fn: 'f(x) = 3x⁴ − 2x² + 7',      directive: 'Differentiate',                    ans: '12x³ − 4x',             working: 'd/dx[3x⁴] = 12x³\nd/dx[−2x²] = −4x\nd/dx[7] = 0\nTotal: 12x³ − 4x',                                                         wrongs: ['12x³ − 4x + 7', '12x³ + 4x', '3x³ − 2x'] },
    { fn: 'f(x) = sin(x)',             directive: 'Differentiate',                    ans: 'cos(x)',                working: 'Standard result: d/dx[sin x] = cos x',                                                                                          wrongs: ['−cos(x)', 'sin(x)', '−sin(x)'] },
    { fn: 'f(x) = e^(3x)',             directive: 'Differentiate',                    ans: '3e^(3x)',               working: 'Chain rule: d/dx[e^(kx)] = k·e^(kx)\nd/dx[e^(3x)] = 3e^(3x)',                                                                  wrongs: ['e^(3x)', '3xe^(3x)', 'e^(3)'] },
    { fn: 'f(x) = x²·sin(x)',          directive: 'Differentiate (Product Rule)',     ans: '2x·sin(x) + x²·cos(x)', working: 'Product Rule: (uv)\' = u\'v + uv\'\nu = x², u\' = 2x\nv = sin x, v\' = cos x\n= 2x·sin(x) + x²·cos(x)',                       wrongs: ['2x·cos(x)', 'x²·cos(x) + 2x', '2x·sin(x)·cos(x)'] },
    { fn: 'f(x) = sin(x²)',            directive: 'Differentiate (Chain Rule)',       ans: '2x·cos(x²)',            working: 'Chain rule: d/dx[sin(u)] = cos(u)·u\'\nu = x², u\' = 2x\n= 2x·cos(x²)',                                                        wrongs: ['cos(x²)', 'cos(2x)', '2cos(x²)'] },
    { fn: 'f(x) = ln(x)',              directive: 'Differentiate',                    ans: '1/x',                   working: 'Standard result: d/dx[ln x] = 1/x',                                                                                             wrongs: ['x/ln(x)', 'ln(x)/x', '1/x²'] },
    { fn: 'f(x) = tan(x)',             directive: 'Differentiate',                    ans: 'sec²(x)',               working: 'Standard result: d/dx[tan x] = sec²x\nAlternatively = 1/cos²x',                                                                wrongs: ['cos²(x)', '1/sin²(x)', 'sec(x)·tan(x)'] },
    { fn: 'f(x) = (2x + 1)⁶',          directive: 'Differentiate (Chain Rule)',       ans: '12(2x + 1)⁵',           working: 'Chain rule: d/dx[u⁶] = 6u⁵·u\'\nu = 2x+1, u\' = 2\n= 6·(2x+1)⁵·2 = 12(2x+1)⁵',                                              wrongs: ['6(2x+1)⁵', '12(2x+1)⁶', '(2x+1)⁵'] },
];

const INTEG_PROBLEMS = [
    { fn: '∫ x⁴ dx',                directive: 'Integrate',                        ans: 'x⁵/5 + C',             working: 'Power rule: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C\n∫x⁴ dx = x⁵/5 + C',                                                              wrongs: ['4x³ + C', 'x⁵ + C', 'x⁵/4 + C'] },
    { fn: '∫ cos(x) dx',            directive: 'Integrate',                        ans: 'sin(x) + C',           working: 'Standard result: ∫cos x dx = sin x + C',                                                                                   wrongs: ['−sin(x) + C', 'cos(x) + C', 'tan(x) + C'] },
    { fn: '∫ e^(2x) dx',            directive: 'Integrate',                        ans: '½e^(2x) + C',          working: '∫e^(kx) dx = (1/k)e^(kx) + C\n∫e^(2x) dx = (1/2)e^(2x) + C = ½e^(2x) + C',                                            wrongs: ['2e^(2x) + C', 'e^(2x) + C', 'e^x + C'] },
    { fn: '∫ 1/x dx',               directive: 'Integrate',                        ans: 'ln|x| + C',            working: 'Standard result: ∫(1/x) dx = ln|x| + C\n(The absolute value matters for x < 0)',                                          wrongs: ['x⁻² + C', '1/x² + C', 'ln(x²) + C'] },
    { fn: '∫₀² (3x² + 2) dx',       directive: 'Evaluate the definite integral',   ans: '12',                   working: '∫(3x² + 2)dx = x³ + 2x + C\nApply limits: [x³ + 2x]₀²\n= (8 + 4) − (0 + 0) = 12',                                       wrongs: ['10', '14', '8'] },
    { fn: '∫ x·eˣ dx',              directive: 'Integrate (by parts)',             ans: 'eˣ(x − 1) + C',        working: 'Integration by parts: ∫u dv = uv − ∫v du\nu = x → du = dx\ndv = eˣdx → v = eˣ\n= xeˣ − ∫eˣdx = xeˣ − eˣ + C = eˣ(x−1) + C', wrongs: ['xeˣ + C', 'eˣ + C', 'x²eˣ/2 + C'] },
    { fn: '∫ sin²(x) dx',           directive: 'Integrate',                        ans: 'x/2 − sin(2x)/4 + C',  working: 'Use identity: sin²x = (1 − cos 2x)/2\n∫sin²x dx = ∫(1−cos 2x)/2 dx\n= x/2 − sin(2x)/4 + C',                          wrongs: ['−cos²(x)/2 + C', '−sin(x)cos(x) + C', 'x/2 + C'] },
    { fn: '∫ x/(x²+1) dx',          directive: 'Integrate (substitution)',         ans: '½ln(x²+1) + C',        working: 'Substitution: u = x²+1, du = 2x dx\n∫x/(x²+1) dx = ½∫(1/u)du = ½ln|u| + C\n= ½ln(x²+1) + C',                         wrongs: ['ln(x²+1) + C', 'arctan(x) + C', 'x²/(x²+1) + C'] },
];

function setCalcMode(mode, btn) {
    calcMode = mode;
    document.querySelectorAll('.atype-btn[data-cmode]').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    newCalculus();
}

let currentCalculusProblem = null;

function newCalculus() {
    const pool = calcMode === 'diff' ? DIFF_PROBLEMS : INTEG_PROBLEMS;
    currentCalculusProblem = pool[rand(0, pool.length - 1)];
    $('calculusDirective').textContent = currentCalculusProblem.directive;
    $('calculusFn').textContent = currentCalculusProblem.fn;
    $('calculusDomain').textContent = '';
    $('calculusWorking').style.display = 'none';
    $('calculusWorking').textContent = '';
    $('calculusResult').textContent = '';
    $('calculusResult').className = 'result';

    const opts = shuffle([currentCalculusProblem.ans, ...currentCalculusProblem.wrongs]);
    const ci = opts.indexOf(currentCalculusProblem.ans);
    buildOptions('calculusOptions', opts, ci, (correct) => {
        if (correct) {
            calculusScore += 25; calculusStreak++;
            $('calculusScore').textContent = calculusScore;
            $('calculusStreak').textContent = calculusStreak;
            setResult('calculusResult', `✅ Correct! ${currentCalculusProblem.directive}: ${currentCalculusProblem.fn} → ${currentCalculusProblem.ans}`, true);
            if (typeof MathProgress !== 'undefined') {
                const topic = calcMode === 'diff' ? 'differentiation' : 'integration';
                MathProgress.recordProblemSolved(topic, true, currentCalculusProblem.fn);
            }
        } else {
            calculusStreak = 0;
            $('calculusStreak').textContent = 0;
            setResult('calculusResult', `❌ Answer: ${currentCalculusProblem.ans}`, false);
        }
        setTimeout(newCalculus, 2200);
    });
}

function showCalculusWorking() {
    if (!currentCalculusProblem) return;
    const w = $('calculusWorking');
    w.style.display = 'block';
    w.textContent = currentCalculusProblem.working;
}

/* ══════════════════════════════════════════════════════════════
   UNIVERSITY 2 — MATRIX CIPHER
   ══════════════════════════════════════════════════════════════ */
let matrixOp = 'det';
let matrixScore = 0, matrixStreak = 0;
let currentMatrixProblem = null;

function setMatrixOp(op, btn) {
    matrixOp = op;
    document.querySelectorAll('.atype-btn[data-mop]').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    newMatrix();
}

function matToDisplay(M) {
    const rows = M.map(r => r.map(v => String(v).padStart(4)).join(' ')).join('\n');
    return `<div class="matrix-box">${rows}</div>`;
}

function newMatrix() {
    $('matrixWorking').style.display = 'none';
    $('matrixResult').textContent = '';
    $('matrixResult').className = 'result';
    let working = '', opts = [], ci = 0;

    if (matrixOp === 'det') {
        const a = rand(-4, 4), b = rand(-4, 4), c = rand(-4, 4), d = rand(-4, 4);
        const det = a * d - b * c;
        working = `det(A) = ad − bc\n= (${a})(${d}) − (${b})(${c})\n= ${a * d} − ${b * c}\n= ${det}`;
        currentMatrixProblem = { type: 'det', working };
        $('matrixArena').innerHTML = `<div class="matrix-display">${matToDisplay([[a, b], [c, d]])}</div>`;
        $('matrixQuestion').textContent = 'Calculate the determinant of this 2×2 matrix.';
        const wrongs = [det + rand(1, 4), det - rand(1, 4), -det].filter((v, i, arr) => arr.indexOf(v) === i && v !== det);
        opts = shuffle([det, ...wrongs.slice(0, 3)]);
        ci = opts.indexOf(det);

    } else if (matrixOp === 'mult') {
        const A = [[rand(-3, 3), rand(-3, 3)], [rand(-3, 3), rand(-3, 3)]];
        const B = [[rand(-3, 3), rand(-3, 3)], [rand(-3, 3), rand(-3, 3)]];
        const C = [
            [A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
            [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]
        ];
        const ri = rand(0, 1), ci2 = rand(0, 1);
        const ans = C[ri][ci2];
        working = `AB row ${ri + 1}, col ${ci2 + 1}:\n= [${A[ri].join(', ')}] · [${B.map(r => r[ci2]).join(', ')}]\n= ${A[ri][0]}×${B[0][ci2]} + ${A[ri][1]}×${B[1][ci2]}\n= ${A[ri][0] * B[0][ci2]} + ${A[ri][1] * B[1][ci2]}\n= ${ans}`;
        currentMatrixProblem = { type: 'mult', ans, working };
        $('matrixArena').innerHTML = `<div class="matrix-display">${matToDisplay(A)}<span class="matrix-op-symbol">×</span>${matToDisplay(B)}</div>`;
        $('matrixQuestion').textContent = `Find the element in row ${ri + 1}, column ${ci2 + 1} of the product AB.`;
        const wrongs2 = [ans + rand(1, 5), ans - rand(1, 5), ans * 2].filter((v, i, arr) => arr.indexOf(v) === i && v !== ans);
        opts = shuffle([ans, ...wrongs2.slice(0, 3)]);
        ci = opts.indexOf(ans);

    } else if (matrixOp === 'inv') {
        let a, b, c, d, det;
        do { a = rand(-3, 3); b = rand(-3, 3); c = rand(-3, 3); d = rand(-3, 3); det = a * d - b * c; }
        while (det === 0 || Math.abs(det) > 6);
        const ans = parseFloat((d / det).toFixed(2));
        working = `For A = [[${a},${b}],[${c},${d}]],\ndet(A) = ${a}×${d} − ${b}×${c} = ${det}\nA⁻¹ = (1/${det}) × [[${d}, ${-b}],[${-c}, ${a}]]\nTop-left element of A⁻¹ = ${d}/${det} ≈ ${ans}`;
        currentMatrixProblem = { type: 'inv', ans, working };
        $('matrixArena').innerHTML = `<div class="matrix-display">${matToDisplay([[a, b], [c, d]])}</div>`;
        $('matrixQuestion').textContent = `Find A⁻¹. What is the top-left element (to 2 d.p.)?`;
        const w3 = [parseFloat((a / det).toFixed(2)), parseFloat((-b / det).toFixed(2)), parseFloat((1 / det).toFixed(2))].filter(v => Math.abs(v - ans) > 0.01);
        opts = shuffle([ans, ...w3.slice(0, 3)]);
        ci = opts.indexOf(ans);

    } else {
        // Eigenvalues
        const a = rand(1, 5), d = rand(1, 5);
        const b = rand(-2, 2), c = rand(-2, 2);
        const trace = a + d, detM = a * d - b * c;
        const disc = trace * trace - 4 * detM;

        if (disc < 0) {
            $('matrixArena').innerHTML = `<div class="matrix-display">${matToDisplay([[a, 0], [0, d]])}</div>`;
            $('matrixQuestion').textContent = `What are the eigenvalues of this diagonal matrix?`;
            const ansStr = `λ = ${a} and λ = ${d}`;
            working = `For a diagonal matrix, eigenvalues are the diagonal entries.\nλ₁ = ${a}, λ₂ = ${d}`;
            const w4 = [`λ = ${a} and λ = ${d}`, `λ = ${a + d}`, `λ = ${a * d}`, `λ = ${-a} and λ = ${-d}`];
            opts = shuffle(w4);
            ci = opts.indexOf(ansStr);
            if (ci === -1) { opts[0] = ansStr; ci = 0; }
            currentMatrixProblem = { type: 'eigen', ans: ansStr, working };
        } else {
            const l1 = parseFloat(((trace + Math.sqrt(disc)) / 2).toFixed(2));
            const l2 = parseFloat(((trace - Math.sqrt(disc)) / 2).toFixed(2));
            $('matrixArena').innerHTML = `<div class="matrix-display">${matToDisplay([[a, b], [c, d]])}</div>`;
            $('matrixQuestion').textContent = `Find the eigenvalues (to 2 d.p.) using the characteristic equation.`;
            const ansStr = `λ = ${l1} and λ = ${l2}`;
            working = `Characteristic equation: det(A − λI) = 0\n(${a}−λ)(${d}−λ) − (${b})(${c}) = 0\nλ² − ${trace}λ + ${detM} = 0\nλ = (${trace} ± √(${trace}²−4·${detM}))/2\n= (${trace} ± √${disc})/2\nλ = ${l1} and λ = ${l2}`;
            opts = shuffle([ansStr, `λ = ${l1 + 1} and λ = ${l2}`, `λ = ${l1} and λ = ${l1}`, `λ = ${trace} and λ = ${detM}`]);
            ci = opts.indexOf(ansStr);
            if (ci === -1) { opts[0] = ansStr; ci = 0; }
            currentMatrixProblem = { type: 'eigen', ans: ansStr, working };
        }
    }

    currentMatrixProblem.working = working;
    buildOptions('matrixOptions', opts, ci, (correct) => {
        if (correct) {
            matrixScore += 30; matrixStreak++;
            $('matrixScore').textContent = matrixScore;
            $('matrixStreak').textContent = matrixStreak;
            setResult('matrixResult', `✅ Correct!`, true);
            if (typeof MathProgress !== 'undefined') {
                MathProgress.recordProblemSolved('matrices', true, matrixOp);
            }
        } else {
            matrixStreak = 0;
            $('matrixStreak').textContent = 0;
            setResult('matrixResult', `❌ Check the working below.`, false);
        }
        setTimeout(newMatrix, 2200);
    });
}

function showMatrixWorking() {
    if (!currentMatrixProblem) return;
    const w = $('matrixWorking');
    w.style.display = 'block';
    w.textContent = currentMatrixProblem.working;
}

/* ══════════════════════════════════════════════════════════════
   UNIVERSITY 3 — SERIES VERDICT
   ══════════════════════════════════════════════════════════════ */
let seriesScoreU = 0, seriesStreakU = 0;
let selectedSeriesTest = '';
let currentSeriesProblem = null;

const SERIES_PROBLEMS = [
    { term: '1/n²',          converges: true,  bestTest: 'ptest',      solution: 'p-Series Test: ∑1/nᵖ converges iff p > 1.\nHere p = 2 > 1, so the series CONVERGES.\nIn fact, ∑1/n² = π²/6 (Basel Problem).' },
    { term: '1/n',           converges: false, bestTest: 'ptest',      solution: 'p-Series Test: ∑1/nᵖ converges iff p > 1.\nHere p = 1. This is the harmonic series, which DIVERGES.\nProof: group terms to show partial sums → ∞.' },
    { term: '(−1)ⁿ / n',     converges: true,  bestTest: 'alternating', solution: 'Alternating Series Test (Leibniz):\n1. Terms alternate in sign ✓\n2. |aₙ| = 1/n is decreasing ✓\n3. lim 1/n = 0 ✓\nConclusion: CONVERGES (conditionally).' },
    { term: '1/2ⁿ',          converges: true,  bestTest: 'geometric',  solution: 'Geometric Series: ∑arⁿ converges iff |r| < 1.\nHere r = 1/2, |r| = 0.5 < 1.\nSum = a/(1−r) = 1/(1−½) = 2. CONVERGES.' },
    { term: '1/√n',          converges: false, bestTest: 'ptest',      solution: 'p-Series Test: ∑1/nᵖ with p = ½.\nSince p = 0.5 < 1, the series DIVERGES.' },
    { term: 'n / 2ⁿ',        converges: true,  bestTest: 'ratio',      solution: 'Ratio Test: L = lim|aₙ₊₁/aₙ|\n= lim |(n+1)/2ⁿ⁺¹ × 2ⁿ/n|\n= lim (n+1)/(2n) = 1/2\nSince L = 1/2 < 1, series CONVERGES.' },
    { term: '2ⁿ / n!',       converges: true,  bestTest: 'ratio',      solution: 'Ratio Test: L = lim|aₙ₊₁/aₙ|\n= lim |2ⁿ⁺¹/(n+1)! × n!/2ⁿ|\n= lim 2/(n+1) = 0\nSince L = 0 < 1, series CONVERGES.' },
    { term: '1/(n·ln n)',     converges: false, bestTest: 'integral',   solution: 'Integral Test: f(x) = 1/(x ln x) is positive and decreasing.\n∫₂^∞ 1/(x ln x) dx = [ln(ln x)]₂^∞ → ∞\nIntegral diverges → series DIVERGES.' },
    { term: 'n² / 3ⁿ',       converges: true,  bestTest: 'ratio',      solution: 'Ratio Test: L = lim |(n+1)²/3ⁿ⁺¹ × 3ⁿ/n²|\n= lim (n+1)²/(3n²) = 1/3\nSince L = 1/3 < 1, series CONVERGES.' },
    { term: '(−1)ⁿ·n/(n+1)', converges: false, bestTest: 'divergence', solution: 'Divergence Test: lim aₙ = lim (−1)ⁿ·n/(n+1)\nThis limit does not exist (oscillates between ±1).\nSince lim aₙ ≠ 0, series DIVERGES.' },
    { term: '1/(n(n+1))',     converges: true,  bestTest: 'comparison', solution: 'Telescoping: partial fractions → 1/n − 1/(n+1)\nPartial sums: Sₙ = 1 − 1/(n+1) → 1\nSeries CONVERGES to 1.' },
    { term: 'ln(n)/n',        converges: false, bestTest: 'comparison', solution: 'Comparison: for n ≥ 3, ln(n) ≥ 1\nSo ln(n)/n ≥ 1/n\nSince ∑1/n diverges (harmonic), by comparison ∑ln(n)/n DIVERGES.' },
    { term: '(n!)² / (2n)!', converges: true,  bestTest: 'ratio',      solution: 'Ratio Test: L = lim|aₙ₊₁/aₙ|\n= lim (n+1)²/((2n+2)(2n+1))\n= lim (n+1)²/(4n²+6n+2) = 1/4\nSince L = 1/4 < 1, CONVERGES.' },
    { term: '3ⁿ / n³',       converges: false, bestTest: 'ratio',      solution: 'Ratio Test: L = lim|aₙ₊₁/aₙ|\n= lim 3ⁿ⁺¹/(n+1)³ × n³/3ⁿ\n= lim 3·(n/(n+1))³ = 3\nSince L = 3 > 1, series DIVERGES.' },
];

const TEST_DESCRIPTIONS = {
    divergence: 'If lim aₙ ≠ 0 then ∑aₙ diverges. (But lim aₙ = 0 does NOT mean it converges!)',
    geometric:  'For ∑arⁿ: converges if |r| < 1, sum = a/(1−r). Diverges if |r| ≥ 1.',
    ptest:      'For ∑1/nᵖ: converges if p > 1, diverges if p ≤ 1.',
    ratio:      'Compute L = lim |aₙ₊₁/aₙ|. If L < 1 → converges; L > 1 → diverges; L = 1 → inconclusive.',
    comparison: 'Compare term-by-term with known series: if 0 ≤ aₙ ≤ bₙ and ∑bₙ converges, so does ∑aₙ.',
    alternating:'For ∑(−1)ⁿbₙ: converges if bₙ > 0, bₙ decreasing, bₙ → 0 (Leibniz criterion).',
    integral:   'If f(x) is positive, continuous, decreasing on [1,∞), then ∑aₙ and ∫f(x)dx share fate.',
    roottest:   'Compute L = lim (aₙ)^(1/n). If L < 1 → converges; L > 1 → diverges; L = 1 → inconclusive.',
};

function selectSeriesTest(test) {
    selectedSeriesTest = test;
    document.querySelectorAll('.stest-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.stest-btn[data-test="${test}"]`)?.classList.add('active');
    const d = $('selectedTestDisplay');
    d.textContent = `[${test.toUpperCase()}] ${TEST_DESCRIPTIONS[test]}`;
    d.classList.add('visible');
}

function newSeries() {
    currentSeriesProblem = SERIES_PROBLEMS[rand(0, SERIES_PROBLEMS.length - 1)];
    $('seriesTermU').textContent = currentSeriesProblem.term;
    $('seriesReasoning').value = '';
    $('seriesResultU').textContent = '';
    $('seriesResultU').className = 'result';
    $('seriesSolution').style.display = 'none';
    selectedSeriesTest = '';
    document.querySelectorAll('.stest-btn').forEach(b => b.classList.remove('active'));
    const d = $('selectedTestDisplay');
    d.textContent = '';
    d.classList.remove('visible');
}

function submitSeriesVerdict(userConverges) {
    if (!currentSeriesProblem) return;
    const correct = userConverges === currentSeriesProblem.converges;
    const testBonus = selectedSeriesTest === currentSeriesProblem.bestTest ? 10 : 0;
    if (correct) {
        seriesScoreU += 25 + testBonus;
        seriesStreakU++;
        $('seriesScoreU').textContent = seriesScoreU;
        $('seriesStreakU').textContent = seriesStreakU;
        const msg = testBonus
            ? `✅ Correct! +${25 + testBonus} pts (optimal test bonus! 🏆)`
            : `✅ Correct! +25 pts`;
        setResult('seriesResultU', msg, true);
        if (typeof MathProgress !== 'undefined') {
            MathProgress.recordProblemSolved('sequences', true, 'convergence: ' + currentSeriesProblem.term);
        }
    } else {
        seriesStreakU = 0;
        $('seriesStreakU').textContent = 0;
        seriesScoreU = Math.max(0, seriesScoreU - 10);
        $('seriesScoreU').textContent = seriesScoreU;
        setResult('seriesResultU', `❌ Wrong! This series ${currentSeriesProblem.converges ? 'CONVERGES' : 'DIVERGES'}.`, false);
        if (typeof MathProgress !== 'undefined') {
            MathProgress.recordProblemSolved('sequences', false, 'convergence: ' + currentSeriesProblem.term);
        }
    }
    showSeriesFullSolution();
    setTimeout(newSeries, 3500);
}

function showSeriesFullSolution() {
    if (!currentSeriesProblem) return;
    const w = $('seriesSolution');
    w.style.display = 'block';
    w.textContent = currentSeriesProblem.solution;
}

/* ══════════════════════════════════════════════════════════════
   UNIVERSITY 4 — COMPLEX ARENA
   ══════════════════════════════════════════════════════════════ */
let complexOp = 'basic';
let complexScore = 0, complexStreak = 0;
let currentComplexProblem = null;
let argandCtx = null;

function setComplexOp(op, btn) {
    complexOp = op;
    document.querySelectorAll('.atype-btn[data-cop]').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    newComplex();
}

function newComplex() {
    if (!argandCtx) {
        const c = $('argandCanvas');
        if (c && c.getContext) argandCtx = c.getContext('2d');
    }
    $('complexWorking').style.display = 'none';
    $('complexResult').textContent = '';
    $('complexResult').className = 'result';
    $('argandWrap').style.display = 'none';

    let q = '', ans = '', working = '', opts = [];

    if (complexOp === 'basic') {
        const opList = ['add', 'sub', 'mul'];
        const op = opList[rand(0, 2)];
        const a = rand(-5, 5), b = rand(-5, 5), c = rand(-5, 5), d = rand(-5, 5);
        const bi = b >= 0 ? `+${b}i` : `${b}i`;
        const di = d >= 0 ? `+${d}i` : `${d}i`;
        if (op === 'add') {
            const re = a + c, im = b + d;
            ans = `${re}${im >= 0 ? '+' : ''}${im}i`;
            q = `Compute z₁ + z₂ where z₁ = ${a}${bi}, z₂ = ${c}${di}`;
            working = `Real parts: ${a} + ${c} = ${re}\nImaginary parts: ${b} + ${d} = ${im}\nResult: ${ans}`;
        } else if (op === 'sub') {
            const re = a - c, im = b - d;
            ans = `${re}${im >= 0 ? '+' : ''}${im}i`;
            q = `Compute z₁ − z₂ where z₁ = ${a}${bi}, z₂ = ${c}${di}`;
            working = `Real parts: ${a} − ${c} = ${re}\nImaginary parts: ${b} − ${d} = ${im}\nResult: ${ans}`;
        } else {
            const re = a * c - b * d, im = a * d + b * c;
            ans = `${re}${im >= 0 ? '+' : ''}${im}i`;
            q = `Compute z₁ × z₂ where z₁ = ${a}${bi}, z₂ = ${c}${di}`;
            working = `(${a}${bi})(${c}${di})\n= ${a * c} + ${a * d}i + ${b * c}i + ${b * d}i²\n(i² = −1)\nReal: ${a * c} − ${b * d} = ${re}\nImaginary: ${a * d} + ${b * c} = ${im}\nResult: ${ans}`;
        }
        // Generate 3 distinct wrong options
        const wrongSet = new Set();
        const addWrong = s => { if (s !== ans) wrongSet.add(s); };
        addWrong(`${parseInt(ans) + 2}${ans.replace(/^-?\d+/, '')}`);
        addWrong(ans.replace(/[+-]\d+i$/, m => (m.startsWith('+') ? '-' : '+') + Math.abs(parseInt(m)) + 'i'));
        addWrong(`${parseInt(ans) - 1}${ans.replace(/^-?\d+/, '')}`);
        while (wrongSet.size < 3) wrongSet.add(`${rand(-8, 8)}+${rand(-8, 8)}i`);
        opts = shuffle([ans, ...[...wrongSet].slice(0, 3)]);

    } else if (complexOp === 'modarg') {
        const a = rand(-5, 5), b = rand(-5, 5);
        const modz = parseFloat(Math.sqrt(a * a + b * b).toFixed(3));
        const argz = parseFloat((Math.atan2(b, a) * 180 / Math.PI).toFixed(1));
        const q2 = Math.random() < 0.5 ? 'modulus' : 'argument';
        ans = q2 === 'modulus' ? `|z| = ${modz}` : `arg(z) = ${argz}°`;
        q = `For z = ${a}${b >= 0 ? '+' : ''}${b}i, find the ${q2}.`;
        working = q2 === 'modulus'
            ? `|z| = √(a² + b²) = √(${a}² + ${b}²) = √${a * a + b * b} ≈ ${modz}`
            : `arg(z) = arctan(b/a) = arctan(${b}/${a}) ≈ ${argz}°\n(Adjust for correct quadrant!)`;
        $('argandWrap').style.display = 'flex';
        drawArgand(a, b);
        opts = [ans,
            q2 === 'modulus' ? `|z| = ${parseFloat((modz + 0.5).toFixed(3))}` : `arg(z) = ${parseFloat((argz + 15).toFixed(1))}°`,
            q2 === 'modulus' ? `|z| = ${Math.round(modz + 1)}` : `arg(z) = ${parseFloat((argz - 20).toFixed(1))}°`,
            q2 === 'modulus' ? `|z| = ${parseFloat((Math.max(0, modz - 0.5)).toFixed(3))}` : `arg(z) = ${(-argz).toFixed(1)}°`
        ];

    } else if (complexOp === 'demoivre') {
        const n = rand(2, 6);
        const angles = [0, 30, 45, 60, 90, 120, 135, 150, 180];
        const theta = angles[rand(0, angles.length - 1)];
        const newTheta = (n * theta) % 360;
        ans = `cos(${newTheta}°) + i·sin(${newTheta}°)`;
        q = `Apply De Moivre's Theorem: [cos(${theta}°) + i·sin(${theta}°)]^${n}`;
        working = `De Moivre: [cos θ + i sin θ]ⁿ = cos(nθ) + i sin(nθ)\n= cos(${n}×${theta}°) + i sin(${n}×${theta}°)\n= cos(${newTheta}°) + i sin(${newTheta}°)`;
        opts = [ans,
            `cos(${theta}°) + i·sin(${n * theta}°)`,
            `cos(${(newTheta + 30) % 360}°) + i·sin(${(newTheta + 30) % 360}°)`,
            `${n}cos(${theta}°) + i·sin(${theta}°)`
        ];

    } else {
        // Roots of unity
        const n = rand(2, 6);
        const arg1 = parseFloat((360 / n).toFixed(1));
        ans = `${arg1}°`;
        q = `The equation z^${n} = 1 has ${n} roots. What is the argument of the root with k = 1?`;
        working = `The ${n}th roots of unity: z = e^(2πik/n) for k = 0,1,...,${n - 1}\nArg of root k=1: θ = 2π×1/${n} = 360°/${n} = ${arg1}°\nAll roots equally spaced on unit circle.`;
        opts = [
            `${arg1}°`,
            `${parseFloat((360 / Math.max(1, n - 1)).toFixed(1))}°`,
            `${parseFloat((180 / n).toFixed(1))}°`,
            `${parseFloat((360 * 2 / n).toFixed(1))}°`
        ];
    }
    currentComplexProblem = { q, ans, working };
    $('complexQ').textContent = q;

    const uniqueOpts = [...new Set(opts)];
    if (!uniqueOpts.includes(ans)) uniqueOpts[0] = ans;
    const safeCi = uniqueOpts.indexOf(ans);

    buildOptions('complexOptions', uniqueOpts, safeCi < 0 ? 0 : safeCi, (correct) => {
        if (correct) {
            complexScore += 30; complexStreak++;
            $('complexScore').textContent = complexScore;
            $('complexStreak').textContent = complexStreak;
            setResult('complexResult', `✅ Correct!`, true);
            if (typeof MathProgress !== 'undefined') {
                MathProgress.recordProblemSolved('complex', true, complexOp);
            }
        } else {
            complexStreak = 0;
            $('complexStreak').textContent = 0;
            setResult('complexResult', `❌ Answer: ${ans}`, false);
        }
        setTimeout(newComplex, 2200);
    });
}
function drawArgand(re, im) {
    if (!argandCtx) return;
    const canvas = $('argandCanvas');
    const W = canvas.width, H = canvas.height;
    const ctx = argandCtx;
    const cx = W / 2, cy = H / 2;
    const scale = 22;
    ctx.clearRect(0, 0, W, H);

    ctx.strokeStyle = '#e8e0d8'; ctx.lineWidth = 1;
    for (let i = -6; i <= 6; i++) {
        ctx.beginPath(); ctx.moveTo(cx + i * scale, 0); ctx.lineTo(cx + i * scale, H); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, cy + i * scale); ctx.lineTo(W, cy + i * scale); ctx.stroke();
    }
    ctx.strokeStyle = '#4a2508'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
    ctx.fillStyle = '#4a2508'; ctx.font = '10px DM Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillText('Re', W - 10, cy - 6);
    ctx.fillText('Im', cx + 14, 12);

    const px = cx + re * scale, py = cy - im * scale;
    ctx.strokeStyle = '#1a56a0'; ctx.setLineDash([4, 3]); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(cx, py); ctx.lineTo(px, py); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px, cy); ctx.lineTo(px, py); ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = '#c97b0a'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();
    ctx.fillStyle = '#c97b0a';
    ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#4a2508'; ctx.font = 'bold 12px DM Sans, sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(`z = ${re}${im >= 0 ? '+' : ''}${im}i`, px + 8, py - 6);
}
function showComplexWorking() {
    if (!currentComplexProblem) return;
    const w = $('complexWorking');
    w.style.display = 'block';
    w.textContent = currentComplexProblem.working;
}
/* ══════════════════════════════════════════════════════════════
   BOOT
   ══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    initBlitz();
    nextShape();
    newTrig();
    initGraph();
    setTimeout(newGraph, 100);
    setTimeout(newSeries, 100);
    setTimeout(newMatrix, 100);
    setTimeout(newCalculus, 100);
    setTimeout(newComplex, 100);
    // Hamburger — class-based toggle
    const hamburger = document.getElementById('hamburgerBtn');
    const nav = document.getElementById('header-nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            const isOpen = nav.classList.contains('nav-open');
            nav.classList.toggle('nav-open', !isOpen);
            hamburger.setAttribute('aria-expanded', String(!isOpen));
        });
        // Close nav when a link is tapped on mobile
        nav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                nav.classList.remove('nav-open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
        // Close nav when clicking outside
        document.addEventListener('click', e => {
            if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('nav-open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
    // Enter key support per active game
    document.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        const activePanel = document.querySelector('.level-panel.active');
        if (!activePanel) return;
        const activeGame = activePanel.querySelector('.game-panel.active');
        if (!activeGame) return;
        const map = {
            'p-ninja':   checkNinja,
            'p-blitz':   checkBlitz,
            's-algebra': checkAlgebra,
            's-trig':    checkTrig,
        };
        if (map[activeGame.id]) map[activeGame.id]();
    });
});