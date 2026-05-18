function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        const items = document.querySelectorAll("#sidebar li");
        items.forEach(li => li.classList.remove("active-topic"));
        const clicked = document.querySelector(`#sidebar li[onclick="scrollToSection('${id}')"]`);
        if (clicked) {
            clicked.classList.add("active-topic");
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".topic-section");
    sections.forEach(section => {
        section.style.display = 'block';
    });
    
    const firstItem = document.querySelector("#sidebar li");
    if (firstItem) {
        firstItem.classList.add("active-topic");
    }
    
    if (typeof MathProgress !== 'undefined') {
        MathProgress.recordTopicViewed('Main Mathematics Page');
    }
});