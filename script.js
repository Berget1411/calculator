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

let n1;
let operator;
let n2;

const operate = (operator, n1, n2) => {
  return operator(n1, n2);
};
