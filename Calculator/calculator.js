class Calculator {
  constructor(previousDisplay, currentDisplay) {
    this.previousDisplay = previousDisplay;
    this.currentDisplay = currentDisplay;
    this.reset();
  }

  reset() {
    this.currentValue = "";
    this.previousValue = "";
    this.operator = null;
    this.updateDisplay();
  }

  delete() {
    this.currentValue = this.currentValue.slice(0, -1);
    this.updateDisplay();
  }

  appendNumber(number) {
    if (number === "." && this.currentValue.includes(".")) return;
    this.currentValue += number;
    this.updateDisplay();
  }

  chooseOperator(operator) {
    if (this.currentValue === "") return;
    if (this.previousValue !== "") {
      this.compute();
    }
    this.operator = operator;
    this.previousValue = this.currentValue;
    this.currentValue = "";
  }

  compute() {
    const prev = parseFloat(this.previousValue);
    const curr = parseFloat(this.currentValue);
    if (isNaN(prev) || isNaN(curr)) return;

    let result;
    switch (this.operator) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "/":
        result = curr === 0 ? "Error" : prev / curr;
        break;
      default:
        return;
    }

    this.currentValue = result.toString();
    this.operator = null;
    this.previousValue = "";
  }

  updateDisplay() {
    this.currentDisplay.textContent = this.currentValue || "0";
    this.previousDisplay.textContent = this.operator
      ? `${this.previousValue} ${this.operator}`
      : "";
  }
}

const previousDisplay = document.getElementById("previous");
const currentDisplay = document.getElementById("current");

const calculator = new Calculator(previousDisplay, currentDisplay);

document.querySelectorAll("[data-number]").forEach(button => {
  button.addEventListener("click", () =>
    calculator.appendNumber(button.textContent)
  );
});

document.querySelectorAll("[data-operator]").forEach(button => {
  button.addEventListener("click", () =>
    calculator.chooseOperator(button.dataset.operator)
  );
});

document.querySelector("[data-action='equals']")
  .addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
  });

document.querySelector("[data-action='clear']")
  .addEventListener("click", () => calculator.reset());

document.querySelector("[data-action='delete']")
  .addEventListener("click", () => calculator.delete());
