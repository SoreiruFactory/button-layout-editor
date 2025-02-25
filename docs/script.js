const shape = document.getElementById('shape');
const heightInput = document.getElementById('height');
const widthInput = document.getElementById('width');
const cornerInput = document.getElementById('corner');
const shapeColorInput = document.getElementById('shapeColor');
const button24mmInput = document.getElementById('button24mm');
const button30mmInput = document.getElementById('button30mm');
const buttonColorInput = document.getElementById('buttonColor');

let buttons = [];

// Update shape dimensions
function updateShape() {
    shape.style.height = `${heightInput.value}mm`;
    shape.style.width = `${widthInput.value}mm`;
    shape.style.borderRadius = `${cornerInput.value}mm`;
    shape.style.backgroundColor = shapeColorInput.value;

    document.getElementById('heightValue').textContent = `${heightInput.value}mm`;
    document.getElementById('widthValue').textContent = `${widthInput.value}mm`;
    document.getElementById('cornerValue').textContent = `${cornerInput.value}mm`;
}

// Update buttons
function updateButtons() {
    shape.innerHTML = ''; // Clear existing buttons
    buttons = []; // Reset the buttons array
    const buttonColor = buttonColorInput.value;

    // Add 24mm buttons
    for (let i = 0; i < button24mmInput.value; i++) {
        createButton('24mm', buttonColor);
    }

    // Add 30mm buttons
    for (let i = 0; i < button30mmInput.value; i++) {
        createButton('30mm', buttonColor);
    }
}

// Create a draggable button
function createButton(size, color) {
    const button = document.createElement('div');
    button.className = 'button';
    button.style.backgroundColor = color;
    button.style.width = size;
    button.style.height = size;
    
    // Set random initial position
    const shapeRect = shape.getBoundingClientRect();
    const buttonSize = parseInt(size);
    button.style.left = `${Math.random() * (shapeRect.width - buttonSize)}px`;
    button.style.top = `${Math.random() * (shapeRect.height - buttonSize)}px`;

    // Make the button draggable
    button.draggable = true;
    button.addEventListener('dragstart', dragStart);
    button.addEventListener('dragend', dragEnd);

    shape.appendChild(button);
    buttons.push(button);
}

// Drag and Drop functions
let offsetX, offsetY;

function dragStart(e) {
    const rect = e.target.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
}

function dragEnd(e) {
    const button = e.target;
    const shapeRect = shape.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    // Calculate new position
    let left = e.clientX - shapeRect.left - offsetX;
    let top = e.clientY - shapeRect.top - offsetY;

    // Restrict movement within the shape
    left = Math.max(0, Math.min(left, shapeRect.width - buttonRect.width));
    top = Math.max(0, Math.min(top, shapeRect.height - buttonRect.height));

    button.style.left = `${left}px`;
    button.style.top = `${top}px`;

    // Check for collisions and adjust positions
    checkCollisions(button);
}

// Check for collisions between buttons
function checkCollisions(movedButton) {
    const movedRect = movedButton.getBoundingClientRect();

    buttons.forEach(button => {
        if (button !== movedButton) {
            const rect = button.getBoundingClientRect();
            const overlap = !(
                movedRect.right < rect.left ||
                movedRect.left > rect.right ||
                movedRect.bottom < rect.top ||
                movedRect.top > rect.bottom
            );

            if (overlap) {
                // Move the overlapping button away
                const directionX = (movedRect.left < rect.left) ? 1 : -1;
                const directionY = (movedRect.top < rect.top) ? 1 : -1;
                const newLeft = parseInt(button.style.left) + directionX * 10;
                const newTop = parseInt(button.style.top) + directionY * 10;

                button.style.left = `${Math.max(0, Math.min(newLeft, shape.offsetWidth - button.offsetWidth))}px`;
                button.style.top = `${Math.max(0, Math.min(newTop, shape.offsetHeight - button.offsetHeight))}px`;
            }
        }
    });
}

// Event listeners
heightInput.addEventListener('input', updateShape);
widthInput.addEventListener('input', updateShape);
cornerInput.addEventListener('input', updateShape);
shapeColorInput.addEventListener('input', updateShape);
button24mmInput.addEventListener('input', updateButtons);
button30mmInput.addEventListener('input', updateButtons);
buttonColorInput.addEventListener('input', updateButtons);

// Initialize the shape and buttons
updateShape();
updateButtons();
