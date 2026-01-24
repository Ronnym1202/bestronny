function showSection(id){

    // hide all topic sections
    const sections = document.querySelectorAll(".topic-section");
    sections.forEach(section => {
        section.classList.remove("active");
    });

    // show selected one
    const current = document.getElementById(id);
    current.classList.add("active");

    // scroll main content to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // highlight selected sidebar item
    const items = document.querySelectorAll("#sidebar li");
    items.forEach(li => li.classList.remove("active-topic"));

    const clicked = document.querySelector(`#sidebar li[onclick="showSection('${id}')"]`);
    if(clicked){
        clicked.classList.add("active-topic");
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    showSection("trigonometric");
});


