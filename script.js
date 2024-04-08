const displayOutput = document.getElementById("output");
const keys = document.querySelectorAll(".key-value");
const keysArray = Array.from(keys);
displayOutput.value = 0;
let inputText = [];
let number = [];
const precedenceTable = [
  {
    "/": (a, b) => a / b,
  },
  {
    "*": (a, b) => a * b,
  },
  {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
  },
];
for (let i = 0; i < keysArray.length; i++) {
  keysArray[i].addEventListener("click", () => {
    switch (keysArray[i].innerHTML) {
      case "=":
        {
          number = [];
          Calculation();
        }
        break;
      case "C":
        {
          inputText = [];
          number = [];
          displayOutput.value = "";
        }
        break;
      default: {
        if (keysArray[i].innerHTML === "." && inputText.length == 0) {
          inputText.push("0", ".");
          number.push("0", ".");
          displayOutput.value = number.join("");
        } else if (
          //to handle operator in begining
          !(
            inputText.length === 0 && "+,/,*".includes(keysArray[i].innerHTML)
          ) &&
          //to handle to two operatoer together
          !(
            "+,/,*,-".includes(inputText[inputText.length - 1]) &&
            "+,/,*".includes(keysArray[i].innerHTML)
          ) &&
          //to handle - sign after any other operator
          !(
            inputText[inputText.length - 1] === "-" &&
            keysArray[i].innerHTML === "-"
          ) &&
          //to handle two dots
          !(number.includes(".") && keysArray[i].innerHTML == ".") &&
          //to handle zero at begining
          !(
            inputText[inputText.length - 1] === "0" &&
            inputText.length == 1 &&
            keysArray[i].innerHTML == "0"
          )
        ) {
          if ("+,-,/,*".includes(keysArray[i].innerHTML)) {
            number = [];
          }
          if (
            inputText[inputText.length - 1] == "+" &&
            keysArray[i].innerHTML == "-"
          ) {
            inputText[inputText.length - 1] = "-";
            displayOutput.value = inputText.join("");
          } else if (
            "=,-,/,*".includes(inputText[inputText.length - 1]) &&
            number.length == 0 &&
            keysArray[i].innerHTML == "."
          ) {
            inputText.push("0", ".");
            number.push("0", ".");
            displayOutput.value = inputText.join("");
          } else {
            if (keysArray[i].innerHTML == ".")
              number.push(keysArray[i].innerHTML);
            inputText.push(keysArray[i].innerHTML);
            displayOutput.value = inputText.join("");
          }
        }
      }
    }
  });
}
function Calculation() {
  let value = displayOutput.value;
  result = getResult(convertStringToArray(value));
  if (result?.toString().includes(".")) {
    result = result.toFixed(2);
    number = ["."];
  }
  displayOutput.value = result;
  inputText = [result];
  if (!result && result !== 0) {
    displayOutput.values = "NaN";
    inputText = [];
  }
 else if (result === Infinity) {
    displayOutput.value = "INFINITY";
    inputText = [];
  }
  else if(result === undefined) {
    displayOutput.value = "NaN";
    inputText = [];
  }
}
function convertStringToArray(str) {
  const result = [];
  let number = "";
  for (const char of str) {
    if ("*/+-".includes(char)) {
      (number === "" && char === "-")?
        number = "-":
      
        result.push(parseFloat(number), char);
        number = "";
    } else {
      number += char;
    }
  }
  if (number !== "") {
    result.push(parseFloat(number));
  }
  console.log(result);
  return result;
}
let operator_value;
function getResult(expression) {
  for (const operators of precedenceTable) {
    const newArray = [];
    for (const element of expression) {
      if (element in operators) {
        operator_value = operators[element];
      } else if (operator_value) {
        newArray[newArray.length - 1] = operator_value(
          newArray[newArray.length - 1],
          element
        );
        operator_value = null;
      } else {
        newArray.push(element);
      }
    }
    expression = newArray;
  }
  return expression[0];
}
