// бургер------------------------------------------------------
const burger = document.querySelector(`.burger`)
const burgerButton = document.querySelector(`.nav__burger-button`)
const burgerLinks = document.querySelectorAll(`.burger__a`)
const burgerClose = document.querySelector(`.burger__button`)
const gamePopUpForBurger = document.querySelector(`.game__popup`)

for (let item of burgerLinks) {
	item.addEventListener(`click`, () => {
		burger.style.opacity = 0
		burger.style.zIndex = -1



		gamePopUpForBurger.style.opacity = 0
		setTimeout(() => {
			gamePopUpForBurger.style.zIndex = -1
		}, 200);
		stopGame = false
	})
}

burgerButton.addEventListener(`click`, () => {
	burger.style.zIndex = 5
	burger.style.opacity = 1
})

burgerClose.addEventListener(`click`, () => {
	burger.style.opacity = 0
	burger.style.zIndex = -1
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



// запуск скрипта скролла после загрузки окна. Исключает баг с шириной айтема 0%
const resize = window.addEventListener(`load`, () => {

	scroll(scrollItems, scrollCntr, 10)
	scroll(popUpscrollItems, popUpscrollCntr, 10)
});







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
							console.log(lastItemLeft)
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

























// GAME-------------------------------------------------

const game = document.querySelector(`.game`)
const gamePopUp = document.querySelector(`.game__popup`)
const gameWidth = game.getBoundingClientRect().width
const remove = `<img src="./img/remove.png" class="game__img" id="remove" alt=""/>`
const circle = `<img src="./img/circle.png" class="game__img" id="circle" alt=""/>`




// сетаем высоту game ровную его же ширине
game.setAttribute(`style`, `height: ${gameWidth}px`)


// сетаем ячейки
for (let i = 0; i < 9; i++) {
	const gameItem = document.createElement(`div`)

	gameItem.setAttribute(`class`, `game__item`)
	gameItem.setAttribute(`id`, `${i}`)
	game.append(gameItem)
}



// выигрышные комбинации
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
let botStepToggle = false
let massOfItems = []
let massOfItem = 0
let setMassRows = []
let indexArray = []
let num = 0
let stopGame = false




for (let item of items) {



	const check = () => {

		// проверка строк на наличие трёх крестиков/ноликов
		for (let i = 0; i < win.length; i++) {
			let circleNumForCheckWin = 0
			let removeNumForCheckWin = 0
			for (let y = 0; y < win[i].length; y++) {
				if (items[win[i][y] - 1].querySelector(`#circle`)) {
					circleNumForCheckWin += 1
				}
				if (items[win[i][y] - 1].querySelector(`#remove`)) {
					removeNumForCheckWin += 1
				}
			}
			if (circleNumForCheckWin === win[i].length) {
				document.querySelector(`.game__popup_inner-text`).innerHTML = `Нолики победили`
				gamePopUp.style.opacity = 1
				gamePopUp.style.zIndex = 2
				stopGame = true
				botStepToggle = false
			}
			if (removeNumForCheckWin === win[i].length) {
				document.querySelector(`.game__popup_inner-text`).innerHTML = `Крестики победили`
				gamePopUp.style.opacity = 1
				gamePopUp.style.zIndex = 2
				stopGame = true
				botStepToggle = false
			}
		}

		// проверка поля на заполнение
		let checkFillFullField = 0
		for (let i = 0; i < items.length; i++) {
			if (items[i].firstChild) {
				checkFillFullField += 1
			}
		}

		if (checkFillFullField === 9) {
			document.querySelector(`.game__popup_inner-text`).innerHTML = `Ничья`
			gamePopUp.style.opacity = 1
			gamePopUp.style.zIndex = 2
			stopGame = true
			botStepToggle = false
		}
	}





	item.onclick = () => {
		indexArray = []

		// переключалка хода
		if (!botStepToggle) {
			if (item.firstChild) {
				return
			} else {
				item.innerHTML = remove
				botStepToggle = true
				check()
				if (!stopGame) {
					setTimeout(() => {
						botStep()
					}, Math.random() * 400);
				}
			}
		}
	}



	// ЛОГИКА БОТА
	const botStep = () => {

		// вес items в зависимости от наличия Х или О
		for (let i = 0; i < items.length; i++) {
			massOfItems[i] = 0
			if (items[i].querySelector(`.game__img`)?.id === `remove`) {
				massOfItems[i] += 2
			}
			if (items[i].querySelector(`.game__img`)?.id === `circle`) {
				massOfItems[i] += 1
			}
		}

		// создание массива с "весом" всех возможных, выигрышных комбинаций
		for (let i = 0; i < win.length; i++) {
			setMassRows[i] = 0
			for (let y = 0; y < win[i].length; y++) {
				massOfItem += massOfItems[win[i][y] - 1]
			}
			setMassRows[i] = massOfItem
			massOfItem = 0
		}


		// сортируем строки по весу, на основе веса каждого айтема

		let sortArray = [...setMassRows].sort((a, b) => {
			return a - b
		})

		let decrementNumForMaxValueOfRow = - 1

		let maxValueOfRow = sortArray[sortArray.length + decrementNumForMaxValueOfRow]

		let checkContentForStep = []
		let freeCells = []


		const openRow = () => {
			let heavyRow = []
			heavyRow = []

			for (let i = 0; i < checkContentForStep.length; i++) {
				for (let y = 0; y < checkContentForStep[i].length; y++) {
					if (!items[checkContentForStep[i][y] - 1].firstChild) {
						heavyRow.push(checkContentForStep[i])
					}
				}
			}
			let newHeavyRow = [...new Set(heavyRow)]

			if (newHeavyRow.length === 0) {
				maxValueOfRow -= 1
				setRowForStep()
			}
			else {

				for (let i = 0; i < newHeavyRow.length; i++) {
					for (let y = 0; y < newHeavyRow[i].length; y++) {
						if (!items[newHeavyRow[i][y] - 1].firstChild) {
							freeCells.push(newHeavyRow[i][y])
						}
					}
				}
				let newFreeCells = [...new Set(freeCells)]



				// ищем строку с двумя кругами
				let doubleCircle = []
				for (let i = 0; i < win.length; i++) {
					for (let t = 0; t < win[i].length; t++) {
						if (items[win[i][t] - 1].querySelector(`#circle`)) {
							doubleCircle.push(win[i])
						}
					}
				}

				const duplicates = () => doubleCircle.filter((item, index) => doubleCircle.indexOf(item) !== index)




				for (let i = 0; i < duplicates().length; i++) {
					let circleNumForStep = 0
					let removeNumForStep = 0

					for (let y = 0; y < duplicates()[i].length; y++) {
						if (items[duplicates()[i][y] - 1].querySelector(`#remove`)) {
							removeNumForStep += 1
						}

						if (items[duplicates()[i][y] - 1].querySelector(`#circle`)) {
							circleNumForStep += 1
						}

						if (circleNumForStep === 2 && removeNumForStep === 0) {
							for (let q = 0; q < duplicates()[i].length; q++) {
								if (!items[duplicates()[i][q] - 1].firstChild) {
									items[duplicates()[i][q] - 1].innerHTML = circle
									check()
									return
								}
							}
						}
					}
				}

				doubleCircle = []
				items[newFreeCells[Math.floor(Math.random() * newFreeCells.length)] - 1].innerHTML = circle
			}
		}






		const setRowForStep = () => {
			for (let i = 0; i < win.length; i++) {
				if (setMassRows[i] === maxValueOfRow) {
					checkContentForStep.push(win[i])
				}
			}
			openRow()
		}
		setRowForStep()
		botStepToggle = false
	}
}







document.querySelector(`.game__popup_button`).onmousedown = () => {

	for (let item of items) {
		item.innerHTML = ``
	}
	gamePopUp.style.opacity = 0
	setTimeout(() => {
		gamePopUp.style.zIndex = -1
	}, 200);
	stopGame = false
}


document.querySelector(`.game__reset-button`).onclick = () => {

	for (let item of items) {
		item.innerHTML = ``
	}
	stopGame = false
}




window.addEventListener(`resize`, () => {
	game.setAttribute(`style`, `height: ${Math.round(game.getBoundingClientRect().width)}px;`)
})