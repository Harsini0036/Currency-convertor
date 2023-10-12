let select = document.querySelectorAll(".currency");
let btn = document.getElementById("btn");
let input = document.getElementById("input");
let result = document.getElementById("result");
let error = document.getElementById("error");

console.log(select);

fetch("https://api.frankfurter.app/currencies")
  .then((res) => res.json())
  .then((res) => displayDropDown(res));

function displayDropDown(res) {
  //console.log(Object.entries(res)[0][0]);
  let curr = Object.entries(res);
  for (let i = 0; i < curr.length; i++) {
    let opt = `<option value-${curr[i][0]}>${curr[i][0]}</option>`;
    //console.log(opt);
    select[0].innerHTML += opt;
    select[1].innerHTML += opt;
  }
}

btn.addEventListener("click", () => {
  if (btn.innerHTML === "Convert") {
    let curr1 = select[0].value;
    let curr2 = select[1].value;
    let inputCurr = input.value;

    if (curr1 === curr2) {
      alert("Select differenct currencies");
      //error.style.padding = "0.5rem 1rem";
    } else {
      convert(curr1, curr2, inputCurr);
      btn.innerHTML = "Reset";
    }
  } else if (btn.innerHTML === "Reset") {
    location.reload();
  }
});

function convert(curr1, curr2, inputCurr) {
  const host = "api.frankfurter.app";
  fetch(`https://${host}/latest?amount=${inputCurr}&from=${curr1}&to=${curr2}`)
    .then((resp) => resp.json())
    .then((data) => {
      //console.log(data);
      let converted_val = data.rates[curr2].toFixed(2);
      console.log(converted_val);
      result.value = converted_val;
    });
}
