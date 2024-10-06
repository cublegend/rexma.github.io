// script.js
const nameText = document.getElementById("home");
const firstName = ["Jacob", "Rex", "浩轩", "Haoxuan", "浩軒", "🍉", "MusicLover", "GameLover"];
const lastName = ["马", "Ma", "🐴", "🐎", "馬", "GameDesigner", "Engineer", "Designer"];
let isHovering = false; // Track if the hover event has already been triggered

document.addEventListener("DOMContentLoaded", () => {
    // randomly switch between the names
    // first name
    setInterval(() => {
        if (!isHovering) {
            // keep the last name as the same
            // split the name string into first name and last name
            let name = nameText.innerHTML.split(", ");
            nameText.innerHTML = firstName[Math.floor(Math.random() * firstName.length)];
            nameText.innerHTML += ", " + name[1];
        }
    }, Math.random() * 500 + 600);
    // last name
    setInterval(() => {
        if (!isHovering) {
            // keep the first name as the same
            // split the name string into first name and last name
            let name = nameText.innerHTML.split(", ");
            nameText.innerHTML = name[0];
            nameText.innerHTML += ", " + lastName[Math.floor(Math.random() * lastName.length)];
        }
    }, Math.random() * 700 + 400);

});

nameText.addEventListener("mouseover", () => {
    isHovering = true;

});

nameText.addEventListener("mouseleave", () => {
    isHovering = false; 
});

// Get the elements for toggling
const menuToggle = document.getElementById("menu-toggle");
const menuExit = document.getElementById("menu-exit");
const navMenu = document.getElementById("nav-menu");

// Event listener to toggle the menu visibility on smaller screens
menuToggle.addEventListener("click", () => {
    // Toggle the "active" class on the nav menu
    navMenu.classList.toggle("active");
});

menuExit.addEventListener("click", () => {
    // Toggle the "active" class on the nav menu
    navMenu.classList.toggle("active");
});

// Function to show the section based on hash value
function showSectionFromHash() {
    // Hide all sections initially
    const sections = document.querySelectorAll('.projects-container');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    // also hide center-text
    const centerText = document.getElementById('home');
    centerText.classList.remove('active');

    // Get the current hash value (e.g., #game-section)
    const hash = window.location.hash;

    // If there's a hash value, show the corresponding section
    if (hash) {
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            targetSection.classList.add('active'); // Show the section
        }
    } else {
        // If no hash is present, show the home section by default
        const homeSection = document.getElementById('home');
        if (homeSection) {
            homeSection.classList.add('active');
        }
    }
}

// Run the function on initial page load
showSectionFromHash();

// Optional: Add an event listener to handle hash changes (e.g., back/forward navigation)
window.addEventListener('hashchange', showSectionFromHash);
