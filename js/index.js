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

			array[i].style.left = `${array[i].getBoundingClientRect().width * i + (gapValue() * i)}px`
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
		const lastItemLeft = container.getBoundingClientRect().width - array[0].getBoundingClientRect().width

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


setTimeout(() => {
	scroll(scrollItems, scrollCntr, 10)
	scroll(popUpscrollItems, popUpscrollCntr, 10)
}, 100);






























// GAME-------------------------------------------------

const game = document.querySelector(`.game`)
const gamePopUp = document.querySelector(`.game__popup`)
let gameWidth = game.getBoundingClientRect().width
const remove = `<img src="./img/remove.png" class="game__img" id="remove" alt=""/>`
const circle = `<img src="./img/circle.png" class="game__img" id="circle" alt=""/>`




// сетаем высоту game ровную его же ширине
game.setAttribute(`style`, `height: ${gameWidth}px`)


// сетаем ячейки
for (let i = 1; i < 10; i++) {
	const gameItem = document.createElement(`div`)

	gameItem.setAttribute(`class`, `game__item`)
	gameItem.setAttribute(`id`, `${i}`)
	game.append(gameItem)
}
// 2d массив
const win = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7]
]

// дальше всё как в тумане...
const items = document.querySelectorAll(`.game__item`)
let count = []



for (let item of items) {
	item.onmousedown = () => {

		const check = (imgId, id) => {
			let arr = []

			for (let y = 0; y < items.length; y++) {


				if (!items[y].querySelector(`.game__img`)) {
					arr.push(1)
				}
			}

			let rrr
			if (id) {
				rrr = parseInt(id)
			} else {
				rrr = parseInt(item.id)
			}




			for (let i = 0; i < win.length; i++) {
				for (let t = 0; t < 3; t++) {







					if (win[i][t] === rrr) {
						for (let r = 0; r < 3; r++) {

							if (items[win[i][r] - 1].querySelector(`#${imgId}`)) {
								count.push(1)
							}
						}



						if (count.length === 3) {
							if (imgId === `remove`) {
								document.querySelector(`.game__popup_inner-text`).innerHTML = `Крестики победили`
							} else {
								document.querySelector(`.game__popup_inner-text`).innerHTML = `Нолики победили`
							}
							gamePopUp.style.opacity = 1
							gamePopUp.style.zIndex = 1
							return
						}
						count = []
					}
				}
			}
			if(arr.length == 0){
				document.querySelector(`.game__popup_inner-text`).innerHTML = `Ничья`
				gamePopUp.style.opacity = 1
				gamePopUp.style.zIndex = 1
				return
			}
		}





		const botStep = () => {

			let setNull = []
			for (let i = 0; i < win.length; i++) {
				if (!items[i].querySelector(`.game__img`)) {
					setNull.push(i)
				}
			}



			if (items[setNull[Math.floor(Math.random() * (setNull.length - 1))]]) {
				const number = items[setNull[Math.floor(Math.random() * (setNull.length - 1))]]
				number.innerHTML = circle
				imgId = `circle`
				check(imgId, number.id)
			}
		}






		if (item.firstChild) {
			return
		} else {
			item.innerHTML = remove
			imgId = `remove`
			check(imgId)
			botStep()
		}
	}
}



document.querySelector(`.game__popup_button`).onmousedown = () => {

	for (let item of items) {
		item.innerHTML = ``
		gamePopUp.style.opacity = 0
		gamePopUp.style.zIndex = -1
	}
}










window.addEventListener(`resize`, () => {
	gameHeight = game.getBoundingClientRect().width
})