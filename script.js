document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".buttons button");
    const expressionDisplay = document.querySelector(".expression");
    const resultDisplay = document.querySelector(".result");
  
    let currentInput = "0";
    let operator = null;
    let previousInput = null;
  
    const updateDisplay = () => {
        resultDisplay.textContent = currentInput.replace(".", ",");
        expressionDisplay.textContent = previousInput && operator
          ? `${previousInput.replace(".", ",")} ${operator}`
          : "";
      };
  
    const calculate = () => {
      const prev = parseFloat(previousInput);
      const curr = parseFloat(currentInput);
  
      switch (operator) {
        case "+": return prev + curr;
        case "-": return prev - curr;
        case "*": return prev * curr;
        case "/": return curr !== 0 ? prev / curr : "Fehler";
        default: return curr;
      }
    };
  
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.action;
        const value = btn.textContent;
  
        if (!action) {
          if (currentInput === "0") currentInput = value;
          else currentInput += value;
        } else if (!isNaN(parseInt(action))) {
          currentInput += action;
        } else {
          switch (action) {
            case "clear":
              currentInput = "0";
              previousInput = null;
              operator = null;
              break;
            case "clear-entry":
              currentInput = "0";
              break;
            case "backspace":
              currentInput = currentInput.slice(0, -1) || "0";
              break;
            case ".":
              if (!currentInput.includes(".")) currentInput += ".";
              break;
            case "+":
            case "-":
            case "*":
            case "/":
              if (operator && previousInput !== null) {
                currentInput = String(calculate());
              }
              previousInput = currentInput;
              currentInput = "0";
              operator = action;
              break;
            case "=":
              if (operator && previousInput !== null) {
                currentInput = String(calculate());
                operator = null;
                previousInput = null;
              }
              break;
            case "plus-minus":
              currentInput = String(parseFloat(currentInput) * -1);
              break;
            case "%":
              if (operator && previousInput !== null) {
                const base = parseFloat(previousInput);
                const percent = parseFloat(currentInput);
                const result = base * percent / 100;
                currentInput = result.toString();
              } else {
                currentInput = (parseFloat(currentInput) / 100).toString();
              }
                break;
            case "reciprocal":
              currentInput = parseFloat(currentInput) !== 0 ? String(1 / parseFloat(currentInput)) : "Fehler";
              break;
            case "square":
              currentInput = String(parseFloat(currentInput) * parseFloat(currentInput));
              break;
            case "sqrt":
              const num = parseFloat(currentInput);
              currentInput = parseFloat(currentInput) >= 0 ? String(parseFloat(currentInput) ** 0.5) : "Fehler";
              break;      
          }
        }
  
        updateDisplay();
      });
    });
  
    updateDisplay();
  });