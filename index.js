document.addEventListener("DOMContentLoaded", () => {
    // ===== WELCOME MESSAGE =====
    const welcome = document.getElementById("welcome");
    if (welcome) {
        const user = localStorage.getItem("currentUser");
        
        if (user && user !== "null" && user !== "undefined") {
            welcome.innerText = "WELCOME BACK! IMPROVE YOUR MATH PERFORMANCE HERE.";
        } else {
            welcome.innerText = "WELCOME! IMPROVE YOUR MATH SKILLS HERE.";
        }
    }

    // ===== PROGRESS TRACKING INITIALIZATION =====
    try {
        if (typeof MathProgress !== 'undefined') {
            const progress = MathProgress.getProgress();
            
            // Log homepage visit with enhanced tracking
            MathProgress.recordTopicViewed('Mathematics Homepage');
            
            // Update stats display if exists
            updateStatsDisplay(progress);
            
            console.log(`📊 Welcome back! You've solved ${progress.totalSolved} problems with ${progress.accuracy}% accuracy`);
            
            // Show welcome back message with stats for logged-in users
            const user = localStorage.getItem("currentUser");
            if (user && user !== "null" && user !== "undefined" && progress.totalSolved > 0) {
                showPersonalizedMessage(user, progress);
            }
        } else {
            console.log("MathProgress not available yet");
        }
    } catch (error) {
        console.log("Progress system error:", error);
    }

    // ===== INITIALIZE ALL INTERACTIVE FEATURES =====
    setupMathInteractivity();
    setupCardHoverEffects();
    setupMobileMenu();
    setupSmoothScroll();
});

// ===== LOGOUT FUNCTION =====
function logout() {
    localStorage.removeItem("currentUser");
    sessionStorage.clear();
    window.location.href = "index.html";
}

// ===== PERSONALIZED MESSAGE =====
function showPersonalizedMessage(user, progress) {
    const header = document.querySelector('.header-content');
    if (header) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'personalized-message';
        messageDiv.style.cssText = `
            background: rgba(255, 217, 102, 0.15);
            border: 1px solid #ffd966;
            border-radius: 50px;
            padding: 8px 20px;
            margin-top: 15px;
            display: inline-block;
            color: #ffd966;
            font-weight: 500;
            backdrop-filter: blur(5px);
        `;
        
        // Get achievement message based on progress
        let achievementMsg = '';
        if (progress.totalSolved >= 50) {
            achievementMsg = '🏆 Math Champion!';
        } else if (progress.totalSolved >= 20) {
            achievementMsg = '⭐ Rising Star!';
        } else if (progress.totalSolved >= 10) {
            achievementMsg = '📚 Getting Started!';
        } else {
            achievementMsg = '🎯 Keep Going!';
        }
        
        messageDiv.innerHTML = `
            <span>👋 Welcome back, ${user}! </span>
            <span style="margin: 0 10px;">|</span>
            <span>${progress.totalSolved} problems solved</span>
            <span style="margin: 0 10px;">|</span>
            <span>${progress.accuracy}% accuracy</span>
            <span style="margin-left: 10px;">${achievementMsg}</span>
        `;
        
        header.appendChild(messageDiv);
    }
}

// ===== UPDATE STATS DISPLAY =====
function updateStatsDisplay(progress) {
    // Update hero stats if they exist
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 3) {
        // Update examples count
        statNumbers[0].textContent = progress.totalSolved > 50 ? '100+' : '50+';
        
        // Update accuracy
        statNumbers[2].textContent = '24/7'; // Keep this static
    }
}

// ===== MAIN INTERACTIVE FEATURES =====
function setupMathInteractivity() {
    // ===== SHOW/HIDE ANSWERS FOR PRACTICE PROBLEMS =====
    const answerHints = document.querySelectorAll('.answer-hint, .solution');
    answerHints.forEach(hint => {
        // Check if already processed
        if (hint.dataset.processed === 'true') return;
        hint.dataset.processed = 'true';
        
        hint.style.display = 'none'; // Hide answers initially
        
        // Find parent problem container
        const problem = hint.closest('.problem-item, li, .practice-problems li');
        if (problem) {
            // Check if button already exists
            if (problem.querySelector('.show-answer-btn')) return;
            
            const showBtn = document.createElement('button');
            showBtn.textContent = 'Show Answer';
            showBtn.className = 'show-answer-btn';
            showBtn.style.cssText = `
                background: #004080;
                color: white;
                border: none;
                padding: 4px 12px;
                border-radius: 20px;
                margin-left: 10px;
                cursor: pointer;
                font-size: 0.8em;
                font-weight: 500;
                transition: all 0.3s ease;
            `;
            
            showBtn.addEventListener('mouseenter', () => {
                showBtn.style.background = '#002856';
                showBtn.style.transform = 'scale(1.05)';
            });
            
            showBtn.addEventListener('mouseleave', () => {
                showBtn.style.background = showBtn.style.background === '#44aa44' ? '#44aa44' : '#004080';
                showBtn.style.transform = 'scale(1)';
            });
            
            showBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (hint.style.display === 'none' || hint.style.display === '') {
                    hint.style.display = 'inline-block';
                    this.textContent = 'Hide Answer';
                    this.style.background = '#44aa44';
                    
                    // Track answer reveal
                    trackActivity('Revealed answer');
                } else {
                    hint.style.display = 'none';
                    this.textContent = 'Show Answer';
                    this.style.background = '#004080';
                }
            });
            
            problem.appendChild(showBtn);
        }
    });

    // ===== COPY FORMULA FEATURE =====
    const formulas = document.querySelectorAll('.math-formula p, .formula, .preview-solution');
    formulas.forEach(formula => {
        if (formula.dataset.copyEnabled === 'true') return;
        formula.dataset.copyEnabled = 'true';
        
        formula.style.cursor = 'pointer';
        formula.title = 'Click to copy';
        formula.style.position = 'relative';
        
        // Add copy icon indicator
        const copyIcon = document.createElement('span');
        copyIcon.innerHTML = '📋';
        copyIcon.style.cssText = `
            position: absolute;
            right: -25px;
            top: 50%;
            transform: translateY(-50%);
            opacity: 0.3;
            font-size: 0.9em;
            transition: opacity 0.3s;
        `;
        formula.appendChild(copyIcon);
        
        formula.addEventListener('mouseenter', () => {
            copyIcon.style.opacity = '1';
        });
        
        formula.addEventListener('mouseleave', () => {
            copyIcon.style.opacity = '0.3';
        });
        
        formula.addEventListener('click', async () => {
            const text = formula.innerText.replace('📋', '').trim();
            
            try {
                await navigator.clipboard.writeText(text);
                showCopyTooltip(formula);
                trackActivity('Copied formula');
            } catch (err) {
                console.log('Copy failed:', err);
            }
        });
    });

    // ===== TRACK LESSON VIEWS =====
    const lessonCards = document.querySelectorAll('.topic-card, .method-card, .example-card, .featured-lesson');
    lessonCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
            
            // Find lesson title
            let lessonTitle = 'Math Lesson';
            const titleElement = this.querySelector('h3, h4, .card-header h3');
            if (titleElement) {
                lessonTitle = titleElement.innerText;
            }
            
            trackActivity(`Viewed: ${lessonTitle}`);
        });
    });

    // ===== INTERACTIVE PRACTICE PROBLEMS =====
    const practiceProblems = document.querySelectorAll('.problem-item, .practice-problems li');
    practiceProblems.forEach((problem, index) => {
        // Skip if already has input
        if (problem.querySelector('.practice-input')) return;
        
        const solution = problem.querySelector('.solution, .answer-hint');
        if (!solution) return;
        
        const inputContainer = document.createElement('div');
        inputContainer.className = 'practice-input-container';
        inputContainer.style.cssText = `
            margin-top: 12px;
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
        `;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Your answer...';
        input.className = 'practice-input';
        input.style.cssText = `
            padding: 8px 12px;
            border: 2px solid #e0e7ff;
            border-radius: 8px;
            font-size: 0.95rem;
            width: 150px;
            transition: border-color 0.3s;
        `;
        
        input.addEventListener('focus', () => {
            input.style.borderColor = '#004080';
            input.style.outline = 'none';
        });
        
        input.addEventListener('blur', () => {
            input.style.borderColor = '#e0e7ff';
        });
        
        const checkBtn = document.createElement('button');
        checkBtn.textContent = 'Check';
        checkBtn.className = 'check-answer-btn';
        checkBtn.style.cssText = `
            background: #004080;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s;
        `;
        
        checkBtn.addEventListener('mouseenter', () => {
            checkBtn.style.background = '#002856';
            checkBtn.style.transform = 'translateY(-2px)';
        });
        
        checkBtn.addEventListener('mouseleave', () => {
            checkBtn.style.background = '#004080';
            checkBtn.style.transform = 'translateY(0)';
        });
        
        const result = document.createElement('span');
        result.style.fontWeight = '600';
        result.style.marginLeft = '5px';
        
        checkBtn.addEventListener('click', () => {
            const answer = input.value.trim();
            const correctAnswer = solution.textContent
                .replace('(Answer: ', '')
                .replace(')', '')
                .replace('Answer:', '')
                .trim();
            
            // Simple answer comparison
            const isCorrect = answer === correctAnswer || 
                            answer.replace(/\s+/g, '') === correctAnswer.replace(/\s+/g, '');
            
            if (isCorrect) {
                result.innerHTML = '✅ Correct!';
                result.style.color = '#44aa44';
                input.style.borderColor = '#44aa44';
                
                // Track correct answer
                trackActivity('Correct answer', true);
                
                // Add celebration effect
                problem.style.animation = 'correctPulse 0.5s ease';
                setTimeout(() => {
                    problem.style.animation = '';
                }, 500);
            } else {
                result.innerHTML = '❌ Try again';
                result.style.color = '#ff4444';
                input.style.borderColor = '#ff4444';
                
                // Track attempt
                trackActivity('Incorrect attempt', false);
            }
        });
        
        inputContainer.appendChild(input);
        inputContainer.appendChild(checkBtn);
        inputContainer.appendChild(result);
        
        // Add animation keyframes if not exists
        if (!document.querySelector('#correctPulse')) {
            const style = document.createElement('style');
            style.id = 'correctPulse';
            style.textContent = `
                @keyframes correctPulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.02); background: rgba(68, 170, 68, 0.1); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
        
        problem.appendChild(inputContainer);
    });
}

// ===== HELPER: SHOW COPY TOOLTIP =====
function showCopyTooltip(element) {
    const tooltip = document.createElement('span');
    tooltip.textContent = '✓ Copied!';
    tooltip.style.cssText = `
        position: absolute;
        background: #44aa44;
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.8rem;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        animation: tooltipFade 1.5s forwards;
        white-space: nowrap;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.remove();
    }, 1500);
}

// ===== HELPER: TRACK ACTIVITY =====
function trackActivity(action, isCorrect = null) {
    try {
        if (typeof MathProgress !== 'undefined') {
            if (isCorrect !== null) {
                MathProgress.recordProblemSolved('general', isCorrect, action);
            } else {
                MathProgress.recordTopicViewed(action);
            }
        }
    } catch (e) {
        console.log('Tracking error:', e);
    }
}

// ===== CARD HOVER EFFECTS =====
function setupCardHoverEffects() {
    const cards = document.querySelectorAll('.topic-card, .method-card, .feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ===== MOBILE MENU HANDLING =====
function setupMobileMenu() {
    const nav = document.querySelector('.main-nav');
    const navList = document.querySelector('.nav-list');
    
    if (window.innerWidth <= 768 && nav && !document.querySelector('.menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '☰ Menu';
        menuToggle.style.cssText = `
            width: 100%;
            padding: 15px;
            background: #0a1a2b;
            color: white;
            border: none;
            font-size: 1.1rem;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        
        menuToggle.addEventListener('click', () => {
            if (navList.style.display === 'none' || !navList.style.display) {
                navList.style.display = 'flex';
                menuToggle.innerHTML = '✕ Close';
            } else {
                navList.style.display = 'none';
                menuToggle.innerHTML = '☰ Menu';
            }
        });
        
        nav.insertBefore(menuToggle, navList);
        navList.style.display = 'none';
    }
    
    // Reset on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            const toggle = document.querySelector('.menu-toggle');
            if (toggle) toggle.remove();
            if (navList) navList.style.display = 'flex';
        }
    });
}

// ===== SMOOTH SCROLL =====
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== OPTIONAL: DISPLAY QUICK STATS IN FOOTER =====
function displayQuickStats() {
    try {
        if (typeof MathProgress !== 'undefined') {
            const stats = MathProgress.getStats();
            const footer = document.querySelector('.site-footer');
            
            if (footer && !document.querySelector('.footer-stats')) {
                const statsDiv = document.createElement('div');
                statsDiv.className = 'footer-stats';
                statsDiv.style.cssText = `
                    background: rgba(255,255,255,0.05);
                    padding: 15px;
                    border-radius: 12px;
                    margin: 20px auto;
                    max-width: 600px;
                    text-align: center;
                    color: #b0c4de;
                `;
                
                statsDiv.innerHTML = `
                    <strong style="color: #ffd966;">Your Progress:</strong>
                    <span style="margin: 0 15px;">📊 ${stats.totalSolved} problems solved</span>
                    <span style="margin: 0 15px;">🎯 ${stats.accuracy}% accuracy</span>
                    <span style="margin: 0 15px;">🏆 ${stats.badges.length} badges</span>
                `;
                
                footer.insertBefore(statsDiv, footer.firstChild);
            }
        }
    } catch (e) {
        console.log('Could not display stats:', e);
    }
}