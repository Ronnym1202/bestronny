const user = localStorage.getItem("currentUser");
if(!user) {
    window.location.href = "login.html";
}
// --------- PROFILE TAB HANDLING ---------
document.querySelectorAll(".tab").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
    };
});

// --------- PROFILE DATA ---------
let profile = JSON.parse(localStorage.getItem("profile")) || {
    name: "Student Name",
    email: "example@email.com",
    avatar: "https://i.postimg.cc/SsWn1p7h/user.png",
    joined: new Date().toDateString(),
    solved: 0,
    correct: 0,
    accuracy: 0,
    algebra: 0,
    geometry: 0,
    calculus: 0,
    badges: [],
    activities: [],
    topics: {}
};

// --------- LOAD PROFILE ---------
function loadProfile() {
    // Get fresh data from localStorage
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    if (savedProfile) {
        profile = savedProfile;
    }
    
    document.getElementById("displayName").textContent = profile.name;
    document.getElementById("displayEmail").textContent = profile.email;
    document.getElementById("avatar").src = profile.avatar;

    document.getElementById("joinDate").textContent = profile.joined;
    document.getElementById("tasksSolved").textContent = (profile.solved || 0) + " tasks";
    document.getElementById("accuracy").textContent = (profile.accuracy || 0) + "%";

    document.getElementById("algProg").style.width = (profile.algebra || 0) + "%";
    document.getElementById("algProg").textContent = (profile.algebra || 0) + "%";
    
    document.getElementById("geoProg").style.width = (profile.geometry || 0) + "%";
    document.getElementById("geoProg").textContent = (profile.geometry || 0) + "%";
    
    document.getElementById("calProg").style.width = (profile.calculus || 0) + "%";
    document.getElementById("calProg").textContent = (profile.calculus || 0) + "%";

    // Recent activity - FIXED TO USE ACTIVITIES FROM TASKS.JS
    let log = document.getElementById("activityList");
    log.innerHTML = "";
    
    if (profile.activities && profile.activities.length > 0) {
        // Show last 5 activities from tasks
        const recentActivities = profile.activities.slice(-5).reverse();
        recentActivities.forEach(activity => {
            let li = document.createElement("li");
            li.textContent = activity;
            log.appendChild(li);
        });
    } else {
        // Default activities if none exist
        for (let i = 0; i < 3; i++) {
            let li = document.createElement("li");
            li.textContent = ["Joined Ronny Best", "Started practicing math", "Ready to solve problems!"][i];
            log.appendChild(li);
        }
    }

    // Badges - FIXED TO USE BADGES FROM TASKS.JS
    let badgeList = document.getElementById("badgeList");
    badgeList.innerHTML = "";
    
    if (profile.badges && profile.badges.length > 0) {
        profile.badges.forEach(b => {
            let li = document.createElement("li");
            li.textContent = b;
            badgeList.appendChild(li);
        });
    } else {
        let li = document.createElement("li");
        li.textContent = "No badges earned yet";
        badgeList.appendChild(li);
    }

    // Settings
    nameInput.value = profile.name;
    emailInput.value = profile.email;
    avatarInput.value = profile.avatar;
}

// Make loadProfile available globally for tasks.js
window.loadProfile = loadProfile;

// Load profile on page load
loadProfile();

// --------- EDIT PROFILE ---------
editBtn.onclick = () => {
    document.querySelector('[data-tab="settings"]').click();
};

// --------- SAVE SETTINGS ---------
saveBtn.onclick = () => {
    // Update profile with new values
    profile.name = nameInput.value.trim() || "Student Name";
    profile.email = emailInput.value.trim() || "example@email.com";
    profile.avatar = avatarInput.value.trim() || "https://i.postimg.cc/SsWn1p7h/user.png";
    
    // Validate avatar URL
    if (profile.avatar) {
        if (!profile.avatar.startsWith('http')) {
            profile.avatar = "https://i.postimg.cc/SsWn1p7h/user.png";
            avatarInput.value = profile.avatar;
            alert("Please enter a valid URL starting with http:// or https://");
        }
    }
    
    // Save to localStorage
    localStorage.setItem("profile", JSON.stringify(profile));
    
    // Reload profile to show updates
    loadProfile();
    
    // Add activity
    if (!profile.activities) profile.activities = [];
    profile.activities.push("Updated profile - " + new Date().toLocaleTimeString());
    
    // Save again with activity
    localStorage.setItem("profile", JSON.stringify(profile));
    
    alert("Profile saved successfully!");
};

// --------- RESET PROFILE ---------
document.getElementById("resetBtn").onclick = () => {
    if (confirm("Are you sure you want to reset your profile? All progress will be lost!")) {
        // Reset to default values but keep basic info
        const defaultProfile = {
            name: profile.name || "Student Name",
            email: profile.email || "example@email.com",
            avatar: profile.avatar || "https://i.postimg.cc/SsWn1p7h/user.png",
            joined: new Date().toDateString(),
            solved: 0,
            correct: 0,
            accuracy: 0,
            algebra: 0,
            geometry: 0,
            calculus: 0,
            badges: [],
            activities: ["Profile reset - " + new Date().toLocaleString()],
            topics: {}
        };
        
        localStorage.setItem("profile", JSON.stringify(defaultProfile));
        profile = defaultProfile;
        loadProfile();
        alert("Profile reset successfully!");
    }
};

// --------- DARK MODE ---------
darkModeToggle.onchange = () => {
    document.body.classList.toggle("dark");
    // Save preference
    profile.darkMode = darkModeToggle.checked;
    localStorage.setItem("profile", JSON.stringify(profile));
};

// Load dark mode preference
if (profile.darkMode) {
    darkModeToggle.checked = true;
    document.body.classList.add("dark");
}

// --------- INITIALIZE ACTIVITIES IF EMPTY ---------
if (!profile.activities || profile.activities.length === 0) {
    profile.activities = [
        "Joined Ronny Best - " + new Date().toLocaleDateString(),
        "Started practicing mathematics",
        "Ready to solve your first problem!"
    ];
    localStorage.setItem("profile", JSON.stringify(profile));
}