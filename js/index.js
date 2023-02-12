import scroll from './scroll.js'

const burger = document.querySelector(`.burger`)
const burgerButton = document.querySelector(`.nav__burger-button`)
let toggleBurger = false


burgerButton.addEventListener(`click`, () => {
	toggleBurger = !toggleBurger
	if (toggleBurger) {
		burger.setAttribute(`style`, `opacity: 1; z-index: 2;`)
	} else {
		burger.setAttribute(`style`, `opacity: 0; z-index: -1;`)
	}
})











// Получаем коллекцию блоков слайдера
const scrollItems = document.querySelectorAll(`.comparison__changes_scroll-after-item`)
const scrollCntr = document.querySelector(`.comparison__changes_scroll-after`)

scroll(scrollItems, scrollCntr, 10)











// popUp---------------------------------------------

const popUp = document.querySelector(`.popup`)
const popUpCntr = document.querySelector(`.popup__cntr`)
const popUpVideo = document.querySelector(`.popup__content2-video`)
const popUpContentButton = document.querySelector(`.popup__content-button`)
const popUpCloseButton = document.querySelector(`.popup__close-button`)
const popUpCloseButtonImg = document.querySelector(`.popup__close-button-img`)
const nav = document.querySelector(`.nav`)




const popUpscrollItems = document.querySelectorAll(`.popup__scroll-item`)
const popUpscrollCntr = document.querySelector(`.popup__scroll`)


scroll(popUpscrollItems, popUpscrollCntr, 10)



// open / close
popUpContentButton.addEventListener(`click`, () => {
	popUp.style.opacity = 1
	popUp.style.zIndex = 4
	popUpCntr.style.right = 0
	popUpCloseButton.style.right = 0
	nav.style.top = `-10%`

	setTimeout(() => {
		popUpCloseButtonImg.style.transform = "scaleX(1)";
		popUpCloseButtonImg.style.transition = `0.5s`
		console.log()
	}, 500);

	popUpVideo.play()

})

popUpCloseButton.addEventListener(`click`, () => {
	popUp.style.opacity = 0
	popUp.style.zIndex = -1
	popUpCntr.style.right = `100%`
	popUpCloseButton.style.right = `100%`
	popUpCloseButton.style.zIndex = 0
	nav.style.top = 0
	popUpCloseButtonImg.style.transition = `0.2s`
	popUpCloseButtonImg.style.transform = "scaleX(-1)";


	
	popUpVideo.pause()
})

















