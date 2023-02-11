const burger = document.querySelector(`.burger`)
const burgerButton = document.querySelector(`.nav__burger-button`)
let toggleBurger = false


burgerButton.addEventListener(`click`, () => {
	toggleBurger = !toggleBurger
	if (toggleBurger) {
		burger.setAttribute(`style`, `opacity: 1; z-index: 2;`)
	} else {
		burger.setAttribute(`style`, `opacity: 0; z-index: 0;`)
	}
})












// Получаем коллекцию блоков слайдера
const scrollItems = document.querySelectorAll(`.comparison__changes_scroll-after-item`)
const scrollCntr = document.querySelector(`.comparison__changes_scroll-after`)



// // СЕТАЕМ ИЗНАЧАЛЬНОЕ РАЗПОЛОЖЕНИЕ БЛОКОВ
const setCurrentGap = () => {
	for (let i = 0; i < scrollItems.length; i++) {

		const gap = () => {
			if (i !== 0) {
				return 10
			}
			return 0
		}

		scrollItems[i].style.left = `${scrollItems[0].getBoundingClientRect().width * i + (gap() * i)}px`
	}
}
setCurrentGap()







// // СМЕЩЕНИЕ ПРИ ПЕРЕТАСКИВАНИИ И ПЛАВНЫЙ ВОЗВРАТ ПРИ ОТПУСКАНИИ--------------------------
for (let item of scrollItems) {
	// отключаем mousemove при mouseup. listener mouseup возвращает false
	let toggleMousemove = false

	// переключатель, для отработки расчёта максимально допустимоого left не больше 1 раза
	let setLastLeftToggle = false
	// сетаем максимально допустимое значение left для items
	let setLastLeft = []

	// расчёт отступа left для нулевого right отступа. ширина контейнера - ширина item
	const lastItemLeft = parseInt(scrollCntr.getBoundingClientRect().width - scrollItems[0].getBoundingClientRect().width)

	let init = []
	for (let i = 0; i < scrollItems.length; i++) {
		init[i] = parseInt(scrollItems[i].style.left)
	}





	// СЕТАЕМ НАЧАЛЬНОЕ ПОЛОЖЕНИЕ НАЖАТИЯ
	item.addEventListener('mousedown', (e) => {


		initIndent = []
		toggleMousemove = true

		touchOffsetX = e.screenX

		for (let i = 0; i < scrollItems.length; i++) {
			scrollItems[i].style.transition = '0s'
			initIndent[i] = parseInt(scrollItems[i].style.left)
		}






		// ОБНОВЛЯЕМ ПОЛОЖЕНИЕ ЭЛЕМЕНТОВ ПРИ ДВИЖЕНИИ КУРСОРА
		document.addEventListener('mousemove', (event) => {

			if (!toggleMousemove) {
				return
			}


			for (let i = 0; i < scrollItems.length; i++) {

				let target = initIndent[i] - (touchOffsetX - event.screenX)

				scrollItems[i].style.left = `${target}px`
			}
			if (parseInt(scrollItems[scrollItems.length - 1].style.left) < lastItemLeft) {
				setLastLeftToggle = true
			}

			if (setLastLeftToggle) {
				if (!setLastLeft[0]) {
					for (let i = 0; i < scrollItems.length; i++) {
						setLastLeft[i] = parseInt(scrollItems[i].style.left)
					}
				}
			}







			window.onmouseup = () => {

				event.stopPropagation();
				event.preventDefault();
				event.stopImmediatePropagation();


				for (let i = 0; i < scrollItems.length; i++) {
					toggleMousemove = false


					if (parseInt(scrollItems[0].style.left) > init[0]) {
						for (let it = 0; it < scrollItems.length; it++) {
							scrollItems[it].style.transition = '1s ease-in-out'
							scrollItems[it].style.left = `${init[it]}px`
						}
					}


					if (parseInt(scrollItems[scrollItems.length - 1].style.left) < lastItemLeft) {
						setLastLeftToggle = 1
						for (let ite = 0; ite < scrollItems.length; ite++) {
							setLastLeftToggle[ite] = scrollItems[ite].style.left
							scrollItems[ite].style.transition = '1s ease-in-out'
							scrollItems[ite].style.left = `${setLastLeft[ite]}px`
						}
					}
				}

			}
		})
	})














	// динамическая подстройка ширины items при ресайзе
	window.addEventListener(`resize`, () => {
		for (let i = 0; i < scrollItems.length; i++) {

			const gap = () => {
				if (i !== 0) {
					return 10
				}
				return 0
			}

			scrollItems[i].style.left = `${scrollItems[0].getBoundingClientRect().width * i + (gap() * i)}px`
		}
	})
}