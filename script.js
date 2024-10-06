// script.js

// Function to handle the name flashing effect
const nameText = document.getElementById("name-text");
const gameOption = document.getElementById("game-option");
const musicOption = document.getElementById("music-option");
const contactOption = document.getElementById("contact-option");
const nameSequence = ["Jacob Ma", "Rex Ma", "马浩轩", "Haoxuan Ma"];
let isHovering = false; // Track if the hover event has already been triggered
let isOptionsView = false; // Track if the options view is currently active
let isMinimized = false; // Track if the sections are minimized
let isTextMode = true; // Track if the text mode is currently active


nameText.addEventListener("mouseover", () => {
    if (!isTextMode) return;
    if (isHovering) return; // Prevent triggering the event multiple times
    isHovering = true;

    let index = 0;
    const flashInterval = setInterval(() => {
        nameText.textContent = nameSequence[index];
        index = (index + 1) % nameSequence.length;

        // If the name is back to "Haoxuan", clear the interval
        // if (index === 0) {
        //     clearInterval(flashInterval);
        //     isHovering = false; // Reset hover state after completing the sequence
        // }
    }, 150); // Change name every 200 milliseconds
});

nameText.addEventListener("mouseleave", () => {
    if (!isTextMode) return;
    // Ensure the text returns to "Haoxuan" when the mouse leaves the area
    nameText.textContent = "Haoxuan Ma";
    isHovering = false; // Reset the hovering state in case of interruption
});

// Define the original name and the options text
const originalText = "Haoxuan Ma";
const optionsText = "Music | Game | Contact";

// Add click event listener to change text when clicked
// apply to all <p> elements
nameText.addEventListener("click", () => {
    if (!isTextMode) return;
    // wait until the flashing effect is done
    const clickInterval = setInterval(() => {
        if (!isHovering) {
            clearInterval(clickInterval);
            // Switch to options view
            nameText.textContent = "";
            nameText.classList.add("options");
            isOptionsView = true;
            isMinimized = false;
            isTextMode = false;
            // Create the option elements
            createOptionElement(optionsText);
        }
    }, 200);

    
});

function createOptionElement(optionText) {
    // spawn 3 <div> elements with class "option"
    const options = optionsText.split(" | ");
    options.forEach((option) => {
        const optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.classList.add("hover-underline-effect");
        optionElement.id = option.toLowerCase() + "-option";
        optionElement.textContent = option;
        nameText.appendChild(optionElement);
        // add the divider except for the last element
        if (option !== options[options.length - 1]) {
            const divider = document.createElement("div");
            divider.classList.add("divider");
            divider.textContent = "|";
            nameText.appendChild(divider);
        }
    });
}

const backgroundContainer = document.getElementById("background-container");
const backgroundText = document.getElementById("background-text");

// Define the original name, the options text, and their Chinese translations
const chineseTranslations = {
    "Games": "游戏",
    "Music": "音乐",
    "Contact": "联系"
};

// Add hover event listeners to show the Chinese character background
nameText.addEventListener("mouseover", (e) => {
    // If the nameText is in options view and the target is an option, show the background
    if (isOptionsView) {
        const hoveredOption = e.target.textContent.trim();
        if (chineseTranslations[hoveredOption]) {
            backgroundText.textContent = chineseTranslations[hoveredOption];
            backgroundText.style.opacity = 1; // Show the background text
        }
    }
});

// Add mouseout event to hide the background when not hovering
nameText.addEventListener("mouseout", () => {
    // Hide the background text when mouse leaves the options
    backgroundText.style.opacity = 0;
});

// Get the name text and option elements
const gameSection = document.getElementById("game-section");
const musicSection = document.getElementById("music-section");
const contactSection = document.getElementById("contact-section");

// Define the sections and their respective IDs
const sections = {
    "Game": gameSection,
    "Music": musicSection,
    "Contact": contactSection
};

// Function to hide all sections
function hideAllSections() {
    // also hide the center text to a menu icon
    nameText.textContent = "☰";
    nameText.classList.remove("options");
    isOptionsView = false;
    isMinimized = true;
    isTextMode = false;
    // shrink the nameText
    nameText.classList.remove("center-text");
    nameText.classList.add("menu-icon");
    
    for (const key in sections) {
        sections[key].style.opacity = 0; // Set opacity to 0 for fade-out
        setTimeout(() => {
            sections[key].classList.remove("active");
        }, 500); // Wait for transition to complete before hiding
    }
}

// Function to show a specific section
function showSection(section) {
    hideAllSections(); // First hide all sections
    setTimeout(() => {
        sections[section].classList.add("active");
        sections[section].style.opacity = 1; // Set opacity to 1 for fade-in
    }, 500); // Delay for smooth transition
}

// Add click event listener to handle section visibility
nameText.addEventListener("click", (e) => {
    if (isMinimized) {
        // If the sections are minimized, show the options view
        nameText.textContent = "";
        isMinimized = false;
        createOptionElement(optionsText);
    }
    if (e.target.classList.contains("option")) {
        const optionClicked = e.target.textContent.trim();
        if (sections[optionClicked]) {
            showSection(optionClicked);
        }
    }
});

// script.js

// Get the elements for toggling
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

// Event listener to toggle the menu visibility
menuToggle.addEventListener("click", () => {
    // Toggle the "active" class on the nav menu
    navMenu.classList.toggle("active");
});
