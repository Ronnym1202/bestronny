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
                activity: [],
                lastUpdated: new Date().toISOString()
            };
            this.saveProgress(progress);
        }
        return progress;
    },

    saveProgress: function(progress) {
        progress.lastUpdated = new Date().toISOString();
        localStorage.setItem('mathProgress', JSON.stringify(progress));
    },

    recordProblemSolved: function(topic, isCorrect, problemDescription) {
        let progress = this.getProgress();
        
        progress.totalSolved++;
        if (isCorrect) progress.correct++;
        progress.accuracy = Math.round((progress.correct / progress.totalSolved) * 100);
        
        if (topic && progress.topics[topic] !== undefined) {
            progress.topics[topic] = Math.min(progress.topics[topic] + (isCorrect ? 3 : 1), 100);
        }
        
        const activityText = `${isCorrect ? '✓' : '✗'} Solved ${topic} problem: ${problemDescription}`;
        progress.activity.push(activityText);
        
        if (progress.activity.length > 50) {
            progress.activity = progress.activity.slice(-50);
        }
        
        this.checkBadges(progress);
        
        this.saveProgress(progress);
        return progress;
    },

    recordTopicViewed: function(topicName) {
        let progress = this.getProgress();
        
        const activityText = `📖 Viewed topic: ${topicName}`;
        progress.activity.push(activityText);
        
        if (progress.activity.length > 50) {
            progress.activity = progress.activity.slice(-50);
        }
        
        this.saveProgress(progress);
        return progress;
    },

    recordGamePlayed: function(gameName, score, isWin) {
        let progress = this.getProgress();
        
        const activityText = `🎮 Played ${gameName}: ${isWin ? 'Won' : 'Played'} with score ${score}`;
        progress.activity.push(activityText);
        
        progress.gamesPlayed = (progress.gamesPlayed || 0) + 1;
        if (isWin) progress.gamesWon = (progress.gamesWon || 0) + 1;
        
        this.saveProgress(progress);
        return progress;
    },

    checkBadges: function(progress) {
        const badges = progress.badges;
        
        if (progress.totalSolved >= 10 && !badges.includes('Problem Solver')) {
            badges.push('Problem Solver');
            progress.activity.push('🏅 Earned badge: Problem Solver (10+ problems solved)');
        }
        
        if (progress.accuracy >= 80 && !badges.includes('Accuracy Star')) {
            badges.push('Accuracy Star');
            progress.activity.push('🏅 Earned badge: Accuracy Star (80%+ accuracy)');
        }
        
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
        
        if (progress.totalSolved >= 50 && !badges.includes('Practice Champion')) {
            badges.push('Practice Champion');
            progress.activity.push('🏅 Earned badge: Practice Champion (50+ problems)');
        }
    },

    resetProgress: function() {
        localStorage.removeItem('mathProgress');
        return this.getProgress();
    },

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
window.MathProgress = MathProgress;