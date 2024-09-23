// Types for Shape Inputs and Calculation Results
type Shape = "rectangle" | "square" | "circle";

type ShapeDimensions = {
  length: number;
  width?: number; // Optional for rectangle only
};

type CalculationResult = {
  area: number;
  perimeter: number;
};

// Function to calculate area and perimeter based on the shape
function calculateSurface(
  shape: Shape,
  dimensions: ShapeDimensions
): CalculationResult {
  let area: number = 0;
  let perimeter: number = 0;

  switch (shape) {
    case "rectangle":
      if (dimensions.width) {
        area = dimensions.length * dimensions.width;
        perimeter = 2 * (dimensions.length + dimensions.width);
      }
      break;

    case "square":
      area = dimensions.length ** 2;
      perimeter = 4 * dimensions.length;
      break;

    case "circle":
      area = Math.PI * dimensions.length ** 2;
      perimeter = 2 * Math.PI * dimensions.length;
      break;

    default:
      throw new Error("Invalid shape selected");
  }

  return { area, perimeter };
}

// Function to draw the shape on the canvas
function drawShape(shape: Shape, dimensions: ShapeDimensions) {
  const canvas = document.getElementById("shapeCanvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

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
function validateInput(shape: Shape, length: number, width?: number): boolean {
  if (isNaN(length) || length <= 0) {
    alert("Please enter a valid length");
    return false;
  }

  if (shape === "rectangle" && (isNaN(width!) || width! <= 0)) {
    alert("Please enter a valid width for a rectangle");
    return false;
  }

  return true;
}

// Event Listener for form submission
const form = document.getElementById("shapeForm") as HTMLFormElement;
form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const shape = (document.getElementById("shape") as HTMLSelectElement)
    .value as Shape;
  const length = parseFloat(
    (document.getElementById("length") as HTMLInputElement).value
  );
  const width = parseFloat(
    (document.getElementById("width") as HTMLInputElement).value
  );

  if (validateInput(shape, length, width)) {
    const dimensions: ShapeDimensions = { length };
    if (shape === "rectangle") {
      dimensions.width = width;
    }

    const result = calculateSurface(shape, dimensions);

    // Display results
    (
      document.getElementById("area") as HTMLElement
    ).textContent = `Area: ${result.area.toFixed(2)}`;
    (
      document.getElementById("perimeter") as HTMLElement
    ).textContent = `Perimeter: ${result.perimeter.toFixed(2)}`;

    // Draw the shape on the canvas
    drawShape(shape, dimensions);
  }
});

// Show or hide width input based on the selected shape
const shapeSelect = document.getElementById("shape") as HTMLSelectElement;
shapeSelect.addEventListener("change", (e: Event) => {
  const shape = (e.target as HTMLSelectElement).value as Shape;
  const widthInput = document.getElementById("form__width") as HTMLInputElement;

  if (shape === "rectangle") {
    widthInput.classList.remove('form__input--hidden')
  } else {
    widthInput.classList.add('form__input--hidden')
  }
});
