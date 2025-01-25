"use script";

let num1;
let num2;
let operator = "";
let displayStr = "";
let displayNum;

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");

function add(num1, num2) {
  let sum = num1 + num2;
  return sum;
}

function subtract(num1, num2) {
  let difference = num1 - num2;
  return difference;
}

function multiply(num1, num2) {
  let product = num1 * num2;
  return product;
}

function divide(num1, num2) {
  let quotient = num1 / num2;
  return quotient;
}

function operate() {
  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "*") {
    return multiply(num1, num2);
  } else {
    return divide(num1, num2);
  }
}

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    const numberValue = number.getAttribute("data-value");
    console.log(numberValue);
    displayStr += numberValue;
    display.textContent = displayStr;
    displayNum = parseInt(displayStr);
  });
});

console.log(numbers);
