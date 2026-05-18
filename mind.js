/* ============================================================
   MATH BRAIN GAMES – mind.js
   Ronny Best · v2.0
   Games: Memory, Speed Math, Prime Hunt, Fraction Match,
          Pattern Predictor, Equation Balancer, Make 24,
          Countdown Numbers, Mini Sudoku, Series Converger
   ============================================================ */

'use strict';

/* ── helpers ──────────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function flash(el, cls) {
    if (!el) return;
    el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), 700);
}

function setResult(id, msg, ok) {
    const el = $(id);
    if (!el) return;
    el.textContent = msg;
    el.className = 'result ' + (ok ? 'ok' : 'err');
}

/* ── tab navigation ───────────────────────────────────────── */
function showGame(gameId, btn) {
    document.querySelectorAll('.game').forEach(g => g.classList.remove('active'));
    document.querySelectorAll('#gameMenu .tab').forEach(b => b.classList.remove('active'));
    const sec = $(gameId);
    if (sec) sec.classList.add('active');
    if (btn) btn.classList.add('active');
}

/* ══════════════════════════════════════════════════════════
   1. NUMBER MEMORY
   ══════════════════════════════════════════════════════════ */
let memoryNumber = '';
let memoryLevel = 1;
let memoryStreak = 0;

function initializeMemory() {
    memoryLevel = parseInt(localStorage.getItem('memLevel') || '1');
    $('memoryLevel').textContent = memoryLevel;
    generateMemoryNumber();
}

function generateMemoryNumber() {
    const digits = 3 + memoryLevel;
    memoryNumber = Array.from({ length: digits }, () => rand(0, 9)).join('');
    $('memoryNum').textContent = memoryNumber;
    $('memoryNum').style.opacity = '1';
    $('memoryDigits').textContent = digits;
    $('memoryInput').value = '';
    $('memoryResult').textContent = '';
    $('memoryResult').className = 'result';

    setTimeout(() => {
        $('memoryNum').style.opacity = '0';
        $('memoryNum').textContent = '???';
        setTimeout(() => { $('memoryNum').style.opacity = '1'; }, 200);
    }, 1500 + memoryLevel * 300);
}

function checkMemory() {
    const val = $('memoryInput').value.trim();
    if (!val) return;
    if (val === memoryNumber) {
        memoryStreak++;
        memoryLevel = Math.min(memoryLevel + 1, 12);
        localStorage.setItem('memLevel', memoryLevel);
        $('memoryLevel').textContent = memoryLevel;
        $('memoryStreak').textContent = memoryStreak;
        setResult('memoryResult', `✅ Correct! Level ${memoryLevel} unlocked.`, true);
        setTimeout(generateMemoryNumber, 1200);
    } else {
        memoryStreak = 0;
        memoryLevel = Math.max(1, memoryLevel - 1);
        localStorage.setItem('memLevel', memoryLevel);
        $('memoryLevel').textContent = memoryLevel;
        $('memoryStreak').textContent = memoryStreak;
        setResult('memoryResult', `❌ It was: ${memoryNumber}`, false);
        setTimeout(generateMemoryNumber, 2000);
    }
}

/* ══════════════════════════════════════════════════════════
   2. SPEED MATH
   ══════════════════════════════════════════════════════════ */
let speedScore = 0;
let speedSolved = 0;
let speedAnswer = 0;
let speedTimerInterval = null;
let speedTimeLeft = 60;
let speedBest = parseInt(localStorage.getItem('speedBest') || '0');
const SPEED_DURATION = 60;
const RING_CIRCUMFERENCE = 2 * Math.PI * 52; // r=52

function initializeSpeed() {
    $('speedBest').textContent = speedBest;
    generateSpeedProblem();
    updateRing(SPEED_DURATION);
}

function generateSpeedProblem() {
    const ops = ['+', '-', '×', '÷'];
    const op = ops[rand(0, 3)];
    let a, b;
    switch (op) {
        case '+': a = rand(1, 99); b = rand(1, 99); speedAnswer = a + b; break;
        case '-': a = rand(10, 99); b = rand(1, a); speedAnswer = a - b; break;
        case '×': a = rand(2, 12); b = rand(2, 12); speedAnswer = a * b; break;
        case '÷': speedAnswer = rand(2, 12); b = rand(2, 12); a = speedAnswer * b; break;
    }
    $('speedQuestion').innerHTML = `<span class="display-eq">${a} ${op} ${b} = ?</span>`;
    $('speedInput').value = '';
    $('speedInput').focus();
}

function updateRing(timeLeft) {
    const fill = $('timerRingFill');
    if (!fill) return;
    const pct = timeLeft / SPEED_DURATION;
    const offset = RING_CIRCUMFERENCE * (1 - pct);
    fill.style.strokeDasharray = RING_CIRCUMFERENCE;
    fill.style.strokeDashoffset = offset;
    fill.style.stroke = pct > 0.5 ? '#8B7355' : pct > 0.25 ? '#c0842a' : '#b94040';
}

function startSpeedTimer() {
    if (speedTimerInterval) clearInterval(speedTimerInterval);
    speedScore = 0; speedSolved = 0; speedTimeLeft = SPEED_DURATION;
    $('speedScore').textContent = 0;
    $('speedSolved').textContent = 0;
    $('speedTimer').textContent = SPEED_DURATION;
    $('speedResult').textContent = '';
    $('speedResult').className = 'result';
    updateRing(SPEED_DURATION);
    generateSpeedProblem();

    speedTimerInterval = setInterval(() => {
        speedTimeLeft--;
        $('speedTimer').textContent = speedTimeLeft;
        updateRing(speedTimeLeft);
        if (speedTimeLeft <= 0) {
            clearInterval(speedTimerInterval);
            speedTimerInterval = null;
            if (speedScore > speedBest) {
                speedBest = speedScore;
                localStorage.setItem('speedBest', speedBest);
                $('speedBest').textContent = speedBest;
            }
            $('speedQuestion').innerHTML = `<span class="display-eq">Time's up!</span>`;
            setResult('speedResult',
                `⏱ Final: ${speedScore} pts · ${speedSolved} solved${speedScore >= speedBest ? ' · 🏆 New Best!' : ''}`, true);
        }
    }, 1000);
}

function checkSpeed() {
    if (!speedTimerInterval) return;
    const val = parseInt($('speedInput').value);
    if (isNaN(val)) return;
    if (val === speedAnswer) {
        speedScore += 10;
        speedSolved++;
        $('speedScore').textContent = speedScore;
        $('speedSolved').textContent = speedSolved;
        flash($('speedQuestion'), 'flash-ok');
        generateSpeedProblem();
    } else {
        flash($('speedQuestion'), 'flash-err');
        $('speedInput').value = '';
    }
}

/* ══════════════════════════════════════════════════════════
   3. PRIME HUNT
   ══════════════════════════════════════════════════════════ */
let primeCurrentNum = 0;
let primeIsActuallyPrime = false;
let primeScore = 0;
let primeStreak = 0;

function initializePrime() { generatePrimeNumber(); }

function isPrime(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(n); i += 2) if (n % i === 0) return false;
    return true;
}

function generatePrimeNumber() {
    primeCurrentNum = rand(10, 150);
    primeIsActuallyPrime = isPrime(primeCurrentNum);
    $('primeNum').textContent = primeCurrentNum;
    $('primeResult').textContent = '';
    $('primeResult').className = 'result';
}

function answerPrime(userSaysPrime) {
    const correct = userSaysPrime === primeIsActuallyPrime;
    if (correct) {
        primeStreak++;
        const bonus = Math.floor(primeStreak / 3);
        primeScore += 10 + bonus * 5;
        $('primeScore').textContent = primeScore;
        $('primeStreak').textContent = primeStreak;
        const fact = primeIsActuallyPrime ? 'It has no divisors other than 1 and itself.' :
            `It is divisible by ${smallestFactor(primeCurrentNum)}.`;
        setResult('primeResult', `✅ Correct! ${fact}`, true);
    } else {
        primeStreak = 0;
        primeScore = Math.max(0, primeScore - 5);
        $('primeScore').textContent = primeScore;
        $('primeStreak').textContent = primeStreak;
        setResult('primeResult',
            `❌ ${primeCurrentNum} is ${primeIsActuallyPrime ? 'PRIME' : 'COMPOSITE'}.`, false);
    }
    setTimeout(generatePrimeNumber, 1400);
}

function smallestFactor(n) {
    for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return i;
    return n;
}

/* ══════════════════════════════════════════════════════════
   4. FRACTION MATCH
   ══════════════════════════════════════════════════════════ */
let fractionScore = 0;
let fractionCorrectIndex = -1;

function initializeFraction() { generateFractionPuzzle(); }

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

function generateFractionPuzzle() {
    const num = rand(1, 7);
    const den = rand(num + 1, 12);
    const targetVal = num / den;
    $('fractionTarget').textContent = `${num} / ${den}`;

    // build 4 options: one correct, three wrong
    const options = [];
    const mult = rand(2, 5);
    options.push({ n: num * mult, d: den * mult, correct: true });

    while (options.length < 4) {
        const wn = rand(1, 15);
        const wd = rand(2, 20);
        if (Math.abs(wn / wd - targetVal) > 0.02 &&
            !options.some(o => o.n === wn && o.d === wd)) {
            options.push({ n: wn, d: wd, correct: false });
        }
    }

    // shuffle
    for (let i = options.length - 1; i > 0; i--) {
        const j = rand(0, i);
        [options[i], options[j]] = [options[j], options[i]];
    }

    fractionCorrectIndex = options.findIndex(o => o.correct);

    const grid = $('fractionOptions');
    grid.innerHTML = '';
    options.forEach((o, idx) => {
        const btn = document.createElement('button');
        btn.className = 'frac-btn';
        btn.textContent = `${o.n} / ${o.d}`;
        btn.onclick = () => checkFraction(idx);
        grid.appendChild(btn);
    });

    $('fractionResult').textContent = '';
    $('fractionResult').className = 'result';
}

function checkFraction(idx) {
    if (idx === fractionCorrectIndex) {
        fractionScore += 15;
        $('fractionScore').textContent = fractionScore;
        setResult('fractionResult', '✅ Correct!', true);
    } else {
        fractionScore = Math.max(0, fractionScore - 5);
        $('fractionScore').textContent = fractionScore;
        setResult('fractionResult', '❌ Not equivalent — try the next one!', false);
    }
    setTimeout(generateFractionPuzzle, 1200);
}

/* ══════════════════════════════════════════════════════════
   5. PATTERN PREDICTOR
   ══════════════════════════════════════════════════════════ */
let patternAnswer = 0;
let patternStreak = 0;
let patternHintText = '';

function initializePattern() { generatePattern(); }

function generatePattern() {
    const type = rand(0, 4);
    let seq = [], rule = '';
    switch (type) {
        case 0: { // arithmetic
            const s = rand(1, 20), d = rand(2, 10);
            seq = [s, s+d, s+2*d, s+3*d];
            patternAnswer = s + 4*d;
            rule = `+${d} each time`;
            break;
        }
        case 1: { // geometric
            const s = rand(1, 4), r = rand(2, 4);
            seq = [s, s*r, s*r**2, s*r**3];
            patternAnswer = s * r**4;
            rule = `×${r} each time`;
            break;
        }
        case 2: { // squares
            const b = rand(1, 6);
            seq = [b**2, (b+1)**2, (b+2)**2, (b+3)**2];
            patternAnswer = (b+4)**2;
            rule = `consecutive squares`;
            break;
        }
        case 3: { // fibonacci-style
            const a = rand(1, 5), b2 = rand(1, 5);
            seq = [a, b2, a+b2, b2+(a+b2)];
            patternAnswer = seq[2] + seq[3];
            rule = `each term = sum of previous two`;
            break;
        }
        case 4: { // subtract
            const s = rand(50, 100), d = rand(3, 15);
            seq = [s, s-d, s-2*d, s-3*d];
            patternAnswer = s - 4*d;
            rule = `−${d} each time`;
            break;
        }
    }
    patternHintText = `Hint: ${rule}`;
    $('patternSeq').textContent = seq.join(' ,  ');
    $('patternInput').value = '';
    $('patternResult').textContent = '';
    $('patternResult').className = 'result';
    const hintEl = $('patternHint');
    if (hintEl) hintEl.style.display = 'none';
}

function checkPattern() {
    const val = parseInt($('patternInput').value);
    if (isNaN(val)) return;
    if (val === patternAnswer) {
        patternStreak++;
        $('patternStreak').textContent = patternStreak;
        setResult('patternResult', `✅ Correct! Streak: ${patternStreak}`, true);
        setTimeout(generatePattern, 1200);
    } else {
        patternStreak = 0;
        $('patternStreak').textContent = 0;
        const hintEl = $('patternHint');
        if (hintEl) { hintEl.textContent = patternHintText; hintEl.style.display = 'block'; }
        setResult('patternResult', `❌ Answer was ${patternAnswer}.`, false);
        setTimeout(generatePattern, 2200);
    }
}

/* ══════════════════════════════════════════════════════════
   6. EQUATION BALANCER
   ══════════════════════════════════════════════════════════ */
let balanceAnswer = 0;
let balanceStreak = 0;

function initializeBalance() { generateBalanceEquation(); }

function generateBalanceEquation() {
    // a ○ b = c ○ ?   or multi-step variants
    const style = rand(0, 2);
    let eq = '';
    if (style === 0) {
        const a = rand(1, 20), b = rand(1, 20), c = rand(1, 20);
        balanceAnswer = a + b - c;
        eq = `${a} + ${b} = ${c} + ?`;
    } else if (style === 1) {
        const a = rand(10, 30), b = rand(1, 10), c = rand(1, 20);
        balanceAnswer = a - b - c;
        eq = `${a} − ${b} = ${c} + ?`;
    } else {
        const a = rand(2, 10), b = rand(2, 10), c = rand(1, 15);
        balanceAnswer = a * b - c;
        eq = `${a} × ${b} = ${c} + ?`;
    }
    $('balanceEq').textContent = eq;
    $('balanceInput').value = '';
    $('balanceResult').textContent = '';
    $('balanceResult').className = 'result';
}

function checkBalance() {
    const val = parseInt($('balanceInput').value);
    if (isNaN(val)) return;
    if (val === balanceAnswer) {
        balanceStreak++;
        $('balanceStreak').textContent = balanceStreak;
        setResult('balanceResult', `✅ Balanced! Streak: ${balanceStreak}`, true);
        setTimeout(generateBalanceEquation, 1200);
    } else {
        balanceStreak = 0;
        $('balanceStreak').textContent = 0;
        setResult('balanceResult', `❌ Answer was ${balanceAnswer}.`, false);
        setTimeout(generateBalanceEquation, 2000);
    }
}

/* ══════════════════════════════════════════════════════════
   7. MAKE 24
   ══════════════════════════════════════════════════════════ */
let t24Cards = [];
let t24Score = parseInt(localStorage.getItem('t24Score') || '0');
let t24Best = parseInt(localStorage.getItem('t24Best') || '0');
let t24Solution = '';

// Pre-solved puzzles for hint / validation seed
const MAKE24_POOL = [
    { cards: [1,2,3,4], hint: '1 × 2 × 3 × 4' },
    { cards: [2,3,4,6], hint: '2 × (3 + 4 + 6 − 9) … try (6 − 2) × (4 + 3 − 1)' },
    { cards: [1,3,4,6], hint: '6 ÷ (1 − 3/4)' },
    { cards: [2,6,6,6], hint: '6 ÷ (2 − 6/6)' },  // classic hard one
    { cards: [1,5,5,5], hint: '5 × (5 − 1/5)' },
    { cards: [3,3,8,8], hint: '8 ÷ (3 − 8/3)' },
    { cards: [2,3,5,12]},
    { cards: [1,2,7,7], hint: '(1 + 7) × (7 − 2 − 2)…' },
    { cards: [4,4,6,6], hint: '(6 − 4) × (6 + 4 + ...)' },
    { cards: [1,4,5,6], hint: '(1 + 5) × (6 − 4 + 2)' },
    { cards: [2,4,6,8] },
    { cards: [1,2,6,9] },
    { cards: [3,4,6,8] },
    { cards: [1,3,5,7] },
    { cards: [2,5,6,10] },
];

function initializeMake24() {
    $('t24Score').textContent = t24Score;
    $('t24Best').textContent = t24Best;
    newMake24();
}

function newMake24() {
    const pick = MAKE24_POOL[rand(0, MAKE24_POOL.length - 1)];
    t24Cards = [...pick.cards].sort(() => Math.random() - 0.5);
    t24Solution = pick.hint || '(Find it yourself!)';
    renderCards('cardsRow', t24Cards);
    $('t24Input').value = '';
    $('t24Result').textContent = '';
    $('t24Result').className = 'result';
}

function renderCards(containerId, numbers) {
    const el = $(containerId);
    el.innerHTML = '';
    numbers.forEach(n => {
        const card = document.createElement('div');
        card.className = 'play-card';
        card.textContent = n;
        el.appendChild(card);
    });
}

function safeEval(expr) {
    // Only allow digits, spaces and basic operators
    if (!/^[\d\s\+\-\*\/\×\÷\(\)\.]+$/.test(expr)) return NaN;
    const cleaned = expr.replace(/×/g, '*').replace(/÷/g, '/');
    try { return Function('"use strict"; return (' + cleaned + ')')(); }
    catch { return NaN; }
}

function extractNumbers(expr) {
    return (expr.match(/\d+/g) || []).map(Number).sort((a, b) => a - b);
}

function checkMake24() {
    const expr = $('t24Input').value.trim();
    if (!expr) return;
    const result = safeEval(expr);
    const usedNums = extractNumbers(expr).sort((a, b) => a - b);
    const expectedNums = [...t24Cards].sort((a, b) => a - b);
    const numsMatch = JSON.stringify(usedNums) === JSON.stringify(expectedNums);

    if (!numsMatch) {
        setResult('t24Result', `❌ You must use exactly these numbers: ${t24Cards.join(', ')}`, false);
        return;
    }
    if (Math.abs(result - 24) < 0.001) {
        t24Score += 20;
        if (t24Score > t24Best) {
            t24Best = t24Score;
            localStorage.setItem('t24Best', t24Best);
            $('t24Best').textContent = t24Best;
        }
        localStorage.setItem('t24Score', t24Score);
        $('t24Score').textContent = t24Score;
        setResult('t24Result', `🎉 Brilliant! ${expr} = 24`, true);
        setTimeout(newMake24, 1800);
    } else {
        setResult('t24Result', `❌ ${expr} = ${Math.round(result * 100) / 100}, not 24.`, false);
    }
}

function revealMake24() {
    setResult('t24Result', `💡 One solution: ${t24Solution}`, true);
    setTimeout(newMake24, 3000);
}

/* ══════════════════════════════════════════════════════════
   8. COUNTDOWN NUMBERS
   ══════════════════════════════════════════════════════════ */
const SMALL_NUMS = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
const LARGE_NUMS = [25,50,75,100];

let cdTarget = 0;
let cdAvailable = [];
let cdScore = parseInt(localStorage.getItem('cdScore') || '0');
let cdTimerInterval = null;
let cdTimeLeft = 45;

function initializeCountdown() {
    $('cdScore').textContent = cdScore;
    newCountdown();
}

function newCountdown() {
    if (cdTimerInterval) { clearInterval(cdTimerInterval); cdTimerInterval = null; }
    cdTimeLeft = 45;
    $('cdTimer').textContent = cdTimeLeft;
    $('cdResult').textContent = '';
    $('cdResult').className = 'result';

    // pick 1 or 2 large numbers and fill to 6
    const nLarge = rand(0, 2);
    const largePick = [...LARGE_NUMS].sort(() => Math.random() - 0.5).slice(0, nLarge);
    const smallPick = [...SMALL_NUMS].sort(() => Math.random() - 0.5).slice(0, 6 - nLarge);
    cdAvailable = [...largePick, ...smallPick];
    cdTarget = rand(100, 999);

    $('cdTarget').textContent = cdTarget;
    renderCards('cdNumbers', cdAvailable);
    $('cdInput').value = '';
}

function startCountdownTimer() {
    newCountdown();
    cdTimerInterval = setInterval(() => {
        cdTimeLeft--;
        $('cdTimer').textContent = cdTimeLeft;
        if (cdTimeLeft <= 0) {
            clearInterval(cdTimerInterval); cdTimerInterval = null;
            setResult('cdResult', `⏱ Time's up! Target was ${cdTarget}.`, false);
        }
    }, 1000);
}

function checkCountdown() {
    const expr = $('cdInput').value.trim();
    if (!expr) return;
    const result = safeEval(expr);
    if (isNaN(result)) { setResult('cdResult', '❌ Invalid expression.', false); return; }

    const usedNums = extractNumbers(expr).sort((a, b) => a - b);
    const avail = [...cdAvailable].sort((a, b) => a - b);
    // check every used number exists in available (allow subsets)
    const availCopy = [...avail];
    let valid = true;
    for (const n of usedNums) {
        const idx = availCopy.indexOf(n);
        if (idx === -1) { valid = false; break; }
        availCopy.splice(idx, 1);
    }
    if (!valid) { setResult('cdResult', `❌ You can only use: ${cdAvailable.join(', ')}`, false); return; }

    const diff = Math.abs(Math.round(result) - cdTarget);
    if (diff === 0) {
        if (cdTimerInterval) { clearInterval(cdTimerInterval); cdTimerInterval = null; }
        cdScore += 10 + Math.floor(cdTimeLeft / 5);
        localStorage.setItem('cdScore', cdScore);
        $('cdScore').textContent = cdScore;
        setResult('cdResult', `🎯 Exact! ${expr} = ${cdTarget}`, true);
    } else if (diff <= 5) {
        cdScore += 5;
        localStorage.setItem('cdScore', cdScore);
        $('cdScore').textContent = cdScore;
        setResult('cdResult', `👍 Close! Off by ${diff}. Score +5`, true);
    } else if (diff <= 10) {
        setResult('cdResult', `😐 Off by ${diff}. Keep going!`, false);
    } else {
        setResult('cdResult', `❌ ${expr} = ${Math.round(result)}, off by ${diff}.`, false);
    }
}

/* ══════════════════════════════════════════════════════════
   9. MINI SUDOKU (4×4)
   ══════════════════════════════════════════════════════════ */
let sudokuPuzzle = [];   // 4×4 array, 0 = empty
let sudokuSolution = [];
let sudokuSolved = parseInt(localStorage.getItem('sudokuSolved') || '0');
let sudokuTimerInterval = null;
let sudokuElapsed = 0;

// A pool of 4×4 puzzles [puzzle, solution] encoded as flat strings
const SUDOKU_POOL = [
    ['1002034020400310', '1342034120400312'],  // will be overridden by generator
];

function initializeSudoku() {
    $('sudokuSolved').textContent = sudokuSolved;
    newSudoku();
}

// Generate a valid 4×4 puzzle
function generateSudoku4x4() {
    // Start from a known complete grid and shuffle
    const base = [[1,2,3,4],[3,4,1,2],[2,1,4,3],[4,3,2,1]];
    // Shuffle rows within bands, shuffle cols within bands, shuffle numbers
    const nums = [1,2,3,4].sort(() => Math.random() - 0.5);
    let grid = base.map(row => row.map(v => nums[v - 1]));

    // Swap rows within bands
    if (Math.random() > 0.5) [grid[0], grid[1]] = [grid[1], grid[0]];
    if (Math.random() > 0.5) [grid[2], grid[3]] = [grid[3], grid[2]];
    // Swap cols within bands
    if (Math.random() > 0.5) { grid = grid.map(r => { [r[0],r[1]] = [r[1],r[0]]; return r; }); }
    if (Math.random() > 0.5) { grid = grid.map(r => { [r[2],r[3]] = [r[3],r[2]]; return r; }); }

    sudokuSolution = grid.map(r => [...r]);

    // Remove cells (show ~8 of 16)
    const revealed = new Set();
    while (revealed.size < 8) revealed.add(rand(0, 15));

    sudokuPuzzle = grid.map((row, ri) =>
        row.map((val, ci) => revealed.has(ri * 4 + ci) ? val : 0)
    );
}

function renderSudokuGrid() {
    const gridEl = $('sudokuGrid');
    gridEl.innerHTML = '';
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            const cell = document.createElement('div');
            cell.className = 'sudoku-cell';
            const val = sudokuPuzzle[r][c];
            if (val !== 0) {
                cell.textContent = val;
                cell.classList.add('given');
            } else {
                const inp = document.createElement('input');
                inp.type = 'number';
                inp.min = 1; inp.max = 4;
                inp.id = `sc-${r}-${c}`;
                inp.placeholder = '';
                // Add box border classes
                cell.appendChild(inp);
            }
            // 2×2 box borders
            if (c === 1) cell.style.borderRight = '2px solid var(--brown)';
            if (r === 1) cell.style.borderBottom = '2px solid var(--brown)';
            gridEl.appendChild(cell);
        }
    }
}

function newSudoku() {
    if (sudokuTimerInterval) clearInterval(sudokuTimerInterval);
    sudokuElapsed = 0;
    $('sudokuTimerPill').textContent = '⏱ 0s';
    sudokuTimerInterval = setInterval(() => {
        sudokuElapsed++;
        $('sudokuTimerPill').textContent = `⏱ ${sudokuElapsed}s`;
    }, 1000);
    generateSudoku4x4();
    renderSudokuGrid();
    $('sudokuResult').textContent = '';
    $('sudokuResult').className = 'result';
}

function readSudokuGrid() {
    const user = [];
    for (let r = 0; r < 4; r++) {
        user[r] = [];
        for (let c = 0; c < 4; c++) {
            if (sudokuPuzzle[r][c] !== 0) {
                user[r][c] = sudokuPuzzle[r][c];
            } else {
                const inp = $(`sc-${r}-${c}`);
                user[r][c] = inp ? parseInt(inp.value) || 0 : 0;
            }
        }
    }
    return user;
}

function checkSudoku() {
    const user = readSudokuGrid();
    // Highlight errors
    let errors = 0;
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            const inp = $(`sc-${r}-${c}`);
            if (!inp) continue;
            if (user[r][c] === sudokuSolution[r][c]) {
                inp.classList.remove('cell-err'); inp.classList.add('cell-ok');
            } else {
                inp.classList.remove('cell-ok'); inp.classList.add('cell-err');
                errors++;
            }
        }
    }
    if (errors === 0) {
        clearInterval(sudokuTimerInterval);
        sudokuSolved++;
        localStorage.setItem('sudokuSolved', sudokuSolved);
        $('sudokuSolved').textContent = sudokuSolved;
        setResult('sudokuResult', `🎉 Solved in ${sudokuElapsed}s!`, true);
        setTimeout(newSudoku, 2000);
    } else {
        setResult('sudokuResult', `❌ ${errors} cell(s) incorrect — red cells show errors.`, false);
    }
}

function solveSudoku() {
    clearInterval(sudokuTimerInterval);
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            const inp = $(`sc-${r}-${c}`);
            if (inp) { inp.value = sudokuSolution[r][c]; inp.classList.remove('cell-err','cell-ok'); }
        }
    }
    setResult('sudokuResult', '💡 Solution revealed. Try a new puzzle!', true);
}

/* ══════════════════════════════════════════════════════════
   10. SERIES CONVERGER
   ══════════════════════════════════════════════════════════ */
let seriesScore = 0;
let seriesConverges = true;

const SERIES_LIST = [
    { term: '1/n²',       converges: true,  reason: 'p-series with p=2 > 1 → converges.' },
    { term: '1/n',        converges: false, reason: 'Harmonic series — classic divergence.' },
    { term: '(−1)ⁿ / n',  converges: true,  reason: 'Alternating harmonic → conditionally converges.' },
    { term: '1 / 2ⁿ',    converges: true,  reason: 'Geometric series r=½ < 1 → converges.' },
    { term: '1 / √n',    converges: false, reason: 'p-series with p=½ < 1 → diverges.' },
    { term: 'n / 2ⁿ',    converges: true,  reason: 'Ratio test: L=½ < 1 → converges.' },
    { term: '2ⁿ / n!',   converges: true,  reason: 'Ratio test: L→0 → converges.' },
    { term: '1 / n·ln n', converges: false, reason: 'Integral test shows divergence.' },
    { term: 'n² / 3ⁿ',   converges: true,  reason: 'Root/ratio test: L=1/3 < 1 → converges.' },
    { term: '(−1)ⁿ·n / (n+1)', converges: false, reason: 'Terms don\'t → 0; diverges by divergence test.' },
    { term: '1 / n(n+1)', converges: true,  reason: 'Telescoping sum = 1 → converges.' },
    { term: 'ln(n) / n',  converges: false, reason: 'Grows faster than 1/n → diverges.' },
];
let currentSeries = SERIES_LIST[0];

function initializeSeriesGame() { newSeriesPuzzle(); }

function newSeriesPuzzle() {
    currentSeries = SERIES_LIST[rand(0, SERIES_LIST.length - 1)];
    seriesConverges = currentSeries.converges;
    $('seriesTerm').textContent = currentSeries.term;
    $('seriesAnalysis').value = '';
    $('seriesResult').textContent = '';
    $('seriesResult').className = 'result';
}

function applyTest(name) {
    const hints = {
        comparison: 'Compare term-by-term with a known series.',
        ratio:      'Compute L = lim |aₙ₊₁/aₙ|. L<1 converges, L>1 diverges.',
        integral:   'If f(x) is pos & decreasing, ∫f dx and ∑aₙ share fate.',
        alternating:'Check |aₙ| decreasing and → 0.',
        ptest:      'For ∑1/nᵖ: converges iff p > 1.',
    };
    const area = $('seriesAnalysis');
    area.value += `[${name.toUpperCase()}] ${hints[name]}\n`;
}

function submitVerdict(userSaysConverges) {
    const correct = userSaysConverges === seriesConverges;
    if (correct) {
        seriesScore += 25;
        $('seriesScore').textContent = seriesScore;
        setResult('seriesResult', `✅ Correct! ${currentSeries.reason}`, true);
    } else {
        seriesScore = Math.max(0, seriesScore - 10);
        $('seriesScore').textContent = seriesScore;
        setResult('seriesResult', `❌ Wrong. ${currentSeries.reason}`, false);
    }
    setTimeout(newSeriesPuzzle, 2500);
}

/* ══════════════════════════════════════════════════════════
   BOOT
   ══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    initializeMemory();
    initializeSpeed();
    initializePrime();
    initializeFraction();
    initializePattern();
    initializeBalance();
    initializeMake24();
    initializeCountdown();
    initializeSudoku();
    initializeSeriesGame();

    // Enter key support
    document.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        const active = document.querySelector('.game.active');
        if (!active) return;
        const id = active.id;
        const map = {
            memory: checkMemory,
            speed: checkSpeed,
            pattern: checkPattern,
            balance: checkBalance,
            twentyfour: checkMake24,
            countdown: checkCountdown,
        };
        if (map[id]) map[id]();
    });
});