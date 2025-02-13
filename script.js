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

function resetOperator() {
  operation = "";
  operators.forEach((operator) => {
    operator.style.backgroundColor = "";
  });
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

  console.log(e.key, e);
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
    operation = operator.textContent;
    if (displayStr === "") {
      displayStr = "0";
    }

    num1 = parseFloat(displayStr);

    resetDisplay();
  });
});

equals.addEventListener("click", () => {
  console.log(num1);
  if (operation !== "") {
    if (percentProb === true) {
      if (percentNum === num2) {
        num2 = (num1 / 100) * num2;
        displayStr = operate(operation, num1, num2);
        result = operate(operation, num1, num2);
        console.log(num1, operation, num2, "=", result);
        percentProb = false;
        if (displayStr % 1 !== 0) {
          displayStr = 1 * parseFloat(displayStr).toFixed(3);
          display.textContent = displayStr;
        }
      }
    } else {
      num2 = parseFloat(displayStr);
      displayStr = operate(operation, num1, num2);
      result = operate(operation, num1, num2);
      console.log(num1, operation, num2, "=", result);
    }
  }

  display.textContent = displayStr;
  resetOperator();
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
  if (displayStr.length === 1) {
    resetDisplay();
  } else {
    displayStr = displayStr.slice(0, -1);
    display.textContent = displayStr;
  }
});
