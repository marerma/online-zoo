import pets from "./pets.js"

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
  disableScroll()
}

//функция закрытия бургера при клике на крестик или на затемненную область

function closeBurger() {
   enableScroll()
   burgerContainer.classList.remove('open-burger')
   burgerBg.classList.remove('active')
   
}
  
burgerBg.addEventListener('click', (event)=> {
  let target = event.target; //проверяем, где произошел клик: в области контейнера меню или на крестике
  if (!burgerContainer.contains(target) || target == burgerClosemark) {
    closeBurger();
  }
})


//функция отключения скролла body при открытых попапах

function disableScroll () {
  body.classList.add('disableScroll');
}

function enableScroll () {
  body.classList.remove('disableScroll');
}



//слайдер отзывов
const progressbar = document.querySelector('.range');
const testimonialItem = document.querySelector('.item__background');
const testimonialsContainer = document.querySelector('.testimonials-wrapper');
const popUpBg = document.querySelector('.pop_up-bg');

window.addEventListener('resize', changeAttributesResize)
window.addEventListener('load', changeAttributesResize)

function changeAttributesResize () {
  if (document.body.clientWidth < 1400 ) {
    progressbar.max = 8
  } else progressbar.max = 7
}

if (document.body.clientWidth < 641) {
  testimonialsContainer.addEventListener('click', (e) => {
    let targetFeedback = e.target.closest('.item__background')
    if (targetFeedback) {
       createPopUp(targetFeedback)
     
    } else return
   
  })
}


function createPopUp (targetBlock) {
  popUpBg.classList.add('visible')
  let popUp = document.createElement('div')
  popUp.className = 'popUp-testimonial'
  popUp.prepend(targetBlock.cloneNode(true))
  popUpBg.append(popUp)
  disableScroll ()
  popUpBg.addEventListener('click', ()=> {
    popUpBg.classList.remove('visible')
    setTimeout(() => {
      popUp.remove()
    }, 500)
    enableScroll ()
  })
}


function changeFeedback () {
  let progressbarValue = progressbar.value;
  let widthItem = parseInt(getComputedStyle(testimonialItem).width.replace('px',''));
  let gap = parseInt((getComputedStyle(testimonialsContainer).gridColumnGap).replace('px','')); 
  let moveStep = widthItem + gap + 2; //находим шаг сдвига: ширина отзыва плюч гэп плюс погрешность за счет неровных значений
  testimonialsContainer.style.left = -(progressbarValue * moveStep) + 'px';  
}

progressbar.addEventListener("input", changeFeedback);


//слайдер животных
const sliderBtnLeft = document.querySelector('.arrow-left')
const sliderBtnRight = document.querySelector('.arrow-right')
let isEnabled = false
const sliderWrapper = document.querySelector('.slider-wrapper')

let currentIndex = 0 
let sortedPets = pets
let numberNewSlides

//функция сортировки по Фишеру
function sortPets (array) {
  let tmp, rnd
   for (let i = array.length-1; i > 0; i--) {
    tmp = array[i]
    rnd = Math.floor(Math.random()*(i + 1))
    array[i] = array[rnd];
    array[rnd] = tmp;
  }
    return array;
   }

//слайдер с простым переключением, без пролистывания 

/*const slide = document.querySelectorAll('.slide')   
function addHTML () {
  let sortedPets = sortPets(pets)
  let text = ''
  let n 
  if (document.body.clientWidth > 320 && document.body.clientWidth <= 640) {
    n = 4
  }
  if (document.body.clientWidth > 640) {
    n = 6
  }
  for (let i = 0; i < n; i++) {
    text += `<div class="pets__item ${sortedPets[i].food}">
  <div class="pets__item__pic">
    <img src=${sortedPets[i].img} alt="${sortedPets[i].name}">
  </div>
  <div class="item__text"></div>
  <div class="item__name"><p>${sortedPets[i].name}</p></div>
  <div class="item__place"><p>${sortedPets[i].place}</p></div>
</div>`
  }
  return text
}*/

/*sliderBtnRight.addEventListener('click', ()=> {
  changeImages()})

sliderBtnLeft.addEventListener('click', ()=> {
  changeImages()
})
 

function changeImages () {
  slider.innerHTML = addHTML()
  slider.classList.add('fade')
  slider.addEventListener('animationend', ()=> {
    slider.classList.remove('fade')
  })
}*/

// new slider carousel

function NewPet(arrow, i) {
  this.name = arrow[i].name
  this.food = arrow[i].food
  this.img = arrow[i].img
  this.alt = arrow[i].name
  this.place = arrow[i].place
}


window.addEventListener('load', ()=> {
  sliderWrapper.insertAdjacentElement("afterbegin", createNewSlide (sortedPets, numberNewSlides)) 
}) //формируем карточки при загрузке окна

//определяем, сколько карточек нам нужно генерить в зависимости от ширины окна

if (document.body.clientWidth > 320 && document.body.clientWidth <= 640) {
  numberNewSlides = 4
  }
if (document.body.clientWidth > 640) {
  numberNewSlides = 6
  } 

window.addEventListener('resize', ()=> {
  if (document.body.clientWidth > 320 && document.body.clientWidth <= 640) {
    numberNewSlides = 4
    }
  if (document.body.clientWidth > 640) {
    numberNewSlides = 6
    } 
  
})

//функция пермещения слайда (6 или 4 карточки)
function moveSlides (direction) {
  if (isEnabled) {
    return false
  } //если флаг анимации поднят, то не даем выполнять функцию

  if (direction === 'right') {
    nextSlide()
  } else {
    previousSlide() }

  changeSliderPosition (direction) //после окончания анимации удалаяем класс смещения
  setTimeout(()=> {
    deleteSliderPosition(direction)
  }, 2500) 
  
}


function createNewSlide (array, number){
  sortPets(array)
  let newSlide = document.createElement('div')
  newSlide.className = 'slide _content'

  for (let i = 0; i < number; i++) {
    let generatedPet = new NewPet (array, i)
    let newPetSlide = document.createElement('div')
    newPetSlide.className = `pets__item ${generatedPet.food}`
    newPetSlide.innerHTML = `<div class="pets__item__pic">
      <img src=${generatedPet.img} alt="${generatedPet.name}">
    </div>
    <div class="item__text"></div>
    <div class="item__name"><p>${generatedPet.name}</p></div>
    <div class="item__place"><p>${generatedPet.place}</p></div>
  </div>`
  newSlide.insertAdjacentElement("afterbegin", newPetSlide)
  }
  return newSlide
}

function nextSlide () {
  
  sliderWrapper.insertAdjacentElement("beforeend", createNewSlide (sortedPets, numberNewSlides)) 
  setTimeout(()=> {
    sliderWrapper.children[currentIndex].remove() //смотрим живую коллекцию детей и их количество, первого удаляем
  }, 2500) 
}


function previousSlide () { 
  sliderWrapper.insertAdjacentElement("afterbegin", createNewSlide (sortedPets, numberNewSlides)) 
  let length = sliderWrapper.children.length //смотрим живую коллекцию детей и их количество, последнего удаляем
  setTimeout(()=> {
    sliderWrapper.children[length - 1].remove() // удаляем последний слайд после перемотки
  }, 2500) 
}

function changeSliderPosition (classMove){
  let slides = sliderWrapper.children
  Array.from(slides).forEach(el => {
    el.classList.add(`move-${classMove}`)
  })
  isEnabled = true
  setTimeout(() => { 
    isEnabled = false
  }, 2500)
  }
   
function deleteSliderPosition (classMove){
    let slides = sliderWrapper.children
    Array.from(slides).forEach(el => {
      el.classList.remove(`move-${classMove}`)
    })
    isEnabled = false
    }

sliderBtnRight.addEventListener('click', () => {
  moveSlides('right')}
  )

sliderBtnLeft.addEventListener('click', () => {
  moveSlides('left')}
  )
    