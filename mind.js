// MIND GAMES 
document.addEventListener("DOMContentLoaded", function() {
    const welcomeDiv = document.getElementById("welcomeMessage");
    if (welcomeDiv) {
       const welcomeDiv = document.getElementById("welcomeMessage");
if (welcomeDiv) {
    if (typeof MathProgress !== 'undefined') {
        const stats = MathProgress.getStats();
        
        if (stats.totalSolved > 0) {
            welcomeDiv.innerHTML = `
                <div style="background:linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%); padding:12px; border-radius:10px; margin:15px 0; text-align:center; border:2px solid #155724;">
                    <div style="display:flex; justify-content:center; align-items:center; gap:20px; flex-wrap:wrap;">
                        <div style="text-align:center;">
                            <div style="font-size:1.8em; font-weight:bold; color:#004080;">${stats.totalSolved}</div>
                            <div style="font-size:0.9em; color:#555;">Problems Solved</div>
                        </div>
                        <div style="text-align:center;">
                            <div style="font-size:1.8em; font-weight:bold; color:#004080;">${stats.accuracy}%</div>
                            <div style="font-size:0.9em; color:#555;">Accuracy</div>
                        </div>
                        <div style="text-align:center;">
                            <div style="font-size:1.8em; font-weight:bold; color:#004080;">${stats.badges.length}</div>
                            <div style="font-size:0.9em; color:#555;">Badges</div>
                        </div>
                    </div>
                    <a href="achievements.html" style="display:inline-block; margin-top:10px; background:#004080; color:white; padding:6px 15px; border-radius:6px; text-decoration:none; font-weight:bold;">
                        View Full Progress →
                    </a>
                </div>
            `;
        } else {
            welcomeDiv.innerHTML = `
                <div style="background:#f8f9fa; padding:15px; border-radius:10px; margin:15px 0; text-align:center; border:2px dashed #004080;">
                    <h3 style="color:#004080; margin-bottom:10px;">🎓 Welcome to Ronny Best Math!</h3>
                    <p style="color:#555; margin-bottom:15px;">Free math learning platform - no login required!</p>
                    <div style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap;">
                        <span style="background:#e7f3ff; padding:5px 12px; border-radius:20px; font-size:0.9em;">✅ Auto-save progress</span>
                        <span style="background:#e7f3ff; padding:5px 12px; border-radius:20px; font-size:0.9em;">🏆 Earn badges</span>
                        <span style="background:#e7f3ff; padding:5px 12px; border-radius:20px; font-size:0.9em;">📈 Track improvement</span>
                    </div>
                </div>
            `;
        }
    } else {
        welcomeDiv.innerHTML = `
            <div style="background:#fff3cd; padding:12px; border-radius:10px; margin:15px 0; text-align:center;">
                <strong>Free Math Learning Platform</strong> - Start learning now!
            </div>
        `;
    }
}
    }
    showGame('memory');
    initializeMemory();
    initializeBalance();
    initializePrime();
    initializeFraction();
    initializeSpeed();
    initializePattern();
    initializeMathMaze();
    initializeFunctionGame();
    initializePolygonGame();
    initializeSeriesGame();
    initializeMatrixPath();
    initializeDerivativeDetective();
});

function showGame(gameId) {
    document.querySelectorAll('.game').forEach(game => {
        game.style.display = 'none';
        game.classList.remove('active');
    });
    const selectedGame = document.getElementById(gameId);
    if (selectedGame) {
        selectedGame.style.display = 'block';
        selectedGame.classList.add('active');
        document.querySelectorAll('#gameMenu button').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    }
}

// 1. NUMBER MEMORY GAME
let memoryNumber = '';
let memoryLevel = 1;
let memoryHighScore = 0;

function initializeMemory() {
    generateMemoryNumber();
}

function generateMemoryNumber() {
    const digits = 3 + memoryLevel;
    memoryNumber = '';
    for (let i = 0; i < digits; i++) {
        memoryNumber += Math.floor(Math.random() * 10);
    }
    
    document.getElementById('memoryDisplay').innerHTML = 
        `<div class="number-display">${memoryNumber}</div>`;
    document.getElementById('memoryResult').innerHTML = '';
    document.getElementById('memoryInput').value = '';
    document.getElementById('memoryLevel').textContent = memoryLevel;
    document.getElementById('memoryDigits').textContent = digits;
    
    setTimeout(() => {
        document.getElementById('memoryDisplay').innerHTML = 
            `<div class="number-display">???</div>`;
    }, 2000);
}

function checkMemory() {
    const userInput = document.getElementById('memoryInput').value;
    const resultDiv = document.getElementById('memoryResult');
    
    if (userInput === memoryNumber) {
        resultDiv.innerHTML = '✅ Correct! Level up!';
        resultDiv.style.color = 'green';
        memoryLevel++;
        if (typeof MathProgress !== 'undefined') {
            const score = memoryLevel * 10;
            const isWin = true;
            MathProgress.recordGamePlayed("Number Memory Challenge", score, isWin);
        }
        
        setTimeout(generateMemoryNumber, 1000);
    } else {
        resultDiv.innerHTML = '❌ Incorrect. The number was: ' + memoryNumber;
        resultDiv.style.color = 'red';
        if (typeof MathProgress !== 'undefined') {
            const score = (memoryLevel - 1) * 10;
            const isWin = false;
            MathProgress.recordGamePlayed("Number Memory Challenge", score, isWin);
        }
        
        memoryLevel = Math.max(1, memoryLevel - 1);
        setTimeout(generateMemoryNumber, 2000);
    }
}

// 2. EQUATION BALANCER GAME
let balanceAnswer = 0;
let balanceStreak = 0;

function initializeBalance() {
    generateBalanceEquation();
}

function generateBalanceEquation() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const c = Math.floor(Math.random() * 10) + 1;

    balanceAnswer = a + b - c;
    document.getElementById('balanceQuestion').innerHTML = 
        `${a} + ${b} = ${c} + ?`;
    document.getElementById('balanceResult').innerHTML = '';
    document.getElementById('balanceInput').value = '';
}

function checkBalance() {
    const userAnswer = parseInt(document.getElementById('balanceInput').value);
    const resultDiv = document.getElementById('balanceResult'); 
    
    if (userAnswer === balanceAnswer) {
        resultDiv.innerHTML = '✅ Correct! Equation balanced!';
        resultDiv.style.color = 'green';
        balanceStreak++;
        if (typeof MathProgress !== 'undefined') {
            const score = balanceStreak * 5;
            const isWin = true;
            MathProgress.recordGamePlayed("Equation Balancer", score, isWin);
        }
        
        setTimeout(generateBalanceEquation, 1000);
    } else {
        resultDiv.innerHTML = `❌ Incorrect. Correct answer: ${balanceAnswer}`;
        resultDiv.style.color = 'red';
        if (typeof MathProgress !== 'undefined') {
            const score = Math.max(0, balanceStreak - 1) * 5;
            const isWin = false;
            MathProgress.recordGamePlayed("Equation Balancer", score, isWin);
        }
        
        balanceStreak = Math.max(0, balanceStreak - 1);
        setTimeout(generateBalanceEquation, 2000);
    }
}

// 3. PRIME OR COMPOSITE GAME
let currentNumber = 0;
let isCurrentPrime = false;
let primeScore = 0;

function initializePrime() {
    generatePrimeNumber();
}

function generatePrimeNumber() {
    currentNumber = Math.floor(Math.random() * 91) + 10;
    isCurrentPrime = true;
    
    if (currentNumber < 2) {
        isCurrentPrime = false;
    } else {
        for (let i = 2; i <= Math.sqrt(currentNumber); i++) {
            if (currentNumber % i === 0) {
                isCurrentPrime = false;
                break;
            }
        }
    }
    
    document.getElementById('primeNumber').innerHTML = 
        `<div class="big-number">${currentNumber}</div>`;
    document.getElementById('primeResult').innerHTML = '';
}

function answerPrime(userSaysPrime) {
    const resultDiv = document.getElementById('primeResult');
    
    if (userSaysPrime === isCurrentPrime) {
        resultDiv.innerHTML = '✅ Correct!';
        resultDiv.style.color = 'green';
        primeScore += 10;
        if (typeof MathProgress !== 'undefined') {
            const isWin = true;
            MathProgress.recordGamePlayed("Prime or Composite", primeScore, isWin);
        }
    } else {
        resultDiv.innerHTML = `❌ Incorrect. ${currentNumber} is ${isCurrentPrime ? 'prime' : 'composite'}.`;
        resultDiv.style.color = 'red';
        primeScore = Math.max(0, primeScore - 5);
        if (typeof MathProgress !== 'undefined') {
            const isWin = false;
            MathProgress.recordGamePlayed("Prime or Composite", primeScore, isWin);
        }
    }
    
    setTimeout(generatePrimeNumber, 1500);
}

// 4. FRACTION MATCHER GAME
let correctFractionIndex = 0;
const fractions = [];
let fractionScore = 0;

function initializeFraction() {
    generateFractionPuzzle();
}

function generateFractionPuzzle() {
    fractions.length = 0;
    const numerator = Math.floor(Math.random() * 8) + 1;
    const denominator = Math.floor(Math.random() * 8) + 2;
    const targetValue = numerator / denominator;
    
    fractions.push(`${numerator}/${denominator}`);
    
    for (let i = 0; i < 3; i++) {
        let wrongNum, wrongDen;
        do {
            wrongNum = Math.floor(Math.random() * 12) + 1;
            wrongDen = Math.floor(Math.random() * 12) + 2;
        } while (Math.abs(wrongNum/wrongDen - targetValue) < 0.1 || 
                 fractions.includes(`${wrongNum}/${wrongDen}`));
        fractions.push(`${wrongNum}/${wrongDen}`);
    }
    
    for (let i = fractions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [fractions[i], fractions[j]] = [fractions[j], fractions[i]];
        if (fractions[i] === `${numerator}/${denominator}`) correctFractionIndex = i;
        if (fractions[j] === `${numerator}/${denominator}`) correctFractionIndex = j;
    }
    
    const optionsDiv = document.getElementById('fractionOptions');
    optionsDiv.innerHTML = '';
    
    fractions.forEach((fraction, index) => {
        const button = document.createElement('button');
        button.textContent = fraction;
        button.onclick = () => checkFractionChoice(index);
        button.className = 'fraction-option';
        optionsDiv.appendChild(button);
    });
    
    document.getElementById('fractionQuestion').innerHTML = 
        `Find the fraction equal to ${numerator}/${denominator}`;
    document.getElementById('fractionResult').innerHTML = '';
}

function checkFractionChoice(index) {
    const resultDiv = document.getElementById('fractionResult');
    
    if (index === correctFractionIndex) {
        resultDiv.innerHTML = '✅ Correct!';
        resultDiv.style.color = 'green';
        fractionScore += 15;
        if (typeof MathProgress !== 'undefined') {
            const isWin = true;
            MathProgress.recordGamePlayed("Fraction Matcher", fractionScore, isWin);
        }
    } else {
        resultDiv.innerHTML = '❌ Try again!';
        resultDiv.style.color = 'red';
        fractionScore = Math.max(0, fractionScore - 5);
        
        if (typeof MathProgress !== 'undefined') {
            const isWin = false;
            MathProgress.recordGamePlayed("Fraction Matcher", fractionScore, isWin);
        }
    }
    
    setTimeout(generateFractionPuzzle, 1500);
}

// 5. SPEED MATH GAME
let speedScore = 0;
let speedTime = 30;
let speedTimer;
let currentSpeedProblem = '';
let speedAnswer = 0;
let speedProblemsSolved = 0;

function initializeSpeed() {
    generateSpeedProblem();
    document.getElementById('speedScore').textContent = speedScore;
    document.getElementById('speedSolved').textContent = speedProblemsSolved;
}

function generateSpeedProblem() {
    const operations = ['+', '-', '×', '÷'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    let a, b;
    
    switch(op) {
        case '+':
            a = Math.floor(Math.random() * 50) + 1;
            b = Math.floor(Math.random() * 50) + 1;
            speedAnswer = a + b;
            break;
        case '-':
            a = Math.floor(Math.random() * 50) + 1;
            b = Math.floor(Math.random() * a) + 1;
            speedAnswer = a - b;
            break;
        case '×':
            a = Math.floor(Math.random() * 12) + 1;
            b = Math.floor(Math.random() * 12) + 1;
            speedAnswer = a * b;
            break;
        case '÷':
            b = Math.floor(Math.random() * 10) + 2;
            speedAnswer = Math.floor(Math.random() * 10) + 1;
            a = b * speedAnswer;
            break;
    }
    
    currentSpeedProblem = `${a} ${op === '×' ? '×' : op === '÷' ? '÷' : op} ${b}`;
    document.getElementById('speedQuestion').innerHTML = currentSpeedProblem;
    document.getElementById('speedInput').value = '';
}

function checkSpeed() {
    const userAnswer = parseInt(document.getElementById('speedInput').value);
    
    if (userAnswer === speedAnswer) {
        speedScore += 10;
        speedProblemsSolved++;
        document.getElementById('speedScore').textContent = speedScore;
        document.getElementById('speedSolved').textContent = speedProblemsSolved;
        generateSpeedProblem();
    } else {
        alert(`Incorrect! Correct answer was ${speedAnswer}`);
        generateSpeedProblem();
    }
}

function startSpeedTimer() {
    if (speedTimer) clearInterval(speedTimer);
    
    speedTime = 30;
    speedScore = 0;
    speedProblemsSolved = 0;
    document.getElementById('speedScore').textContent = speedScore;
    document.getElementById('speedSolved').textContent = speedProblemsSolved;
    document.getElementById('speedTimer').textContent = speedTime;
    
    generateSpeedProblem();
    
    speedTimer = setInterval(() => {
        speedTime--;
        document.getElementById('speedTimer').textContent = speedTime;
        
        if (speedTime <= 0) {
            clearInterval(speedTimer);
            if (typeof MathProgress !== 'undefined') {
                const isWin = speedScore > 0;
                MathProgress.recordGamePlayed("Speed Math Challenge", speedScore, isWin);
            }
            
            alert(`Time's up! Final score: ${speedScore}\nProblems solved: ${speedProblemsSolved}`);
        }
    }, 1000);
}

// 6. PATTERN PREDICTOR GAME
let patternSequence = [];
let patternAnswer = 0;
let patternStreak = 0;

function initializePattern() {
    generatePattern();
}

function generatePattern() {
    const patternType = Math.floor(Math.random() * 3);
    patternSequence = [];
    
    switch(patternType) {
        case 0:
            const start = Math.floor(Math.random() * 10) + 1;
            const diff = Math.floor(Math.random() * 5) + 1;
            for (let i = 0; i < 4; i++) {
                patternSequence.push(start + i * diff);
            }
            patternAnswer = start + 4 * diff;
            break;  
        case 1:
            const startG = Math.floor(Math.random() * 5) + 1;
            const ratio = Math.floor(Math.random() * 3) + 2;
            for (let i = 0; i < 4; i++) {
                patternSequence.push(startG * Math.pow(ratio, i));
            }
            patternAnswer = startG * Math.pow(ratio, 4);
            break;        
        case 2: 
            const base = Math.floor(Math.random() * 5) + 1;
            for (let i = 0; i < 4; i++) {
                patternSequence.push(Math.pow(base + i, 2));
            }
            patternAnswer = Math.pow(base + 4, 2);
            break;
    }
    
    document.getElementById('patternQuestion').innerHTML = 
        `Sequence: ${patternSequence.join(', ')}, ?`;
    document.getElementById('patternResult').innerHTML = '';
    document.getElementById('patternInput').value = '';
}

function checkPattern() {
    const userAnswer = parseInt(document.getElementById('patternInput').value);
    const resultDiv = document.getElementById('patternResult');
    
    if (userAnswer === patternAnswer) {
        resultDiv.innerHTML = '✅ Correct!';
        resultDiv.style.color = 'green';
        patternStreak++;
        if (typeof MathProgress !== 'undefined') {
            const score = patternStreak * 8;
            const isWin = true;
            MathProgress.recordGamePlayed("Pattern Predictor", score, isWin);
        }
    } else {
        resultDiv.innerHTML = `❌ Incorrect. Next number is ${patternAnswer}`;
        resultDiv.style.color = 'red';
        patternStreak = Math.max(0, patternStreak - 1);
        if (typeof MathProgress !== 'undefined') {
            const score = patternStreak * 8;
            const isWin = false;
            MathProgress.recordGamePlayed("Pattern Predictor", score, isWin);
        }
    }
    
    setTimeout(generatePattern, 1500);
}

// 7. MATH MAZE SOLVER
let mazePosition = {x: 0, y: 0};
let mazeScore = 0;
let mazeEquation = '';

function initializeMathMaze() {
    generateMathMaze();
}

function generateMathMaze() {
    mazePosition = {x: 0, y: 0};
    mazeScore = 0;
    
    const mazeGrid = document.getElementById('mazeGrid');
    mazeGrid.innerHTML = '';
    
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            const cell = document.createElement('div');
            cell.className = 'maze-cell';
            cell.id = `maze-cell-${x}-${y}`;
            cell.textContent = x === 0 && y === 0 ? 'START' : 
                              x === 2 && y === 2 ? 'END' : '?';
            mazeGrid.appendChild(cell);
        }
    }
    
    updateMazeDisplay();
    generateMazeEquation();
}

function generateMazeEquation() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const c = Math.floor(Math.random() * 20) + 10;
    mazeEquation = `${a}x + ${b} = ${c}`;
    document.getElementById('mazeEquation').textContent = mazeEquation;
    document.getElementById('mazeAnswer').value = '';
}

function solveMazeStep() {
    const userAnswer = parseInt(document.getElementById('mazeAnswer').value);
    const equationParts = mazeEquation.split('=');
    const rightSide = parseInt(equationParts[1]);
    const leftSideParts = equationParts[0].split('+');
    const coeff = parseInt(leftSideParts[0].replace('x', ''));
    const constant = parseInt(leftSideParts[1]);
    const correctAnswer = (rightSide - constant) / coeff;
    
    if (userAnswer === correctAnswer) {
        mazeScore += 10;
        
        if (mazePosition.x < 2) {
            mazePosition.x++;
        } else if (mazePosition.y < 2) {
            mazePosition.x = 0;
            mazePosition.y++;
        }
        
        updateMazeDisplay();
        
        if (mazePosition.x === 2 && mazePosition.y === 2) {
            if (typeof MathProgress !== 'undefined') {
                const isWin = true;
                MathProgress.recordGamePlayed("Math Maze Solver", mazeScore, isWin);
            }
            
            document.getElementById('mazeResult').innerHTML = 
                `🎉 Maze completed! Final score: ${mazeScore}`;
            setTimeout(generateMathMaze, 2000);
        } else {
            generateMazeEquation();
        }
    } else {
        document.getElementById('mazeResult').innerHTML = 
            `❌ Wrong answer. Try again! Correct answer: ${correctAnswer}`;
    }
}

function updateMazeDisplay() {
    document.getElementById('mazePos').textContent = 
        `(${mazePosition.x}, ${mazePosition.y})`;
    document.getElementById('mazeScore').textContent = mazeScore;
    
    document.querySelectorAll('.maze-cell').forEach(cell => {
        cell.classList.remove('current');
    });
    
    const currentCell = document.getElementById(`maze-cell-${mazePosition.x}-${mazePosition.y}`);
    if (currentCell) currentCell.classList.add('current');
}

// 8. FUNCTION TRANSFORMER
let currentFunction = 'x²';
let targetFunction = '';
let movesLeft = 5;
let functionTransformations = [];
let functionPuzzlesSolved = 0;

function initializeFunctionGame() {
    newFunctionPuzzle();
}

function newFunctionPuzzle() {
    const hShift = Math.floor(Math.random() * 5) - 2;
    const vShift = Math.floor(Math.random() * 5) - 2;
    const stretch = Math.random() > 0.5 ? 2 : 0.5;
    
    targetFunction = `(${hShift >= 0 ? 'x' + (hShift > 0 ? '+' + hShift : '') : 'x' + hShift})² ${vShift >= 0 ? '+' + vShift : vShift}`;
    
    if (stretch !== 1) {
        targetFunction = `${stretch}×${targetFunction}`;
    }
    
    currentFunction = 'x²';
    movesLeft = 5;
    functionTransformations = [];
    
    document.getElementById('startFunc').textContent = currentFunction;
    document.getElementById('targetFunc').textContent = targetFunction;
    document.getElementById('currentFunc').textContent = currentFunction;
    document.getElementById('functionMoves').textContent = movesLeft;
    document.getElementById('functionResult').innerHTML = '';
}

function applyTransform(type, value) {
    if (movesLeft <= 0) return;   
    
    movesLeft--;
    functionTransformations.push({type, value});
    
    switch(type) {
        case 'shiftH':
            currentFunction = currentFunction.replace(/x/g, `(x${value >= 0 ? '-' + (-value) : '+' + (-value)})`);
            break;
        case 'shiftV':
            if (currentFunction.includes('+') || currentFunction.includes('-')) {
                const parts = currentFunction.split(/([+-])/);
                const lastNum = parseInt(parts[parts.length-1]) || 0;
                parts[parts.length-1] = lastNum + value;
                currentFunction = parts.join('');
            } else {
                currentFunction += `${value >= 0 ? '+' + value : value}`;
            }
            break;
        case 'stretch':
            currentFunction = `${value}×(${currentFunction})`;
            break;
        case 'compress':
            currentFunction = `(${currentFunction})/${1/value}`;
            break;
        case 'reflect':
            if (value === 'x') {
                currentFunction = currentFunction.replace(/x/g, '-x');
            } else if (value === 'y') {
                currentFunction = `-(${currentFunction})`;
            }
            break;
    }
    
    document.getElementById('currentFunc').textContent = currentFunction;
    document.getElementById('functionMoves').textContent = movesLeft;
}

function checkFunctionMatch() {
    const simplifiedCurrent = currentFunction.replace(/\s+/g, '');
    const simplifiedTarget = targetFunction.replace(/\s+/g, '');
    
    if (simplifiedCurrent === simplifiedTarget) {
        functionPuzzlesSolved++;
        if (typeof MathProgress !== 'undefined') {
            const score = functionPuzzlesSolved * 20;
            const isWin = true;
            MathProgress.recordGamePlayed("Function Transformer", score, isWin);
        }
        
        document.getElementById('functionResult').innerHTML = 
            '✅ Perfect match! Well done!';
        setTimeout(newFunctionPuzzle, 1500);
    } else {
        document.getElementById('functionResult').innerHTML = 
            '❌ Not quite. Keep transforming!';
    }
}

// 9. POLYGON CONSTRUCTOR 
let polygonVertices = [];
let polygonConstraints = [];
let polygonAttempts = 0;

function initializePolygonGame() {
    newPolygonPuzzle();
}

function newPolygonPuzzle() {
    polygonVertices = [
        {x: 50, y: 250}, 
        {x: 250, y: 250},
        {x: 150, y: 50}   
    ];
    
    polygonConstraints = [
        "Vertex A at (0,0)",
        "Vertex B at (5,0)",
        "Side AB = 5 units",
        "Interior angle at B = 90°",
        "Area must be 12.5 units²"
    ];
    
    polygonConstraints.forEach((constraint, i) => {
        document.getElementById(`constraint${i+1}`).textContent = `• ${constraint}`;
    });
    
    polygonAttempts = 0;
    drawPolygon();
    document.getElementById('polygonResult').innerHTML = '';
}

function drawPolygon() {
    const canvas = document.getElementById('polygonCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    
    for (let x = 0; x <= 400; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 300);
        ctx.stroke();
    }
    
    for (let y = 0; y <= 300; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(400, y);
        ctx.stroke();
    }
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 250);
    ctx.lineTo(400, 250);
    ctx.moveTo(50, 0);
    ctx.lineTo(50, 300);
    ctx.stroke();
    if (polygonVertices.length >= 3) {
        ctx.fillStyle = 'rgba(76, 175, 80, 0.3)';
        ctx.strokeStyle = '#4CAF50';
        ctx.lineWidth = 3;
        
        ctx.beginPath();
        ctx.moveTo(polygonVertices[0].x, polygonVertices[0].y);
        for (let i = 1; i < polygonVertices.length; i++) {
            ctx.lineTo(polygonVertices[i].x, polygonVertices[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#2E7D32';
        polygonVertices.forEach(vertex => {
            ctx.beginPath();
            ctx.arc(vertex.x, vertex.y, 6, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.fillStyle = '#000';
        ctx.font = 'bold 14px Arial';
        polygonVertices.forEach((vertex, i) => {
            ctx.fillText(String.fromCharCode(65 + i), vertex.x - 5, vertex.y - 10);
        });
    }
}

function addVertex() {
    if (polygonVertices.length < 6) {
        const newVertex = {
            x: Math.floor(Math.random() * 300) + 50,
            y: Math.floor(Math.random() * 200) + 50
        };
        polygonVertices.push(newVertex);
        drawPolygon();
    }
}

function removeVertex() {
    if (polygonVertices.length > 3) {
        polygonVertices.pop();
        drawPolygon();
    }
}

function checkPolygon() {
    polygonAttempts++;
    
    if (polygonVertices.length >= 3) {
        if (typeof MathProgress !== 'undefined') {
            const score = polygonAttempts <= 3 ? 30 : 10;
            const isWin = true;
            MathProgress.recordGamePlayed("Polygon Constructor", score, isWin);
        }
        
        document.getElementById('polygonResult').innerHTML = 
            '✅ Polygon created! Try adjusting vertices to meet all constraints.';
    } else {
        document.getElementById('polygonResult').innerHTML = 
            '❌ Need at least 3 vertices for a polygon.';
    }
}

// 10. INFINITE SERIES CONVERGER
let currentSeries = '';
let seriesConverges = true;
let seriesScore = 0;

function initializeSeriesGame() {
    newSeriesPuzzle();
}

function newSeriesPuzzle() {
    const seriesTypes = [
        {term: '1/n²', converges: true, test: 'p-series (p=2>1)'},
        {term: '1/n', converges: false, test: 'harmonic series'},
        {term: '(-1)ⁿ/n', converges: true, test: 'alternating harmonic'},
        {term: '1/2ⁿ', converges: true, test: 'geometric (r=1/2)'},
        {term: 'n/2ⁿ', converges: true, test: 'ratio test'},
        {term: '1/√n', converges: false, test: 'p-series (p=1/2<1)'}
    ]; 
    
    const randomSeries = seriesTypes[Math.floor(Math.random() * seriesTypes.length)];
    currentSeries = randomSeries.term;
    seriesConverges = randomSeries.converges;

    document.getElementById('seriesTerm').textContent = currentSeries;
    document.getElementById('seriesAnalysis').value = '';
    document.getElementById('seriesResult').innerHTML = '';
}

function applyTest(testName) {
    const analysis = document.getElementById('seriesAnalysis');
    analysis.value += `Applied ${testName}: `;
    
    switch(testName) {
        case 'comparison':
            analysis.value += 'Compare with known convergent/divergent series.\n';
            break;
        case 'ratio':
            analysis.value += 'Compute limit of |aₙ₊₁/aₙ| as n→∞.\n';
            break;
        case 'root':
            analysis.value += 'Compute limit of ⁿ√|aₙ| as n→∞.\n';
            break;
        case 'integral':
            analysis.value += 'Check if ∫f(x)dx from 1 to ∞ converges.\n';
            break;
        case 'alternating':
            analysis.value += 'Check if |aₙ| decreases and lim aₙ = 0.\n';
            break;
    }
}

function submitVerdict(userSaysConverges) {
    if (userSaysConverges === seriesConverges) {
        seriesScore += 25;
        if (typeof MathProgress !== 'undefined') {
            const isWin = true;
            MathProgress.recordGamePlayed("Infinite Series Converger", seriesScore, isWin);
        }
        
        document.getElementById('seriesResult').innerHTML = 
            '✅ Correct analysis!';
    } else {
        seriesScore = Math.max(0, seriesScore - 10);
        if (typeof MathProgress !== 'undefined') {
            const isWin = false;
            MathProgress.recordGamePlayed("Infinite Series Converger", seriesScore, isWin);
        }
        
        document.getElementById('seriesResult').innerHTML = 
            `❌ Incorrect. Series ${currentSeries} ${seriesConverges ? 'converges' : 'diverges'}.`;
    }
    
    setTimeout(newSeriesPuzzle, 2000);
}

// 11. MATRIX PATHFINDER
let pathMatrix = [];
let pathPosition = {row: 0, col: 0};
let pathCurrentValue = 0;
let pathTargetValue = 0;
let pathMoves = 0;

function initializeMatrixPath() {
    newMatrixPath();
}

function newMatrixPath() {
    pathMatrix = [];
    for (let i = 0; i < 3; i++) {
        pathMatrix[i] = [];
        for (let j = 0; j < 3; j++) {
            pathMatrix[i][j] = Math.floor(Math.random() * 10) + 1;
        }
    }
    
    pathPosition = {row: 0, col: 0};
    pathCurrentValue = pathMatrix[0][0];
    pathTargetValue = Math.floor(Math.random() * 50) + 30;
    pathMoves = 0;
    
    updateMatrixDisplay();
    document.getElementById('matrixPathResult').innerHTML = '';
}

function updateMatrixDisplay() {
    const matrixDiv = document.getElementById('pathMatrix');
    matrixDiv.innerHTML = '';    
    
    for (let i = 0; i < 3; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'matrix-row';   
        
        for (let j = 0; j < 3; j++) {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'matrix-cell';
            if (i === pathPosition.row && j === pathPosition.col) {
                cellDiv.classList.add('current-cell');
            }
            cellDiv.textContent = pathMatrix[i][j];
            rowDiv.appendChild(cellDiv);
        }      
        matrixDiv.appendChild(rowDiv);
    }
    
    document.getElementById('pathPos').textContent = 
        `(${pathPosition.row+1},${pathPosition.col+1})`;
    document.getElementById('pathValue').textContent = pathCurrentValue;
    document.getElementById('pathTarget').textContent = pathTargetValue;
}

function pathOperation(operation) {
    pathMoves++;
    
    switch(operation) {
        case 'addRow':
            if (pathPosition.row < 2) {
                pathPosition.row++;
                pathCurrentValue += pathMatrix[pathPosition.row][pathPosition.col];
            }
            break;
        case 'multiplyCol':
            if (pathPosition.col < 2) {
                pathPosition.col++;
                pathCurrentValue *= pathMatrix[pathPosition.row][pathPosition.col];
            }
            break;
        case 'transpose':
            [pathPosition.row, pathPosition.col] = [pathPosition.col, pathPosition.row];
            if (pathPosition.row > 2) pathPosition.row = 2;
            if (pathPosition.col > 2) pathPosition.col = 2;
            pathCurrentValue = pathMatrix[pathPosition.row][pathPosition.col];
            break;
        case 'determinant':
            if (pathPosition.row < 2 && pathPosition.col < 2) {
                const a = pathMatrix[pathPosition.row][pathPosition.col];
                const b = pathMatrix[pathPosition.row][pathPosition.col+1];
                const c = pathMatrix[pathPosition.row+1][pathPosition.col];
                const d = pathMatrix[pathPosition.row+1][pathPosition.col+1];
                pathCurrentValue = a*d - b*c;
            }
            break;
    }
    
    updateMatrixDisplay();
}

function checkMatrixPath() {
    if (pathCurrentValue === pathTargetValue) {
        if (typeof MathProgress !== 'undefined') {
            const score = 100 - (pathMoves * 5);
            const isWin = true;
            MathProgress.recordGamePlayed("Matrix Pathfinder", score, isWin);
        }
        
        document.getElementById('matrixPathResult').innerHTML = 
            '🎉 Target reached! Perfect pathfinding!';
        setTimeout(newMatrixPath, 2000);
    } else if (pathCurrentValue > pathTargetValue) {
        document.getElementById('matrixPathResult').innerHTML = 
            '📈 Too high! Try different operations.';
    } else {
        document.getElementById('matrixPathResult').innerHTML = 
            '📉 Too low! Try different operations.';
    }
}

// 12. DERIVATIVE DETECTIVE
let derivativeClues = [];
let derivativeSolution = '';
let detectiveScore = 0;

function initializeDerivativeDetective() {
    newDerivativeMystery();
}

function newDerivativeMystery() {
    const a = Math.floor(Math.random() * 3) + 1;
    const b = Math.floor(Math.random() * 5) - 2;
    const c = Math.floor(Math.random() * 10) - 5;
    
    derivativeSolution = `${a}x³ + ${b}x² + ${c}x`;
    
    derivativeClues = [
        `f'(0) = ${c}`,
        `f'(x) has roots at x = ${b === 0 ? '0' : 'solve quadratic'}`,
        `f'(x) > 0 for x > ${Math.max(0, -b/(3*a))}`,
        `∫f'(x)dx from 0 to 1 = ${a/4 + b/3 + c/2}`,
        `f''(0) = ${2*b}`
    ];
    
    derivativeClues.forEach((clue, i) => {
        document.getElementById(`clue${i+1}`).textContent = `• ${clue}`;
    });
    
    document.getElementById('detectiveFunction').value = '';
    document.getElementById('detectiveConstant').value = '';
    document.getElementById('detectiveResult').innerHTML = '';
}

function checkDerivativeSolution() {
    const userFunction = document.getElementById('detectiveFunction').value;
    const userConstant = parseInt(document.getElementById('detectiveConstant').value) || 0;
    const fullSolution = derivativeSolution + (userConstant !== 0 ? ` + ${userConstant}` : '');
    
    if (userFunction.replace(/\s+/g, '') === fullSolution.replace(/\s+/g, '')) {
        detectiveScore += 50;
        if (typeof MathProgress !== 'undefined') {
            const isWin = true;
            MathProgress.recordGamePlayed("Derivative Detective", detectiveScore, isWin);
        }
        
        document.getElementById('detectiveResult').innerHTML = 
            '🔍 Case solved! You found the function!';
    } else {
        detectiveScore = Math.max(0, detectiveScore - 10);
        if (typeof MathProgress !== 'undefined') {
            const isWin = false;
            MathProgress.recordGamePlayed("Derivative Detective", detectiveScore, isWin);
        }
        
        document.getElementById('detectiveResult').innerHTML = 
            '❌ Not quite. The solution was: ' + fullSolution;
    }
    
    setTimeout(newDerivativeMystery, 3000);
}
function resetAllGames() {
    memoryLevel = 1;
    memoryHighScore = 0;
    
    speedScore = 0;
    speedTime = 30;
    speedProblemsSolved = 0;
    
    balanceStreak = 0;
    primeScore = 0;
    fractionScore = 0;
    patternStreak = 0;
    functionPuzzlesSolved = 0;
    seriesScore = 0;
    detectiveScore = 0;
    
    if (speedTimer) clearInterval(speedTimer);
    
    initializeMemory();
    initializeBalance();
    initializePrime();
    initializeFraction();
    initializeSpeed();
    initializePattern();
    initializeMathMaze();
    initializeFunctionGame();
    initializePolygonGame();
    initializeSeriesGame();
    initializeMatrixPath();
    initializeDerivativeDetective();
}
window.MathGames = {
    version: '1.0.0',
    games: [
        'Number Memory', 'Equation Balancer', 'Prime/Composite',
        'Fraction Matcher', 'Speed Math', 'Pattern Predictor',
        'Math Maze', 'Function Transformer', 'Polygon Constructor',
        'Infinite Series Converger', 'Matrix Pathfinder', 'Derivative Detective'
    ],
    resetAll: resetAllGames,
    getHighScores: function() {
        return {
            memory: memoryHighScore,
            speed: speedScore,
            prime: primeScore,
            detective: detectiveScore
        };
    }
};
(function() {
    setInterval(() => {
        if (typeof MathProgress !== 'undefined') {
            const gameData = {
                memoryLevel: memoryLevel,
                speedScore: speedScore,
                primeScore: primeScore,
                detectiveScore: detectiveScore,
                lastPlayed: new Date().toISOString()
            };
            localStorage.setItem('mathGamesProgress', JSON.stringify(gameData));
        }
    }, 30000);
    const savedProgress = localStorage.getItem('mathGamesProgress');
    if (savedProgress) {
        try {
            const data = JSON.parse(savedProgress);
            if (data.memoryLevel) memoryLevel = data.memoryLevel;
            if (data.speedScore) speedScore = data.speedScore;
            if (data.primeScore) primeScore = data.primeScore;
            if (data.detectiveScore) detectiveScore = data.detectiveScore;
        } catch (e) {
            console.log("Could not load saved game progress");
        }
    }
})();