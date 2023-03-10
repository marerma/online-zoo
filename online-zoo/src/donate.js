import './style/normalize.css';
import './style/sass/style.sass';

const burgerClosemark = document.querySelector('.close-icon')
const burgerOpenmark = document.querySelector('.burger_icon')
const burgerContainer = document.querySelector('.burger-container')
const burgerBg = document.querySelector('.burger-wrap')
const body = document.querySelector('body')

//открытие бургер-меню

burgerOpenmark.addEventListener('click', openBurger)

//функция открытия бургера

function openBurger() {
  burgerContainer.classList.add('open-burger')
  burgerBg.classList.add('active')
}

//функция закрытия бургера при клике на крестик или на затемненную область

function closeBurger() {
  burgerContainer.classList.remove('open-burger')
  burgerBg.classList.remove('active')
}
  
burgerBg.addEventListener('click', (event)=> {
  let target = event.target; //проверяем, где произошел клик: в области контейнера меню или на крестике
  if (!burgerContainer.contains(target) || target == burgerClosemark) {
    closeBurger();
  }
})

// donate

const amountItem = document.querySelector('.cash')
const moneyDots = Array.from(document.querySelectorAll('.chose-amount-item'))
const moneySum = Array.from(document.querySelector('.value_list').children)


function loadDefaultAmount (defaultValue = '100') {
  amountItem.placeholder = defaultValue;
  let chosenItem = moneyDots.find(item => item.value === defaultValue)
  chosenItem.checked = true
  let chosenSum =  moneySum.find(item => item.textContent === defaultValue)
  chosenSum.classList.add('chosen-sum')
}

loadDefaultAmount ()

function changeDot (typedValue) {
 typedValue = amountItem.value;
 let chosenItem = moneyDots.find(item => item.value === typedValue)
 moneySum.forEach(item => {item.classList.remove('chosen-sum')})
 if (chosenItem) {
   chosenItem.checked = true
   moneySum.find(item => item.textContent === typedValue).classList.add('chosen-sum')
 } else {
  amountItem.placeholder = typedValue
  moneyDots.forEach(item => {item.checked = false})}
 }


amountItem.addEventListener('input', () => {
  if (amountItem.value.length > 4) {
    amountItem.value = amountItem.value.slice(0, 4)
  }
  amountItem.value = amountItem.value.slice(0, 4)
  changeDot()
})

/*amountItem.addEventListener('input', ()=> {
  if (amountItem.value.length > 4 && amountItem.matches(':focus')){
   amountItem.classList.add('error')
   amountItem.setAttribute('title', 'Please enter a 4-digit sum')
 } else 
 amountItem.classList.remove('error') 
})*/
 

moneySum.forEach(item => {item.addEventListener('click', (event)=> {
   changeClasses(event.target.textContent)
  moneyDots.find(item => item.value === event.target.textContent).checked = true
})
})


moneyDots.forEach(item => {item.addEventListener('change', () => {
   changeClasses(item.value)
  })
})


function changeClasses (amount) {
  moneySum.forEach(item => {item.classList.remove('chosen-sum')})
  moneySum.find(item => item.textContent === amount).classList.add('chosen-sum')
  amountItem.value = amount
}


