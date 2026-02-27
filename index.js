document.addEventListener("DOMContentLoaded", () => {
    // Welcome message
    const welcome = document.getElementById("welcome");
    if (welcome) {
        const user = localStorage.getItem("currentUser");
        
        if (user && user !== "null" && user !== "undefined") {
            welcome.innerText = "WELCOME BACK! IMPROVE YOUR MATH PERFORMANCE HERE.";
        } else {
            welcome.innerText = "WELCOME! IMPROVE YOUR MATH SKILLS HERE.";
        }
    }

    // Initialize progress tracking - USING YOUR EXISTING MathProgress
    try {
        if (typeof MathProgress !== 'undefined') {
            const progress = MathProgress.getProgress();
            
            // Log homepage visit
            MathProgress.recordTopicViewed('Mathematics Homepage');
            
            console.log(`📊 Welcome back! You've solved ${progress.totalSolved} problems with ${progress.accuracy}% accuracy`);
        } else {
            console.log("MathProgress not available yet");
        }
    } catch (error) {
        console.log("Progress system error:", error);
    }

    // Add interactive features to math examples
    setupMathInteractivity();
});

// Logout function
function logout() {
    localStorage.removeItem("currentUser");
    // Clear any session data
    sessionStorage.clear();
    window.location.href = "index.html";
}

// Interactive features for math content
function setupMathInteractivity() {
    // Show/hide answers for practice problems
    const answerHints = document.querySelectorAll('.answer-hint');
    answerHints.forEach(hint => {
        hint.style.display = 'none'; // Hide answers initially
        
        // Create show answer button
        const problem = hint.closest('li');
        if (problem) {
            const showBtn = document.createElement('button');
            showBtn.textContent = 'Show Answer';
            showBtn.className = 'show-answer-btn';
            showBtn.style.cssText = `
                background: #0066cc;
                color: white;
                border: none;
                padding: 3px 10px;
                border-radius: 3px;
                margin-left: 10px;
                cursor: pointer;
                font-size: 0.8em;
                transition: background 0.3s;
            `;
            
            showBtn.addEventListener('click', function() {
                if (hint.style.display === 'none') {
                    hint.style.display = 'inline';
                    this.textContent = 'Hide Answer';
                    this.style.background = '#44aa44';
                    
                    // Track answer reveal in progress
                    try {
                        if (typeof MathProgress !== 'undefined') {
                            MathProgress.recordTopicViewed('Checked answer');
                        }
                    } catch (e) {}
                } else {
                    hint.style.display = 'none';
                    this.textContent = 'Show Answer';
                    this.style.background = '#0066cc';
                }
            });
            
            problem.appendChild(showBtn);
        }
    });

    // Add copy formula feature
    const formulas = document.querySelectorAll('.math-formula p');
    formulas.forEach(formula => {
        formula.style.cursor = 'pointer';
        formula.title = 'Click to copy formula';
        
        formula.addEventListener('click', () => {
            const text = formula.innerText;
            navigator.clipboard.writeText(text).then(() => {
                // Show temporary tooltip
                const tooltip = document.createElement('span');
                tooltip.textContent = '✓ Copied!';
                tooltip.style.cssText = `
                    position: absolute;
                    background: #44aa44;
                    color: white;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.8em;
                    margin-left: 10px;
                    animation: fadeOut 1.5s forwards;
                `;
                
                // Add animation
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes fadeOut {
                        0% { opacity: 1; }
                        70% { opacity: 1; }
                        100% { opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
                
                formula.style.position = 'relative';
                formula.appendChild(tooltip);
                
                setTimeout(() => {
                    tooltip.remove();
                    style.remove();
                }, 1500);
                
                // Track formula copy
                try {
                    if (typeof MathProgress !== 'undefined') {
                        MathProgress.recordTopicViewed('Copied formula: ' + text.substring(0, 30));
                    }
                } catch (e) {}
            });
        });
    });

    // Track which lessons user views
    const lessonCards = document.querySelectorAll('.lesson-card, .card, .featured-lesson a, .algebra-preview a, .trigonometry-preview a, .calculus-preview a');
    lessonCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't track if clicking directly on a link (let the link work normally)
            if (e.target.tagName === 'A') return;
            
            // Find the lesson title
            let lessonTitle = 'Math Lesson';
            if (this.querySelector('h3')) {
                lessonTitle = this.querySelector('h3').innerText;
            } else if (this.querySelector('h2')) {
                lessonTitle = this.querySelector('h2').innerText;
            } else if (this.innerText) {
                lessonTitle = this.innerText.substring(0, 50);
            }
            
            // Track lesson view using your MathProgress
            try {
                if (typeof MathProgress !== 'undefined') {
                    MathProgress.recordTopicViewed(lessonTitle);
                    console.log(`📚 Tracked: ${lessonTitle}`);
                }
            } catch (error) {
                console.log("Could not track activity:", error);
            }
        });
    });

    // Add practice problem solver
    const practiceProblems = document.querySelectorAll('.practice-problems li');
    practiceProblems.forEach((problem, index) => {
        // Add input field for user to try solving
        const inputContainer = document.createElement('div');
        inputContainer.style.marginTop = '10px';
        inputContainer.style.marginBottom = '15px';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter your answer...';
        input.style.cssText = `
            padding: 5px 10px;
            border: 2px solid #ddd;
            border-radius: 5px;
            margin-right: 10px;
            width: 150px;
        `;
        
        const checkBtn = document.createElement('button');
        checkBtn.textContent = 'Check';
        checkBtn.style.cssText = `
            background: #004080;
            color: white;
            border: none;
            padding: 5px 15px;
            border-radius: 5px;
            cursor: pointer;
        `;
        
        const result = document.createElement('span');
        result.style.marginLeft = '10px';
        result.style.fontWeight = 'bold';
        
        checkBtn.addEventListener('click', () => {
            const answer = input.value.trim();
            const hint = problem.querySelector('.answer-hint');
            let isCorrect = false;
            
            if (hint) {
                const correctAnswer = hint.innerText.replace('(Answer: ', '').replace(')', '');
                // Simple comparison (you might want more sophisticated checking)
                isCorrect = answer === correctAnswer || 
                           answer.replace(/\s+/g, '') === correctAnswer.replace(/\s+/g, '');
            }
            
            if (isCorrect) {
                result.textContent = '✅ Correct!';
                result.style.color = '#44aa44';
                
                // Track correct answer
                try {
                    if (typeof MathProgress !== 'undefined') {
                        MathProgress.recordProblemSolved('algebra', true, problem.innerText.substring(0, 30));
                    }
                } catch (e) {}
            } else {
                result.textContent = '❌ Try again';
                result.style.color = '#ff4444';
                
                // Track attempt
                try {
                    if (typeof MathProgress !== 'undefined') {
                        MathProgress.recordProblemSolved('algebra', false, problem.innerText.substring(0, 30));
                    }
                } catch (e) {}
            }
        });
        
        inputContainer.appendChild(input);
        inputContainer.appendChild(checkBtn);
        inputContainer.appendChild(result);
        
        // Only add if not already added
        if (!problem.querySelector('input')) {
            problem.appendChild(inputContainer);
        }
    });
}

// Quick stats display (optional - can be added to footer)
function displayQuickStats() {
    try {
        if (typeof MathProgress !== 'undefined') {
            const stats = MathProgress.getStats();
            const statsDiv = document.createElement('div');
            statsDiv.style.cssText = `
                background: #f0f0f0;
                padding: 10px;
                border-radius: 5px;
                margin-top: 20px;
                font-size: 0.9em;
                text-align: center;
            `;
            statsDiv.innerHTML = `
                <strong>Your Progress:</strong> 
                ${stats.totalSolved} problems solved | 
                ${stats.accuracy}% accuracy | 
                ${stats.badges.length} badges earned
            `;
            
            // Add to footer if exists
            const footer = document.querySelector('footer');
            if (footer) {
                footer.insertBefore(statsDiv, footer.firstChild);
            }
        }
    } catch (e) {
        console.log('Could not display stats:', e);
    }
}

// Call this if you want to show stats
// displayQuickStats();