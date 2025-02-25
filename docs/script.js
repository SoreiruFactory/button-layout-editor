const shape = document.getElementById('shape');
const values = {
    height: 170,
    width: 300,
    corner: 20,
    button24mm: 11,
    button30mm: 1
};

function changeValue(type, amount) {
    values[type] = Math.max(1, values[type] + amount);
    document.getElementById(type + 'Value').textContent = values[type] + (type.includes("button") ? "" : "mm");
    updateShape();
}

function updateShape() {
    shape.style.height = `${values.height}mm`;
    shape.style.width = `${values.width}mm`;
    shape.style.borderRadius = `${values.corner}mm`;
}

// 数値をドラッグで変更
document.querySelectorAll('.draggable').forEach(element => {
    let isDragging = false;
    let startY;
    let type = element.dataset.type;

    element.addEventListener('mousedown', (e) => {
        isDragging = true;
        startY = e.clientY;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            let diff = Math.floor((startY - e.clientY) / 5);
            if (diff !== 0) {
                changeValue(type, diff);
                startY = e.clientY;
            }
        }
    });

    document.addEventListener('mouseup', () => isDragging = false);
});
document.addEventListener("DOMContentLoaded", function() {
    updateShape();
    document.querySelectorAll('.draggable').forEach(element => {
        let isDragging = false;
        let startY;
        let type = element.dataset.type;

        element.addEventListener('mousedown', (e) => {
            isDragging = true;
            startY = e.clientY;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                let diff = Math.floor((startY - e.clientY) / 5);
                if (diff !== 0) {
                    changeValue(type, diff);
                    startY = e.clientY;
                }
            }
        });

        document.addEventListener('mouseup', () => isDragging = false);
    });
});


// 初期表示
updateShape();
