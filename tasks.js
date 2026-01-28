console.log("✅ tasks.js LOADED");
console.log("MathProgress available?", typeof MathProgress !== 'undefined');

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
});

const topics = ['differentiation', 'integration', 'matrices', 'vectors', 'areas', 'volumes'];

const taskFormulas = {
    differentiation: [
        (x) => ({
            q: `Differentiate: y = ${x}x^3 + ${x+2}x^2 + ${x+4}x + ${x-1}`,
            ans: `${3*x}x^2 + ${2*(x+2)}x + ${x+4}`,
            steps: `Step 1: Apply power rule: d/dx(x^n)=n*x^(n-1)<br>
d/dx(${x}x^3)=${3*x}x^2<br>
d/dx(${x+2}x^2)=${2*(x+2)}x<br>
d/dx(${x+4}x)=${x+4}<br>
d/dx(${x-1})=0<br>
Final Answer: ${3*x}x^2 + ${2*(x+2)}x + ${x+4}`
        }),
        (x) => ({
            q: `Differentiate: y = ${x}sin(x) + ${x+1}cos(x)`,
            ans: `${x}cos(x) - ${x+1}sin(x)`,
            steps: `Step 1: d/dx(sin x)=cos x, d/dx(cos x)=-sin x<br>
Step 2: Multiply constants<br>
dy/dx = ${x}cos(x) - ${x+1}sin(x)`
        }),
        (x) => ({
            q: `Differentiate: y = e^{${x}x}`,
            ans: `${x}e^{${x}x}`,
            steps: `d/dx(e^{kx}) = k*e^{kx}<br>
Here k=${x}<br>
Final Answer: ${x}e^{${x}x}`
        })
    ],

    integration: [
        (x) => ({
            q: `Integrate: ∫(${x}x^2 + ${x+3}x + ${x-2}) dx`,
            ans: `${x/3}x^3 + ${(x+3)/2}x^2 + ${x-2}x + C`,
            steps: `Step 1: ∫x^n dx = x^(n+1)/(n+1)<br>
∫${x}x^2 dx = ${x/3}x^3<br>
∫${x+3}x dx = ${(x+3)/2}x^2<br>
∫${x-2} dx = ${x-2}x<br>
Final Answer: ${x/3}x^3 + ${(x+3)/2}x^2 + ${x-2}x + C`
        }),
        (x) => ({
            q: `Integrate: ∫(${x}cos(x) - ${x+1}sin(x)) dx`,
            ans: `${x}sin(x) + ${x+1}cos(x) + C`,
            steps: `∫cos(x) dx = sin(x)<br>
∫-sin(x) dx = cos(x)<br>
Multiply constants, sum results<br>
Final Answer: ${x}sin(x) + ${x+1}cos(x) + C`
        }),
        (x) => ({
            q: `Integrate: ∫ e^{${x}x} dx`,
            ans: `e^{${x}x}/${x} + C`,
            steps: `∫e^{kx} dx = e^{kx}/k<br>
Here k=${x}<br>
Final Answer: e^{${x}x}/${x} + C`
        })
    ],

    matrices: [
        (x) => ({
            q: `Find determinant of [[${x},${x+1}],[${x+2},${x+5}]]`,
            ans: `${x*(x+5) - (x+1)*(x+2)}`,
            steps: `Step 1: det = ad - bc<br>
(${x}*${x+5}) - (${x+1}*${x+2}) = ${x*(x+5) - (x+1)*(x+2)}`
        }),
        (x) => ({
            q: `Does matrix [[${x},${x+1}],[${x+2},${x+3}]] have an inverse?`,
            ans: `${x*(x+3)-(x+1)*(x+2) !== 0 ? 'Yes' : 'No'}`,
            steps: `Compute determinant: ${x}*${x+3} - ${x+1}*${x+2} = ${x*(x+3)-(x+1)*(x+2)}<br>
If det ≠0 → inverse exists → ${x*(x+3)-(x+1)*(x+2) !== 0 ? 'Yes' : 'No'}`
        })
    ],

    vectors: [
        (x) => ({
            q: `Find magnitude of vector (${x},${x+2},${x-1})`,
            ans: `${Math.sqrt(x*x + (x+2)*(x+2) + (x-1)*(x-1)).toFixed(2)}`,
            steps: `|v| = √(x1²+x2²+x3²)<br>
Substitute: √(${x}² + ${x+2}² + ${x-1}²)<br>
= √(${x*x} + ${(x+2)*(x+2)} + ${(x-1)*(x-1)})<br>
= √(${x*x + (x+2)*(x+2) + (x-1)*(x-1)})<br>
= ${Math.sqrt(x*x + (x+2)*(x+2) + (x-1)*(x-1)).toFixed(2)}`
        }),
        (x) => ({
            q: `Find dot product of (${x},2) and (${x+1},3)`,
            ans: `${x*(x+1)+6}`,
            steps: `a·b = x1y1 + x2y2<br>
Substitute: ${x}*${x+1} + 2*3 = ${x*(x+1)} + 6 = ${x*(x+1)+6}`
        })
    ],

    areas: [
        (x) => ({
            q: `Triangle base ${x}, height ${x+4}`,
            ans: `${0.5*x*(x+4)}`,
            steps: `A = 1/2 × base × height<br>
A = 1/2 × ${x} × ${x+4}<br>
A = 0.5 × ${x} × ${x+4}<br>
A = ${0.5*x*(x+4)}`
        }),
        (x) => ({
            q: `Circle radius ${x}`,
            ans: `${Math.PI*x*x}`,
            steps: `A = πr²<br>
A = π × ${x}²<br>
A = π × ${x} × ${x}<br>
A = ${Math.PI*x*x}`
        })
    ],
    volumes: [
        (x) => ({
            q: `Cylinder radius ${x}, height ${x+2}`,
            ans: `${Math.PI*x*x*(x+2)}`,
            steps: `V = πr²h<br>
r = ${x}, h = ${x+2}<br>
V = π × ${x}² × ${x+2}<br>
V = π × ${x} × ${x} × ${x+2}<br>
V = ${Math.PI*x*x*(x+2)}`
        }),
        (x) => ({
            q: `Sphere radius ${x}`,
            ans: `${(4/3)*Math.PI*x**3}`,
            steps: `V = 4/3 πr³<br>
r = ${x}<br>
V = 4/3 × π × ${x}³<br>
V = ${(4/3)*Math.PI*x**3}`
        })
    ]
};

const topicSelect = document.getElementById("topicSelect");
const taskDisplay = document.getElementById("taskDisplay");
const answerInput = document.getElementById("answerInput");
const resultDisplay = document.getElementById("resultDisplay");
const solutionSteps = document.getElementById("solutionSteps");
const freeQuestion = document.getElementById("freeQuestion");
const solveFreeQuestionBtn = document.getElementById("solveFreeQuestion");
const freeAnswer = document.getElementById("freeAnswer");
const freeSteps = document.getElementById("freeSteps");

let currentTask = null;
let currentTopic = null;

document.getElementById("generateTaskBtn").onclick = () => {
    try {
        const t = topicSelect.value;
        if (!t) {
            alert("Please choose a topic first");
            return;
        }
        
        currentTopic = t;
        const randomNum = Math.floor(Math.random() * 1000) + 1;
        const generators = taskFormulas[t];
        const generator = generators[Math.floor(Math.random() * generators.length)];
        currentTask = generator(randomNum);
        
        taskDisplay.innerHTML = currentTask.q;
        answerInput.value = "";
        resultDisplay.innerHTML = "";
        solutionSteps.innerHTML = "";
        
        // Record topic viewing
        if (typeof MathProgress !== 'undefined') {
            const topicNames = {
                'differentiation': 'Differentiation',
                'integration': 'Integration',
                'matrices': 'Matrices',
                'vectors': 'Vectors',
                'areas': 'Areas of Shapes',
                'volumes': 'Volumes of Solids'
            };
            MathProgress.recordTopicViewed(topicNames[t] || t);
        }
        
    } catch (e) {
        taskDisplay.innerHTML = "Error generating task. Please try again.";
        console.error("Generate task error:", e);
    }
};

document.getElementById("submitAnswer").onclick = () => {
    console.log("🖱️ Submit button clicked");
    try {
        if (!currentTask) {
            alert("Please generate a task first!");
            return;
        }
        
        if (!currentTopic) {
            console.error("No current topic set!");
            return;
        }
        
        const userAnswer = answerInput.value.trim();
        const correctAnswer = currentTask.ans;
        
        if (!userAnswer) {
            resultDisplay.innerHTML = "Please enter an answer";
            resultDisplay.style.color = "orange";
            return;
        }
        
        const isNumeric = !isNaN(parseFloat(correctAnswer)) && isFinite(correctAnswer);
        let isCorrect = false;
        
        if (isNumeric) {
            const userValue = parseFloat(userAnswer);
            const correctValue = parseFloat(correctAnswer);
            
            if (isNaN(userValue)) {
                resultDisplay.innerHTML = "Please enter a valid number";
                resultDisplay.style.color = "orange";
                return;
            } else {
                isCorrect = Math.abs(userValue - correctValue) < 0.001;
            }
        } else {
            isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
        }
        
        // Update display based on correctness
        if (isCorrect) {
            resultDisplay.innerHTML = "✓ Correct! Well done!";
            resultDisplay.style.color = "green";
            
            // Record achievement
            if (typeof MathProgress !== 'undefined') {
                console.log("🎯 Recording correct answer for topic:", currentTopic);
                const problemDesc = currentTask.q.substring(0, 50) + '...';
                
                // Map to broader categories for progress
                const topicMap = {
                    'differentiation': 'calculus',
                    'integration': 'calculus',
                    'matrices': 'algebra',
                    'vectors': 'algebra',
                    'areas': 'geometry',
                    'volumes': 'geometry'
                };
                
                const progressTopic = topicMap[currentTopic] || 'algebra';
                MathProgress.recordProblemSolved(progressTopic, true, problemDesc);
                
                // Show achievement notification
                setTimeout(() => {
                    const notification = document.createElement('div');
                    notification.style.cssText = 'position:fixed; top:20px; right:20px; background:#28a745; color:white; padding:15px; border-radius:10px; z-index:1000; box-shadow:0 4px 12px rgba(0,0,0,0.2);';
                    notification.innerHTML = `
                        <strong>🏆 Achievement Updated!</strong><br>
                        <small>Check your <a href="achievements.html" style="color:#ffd; font-weight:bold;">Achievements Page</a></small>
                    `;
                    document.body.appendChild(notification);
                    setTimeout(() => notification.remove(), 4000);
                }, 500);
            }
        } else {
            resultDisplay.innerHTML = "✗ Incorrect. Try again!";
            resultDisplay.style.color = "red";
            
            // Record incorrect attempt too
            if (typeof MathProgress !== 'undefined') {
                const problemDesc = currentTask.q.substring(0, 50) + '...';
                const topicMap = {
                    'differentiation': 'calculus',
                    'integration': 'calculus',
                    'matrices': 'algebra',
                    'vectors': 'algebra',
                    'areas': 'geometry',
                    'volumes': 'geometry'
                };
                const progressTopic = topicMap[currentTopic] || 'algebra';
                MathProgress.recordProblemSolved(progressTopic, false, problemDesc);
            }
        }
        
        solutionSteps.innerHTML = "<strong>Solution Steps:</strong><br>" + currentTask.steps;
        
    } catch (e) {
        resultDisplay.innerHTML = "Error checking answer";
        resultDisplay.style.color = "orange";
        console.error("Check answer error:", e);
    }
};

class MathSolver {
    constructor() {
        this.history = [];
    }
    
    solve(question) {
        try {
            question = question.trim().toLowerCase();
            let result = { answer: "", steps: [] };
            
            if (this.isDifferentiation(question)) {
                result = this.solveDifferentiation(question);
            } else if (this.isIntegration(question)) {
                result = this.solveIntegration(question);
            } else if (this.isEquation(question)) {
                result = this.solveEquation(question);
            } else if (this.isAreaVolume(question)) {
                result = this.solveAreaVolume(question);
            } else if (this.isMatrix(question)) {
                result = this.solveMatrix(question);
            } else if (this.isVector(question)) {
                result = this.solveVector(question);
            } else if (this.isArithmetic(question)) {
                result = this.solveArithmetic(question);
            } else {
                result.answer = "I can solve: differentiation, integration, equations, area/volume, matrices, vectors, and arithmetic.";
                result.steps = ["Please ask a specific math question."];
            }
            
            this.history.push({ question, result, timestamp: new Date() });
            if (this.history.length > 50) this.history.shift();
            
            return result;
        } catch (e) {
            return {
                answer: "Error solving question. Please try rephrasing.",
                steps: ["Error: " + e.message]
            };
        }
    }
    
    isDifferentiation(q) {
        return q.includes('differentiate') || q.includes('derivative') || q.includes("dy/dx") || 
               q.includes("d/dx") || q.includes("find the derivative");
    }
    
    isIntegration(q) {
        return q.includes('integrate') || q.includes('integration') || q.includes('∫') || 
               q.includes('antiderivative');
    }
    
    isEquation(q) {
        return q.includes('solve') && q.includes('=');
    }
    
    isAreaVolume(q) {
        return q.includes('area') || q.includes('volume') || q.includes('surface area') ||
               q.includes('perimeter') || q.includes('circumference');
    }
    
    isMatrix(q) {
        return q.includes('matrix') || q.includes('determinant') || q.includes('inverse') ||
               q.match(/\[\[.*\]\]/);
    }
    
    isVector(q) {
        return q.includes('vector') || q.includes('magnitude') || q.includes('dot product') ||
               q.includes('cross product') || q.match(/\([\d\s,]+\)/);
    }
    
    isArithmetic(q) {
        return q.match(/[\d\+\-\*\/\^\(\)\.]+/) && !this.isDifferentiation(q) && 
               !this.isIntegration(q) && !this.isEquation(q);
    }
    
    solveDifferentiation(q) {
        const steps = [];
        let answer = "";
        let functionText = q.replace(/.*differentiate/i, "")
                           .replace(/.*derivative/i, "")
                           .replace(/.*dy\/dx/i, "")
                           .replace(/.*d\/dx/i, "")
                           .replace(/.*y\s*=/i, "")
                           .replace(/.*of/i, "")
                           .trim();
        
        if (!functionText) {
            functionText = q.match(/(\d+[xX]?[\^\.\d]*[\+\-\*\/]?)+/)?.[0] || "";
        }
        
        steps.push(`Function: f(x) = ${functionText}`);
        const terms = this.parseTerms(functionText);
        steps.push(`Parsed terms: ${JSON.stringify(terms)}`);
        
        let derivativeTerms = [];
        for (let term of terms) {
            if (term.type === 'power') {
                const newCoeff = term.coeff * term.power;
                const newPower = term.power - 1;
                if (newPower === 0) {
                    derivativeTerms.push(`${newCoeff}`);
                } else if (newPower === 1) {
                    derivativeTerms.push(`${newCoeff}x`);
                } else {
                    derivativeTerms.push(`${newCoeff}x^${newPower}`);
                }
                steps.push(`d/dx(${term.coeff}x^${term.power}) = ${newCoeff}x^${newPower}`);
            } else if (term.type === 'trig') {
                if (term.func === 'sin') {
                    derivativeTerms.push(`${term.coeff}cos(x)`);
                    steps.push(`d/dx(${term.coeff}sin(x)) = ${term.coeff}cos(x)`);
                } else if (term.func === 'cos') {
                    derivativeTerms.push(`${-term.coeff}sin(x)`);
                    steps.push(`d/dx(${term.coeff}cos(x)) = ${-term.coeff}sin(x)`);
                } else if (term.func === 'tan') {
                    derivativeTerms.push(`${term.coeff}sec²(x)`);
                    steps.push(`d/dx(${term.coeff}tan(x)) = ${term.coeff}sec²(x)`);
                }
            } else if (term.type === 'exp') {
                derivativeTerms.push(`${term.coeff * term.baseCoeff}e^${term.baseCoeff}x`);
                steps.push(`d/dx(${term.coeff}e^${term.baseCoeff}x) = ${term.coeff * term.baseCoeff}e^${term.baseCoeff}x`);
            } else if (term.type === 'log') {
                derivativeTerms.push(`${term.coeff}/${term.coeff}x`);
                steps.push(`d/dx(${term.coeff}ln(${term.coeff}x)) = ${term.coeff}/${term.coeff}x`);
            }
        }
        
        answer = derivativeTerms.join(' + ').replace(/\+\s*\-/g, '- ');
        if (!answer) answer = "0";
        steps.push(`Final derivative: f'(x) = ${answer}`);
        
        return { answer: `f'(x) = ${answer}`, steps };
    }
    
    solveIntegration(q) {
        const steps = [];
        let answer = "";
        let integrand = q.replace(/.*integrate/i, "")
                        .replace(/.*∫/i, "")
                        .replace(/dx.*/i, "")
                        .trim();
        
        steps.push(`Integrand: ∫${integrand} dx`);
        const terms = this.parseTerms(integrand);
        
        let integralTerms = [];
        for (let term of terms) {
            if (term.type === 'power') {
                const newPower = term.power + 1;
                const newCoeff = term.coeff / newPower;
                if (newCoeff === 1) {
                    integralTerms.push(`x^${newPower}/${newPower}`);
                } else {
                    integralTerms.push(`${newCoeff}x^${newPower}`);
                }             
                steps.push(`∫${term.coeff}x^${term.power} dx = ${newCoeff}x^${newPower}`);               
            } else if (term.type === 'trig') {
                if (term.func === 'sin') {
                    integralTerms.push(`${-term.coeff}cos(x)`);
                    steps.push(`∫${term.coeff}sin(x) dx = ${-term.coeff}cos(x)`);
                } else if (term.func === 'cos') {
                    integralTerms.push(`${term.coeff}sin(x)`);
                    steps.push(`∫${term.coeff}cos(x) dx = ${term.coeff}sin(x)`);
                }
            } else if (term.type === 'exp') {
                integralTerms.push(`${term.coeff/term.baseCoeff}e^${term.baseCoeff}x`);
                steps.push(`∫${term.coeff}e^${term.baseCoeff}x dx = ${term.coeff/term.baseCoeff}e^${term.baseCoeff}x`);
            }
        }
        
        answer = integralTerms.join(' + ').replace(/\+\s*\-/g, '- ');
        if (!answer) answer = "0";
        answer += " + C";
        steps.push(`Final integral: ∫${integrand} dx = ${answer}`);
        
        return { answer: `∫${integrand} dx = ${answer}`, steps };
    }
    
    solveEquation(q) {
        const steps = [];
        let answer = "";
        let equation = q.replace(/.*solve/i, "").replace(/.*equation/i, "").trim();
        steps.push(`Equation: ${equation}`);
        
        if (equation.includes('x') && !equation.includes('^')) {
            const sides = equation.split('=');
            const left = sides[0].trim();
            const right = parseFloat(sides[1].trim());
            const match = left.match(/([+-]?\d*\.?\d*)x([+-]\d+\.?\d*)?/);
            
            if (match) {
                const a = match[1] === '' || match[1] === '+' ? 1 : 
                         match[1] === '-' ? -1 : parseFloat(match[1]);
                const b = match[2] ? parseFloat(match[2]) : 0;
                
                steps.push(`Step 1: ${a}x + ${b} = ${right}`);
                steps.push(`Step 2: ${a}x = ${right} - ${b}`);
                steps.push(`Step 3: ${a}x = ${right - b}`);
                steps.push(`Step 4: x = ${right - b} / ${a}`);
                
                const xValue = (right - b) / a;
                answer = `x = ${xValue}`;
                steps.push(`Step 5: ${answer}`);
            }
        } else if (equation.includes('x^2')) {
            answer = "For quadratic equations: Use formula x = [-b ± √(b²-4ac)]/2a";
            steps.push("Quadratic formula: x = [-b ± √(b²-4ac)]/(2a)");
            steps.push("1. Identify a, b, c from ax² + bx + c = 0");
            steps.push("2. Calculate discriminant: Δ = b² - 4ac");
            steps.push("3. If Δ > 0: two real solutions");
            steps.push("4. If Δ = 0: one real solution");
            steps.push("5. If Δ < 0: two complex solutions");
        }
        
        return { answer, steps };
    }
    
    solveAreaVolume(q) {
        const steps = [];
        let answer = "";
        const numbers = q.match(/\d+(\.\d+)?/g) || [];
        const nums = numbers.map(n => parseFloat(n));
        
        if (q.includes('circle') && q.includes('radius')) {
            const r = nums[0] || 1;
            if (q.includes('area')) {
                const area = Math.PI * r * r;
                steps.push(`Formula: A = πr²`);
                steps.push(`Substitute: A = π × ${r}²`);
                steps.push(`Calculate: A = π × ${r*r}`);
                answer = `Area = ${area.toFixed(2)}`;
                steps.push(`Result: ${answer}`);
            } else if (q.includes('circumference')) {
                const circ = 2 * Math.PI * r;
                steps.push(`Formula: C = 2πr`);
                steps.push(`Substitute: C = 2 × π × ${r}`);
                answer = `Circumference = ${circ.toFixed(2)}`;
                steps.push(`Result: ${answer}`);
            }
        } else if (q.includes('triangle')) {
            if (nums.length >= 2) {
                const base = nums[0];
                const height = nums[1];
                const area = 0.5 * base * height;
                steps.push(`Formula: A = ½ × base × height`);
                steps.push(`Substitute: A = ½ × ${base} × ${height}`);
                answer = `Area = ${area}`;
                steps.push(`Result: ${answer}`);
            }
        } else if (q.includes('rectangle')) {
            if (nums.length >= 2) {
                const length = nums[0];
                const width = nums[1];
                const area = length * width;
                steps.push(`Formula: A = length × width`);
                steps.push(`Substitute: A = ${length} × ${width}`);
                answer = `Area = ${area}`;
                steps.push(`Result: ${answer}`);
            }
        } else if (q.includes('sphere') && q.includes('radius')) {
            const r = nums[0] || 1;
            if (q.includes('volume')) {
                const volume = (4/3) * Math.PI * Math.pow(r, 3);
                steps.push(`Formula: V = 4/3 πr³`);
                steps.push(`Substitute: V = 4/3 × π × ${r}³`);
                answer = `Volume = ${volume.toFixed(2)}`;
                steps.push(`Result: ${answer}`);
            } else if (q.includes('surface area')) {
                const sa = 4 * Math.PI * r * r;
                steps.push(`Formula: SA = 4πr²`);
                steps.push(`Substitute: SA = 4 × π × ${r}²`);
                answer = `Surface Area = ${sa.toFixed(2)}`;
                steps.push(`Result: ${answer}`);
            }
        } else if (q.includes('cylinder')) {
            if (nums.length >= 2) {
                const r = nums[0];
                const h = nums[1];
                if (q.includes('volume')) {
                    const volume = Math.PI * r * r * h;
                    steps.push(`Formula: V = πr²h`);
                    steps.push(`Substitute: V = π × ${r}² × ${h}`);
                    answer = `Volume = ${volume.toFixed(2)}`;
                    steps.push(`Result: ${answer}`);
                }
            }
        } else {
            answer = "Specify shape and dimensions (e.g., 'area of circle radius 5', 'volume of sphere radius 3')";
            steps.push("Supported shapes: circle, triangle, rectangle, sphere, cylinder");
        }
        
        return { answer, steps };
    }
    
    solveMatrix(q) {
        const steps = [];
        let answer = "";
        
        if (q.includes('determinant')) {
            const matrixMatch = q.match(/\[\[([\d\s,]+)\]\]/);
            if (matrixMatch) {
                const matrixStr = matrixMatch[1];
                const rows = matrixStr.split('],[');
                if (rows.length === 2) {
                    const row1 = rows[0].split(',').map(Number);
                    const row2 = rows[1].split(',').map(Number);
                    if (row1.length === 2 && row2.length === 2) {
                        const det = row1[0]*row2[1] - row1[1]*row2[0];
                        steps.push(`2×2 matrix: [[${row1[0]},${row1[1]}],[${row2[0]},${row2[1]}]]`);
                        steps.push(`Formula: det = ad - bc`);
                        steps.push(`Calculation: (${row1[0]}×${row2[1]}) - (${row1[1]}×${row2[0]})`);
                        answer = `Determinant = ${det}`;
                        steps.push(`Result: ${answer}`);
                    }
                }
            } else {
                answer = "For 2×2 matrix determinant: det([[a,b],[c,d]]) = ad - bc";
                steps.push("Enter matrix as: [[a,b],[c,d]]");
            }
        } else if (q.includes('inverse')) {
            answer = "Matrix inverse: A⁻¹ = (1/det(A)) × adj(A)";
            steps.push("Step 1: Calculate determinant");
            steps.push("Step 2: Find matrix of minors");
            steps.push("Step 3: Create cofactor matrix");
            steps.push("Step 4: Transpose to get adjugate");
            steps.push("Step 5: Multiply by 1/determinant");
        }
        
        return { answer, steps };
    }
    
    solveVector(q) {
        const steps = [];
        let answer = "";
        const vectorMatch = q.match(/\(([\d\s,]+)\)/);
        
        if (vectorMatch) {
            const components = vectorMatch[1].split(',').map(Number);
            
            if (q.includes('magnitude')) {
                const sumSquares = components.reduce((sum, c) => sum + c*c, 0);
                const magnitude = Math.sqrt(sumSquares);
                steps.push(`Vector: (${components.join(', ')})`);
                steps.push(`Formula: |v| = √(x² + y² + z²)`);
                steps.push(`Calculation: √(${components.map(c => `${c}²`).join(' + ')})`);
                steps.push(`Simplify: √(${components.map(c => c*c).join(' + ')})`);
                answer = `Magnitude = ${magnitude.toFixed(2)}`;
                steps.push(`Result: ${answer}`);
            } else if (q.includes('dot product')) {
                const vectors = q.match(/\(([\d\s,]+)\)/g);
                if (vectors && vectors.length >= 2) {
                    const v1 = vectors[0].slice(1,-1).split(',').map(Number);
                    const v2 = vectors[1].slice(1,-1).split(',').map(Number);
                    if (v1.length === v2.length) {
                        const dot = v1.reduce((sum, c, i) => sum + c*v2[i], 0);
                        steps.push(`Vector A: (${v1.join(', ')})`);
                        steps.push(`Vector B: (${v2.join(', ')})`);
                        steps.push(`Formula: A·B = Σaᵢbᵢ`);
                        steps.push(`Calculation: ${v1.map((c,i) => `${c}×${v2[i]}`).join(' + ')}`);
                        answer = `Dot product = ${dot}`;
                        steps.push(`Result: ${answer}`);
                    }
                }
            }
        } else {
            answer = "Enter vectors as: (x, y, z) or (x, y)";
            steps.push("Example: 'magnitude of vector (3,4)' or 'dot product of (1,2) and (3,4)'");
        }
        
        return { answer, steps };
    }
    
    solveArithmetic(q) {
        const steps = [];
        let answer = "";
        
        try {
            let expr = q.replace(/[^0-9+\-*/().^√π\s]/g, '')
                       .replace(/π/g, Math.PI.toString())
                       .replace(/√/g, 'Math.sqrt')
                       .replace(/\^/g, '**');
            
            steps.push(`Expression: ${expr}`);
            
            if (this.isValidMathExpression(expr)) {
                const result = Function('"use strict"; return (' + expr + ')')();
                answer = `Result = ${result}`;
                steps.push(`Calculation: ${expr}`);
                steps.push(`Result: ${result}`);
            } else {
                answer = "Invalid arithmetic expression";
                steps.push("Only numbers and + - * / ^ √ π allowed");
            }
        } catch (e) {
            answer = "Error in calculation";
            steps.push("Please check your expression");
        }
        
        return { answer, steps };
    }
    
    parseTerms(expression) {
        const terms = [];
        expression = expression.replace(/\s+/g, '');
        const termRegex = /([+-]?)(\d*\.?\d*)([a-zA-Z]+)?(\^?)(\d*)/g;
        let match;
        
        while ((match = termRegex.exec(expression)) !== null) {
            const sign = match[1] === '-' ? -1 : 1;
            const coeff = match[2] === '' ? 1 : parseFloat(match[2] || '1');
            const variable = match[3] || '';
            const hasPower = match[4] === '^';
            const power = match[5] === '' ? 1 : parseFloat(match[5] || '1');
            
            const finalCoeff = sign * coeff;
            
            if (variable.includes('sin') || variable.includes('cos') || variable.includes('tan')) {
                terms.push({
                    type: 'trig',
                    coeff: finalCoeff,
                    func: variable.substring(0, 3),
                    power: power
                });
            } else if (variable.includes('e')) {
                terms.push({
                    type: 'exp',
                    coeff: finalCoeff,
                    baseCoeff: power || 1
                });
            } else if (variable.includes('ln') || variable.includes('log')) {
                terms.push({
                    type: 'log',
                    coeff: finalCoeff,
                    baseCoeff: power || 1
                });
            } else if (variable.includes('x')) {
                terms.push({
                    type: 'power',
                    coeff: finalCoeff,
                    power: power
                });
            } else if (!variable && match[0]) {
                terms.push({
                    type: 'constant',
                    coeff: finalCoeff
                });
            }
        }
        
        return terms;
    }
    
    isValidMathExpression(expr) {
        return /^[\d+\-*/().^√π\s]+$/.test(expr) || 
               /^[\d+\-*/().^√π\s]*Math\.sqrt\([\d+\-*/().^√π\s]*\)[\d+\-*/().^√π\s]*$/.test(expr);
    }
}

const mathSolver = new MathSolver();

solveFreeQuestionBtn.onclick = () => {
    try {
        let q = freeQuestion.value.trim();
        if (!q) {
            alert("Please enter a question!");
            return;
        }
        
        freeSteps.innerHTML = "";
        freeAnswer.innerHTML = "";
        const result = mathSolver.solve(q);
        freeAnswer.innerHTML = `<strong>${result.answer}</strong>`;
        
        // Record activity for free questions
        if (typeof MathProgress !== 'undefined') {
            MathProgress.recordTopicViewed("Custom Problem Solving");
        }
        
        if (result.steps && result.steps.length > 0) {
            freeSteps.innerHTML = "<strong>Step-by-step solution:</strong><br>";
            result.steps.forEach((step, i) => {
                freeSteps.innerHTML += `${i+1}. ${step}<br>`;
            });
        }
        
        freeQuestion.value = "";
    } catch (e) {
        freeAnswer.innerHTML = "Error solving question. Please try again.";
        console.error("Solver error:", e);
    }
};

document.getElementById("scanImageBtn").onclick = () => {
    const file = document.getElementById("imageInput").files[0];
    if (!file) {
        alert("Please select an image file first!");
        return;
    }
    
    document.getElementById("ocrStatus").innerHTML = "Image scanning requires Tesseract.js library.";
    document.getElementById("userQuestion").innerHTML = "Please type your question in the text area above.";
};

function evaluateSimpleExpression(expr) {
    try {
        expr = expr.replace(/[^0-9+\-*/().]/g, '');
        return Function('"use strict"; return (' + expr + ')')();
    } catch (e) {
        return "Error in calculation";
    }
}

// Initialize topic select options
if (topicSelect) {
    topics.forEach(topic => {
        const option = document.createElement('option');
        option.value = topic;
        option.textContent = topic.charAt(0).toUpperCase() + topic.slice(1);
        topicSelect.appendChild(option);
    });
}