const selectedCurrency = document.querySelector('#input');
const mulInput = document.querySelector('#mulinput');
const subBtn = document.querySelector('#submit');
const display =  document.createElement("div");
const form = document.querySelector('#form');
const out =document.querySelector('#out');

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("ons");

  fetch("POST", "/calc", {
    val: selectedCurrency.value,
    num: mulInput.value
  }, res => {
    display.textContent = mulInput.value + '  Bitcoins equal:'
     + res + " " + selectedCurrency.value;
  });
  display.classList.add("output");
  out.appendChild(display);

})
