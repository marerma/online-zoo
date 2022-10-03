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