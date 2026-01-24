const user = localStorage.getItem("currentUser");
if(!user) window.location.href="index.html";

const users = JSON.parse(localStorage.getItem("users"))||{};
const currentUser = users[user];

document.getElementById("welcome").innerText = "HI, "+user+" IMPROVE YOUR MATH PERFOMANCE HERE!";

function logout(){
    localStorage.removeItem("currentUser");
    window.location.href="index.html";
}