const display = document.querySelector("#current-display");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const numbers = document.querySelectorAll(".numbers");
const operands = document.querySelectorAll(".operands");
const equalButton = document.querySelector("#equal");
const dotButton = document.querySelector("#dot");
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
  dotButton.addEventListener("click", pressedDot);
  operands.forEach((operand) =>
    operand.addEventListener("click", pressedOperand)
  );
};

//Resets all values except result
const resetValues = () => {
  n1 = undefined;
  n2 = undefined;
  operator = undefined;
};

const roundResult = (result) => {
  if (result.toString().length > 8 && result.toString().includes(".")) {
    return result.toFixed(6);
  } else {
    return result;
  }
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
  }
  operator = e.target.id;
  operands.forEach((operand) =>
    operand.removeEventListener("click", pressedOperand)
  );
};
operands.forEach((operand) =>
  operand.addEventListener("click", pressedOperand)
);

const equalPressed = () => {
  if (!result) {
    result = operate(operator, parseFloat(n1), parseFloat(n2));
    result = roundResult(result);
    updateDisplay(result);
    resetValues();
  } else {
    let oldResult = result;
    result = operate(operator, oldResult, parseFloat(n2));
    result = roundResult(result);
    updateDisplay(result);
    resetValues();
  }
};
equalButton.addEventListener("click", equalPressed);

const clear = () => {
  display.textContent = "";
  resetValues();
  result = undefined;
};
clearButton.addEventListener("click", clear);

const deletePressed = () => {
  if (display.textContent != result) {
    if (!n2) {
      old = n1;
      n1 = old.slice(0, -1);
      updateDisplay(n1);
    } else if (!n1) {
      old = n2;
      n2 = old.slice(0, -1);
      updateDisplay(n2);
    }
  }
};
deleteButton.addEventListener("click", deletePressed);

const pressedDot = () => {
  if (display.textContent.includes(".")) {
    dotButton.removeEventListener("click", pressedDot);
  } else {
    if (display.textContent == n1) {
      n1 += ".";
      display.textContent += ".";
    } else if (display.textContent == n2) {
      n2 += ".";
      display.textContent += ".";
    } else {
      n1 = "0.";
      display.textContent = "0.";
    }
  }
};
dotButton.addEventListener("click", pressedDot);

//keyboard support
document.body.addEventListener("keydown", (e) => {
  if (parseInt(e.key) || e.key == "0") {
    if (!operator) {
      if (!n1) {
        n1 = e.key;
        updateDisplay(n1);
      } else if (n1) {
        n1 += e.key;
        updateDisplay(n1);
      }
    } else if (operator) {
      if (!n2) {
        n2 = e.key;
        updateDisplay(n2);
      } else if (n2) {
        n2 += e.key;
        updateDisplay(n2);
      }
    }
  } else if (e.key == ".") {
    pressedDot();
  } else if (e.key == "Enter" || e.key == "=") {
    equalPressed();
  } else if (e.key == "Backspace") {
    deletePressed();
  } else {
    if (operator) {
      equalPressed();
    }
    if (e.key == "+") {
      operator = "add";
    } else if (e.key == "-") {
      operator = "subtract";
    } else if (e.key == "*") {
      operator = "multiply";
    } else if (e.key == "/") {
      operator = "divide";
    }
    operands.forEach((operand) =>
      operand.removeEventListener("click", pressedOperand)
    );
  }
});
