console.log("✅ shared.js LOADED");
const MathProgress = {
    getProgress: function() {
        let progress = JSON.parse(localStorage.getItem('mathProgress'));
        if (!progress) {
            progress = {
                totalSolved: 0,
                correct: 0,
                accuracy: 0,
                topics: {
                    algebra: 0,
                    geometry: 0,
                    calculus: 0,
                    trigonometry: 0,
                    matrices: 0,
                    vectors: 0,
                    statistics: 0
                },
                badges: ['Math Learner'],
                activity: ['Started learning math with Ronny Best'],
                lastUpdated: new Date().toISOString()
            };
            this.saveProgress(progress);
        }
        return progress;
    },

    // Save progress to localStorage
    saveProgress: function(progress) {
        progress.lastUpdated = new Date().toISOString();
        localStorage.setItem('mathProgress', JSON.stringify(progress));
    },

    // Update when problem is solved
    recordProblemSolved: function(topic, isCorrect, problemDescription) {
        let progress = this.getProgress();
        
        // Update basic stats
        progress.totalSolved++;
        if (isCorrect) progress.correct++;
        progress.accuracy = Math.round((progress.correct / progress.totalSolved) * 100);
        
        // Update topic progress (cap at 100)
        if (topic && progress.topics[topic] !== undefined) {
            progress.topics[topic] = Math.min(progress.topics[topic] + (isCorrect ? 3 : 1), 100);
        }
        
        // Add to activity log
        const activityText = `${isCorrect ? '✓' : '✗'} Solved ${topic} problem: ${problemDescription}`;
        progress.activity.push(activityText);
        
        // Limit activity log to last 50 items
        if (progress.activity.length > 50) {
            progress.activity = progress.activity.slice(-50);
        }
        
        // Award badges based on achievements
        this.checkBadges(progress);
        
        this.saveProgress(progress);
        return progress;
    },

    // Update when topic is viewed
    recordTopicViewed: function(topicName) {
        let progress = this.getProgress();
        
        const activityText = `📖 Viewed topic: ${topicName}`;
        progress.activity.push(activityText);
        
        // Limit activity log
        if (progress.activity.length > 50) {
            progress.activity = progress.activity.slice(-50);
        }
        
        this.saveProgress(progress);
        return progress;
    },

    // Update when game is played
    recordGamePlayed: function(gameName, score, isWin) {
        let progress = this.getProgress();
        
        const activityText = `🎮 Played ${gameName}: ${isWin ? 'Won' : 'Played'} with score ${score}`;
        progress.activity.push(activityText);
        
        // Add to games played count
        progress.gamesPlayed = (progress.gamesPlayed || 0) + 1;
        if (isWin) progress.gamesWon = (progress.gamesWon || 0) + 1;
        
        this.saveProgress(progress);
        return progress;
    },

    // Check and award badges
    checkBadges: function(progress) {
        const badges = progress.badges;
        
        // Problem Solver
        if (progress.totalSolved >= 10 && !badges.includes('Problem Solver')) {
            badges.push('Problem Solver');
            progress.activity.push('🏅 Earned badge: Problem Solver (10+ problems solved)');
        }
        
        // Accuracy Star
        if (progress.accuracy >= 80 && !badges.includes('Accuracy Star')) {
            badges.push('Accuracy Star');
            progress.activity.push('🏅 Earned badge: Accuracy Star (80%+ accuracy)');
        }
        
        // Topic Master badges
        const topics = progress.topics;
        if (topics.algebra >= 90 && !badges.includes('Algebra Expert')) {
            badges.push('Algebra Expert');
            progress.activity.push('🏅 Earned badge: Algebra Expert');
        }
        if (topics.calculus >= 90 && !badges.includes('Calculus Master')) {
            badges.push('Calculus Master');
            progress.activity.push('🏅 Earned badge: Calculus Master');
        }
        if (topics.geometry >= 90 && !badges.includes('Geometry Pro')) {
            badges.push('Geometry Pro');
            progress.activity.push('🏅 Earned badge: Geometry Pro');
        }
        
        // Practice Champion
        if (progress.totalSolved >= 50 && !badges.includes('Practice Champion')) {
            badges.push('Practice Champion');
            progress.activity.push('🏅 Earned badge: Practice Champion (50+ problems)');
        }
    },

    // Reset all progress
    resetProgress: function() {
        localStorage.removeItem('mathProgress');
        return this.getProgress(); // Returns fresh progress
    },

    // Get stats for display
    getStats: function() {
        const progress = this.getProgress();
        return {
            totalSolved: progress.totalSolved,
            correct: progress.correct,
            accuracy: progress.accuracy,
            topics: progress.topics,
            badges: progress.badges,
            activity: progress.activity.slice(-10).reverse(), // Last 10 activities
            gamesPlayed: progress.gamesPlayed || 0,
            gamesWon: progress.gamesWon || 0
        };
    }
};

// Make it available globally
window.MathProgress = MathProgress;