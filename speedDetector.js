const prompt = require("prompt-sync")();

// Function to check speed and return result
function speedDetector(speed) {
  const speedLimit = 70;
  const kmPerPoint = 5;

  if (speed <= speedLimit) {
    return "Ok";
  }

  const points = Math.floor((speed - speedLimit) / kmPerPoint);

  if (points > 12) {
    return "License suspended";
  }

  return `Points: ${points}`;
}

// --- User Input ---
const input = prompt("Enter the car speed (km/h): ");
const speed = Number(input);

if (isNaN(speed) || speed < 0) {
  console.log("Invalid input. Please enter a valid number.");
} else {
  console.log(speedDetector(speed));
}
