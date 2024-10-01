// script.js

// Function to loop through images in the 'img' folder with a specified speed
function loopImages(imagePaths, speed = 50) { // Set speed to 50ms for fast transitions
    // Placeholder div where images will be displayed
    const parentDiv = document.querySelector('.hero-right');

    let imageIndex = 0;

    // Create an image element with a class for jittering effect
    const imgElement = document.createElement('img');
    imgElement.classList.add('jitter-image'); // Add CSS class for jitter animation
    imgElement.style.width = '100%';
    imgElement.style.height = '80%';
    imgElement.style.objectFit = 'cover';
     // set the opacity of the image
    imgElement.style.opacity = '0.1';
    parentDiv.appendChild(imgElement);

    // Function to update the image source
    function updateImage() {
        imgElement.src = imagePaths[imageIndex];
        imageIndex = (imageIndex + 1) % imagePaths.length; // Loop back to the first image
    }

    // Start the image loop
    updateImage(); // Show the first image immediately
    setInterval(updateImage, speed); // Update image at the given speed
}

// Example usage: List of image paths within the 'img' folder and loop speed in milliseconds
const images = [
    'img/xny1.jpg',
    'img/xny2.jpg',
    'img/xny3.jpg',
    'img/xny4.jpg'
];

loopImages(images, 50); // Set speed to 50ms for rapid transitions
