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











// Получаем коллекцию блоков слайдера + контейнер
const scrollItems = document.querySelectorAll(`.comparison__changes_scroll-after-item`)
const scrollCntr = document.querySelector(`.comparison__changes_scroll-after`)

const popUpscrollItems = document.querySelectorAll(`.popup__scroll-item`)
const popUpscrollCntr = document.querySelector(`.popup__scroll`)









// popUp---------------------------------------------

const popUp = document.querySelector(`.popup`)
const popUpCntr = document.querySelector(`.popup__cntr`)
const popUpVideo = document.querySelector(`.popup__content2-video`)
const popUpContentButton = document.querySelector(`.popup__content-button`)
const popUpCloseButton = document.querySelector(`.popup__close-button`)
const popUpCloseButtonImg = document.querySelector(`.popup__close-button-img`)
const nav = document.querySelector(`.nav`)


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


















// слегка багует скроллбар. Можно сделать его кастомным, тогда вообще огонь будет

const scroll = (array, container, gap) => {
	// 1й аргумент - массив прокручиваемых объектов
	// 2й аргумент - контейнер для прокручиваемых объектов
	// 3й аргумент - gap
	
	
	
	
	
	
	
		// // СЕТАЕМ ИЗНАЧАЛЬНОЕ РАЗПОЛОЖЕНИЕ ITEMS
		const setCurrentGap = () => {
			for (let i = 0; i < array.length; i++) {
	
				// left для всех items, кроме первого
				const gapValue = () => {
					if (i !== 0) {
						return gap
					}
					return 0
				}
	
				array[i].style.left = `${array[0].getBoundingClientRect().width * i + (gapValue() * i)}px`
			}
		}
		setCurrentGap()
	
	
		// // СМЕЩЕНИЕ ПРИ ПЕРЕТАСКИВАНИИ И ПЛАВНЫЙ ВОЗВРАТ ПРИ ОТПУСКАНИИ--------------------------
		for (let item of array) {
			// отключаем mousemove при mouseup. listener mouseup возвращает false
			let toggleMousemove = false
	
			// переключатель, для отработки расчёта максимально допустимоого left не больше 1 раза
			let setLastLeftToggle = false
			// сетаем максимально допустимое значение left для items
			let setLastLeft = []
	
			// расчёт отступа left для того, чтоб right был 0. ширина контейнера  минус  ширина item
			const lastItemLeft = parseInt(container.getBoundingClientRect().width - array[0].getBoundingClientRect().width)
	
			let init = []
			for (let i = 0; i < array.length; i++) {
				init[i] = parseInt(array[i].style.left)
			}
	
	
	
	
	
	
			// СЕТАЕМ НАЧАЛЬНОЕ ПОЛОЖЕНИЕ НАЖАТИЯ
			item.onmousedown = (e) => {
	
	
				let initIndent = []
				toggleMousemove = true
	
				let touchOffsetX = e.screenX
	
				for (let i = 0; i < array.length; i++) {
					array[i].style.transition = '0s'
					initIndent[i] = parseInt(array[i].style.left)
				}
	
	
	
	
	
	
				// ОБНОВЛЯЕМ ПОЛОЖЕНИЕ ЭЛЕМЕНТОВ ПРИ ДВИЖЕНИИ КУРСОРА
				window.onmousemove = (event) => {
	
					if (!toggleMousemove) {
						return
					}
	
	
					console.log()
	
					for (let i = 0; i < array.length; i++) {
	
						let target = initIndent[i] - (touchOffsetX - event.screenX)
	
						array[i].style.left = `${target}px`
					}
	
					if (parseInt(array[array.length - 1].style.left) < lastItemLeft) {
						setLastLeftToggle = true
					}
	
					if (setLastLeftToggle) {
						if (!setLastLeft[0]) {
							for (let i = 0; i < array.length; i++) {
								setLastLeft[i] = parseInt(array[i].style.left)
							}
						}
					}
	
	
	
	
	
	
	
					window.onmouseup = () => {
						toggleMousemove = false
	
						for (let i = 0; i < array.length; i++) {
							array[i].style.transition = '0.3s ease-in-out'
	
	
							if (parseInt(array[0].style.left) > init[0]) {
								for (let it = 0; it < array.length; it++) {
									array[it].style.left = `${init[it]}px`
								}
							}
	
	
							if (parseInt(array[array.length - 1].style.left) < lastItemLeft) {
								setLastLeftToggle = 1
								for (let ite = 0; ite < array.length; ite++) {
									array[ite].style.left = `${setLastLeft[ite]}px`
								}
							}
						}
	
					}
				}
			}
	
	
	
	
	
			// динамическая подстройка ширины items при ресайзе
			window.addEventListener(`resize`, () => {
				for (let i = 0; i < array.length; i++) {
	
					const gap = () => {
						if (i !== 0) {
							return 10
						}
						return 0
					}
	
					array[i].style.left = `${array[0].getBoundingClientRect().width * i + (gap() * i)}px`
				}
			})
		}
}













	
scroll(scrollItems, scrollCntr, 10)
scroll(popUpscrollItems, popUpscrollCntr, 10)