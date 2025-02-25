document.addEventListener("DOMContentLoaded", function() {
    const shape = document.getElementById("shape");
    const values = { height: 170, width: 300, corner: 20, button24mm: 11, button30mm: 1 };

    function changeValue(type, amount) {
        values[type] = Math.max(1, values[type] + amount);
        document.querySelector(`[data-type='${type}']`).textContent = values[type] + (type.includes("button") ? "" : "mm");
        updateShape();
    }

    function updateShape() {
        shape.style.height = `${values.height}mm`;
        shape.style.width = `${values.width}mm`;
        shape.style.borderRadius = `${values.corner}mm`;
    }

    // ボタンのドラッグ＆ドロップ
    function makeDraggable(button) {
        let offsetX, offsetY;
        button.addEventListener("mousedown", (e) => {
            offsetX = e.clientX - button.offsetLeft;
            offsetY = e.clientY - button.offsetTop;
            function move(e) {
                let x = e.clientX - offsetX;
                let y = e.clientY - offsetY;
                button.style.left = `${x}px`;
                button.style.top = `${y}px`;
            }
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", move);
            }, { once: true });
        });
    }

    function createButtons() {
        shape.innerHTML = "";
        for (let i = 0; i < values.button24mm; i++) {
            let button = document.createElement("div");
            button.classList.add("button");
            button.style.width = "24mm";
            button.style.height = "24mm";
            shape.appendChild(button);
            makeDraggable(button);
        }
        for (let i = 0; i < values.button30mm; i++) {
            let button = document.createElement("div");
            button.classList.add("button");
            button.style.width = "30mm";
            button.style.height = "30mm";
            shape.appendChild(button);
            makeDraggable(button);
        }
    }

    createButtons();
    updateShape();
});
