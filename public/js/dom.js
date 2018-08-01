const selectedCurrency = document.querySelector('#input');
const mulInput = document.querySelector('#mulinput');
const subBtn = document.querySelector('#submit');
const display = document.querySelector('#output');
const form = document.querySelector('#form');
// console.log('dom is Running');
// console.log(document.querySelector('#input'));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("POST", "/calc", {
    val: selectedCurrency.value,
    num: mulInput.value
  }, res => {
    display.textContent = mulInput.value + '  Bitcoin equals:' + " " +
      res + " " + selectedCurrency.value;
  })
})
