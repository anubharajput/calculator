const output = document.getElementById("output");
const keys = document.querySelectorAll(".key-value");
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
       Calculation();
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
             if((keysArray[i].innerHTML==='.' && inputText.length==0))
             {
                inputText.push("0", ".");
                number.push("0",".");
                output.value = number.join("");
             } 
             else if(
              //to handle operator in begining
                !(inputText.length===0 && "+,/,*".includes(keysArray[i].innerHTML)) &&
                //to handle to two operatoer together
                !("+,/,*,-".includes(inputText[inputText.length-1]) && "+,/,*".includes(keysArray[i].innerHTML)) &&
                //to handle - sign after any other operator
                !(inputText[inputText.length-1] === '-' && keysArray[i].innerHTML=== '-')  &&
                //to handle two dots
                !(number.includes(".") && keysArray[i].innerHTML=='.') &&
                //to handle zero at begining
                !(inputText[inputText.length-1] === '0' && inputText.length==1 && keysArray[i].innerHTML=="0")
               ){
                 if("+,-,/,*".includes(keysArray[i].innerHTML))
                 {
                    number=[];
                 }
                 if(inputText[inputText.length-1]=="+" && keysArray[i].innerHTML=="-"){
                  inputText[inputText.length-1]="-";
                  output.value=inputText.join("");
                 } else if("=,-,/,*".includes(inputText[inputText.length-1]) && number.length==0 && keysArray[i].innerHTML==".")
                 {
                  inputText.push("0",".");
                  number.push("0",".");
                  output.value=inputText.join("");
                 }
                 else{
                 if(keysArray[i].innerHTML==".")
                 number.push(keysArray[i].innerHTML);
                 inputText.push(keysArray[i].innerHTML);
                 output.value=inputText.join("");
                 console.log(number);
                 }
             }
            }
    }
  });
}
function Calculation()
{
    let value=output.value;
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
    console.log(output.value);
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