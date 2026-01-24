function showGame(id){
    document.querySelectorAll(".game").forEach(g=>g.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

/* 1 NUMBER MEMORY GAME */

let memoryNumber = "";

function newMemory(){
    memoryNumber = Math.floor(Math.random()*1000000).toString();
    memoryDisplay.textContent = memoryNumber;

    setTimeout(()=>{
        memoryDisplay.textContent = "Now type it!";
    },1500);
}
newMemory();

function checkMemory(){
    if(memoryInput.value === memoryNumber){
        memoryResult.textContent = "Correct! Great memory.";
    }else{
        memoryResult.textContent = "Wrong. Number was " + memoryNumber;
    }
    memoryInput.value="";
    newMemory();
}

/* 2 EQUATION BALANCER */

let correctBalance;

function newBalance(){
    let a = Math.floor(Math.random()*20);
    let b = Math.floor(Math.random()*20);
    let c = Math.floor(Math.random()*20);

    correctBalance = a + b - c;

    balanceQuestion.textContent = `${a} + ${b} - ${c} = ?`;
}
newBalance();

function checkBalance(){
    if(Number(balanceInput.value)===correctBalance){
        balanceResult.textContent="Balanced perfectly ✔️";
    }else{
        balanceResult.textContent="Not balanced ❌ Correct answer: " + correctBalance;
    }
    balanceInput.value="";
    newBalance();
}

/* 3 PRIME OR COMPOSITE */

let primeNum;

function newPrime(){
    primeNum = Math.floor(Math.random()*98)+2;
    primeNumber.textContent = primeNum;
}
newPrime();

function isPrime(n){
    if(n<2) return false;
    for(let i=2;i<=Math.sqrt(n);i++){
        if(n%i===0) return false;
    }
    return true;
}

function answerPrime(choice){
    let prime = isPrime(primeNum);
    if(choice===prime){
        primeResult.textContent="Correct!";
    }else{
        primeResult.textContent="Wrong. It is " + (prime?"Prime":"Composite");
    }
    newPrime();
}

/* 4 FRACTION MATCHER */

let correctFraction;

function newFraction(){
    let a = Math.floor(Math.random()*9)+1;
    let b = Math.floor(Math.random()*9)+1;

    correctFraction=a+"/"+b;

    fractionQuestion.textContent=`Which equals ${a*b}/${b*b}?`;

    fractionOptions.innerHTML="";

    let options = [
        correctFraction,
        `${a+1}/${b}`,
        `${a}/${b+1}`,
        `${a+2}/${b+2}`
    ];

    options.sort(()=>Math.random()-0.5);

    options.forEach(op=>{
        let btn=document.createElement("button");
        btn.textContent=op;
        btn.onclick=()=>checkFraction(op);
        fractionOptions.appendChild(btn);
    });
}
newFraction();

function checkFraction(selected){
    if(selected===correctFraction){
        fractionResult.textContent="Perfect Match ✔️";
    }else{
        fractionResult.textContent="Incorrect ❌ Correct: " + correctFraction;
    }
    newFraction();
}

/* 5 SPEED MATH */

let speedAnswer;
let score=0;

function newSpeed(){
    let a=Math.floor(Math.random()*20);
    let b=Math.floor(Math.random()*20);
    speedAnswer=a+b;
    speedQuestion.textContent=`${a} + ${b} = ?`;
}
newSpeed();

function checkSpeed(){
    if(Number(speedInput.value)===speedAnswer){
        score++;
    }else{
        score--;
    }
    speedScore.textContent="Score: "+score;
    speedInput.value="";
    newSpeed();
}

/* 6 PATTERN GAME */

let nextPattern;

function newPattern(){
    let start = Math.floor(Math.random()*10);
    let step = Math.floor(Math.random()*5)+1;

    let seq = [
        start,
        start+step,
        start+2*step,
        start+3*step
    ];

    nextPattern=start+4*step;

    patternQuestion.textContent = seq.join(", ") + ", ?";
}
newPattern();

function checkPattern(){
    if(Number(patternInput.value)===nextPattern){
        patternResult.textContent="Correct prediction!";
    }else{
        patternResult.textContent="Wrong. Correct answer is "+nextPattern;
    }
    patternInput.value="";
    newPattern();
}
