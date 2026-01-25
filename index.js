const user = localStorage.getItem("currentUser");
if(user) {
    document.getElementById("welcome").innerText = "HI, "+user+" IMPROVE YOUR MATH PERFOMANCE HERE!";
} else {
    document.getElementById("welcome").innerText = "WELCOME! IMPROVE YOUR MATH SKILLS HERE!";
}

const users = JSON.parse(localStorage.getItem("users"))||{};
const currentUser = users[user];

document.getElementById("welcome").innerText = "HI, "+user+" IMPROVE YOUR MATH PERFOMANCE HERE!";

function logout(){
    localStorage.removeItem("currentUser");
    window.location.href="index.html";
}