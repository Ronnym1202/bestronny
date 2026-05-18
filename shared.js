console.log("✅ shared.js LOADED");

const MathProgress = {

    _defaultProgress() {
        return {
            totalSolved: 0,
            correct: 0,
            accuracy: 0,
            topics: {
                algebra:      0,
                geometry:     0,
                calculus:     0,
                trigonometry: 0,
                matrices:     0,
                vectors:      0,
                statistics:   0
            },
            badges:      ["Math Learner"],
            activity:    [],
            gamesPlayed: 0,
            gamesWon:    0,
            lastUpdated: new Date().toISOString()
        };
    },

    getProgress() {
        try {
            const raw = localStorage.getItem("mathProgress");
            if (!raw) {
                const p = this._defaultProgress();
                this.saveProgress(p);
                return p;
            }
            return JSON.parse(raw);
        } catch {
            return this._defaultProgress();
        }
    },

    saveProgress(progress) {
        progress.lastUpdated = new Date().toISOString();
        try {
            localStorage.setItem("mathProgress", JSON.stringify(progress));
        } catch {
            console.warn("MathProgress: localStorage unavailable.");
        }
    },

    recordProblemSolved(topic, isCorrect, problemDescription) {
        const progress = this.getProgress();

        progress.totalSolved++;
        if (isCorrect) progress.correct++;
        progress.accuracy = progress.totalSolved > 0
            ? Math.round((progress.correct / progress.totalSolved) * 100)
            : 0;

        if (topic && progress.topics[topic] !== undefined) {
            progress.topics[topic] = Math.min(
                progress.topics[topic] + (isCorrect ? 3 : 1),
                100
            );
        }

        const label = `${isCorrect ? "✓" : "✗"} ${topic}: ${(problemDescription || "").slice(0, 60)}`;
        progress.activity.push(label);
        if (progress.activity.length > 50) progress.activity = progress.activity.slice(-50);

        this._checkBadges(progress);
        this.saveProgress(progress);
        return progress;
    },

    recordTopicViewed(topicName) {
        const progress = this.getProgress();
        progress.activity.push(`📖 Viewed: ${topicName}`);
        if (progress.activity.length > 50) progress.activity = progress.activity.slice(-50);
        this.saveProgress(progress);
        return progress;
    },

    recordGamePlayed(gameName, score, isWin) {
        const progress = this.getProgress();
        progress.activity.push(`🎮 ${gameName}: ${isWin ? "Won" : "Played"} — score ${score}`);
        if (progress.activity.length > 50) progress.activity = progress.activity.slice(-50);
        progress.gamesPlayed = (progress.gamesPlayed || 0) + 1;
        if (isWin) progress.gamesWon = (progress.gamesWon || 0) + 1;
        this.saveProgress(progress);
        return progress;
    },

    _checkBadges(progress) {
        const { badges, totalSolved, accuracy, topics } = progress;

        const award = (name, note) => {
            if (!badges.includes(name)) {
                badges.push(name);
                progress.activity.push(`🏅 Badge earned: ${name} — ${note}`);
            }
        };

        if (totalSolved >= 10)  award("Problem Solver",     "10+ problems solved");
        if (totalSolved >= 50)  award("Practice Champion",  "50+ problems solved");
        if (totalSolved >= 100) award("Century Scholar",    "100+ problems solved");
        if (accuracy   >= 80)   award("Accuracy Star",      "80%+ accuracy");
        if (accuracy   >= 95)   award("Precision Master",   "95%+ accuracy");

        if (topics.algebra      >= 90) award("Algebra Expert",    "algebra mastery");
        if (topics.calculus     >= 90) award("Calculus Master",   "calculus mastery");
        if (topics.geometry     >= 90) award("Geometry Pro",      "geometry mastery");
        if (topics.trigonometry >= 90) award("Trig Wizard",       "trigonometry mastery");
    },

    resetProgress() {
        try { localStorage.removeItem("mathProgress"); } catch {}
        return this.getProgress();
    },

    getStats() {
        const p = this.getProgress();
        return {
            totalSolved:  p.totalSolved,
            correct:      p.correct,
            accuracy:     p.accuracy,
            topics:       p.topics,
            badges:       p.badges,
            activity:     (p.activity || []).slice(-10).reverse(),
            gamesPlayed:  p.gamesPlayed || 0,
            gamesWon:     p.gamesWon    || 0
        };
    }
};

window.MathProgress = MathProgress;