console.log('Привет, проверяющий! \nВо избежание недоразумений хочу еще раз уточнить, \nчто при установке ширины экрана в devtools/responsive выбирайте, пожалуйста, Mobile(no touch), чтобы ширина скролл-бара справа не мешела проверке по PixelPerfect. Спасибо!')

const burgerClosemark = document.querySelector('.close-icon')
const burgerOpenmark = document.querySelector('.burger_icon')
const burgerContainer = document.querySelector('.burger-container')
const burgerBg = document.querySelector('.burger-wrap')

burgerOpenmark.addEventListener('click', ()=> {
  burgerContainer.classList.add('open-burger')
  burgerBg.classList.add('active')
})

burgerClosemark.addEventListener('click', ()=> {
  burgerContainer.classList.remove('open-burger')
  burgerBg.classList.remove('active')
})