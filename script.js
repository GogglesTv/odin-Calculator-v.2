"use script";

let num1;
let num2;
let operation = "";
let displayStr = "";

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const decimal = document.querySelector(".decimal");

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

function operate(operation, num1, num2) {
  if (operation === "+") {
    return add(num1, num2);
  } else if (operation === "-") {
    return subtract(num1, num2);
  } else if (operation === "x") {
    return multiply(num1, num2);
  } else {
    return divide(num1, num2);
  }
}

function resetDisplay() {
  displayStr = "";
  display.textContent = "0";
  decimal.disabled = false;
}

function resetOperatorColor() {
  operators.forEach((operator) => {
    operator.style.backgroundColor = "";
  });
}

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    const numberValue = number.getAttribute("data-value");
    displayStr += numberValue;
    display.textContent = displayStr;
    num2 = parseFloat(displayStr);
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    operator.style.backgroundColor = "#6a6a6a";
    operation = operator.textContent;
    console.log(operation);
    num1 = parseFloat(displayStr);

    resetDisplay();
  });
});

equals.addEventListener("click", () => {
  resetOperatorColor();
  displayStr = operate(operation, num1, num2);
  console.log(displayStr);

  if (displayStr % 1 !== 0) {
    displayStr = 1 * parseFloat(displayStr).toFixed(3);
    display.textContent = displayStr;
  }

  display.textContent = displayStr;
});

decimal.addEventListener("click", () => {
  if (displayStr % 1 === 0) {
    displayStr += ".";
    display.textContent = displayStr;
  }
  decimal.disabled = "true";
  console.log(decimal);
});

console.log(numbers);
