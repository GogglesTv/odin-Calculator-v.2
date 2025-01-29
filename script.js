"use script";

let num1;
let num2;
let operation = "";
let displayStr = "";

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");

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

    if (num1 !== undefined) {
      num2 = parseInt(displayStr);
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    operator.style.backgroundColor = "#6a6a6a";
    operation = operator.textContent;
    console.log(operation);
    num1 = parseInt(displayStr);
    resetDisplay();
  });
});

equals.addEventListener("click", () => {
  resetOperatorColor();
  displayStr = operate(operation, num1, num2);
  display.textContent = displayStr;
});

console.log(numbers);
