document.addEventListener("DOMContentLoaded", () => {
    const welcome = document.getElementById("welcome");
    const user = localStorage.getItem("currentUser");

    if (user && user !== "null" && user !== "undefined") {
        welcome.innerText =
        "WELCOME BACK! IMPROVE YOUR MATH PERFORMANCE HERE.";
    } else {
        welcome.innerText =
        "WELCOME! IMPROVE YOUR MATH SKILLS HERE.";
    }
});

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
