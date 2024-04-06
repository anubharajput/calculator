const output = document.querySelector(".input");
const keys = document.querySelectorAll(".key");
const keysArray = Array.from(keys);
output.value = 0;
let inputText = [];
let number=[];
const precedencetable=[
    {
        "/":(a,b)=>a/b
    },
    {
"*":(a,b)=>a*b
    },
    {
"+":(a,b)=>a+b,"-":(a,b)=>a-b
    }
  ];
for (let i = 0; i < keysArray.length; i++) {
  keysArray[i].addEventListener("click", () => {
    switch(keysArray[i].innerHTML){
        case "=":
        {
       number=[];
       handleCalculation();
        }
        break;
        case "C":
            {
          inputText=[];
          number=[];
          output.value="";
            }
            break;
            default:{
             if(keysArray[i].innerHTML==='.' && inputText.length==0)
             {
                inputText.push("0", ".");
                output.value = inputText.join("");
                number = ["0", "."];
             } 
             else if(
                !(inputText.length===0 && "+,/,*".includes(keysArray[i].innerHTML)) &&
                !("+,/,*".includes(inputText[inputText.length-1]) && "+,/,*".includes(keysArray[i].innerHTML)) &&
                !(inputText[inputText.length-1] === '-' && keysArray[i].innerHTML=== '-')  &&
                !(number.includes(".") && keysArray[i].innerHTML=='.')
               ){
                 if("+,-,/,*".includes(keysArray[i].innerHTML))
                 {
                    number=[];
                 }
                 number.push(keysArray[i].innerHTML);
                 inputText.push(keysArray[i].innerHTML);
                 output.value=inputText.join("");
                 console.log(inputText);
             }
            }
    }
  });
}
function handleCalculation()
{
    let value=output.value;
    console.log(convertStringToArray(value));
    result=getResult(convertStringToArray(value));
    if(result?.toString().includes("."))
    {
        result=result.toFixed(2);
        number=["."];
    }
    output.value=result;
    inputText=[result];
    if(!result && result!==0)
    {
        output.values="NaN";
        inputText=[];
    }
    if(result===Infinity){
        output.value="INFINITY";
        inputText=[];
    }
    if(result===undefined){
        output.value="NaN";
        inputText=[];
    }
}
function convertStringToArray(str)
{
    const result = [];
  let number = "";
  for (const char of str) {
    if ("*/+-".includes(char)) {
      if (number === "" && char === "-") {
        number = "-";
      } else {
        result.push(parseFloat(number), char);
        number = "";
      }
    } else {
      number += char;
    }
  }
  if (number !== "") {
    result.push(parseFloat(number));
  }
  return result;
}
let operator_value;
function getResult(expression)
{
    
    for(const operators of precedencetable)
    {
        const newArray=[];
        for(const element of expression)
        {
            if(element in operators)
            {
                operator_value=operators[element];
            }
            else if(operator_value)
            {
                newArray[newArray.length-1]=operator_value(newArray[newArray.length-1],element);
                operator_value=null;
            }
            else{
                newArray.push(element);
            }
            
        }
        expression=newArray;
    }
    return expression[0];
}