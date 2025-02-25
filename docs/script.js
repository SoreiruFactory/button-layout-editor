document.addEventListener("DOMContentLoaded", function() {
    const shape = document.getElementById("shape");
    const values = { height: 170, width: 300, corner: 20, button24mm: 11, button30mm: 1, buttonColor: "#6ffff3" };

    function changeValue(type, amount) {
        values[type] = Math.max(1, values[type] + amount);
        document.querySelector(`[data-type='${type}']`).textContent = values[type] + (type.includes("button") ? "" : "mm");
        updateShape();
        createButtons();
    }

    function updateShape() {
        shape.style.height = `${values.height}px`;
        shape.style.width = `${values.width}px`;
        shape.style.borderRadius = `${values.corner}px`;
        shape.style.backgroundColor = document.getElementById("shapeColor").value;
    }

    function createButtons() {
        shape.innerHTML = ""; // ボタンをクリア
        const shapeRect = shape.getBoundingClientRect();

        for (let i = 0; i < values.button24mm; i++) {
            createButton(24, values.buttonColor, shapeRect);
        }
        for (let i = 0; i < values.button30mm; i++) {
            createButton(30, values.buttonColor, shapeRect);
        }
    }

    function createButton(size, color, shapeRect) {
        let button = document.createElement("div");
        button.classList.add("button");
        button.style.width = `${size}px`;
        button.style.height = `${size}px`;
        button.style.backgroundColor = color;
        button.style.position = "absolute";
        button.style.borderRadius = "50%";
        button.style.border = "1px solid black";

        // 初期位置を shape 内のランダムな場所に設定
        let maxX = shapeRect.width - size;
        let maxY = shapeRect.height - size;
        button.style.left = `${Math.random() * maxX}px`;
        button.style.top = `${Math.random() * maxY}px`;

        shape.appendChild(button);
        makeDraggable(button);
    }

    function makeDraggable(button) {
        let offsetX, offsetY;
        button.addEventListener("mousedown", (e) => {
            offsetX = e.clientX - button.offsetLeft;
            offsetY = e.clientY - button.offsetTop;
            
            function move(e) {
                let x = e.clientX - offsetX;
                let y = e.clientY - offsetY;

                // 親要素（shape）の範囲内に収める
                let shapeRect = shape.getBoundingClientRect();
                let maxX = shapeRect.width - button.offsetWidth;
                let maxY = shapeRect.height - button.offsetHeight;
                x = Math.max(0, Math.min(x, maxX));
                y = Math.max(0, Math.min(y, maxY));

                button.style.left = `${x}px`;
                button.style.top = `${y}px`;
            }

            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", move);
            }, { once: true });
        });
    }

    // カラー変更イベント
    document.getElementById("shapeColor").addEventListener("input", function() {
        values.buttonColor = this.value;
        createButtons();
    });

    // 初期表示
    updateShape();
    createButtons();
});
