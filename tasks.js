document.addEventListener("DOMContentLoaded", function() {
    const welcomeDiv = document.getElementById("welcomeMessage");
    if (welcomeDiv) {
        const user = localStorage.getItem("currentUser");
        if (!user) {
            welcomeDiv.innerHTML = 
                '<p style="background:#fff3cd; padding:8px; border-radius:5px; margin:10px 0;">' +
                '👋 <strong>Practice as guest!</strong> ' +
                '<a href="login.html" style="color:#007bff; font-weight:bold;">Login</a> ' +
                'to save your progress and track achievements.' +
                '</p>';
        } else {
            welcomeDiv.innerHTML = 
                '<p style="background:#d4edda; padding:8px; border-radius:5px; margin:10px 0;">' +
                '👋 Welcome back, <strong>' + user + '</strong>! Your progress is being saved.' +
                '</p>';
        }
    }
});
const topics = ['differentiation', 'integration', 'matrices', 'vectors', 'areas', 'volumes'];

const taskFormulas = {
    // ---------------- DIFFERENTIATION ----------------
    differentiation: [
        // Polynomial power rule
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
        // Trig functions
        (x) => ({
            q: `Differentiate: y = ${x}sin(x) + ${x+1}cos(x)`,
            ans: `${x}cos(x) - ${x+1}sin(x)`,
            steps: `Step 1: d/dx(sin x)=cos x, d/dx(cos x)=-sin x<br>
Step 2: Multiply constants<br>
dy/dx = ${x}cos(x) - ${x+1}sin(x)`
        }),
        // Exponentials
        (x) => ({
            q: `Differentiate: y = e^{${x}x}`,
            ans: `${x}e^{${x}x}`,
            steps: `d/dx(e^{kx}) = k*e^{kx}<br>
Here k=${x}<br>
Final Answer: ${x}e^{${x}x}`
        }),
        // Logarithms
        (x) => ({
            q: `Differentiate: y = ln(${x}x + 1)`,
            ans: `${x}/(${x}x + 1)`,
            steps: `d/dx(ln(u)) = 1/u * du/dx<br>
u=${x}x+1, du/dx=${x}<br>
dy/dx = ${x}/(${x}x+1)`
        }),
        // Product rule
        (x) => ({
            q: `Differentiate: y = (${x}x^2)(sin(x))`,
            ans: `${2*x}*sin(x) + ${x}x^2*cos(x)`,
            steps: `Product rule: d(uv)/dx = u'v + uv'<br>
u=${x}x^2, u'=${2*x}, v=sin(x), v'=cos(x)<br>
dy/dx = ${2*x}*sin(x) + ${x}x^2*cos(x)`
        }),
        // Chain rule
        (x) => ({
            q: `Differentiate: y = (3x+${x})^5`,
            ans: `5*(3x+${x})^4*3`,
            steps: `Chain rule: d/dx[f(g(x))] = f'(g(x))*g'(x)<br>
f(u)=u^5, f'(u)=5u^4<br>
g(x)=3x+${x}, g'(x)=3<br>
dy/dx = 5*(3x+${x})^4*3`
        })
    ],

    // ---------------- INTEGRATION ----------------
    integration: [
        // Polynomial
        (x) => ({
            q: `Integrate: ∫(${x}x^2 + ${x+3}x + ${x-2}) dx`,
            ans: `${x/3}x^3 + ${(x+3)/2}x^2 + ${x-2}x + C`,
            steps: `Step 1: ∫x^n dx = x^(n+1)/(n+1)<br>
∫${x}x^2 dx = ${x/3}x^3<br>
∫${x+3}x dx = ${(x+3)/2}x^2<br>
∫${x-2} dx = ${x-2}x<br>
Final Answer: ${x/3}x^3 + ${(x+3)/2}x^2 + ${x-2}x + C`
        }),
        // Trig
        (x) => ({
            q: `Integrate: ∫(${x}cos(x) - ${x+1}sin(x)) dx`,
            ans: `${x}sin(x) + ${x+1}cos(x) + C`,
            steps: `∫cos(x) dx = sin(x)<br>
∫-sin(x) dx = cos(x)<br>
Multiply constants, sum results<br>
Final Answer: ${x}sin(x) + ${x+1}cos(x) + C`
        }),
        // Exponentials
        (x) => ({
            q: `Integrate: ∫ e^{${x}x} dx`,
            ans: `e^{${x}x}/${x} + C`,
            steps: `∫e^{kx} dx = e^{kx}/k<br>
Here k=${x}<br>
Final Answer: e^{${x}x}/${x} + C`
        }),
        // By substitution
        (x) => ({
            q: `Integrate: ∫(2x*(${x}x^2 +1)^3) dx`,
            ans: `(${x}x^2 +1)^4/4 + C`,
            steps: `Step 1: Let u = ${x}x^2 +1 → du/dx = 2x<br>
∫2x*(u)^3 dx = ∫ u^3 du = u^4/4<br>
Substitute u back → (${x}x^2 +1)^4/4 + C`
        }),
        // By parts
        (x) => ({
            q: `Integrate: ∫ x*e^{${x}x} dx`,
            ans: `(x/${x})e^{${x}x} - (1/${x}^2)e^{${x}x} + C`,
            steps: `Integration by parts: ∫ u dv = uv - ∫ v du<br>
u=x → du=dx<br>
dv=e^{${x}x}dx → v = e^{${x}x}/${x}<br>
∫x*e^{${x}x}dx = x*(e^{${x}x}/${x}) - ∫(e^{${x}x}/${x})dx<br>
= (x/${x})e^{${x}x} - (1/${x})∫e^{${x}x}dx<br>
= (x/${x})e^{${x}x} - (1/${x}^2)e^{${x}x} + C`
        })
    ],

    // ---------------- MATRICES ----------------
    matrices: [
        // 2x2 determinant
        (x) => ({
            q: `Find determinant of [[${x},${x+1}],[${x+2},${x+5}]]`,
            ans: `${x*(x+5) - (x+1)*(x+2)}`,
            steps: `Step 1: det = ad - bc<br>
(${x}*${x+5}) - (${x+1}*${x+2}) = ${x*(x+5) - (x+1)*(x+2)}`
        }),
        // 3x3 determinant (rule of Sarrus)
        (x) => ({
            q: `Find determinant of [[${x},${x+1},${x+2}],[${x+3},${x+4},${x+5}],[${x+6},${x+7},${x+8}]]`,
            ans: `${x*(x+4)*(x+8) + (x+1)*(x+5)*(x+6) + (x+2)*(x+3)*(x+7) - (x+2)*(x+4)*(x+6) - (x+1)*(x+3)*(x+8) - x*(x+5)*(x+7)}`,
            steps: `Use rule of Sarrus:<br>
det = aei + bfg + cdh - ceg - bdi - afh<br>
= (${x}*${x+4}*${x+8}) + (${x+1}*${x+5}*${x+6}) + (${x+2}*${x+3}*${x+7}) - (${x+2}*${x+4}*${x+6}) - (${x+1}*${x+3}*${x+8}) - (${x}*${x+5}*${x+7})<br>
= ${x*(x+4)*(x+8) + (x+1)*(x+5)*(x+6) + (x+2)*(x+3)*(x+7) - (x+2)*(x+4)*(x+6) - (x+1)*(x+3)*(x+8) - x*(x+5)*(x+7)}`
        }),
        // Inverse check
        (x) => ({
            q: `Does matrix [[${x},${x+1}],[${x+2},${x+3}]] have an inverse?`,
            ans: `${x*(x+3)-(x+1)*(x+2) !== 0 ? 'Yes' : 'No'}`,
            steps: `Compute determinant: ${x}*${x+3} - ${x+1}*${x+2} = ${x*(x+3)-(x+1)*(x+2)}<br>
If det ≠0 → inverse exists → ${x*(x+3)-(x+1)*(x+2) !== 0 ? 'Yes' : 'No'}`
        }),
        // Gaussian elimination example
        (x) => ({
            q: `Solve system using Gaussian elimination: x + ${x}y = 10, 2x + ${x+1}y = 20`,
            ans: `x = ${10/(1+x)}`,
            steps: `Perform row operations:<br>
[[1,${x}|10],[2,${x+1}|20]]<br>
R2 → R2 - 2*R1: [0,${(x+1)-2*x}|${20-20}]<br>
Since second equation becomes 0 = 0, system is dependent.<br>
x = 10 - ${x}y`
        })
    ],

    // ---------------- VECTORS ----------------
    vectors: [
        // Magnitude
        (x) => ({
            q: `Find magnitude of vector (${x},${x+2},${x-1})`,
            ans: `${Math.sqrt(x*x + (x+2)*(x+2) + (x-1)*(x-1)).toFixed(2)}`,
            steps: `|v| = √(x1²+x2²+x3²)<br>
Substitute: √(${x}² + ${x+2}² + ${x-1}²)<br>
= √(${x*x} + ${(x+2)*(x+2)} + ${(x-1)*(x-1)})<br>
= √(${x*x + (x+2)*(x+2) + (x-1)*(x-1)})<br>
= ${Math.sqrt(x*x + (x+2)*(x+2) + (x-1)*(x-1)).toFixed(2)}`
        }),
        // Dot product
        (x) => ({
            q: `Find dot product of (${x},2) and (${x+1},3)`,
            ans: `${x*(x+1)+6}`,
            steps: `a·b = x1y1 + x2y2<br>
Substitute: ${x}*${x+1} + 2*3 = ${x*(x+1)} + 6 = ${x*(x+1)+6}`
        }),
        // Cross product
        (x) => ({
            q: `Cross product of (${x},0,1) × (0,${x},1)`,
            ans: `(${-x}, -1, ${x*x})`,
            steps: `Use determinant method:<br>
|i  j  k|<br>
|${x} 0 1|<br>
|0 ${x} 1|<br>
i(0*1 - 1*${x}) - j(${x}*1 - 1*0) + k(${x}*${x} - 0*0)<br>
= i(0-${x}) - j(${x}-0) + k(${x*x}-0)<br>
= (${-x}, -1, ${x*x})`
        }),
        // Parallel check
        (x) => ({
            q: `Are vectors (${x},${2*x}) and (${x+1},${2*(x+1)}) parallel?`,
            ans: `Yes`,
            steps: `Check if second is constant multiple of first:<br>
(${x+1}/${x}) = ${(x+1)/x}, (${2*(x+1)}/${2*x}) = ${(x+1)/x}<br>
Ratios equal → Yes → Parallel`
        })
    ],

    // ---------------- AREAS ----------------
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
        }),
        (x) => ({
            q: `Trapezium sides ${x} and ${x+3}, height ${x+2}`,
            ans: `${0.5*(2*x+3)*(x+2)}`,
            steps: `A = 1/2 (a+b)h<br>
A = 1/2 (${x}+${x+3}) × ${x+2}<br>
A = 0.5 × (${2*x+3}) × ${x+2}<br>
A = ${0.5*(2*x+3)*(x+2)}`
        }),
        (x) => ({
            q: `Parallelogram base ${x}, height ${x+3}`,
            ans: `${x*(x+3)}`,
            steps: `A = base × height<br>
A = ${x} × ${x+3}<br>
A = ${x*(x+3)}`
        }),
        (x) => ({
            q: `Sector radius ${x}, angle 60°`,
            ans: `${((Math.PI*x*x*60)/360).toFixed(2)}`,
            steps: `A = (θ/360)πr²<br>
A = (60/360) × π × ${x}²<br>
A = (1/6) × π × ${x} × ${x}<br>
A = ${((Math.PI*x*x*60)/360).toFixed(2)}`
        })
    ],

    // ---------------- VOLUMES ----------------
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
        }),
        (x) => ({
            q: `Cone radius ${x}, height ${x+3}`,
            ans: `${(1/3)*Math.PI*x*x*(x+3)}`,
            steps: `V = 1/3 πr²h<br>
r = ${x}, h = ${x+3}<br>
V = 1/3 × π × ${x}² × ${x+3}<br>
V = ${(1/3)*Math.PI*x*x*(x+3)}`
        }),
        (x) => ({
            q: `Rectangular prism ${x}×${x+1}×${x+2}`,
            ans: `${x*(x+1)*(x+2)}`,
            steps: `V = lwh<br>
V = ${x} × ${x+1} × ${x+2}<br>
V = ${x*(x+1)*(x+2)}`
        }),
        (x) => ({
            q: `Pyramid base ${x}×${x+1}, height ${x+2}`,
            ans: `${x*(x+1)*(x+2)/3}`,
            steps: `V = 1/3 × base area × height<br>
Base = ${x} × ${x+1}<br>
V = 1/3 × ${x} × ${x+1} × ${x+2}<br>
V = ${x*(x+1)*(x+2)/3}`
        })
    ]
};
// ---------------- DOM REFERENCES -----------------
const topicSelect = document.getElementById("topicSelect");
const taskDisplay = document.getElementById("taskDisplay");
const answerInput = document.getElementById("answerInput");
const resultDisplay = document.getElementById("resultDisplay");
const solutionSteps = document.getElementById("solutionSteps");
const freeQuestion = document.getElementById("freeQuestion");
const solveFreeQuestionBtn = document.getElementById("solveFreeQuestion");
const freeAnswer = document.getElementById("freeAnswer");
const freeSteps = document.getElementById("freeSteps");
const imageInput = document.getElementById("imageInput");
const scanImageBtn = document.getElementById("scanImageBtn");
const ocrStatus = document.getElementById("ocrStatus");
const userQuestion = document.getElementById("userQuestion");
const userSolution = document.getElementById("userSolution");

let currentTask = null;

// ---------------- GENERATE TASK -----------------
document.getElementById("generateTaskBtn").onclick = () => {
    const t = topicSelect.value;
    if (!t) {
        alert("Choose topic");
        return;
    }
    const randomNum = Math.floor(Math.random() * 1000) + 1;
    const generators = taskFormulas[t];
    const generator = generators[Math.floor(Math.random() * generators.length)];
    currentTask = generator(randomNum);
    taskDisplay.innerHTML = currentTask.q;
    answerInput.value = "";
    resultDisplay.innerHTML = "";
    solutionSteps.innerHTML = "";
    if (typeof MathJax !== 'undefined') {
        MathJax.typeset();
    }
};

// ---------------- CHECK ANSWER & UPDATE PROFILE -----------------
document.getElementById("submitAnswer").onclick = () => {
    if (!currentTask) {
        alert("Please generate a task first!");
        return;
    }
    
    const t = topicSelect.value;
    let userAnswer = answerInput.value.trim();
    
    try {
        // Handle text answers (Yes/No) vs numeric answers
        const correctAnswer = currentTask.ans;
        
        // Check if answer is numeric
        const isNumeric = !isNaN(parseFloat(correctAnswer)) && isFinite(correctAnswer);
        
        if (isNumeric) {
            // For numeric answers
            const userValue = parseFloat(userAnswer);
            const correctValue = parseFloat(correctAnswer);
            
            if (isNaN(userValue)) {
                resultDisplay.innerHTML = "Please enter a valid number";
                resultDisplay.style.color = "orange";
            } else {
                const isCorrect = Math.abs(userValue - correctValue) < 0.001;
                
                if (isCorrect) {
                    resultDisplay.innerHTML = "✔ Correct!";
                    resultDisplay.style.color = "lightgreen";
                } else {
                    resultDisplay.innerHTML = "❌ Incorrect";
                    resultDisplay.style.color = "red";
                }
            }
        } else {
            // For text answers
            if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                resultDisplay.innerHTML = "✔ Correct!";
                resultDisplay.style.color = "lightgreen";
            } else {
                resultDisplay.innerHTML = "❌ Incorrect";
                resultDisplay.style.color = "red";
            }
        }
    } catch (e) {
        resultDisplay.innerHTML = "Error evaluating answer";
        resultDisplay.style.color = "orange";
    }
    
    solutionSteps.innerHTML = currentTask.steps;
    if (typeof MathJax !== 'undefined') {
        MathJax.typeset();
    }

    // Update profile
    updateProfile(resultDisplay.innerHTML.includes("Correct"), t);
};

// ---------------- FREE QUESTION SOLVER -----------------
solveFreeQuestionBtn.onclick = () => {
    let q = freeQuestion.value.trim();
    if (!q) {
        alert("Please enter a question!");
        return;
    }

    freeSteps.innerHTML = "";
    freeAnswer.innerHTML = "";

    // Normalize text
    let text = q.toLowerCase();

    // ----------- DIFFERENTIATION -------------
    if (text.includes("differentiate") || text.includes("derivative") || text.includes("dy/dx")) {
        try {
            let expr = q.replace(/.*differentiate/i, "")
                        .replace(/.*derivative/i, "")
                        .replace(/.*dy\/dx/i, "")
                        .replace(/.*y\s*=/i, "")
                        .trim();

            freeSteps.innerHTML += "Step 1: Function: f(x) = " + expr + "<br>";

            // Simple power rule implementation
            let derivative = "";
            
            // Handle basic power rule: ax^n
            const powerRuleMatch = expr.match(/([+-]?\d*)x\^?(\d+)/);
            if (powerRuleMatch) {
                const coefficient = powerRuleMatch[1] === "" || powerRuleMatch[1] === "+" ? 1 : 
                                  powerRuleMatch[1] === "-" ? -1 : parseFloat(powerRuleMatch[1]);
                const power = parseInt(powerRuleMatch[2]);
                
                const newCoefficient = coefficient * power;
                const newPower = power - 1;
                
                freeSteps.innerHTML += `Step 2: Apply power rule: d/dx(x^${power}) = ${power}x^${power-1}<br>`;
                
                if (newPower === 1) {
                    derivative = `${newCoefficient}x`;
                } else if (newPower === 0) {
                    derivative = `${newCoefficient}`;
                } else {
                    derivative = `${newCoefficient}x^${newPower}`;
                }
                
                freeAnswer.innerHTML = "dy/dx = <b>" + derivative + "</b>";
            } else {
                freeAnswer.innerHTML = "Please enter a function like: 2x^3 + 3x^2";
            }
            return;
        } catch (e) {
            freeAnswer.innerHTML = "Error solving differentiation problem";
        }
    }

    // ----------- INTEGRATION -------------
    if (text.includes("integrate") || text.includes("integration")) {
        try {
            let expr = q.replace(/.*integrate/i, "")
                        .replace(/.*integration/i, "")
                        .replace(/.*∫/i, "")
                        .trim();

            freeSteps.innerHTML += "Step 1: Expression: ∫" + expr + " dx<br>";

            // Simple power rule for integration
            const powerRuleMatch = expr.match(/([+-]?\d*)x\^?(\d+)/);
            if (powerRuleMatch) {
                const coefficient = powerRuleMatch[1] === "" || powerRuleMatch[1] === "+" ? 1 : 
                                  powerRuleMatch[1] === "-" ? -1 : parseFloat(powerRuleMatch[1]);
                const power = parseInt(powerRuleMatch[2]);
                
                const newPower = power + 1;
                const newCoefficient = coefficient / newPower;
                
                freeSteps.innerHTML += `Step 2: Apply integration rule: ∫x^${power} dx = x^${newPower}/${newPower}<br>`;
                
                let integral = `${newCoefficient}x^${newPower}`;
                freeAnswer.innerHTML = "∫ = <b>" + integral + " + C</b>";
            } else {
                freeAnswer.innerHTML = "Please enter an expression like: 3x^2";
            }
            return;
        } catch (e) {
            freeAnswer.innerHTML = "Error solving integration problem";
        }
    }

    // ----------- SOLVE LINEAR EQUATION -------------
    if (text.includes("solve") && text.includes("=")) {
        try {
            let eq = q.replace(/.*solve/i, "").trim();

            freeSteps.innerHTML += "Step 1: Equation: " + eq + "<br>";

            let parts = eq.split("=");
            let left = parts[0].trim();
            let right = parseFloat(parts[1].trim());

            // Simple linear equation: ax + b = c
            const match = left.match(/([+-]?\d*)x([+-]\d+)?/);
            if (match) {
                let a = match[1] === "" ? 1 : parseFloat(match[1]);
                let b = match[2] ? parseFloat(match[2]) : 0;
                
                freeSteps.innerHTML += `Step 2: ${a}x + ${b} = ${right}<br>`;
                freeSteps.innerHTML += `Step 3: ${a}x = ${right} - ${b}<br>`;
                freeSteps.innerHTML += `Step 4: ${a}x = ${right - b}<br>`;
                
                const xValue = (right - b) / a;
                freeSteps.innerHTML += `Step 5: x = ${right - b} / ${a}<br>`;
                freeAnswer.innerHTML = "x = <b>" + xValue + "</b>";
            } else {
                freeAnswer.innerHTML = "Please enter equation like: 2x + 3 = 7";
            }
            return;
        } catch (e) {
            freeAnswer.innerHTML = "Error solving equation";
        }
    }

    // ----------- AREA -------------
    if (text.includes("area")) {
        const radiusMatch = q.match(/radius\s*(\d+(\.\d+)?)/i) || q.match(/(\d+(\.\d+)?)\s*radius/i);
        if (radiusMatch) {
            const radius = parseFloat(radiusMatch[1]);
            freeSteps.innerHTML += "Step 1: Area of circle formula: A = πr²<br>";
            freeSteps.innerHTML += `Step 2: Substitute r = ${radius}<br>`;
            freeSteps.innerHTML += `Step 3: A = π × ${radius}²<br>`;
            const area = Math.PI * radius * radius;
            freeAnswer.innerHTML = "Area = <b>" + area.toFixed(2) + "</b>";
            return;
        }
    }

    // ----------- VOLUME -------------
    if (text.includes("volume")) {
        const radiusMatch = q.match(/radius\s*(\d+(\.\d+)?)/i) || q.match(/(\d+(\.\d+)?)\s*radius/i);
        if (radiusMatch) {
            const radius = parseFloat(radiusMatch[1]);
            freeSteps.innerHTML += "Step 1: Volume of sphere formula: V = 4/3 πr³<br>";
            freeSteps.innerHTML += `Step 2: Substitute r = ${radius}<br>`;
            freeSteps.innerHTML += `Step 3: V = 4/3 × π × ${radius}³<br>`;
            const volume = (4/3) * Math.PI * Math.pow(radius, 3);
            freeAnswer.innerHTML = "Volume = <b>" + volume.toFixed(2) + "</b>";
            return;
        }
    }

    // ----------- GENERAL CALCULATION -------------
    try {
        // Try to evaluate as mathematical expression
        let expr = q
            .replace(/pi/gi, "Math.PI")
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/\^/g, "**")
            .replace(/sqrt\(/gi, "Math.sqrt(")
            .replace(/sin\(/gi, "Math.sin(")
            .replace(/cos\(/gi, "Math.cos(")
            .replace(/tan\(/gi, "Math.tan(")
            .replace(/ln\(/gi, "Math.log(")
            .replace(/log\(/gi, "Math.log10(")
            .replace(/e\^/gi, "Math.exp(");

        // Remove non-math text
        expr = expr.replace(/[^0-9+\-*/().,MathPI√sincostanlnlogexp\s]/gi, '');
        
        if (expr.trim()) {
            const result = Function('"use strict";return (' + expr + ')')();
            freeSteps.innerHTML += "Evaluated expression: " + expr + "<br>";
            freeAnswer.innerHTML = "Result = <b>" + result + "</b>";
        } else {
            freeAnswer.innerHTML = "Sorry, I couldn't understand that question.";
        }
    } catch (e) {
        freeAnswer.innerHTML = "Sorry, I couldn't solve that question.";
    }
};

// ---------------- IMAGE SCANNER -----------------
scanImageBtn.onclick = () => {
    const file = imageInput.files[0];
    if (!file) {
        alert("Please select an image file first!");
        return;
    }

    ocrStatus.innerHTML = "Scanning image...";
    userQuestion.innerHTML = "";
    userSolution.innerHTML = "";

    const worker = Tesseract.createWorker({
        logger: m => {
            if (m.status === "recognizing text") {
                ocrStatus.innerHTML = "Recognizing text: " + Math.round(m.progress * 100) + "%";
            }
        }
    });

    (async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        
        const { data: { text } } = await worker.recognize(file);
        await worker.terminate();
        
        ocrStatus.innerHTML = "Scan complete!";
        userQuestion.innerHTML = "Scanned question: " + text;
        
        // Try to solve the scanned question
        freeQuestion.value = text;
        solveFreeQuestionBtn.click();
    })();
};

// ---------------- PROFILE FUNCTIONS -----------------
function updateProfile(isCorrect, topic) {
    let profile = JSON.parse(localStorage.getItem("profile")) || {};
    profile.badges = profile.badges || [];
    
    // Update stats
    profile.solved = (profile.solved || 0) + 1;
    profile.correct = (profile.correct || 0) + (isCorrect ? 1 : 0);
    profile.accuracy = Math.round(((profile.correct || 0) / profile.solved) * 100);
    
    // Update topic scores
    if (!profile.topics) profile.topics = {};
    if (!profile.topics[topic]) profile.topics[topic] = 0;
    profile.topics[topic] = Math.min(profile.topics[topic] + (isCorrect ? 2 : 1), 100);
    
    // Update general categories
    if (topic === "differentiation" || topic === "integration") {
        profile.calculus = Math.min((profile.calculus || 0) + (isCorrect ? 2 : 1), 100);
    }
    if (topic === "matrices" || topic === "vectors") {
        profile.algebra = Math.min((profile.algebra || 0) + (isCorrect ? 2 : 1), 100);
    }
    if (topic === "areas" || topic === "volumes") {
        profile.geometry = Math.min((profile.geometry || 0) + (isCorrect ? 2 : 1), 100);
    }
    
    // Award badges
    if (profile.solved >= 10 && !profile.badges.includes("First 10 Completed")) {
        profile.badges.push("First 10 Completed");
    }
    if (profile.correct >= 10 && !profile.badges.includes("First 10 Correct")) {
        profile.badges.push("First 10 Correct");
    }
    if (profile.calculus >= 100 && !profile.badges.includes("Calculus Master")) {
        profile.badges.push("Calculus Master");
    }
    if (profile.algebra >= 100 && !profile.badges.includes("Algebra Master")) {
        profile.badges.push("Algebra Master");
    }
    if (profile.geometry >= 100 && !profile.badges.includes("Geometry Master")) {
        profile.badges.push("Geometry Master");
    }
    if (profile.accuracy >= 90 && !profile.badges.includes("Accuracy Expert")) {
        profile.badges.push("Accuracy Expert");
    }
    
    localStorage.setItem("profile", JSON.stringify(profile));
    
    // Update profile display if function exists
    if (typeof loadProfile === "function") {
        loadProfile();
    }
}

// Initialize MathJax if not already done
if (typeof MathJax !== 'undefined') {
    MathJax.typesetPromise();
};