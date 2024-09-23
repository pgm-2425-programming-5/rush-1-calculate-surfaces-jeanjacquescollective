// Function to calculate area and perimeter based on the shape
function calculateSurface(shape, dimensions) {
    var area = 0;
    var perimeter = 0;
    switch (shape) {
        case "rectangle":
            if (dimensions.width) {
                area = dimensions.length * dimensions.width;
                perimeter = 2 * (dimensions.length + dimensions.width);
            }
            break;
        case "square":
            area = Math.pow(dimensions.length, 2);
            perimeter = 4 * dimensions.length;
            break;
        case "circle":
            area = Math.PI * Math.pow(dimensions.length, 2);
            perimeter = 2 * Math.PI * dimensions.length;
            break;
        default:
            throw new Error("Invalid shape selected");
    }
    return { area: area, perimeter: perimeter };
}
// Function to draw the shape on the canvas
function drawShape(shape, dimensions) {
    var canvas = document.getElementById("shapeCanvas");
    var ctx = canvas.getContext("2d");
    if (!ctx)
        return;
    // Clear previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    switch (shape) {
        case "rectangle":
            if (dimensions.width) {
                // Draw rectangle
                ctx.strokeRect(50, 50, dimensions.width * 10, dimensions.length * 10);
            }
            break;
        case "square":
            // Draw square (length equals width)
            ctx.strokeRect(50, 50, dimensions.length * 10, dimensions.length * 10);
            break;
        case "circle":
            // Draw circle (radius = length)
            ctx.beginPath();
            ctx.arc(150, 150, dimensions.length * 10, 0, Math.PI * 2);
            ctx.stroke();
            break;
        default:
            break;
    }
}
// Function to validate user input
function validateInput(shape, length, width) {
    if (isNaN(length) || length <= 0) {
        alert("Please enter a valid length");
        return false;
    }
    if (shape === "rectangle" && (isNaN(width) || width <= 0)) {
        alert("Please enter a valid width for a rectangle");
        return false;
    }
    return true;
}
// Event Listener for form submission
var form = document.getElementById("shapeForm");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var shape = document.getElementById("shape")
        .value;
    var length = parseFloat(document.getElementById("length").value);
    var width = parseFloat(document.getElementById("width").value);
    if (validateInput(shape, length, width)) {
        var dimensions = { length: length };
        if (shape === "rectangle") {
            dimensions.width = width;
        }
        var result = calculateSurface(shape, dimensions);
        // Display results
        document.getElementById("area").textContent = "Area: ".concat(result.area.toFixed(2));
        document.getElementById("perimeter").textContent = "Perimeter: ".concat(result.perimeter.toFixed(2));
        // Draw the shape on the canvas
        drawShape(shape, dimensions);
    }
});
// Show or hide width input based on the selected shape
var shapeSelect = document.getElementById("shape");
shapeSelect.addEventListener("change", function (e) {
    var shape = e.target.value;
    var widthInput = document.getElementById("form__width");
    if (shape === "rectangle") {
        widthInput.classList.remove('form__input--hidden');
    }
    else {
        widthInput.classList.add('form__input--hidden');
    }
});
