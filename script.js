// script.js
const nameText = document.getElementById("home");
const firstName = ["Rex", "浩轩", "Haoxuan", "浩軒", "🍉", "HX"];
const lastName = ["马", "Ma", "🐴", "🐎", "馬", "GameDesigner", "Engineer", "Designer", "Creator"];
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

// Store active timeouts for each element
const timeouts = new Map();

// Function to clear active timeouts for a specific element
function clearActiveTimeouts(element) {
    if (timeouts.has(element)) {
        timeouts.get(element).forEach((timeoutId) => clearTimeout(timeoutId));
        timeouts.delete(element);
    }
}

// Function to create the typewriter effect
function typeWriter(element, text, callback = null) {
    clearActiveTimeouts(element); // Clear any ongoing animations
    let i = 0;
    const activeTimeouts = []; // Track timeouts for this element

    function type() {
        if (i < text.length) {
            if (element.textContent == "_") {
                element.textContent = "";
            }
            element.textContent += text.charAt(i);
            i++;
            activeTimeouts.push(setTimeout(type, 5)); // Adjust typing speed (50ms per character)
        } else if (callback) {
            callback();
        }
    }

    timeouts.set(element, activeTimeouts); // Store timeouts for cleanup
    type();
}

// Function to delete text in a typewriter style
function deleteText(element, callback = null) {
    clearActiveTimeouts(element); // Clear any ongoing animations
    const text = element.textContent;
    let i = text.length;
    const activeTimeouts = []; // Track timeouts for this element

    function erase() {
        if (i > 0) {
            element.textContent = text.substring(0, i - 1);
            i--;
            if (i == 0) element.textContent = "_";
            activeTimeouts.push(setTimeout(erase, 1)); // Adjust deletion speed (30ms per character)
        } else if (callback) {
            callback();
        }
    }

    timeouts.set(element, activeTimeouts); // Store timeouts for cleanup
    erase();
}

// Add hover event listeners to project cards
document.querySelectorAll('.project-card').forEach((card) => {
    const paragraphs = card.querySelectorAll('p');

    card.addEventListener('mouseover', (event) => {
        if (card.contains(event.relatedTarget)) return;
        // Get hover text from data attributes
        const hoverRole = card.getAttribute('data-role-hover');
        const hoverDetails = card.getAttribute('data-details-hover');

        paragraphs.forEach((paragraph, index) => {
            // Clear existing animations and start new ones
            deleteText(paragraph, () => {
                if (index === 0) {
                    typeWriter(paragraph, hoverRole);
                } else if (index === 1) {
                    typeWriter(paragraph, hoverDetails);
                }
            });
        });
    });

    card.addEventListener('mouseleave', (event) => {
        if (card.contains(event.relatedTarget)) return;
        // Get default text from data attributes
        const defaultRole = card.getAttribute('data-role-default');
        const defaultDetails = card.getAttribute('data-details-default');
        paragraphs.forEach((paragraph, index) => {
            // Clear existing animations and restore original text
            deleteText(paragraph, () => {
                if (index === 0) {
                    typeWriter(paragraph, defaultRole);
                } else if (index === 1) {
                    typeWriter(paragraph, defaultDetails);
                }
            });
        });
    });
});


