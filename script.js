"use script";

let num1;
let num2;
let result;
let percentNum;
let percentProb = false;
let operation = "";
let displayStr = "";

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const decimal = document.querySelector(".decimal");
const neg = document.querySelector(".neg");
const percent = document.querySelector(".percentage");
const bkSpace = document.querySelector(".bkspace");
const allClear = document.querySelector(".clear");

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
  } else if (operation === "*") {
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

function resetOperator() {
  operation = "";
  operators.forEach((operator) => {
    operator.style.backgroundColor = "";
  });
}

function operatorChosen() {
  if (displayStr === "") {
    displayStr = "0";
  }

  num1 = parseFloat(displayStr);

  resetDisplay();
}

function operationComplete() {
  if (operation === "") {
    if (percentProb === true) {
      console.log(percentNum);
      displayStr = percentNum / 100;
      num1 = displayStr;
      percentProb = false;
    }
  } else if (operation !== "") {
    if (percentProb === true) {
      if (percentNum === num2) {
        num2 = (num1 / 100) * num2;
        displayStr = operate(operation, num1, num2);
        result = operate(operation, num1, num2);
        console.log(num1, operation, num2, "=", result);
      }
      percentProb = false;
    } else {
      num2 = parseFloat(displayStr);
      displayStr = operate(operation, num1, num2);
      result = operate(operation, num1, num2);
      console.log(num1, operation, num2, "=", result);
      if (displayStr % 1 !== 0) {
        displayStr = 1 * parseFloat(displayStr).toFixed(3);
        display.textContent = displayStr;
      }
    }
  }

  display.textContent = displayStr;
  resetOperator();
}

function backSpace() {
  if (displayStr.length === 1 || displayStr.length === 0) {
    resetDisplay();
  } else {
    displayStr = displayStr.slice(0, -1);
    display.textContent = displayStr;
  }
}

document.addEventListener("keyup", (e) => {
  if (parseFloat(e.key) <= 9 || parseFloat(e.key) >= 0) {
    const numberValue = parseFloat(e.key);

    if (num1 !== "") {
      if (result !== "") {
        if (displayStr.includes(".")) {
          displayStr += numberValue;
          display.textContent = displayStr;
          num2 = parseFloat(displayStr);
        } else {
          result = "";
          resetDisplay();
          displayStr += numberValue;
          display.textContent = displayStr;
          num2 = parseFloat(displayStr);
        }
      } else {
        displayStr += numberValue;
        display.textContent = displayStr;
        num2 = parseFloat(displayStr);
      }
    } else {
      displayStr += numberValue;
      display.textContent = displayStr;
    }
  }

  const plus = document.querySelector(".plus");
  const minus = document.querySelector(".minus");
  const multiply = document.querySelector(".multiply");
  const divide = document.querySelector(".divide");

  if (e.key === "+") {
    operation = e.key;
    plus.style.backgroundColor = "#6a6a6a";
    operatorChosen();
  } else if (e.key === "-") {
    operation = e.key;
    minus.style.backgroundColor = "#6a6a6a";
    operatorChosen();
  } else if (e.key === "*") {
    operation = e.key;
    multiply.style.backgroundColor = "#6a6a6a";
    operatorChosen();
  } else if (e.key === "/") {
    operation = e.key;
    divide.style.backgroundColor = "#6a6a6a";
    operatorChosen();
  } else if (e.key === "=" || e.key === "Enter") {
    operationComplete();
  } else if (e.key === "Backspace") {
    backSpace();
  }
});

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    const numberValue = number.getAttribute("data-value");

    if (num1 !== "") {
      if (result !== "") {
        if (displayStr.includes(".")) {
          displayStr += numberValue;
          display.textContent = displayStr;
          num2 = parseFloat(displayStr);
        } else {
          result = "";
          resetDisplay();
          displayStr += numberValue;
          display.textContent = displayStr;
          num2 = parseFloat(displayStr);
        }
      } else {
        displayStr += numberValue;
        display.textContent = displayStr;
        num2 = parseFloat(displayStr);
      }
    } else {
      displayStr += numberValue;
      display.textContent = displayStr;
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    operator.style.backgroundColor = "#6a6a6a";
    if (operator.textContent === "x") {
      operation = "*";
    } else if (operator.textContent === "÷") {
      operation = "/";
    } else {
      operation = operator.textContent;
    }
    operatorChosen();
  });
});

equals.addEventListener("click", () => {
  operationComplete();
});

decimal.addEventListener("click", () => {
  if (displayStr % 1 === 0) {
    if (displayStr === "") {
      displayStr = "0.";
      display.textContent = displayStr;
      console.log(displayStr);
      decimal.disabled = "true";
    } else if (num2 === "") {
      displayStr = "0.";
      display.textContent = displayStr;
      decimal.disabled = "true";
    } else {
      displayStr += ".";
      display.textContent = displayStr;
      decimal.disabled = "true";
    }
  }
});

allClear.addEventListener("click", () => {
  resetDisplay();
  resetOperator();
  num1 = 0;
  num2 = 0;
});

neg.addEventListener("click", () => {
  if (!displayStr.toString().includes("-")) {
    displayStr = parseFloat("-" + displayStr);
    display.textContent = displayStr;
  } else {
    displayStr = parseFloat(displayStr.toString().substring(1));
    display.textContent = displayStr;
  }
});

percent.addEventListener("click", () => {
  display.textContent = displayStr + "%";
  if (num2 !== "") {
    num2 = parseFloat(displayStr);
    percentNum = num2;
    percentProb = true;
  } else {
    percentProb = false;
    num1 = parseFloat(displayStr / 100);
    displayStr = num1;
    console.log(num1);
  }
});

bkSpace.addEventListener("click", () => {
  backSpace();
});
