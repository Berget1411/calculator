const display = document.querySelector("#current-display");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const numbers = document.querySelectorAll(".numbers");
const operands = document.querySelectorAll(".operands");
const equalButton = document.querySelector("#equal");
const add = (n1, n2) => {
  return n1 + n2;
};

const subtract = (n1, n2) => {
  return n1 - n2;
};

const multiply = (n1, n2) => {
  return n1 * n2;
};

const divide = (n1, n2) => {
  return n1 / n2;
};

const operate = (operator, n1, n2) => {
  if (operator === "add") {
    return add(n1, n2);
  } else if (operator === "subtract") {
    return subtract(n1, n2);
  } else if (operator === "multiply") {
    return multiply(n1, n2);
  } else if (operator === "divide") {
    return divide(n1, n2);
  }
};

let n1;
let operator;
let n2;
let result;

const updateDisplay = (text) => {
  display.textContent = text;
};

const pressedNumber = (e) => {
  if (!operator) {
    if (!n1) {
      n1 = e.target.textContent;
      updateDisplay(n1);
    } else if (n1) {
      n1 += e.target.textContent;
      updateDisplay(n1);
    }
  } else if (operator) {
    if (!n2) {
      n2 = e.target.textContent;
      updateDisplay(n2);
    } else if (n2) {
      n2 += e.target.textContent;
      updateDisplay(n2);
    }
  }
};
numbers.forEach((number) => number.addEventListener("click", pressedNumber));

const pressedOperand = (e) => {
  if (operator) {
    equalPressed();
    operator = e.target.id;
  } else {
    operator = e.target.id;
  }
};
operands.forEach((operand) =>
  operand.addEventListener("click", pressedOperand)
);

const equalPressed = () => {
  if (!result) {
    result = operate(operator, parseInt(n1), parseInt(n2));
    updateDisplay(result);
    n1 = undefined;
    n2 = undefined;
  } else {
    let oldResult = result;
    result = operate(operator, oldResult, parseInt(n2));
    updateDisplay(result);
    n1 = undefined;
    n2 = undefined;
  }
};
equalButton.addEventListener("click", equalPressed);
