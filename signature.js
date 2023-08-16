function signature(canvas_id, signature_id, clearButton_id, eraser_id) {
    const canvas = document.getElementById(canvas_id);
    const context = canvas.getContext('2d');
    var isDrawing = false;
    var signature = document.getElementsByName(signature_id)[0];
    let isErasing = false;
    
    function startDrawing(e) {
        isDrawing = true;
        const pos = getMousePos(canvas, e);
        context.beginPath();
        context.moveTo(pos.x, pos.y);
    }

    function draw(e) {
        if (!isDrawing) return;
        const pos = getMousePos(canvas, e);
        if (isErasing) {
            context.clearRect(pos.x, pos.y, 10, 10); // Adjust the size as needed
        } else {
            context.lineTo(pos.x, pos.y);
            context.stroke();
        }
    }

    function stopDrawing() {
        isDrawing = false;
        signature.value = canvas.toDataURL();
    }

    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        signature.value = '';
    }

    function getMousePos(canvas, e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    function toggleEraser() {
        isErasing = !isErasing;
        eraserButton.innerHTML = isErasing ? '<i class="fas fa-marker"></i>&nbsp;&nbsp;Drawing' : '<i class="fa fa-eraser"></i>&nbsp;&nbsp;Eraser';
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("touchstart", (e) => {
        e.preventDefault();
        startDrawing(e.touches[0]);
    });
    canvas.addEventListener("touchmove", (e) => {
        e.preventDefault();
        draw(e.touches[0]);
    });
    canvas.addEventListener("touchend", stopDrawing);


    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", stopDrawing);
    document.getElementById(clearButton_id).addEventListener("click", clearCanvas);

    const eraserButton = document.getElementById(eraser_id);
    eraserButton.addEventListener("click", toggleEraser);
}
